#!/usr/bin/env node
'use strict';
/* Port-Clair · Mode Classe — serveur de jeu en direct.
   Aucun module à installer : il suffit de Node.js.
   Lancer :  node serveur.js     (puis ouvrir l'adresse affichée sur l'ordinateur du professeur)
   Les données restent en mémoire pendant la partie et disparaissent à l'arrêt. Seuls des prénoms (pseudos) sont utilisés. */
const http = require('http'), fs = require('fs'), path = require('path'), os = require('os'), crypto = require('crypto');
const B = require('./banque.js');

const PORT = +process.env.PORT || 8080;
const PUB = fs.existsSync(path.join(__dirname, 'public', 'eleve.html')) ? path.join(__dirname, 'public') : __dirname; // tolère les fichiers mis à plat
const PRIVES = new Set(['serveur.js', 'banque.js', 'package.json', 'render.yaml', 'download']);
const parties = new Map();

const COULEURS_EQ = [
  { nom: 'rouge', hex: '#d64045' }, { nom: 'bleue', hex: '#2f6fd6' }, { nom: 'verte', hex: '#2f9b5f' },
  { nom: 'jaune', hex: '#d9a516' }, { nom: 'violette', hex: '#8a5cc7' }, { nom: 'orange', hex: '#e07a2f' },
  { nom: 'rose', hex: '#d9578f' }, { nom: 'marron', hex: '#8f6a45' }
];
const PRENOMS_TEST = ['Amir', 'Lina', 'Sami', 'Maya', 'Noé', 'Zoé', 'Karim', 'Léa', 'Hugo', 'Inès', 'Yara', 'Ali', 'Sofia', 'Omar', 'Mina', 'Tom', 'Nour', 'Iván', 'Elena', 'Dani'];
const NB_AVATARS = 13;

const aleat = n => Math.floor(Math.random() * n);
const borne = (x, a, b) => Math.max(a, Math.min(b, x));
const jeton = () => crypto.randomBytes(9).toString('hex');
function nouveauCode() { let c; do { c = String(1000 + aleat(9000)); } while (parties.has(c)); return c; }
function propre(nom) { return String(nom || '').replace(/[<>&"'`\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 18); }

/* ---------- création et préparation ---------- */
function creer(p) {
  const themes = (Array.isArray(p.themes) ? p.themes : []).filter(t => B.THEMES[t]);
  if (!themes.length) return null;
  const g = {
    code: nouveauCode(), prof: jeton(), themes, creee: Date.now(), derniere: Date.now(),
    etat: 'lobby', idx: -1, q: [], joueurs: new Map(), equipes: [], flux: new Set(), timer: null, suite: null, bots: [],
    qDebut: 0, qFin: 0, ordreJoin: 0
  };
  reglages(g, p);
  parties.set(g.code, g);
  return g;
}
function reglages(g, p) {
  if (Array.isArray(p.themes)) { const t = p.themes.filter(x => B.THEMES[x]); if (t.length) g.themes = t; }
  g.total = borne(Math.round(+p.total || g.total || 20), 3, 200);
  g.mode = p.mode === 'equipes' ? 'equipes' : 'solo';
  g.nbEq = borne(Math.round(+p.nbEquipes || g.nbEq || 5), 2, 8);
  g.mult = [1, 1.5, 2].includes(+p.mult) ? +p.mult : (g.mult || 1);
  g.vitesse = p.vitesse === undefined ? (g.vitesse !== false) : !!p.vitesse;
  g.auto = p.auto === undefined ? !!g.auto : !!p.auto;
  g.ordre = p.ordre === 'theme' ? 'theme' : (p.ordre === 'melange' ? 'melange' : (g.ordre || 'melange'));
}
function preparer(g) {
  g.q = B.construire(g.themes, g.total, g.ordre);
  g.q.forEach(q => { q.temps = Math.round(q.temps * g.mult); });
  g.idx = -1;
  g.joueurs.forEach(j => { j.score = 0; j.bonnes = 0; j.reps = 0; j.rep = null; j.derPts = 0; j.derOk = false; j.parTheme = {}; });
}
function assignerEquipes(g) {
  g.equipes = [];
  g.joueurs.forEach(j => { j.eq = -1; });
  if (g.mode !== 'equipes') return;
  const tous = B.melange([...g.joueurs.values()]);
  const k = borne(Math.min(g.nbEq, tous.length), 1, 8);
  for (let i = 0; i < k; i++) g.equipes.push(Object.assign({ id: i }, COULEURS_EQ[i]));
  tous.forEach((j, i) => { j.eq = i % k; });
}
function equipeLaPlusPetite(g) {
  const n = g.equipes.map(() => 0);
  g.joueurs.forEach(j => { if (j.eq >= 0) n[j.eq]++; });
  return n.indexOf(Math.min(...n));
}

/* ---------- joueurs ---------- */
function ajouterJoueur(g, nom, bot) {
  let n = propre(nom) || 'Élève', base = n, i = 2;
  const pris = new Set([...g.joueurs.values()].map(j => j.nom.toLowerCase()));
  while (pris.has(n.toLowerCase())) n = base + ' ' + (i++);
  const j = {
    id: jeton().slice(0, 10), token: jeton(), nom: n, av: g.ordreJoin++ % NB_AVATARS, bot: !!bot, eq: -1,
    score: 0, bonnes: 0, reps: 0, rep: null, derPts: 0, derOk: false, parTheme: {}, liens: 0
  };
  if (g.equipes.length) j.eq = equipeLaPlusPetite(g);
  g.joueurs.set(j.id, j);
  return j;
}
function connectes(g) { return [...g.joueurs.values()].filter(j => j.bot || j.liens > 0); }

/* ---------- déroulement ---------- */
function lancerQuestion(g) {
  clearTimeout(g.timer); clearTimeout(g.suite);
  g.idx++;
  if (g.idx >= g.q.length) return finir(g);
  g.etat = 'question';
  g.qDebut = Date.now(); g.qFin = g.qDebut + g.q[g.idx].temps * 1000;
  g.joueurs.forEach(j => { j.rep = null; });
  g.timer = setTimeout(() => reveler(g), g.q[g.idx].temps * 1000 + 800);
  programmerBots(g);
  diffuser(g);
}
function evaluer(q, rep) {
  if (!rep || typeof rep !== 'object') return null;
  if (q.type === 'ecrire') {
    const t = String(rep.texte || '').slice(0, 80);
    if (!t.trim()) return null;
    const r = B.verifie(t, q.acceptes);
    return { ok: r.ok, presque: r.presque, brut: t };
  }
  if (q.type === 'ordre') {
    if (!Array.isArray(rep.ordre) || rep.ordre.length !== q.tuiles.length) return null;
    const idx = rep.ordre.map(x => +x);
    if (new Set(idx).size !== idx.length || idx.some(x => !(x >= 0 && x < q.tuiles.length))) return null;
    const ok = idx.map(i => q.tuiles[i]).join(' ') === q.ordreBon.join(' ');
    return { ok, presque: false, brut: idx.map(i => q.tuiles[i]).join(' ') };
  }
  const i = +rep.i;
  if (!Number.isInteger(i) || i < 0 || i >= q.options.length) return null;
  return { ok: i === q.bonne, presque: false, brut: i };
}
function repondre(g, j, corps) {
  if (g.etat !== 'question' || j.rep) return false;
  const q = g.q[g.idx], now = Date.now();
  if (now > g.qFin + 1500) return false;
  const r = evaluer(q, corps);
  if (!r) return false;
  const duree = q.temps * 1000, ecoule = borne(now - g.qDebut, 0, duree);
  let pts = 0;
  if (r.ok) {
    pts = 1000 * (r.presque ? 0.6 : 1);
    if (g.vitesse) pts *= 0.5 + 0.5 * (1 - ecoule / duree);
    pts = Math.round(pts / 10) * 10;
  }
  j.rep = Object.assign({ pts, t: ecoule }, r);
  const encore = connectes(g).some(x => !x.rep);
  if (!encore) setTimeout(() => reveler(g), 600);
  else diffuser(g, 'prof');
  return true;
}
function scoreEquipes(g) {
  return g.equipes.map(e => {
    const m = [...g.joueurs.values()].filter(j => j.eq === e.id);
    const total = m.reduce((a, j) => a + j.score, 0);
    return { id: e.id, nom: e.nom, hex: e.hex, membres: m.length, score: m.length ? Math.round(total / m.length) : 0 };
  }).sort((a, b) => b.score - a.score);
}
function classement(g) {
  const l = [...g.joueurs.values()].sort((a, b) => b.score - a.score || a.nom.localeCompare(b.nom));
  let rang = 0, prec = null;
  l.forEach((j, i) => { if (j.score !== prec) { rang = i + 1; prec = j.score; } j.rang = rang; });
  return l;
}
function reveler(g) {
  if (g.etat !== 'question') return;
  clearTimeout(g.timer); g.bots.forEach(clearTimeout); g.bots = [];
  const q = g.q[g.idx];
  g.etat = 'reveal';
  g.joueurs.forEach(j => {
    const r = j.rep;
    j.derOk = !!(r && r.ok); j.derPts = r ? r.pts : 0;
    j.score += j.derPts; if (r && r.ok) j.bonnes++; if (r) j.reps++;
    const t = j.parTheme[q.theme] = j.parTheme[q.theme] || { ok: 0, n: 0 };
    t.n++; if (r && r.ok) t.ok++;
  });
  classement(g);
  diffuser(g);
  if (g.auto) g.suite = setTimeout(() => suivant(g), 8000);
}
function suivant(g) {
  if (g.etat !== 'reveal') return;
  clearTimeout(g.suite);
  if (g.idx + 1 >= g.q.length) finir(g); else lancerQuestion(g);
}
function finir(g) {
  clearTimeout(g.timer); clearTimeout(g.suite); g.bots.forEach(clearTimeout); g.bots = [];
  g.etat = 'fin'; classement(g); diffuser(g);
}
function rejouer(g) {
  clearTimeout(g.timer); clearTimeout(g.suite); g.bots.forEach(clearTimeout); g.bots = [];
  g.etat = 'lobby'; g.q = []; g.idx = -1; g.equipes = [];
  g.joueurs.forEach(j => { j.score = 0; j.bonnes = 0; j.reps = 0; j.rep = null; j.eq = -1; j.parTheme = {}; });
  diffuser(g);
}

/* ---------- élèves virtuels (pour essayer seul) ---------- */
function ajouterBots(g, n) {
  const libres = B.melange(PRENOMS_TEST);
  for (let i = 0; i < n && g.joueurs.size < 80; i++) ajouterJoueur(g, libres[i % libres.length], true);
  if (g.etat !== 'lobby' && g.equipes.length) g.joueurs.forEach(j => { if (j.eq < 0) j.eq = equipeLaPlusPetite(g); });
}
function programmerBots(g) {
  g.bots.forEach(clearTimeout); g.bots = [];
  const q = g.q[g.idx];
  g.joueurs.forEach(j => {
    if (!j.bot) return;
    const delai = (1500 + Math.random() * Math.max(1000, q.temps * 700)) | 0;
    const juste = Math.random() < (q.type === 'ecrire' ? 0.55 : q.type === 'ordre' ? 0.6 : 0.72);
    g.bots.push(setTimeout(() => {
      let rep;
      if (q.type === 'ecrire') rep = { texte: juste ? q.affiche : q.affiche.slice(0, -1) + 'x' };
      else if (q.type === 'ordre') {
        const ids = q.tuiles.map((_, i) => i), vus = [], ordre = [];
        q.ordreBon.forEach(w => { const i = ids.find(k => q.tuiles[k] === w && !vus.includes(k)); vus.push(i); ordre.push(i); });
        rep = { ordre: juste ? ordre : ordre.slice().reverse() };
      } else {
        let i = q.bonne;
        if (!juste) { const autres = q.options.map((_, k) => k).filter(k => k !== q.bonne); i = autres[aleat(autres.length)]; }
        rep = { i };
      }
      repondre(g, j, rep);
    }, delai));
  });
}

/* ---------- vues envoyées aux écrans ---------- */
function etiquetteBonne(q) {
  if (q.type === 'ecrire') return q.affiche;
  if (q.type === 'ordre') return q.affiche;
  const o = q.options[q.bonne];
  return o.t || o.e;
}
function resume(j, g) {
  return { id: j.id, nom: j.nom, av: j.av, eq: j.eq, score: j.score, bonnes: j.bonnes, rang: j.rang || 0, rep: !!j.rep, ok: j.derOk, pts: j.derPts, en: j.bot || j.liens > 0, bot: j.bot };
}
function vueCommune(g) {
  const q = g.q[g.idx];
  const v = {
    code: g.code, etat: g.etat, mode: g.mode, idx: g.idx, total: g.q.length || g.total, nbJoueurs: g.joueurs.size,
    reste: g.etat === 'question' ? Math.max(0, g.qFin - Date.now()) : 0,
    equipes: g.equipes.map(e => ({ id: e.id, nom: e.nom, hex: e.hex })),
    q: (g.etat === 'question' || g.etat === 'reveal') && q ? B.publique(q) : null
  };
  if (g.etat === 'reveal' && q) {
    v.rev = { bonne: etiquetteBonne(q), bonneIdx: q.bonne, expl: q.expl || '', type: q.type };
  }
  return v;
}
function vueProf(g) {
  const v = vueCommune(g);
  const liste = classement(g);
  v.role = 'prof';
  v.reglages = { themes: g.themes, total: g.total, mode: g.mode, nbEq: g.nbEq, mult: g.mult, vitesse: g.vitesse, auto: g.auto, ordre: g.ordre };
  v.joueurs = liste.map(j => resume(j, g));
  v.nbRep = [...g.joueurs.values()].filter(j => j.rep).length;
  v.classementEq = scoreEquipes(g);
  if (g.etat === 'reveal') {
    const q = g.q[g.idx];
    if (q.options) { v.rev.repartition = q.options.map(() => 0); g.joueurs.forEach(j => { if (j.rep && Number.isInteger(j.rep.brut)) v.rev.repartition[j.rep.brut]++; }); }
    v.rev.nbOk = [...g.joueurs.values()].filter(j => j.derOk).length;
    v.rev.nbRep = [...g.joueurs.values()].filter(j => j.rep).length;
  }
  if (g.etat === 'fin') {
    v.themes = g.themes.map(t => ({ id: t, titre: B.THEMES[t].titre }));
    v.detail = liste.map(j => ({ nom: j.nom, eq: j.eq, score: j.score, bonnes: j.bonnes, rep: j.reps, parTheme: j.parTheme }));
  }
  return v;
}
function vueEleve(g, j) {
  const v = vueCommune(g);
  v.role = 'eleve';
  v.moi = { id: j.id, nom: j.nom, av: j.av, eq: j.eq, score: j.score, rang: j.rang || 0, repondu: !!j.rep };
  if (j.eq >= 0 && g.equipes[j.eq]) v.moi.equipe = { nom: g.equipes[j.eq].nom, hex: g.equipes[j.eq].hex };
  if (g.etat === 'reveal') {
    const r = j.rep;
    v.rev.ok = !!(r && r.ok); v.rev.presque = !!(r && r.presque); v.rev.pts = j.derPts; v.rev.repondu = !!r;
    v.rev.sa = r ? String(r.brut) : '';
    v.top = classement(g).slice(0, 5).map(x => ({ nom: x.nom, score: x.score, av: x.av }));
    if (g.mode === 'equipes') v.eqs = scoreEquipes(g);
  }
  if (g.etat === 'fin') {
    const liste = classement(g);
    v.fin = { rang: j.rang, de: liste.length, score: j.score, bonnes: j.bonnes, total: g.q.length };
    v.top = liste.slice(0, 5).map(x => ({ nom: x.nom, score: x.score, av: x.av }));
    if (g.mode === 'equipes') v.eqs = scoreEquipes(g);
  }
  return v;
}
function ecrire(res, event, data) { try { res.write('event: ' + event + '\ndata: ' + JSON.stringify(data) + '\n\n'); } catch (e) { /* connexion fermée */ } }
function diffuser(g, seulement) {
  g.derniere = Date.now();
  g.flux.forEach(c => {
    if (seulement === 'prof' && c.role !== 'prof') return;
    if (c.role === 'prof') ecrire(c.res, 'etat', vueProf(g));
    else { const j = g.joueurs.get(c.jid); if (j) ecrire(c.res, 'etat', vueEleve(g, j)); }
  });
}

/* ---------- HTTP ---------- */
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8' };
const ENTETES = {
  'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; media-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'",
  'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'Cache-Control': 'no-store'
};
function json(res, code, obj) { res.writeHead(code, Object.assign({ 'Content-Type': 'application/json; charset=utf-8' }, ENTETES)); res.end(JSON.stringify(obj)); }
function corps(req) {
  return new Promise(resolve => {
    let s = '';
    req.on('data', d => { s += d; if (s.length > 8192) { req.destroy(); resolve(null); } });
    req.on('end', () => { try { resolve(s ? JSON.parse(s) : {}); } catch (e) { resolve(null); } });
    req.on('error', () => resolve(null));
  });
}
function adresses() {
  const r = [];
  const ifs = os.networkInterfaces();
  Object.keys(ifs).forEach(n => (ifs[n] || []).forEach(a => { if (a.family === 'IPv4' && !a.internal) r.push(a.address); }));
  return r;
}
function fichier(res, nom) {
  if (!/^[a-zA-Z0-9._-]+$/.test(nom) || PRIVES.has(nom) || !TYPES[path.extname(nom)]) return json(res, 404, { erreur: 'introuvable' });
  const f = path.join(PUB, nom);
  fs.readFile(f, (e, data) => {
    if (e) return json(res, 404, { erreur: 'introuvable' });
    res.writeHead(200, Object.assign({ 'Content-Type': TYPES[path.extname(nom)] || 'application/octet-stream' }, ENTETES));
    res.end(data);
  });
}
const serveur = http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  const p = url.pathname;
  try {
    if (req.method === 'GET') {
      if (p === '/' || p === '/eleve') return fichier(res, 'eleve.html');
      if (p === '/prof') return fichier(res, 'prof.html');
      if (p === '/api/info') return json(res, 200, {
        port: PORT, adresses: adresses(),
        themes: B.ORDRE.map(id => ({ id, titre: B.THEMES[id].titre, emoji: B.THEMES[id].emoji, n: 50 }))
      });
      if (p === '/api/flux') return flux(req, res, url);
      if (p.startsWith('/') && p.length > 1 && !p.slice(1).includes('/')) return fichier(res, p.slice(1));
      return json(res, 404, { erreur: 'introuvable' });
    }
    if (req.method === 'POST') {
      const b = await corps(req);
      if (b === null) return json(res, 400, { erreur: 'requête invalide' });
      if (p === '/api/creer') {
        const g = creer(b);
        if (!g) return json(res, 400, { erreur: 'Choisis au moins un thème.' });
        return json(res, 200, { code: g.code, token: g.prof });
      }
      const g = parties.get(String(b.code || ''));
      if (!g) return json(res, 404, { erreur: 'Code inconnu. Vérifie les 4 chiffres.' });
      if (p === '/api/rejoindre') {
        if (b.id && g.joueurs.has(b.id) && g.joueurs.get(b.id).token === b.token) { const j = g.joueurs.get(b.id); return json(res, 200, { id: j.id, token: j.token, nom: j.nom }); }
        if (g.etat === 'fin') return json(res, 409, { erreur: 'Cette partie est terminée.' });
        if (g.joueurs.size >= 80) return json(res, 409, { erreur: 'La partie est complète.' });
        if (!propre(b.nom)) return json(res, 400, { erreur: 'Écris ton prénom.' });
        const j = ajouterJoueur(g, b.nom, false);
        diffuser(g);
        return json(res, 200, { id: j.id, token: j.token, nom: j.nom });
      }
      if (p === '/api/rep') {
        const j = g.joueurs.get(b.id);
        if (!j || j.token !== b.token) return json(res, 403, { erreur: 'non autorisé' });
        return json(res, 200, { ok: repondre(g, j, b.reponse) });
      }
      if (p === '/api/prof') {
        if (b.token !== g.prof) return json(res, 403, { erreur: 'non autorisé' });
        return json(res, 200, actionProf(g, b));
      }
    }
    json(res, 404, { erreur: 'introuvable' });
  } catch (e) { console.error(e); json(res, 500, { erreur: 'erreur du serveur' }); }
});
function actionProf(g, b) {
  switch (b.action) {
    case 'reglages': if (g.etat === 'lobby') { reglages(g, b); diffuser(g); } break;
    case 'bots': if (g.etat === 'lobby' || g.etat === 'question' || g.etat === 'reveal') { ajouterBots(g, borne(+b.n || 10, 1, 40)); diffuser(g); } break;
    case 'demarrer':
      if (g.etat !== 'lobby') return { ok: false, erreur: 'La partie a déjà commencé.' };
      if (!g.joueurs.size) return { ok: false, erreur: 'Aucun élève connecté.' };
      assignerEquipes(g); preparer(g); lancerQuestion(g); break;
    case 'reveler': reveler(g); break;
    case 'suivant': suivant(g); break;
    case 'terminer': finir(g); break;
    case 'rejouer': rejouer(g); break;
    case 'exclure': { const j = g.joueurs.get(b.id); if (j) { g.joueurs.delete(b.id); g.flux.forEach(c => { if (c.jid === b.id) { ecrire(c.res, 'exclu', {}); try { c.res.end(); } catch (e) { /* */ } } }); diffuser(g); } break; }
    default: return { ok: false, erreur: 'action inconnue' };
  }
  return { ok: true };
}
function flux(req, res, url) {
  const g = parties.get(String(url.searchParams.get('code') || ''));
  const role = url.searchParams.get('role');
  if (!g) return json(res, 404, { erreur: 'Code inconnu.' });
  let c;
  if (role === 'prof') {
    if (url.searchParams.get('token') !== g.prof) return json(res, 403, { erreur: 'non autorisé' });
    c = { res, role: 'prof' };
  } else {
    const j = g.joueurs.get(url.searchParams.get('id'));
    if (!j || j.token !== url.searchParams.get('token')) return json(res, 403, { erreur: 'non autorisé' });
    c = { res, role: 'eleve', jid: j.id }; j.liens++;
  }
  res.writeHead(200, Object.assign({ 'Content-Type': 'text/event-stream; charset=utf-8', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' }, ENTETES));
  res.write('retry: 2000\n\n');
  g.flux.add(c);
  if (c.role === 'prof') ecrire(res, 'etat', vueProf(g)); else { ecrire(res, 'etat', vueEleve(g, g.joueurs.get(c.jid))); diffuser(g, 'prof'); }
  const coeur = setInterval(() => { try { res.write(': ♥\n\n'); } catch (e) { /* */ } }, 20000);
  req.on('close', () => {
    clearInterval(coeur); g.flux.delete(c);
    if (c.role === 'eleve') { const j = g.joueurs.get(c.jid); if (j) { j.liens = Math.max(0, j.liens - 1); diffuser(g, 'prof'); } }
  });
}
setInterval(() => { const lim = Date.now() - 4 * 3600 * 1000; parties.forEach((g, k) => { if (g.derniere < lim && g.flux.size === 0) parties.delete(k); }); }, 600000).unref();

serveur.listen(PORT, '0.0.0.0', () => {
  const ip = adresses();
  console.log('\n  Port-Clair · Mode Classe\n');
  console.log('  Professeur (cet ordinateur) :  http://localhost:' + PORT + '/prof');
  if (ip.length) { console.log('  Élèves (tablettes, même Wi-Fi) :'); ip.forEach(a => console.log('       http://' + a + ':' + PORT)); }
  else console.log('  Aucun réseau détecté : connecte l\'ordinateur au Wi-Fi de la classe.');
  console.log('\n  Pour arrêter : Ctrl + C\n');
});
module.exports = { serveur, parties };
