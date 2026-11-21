'use strict';
/* Banque de questions du Mode Classe (8 thèmes × 50 questions).
   Vocabulaire repris des lexiques de l'enseignante (DELF A2 et français de scolarisation) ;
   toutes les phrases sont écrites pour ce jeu.
   Types : imgmot, motimg, ecrire, phrase, ordre, ecoute, vf, situation. */

/* V : [mot, emoji, variantes acceptées (séparées par |)]
   auto : [imgmot, motimg, ecrire, ecoute] tirés de V
   P : [phrase à trous ___, bonne, [fausses]]
   E : [consigne, réponse(s) séparées par |, emoji facultatif]   (à écrire)
   S : [situation, [bonne, fausse, fausse]]
   F : [affirmation, 1 = vrai / 0 = faux, explication]
   O : phrase à remettre dans l'ordre
   L : [phrase entendue, [bonne, fausse, fausse]] */
const THEMES = {

famille: { titre: "Ma famille", emoji: "👨‍👩‍👧‍👦", verbes: false, auto: [3, 2, 2, 1],
  V: [["le bébé","👶"],["le père","👨","papa"],["la mère","👩","maman"],["le grand-père","👴","papi"],["la grand-mère","👵","mamie"],["la famille","👨‍👩‍👧‍👦"],["le fils","👦"],["la fille","👧"]],
  P: [
    ["Le père de ma mère, c'est mon ___.","grand-père",["oncle","frère","cousin"]],
    ["La fille de mon oncle, c'est ma ___.","cousine",["tante","nièce","sœur"]],
    ["Hugo est le frère de Lina. Pour Lina, le fils de Hugo est son ___.","neveu",["cousin","oncle","père"]],
    ["Hugo est le frère de Lina. Pour Lina, la fille de Hugo est sa ___.","nièce",["cousine","tante","belle-sœur"]],
    ["La femme de mon frère, c'est ma ___.","belle-sœur",["tante","nièce","grand-mère"]],
    ["Voici mes frères. ___ mes frères.","Ce sont",["C'est","Il est","Elle est"]],
    ["C'est ma sœur. ___ s'appelle Eva.","Elle",["Il","Ils","Nous"]],
    ["Voici mes grands-parents. ___ habitent à Lyon.","Ils",["Il","Elle","Je"]],
    ["Tu présentes ta famille : voici ___ sœur.","ta",["ton","tes","mon"]],
    ["Lina présente Henri : « C'est ___ grand-père. »","mon",["ma","mes","ton"]]
  ],
  E: [
    ["La mère de ma mère, c'est ma ___.","grand-mère|grand mère","👵"],
    ["Le frère de mon père, c'est mon ___.","oncle"],
    ["La sœur de ma mère, c'est ma ___.","tante"],
    ["Le père et la mère, ce sont les ___.","parents","👨‍👩‍👧"],
    ["Mes parents et leurs enfants : c'est la ___.","famille","👨‍👩‍👧‍👦"],
    ["Le fils de mon oncle, c'est mon ___.","cousin"],
    ["Mon père a un père. C'est mon ___.","grand-père|grand père","👴"],
    ["Pour parler de ma mère, je dis : « ___ mère ». (mon / ma / mes)","ma"],
    ["Pour présenter plusieurs personnes, je dis : « ___ mes frères. » (C'est / Ce sont)","ce sont"],
    ["Henri est le père de Nadia. Nadia est sa ___.","fille","👩"]
  ],
  S: [
    ["Tu présentes ta mère à un ami. Tu dis :",["C'est ma mère.","Ce sont ma mère.","C'est mon mère."]],
    ["Tu présentes tes deux frères. Tu dis :",["Ce sont mes frères.","C'est mes frères.","Ce sont mon frère."]],
    ["Un ami demande : « Tu as des frères et sœurs ? » Tu as un frère. Tu réponds :",["J'ai un frère.","Je suis un frère.","J'ai frère."]],
    ["Tu parles de ta grand-mère : elle a 73 ans. Tu dis :",["Elle a 73 ans.","Elle est 73 ans.","Il a 73 ans."]],
    ["Tu présentes Henri, 76 ans, le père de ta mère. Tu dis :",["C'est mon grand-père. Il a 76 ans.","C'est ma grand-père. Il a 76 ans.","Ce sont mon grand-père."]],
    ["Tu demandes comment s'appelle la sœur de ton camarade. Tu dis :",["Comment s'appelle ta sœur ?","Comment s'appelle ton sœur ?","Comment s'appelles ta sœur ?"]]
  ],
  F: [
    ["Mon oncle est le frère de mon père ou de ma mère.",1,"Oui : un oncle est le frère de mon père ou de ma mère."],
    ["Ma cousine est la fille de mon père.",0,"Non : ma cousine est la fille de mon oncle ou de ma tante. La fille de mon père est ma sœur."],
    ["On dit « Ce sont mes parents » pour parler de plusieurs personnes.",1,"Oui : « Ce sont » sert à présenter plusieurs personnes."],
    ["Élise est la femme de Hugo, le frère de Lina. Élise est la belle-sœur de Lina.",1,"Oui : la femme de mon frère est ma belle-sœur."],
    ["Mon grand-père est le fils de mon père.",0,"Non : mon grand-père est le père de mon père ou de ma mère."],
    ["On dit « mon amie » devant une voyelle, même au féminin.",1,"Oui : « une amie » devient « mon amie »."]
  ],
  O: ["Voici mon frère et il s'appelle Hugo.","Ce sont mes grands-parents.","Mon oncle habite à Paris.","Ma cousine a douze ans.","Il est marié avec Élise.","Mes parents s'appellent Karim et Nadia."],
  L: [
    ["C'est mon grand-père.",["C'est mon grand-père.","C'est ma grand-mère.","Ce sont mes grands-parents."]],
    ["Elle a trente-six ans.",["Elle a trente-six ans.","Elle a seize ans.","Il a trente-six ans."]],
    ["Il s'appelle Hugo.",["Il s'appelle Hugo.","Elle s'appelle Lou.","Il s'appelle Noé."]],
    ["Ce sont mes cousins.",["Ce sont mes cousins.","C'est mon cousin.","Ce sont mes parents."]]
  ]
},

logement: { titre: "Mon logement", emoji: "🏠", verbes: false, auto: [6, 4, 4, 1],
  V: [["la maison","🏠"],["l'immeuble","🏢"],["la fenêtre","🪟"],["la porte","🚪"],["le lit","🛏️"],["la chaise","🪑"],["le canapé","🛋️"],["la télévision","📺","télé|la télé|tv"],["l'ordinateur","💻"],["le téléphone portable","📱","portable|téléphone|le portable"],["la clé","🔑","clef"],["la baignoire","🛁"],["la douche","🚿"],["les toilettes","🚽"],["le réveil","⏰"]],
  P: [
    ["J'habite dans un ___ avec mes parents.","appartement",["balcon","escalier","jardin"]],
    ["Je dors dans mon ___.","lit",["balcon","bureau","tapis"]],
    ["Le soir, je regarde la télévision dans le ___.","salon",["garage","grenier","toilettes"]],
    ["Je prépare le dîner dans la ___.","cuisine",["chambre","cave","entrée"]],
    ["Je prends une douche dans la ___.","salle de bains",["salle à manger","chambre","cuisine"]],
    ["Mon appartement est dans un ___.","immeuble",["jardin","toit","garage"]],
    ["Les livres sont dans la ___.","bibliothèque",["douche","cuisine","fenêtre"]],
    ["Le réveil est sur la table de ___.","chevet",["cuisine","salon","bain"]],
    ["La voiture est dans le ___.","garage",["salon","lit","balcon"]],
    ["Le tapis est posé ___ le sol.","sur",["dans","chez","avec"]]
  ],
  E: [
    ["On dort dans ce meuble.","lit","🛏️"],
    ["Pour monter à l'étage, on prend l'___.","escalier"],
    ["La pièce où on prépare le repas, c'est la ___.","cuisine","🍳"],
    ["Dans ma chambre, je range mes vêtements dans l'___.","armoire"],
    ["Je dors dans la ___.","chambre","😴"],
    ["Devant la maison, il y a un ___ avec des fleurs.","jardin","🌳"]
  ],
  S: [
    ["Tu dis où tu habites. Tu dis :",["J'habite dans un appartement.","J'habite à un appartement.","Je habite un appartement."]],
    ["Tu cherches les toilettes. Tu demandes :",["Où sont les toilettes ?","Où est les toilettes ?","Où il y a toilettes ?"]],
    ["Tu décris ta chambre. Tu dis :",["Dans ma chambre, il y a un lit.","Dans ma chambre, c'est un lit.","Ma chambre a dans un lit."]],
    ["Un ami demande : « Tu habites dans une maison ? » Tu habites dans un appartement. Tu réponds :",["Non, j'habite dans un appartement.","Oui, j'habite dans un maison.","Non, je suis un appartement."]],
    ["Tu cherches ton livre. Il est sur la table. Tu dis :",["Mon livre est sur la table.","Mon livre est sous le table.","Mon livre est sur le table."]]
  ],
  F: [
    ["On prend une douche dans la salle de bains.",1,"Oui : la douche est dans la salle de bains."],
    ["On dort dans la cuisine.",0,"Non : on dort dans la chambre. La cuisine sert à préparer les repas."],
    ["Un immeuble a plusieurs appartements.",1,"Oui : dans un immeuble, il y a beaucoup d'appartements."],
    ["Un balcon est dans le sol du jardin.",0,"Non : un balcon est une plateforme en hauteur, devant une fenêtre ou une porte."],
    ["Le salon est une pièce de la maison.",1,"Oui : le salon est une pièce, avec souvent un canapé et une télévision."]
  ],
  O: ["Mon appartement est dans un immeuble.","Il y a un lit dans ma chambre.","Il y a un canapé dans le salon.","J'habite dans une grande maison.","La cuisine est à côté du salon."],
  L: [
    ["J'habite dans un appartement.",["J'habite dans un appartement.","J'habite dans une maison.","Il habite dans un immeuble."]],
    ["Ma chambre est au premier étage.",["Ma chambre est au premier étage.","Ma cuisine est au premier étage.","Ma chambre est au rez-de-chaussée."]],
    ["Le canapé est dans le salon.",["Le canapé est dans le salon.","Le lit est dans le salon.","Le canapé est dans la chambre."]],
    ["Il y a un jardin derrière la maison.",["Il y a un jardin derrière la maison.","Il y a un jardin devant la maison.","Il y a un garage derrière la maison."]]
  ]
},

aliments: { titre: "Les aliments et les boissons", emoji: "🍎", verbes: false, auto: [10, 7, 7, 4],
  V: [["la pomme","🍎"],["l'orange","🍊"],["la banane","🍌"],["la fraise","🍓"],["la pastèque","🍉"],["l'ananas","🍍"],["le kiwi","🥝"],["le citron","🍋"],["la mangue","🥭"],["l'avocat","🥑"],["la carotte","🥕"],["la tomate","🍅"],["le brocoli","🥦"],["le concombre","🥒"],["l'oignon","🧅"],["l'ail","🧄"],["le champignon","🍄"],["le pain","🍞"],["la baguette","🥖"],["le croissant","🥐"],["le beurre","🧈"],["le fromage","🧀"],["le lait","🥛"],["l'œuf","🥚","oeuf"],["le riz","🍚"],["les pâtes","🍝"],["les frites","🍟"],["le sandwich","🥪"],["la pizza","🍕"],["le hamburger","🍔"],["le gâteau","🍰"],["la glace","🍦"],["le café","☕"],["le thé","🍵"],["l'eau","💧"],["le jus de fruits","🧃","jus|le jus"],["le poulet","🍗"],["le poisson","🐟"],["la viande","🥩"],["la pomme de terre","🥔","patate"]],
  P: [
    ["Je voudrais ___ eau, s'il vous plaît.","de l'",["du","des","un"]],
    ["Je prends ___ salade.","de la",["du","des","de l'"]],
    ["Je voudrais ___ fromage.","du",["de la","de l'","des"]],
    ["J'achète ___ œufs.","des",["du","de la","un"]],
    ["Je bois ___ lait le matin.","du",["de la","des","une"]],
    ["Je voudrais une bouteille ___ eau.","d'",["de la","du","des"]],
    ["Je ne mange pas de viande : je suis ___.","végétarien",["vendeur","cuisinier","boulanger"]]
  ],
  E: [
    ["Un fruit jaune qu'un singe adore : une ___.","banane","🐒"],
    ["Un légume orange : une ___.","carotte","🥕"],
    ["On boit cela le matin, chaud, avec ou sans sucre : le ___.","café|thé","☕"]
  ],
  S: [
    ["Tu demandes poliment du pain à la boulangère. Tu dis :",["Je voudrais du pain, s'il vous plaît.","Donne du pain !","Du pain, vite !"]],
    ["Tu aimes les tomates. Tu dis :",["J'aime les tomates.","Je aime tomates.","J'aime des tomates."]],
    ["Tu n'aimes pas le poisson. Tu dis :",["Je n'aime pas le poisson.","Je aime pas le poisson.","Je n'aime le poisson pas."]],
    ["Au marché, tu veux 250 grammes de beurre. Tu dis :",["Je voudrais 250 grammes de beurre.","Je voudrais 250 grammes du beurre.","Je voudrais 250 grammes beurre."]]
  ],
  F: [
    ["Le pain est un fruit.",0,"Non : le pain n'est pas un fruit. Une pomme et une banane sont des fruits."],
    ["Une tomate est un légume.",1,"Oui : on mange la tomate comme un légume, dans les salades."],
    ["Le lait est une boisson.",1,"Oui : le lait, l'eau, le thé et le café sont des boissons."]
  ],
  O: ["Je voudrais du pain et du fromage.","J'aime les pommes et les bananes.","Je prends une bouteille d'eau."],
  L: [
    ["Je voudrais une baguette.",["Je voudrais une baguette.","Je voudrais une banane.","J'ai une baguette."]],
    ["J'aime les fraises.",["J'aime les fraises.","J'aime les frites.","Je n'aime pas les fraises."]]
  ]
},

restaurant: { titre: "Au restaurant", emoji: "🍽️", verbes: false, auto: [8, 5, 5, 3],
  V: [["l'assiette","🍽️"],["le couteau","🔪"],["la fourchette","🍴"],["la cuillère","🥄"],["la salade","🥗"],["la soupe","🥣","le potage|potage"],["la pizza","🍕"],["le hamburger","🍔"],["la glace","🍦"],["le gâteau","🍰"],["le café","☕"],["le thé","🍵"],["l'addition","🧾"],["la carte bancaire","💳","carte"],["le cuisinier","🧑‍🍳","cuisinière|la cuisinière"],["le sandwich","🥪"],["les frites","🍟"],["le poulet","🍗"],["le poisson","🐟"],["les pâtes","🍝"],["la viande","🥩","le steak|steak"]],
  P: [
    ["Comme ___, je prends une soupe.","entrée",["addition","serveur","table"]],
    ["Comme boisson, je prends ___ carafe d'eau.","une",["un","du","de"]],
    ["Je voudrais ___ une table pour deux.","réserver",["réservé","réserves","commander"]],
    ["À la fin du repas, je demande ___, s'il vous plaît.","l'addition",["l'entrée","le menu","la réservation"]],
    ["Vous avez choisi ? — Oui, je ___ le plat du jour.","prends",["prend","prendre","prenez"]],
    ["Le client choisit son plat sur la ___.","carte",["gare","porte","douche"]],
    ["Pour le dessert, je prends ___ glace.","une",["un","de","du"]],
    ["Une table ___ deux, s'il vous plaît.","pour",["à","dans","avec"]],
    ["Le client paie ___ carte.","par",["sur","dans","chez"]]
  ],
  E: [
    ["Pour manger une soupe, j'utilise une ___.","cuillère","🥄"],
    ["Après le repas, je demande l'___.","addition","🧾"],
    ["La personne qui apporte les plats au restaurant, c'est le ___.","serveur|serveuse"],
    ["On commence le repas avec l'___, puis le plat, puis le dessert.","entrée"]
  ],
  S: [
    ["Tu arrives au restaurant. Tu dis :",["Bonjour, une table pour deux, s'il vous plaît.","Je veux table deux.","Donne-moi une table."]],
    ["Le serveur demande : « Vous avez choisi ? » Tu réponds :",["Oui, je prends le plat du jour.","Oui, je prendre le plat du jour.","Non, je suis le plat du jour."]],
    ["Tu veux de l'eau. Tu dis :",["Une carafe d'eau, s'il vous plaît.","Une carafe de l'eau, s'il vous plaît.","Je veux eau maintenant."]],
    ["Tu veux payer. Tu dis :",["L'addition, s'il vous plaît.","Le menu, s'il vous plaît.","Une table, s'il vous plaît."]],
    ["Tu ne manges pas de viande. Tu dis au serveur :",["Je ne prends pas de viande.","Je ne prends pas viande de.","Je prends pas viande."]],
    ["Tu veux réserver. Tu appelles et tu dis :",["Je voudrais réserver une table ce soir.","Je voudrais réservé une table ce soir.","Je veux réservons une table ce soir."]]
  ],
  F: [
    ["L'entrée est le premier plat du repas.",1,"Oui : on mange l'entrée, puis le plat principal, puis le dessert."],
    ["Le dessert arrive avant l'entrée.",0,"Non : le dessert arrive à la fin du repas."],
    ["On demande l'addition pour payer.",1,"Oui : l'addition est la facture du repas."],
    ["Un végétarien mange de la viande.",0,"Non : un végétarien ne mange pas de viande."]
  ],
  O: ["Je voudrais réserver une table pour deux.","Comme entrée, je prends une soupe.","Qu'est-ce que vous prenez comme boisson ?","L'addition, s'il vous plaît."],
  L: [
    ["Une table pour trois personnes.",["Une table pour trois personnes.","Une table pour deux personnes.","Un menu pour trois personnes."]],
    ["Je prends le plat du jour.",["Je prends le plat du jour.","Je prends la soupe du jour.","Je prends le menu du jour."]]
  ]
},

ville: { titre: "Dans ma ville", emoji: "🏙️", verbes: false, auto: [8, 6, 6, 3],
  V: [["l'école","🏫"],["l'hôpital","🏥"],["la banque","🏦"],["la poste","🏤"],["la gare","🚉"],["le cinéma","🎬"],["le théâtre","🎭"],["le musée","🏛️"],["la piscine","🏊"],["le parc","🌳"],["l'église","⛪"],["la pharmacie","💊"],["la boulangerie","🥖"],["la boucherie","🥩"],["la librairie","📚"],["le fleuriste","💐","magasin de fleurs|le magasin de fleurs|fleuriste"],["le supermarché","🛒"],["le bus","🚌","autobus"],["le métro","🚇"],["le vélo","🚲","bicyclette"],["la voiture","🚗"],["le feu rouge","🚦","feu|le feu"],["l'hôtel","🏨"]],
  P: [
    ["Je vais ___ pharmacie pour acheter des médicaments.","à la",["au","aux","à l'"]],
    ["Je vais ___ musée avec ma classe.","au",["à la","aux","à l'"]],
    ["Je vais ___ toilettes.","aux",["au","à la","à l'"]],
    ["J'achète du pain à la ___.","boulangerie",["pharmacie","banque","gare"]],
    ["À la ___, j'emprunte un livre.","bibliothèque",["mairie","boucherie","piscine"]],
    ["Pour acheter des fleurs, je vais chez le ___.","fleuriste",["boucher","pharmacien","boulanger"]],
    ["Le train part de la ___.","gare",["poste","mairie","piscine"]],
    ["Je vais ___ hôpital.","à l'",["au","à la","aux"]]
  ],
  E: [
    ["On nage dans une ___.","piscine","🏊"],
    ["On regarde un film au ___.","cinéma","🎬"],
    ["On achète des médicaments à la ___.","pharmacie","💊"],
    ["On prend le train à la ___.","gare","🚉"]
  ],
  S: [
    ["Tu veux acheter du pain. Tu dis :",["Je vais à la boulangerie.","Je vais au boulangerie.","Je vais chez la boulangerie."]],
    ["Tu cherches la gare. Tu demandes :",["Où est la gare ?","Où est le gare ?","Où la gare est ?"]],
    ["Tu veux acheter des médicaments. Tu dis :",["Je vais à la pharmacie.","Je vais à le pharmacie.","Je vais pharmacie."]],
    ["Tu veux acheter un livre. Tu dis :",["Je vais à la librairie.","Je vais à la boucherie.","Je vais à la piscine."]],
    ["Tu dois retirer de l'argent. Tu dis :",["Je vais à la banque.","Je vais à la poissonnerie.","Je vais au musée."]]
  ],
  F: [
    ["On achète du poisson à la poissonnerie.",1,"Oui : la poissonnerie vend du poisson."],
    ["On prend le train à l'aéroport.",0,"Non : on prend le train à la gare. À l'aéroport, on prend l'avion."],
    ["À la boulangerie, on achète du pain.",1,"Oui : on y achète une baguette, un croissant, un pain au chocolat…"],
    ["Un hôpital est un magasin.",0,"Non : un hôpital est un lieu de soins, pas un magasin."]
  ],
  O: ["Je vais à la boulangerie pour acheter du pain.","Où est la pharmacie, s'il vous plaît ?","Il y a un cinéma dans mon quartier.","Je vais à la poste avec ma mère."],
  L: [
    ["Je vais à la gare.",["Je vais à la gare.","Je vais à la mairie.","Je vais au garage."]],
    ["Où est la pharmacie ?",["Où est la pharmacie ?","Où est la boulangerie ?","Où est la piscine ?"]]
  ]
},

vetements: { titre: "Les vêtements", emoji: "👕", verbes: false, auto: [7, 5, 5, 3],
  V: [["la robe","👗"],["le pantalon","👖","jean|le jean"],["le short","🩳"],["la chemise","👔"],["le tee-shirt","👕","tee shirt|t-shirt|tshirt"],["le manteau","🧥"],["la casquette","🧢"],["le chapeau","🎩"],["l'écharpe","🧣","echarpe"],["les gants","🧤"],["les chaussettes","🧦"],["les baskets","👟"],["les bottes","👢"],["les sandales","👡"],["les escarpins","👠"],["le sac","👜"],["le sac à dos","🎒"],["les lunettes de soleil","🕶️","lunettes|les lunettes"],["le maillot de bain","🩱","maillot"],["la bague","💍"]],
  P: [
    ["Il fait froid : je mets un ___.","manteau",["short","maillot de bain","tee-shirt"]],
    ["En été, à la plage, je mets un ___.","maillot de bain",["manteau","pull","bonnet"]],
    ["Pour courir, je mets des ___.","baskets",["escarpins","ballerines","sandales"]],
    ["Une robe ___ : la robe est de couleur bleue.","bleue",["bleu","bleus","bleues"]],
    ["Un pantalon ___.","noir",["noire","noirs","noires"]],
    ["Des chaussettes ___.","blanches",["blanc","blanche","blancs"]],
    ["Quelle est votre ___ ? — Je mets du M.","taille",["pointure","couleur","matière"]],
    ["Quelle est votre ___ ? — Je fais du 36.","pointure",["taille","couleur","carte"]],
    ["Est-ce que je peux ___ ce pantalon ?","essayer",["essayé","essayez","essaie"]]
  ],
  E: [
    ["On met ça sur la tête pour se protéger du soleil : une ___.","casquette","🧢"],
    ["Quand il fait froid, j'ai une ___ autour du cou.","écharpe","🧣"],
    ["Ce sont des chaussures de sport : des ___.","baskets","👟"],
    ["Pour porter mes cahiers à l'école, j'ai un sac à ___.","dos","🎒"]
  ],
  S: [
    ["Tu veux essayer un pantalon. Tu demandes :",["Est-ce que je peux essayer ce pantalon ?","Je peux essayé ce pantalon ?","Est-ce que je essaie ce pantalon ?"]],
    ["Le pantalon est trop grand. Tu dis :",["C'est trop grand.","C'est trop grande.","Ce sont trop grand."]],
    ["Le vendeur demande : « Quelle est votre pointure ? » Tu réponds :",["Je fais du 36.","Je mets du M.","Je suis 36 ans."]],
    ["Tu demandes où sont les cabines d'essayage. Tu dis :",["Où sont les cabines d'essayage ?","Où est cabines d'essayage ?","Où sont les cabines de essai ?"]],
    ["Tu aimes la couleur rouge. Tu dis :",["Je préfère le rouge.","Je préfère la rouge.","Je préfère rouges."]],
    ["Tu paies avec ta carte. Tu dis :",["Je paie par carte.","Je paie dans carte.","Je paie à carte."]]
  ],
  F: [
    ["On porte des gants aux mains.",1,"Oui : les gants protègent les mains du froid."],
    ["On met des chaussettes sur la tête.",0,"Non : on met des chaussettes aux pieds, dans les chaussures."],
    ["Une pointure concerne les chaussures.",1,"Oui : la taille est pour les vêtements, la pointure est pour les chaussures."],
    ["On écrit « une robe bleu ».",0,"Non : « robe » est féminin, donc on écrit « une robe bleue »."]
  ],
  O: ["Je porte un pantalon et un tee-shirt.","Quand il fait froid, je mets un manteau.","Est-ce que je peux essayer cette robe ?","Ces chaussures me vont bien."],
  L: [
    ["Je mets un manteau.",["Je mets un manteau.","Je mets un chapeau.","Je mets un maillot."]],
    ["Elle porte une robe rouge.",["Elle porte une robe rouge.","Elle porte une jupe rouge.","Il porte un pull rouge."]],
    ["Quelle est votre taille ?",["Quelle est votre taille ?","Quelle est votre pointure ?","Quelle est votre couleur ?"]]
  ]
},

consignes: { titre: "Les consignes scolaires", emoji: "✏️", verbes: true, auto: [5, 4, 3, 2],
  V: [["dessiner","🎨","dessine|dessinez"],["colorier","🖍️","colorie|coloriez"],["découper","✂️","découpe|découpez|couper"],["écrire","✍️","écris|écrivez"],["lire","📖","lis|lisez"],["écouter","🎧","écoute|écoutez"],["regarder","👀","regarde|regardez"],["cocher","✅","coche|cochez"],["barrer","❌","barre|barrez"],["répondre","💬","réponds|répondez"],["chercher","🔍","cherche|cherchez|trouver"],["compter","🔢","compte|comptez"],["mesurer","📏","mesure|mesurez"],["calculer","🧮","calcule|calculez"],["parler","🗣️","parle|parlez"],["classer","🗂️","classe|classez|ranger"]],
  P: [
    ["La consigne dit : « ___ le nom. » Je trace un trait sous le nom.","Souligne",["Entoure","Efface","Colorie"]],
    ["« ___ le mot. » Je trace un cercle autour du mot.","Entoure",["Souligne","Coupe","Lis"]],
    ["« ___ la phrase. » J'écris la phrase à nouveau, sans changer.","Recopie",["Efface","Colle","Barre"]],
    ["« ___ les mots qui vont ensemble. » Je fais un trait entre eux.","Relie",["Coche","Efface","Dessine"]],
    ["« ___ la bonne réponse. » Je mets une croix dans la case.","Coche",["Découpe","Écoute","Colle"]],
    ["« ___ ta réponse. » Je donne une raison.","Justifie",["Recopie","Colorie","Colle"]],
    ["« ___ le texte, puis réponds aux questions. »","Lis",["Colle","Efface","Compte"]],
    ["« ___ les mots. » Je les mets dans des groupes.","Classe",["Colle","Efface","Découpe"]],
    ["Je ___ la question avant de répondre.","lis",["lit","lisons","lire"]],
    ["Il faut ___ deux mots dans le texte.","relever",["relevé","relevez","relèves"]]
  ],
  E: [
    ["Tracer un trait sous un mot, c'est ___.","souligner|souligne"],
    ["Tracer un cercle autour d'un mot, c'est ___.","entourer|entoure"],
    ["Écrire ce qui manque, c'est ___ la phrase.","compléter|complète"],
    ["Écrire à nouveau sans changer, c'est ___.","recopier|recopie"],
    ["Faire disparaître le crayon avec une gomme, c'est ___.","effacer|efface"],
    ["Mettre ensemble deux éléments qui vont ensemble, c'est ___.","relier|relie|associer|associe"],
    ["Donner une raison ou une preuve, c'est ___.","justifier|justifie"],
    ["Mettre une coche dans une case, c'est ___.","cocher|coche","✅"]
  ],
  S: [
    ["Le professeur dit : « Soulignez le verbe. » Qu'est-ce que tu fais ?",["Je trace un trait sous le verbe.","Je trace un cercle autour du verbe.","J'efface le verbe."]],
    ["La consigne dit : « Entourez le nom. » Tu fais :",["Je trace un cercle autour du nom.","Je trace un trait sous le nom.","Je coupe le nom."]],
    ["La consigne dit : « Cochez la bonne case. » Tu fais :",["Je mets une croix dans la case.","Je colle la case.","Je recopie la case."]],
    ["Tu ne comprends pas la consigne. Tu demandes :",["Pouvez-vous répéter, s'il vous plaît ?","Pouvez-vous répète, s'il vous plaît ?","Répétez-vous la consigne moi ?"]],
    ["Tu as fini l'exercice. Avant de rendre ta feuille, tu :",["vérifies tes réponses.","effaces toute la feuille.","coupes la feuille."]],
    ["La consigne dit : « Justifiez votre réponse. » Tu écris :",["une raison.","un dessin.","seulement ton nom."]]
  ],
  F: [
    ["« Souligner » veut dire tracer un trait sous un mot.",1,"Oui : on souligne avec un trait sous le mot."],
    ["« Effacer » veut dire écrire un mot.",0,"Non : effacer veut dire faire disparaître une marque ou une erreur."],
    ["« Entourer » veut dire tracer un cercle autour d'un mot.",1,"Oui : on entoure avec un cercle."],
    ["Pour « recopier », on change la phrase.",0,"Non : recopier veut dire écrire à nouveau sans rien changer."]
  ],
  O: ["Souligne le nom dans la phrase.","Relève deux mots dans le texte.","Je lis la consigne avant de répondre.","Coche la bonne réponse."],
  L: [
    ["Entourez le mot.",["Entourez le mot.","Soulignez le mot.","Effacez le mot."]],
    ["Recopiez la phrase.",["Recopiez la phrase.","Complétez la phrase.","Coupez la phrase."]],
    ["Lisez le texte.",["Lisez le texte.","Écoutez le texte.","Écrivez le texte."]],
    ["Répondez à la question.",["Répondez à la question.","Regardez la question.","Barrez la question."]]
  ]
},

materiel: { titre: "Le matériel de la classe", emoji: "🎒", verbes: false, auto: [7, 5, 5, 3],
  V: [["le livre","📖"],["le cahier","📓"],["la feuille","📄"],["le crayon","✏️"],["le stylo","🖊️"],["la règle","📏"],["les ciseaux","✂️"],["le sac à dos","🎒"],["la chaise","🪑"],["l'ordinateur","💻"],["la porte","🚪"],["la fenêtre","🪟"],["l'horloge","🕰️"],["le globe","🌍"],["la carte","🗺️"],["la corbeille","🗑️","poubelle|la poubelle"],["le trombone","📎"],["la calculatrice","🧮","calculette"],["le casier","🗄️"],["la loupe","🔍"]],
  P: [
    ["J'utilise une règle pour ___ un trait.","tracer",["découper","effacer","coller"]],
    ["J'utilise des ciseaux pour ___.","découper",["tracer","lire","effacer"]],
    ["J'utilise une gomme pour ___.","effacer",["découper","coller","mesurer"]],
    ["Le livre est ___ la table.","sur",["chez","pour","avec"]],
    ["Les stylos sont ___ la trousse.","dans",["chez","avec","pour"]],
    ["Est-ce que je peux ___ une gomme ?","emprunter",["emprunté","empruntez","emprunte"]],
    ["Peux-tu me ___ un stylo ?","prêter",["prêté","prêtes","prête"]],
    ["La corbeille est ___ du bureau.","près",["avec","pour","sans"]],
    ["Le professeur écrit au ___.","tableau",["plafond","sol","cahier"]],
    ["Je mets mes affaires dans mon sac à ___.","dos",["main","pied","tête"]]
  ],
  E: [
    ["Pour tracer un trait droit, j'utilise une ___.","règle","📏"],
    ["Pour jeter les papiers, j'utilise la ___.","corbeille|poubelle","🗑️"],
    ["Pour écrire avec de l'encre, j'utilise un ___.","stylo","🖊️"],
    ["On regarde l'heure sur l'___.","horloge","🕰️"]
  ],
  S: [
    ["Tu n'as pas de crayon. Tu demandes à ton voisin :",["Peux-tu me prêter un crayon ?","Peux-tu me prête un crayon ?","Prête crayon moi ?"]],
    ["Tu veux emprunter une règle au professeur. Tu demandes :",["Est-ce que je peux emprunter une règle ?","Est-ce que je peux emprunté une règle ?","Est-ce que tu empruntes une règle moi ?"]],
    ["Ton cahier est dans le sac. Tu dis :",["Mon cahier est dans le sac.","Mon cahier est dans sac.","Mon cahier dans est le sac."]],
    ["Tu dois découper une feuille. Tu utilises :",["des ciseaux.","une règle.","une gomme."]],
    ["Tu veux effacer une erreur au crayon. Tu utilises :",["une gomme.","des ciseaux.","un globe."]],
    ["Tu veux écrire au tableau. Tu demandes :",["Est-ce que je peux écrire au tableau ?","Est-ce que je peux écrit au tableau ?","Je peux écrire dans tableau ?"]]
  ],
  F: [
    ["Une règle sert à tracer des traits.",1,"Oui : une règle sert à tracer et à mesurer."],
    ["Des ciseaux servent à effacer.",0,"Non : des ciseaux servent à découper. Une gomme sert à effacer."],
    ["Une horloge indique l'heure.",1,"Oui : l'horloge montre l'heure."],
    ["Un globe est une représentation de la Terre en forme de boule.",1,"Oui : un globe représente la Terre."]
  ],
  O: ["Le livre est sur la table.","J'utilise des ciseaux pour découper.","Est-ce que je peux emprunter une gomme ?","Les cahiers sont dans mon sac à dos."],
  L: [
    ["J'ai un stylo et un cahier.",["J'ai un stylo et un cahier.","J'ai un crayon et un livre.","Il a un stylo et un cahier."]],
    ["La corbeille est près du bureau.",["La corbeille est près du bureau.","La corbeille est sous le bureau.","La chaise est près du bureau."]]
  ]
}
};

/* Thèmes ajoutés + groupes de mots/images à ne pas proposer ensemble (ambigus) + emojis récents
   (risque de carré vide sur de vieilles tablettes : on ne les utilise pas comme images). */
const PLUS = require("./themes2.js");
Object.assign(THEMES, PLUS.themes);
Object.keys(PLUS.conf).forEach(id => { if (THEMES[id]) THEMES[id].conf = (THEMES[id].conf || []).concat(PLUS.conf[id]); });
const RISQUE = new Set(PLUS.risque);
const ORDRE = ["famille","logement","aliments","restaurant","ville","vetements","consignes","materiel"].concat(PLUS.ordre);
const LIBELLES = {
  imgmot: "Quel est ce mot ?", motimg: "Touche la bonne image.", ecrire: "Écris le mot.",
  phrase: "Complète la phrase.", ordre: "Remets les mots dans l'ordre.", ecoute: "Écoute, puis choisis.",
  vf: "Vrai ou faux ?", situation: "Que dis-tu ?"
};

/* ---------- utilitaires ---------- */
const rnd = n => Math.floor(Math.random() * n);
function melange(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const COULEURS = ["bonne"];

/* ---------- vérification des réponses écrites ---------- */
function net(s) {
  return String(s == null ? "" : s).toLowerCase().replace(/[’‘`´]/g, "'").replace(/[-‐‑–—]/g, " ")
    .replace(/[^\p{L}\p{N}' ]/gu, " ").replace(/\s+/g, " ").trim();
}
const RE_ART = /^(?:(?:de la|du|des|de|un|une|le|la|les)\s+|(?:de l'|d'|l'))+/;
function sansArt(s) { const t = net(s); const u = t.replace(RE_ART, "").trim(); return u || t; }
function sansAccents(s) { return s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/œ/g, "oe").replace(/æ/g, "ae"); }
function distance(a, b) {
  if (Math.abs(a.length - b.length) > 1) return 2;
  const m = a.length, n = b.length, d = [];
  for (let i = 0; i <= m; i++) { d[i] = [i]; }
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++)
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[m][n];
}
/* résultat : { ok, presque } — « presque » = accents oubliés ou une faute de frappe */
function verifie(texte, acceptes) {
  const t = sansArt(texte);
  if (!t) return { ok: false, presque: false };
  const att = acceptes.map(sansArt);
  if (att.includes(t)) return { ok: true, presque: false };
  const ta = sansAccents(t);
  for (const a of att) {
    const aa = sansAccents(a);
    if (ta === aa) return { ok: true, presque: true };
    if (aa.length >= 5 && distance(ta, aa) <= 1) return { ok: true, presque: true };
  }
  return { ok: false, presque: false };
}

/* ---------- fabrication des questions ---------- */
function variantes(v) { return [v[0]].concat(v[2] ? v[2].split("|") : []); }
function motif(rep) {
  return sansArt(rep).replace(/[^\s'-]/g, "_").replace(/ /g, "  ");
}
function qcm(base, bonne, fausses) {
  const opts = melange([bonne].concat(fausses));
  base.options = opts.map(o => (typeof o === "string" ? { t: o } : o));
  base.bonne = opts.indexOf(bonne);
  return base;
}
function autresV(V, v, n, conf) {
  const groupe = w => (conf || []).map((g, i) => g.indexOf(sansArt(w[0])) >= 0 ? i : -1).filter(i => i >= 0);
  const interdit = new Set(groupe(v));
  const pris = [], vus = new Set([v[1], sansArt(v[0])]);
  for (const x of melange(V)) {
    if (pris.length >= n) break;
    if (x[0] === v[0] || vus.has(x[1]) || vus.has(sansArt(x[0]))) continue;
    if (groupe(x).some(i => interdit.has(i))) continue;
    pris.push(x); vus.add(x[1]); vus.add(sansArt(x[0])); groupe(x).forEach(i => interdit.add(i));
  }
  return pris;
}
const TEMPS = { imgmot: 15, motimg: 15, ecrire: 40, phrase: 25, ordre: 0, ecoute: 25, vf: 15, situation: 30 };

function construireTheme(id) {
  const T = THEMES[id], V = T.V, out = [];
  const [nIm, nMi, nEc, nEo] = T.auto;
  const conf = T.conf || [];
  const Vimg = V.filter(w => !RISQUE.has(w[1]));          // mots qu'on peut montrer en image
  const v = melange(V), vi = melange(Vimg);
  let k = 0, ki = 0;
  const prends = n => { const r = []; for (let i = 0; i < n; i++) r.push(v[(k++) % v.length]); return r; };
  const prendsImg = n => { const r = []; for (let i = 0; i < n; i++) r.push(vi[(ki++) % vi.length]); return r; };
  const base = (type, extra) => Object.assign({ theme: id, type, consigne: LIBELLES[type], temps: TEMPS[type] }, extra);

  prendsImg(nIm).forEach(w => out.push(qcm(
    base("imgmot", { emoji: w[1], consigne: T.verbes ? "Quelle est cette action ?" : "Quel est ce mot ?" }),
    { t: w[0] }, autresV(Vimg, w, 3, conf).map(x => ({ t: x[0] })))));
  out.forEach(q => { q.bonneTxt = q.options[q.bonne].t; });

  prendsImg(nMi).forEach(w => {
    const q = qcm(base("motimg", { texte: w[0], consigne: "Touche la bonne image." }),
      { e: w[1] }, autresV(Vimg, w, 3, conf).map(x => ({ e: x[1] })));
    q.bonneTxt = w[1]; out.push(q);
  });

  prendsImg(nEc).forEach(w => {
    const acc = variantes(w);
    out.push(base("ecrire", { emoji: w[1], consigne: T.verbes ? "Écris le verbe." : "Écris le mot en français.", acceptes: acc, affiche: w[0], motif: motif(w[0]) }));
  });

  prends(nEo).forEach(w => {
    const q = qcm(base("ecoute", { parle: w[0], consigne: "Écoute, puis choisis le mot." }),
      { t: w[0] }, autresV(V, w, 3, conf).map(x => ({ t: x[0] })));
    q.bonneTxt = w[0]; out.push(q);
  });

  T.P.forEach(p => {
    const q = qcm(base("phrase", { texte: p[0], consigne: "Complète la phrase." }), p[1], p[2]);
    q.bonneTxt = p[1]; out.push(q);
  });

  T.E.forEach(e => {
    const acc = e[1].split("|");
    out.push(base("ecrire", { texte: e[0], emoji: e[2] || "", consigne: "Écris le mot qui manque.", acceptes: acc, affiche: acc[0], motif: motif(acc[0]), temps: 45 }));
  });

  T.O.forEach(o => {
    const mots = o.split(" ");
    let t = melange(mots), essais = 0;
    while (t.join(" ") === o && essais++ < 10) t = melange(mots);
    out.push(base("ordre", { tuiles: t, ordreBon: mots, affiche: o, temps: 15 + 4 * mots.length }));
  });

  T.L.forEach(l => {
    const q = qcm(base("ecoute", { parle: l[0], consigne: "Écoute, puis choisis la phrase." }), l[1][0], l[1].slice(1));
    q.bonneTxt = l[1][0]; out.push(q);
  });

  T.F.forEach(f => {
    out.push(base("vf", { texte: f[0], options: [{ t: "Vrai" }, { t: "Faux" }], bonne: f[1] ? 0 : 1, bonneTxt: f[1] ? "Vrai" : "Faux", expl: f[2] }));
  });

  T.S.forEach(s => {
    const q = qcm(base("situation", { texte: s[0], consigne: "Que dis-tu ?" }), s[1][0], s[1].slice(1));
    q.bonneTxt = s[1][0]; out.push(q);
  });

  out.forEach((q, i) => { q.id = id + "-" + i; q.themeTitre = T.titre; q.themeEmoji = T.emoji; });
  return out;
}

/* total questions réparties entre les thèmes ; types variés */
function construire(themes, total, ordre) {
  themes = themes.filter(t => THEMES[t]);
  const part = Math.floor(total / themes.length);
  let reste = total - part * themes.length;
  let sel = [];
  themes.forEach(id => {
    const n = part + (reste-- > 0 ? 1 : 0);
    const tout = construireTheme(id);
    const groupes = {};
    melange(tout).forEach(q => (groupes[q.type] = groupes[q.type] || []).push(q));
    const types = melange(Object.keys(groupes));
    const pris = [];
    while (pris.length < n && types.some(t => groupes[t].length)) {
      for (const t of types) { if (pris.length >= n) break; if (groupes[t].length) pris.push(groupes[t].pop()); }
    }
    sel = sel.concat(pris);
  });
  if (ordre === "theme") {
    const par = {}; sel.forEach(q => (par[q.theme] = par[q.theme] || []).push(q));
    return themes.reduce((a, id) => a.concat(melange(par[id] || [])), []);
  }
  return melange(sel);
}

/* version publique : sans les réponses */
function publique(q) {
  return {
    id: q.id, type: q.type, consigne: q.consigne, texte: q.texte || "", emoji: q.emoji || "", parle: q.parle || "",
    options: q.options ? q.options.map(o => ({ t: o.t || "", e: o.e || "" })) : null,
    tuiles: q.tuiles || null, motif: q.motif || "", theme: q.themeTitre, themeEmoji: q.themeEmoji, temps: q.temps
  };
}

module.exports = { THEMES, ORDRE, LIBELLES, construire, construireTheme, publique, verifie, sansArt, melange };
