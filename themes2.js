'use strict';
/* Thèmes ajoutés au Mode Classe (6 thèmes × 50 questions), d'après les thèmes du lexique DELF A2 :
   Dans la cuisine, Mes loisirs, Faire des achats, Se déplacer, Trouver son chemin, Les vacances.
   Même structure que banque.js (V, auto, P, E, S, L, F, O). */

const themes = {

cuisine: { titre: "Dans la cuisine", emoji: "🍳", verbes: false, auto: [6, 4, 4, 3],
  V: [["la poêle","🍳"],["la casserole","🍲"],["le couteau","🔪"],["la fourchette","🍴"],["la cuillère","🥄"],["l'assiette","🍽️"],["le verre","🥃"],["la tasse","☕"],["la bouteille","🍾"],["le sel","🧂"],["la boîte de conserve","🥫","conserve|la conserve"],["l'éponge","🧽","eponge"],["le balai","🧹"],["le robinet","🚰"],["le glaçon","🧊"],["le gobelet","🥤"],["le panier","🧺"],["les baguettes","🥢","baguettes chinoises"],["le biberon","🍼"],["le feu","🔥"],["le pot de miel","🍯","miel|le miel"]],
  P: [
    ["Je coupe la viande avec un ___.","couteau",["verre","balai","robinet"]],
    ["Je mange la soupe avec une ___.","cuillère",["fourchette","assiette","bouteille"]],
    ["Je mets la salade dans une ___.","assiette",["éponge","poêle","tasse"]],
    ["Je fais cuire les œufs dans une ___.","poêle",["tasse","bouteille","assiette"]],
    ["Je bois mon thé dans une ___.","tasse",["poêle","casserole","éponge"]],
    ["Pour laver les assiettes, j'utilise une ___ et du savon.","éponge",["balai","fourchette","bouteille"]],
    ["Les verres sont ___ la table.","sur",["chez","pour","avec"]],
    ["Les assiettes sont ___ le placard.","dans",["chez","avec","pour"]]
  ],
  E: [
    ["Pour balayer le sol, j'utilise un ___.","balai","🧹"],
    ["On ouvre le ___ pour avoir de l'eau.","robinet","🚰"],
    ["Pour faire cuire des pâtes, on utilise une ___.","casserole|marmite","🍲"],
    ["On met un peu de ___ dans la soupe pour donner du goût.","sel","🧂"],
    ["On boit de l'eau dans un ___.","verre|gobelet","🥃"]
  ],
  S: [
    ["Tu veux une fourchette. Tu demandes :",["Je voudrais une fourchette, s'il vous plaît.","Je voudrais fourchette, s'il vous plaît.","Je voudrais un fourchette, s'il vous plaît."]],
    ["Tu mets la table. Tu dis :",["Je mets les assiettes sur la table.","Je mets les assiettes dans la table.","Je mettre les assiettes sur la table."]],
    ["Tu demandes où sont les verres. Tu dis :",["Où sont les verres ?","Où est les verres ?","Où les verres sont ?"]],
    ["Tu veux aider à la cuisine. Tu dis :",["Je peux t'aider ?","Je peux t'aides ?","Je pouvoir t'aider ?"]],
    ["Tu veux savoir à quoi sert une casserole. Tu demandes :",["À quoi sert une casserole ?","À quoi sers une casserole ?","À quoi sert casserole une ?"]],
    ["Tu expliques à quoi sert une casserole. Tu dis :",["Une casserole sert à cuire.","Une casserole sert à couper.","Une casserole sert à boire."]]
  ],
  L: [
    ["C'est une casserole.",["C'est une casserole.","C'est une cuillère.","Ce sont des casseroles."]],
    ["Je mets les verres sur la table.",["Je mets les verres sur la table.","Je mets les verres dans la table.","Je mets les assiettes sur la table."]],
    ["Une cuillère sert à manger la soupe.",["Une cuillère sert à manger la soupe.","Une fourchette sert à manger la soupe.","Un couteau sert à couper le pain."]],
    ["Où est le couteau ?",["Où est le couteau ?","Où est la fourchette ?","Où sont les couteaux ?"]]
  ],
  F: [
    ["Une casserole sert à cuire des aliments.",1,"On cuit les pâtes ou la soupe dans une casserole."],
    ["On boit dans une fourchette.",0,"On boit dans un verre ou dans une tasse."],
    ["Un couteau sert à couper.",1,"On coupe le pain ou la viande avec un couteau."],
    ["On met les verres sur la table pour le repas.",1,"On met la table avec des assiettes, des verres et des couverts."],
    ["Un balai sert à manger.",0,"Un balai sert à nettoyer le sol."]
  ],
  O: ["Je mets les assiettes sur la table.","Je range la fourchette dans le tiroir.","Je coupe le pain avec un couteau.","Les verres sont dans le placard.","Je lave la casserole dans l'évier."]
},

loisirs: { titre: "Mes loisirs", emoji: "⚽", verbes: false, auto: [6, 4, 4, 3],
  V: [["le football","⚽","foot|le foot"],["le basket","🏀","basket-ball|le basket-ball"],["le tennis","🎾"],["le rugby","🏉"],["le volley","🏐","volley-ball|le volley-ball"],["le ping-pong","🏓","ping pong|tennis de table|le tennis de table"],["la natation","🏊"],["le vélo","🚴"],["le ski","⛷️"],["la randonnée","🥾","rando|la rando"],["la pêche","🎣"],["la danse","💃"],["la musique","🎵"],["la guitare","🎸"],["le piano","🎹"],["le cinéma","🎬"],["le théâtre","🎭"],["la lecture","📚"],["le dessin","🎨"],["le jeu vidéo","🎮","jeux vidéo|les jeux vidéo|jeu video"],["les échecs","♟️","echecs"],["les cartes","🃏","cartes à jouer|les cartes à jouer"],["la photo","📷","la photographie|photographie"],["la fête","🎉"],["l'anniversaire","🎂"],["le cadeau","🎁"],["le concert","🎤"]],
  P: [
    ["Je ___ au football le mercredi.","joue",["nage","lis","dessine"]],
    ["Je ___ du vélo le dimanche.","fais",["joue","vais","mange"]],
    ["Je ___ au cinéma avec mes amis.","vais",["fais","joue","mange"]],
    ["Hier, j'___ au football.","ai joué",["joue","vais jouer","jouer"]],
    ["Demain, je ___ aller au cinéma.","vais",["ai","suis","fais"]],
    ["Elle joue ___ piano.","du",["au","de la","à la"]],
    ["Il joue ___ tennis.","au",["du","de la","aux"]],
    ["J'aime ___ des livres.","lire",["lis","lit","lisez"]]
  ],
  E: [
    ["Cet instrument a six cordes : la ___.","guitare","🎸"],
    ["Pour nager, je vais à la ___.","piscine","🏊"],
    ["Pour fêter les ans de quelqu'un, on organise une fête d'___.","anniversaire","🎂"],
    ["Sur mon ordinateur, je joue aux jeux ___.","vidéo","🎮"],
    ["Je regarde un film au ___.","cinéma","🎬"]
  ],
  S: [
    ["Tu invites un ami à ton anniversaire. Tu dis :",["Je t'invite à mon anniversaire.","Je te invite à mon anniversaire.","Je t'invite de mon anniversaire."]],
    ["Un ami te propose de jouer au football. Tu acceptes :",["Oui, avec plaisir !","Oui, je joues football !","Non, avec plaisir !"]],
    ["Tu veux savoir ce que ton camarade aime faire. Tu demandes :",["Qu'est-ce que tu aimes faire ?","Qu'est-ce que tu aimes fais ?","Qu'est-ce que tu aime faire ?"]],
    ["Tu refuses poliment une invitation. Tu dis :",["Désolé, je ne suis pas libre samedi.","Désolé, je ne suis pas libre à samedi.","Désolé, je ne libre suis pas samedi."]],
    ["Tu dis ce que tu fais le mercredi. Tu dis :",["Le mercredi, je joue au basket.","Le mercredi, je fais au basket.","Le mercredi, je joue du basket."]],
    ["Tu proposes à un ami d'aller au cinéma. Tu dis :",["On va au cinéma ?","On va à le cinéma ?","On vas au cinéma ?"]]
  ],
  L: [
    ["Je fais du vélo.",["Je fais du vélo.","Je fais du ski.","Je joue au vélo."]],
    ["J'aime nager.",["J'aime nager.","J'aime danser.","Je n'aime pas nager."]],
    ["Demain, je vais aller au cinéma.",["Demain, je vais aller au cinéma.","Hier, je suis allé au cinéma.","Demain, je vais aller au théâtre."]],
    ["Je joue au football.",["Je joue au football.","Je joue au basket.","Tu joues au football."]]
  ],
  F: [
    ["On joue au football avec un ballon.",1,"Le football se joue avec un ballon."],
    ["On fait de la natation dans une piscine.",1,"La natation est un sport dans l'eau."],
    ["Une guitare est un sport.",0,"Une guitare est un instrument de musique."],
    ["On dit « Je joue du piano ».",1,"Avec un instrument : jouer DU piano, DE la guitare."],
    ["On dit « Je joue du football ».",0,"Avec un sport : jouer AU football."]
  ],
  O: ["Le dimanche, je fais du vélo.","Mes amis jouent au football.","Samedi, je vais aller au cinéma avec Lina.","J'aime lire et dessiner.","Je t'invite à mon anniversaire."]
},

achats: { titre: "Faire des achats", emoji: "🛒", verbes: false, auto: [6, 4, 4, 3],
  V: [["le prix","🏷️"],["le ticket de caisse","🧾","ticket|le ticket"],["la carte bancaire","💳","carte|la carte"],["les espèces","💵","espèces|en espèces"],["l'euro","💶","euro"],["l'argent","💰"],["le sac","🛍️","sac|sac de courses"],["le panier","🧺"],["le chariot","🛒","caddie|le caddie"],["la balance","⚖️"],["le magasin","🏬"],["la boutique","🏪"],["le cadeau","🎁"],["la liste","📝","liste de courses|la liste de courses"],["le porte-monnaie","👛","porte monnaie"],["le vendeur","👨‍💼","la vendeuse|vendeuse|vendeur"],["la montre","⌚"],["les lunettes","👓"],["le sac à main","👜"],["le téléphone","📱","téléphone portable|le portable"]],
  P: [
    ["Combien ___ ce sac ?","coûte",["coûtent","coûter","coûtes"]],
    ["Je ___ par carte.","paie",["paies","paient","payer"]],
    ["Je voudrais ___ livre.","ce",["cette","ces","cet"]],
    ["Je voudrais ___ robe.","cette",["ce","ces","cet"]],
    ["Je voudrais ___ chaussures.","ces",["ce","cette","cet"]],
    ["Je paie à la ___.","caisse",["balance","vitrine","étiquette"]],
    ["Ce sac coûte dix ___.","euros",["euro","espèces","prix"]],
    ["Je cherche un cadeau ___ ma mère.","pour",["dans","sur","sous"]]
  ],
  E: [
    ["Pour payer avec des pièces et des billets, je paie en ___.","espèces","💵"],
    ["On met les courses dans un ___ ou dans un chariot.","panier|sac","🧺"],
    ["Avant d'aller au magasin, j'écris une ___ de courses.","liste","📝"],
    ["Pour savoir combien ça coûte, je demande le ___.","prix","🏷️"],
    ["Dans un magasin, la personne qui vend les produits, c'est le ___.","vendeur|vendeuse","👨‍💼"]
  ],
  S: [
    ["Tu veux connaître le prix d'un sac. Tu demandes :",["Combien coûte ce sac ?","Combien coûtent ce sac ?","Combien coûte ces sac ?"]],
    ["Tu choisis un livre. Tu dis :",["Je prends ce livre.","Je prends cette livre.","Je prends ces livre."]],
    ["Tu paies avec ta carte. Tu dis :",["Je paie par carte.","Je paie dans carte.","Je paie à carte."]],
    ["Le vendeur dit : « Ça fait vingt euros. » Tu donnes l'argent et tu dis :",["Voilà, vingt euros.","Voilà, vingt euro.","Voilà, vingts euros."]],
    ["Tu demandes si tu peux payer par carte. Tu dis :",["Je peux payer par carte ?","Je peux payer pour carte ?","Je peux payer dans carte ?"]],
    ["Tu n'as pas assez d'argent. Tu dis :",["Je n'ai pas assez d'argent.","Je n'ai pas assez de l'argent.","Je ne ai pas assez d'argent."]]
  ],
  L: [
    ["Combien ça coûte ?",["Combien ça coûte ?","Comment ça coûte ?","Combien tu coûtes ?"]],
    ["Je voudrais ce livre.",["Je voudrais ce livre.","Je voudrais cette robe.","Je voudrais ces livres."]],
    ["Je paie par carte.",["Je paie par carte.","Je paie en espèces.","Je paie à la caisse."]],
    ["Il coûte dix euros.",["Il coûte dix euros.","Il coûte douze euros.","Ils coûtent dix euros."]]
  ],
  F: [
    ["On paie à la caisse.",1,"La caisse est l'endroit où on paie."],
    ["Le ticket de caisse sert à cuire les aliments.",0,"Le ticket de caisse montre ce qu'on a acheté et le prix."],
    ["On peut payer par carte ou en espèces.",1,"Les espèces, ce sont les pièces et les billets."],
    ["Un panier sert à porter les courses.",1,"On met les achats dans le panier."],
    ["Un vendeur travaille dans une piscine.",0,"Un vendeur travaille dans un magasin."]
  ],
  O: ["Combien coûte ce sac ?","Je voudrais ce stylo bleu.","Je paie par carte à la caisse.","Voici le ticket de caisse.","Je prends le panier rouge."]
},

transports: { titre: "Se déplacer", emoji: "🚌", verbes: false, auto: [6, 4, 4, 3],
  V: [["le bus","🚌","autobus|l'autobus"],["le métro","🚇"],["le train","🚆"],["le tramway","🚊","tram|le tram"],["le taxi","🚕"],["l'avion","✈️"],["le bateau","⛵"],["le vélo","🚲","bicyclette|la bicyclette"],["la moto","🏍️"],["la voiture","🚗"],["le camion","🚚"],["le scooter","🛵"],["la trottinette","🛴"],["le billet","🎫"],["la gare","🚉"],["l'arrêt de bus","🚏","arrêt|l'arrêt"],["le feu tricolore","🚦","feu|le feu|feu rouge|le feu rouge"],["le piéton","🚶","piéton"],["le parking","🅿️","parking"],["la route","🛣️"],["le pont","🌉"],["l'ambulance","🚑"],["le camion de pompiers","🚒","pompiers|les pompiers|camion de pompiers"],["l'hélicoptère","🚁","helicoptere"]],
  P: [
    ["Je prends ___ bus pour aller au lycée.","le",["la","les","du"]],
    ["Je vais au lycée ___ pied.","à",["en","par","dans"]],
    ["Je vais à Paris ___ train.","en",["à","au","sur"]],
    ["Mon père voyage ___ avion.","en",["à","au","sur"]],
    ["Le train a dix minutes de ___.","retard",["billet","quai","arrêt"]],
    ["Je voudrais un ___ pour Paris.","billet",["quai","retard","arrêt"]],
    ["Le train part du ___ B.","quai",["billet","feu","pont"]],
    ["Pour traverser la rue, je marche sur le passage ___.","piéton",["rouge","vélo","bus"]]
  ],
  E: [
    ["Un transport rapide dans le ciel : un ___.","avion","✈️"],
    ["Un transport sous la terre dans une grande ville : le ___.","métro","🚇"],
    ["Je monte dans le train à la ___.","gare","🚉"],
    ["Ce véhicule à deux roues avec des pédales, c'est un ___.","vélo","🚲"],
    ["Le bus s'arrête à l'___ de bus.","arrêt","🚏"]
  ],
  S: [
    ["Tu veux acheter un billet de train. Tu dis :",["Je voudrais un billet pour Paris.","Je voudrais un billet à Paris.","Je veux billet Paris pour."]],
    ["Tu veux savoir l'heure du train. Tu demandes :",["À quelle heure part le train ?","À quelle heure partir le train ?","Quelle heure le train part à ?"]],
    ["Tu dis comment tu viens au lycée. Tu viens à pied :",["Je viens au lycée à pied.","Je viens au lycée en pied.","Je viens à lycée à pied."]],
    ["Tu dis comment tu voyages. Tu prends le train :",["Je voyage en train.","Je voyage au train.","Je voyage dans train."]],
    ["Le train est en retard. Tu dis :",["Le train a du retard.","Le train a de retard.","Le train est du retard."]],
    ["Tu cherches l'arrêt de bus. Tu demandes :",["Où est l'arrêt de bus ?","Où est la arrêt de bus ?","Où l'arrêt de bus est ?"]]
  ],
  L: [
    ["Je prends le bus.",["Je prends le bus.","Je prends le train.","Je prends la bus."]],
    ["Je vais au lycée à pied.",["Je vais au lycée à pied.","Je vais au lycée à vélo.","Je vais à la gare à pied."]],
    ["Le train a du retard.",["Le train a du retard.","Le bus a du retard.","Le train est à l'heure."]],
    ["Un billet pour Paris, s'il vous plaît.",["Un billet pour Paris, s'il vous plaît.","Un billet pour Lyon, s'il vous plaît.","Deux billets pour Paris, s'il vous plaît."]]
  ],
  F: [
    ["Le métro roule sous la terre dans une grande ville.",1,"Le métro est un transport souterrain."],
    ["Un avion voyage sur l'eau.",0,"Un avion voyage dans le ciel. Un bateau voyage sur l'eau."],
    ["On achète un billet pour prendre le train.",1,"Le billet permet de voyager."],
    ["Le vélo est un transport à deux roues.",1,"Un vélo a deux roues."],
    ["Un piéton conduit une voiture.",0,"Un piéton marche à pied."]
  ],
  O: ["Je prends le bus pour aller au lycée.","Le train part du quai trois.","Je voudrais un billet pour Paris.","Mon père va au travail en voiture.","Le métro a dix minutes de retard."]
},

chemin: { titre: "Trouver son chemin", emoji: "🧭", verbes: false, auto: [6, 4, 4, 3],
  V: [["à gauche","⬅️"],["à droite","➡️"],["tout droit","⬆️"],["le demi-tour","↩️","demi-tour|faire demi-tour"],["le rond-point","🔄","rond point|rond-point"],["le feu tricolore","🚦","feu|le feu|feu rouge|le feu rouge"],["le passage piéton","🚸","passage piéton|passage pour piétons|le passage pour piétons"],["le plan","🗺️","carte|la carte"],["la boussole","🧭"],["le sens interdit","⛔","sens interdit"],["le stop","🛑","panneau stop|le panneau stop"],["le parking","🅿️","parking"],["l'arrêt de bus","🚏","arrêt|l'arrêt"],["la route","🛣️"],["le pont","🌉"],["la fontaine","⛲"],["le départ","🚩"],["l'arrivée","🏁","arrivee"],["la gare","🚉"],["la poste","🏤"],["l'église","⛪","eglise"],["le château","🏰","chateau"],["la mairie","🏛️"],["l'hôtel","🏨","hotel"]],
  P: [
    ["Pour aller à la gare, allez ___.","tout droit",["tous droit","toute droit","tout droite"]],
    ["___ à gauche au feu.","Tournez",["Tourner","Tournes","Tourné"]],
    ["___ la rue, puis prenez la deuxième à droite.","Traversez",["Traverser","Traversé","Traverses"]],
    ["La gare est ___ de la mairie.","en face",["en haut","en bas","en dessous"]],
    ["Le parc est ___ de l'école : on marche deux minutes.","près",["sous","sur","avec"]],
    ["Allez tout droit, ___ tournez à droite.","puis",["pour","avec","chez"]],
    ["Le musée est ___ la banque et la poste.","entre",["sur","chez","pour"]],
    ["Excusez-moi, pour aller ___ gare ?","à la",["au","aux","à l'"]]
  ],
  E: [
    ["Le contraire de « à droite », c'est « à ___ ».","gauche","⬅️"],
    ["Quand je ne tourne pas, je vais tout ___.","droit","⬆️"],
    ["Pour traverser la rue, je marche sur le passage ___.","piéton|pour piétons","🚸"],
    ["Pour savoir où je suis dans la ville, je regarde le ___.","plan|la carte|carte","🗺️"],
    ["Le contraire du départ, c'est l'___.","arrivée","🏁"]
  ],
  S: [
    ["Tu cherches la poste. Tu demandes :",["Excusez-moi, où est la poste ?","Excusez-moi, où est le poste ?","Excusez-moi, où la poste est ?"]],
    ["Tu expliques le chemin vers la gare. Tu dis :",["Allez tout droit, puis tournez à gauche.","Allez tout droite, puis tournez à gauche.","Allez tout droit, puis tourner à gauche."]],
    ["Tu demandes comment aller au parc. Tu dis :",["Pour aller au parc, s'il vous plaît ?","Pour aller à le parc, s'il vous plaît ?","Pour allez au parc, s'il vous plaît ?"]],
    ["Tu veux savoir si le musée est loin. Tu demandes :",["Est-ce que le musée est loin d'ici ?","Est-ce que le musée est loin à ici ?","Est-ce que le musée loin est d'ici ?"]],
    ["Tu dis que la pharmacie est en face de la banque. Tu dis :",["La pharmacie est en face de la banque.","La pharmacie est en face la banque.","La pharmacie est face de la banque."]],
    ["Tu ne comprends pas l'indication. Tu dis :",["Pouvez-vous répéter, s'il vous plaît ?","Pouvez-vous répètes, s'il vous plaît ?","Pouvez-vous répéter-moi, s'il vous plaît ?"]]
  ],
  L: [
    ["Allez tout droit.",["Allez tout droit.","Tournez à droite.","Allez à gauche."]],
    ["Tournez à gauche.",["Tournez à gauche.","Tournez à droite.","Tournons à gauche."]],
    ["La gare est en face de la mairie.",["La gare est en face de la mairie.","La gare est à côté de la mairie.","La poste est en face de la mairie."]],
    ["Où est la pharmacie, s'il vous plaît ?",["Où est la pharmacie, s'il vous plaît ?","Où est la poste, s'il vous plaît ?","Où sont les pharmacies, s'il vous plaît ?"]]
  ],
  F: [
    ["« À gauche » est le contraire de « à droite ».",1,"Gauche et droite sont deux directions opposées."],
    ["« Tout droit » veut dire tourner.",0,"« Tout droit » veut dire ne pas tourner."],
    ["Un plan aide à trouver son chemin.",1,"Un plan montre les rues et les lieux."],
    ["Le départ est la fin du trajet.",0,"Le départ est le début. L'arrivée est la fin."],
    ["On peut traverser la rue sur un passage piéton.",1,"Le passage piéton est fait pour traverser."]
  ],
  O: ["Pour aller à la gare, allez tout droit.","Tournez à droite au feu rouge.","La poste est en face de la mairie.","Prenez la deuxième rue à gauche.","Excusez-moi, où est la banque ?"]
},

vacances: { titre: "Les vacances", emoji: "🏖️", verbes: false, auto: [6, 4, 4, 3],
  V: [["la mer","🌊"],["la montagne","⛰️"],["la plage","🏖️"],["la forêt","🌲","foret"],["le château","🏰","chateau"],["le palmier","🌴"],["l'ours","🐻"],["le requin","🦈"],["le crabe","🦀"],["le coquillage","🐚"],["la valise","🧳"],["le passeport","🛂"],["l'hôtel","🏨","hotel"],["le soleil","☀️"],["la tente","⛺"],["l'appareil photo","📷","appareil"],["la crème solaire","🧴","creme solaire"],["les lunettes de soleil","🕶️","lunettes|les lunettes"],["le parasol","⛱️"],["le bateau","⛵"],["l'avion","✈️"],["la lettre","✉️"],["le courriel","📧","mail|le mail|e-mail|l'e-mail"],["l'île","🏝️","ile"],["la neige","❄️"],["le sac à dos","🎒"]],
  P: [
    ["Nous allons ___ la mer cet été.","à",["au","aux","chez"]],
    ["Je vais ___ montagne en hiver.","à la",["au","aux","en"]],
    ["Nous logeons ___ un hôtel.","dans",["sur","sous","chez"]],
    ["Hier, je ___ allé à la plage.","suis",["ai","vais","est"]],
    ["Hier, j'___ visité un château.","ai",["suis","vais","est"]],
    ["À la plage, je mets de la crème ___ pour protéger ma peau.","solaire",["solide","spéciale","sauvage"]],
    ["Pour passer la frontière, j'ai besoin d'un ___.","passeport",["parasol","palmier","coquillage"]],
    ["Il fait très chaud : je mets mes lunettes de ___.","soleil",["neige","pluie","mer"]]
  ],
  E: [
    ["Pour partir en voyage, je range mes vêtements dans une ___.","valise","🧳"],
    ["On dort dans une ___ quand on fait du camping.","tente","⛺"],
    ["On prend une photo avec un appareil ___.","photo","📷"],
    ["Sur la plage, on trouve du sable et des ___.","coquillages","🐚"],
    ["Pour écrire à un ami qui est loin, j'envoie une carte ___.","postale","💌"]
  ],
  S: [
    ["Tu veux réserver une chambre d'hôtel. Tu dis :",["Je voudrais une chambre pour deux nuits.","Je voudrais un chambre pour deux nuits.","Je veux chambre deux nuits pour."]],
    ["Tu racontes ta journée d'hier à la plage. Tu dis :",["Hier, je suis allé à la plage.","Hier, je vais à la plage.","Hier, j'ai allé à la plage."]],
    ["Tu parles de demain. Tu dis :",["Demain, je vais visiter un château.","Demain, j'ai visité un château.","Demain, je visité un château."]],
    ["Tu demandes à un ami où il part. Tu dis :",["Où est-ce que tu pars en vacances ?","Où est-ce que tu pars à vacances ?","Où tu est-ce pars en vacances ?"]],
    ["Tu termines un message à un ami. Tu écris :",["À bientôt !","À bientôts !","A bientôt vous !"]],
    ["Tu demandes des nouvelles dans un message. Tu écris :",["Et toi, comment vas-tu ?","Et toi, comment vas-toi ?","Et tu, comment vas ?"]]
  ],
  L: [
    ["Je suis allé à la mer.",["Je suis allé à la mer.","Je suis allé à la montagne.","Je vais aller à la mer."]],
    ["Je vais réserver une chambre.",["Je vais réserver une chambre.","J'ai réservé une chambre.","Je vais réserver un hôtel."]],
    ["Il fait beau et il fait chaud.",["Il fait beau et il fait chaud.","Il fait beau et il fait froid.","Il pleut et il fait chaud."]],
    ["Nous logeons dans un hôtel.",["Nous logeons dans un hôtel.","Nous logeons dans une tente.","Ils logent dans un hôtel."]]
  ],
  F: [
    ["On met de la crème solaire pour se protéger du soleil.",1,"La crème solaire protège la peau."],
    ["Un palmier est un animal de la montagne.",0,"Un palmier est un arbre des pays chauds."],
    ["Un passeport est utile pour voyager à l'étranger.",1,"Le passeport est un document d'identité pour voyager."],
    ["On dort dans une tente quand on fait du camping.",1,"Une tente est un abri léger pour dormir dehors."],
    ["Une valise sert à nager.",0,"Une valise sert à transporter ses affaires."]
  ],
  O: ["Hier, je suis allé à la plage.","Nous logeons dans un hôtel près de la mer.","Demain, je vais visiter un château.","Je voudrais une chambre pour deux nuits.","Cet été, nous allons à la montagne."]
}

};

/* mots (sans article) qu'on ne propose pas ensemble : trop proches ou ambigus en image */
const conf = {
  aliments: [["pain","baguette","croissant"],["poulet","viande"],["pomme de terre","frites"],["jus de fruits","eau"],["gâteau","glace"]],
  restaurant: [["assiette","fourchette","couteau","cuillère"],["poulet","viande"],["café","thé"],["gâteau","glace"],["salade","soupe"]],
  vetements: [["sac","sac à dos"],["chapeau","casquette"],["pantalon","short"],["robe","maillot de bain"],["chemise","tee-shirt"]],
  consignes: [["compter","calculer","mesurer"],["parler","répondre"],["regarder","chercher"],["écrire","colorier","dessiner"]],
  materiel: [["globe","carte"],["crayon","stylo"],["livre","cahier","feuille"]],
  logement: [["douche","baignoire"],["lit","canapé"]],
  famille: [["père","fils"],["mère","fille"]],
  ville: [["bus","métro"],["hôpital","pharmacie"]],
  cuisine: [["poêle","casserole"],["assiette","fourchette","couteau","cuillère"],["verre","gobelet","tasse","bouteille"],["éponge","balai"]],
  loisirs: [["football","rugby"],["basket","volley"],["tennis","ping-pong"],["fête","anniversaire","cadeau"],["musique","guitare","piano","concert"],["lecture","dessin"],["cinéma","théâtre"]],
  achats: [["espèces","argent","euro","porte-monnaie"],["magasin","boutique"],["sac","sac à main","panier"],["prix","ticket de caisse"],["chariot","panier"]],
  transports: [["train","tramway","métro"],["bus","camion"],["voiture","taxi"],["moto","scooter","vélo","trottinette"],["avion","hélicoptère"],["ambulance","camion de pompiers"],["route","pont"],["gare","arrêt de bus"]],
  chemin: [["départ","arrivée"],["plan","boussole"],["stop","sens interdit"],["feu tricolore","passage piéton"],["route","pont"],["gare","arrêt de bus"]],
  vacances: [["mer","plage","île","bateau"],["montagne","neige"],["soleil","parasol","crème solaire","lunettes de soleil"],["lettre","courriel"],["valise","sac à dos"],["hôtel","tente"],["requin","crabe"]]
};

/* emojis récents : risque de « carré vide » sur de vieilles tablettes → jamais utilisés comme images */
const risque = ["🪑","🪟","🩳","🩱","🧑‍🍳","🧄","🧅","🧈","🧃","🩰","🪁","🪀","🛕","🛻","🪙","🟢","🔴"];

/* emojis qui montrent plusieurs choses ou autre chose que le mot : jamais utilisés comme image.
   (🍽️ assiette+couverts, 🍴 fourchette+couteau, 🛋️ canapé+lampe, 🍳 œuf dans la poêle, 🍲/🥣 plat + cuillère,
    🏖️ plage+parasol, 🏝️ île+palmier, 🍝 pâtes+fourchette, 🧮 abaque ≠ calculatrice, 🗄️ ≠ casier…) */
const trompeur = ["🍽️","🍴","🛋️","🍳","🍲","🥣","🍾","🥤","🏖️","🏝️","🍝","🧮","🗄️","🔄","🚩","🏁","🏛️","🛂","🏪","💵","💰","📚","🎂","🎤","👨‍💼","🗂️","🎩","🛁","🏊","🚴"];

const ordre = ["cuisine","loisirs","achats","transports","chemin","vacances"];

const T3 = require("./themes3.js");
Object.assign(themes, T3.themes);
Object.assign(conf, T3.conf);
ordre.push(...T3.ordre);

module.exports = { themes, conf, risque, trompeur, ordre };
