/* Aides communes aux pages élève et professeur */
const $ = s => document.querySelector(s);
function el(tag, cls, html) { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const AVATARS = ['sami', 'chloe', 'noe', 'lina', 'karim', 'maya', 'theo', 'zoe', 'lea', 'hugo', 'bertin', 'faure', 'lambert'];
const avatar = n => '<img class="av" src="a-' + AVATARS[(+n || 0) % AVATARS.length] + '.jpg" alt="">';
const LETTRES = ['A', 'B', 'C', 'D'];

async function api(url, corps) {
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(corps) });
    const j = await r.json().catch(() => ({}));
    return Object.assign({ ok: r.ok }, j, { ok: r.ok && j.ok !== false });
  } catch (e) { return { ok: false, erreur: 'Pas de connexion au serveur.' }; }
}

/* lecture à voix haute (voix de la tablette) */
let voixFr = null;
function chercheVoix() {
  if (!('speechSynthesis' in window)) return;
  const v = speechSynthesis.getVoices().filter(x => /^fr/i.test(x.lang));
  voixFr = v.find(x => /fr[-_]FR/i.test(x.lang)) || v[0] || null;
}
if ('speechSynthesis' in window) { chercheVoix(); speechSynthesis.onvoiceschanged = chercheVoix; }
function parler(texte) {
  if (!('speechSynthesis' in window)) return false;
  try {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texte);
    u.lang = 'fr-FR'; u.rate = 0.85;
    if (voixFr) u.voice = voixFr;
    speechSynthesis.speak(u);
    return true;
  } catch (e) { return false; }
}

/* minuteur : barre qui se vide + secondes restantes ; renvoie une fonction d'arrêt */
function minuteur(barre, compte, resteMs, totalMs, quandFini) {
  const fin = Date.now() + resteMs;
  let stop = false;
  function tick() {
    if (stop) return;
    const r = Math.max(0, fin - Date.now());
    const f = totalMs ? Math.min(1, r / totalMs) : 0;
    if (barre) { barre.firstElementChild.style.transform = 'scaleX(' + f + ')'; barre.classList.toggle('vite', r < 5000); }
    if (compte) compte.textContent = Math.ceil(r / 1000);
    if (r <= 0) { stop = true; if (quandFini) quandFini(); return; }
    requestAnimationFrame(tick);
  }
  tick();
  return () => { stop = true; };
}

/* connexion en direct (le navigateur se reconnecte tout seul) */
function ouvreFlux(url, surEtat, surFerme, surExclu) {
  const es = new EventSource(url);
  es.addEventListener('etat', e => { try { surEtat(JSON.parse(e.data)); } catch (x) { console.error(x); } });
  es.addEventListener('exclu', () => { es.close(); if (surExclu) surExclu(); });
  es.onerror = () => { if (es.readyState === 2 && surFerme) surFerme(); };
  return es;
}
