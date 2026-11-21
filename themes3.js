'use strict';
/* 6 thèmes de plus : le corps, la santé, la météo, les animaux, les métiers, les nombres.
   Règles : une image = UNE chose (pas d'objets en plus) ; mots sans image (emoji "") seulement en écoute et en phrases ;
   les réponses des phrases/écritures ne reprennent pas les mots du vocabulaire (pas de questions jumelles). */

const themes = {

corps: { titre: "Le corps humain", emoji: "🖐️", verbes: false,
  V: [["l'œil","👁️","oeil"],["l'oreille","👂"],["le nez","👃"],["la bouche","👄"],["la dent","🦷"],["la main","🖐️"],["le pied","🦶"],["la jambe","🦵"],["le cerveau","🧠"],["le cœur","❤️","coeur"],["l'os","🦴"],["la langue","👅"],["le doigt",""],["le bras",""],["la tête",""]],
  P: [
    ["Je vois avec mes ___.","yeux",["oreilles","mains","dents"]],
    ["J'entends avec mes ___.","oreilles",["yeux","pieds","genoux"]],
    ["Je porte mon sac sur le ___.","dos",["nez","genou","ventre"]],
    ["J'ai mal ___ tête.","à la",["au","aux","à l'"]],
    ["J'ai mal ___ pieds.","aux",["au","à la","à l'"]],
    ["Pour écrire, j'utilise ma main ___.","droite",["droit","droites","droits"]],
    ["Les cheveux poussent sur la ___.","tête",["jambe","main","dent"]],
    ["Quand je suis triste, des ___ coulent sur mes joues.","larmes",["dents","mains","ongles"]]
  ],
  E: [
    ["Pour plier la jambe, on utilise le ___.","genou",""],
    ["On porte un sac sur l'___.","épaule|epaule",""],
    ["Entre la tête et le corps, il y a le ___.","cou",""],
    ["Quand j'ai faim, j'ai mal au ___.","ventre",""],
    ["On se coiffe les ___.","cheveux",""]
  ],
  S: [
    ["Tu as mal à la tête. Tu dis :",["J'ai mal à la tête.","Je suis mal à la tête.","J'ai mal au tête."]],
    ["Le médecin demande : « Où avez-vous mal ? » Tu montres ton ventre. Tu dis :",["J'ai mal au ventre.","J'ai mal à ventre.","Je mal au ventre."]],
    ["Tu dis que ton pied te fait mal. Tu dis :",["J'ai mal au pied.","J'ai mal à le pied.","J'ai mal aux pied."]],
    ["Tu ne vois pas bien le tableau. Tu dis :",["Je ne vois pas bien.","Je ne vois pas bon.","Je ne voir pas bien."]],
    ["Tu n'entends pas la consigne. Tu dis :",["Je n'entends pas bien.","Je n'entends pas bon.","Je entends pas bien."]],
    ["Tu montres ta main à l'infirmière. Tu dis :",["Voici ma main.","Voici mon main.","Voici mes main."]]
  ],
  L: [
    ["J'ai mal à la tête.",["J'ai mal à la tête.","J'ai mal au ventre.","J'ai mal aux pieds."]],
    ["Il a mal au dos.",["Il a mal au dos.","Elle a mal au dos.","Il a mal au cou."]],
    ["Je me lave les mains.",["Je me lave les mains.","Je me lave les dents.","Je me lave le visage."]],
    ["Elle a de grands yeux bleus.",["Elle a de grands yeux bleus.","Elle a de grands yeux verts.","Il a de grands yeux bleus."]]
  ],
  F: [
    ["On entend avec les oreilles.",1,"Les oreilles servent à entendre."],
    ["On voit avec le nez.",0,"On voit avec les yeux. Le nez sert à sentir."],
    ["On a deux jambes.",1,"Une personne a deux jambes et deux bras."],
    ["Le cœur est dans la tête.",0,"Le cœur est dans la poitrine. Le cerveau est dans la tête."],
    ["On se lave les dents avec une brosse à dents.",1,"On se brosse les dents matin et soir."]
  ],
  O: ["Ma sœur a mal aux pieds.","Il se lave les mains avant le repas.","Elle a les yeux bleus.","Mon frère a mal au dos.","Je me brosse les dents deux fois par jour."]
},

sante: { titre: "Chez le médecin", emoji: "💊", verbes: false,
  V: [["le médicament","💊","comprimé|le comprimé|cachet|le cachet"],["la piqûre","💉","piqure|seringue|la seringue|vaccin|le vaccin"],["le thermomètre","🌡️","thermometre"],["l'hôpital","🏥","hopital"],["l'ambulance","🚑"],["le masque","😷"],["le savon",""],["la blouse","🥼"],["le lit","🛏️"],["le médecin","","docteur|le docteur|medecin"],["le rendez-vous","","rendez vous|rdv"],["la pharmacie","","pharmacie"]],
  P: [
    ["J'ai de la ___ : le thermomètre indique 39 degrés.","fièvre",["toux","dent","valise"]],
    ["Je tousse : j'ai une ___.","toux",["jambe","dent","ordonnance"]],
    ["Le médecin écrit une ___.","ordonnance",["maladie","fièvre","toux"]],
    ["Je suis ___ : je reste au lit.","malade",["maladie","médecin","mal"]],
    ["Le pharmacien me donne mes ___.","médicaments",["ordonnances","fièvres","toux"]],
    ["Pour guérir, je dois me ___.","reposer",["repose","reposé","reposez"]],
    ["Je vais ___ médecin.","chez le",["au","à la","aux"]],
    ["Il faut ___ le médecin si on est très malade.","appeler",["appelé","appelez","appelle"]]
  ],
  E: [
    ["Quand je tousse et que mon nez coule, j'ai un ___.","rhume",""],
    ["Quand on n'est pas malade, on est en bonne ___.","santé|sante",""],
    ["Avant de manger, il faut se laver les ___.","mains",""],
    ["La personne qui soigne les malades à l'hôpital, c'est l'___.","infirmière|infirmier|infirmiere",""],
    ["On va chez le ___ quand on a mal aux dents.","dentiste","🦷"]
  ],
  S: [
    ["Tu appelles le médecin. Tu dis :",["Je voudrais un rendez-vous, s'il vous plaît.","Je voudrais une rendez-vous, s'il vous plaît.","Je voudrais rendez-vous un, s'il vous plaît."]],
    ["Le médecin demande : « Qu'est-ce qui ne va pas ? » Tu as de la fièvre. Tu dis :",["J'ai de la fièvre.","J'ai du fièvre.","Je suis fièvre."]],
    ["Tu es malade et tu ne viens pas à l'école. Tu dis :",["Je suis malade.","Je suis maladie.","Je ai malade."]],
    ["Tu as mal à la gorge. Tu dis :",["J'ai mal à la gorge.","J'ai mal au gorge.","J'ai mal de la gorge."]],
    ["Tu ne te sens pas bien en classe. Tu dis au professeur :",["Je ne me sens pas bien.","Je ne sens pas moi bien.","Je ne me sens pas bon."]],
    ["Tu veux savoir combien de fois par jour prendre le médicament. Tu demandes :",["Combien de fois par jour ?","Combien de fois pour jour ?","Combien fois de par jour ?"]]
  ],
  L: [
    ["J'ai de la fièvre.",["J'ai de la fièvre.","J'ai de la toux.","Il a de la fièvre."]],
    ["Je dois aller chez le médecin.",["Je dois aller chez le médecin.","Je dois aller chez le dentiste.","Je dois aller à l'hôpital."]],
    ["Prenez ce médicament deux fois par jour.",["Prenez ce médicament deux fois par jour.","Prenez ce médicament trois fois par jour.","Prenez cette ordonnance deux fois par jour."]],
    ["Je suis très fatigué.",["Je suis très fatigué.","Je suis très malade.","Elle est très fatiguée."]]
  ],
  F: [
    ["Un thermomètre mesure la température.",1,"Le thermomètre indique s'il y a de la fièvre."],
    ["On va à la pharmacie pour acheter du pain.",0,"À la pharmacie, on achète des médicaments. Le pain s'achète à la boulangerie."],
    ["Le médecin écrit une ordonnance.",1,"L'ordonnance indique les médicaments à prendre."],
    ["Une ambulance transporte les malades.",1,"L'ambulance emmène les malades à l'hôpital."],
    ["On se lave les mains avec du sel.",0,"On se lave les mains avec de l'eau et du savon."]
  ],
  O: ["Demain, j'ai rendez-vous chez le médecin.","Le pharmacien lit l'ordonnance.","Je prends ce médicament le matin.","Il a de la fièvre depuis hier.","Je me lave les mains avec du savon."]
},

meteo: { titre: "Le temps et les saisons", emoji: "⛅", verbes: false,
  V: [["le soleil","☀️"],["le nuage","☁️"],["la pluie","🌧️"],["la neige","❄️"],["le vent","🌬️"],["l'orage","⛈️"],["l'arc-en-ciel","🌈","arc en ciel"],["le parapluie","☔"],["la lune","🌙"],["l'étoile","⭐","etoile"],["le bonhomme de neige","⛄"],["le printemps","","printemps"],["l'été","","ete"],["l'automne","","automne"],["l'hiver","","hiver"]],
  P: [
    ["Il ___ aujourd'hui : prends ton parapluie.","pleut",["pleuvoir","plu","pleuve"]],
    ["Il fait très ___ en été : 35 degrés.","chaud",["froid","bleu","neige"]],
    ["Il ___ : les flocons tombent.","neige",["neiger","neigé","neiges"]],
    ["Demain, il va faire ___ : pas un nuage.","beau",["belle","beaux","bonne"]],
    ["Il y a beaucoup de ___ : le ciel est gris.","nuages",["soleils","neiges","étoiles"]],
    ["Quel temps ___-il ?","fait",["est","a","va"]],
    ["Il fait cinq ___.","degrés",["degré","tempéré","chaud"]],
    ["Il fait ___ : j'ai besoin d'un gros manteau.","froid",["chaud","beau","bleu"]]
  ],
  E: [
    ["Printemps, été, automne, hiver : ce sont les quatre ___.","saisons","🍂"],
    ["On mesure la ___ avec un thermomètre.","température|temperature",""],
    ["Quand il y a de la brume épaisse, on dit qu'il y a du ___.","brouillard","🌫️"],
    ["Pour savoir le temps de demain, je regarde la ___.","météo|meteo",""],
    ["Il fait zéro degré : l'eau devient de la ___.","glace","🧊"]
  ],
  S: [
    ["Tu demandes le temps à ton ami. Tu dis :",["Quel temps fait-il ?","Quel temps est-il ?","Quel temps a-t-il ?"]],
    ["Il pleut. Tu dis :",["Il pleut.","Elle pleut.","Je pleut."]],
    ["Il fait beau. Tu dis :",["Il fait beau.","Il est beau.","Il a beau."]],
    ["Tu dis que tu as froid :",["J'ai froid.","Je suis froid.","Je fais froid."]],
    ["Tu parles du temps d'hiver :",["En hiver, il fait froid.","En hiver, il est froid.","À hiver, il fait froid."]],
    ["Tu proposes une sortie s'il fait beau :",["S'il fait beau, on va au parc.","Si il fait beau, on va au parc.","S'il fait beau, on allons au parc."]]
  ],
  L: [
    ["Il pleut aujourd'hui.",["Il pleut aujourd'hui.","Il neige aujourd'hui.","Il pleuvait hier."]],
    ["Il fait chaud en été.",["Il fait chaud en été.","Il fait froid en hiver.","Il fait chaud en hiver."]],
    ["Demain, il va faire beau.",["Demain, il va faire beau.","Demain, il va pleuvoir.","Hier, il a fait beau."]],
    ["Quel temps fait-il ?",["Quel temps fait-il ?","Quelle heure est-il ?","Quel âge as-tu ?"]]
  ],
  F: [
    ["En hiver, il fait souvent froid.",1,"L'hiver est la saison la plus froide."],
    ["La neige tombe quand il fait très chaud.",0,"La neige tombe quand il fait très froid."],
    ["On utilise un parapluie quand il pleut.",1,"Le parapluie protège de la pluie."],
    ["L'été est une saison.",1,"Les quatre saisons : le printemps, l'été, l'automne et l'hiver."],
    ["Le soleil brille la nuit.",0,"Le soleil brille le jour. La nuit, on voit la lune."]
  ],
  O: ["Aujourd'hui, il fait très beau.","En hiver, il neige dans la montagne.","Demain, il va pleuvoir à Paris.","Je mets un manteau parce qu'il fait froid.","Quel temps fait-il aujourd'hui ?"]
},

animaux: { titre: "Les animaux", emoji: "🐶", verbes: false,
  V: [["le chien","🐶"],["le chat","🐱"],["le cheval","🐴"],["la vache","🐄"],["le cochon","🐷"],["le mouton","🐑"],["la poule","🐔"],["l'oiseau","🐦"],["le lapin","🐰"],["la souris","🐭"],["l'éléphant","🐘"],["le lion","🦁"],["le singe","🐒"],["l'ours","🐻"],["la tortue","🐢"],["la grenouille","🐸"],["l'abeille","🐝"],["le papillon","🦋"],["le serpent","🐍"],["la girafe","🦒"],["le pingouin","🐧","manchot|le manchot"],["le dauphin","🐬"],["le canard","🦆"],["le loup","🐺"]],
  P: [
    ["Le chat ___ : miaou !","miaule",["aboie","vole","nage"]],
    ["La vache donne du ___.","lait",["pain","riz","sucre"]],
    ["La poule pond des ___.","œufs",["pommes","poissons","gâteaux"]],
    ["L'oiseau ___ dans le ciel.","vole",["nage","roule","aboie"]],
    ["Le poisson ___ dans l'eau.","nage",["vole","court","grimpe"]],
    ["Mon chien s'appelle Max : ___ est très gentil.","il",["elle","ils","on"]],
    ["La girafe a un très long ___.","cou",["nez","pied","œil"]],
    ["Le lion est un animal ___.","sauvage",["sauvages","sauvagee","sauvagés"]]
  ],
  E: [
    ["Les vaches, les cochons et les poules vivent dans une ___.","ferme","🚜"],
    ["On va voir les lions et les girafes dans un ___.","zoo",""],
    ["Un petit chien s'appelle un ___.","chiot",""],
    ["L'animal qui fait « hi-han », c'est l'___.","âne|ane",""],
    ["Un petit chat s'appelle un ___.","chaton",""]
  ],
  S: [
    ["Tu parles de ton animal. Tu dis :",["J'ai un chat.","Je suis un chat.","J'ai une chat."]],
    ["Tu demandes à ton ami s'il a un animal :",["Tu as un animal ?","Tu es un animal ?","Tu as une animal ?"]],
    ["Tu dis que tu n'aimes pas les serpents :",["Je n'aime pas les serpents.","Je n'aime pas des serpents.","Je aime pas les serpents."]],
    ["Tu dis que ton chien est grand :",["Mon chien est grand.","Mon chien est grande.","Ma chien est grand."]],
    ["Tu montres un animal au zoo. Tu dis :",["Regarde, c'est un éléphant !","Regarde, c'est une éléphant !","Regarde, ce sont un éléphant !"]],
    ["Tu veux savoir le nom de l'animal de ton ami :",["Comment il s'appelle ?","Comment il appelle ?","Comment s'appelle tu ?"]]
  ],
  L: [
    ["Le chat dort sur le canapé.",["Le chat dort sur le canapé.","Le chien dort sur le canapé.","Le chat dort sous le canapé."]],
    ["J'ai deux chiens.",["J'ai deux chiens.","J'ai deux chats.","J'ai un chien."]],
    ["Le cheval mange de l'herbe.",["Le cheval mange de l'herbe.","La vache mange de l'herbe.","Le cheval boit de l'eau."]],
    ["L'oiseau vole dans le ciel.",["L'oiseau vole dans le ciel.","L'oiseau nage dans la mer.","Les oiseaux volent dans le ciel."]]
  ],
  F: [
    ["Un chat miaule.",1,"Le chat fait « miaou »."],
    ["Un poisson vole dans le ciel.",0,"Un poisson nage dans l'eau."],
    ["Les vaches donnent du lait.",1,"On fait du fromage avec le lait de vache."],
    ["Le lion vit dans une ferme.",0,"Le lion est un animal sauvage."],
    ["Un oiseau a des ailes.",1,"Les ailes permettent à beaucoup d'oiseaux de voler."]
  ],
  O: ["Mon chien aime jouer dans le jardin.","Les vaches mangent de l'herbe.","J'ai un petit chat gris.","Le lion est un animal sauvage.","Tu as un animal à la maison ?"]
},

metiers: { titre: "Les métiers", emoji: "👩‍🏫", verbes: false,
  V: [["le cuisinier","👨‍🍳","la cuisinière|cuisinière|cuisinier"],["le professeur","👩‍🏫","la professeure|professeure|prof|le prof|la prof|enseignant|l'enseignant"],["le médecin","👨‍⚕️","docteur|le docteur|la médecin"],["le pompier","👩‍🚒","la pompière"],["le policier","👮","la policière|policière"],["l'ouvrier","👷","ouvrier|l'ouvrière|ouvrière"],["l'agriculteur","👨‍🌾","l'agricultrice|agricultrice|le paysan|paysan"],["le mécanicien","👨‍🔧","la mécanicienne|mécanicienne|mecanicien"],["le pilote","👩‍✈️"],["le chanteur","👨‍🎤","la chanteuse|chanteuse"],["le peintre","👩‍🎨","la peintre|artiste|l'artiste"],["l'informaticien","👨‍💻","l'informaticienne|informaticienne|informaticien"],["le boulanger","","la boulangère|boulangère|boulangere"],["l'infirmier","","l'infirmière|infirmière|infirmiere"],["le vendeur","","la vendeuse|vendeuse"]],
  P: [
    ["Le boulanger fait du ___.","pain",["fromage","lait","poisson"]],
    ["Le professeur travaille à l'___.","école",["hôpital","banque","gare"]],
    ["Le pompier éteint le ___.","feu",["lait","vent","bruit"]],
    ["Mon père est cuisinier : il fait la ___ au restaurant.","cuisine",["lecture","piscine","musique"]],
    ["Ma mère est pilote : elle conduit un ___.","avion",["vélo","camion","bateau"]],
    ["Quel est ton ___ ? — Je suis infirmier.","métier",["mètre","maître","métro"]],
    ["Il travaille dans un ___ : il vend des vêtements.","magasin",["hôpital","avion","jardin"]],
    ["Le menuisier travaille le ___.","bois",["lait","sel","verre"]]
  ],
  E: [
    ["Il apporte les lettres chez nous : c'est le ___.","facteur",""],
    ["Il dirige le lycée ou le collège : c'est le ___.","directeur|proviseur|principal",""],
    ["Il construit des maisons : c'est un ___.","maçon|macon",""],
    ["Elle défend les gens au tribunal : c'est une ___.","avocate|avocat",""],
    ["Il soigne les animaux malades : c'est le ___.","vétérinaire|veterinaire",""]
  ],
  S: [
    ["Tu demandes le métier de ton ami. Tu dis :",["Quel est ton métier ?","Quel est ta métier ?","Quel tu es métier ?"]],
    ["Tu dis le métier de ton père : il est boulanger. Tu dis :",["Mon père est boulanger.","Mon père est boulangère.","Mon père a boulanger."]],
    ["Tu dis que ta mère travaille à l'hôpital :",["Ma mère travaille à l'hôpital.","Ma mère travaille au hôpital.","Ma mère travaille chez l'hôpital."]],
    ["Tu demandes où travaille le policier :",["Où travaille le policier ?","Où travailles le policier ?","Où le policier travaille-il ?"]],
    ["Tu veux savoir si ton ami aime son travail :",["Tu aimes ton travail ?","Tu aimes ta travail ?","Tu aime ton travail ?"]],
    ["Tu parles de ton rêve : tu veux être pilote :",["Je veux être pilote.","Je veux être de pilote.","Je veux étais pilote."]]
  ],
  L: [
    ["Il est cuisinier dans un restaurant.",["Il est cuisinier dans un restaurant.","Il est serveur dans un restaurant.","Elle est cuisinière dans un restaurant."]],
    ["Ma mère est médecin.",["Ma mère est médecin.","Mon père est médecin.","Ma mère est infirmière."]],
    ["Le pompier éteint le feu.",["Le pompier éteint le feu.","Le policier arrête le voleur.","Le pompier éteint la lumière."]],
    ["Elle travaille dans une école.",["Elle travaille dans une école.","Elle travaille dans un hôpital.","Il travaille dans une école."]]
  ],
  F: [
    ["Un boulanger fait du pain.",1,"Le boulanger travaille à la boulangerie."],
    ["Un professeur travaille souvent dans une école.",1,"Le professeur enseigne aux élèves."],
    ["Un pompier soigne les animaux.",0,"Le pompier éteint les incendies. Le vétérinaire soigne les animaux."],
    ["Un facteur apporte les lettres.",1,"Le facteur distribue le courrier."],
    ["Un policier travaille dans un restaurant.",0,"Le policier travaille au commissariat ou dans la rue."]
  ],
  O: ["Mon père est boulanger depuis dix ans.","Ma mère travaille à l'hôpital.","Que faites-vous comme métier ?","Le pompier éteint le feu avec de l'eau.","Je voudrais devenir professeur."]
},

nombres: { titre: "Les nombres", emoji: "🔢", verbes: false,
  V: [["zéro","0️⃣","zero"],["un","1️⃣"],["deux","2️⃣"],["trois","3️⃣"],["quatre","4️⃣"],["cinq","5️⃣"],["six","6️⃣"],["sept","7️⃣"],["huit","8️⃣"],["neuf","9️⃣"],["dix","🔟"],["onze",""],["douze",""],["vingt",""]],
  P: [
    ["Dix plus cinq égale ___.","quinze",["douze","seize","vingt"]],
    ["Trente moins dix égale ___.","vingt",["vingt-cinq","trente","quinze"]],
    ["Dix fois dix égale ___.","cent",["mille","vingt","dix"]],
    ["Vingt plus vingt égale ___.","quarante",["trente","cinquante","soixante"]],
    ["Soixante moins dix égale ___.","cinquante",["quarante","soixante-dix","vingt"]],
    ["Pour calculer 5 + 3, je fais une ___.","addition",["division","table","phrase"]],
    ["12 ÷ 3 est une ___.","division",["addition","soustraction","multiplication"]],
    ["Janvier est le ___ mois de l'année.","premier",["première","un","unième"]]
  ],
  E: [
    ["Écris en lettres : 16.","seize",""],
    ["Un siècle, c'est ___ ans.","cent",""],
    ["Six fois cinq, ça fait ___.","trente",""],
    ["Le nombre juste avant dix-sept, c'est ___.","seize",""],
    ["La moitié de quarante, c'est ___.","vingt",""]
  ],
  S: [
    ["Tu dis ton âge : tu as quatorze ans. Tu dis :",["J'ai quatorze ans.","Je suis quatorze ans.","J'ai quatorze an."]],
    ["Tu demandes l'âge de ton ami :",["Quel âge as-tu ?","Combien âge as-tu ?","Quel âge es-tu ?"]],
    ["Tu comptes jusqu'à trois :",["Un, deux, trois !","Un, deux, troix !","Une, deux, trois !"]],
    ["Tu veux savoir combien font 3 + 4 :",["Combien font trois plus quatre ?","Combien est trois plus quatre ?","Quel font trois plus quatre ?"]],
    ["Tu dis qu'il y a 25 élèves dans la classe :",["Il y a vingt-cinq élèves.","Il y a vingt-cinque élèves.","Il a vingt-cinq élèves."]],
    ["Tu donnes ta réponse : 3 + 4 = 7 :",["Trois plus quatre égale sept.","Trois plus quatre est sept égale.","Trois et quatre plus sept."]]
  ],
  L: [
    ["J'ai quinze ans.",["J'ai quinze ans.","J'ai cinq ans.","J'ai cinquante ans."]],
    ["Il y a vingt élèves dans la classe.",["Il y a vingt élèves dans la classe.","Il y a trente élèves dans la classe.","Il y a douze élèves dans la classe."]],
    ["Deux plus deux égale quatre.",["Deux plus deux égale quatre.","Deux plus deux égale cinq.","Deux fois deux égale quatre."]],
    ["C'est le numéro douze.",["C'est le numéro douze.","C'est le numéro deux.","C'est le numéro vingt."]]
  ],
  F: [
    ["Six est plus grand que huit.",0,"Huit est plus grand que six."],
    ["Dix plus dix égale vingt.",1,"10 + 10 = 20."],
    ["Une multiplication est une opération.",1,"L'addition, la soustraction, la multiplication et la division sont des opérations."],
    ["Une semaine a dix jours.",0,"Une semaine a sept jours."],
    ["La moitié de vingt, c'est dix.",1,"20 ÷ 2 = 10."]
  ],
  O: ["J'ai quatorze ans.","Il y a vingt-cinq élèves dans la classe.","Deux plus trois égale cinq.","Combien font dix fois dix ?","Mon numéro de classe est le douze."]
}

};

const conf = {
  corps: [["main","doigt","bras"],["tête","cerveau"],["œil","tête"],["bouche","langue","dent"],["pied","jambe"]],
  sante: [["médicament","pharmacie"],["médecin","hôpital","ambulance"],["thermomètre","médicament","piqûre"]],
  meteo: [["nuage","pluie","orage","parapluie"],["neige","bonhomme de neige"],["soleil","arc-en-ciel"],["nuage","vent"],["lune","étoile"],["printemps","été","automne","hiver"]],
  animaux: [["chien","loup"],["souris","lapin"],["oiseau","poule","canard"],["dauphin","tortue"],["vache","mouton","cochon","cheval"]],
  metiers: [["médecin","infirmier"],["cuisinier","boulanger"],["policier","pompier","pilote","ouvrier"],["peintre","chanteur"],["ouvrier","mécanicien"],["professeur","informaticien"]],
  nombres: [["onze","douze"],["six","neuf"],["trois","deux"]]
};

const ordre = ["corps","sante","meteo","animaux","metiers","nombres"];
module.exports = { themes, conf, ordre };
