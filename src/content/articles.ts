/**
 * The journal.
 *
 * Articles are data rather than markdown files so every block is typed and
 * the same source feeds the page, the listing and the structured data. Each
 * one opens with a direct answer to the question in its title: an assistant
 * looking for something to quote takes the first passage that stands alone,
 * and a reader deciding whether to continue does the same.
 *
 * Nothing here describes a named client.
 */

export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "list"; items: readonly string[] }
  | { kind: "quote"; text: string }
  /** A worked example. Rendered with a label saying it is one. */
  | { kind: "example"; title: string; lines: readonly string[] };

export type Article = {
  slug: string;
  title: string;
  /** Used as the meta description and as the listing summary. */
  summary: string;
  /** The question the article answers, for the FAQ graph. */
  question: string;
  /** A standalone answer, quotable out of context. */
  answer: string;
  published: string;
  readingMinutes: number;
  tag: string;
  blocks: readonly Block[];
};

export const ARTICLES: ReadonlyArray<Article> = [
  {
    slug: "mesurer-le-temps-qu-une-tache-coute-vraiment",
    title: "Mesurer ce qu'une tâche coûte vraiment avant d'automatiser quoi que ce soit",
    summary:
      "La plupart des projets d'automatisation démarrent sur une intuition et finissent sans preuve. Voici la mesure qui remplace l'intuition, et comment la faire en une demi-journée.",
    question: "Comment savoir si une tâche mérite d'être automatisée ?",
    answer:
      "En la chronométrant sur une semaine réelle plutôt qu'en l'estimant de mémoire. On compte le temps passé, le nombre de reprises et le nombre d'interruptions, puis on multiplie par le taux horaire chargé de la personne qui la fait. Une tâche mérite d'être automatisée quand ce coût mensuel dépasse nettement le coût de l'automatisation amorti sur un an. En dessous, le projet coûte plus qu'il ne rapporte, et il vaut mieux le savoir avant de le lancer.",
    published: "2026-09-23",
    readingMinutes: 6,
    tag: "Méthode",
    blocks: [
      {
        kind: "p",
        text: "Presque tous les projets d'automatisation que je reprends ont démarré de la même façon : quelqu'un a trouvé qu'une tâche prenait trop de temps, et on s'est mis à construire. Personne n'a mesuré combien de temps, exactement. Six mois plus tard, la question « est-ce que ça a servi ? » n'a pas de réponse, parce qu'il n'y avait pas de point de départ.",
      },
      {
        kind: "p",
        text: "La mesure prend une demi-journée. Elle n'est pas compliquée, elle est seulement ennuyeuse, ce qui est la vraie raison pour laquelle elle est sautée.",
      },
      { kind: "h2", text: "Ce qu'on compte, et ce qu'on ne compte pas" },
      {
        kind: "p",
        text: "On suit une seule tâche, du moment où elle arrive jusqu'au moment où elle est finie, sur une semaine ordinaire. Pas une semaine de bouclage, pas une semaine de vacances. On note trois choses.",
      },
      {
        kind: "list",
        items: [
          "Le temps de manipulation : les minutes réellement passées dessus, pas la durée entre le début et la fin.",
          "Les reprises : combien de fois le dossier est rouvert parce qu'il manquait quelque chose.",
          "Les interruptions : combien de fois la personne s'arrête pour aller chercher une information ailleurs.",
        ],
      },
      {
        kind: "p",
        text: "Les deux dernières comptent souvent plus que la première. Une tâche de quatre minutes reprise six fois coûte davantage qu'une tâche de vingt minutes faite d'un trait, parce que chaque reprise oblige à recharger le contexte en tête.",
      },
      { kind: "h2", text: "Le calcul" },
      {
        kind: "p",
        text: "Le temps hebdomadaire se convertit en francs avec le taux horaire chargé de la personne qui fait le travail, charges sociales comprises, pas son salaire brut divisé par les heures. Ce montant se compare ensuite au coût de l'automatisation, amorti sur douze mois, maintenance incluse.",
      },
      {
        kind: "example",
        title: "Exemple de calcul",
        lines: [
          "Temps mesuré : 15 h par semaine, réparties sur trois personnes",
          "Taux horaire chargé retenu : 55 CHF",
          "Coût mensuel : 15 × 55 × 4,3 ≈ 3'550 CHF",
          "Après automatisation, contrôle humain inclus : 3 h par semaine",
          "Écart mensuel : environ 2'840 CHF",
        ],
      },
      {
        kind: "p",
        text: "Ces chiffres sont une illustration, pas un résultat. Les vôtres seront différents, et c'est précisément pour cela qu'il faut les mesurer plutôt que reprendre ceux d'un article.",
      },
      { kind: "h2", text: "Quand la réponse est non" },
      {
        kind: "p",
        text: "Une mesure honnête produit régulièrement un non. Une tâche pénible n'est pas forcément une tâche coûteuse : elle peut agacer tout le monde et ne représenter qu'une heure par mois. À l'inverse, une tâche que personne ne remarque peut engloutir une journée par semaine parce qu'elle est diluée en petits bouts.",
      },
      {
        kind: "quote",
        text: "Le premier service que rend une mesure, c'est d'éviter un projet. Le second, c'est de pouvoir prouver que le deuxième en valait la peine.",
      },
      { kind: "h2", text: "Remesurer, sinon rien" },
      {
        kind: "p",
        text: "La mesure d'après compte autant que celle d'avant. Un mois après la mise en service, on refait exactement le même relevé, sur la même tâche, avec la même méthode. Si le chiffre n'a pas bougé, le projet a échoué, quelle que soit l'élégance de ce qui a été construit. Le savoir permet de corriger ; ne pas le savoir permet seulement de continuer à payer.",
      },
    ],
  },
  {
    slug: "ou-vivent-vos-donnees-quand-vous-utilisez-lia",
    title: "Où vivent vos données quand vous utilisez l'IA, et pourquoi la question se tranche au départ",
    summary:
      "La question de l'hébergement arrête la moitié des projets d'IA en entreprise, presque toujours trop tard. Les trois options réelles, et laquelle correspond à quelle situation.",
    question: "Mes données partent-elles à l'étranger si j'utilise l'IA dans mon entreprise ?",
    answer:
      "Cela dépend entièrement du montage choisi, et c'est une décision, pas une fatalité. Trois options existent : un modèle exécuté sur du matériel installé dans vos locaux, où rien ne sort du réseau local ; un hébergement en Suisse ou dans l'Union européenne avec un contrat de sous-traitance ; ou l'usage direct d'un service grand public, où le contrôle est le plus faible. Le choix se fait au début du projet, parce qu'en changer après coup revient presque toujours à tout reconstruire.",
    published: "2026-09-23",
    readingMinutes: 7,
    tag: "Souveraineté",
    blocks: [
      {
        kind: "p",
        text: "C'est la question qui arrête le plus de projets d'IA en entreprise, et elle arrive presque toujours au mauvais moment : une fois que le système fonctionne, quand quelqu'un demande où passent les dossiers. À ce stade, la réponse est souvent « je vais me renseigner », et le projet s'arrête là.",
      },
      {
        kind: "p",
        text: "Elle se tranche au départ, en même temps que le périmètre. Il n'y a que trois options réelles.",
      },
      { kind: "h2", text: "Option 1 : sur votre matériel" },
      {
        kind: "p",
        text: "Une machine est installée dans vos locaux et fait tourner le modèle localement. Aucune donnée ne quitte votre réseau, et c'est vérifiable : un prestataire informatique peut observer le trafic sortant et constater qu'il n'y en a pas.",
      },
      {
        kind: "list",
        items: [
          "Pour qui : les métiers sous secret professionnel, fiduciaires, avocats, médecins, et toute structure dont les clients l'exigent contractuellement.",
          "Ce que ça coûte : du matériel à l'achat, et des modèles plus petits que ceux des services en ligne.",
          "La limite : un modèle local reste moins performant sur les tâches de rédaction libre. Sur l'extraction et le classement de documents, l'écart est faible.",
        ],
      },
      { kind: "h2", text: "Option 2 : hébergé, et documenté" },
      {
        kind: "p",
        text: "Le système tourne sur une infrastructure en Suisse ou dans l'Union européenne, avec un contrat de sous-traitance qui nomme les serveurs, les modèles et la durée de conservation. Les données sortent de chez vous, mais vers un endroit identifié, sous un contrat que vous pouvez produire si on vous le demande.",
      },
      {
        kind: "p",
        text: "C'est le cas courant, et il convient à la grande majorité des entreprises. Le point qui compte n'est pas que les données sortent, c'est que vous puissiez dire précisément où elles vont, à qui, et pour combien de temps.",
      },
      { kind: "h2", text: "Option 3 : le service grand public" },
      {
        kind: "p",
        text: "Coller un document dans une interface publique est la solution la plus rapide et la moins maîtrisée. Selon l'offre souscrite, les contenus peuvent servir à entraîner des modèles, et l'entreprise n'a en général aucune trace de ce qui a été envoyé ni par qui.",
      },
      {
        kind: "quote",
        text: "Le risque, dans presque tous les cas, n'est pas le fournisseur. C'est qu'aucun collaborateur ne sache ce qu'il a le droit d'y coller, parce que personne ne le lui a écrit.",
      },
      {
        kind: "p",
        text: "Si cette option est retenue, elle doit l'être explicitement, avec une règle écrite sur ce qui peut y passer et ce qui ne peut pas. Une règle qui tient en cinq lignes vaut mieux qu'une politique de dix pages que personne ne lit.",
      },
      { kind: "h2", text: "Ce que dit la loi suisse" },
      {
        kind: "p",
        text: "La nouvelle loi sur la protection des données n'interdit pas d'envoyer des données à l'étranger. Elle impose de savoir où elles vont, de garantir un niveau de protection adéquat, et de pouvoir le démontrer. Le secret professionnel, lui, est une obligation distincte et plus stricte, propre à certaines professions, et c'est lui qui conduit le plus souvent à l'option 1.",
      },
      {
        kind: "p",
        text: "Cet article décrit une pratique d'ingénierie et ne remplace pas un avis juridique. Pour un cas soumis au secret professionnel, faites valider le montage par votre conseil avant de signer quoi que ce soit.",
      },
    ],
  },
  {
    slug: "pourquoi-chatgpt-cite-votre-concurrent",
    title: "Pourquoi ChatGPT cite votre concurrent et pas vous",
    summary:
      "Vos clients demandent des recommandations à un assistant avant de chercher sur Google. Ce qui décide du nom cité n'est ni la taille, ni l'ancienneté, ni le budget.",
    question: "Pourquoi les assistants IA citent-ils mon concurrent plutôt que mon entreprise ?",
    answer:
      "Parce qu'un assistant ne classe pas des sites, il cherche une réponse déjà écrite, attribuable à quelqu'un, sur la question exacte qu'on lui pose. Un site qui présente une entreprise ne répond à aucune question et ne fournit donc rien à citer. Un site qui répond aux questions que posent réellement ses clients devient la source que l'assistant reprend. Ce n'est presque jamais une affaire de taille, d'ancienneté ou de budget publicitaire.",
    published: "2026-09-23",
    readingMinutes: 5,
    tag: "Visibilité",
    blocks: [
      {
        kind: "p",
        text: "Une partie de vos clients ne tape plus dans un moteur de recherche. Ils posent une question à un assistant, obtiennent deux ou trois noms, et appellent le premier. Vous ne verrez jamais ces clients dans vos statistiques : ils ne sont pas venus sur votre site, ils n'ont rempli aucun formulaire. C'est une perte qui ne laisse aucune trace, donc impossible à compter sans aller la chercher.",
      },
      { kind: "h2", text: "Ce qu'un assistant cherche réellement" },
      {
        kind: "p",
        text: "Un moteur de recherche classe des pages et vous en propose dix. Un assistant doit répondre en trois lignes : il lui faut une affirmation qu'il peut reprendre et attribuer. Il cherche donc un passage qui se tient tout seul, sorti de son contexte, et qui répond précisément à ce qu'on lui a demandé.",
      },
      {
        kind: "p",
        text: "La plupart des sites d'entreprise ne contiennent aucun passage de ce type. Ils décrivent une société, listent des services, affichent des valeurs. Rien là-dedans ne répond à « quel prestataire pour tel besoin à tel endroit ». L'assistant va donc chercher ailleurs, chez quelqu'un qui a écrit la réponse.",
      },
      {
        kind: "quote",
        text: "Un site qui présente une entreprise ne répond à aucune question. Un site qui répond aux questions devient la source.",
      },
      { kind: "h2", text: "Ce qui ne joue presque pas" },
      {
        kind: "list",
        items: [
          "La taille de l'entreprise. Des structures d'une personne sont citées devant des groupes.",
          "L'ancienneté. Une page publiée il y a six mois peut être reprise avant un site de quinze ans.",
          "Le budget publicitaire. Les annonces n'entrent pas dans ce que lit un assistant.",
          "L'esthétique du site. Elle compte pour l'humain qui arrive ensuite, pas pour la machine qui cite.",
        ],
      },
      { kind: "h2", text: "Par où commencer" },
      {
        kind: "p",
        text: "Avant d'écrire quoi que ce soit, il faut savoir où vous en êtes. Posez à plusieurs assistants la question exacte qu'un client poserait pour trouver un prestataire comme vous, dans votre région, et lisez les réponses mot pour mot. Notez les noms qui sortent. C'est votre point de départ, et il est souvent inconfortable.",
      },
      {
        kind: "p",
        text: "Ensuite, écrivez les réponses qui manquent. Une page par question réellement posée, avec la réponse dans les premières lignes plutôt qu'au bout d'une introduction. Et remesurez au mois suivant : les assistants réindexent à leur rythme, et seule la comparaison entre deux relevés dit quelque chose.",
      },
      {
        kind: "p",
        text: "C'est exactement ce que fait Mentia, un outil que j'édite : il pose les questions, relève qui est cité, publie les réponses manquantes et remesure chaque mois. Le scan est gratuit et ne demande pas de compte.",
      },
    ],
  },
  {
    slug: "combien-coute-une-automatisation-ia-pme-suisse",
    title: "Combien coûte une automatisation IA pour une PME suisse ?",
    summary:
      "Le marché romand affiche entre 2'000 et 10'000 CHF par projet. Ce que ces fourchettes recouvrent réellement, et comment vérifier qu'un devis tient avant de le signer.",
    question: "Combien coûte un projet d'automatisation IA pour une PME en Suisse ?",
    answer:
      "Les prestataires suisses romands annoncent en général entre 2'000 et 10'000 CHF pour la mise en place d'un projet, avec un suivi mensuel facultatif (fourchettes relevées en septembre 2026 sur les sites publics du marché). Cette fourchette ne veut rien dire tant que le périmètre n'est pas défini : le même montant peut couvrir une automatisation d'une tâche ou d'un service entier. Un devis sérieux se lit à trois choses, pas au prix affiché : le nombre d'heures estimées, la tâche exactement nommée, et le temps mesuré qu'elle coûte aujourd'hui. Sans ces trois éléments, le prix est une supposition, qu'il soit bas ou élevé.",
    published: "2026-09-23",
    readingMinutes: 6,
    tag: "Budget",
    blocks: [
      {
        kind: "p",
        text: "C'est la première question posée, et c'est normal : personne ne veut engager une dépense sans savoir à quoi s'attendre. Le problème est qu'elle arrive avant la seule question qui permet d'y répondre, qui est « automatiser quoi, exactement ».",
      },
      { kind: "h2", text: "Ce que le marché affiche aujourd'hui" },
      {
        kind: "p",
        text: "En septembre 2026, les prestataires romands qui publient leurs prix annoncent une mise en place entre 2'000 et 10'000 CHF selon le nombre de processus touchés, parfois à partir de 1'900 CHF, avec un abonnement de suivi facultatif. Plusieurs proposent un premier échange gratuit de trente minutes.",
      },
      {
        kind: "p",
        text: "Ces fourchettes sont exactes et à peu près inutiles. Elles décrivent ce que les prestataires facturent, pas ce que votre problème coûte. Deux projets à 6'000 CHF peuvent livrer l'un une automatisation qui économise huit heures par semaine, l'autre un outil que personne n'ouvre.",
      },
      { kind: "h2", text: "Ce qui fait vraiment varier le montant" },
      {
        kind: "list",
        items: [
          "Le nombre de systèmes à connecter. Une tâche qui vit dans un seul logiciel coûte une fraction d'une tâche qui traverse la messagerie, le logiciel comptable et un fichier partagé.",
          "L'état de la donnée d'entrée. Des documents standardisés se traitent vite. Des documents envoyés dans dix formats différents par trente fournisseurs demandent un travail de tolérance aux cas particuliers, qui est l'essentiel du budget.",
          "Le niveau de contrôle humain exigé. Un système qui propose et attend validation coûte moins cher qu'un système autorisé à agir seul, parce que le second doit gérer ses propres erreurs.",
          "L'hébergement. Un montage qui doit rester dans vos locaux implique du matériel et une installation sur place.",
        ],
      },
      { kind: "h2", text: "Comment un prix devrait se construire" },
      {
        kind: "p",
        text: "Un devis se calcule, il ne s'affiche pas. L'ordre est simple : on mesure d'abord ce que la tâche coûte aujourd'hui, on estime ensuite les heures de construction, on applique un taux, on ajoute la marge. Le prix sort de là. Publier un tarif avant d'avoir vu le travail revient à parier sur la moyenne, et la moyenne se trompe dans les deux sens.",
      },
      {
        kind: "example",
        title: "Les trois lignes à chercher dans un devis",
        lines: [
          "1. La tâche nommée précisément, pas « automatisation de la facturation »",
          "2. Le nombre d'heures estimées, et ce qui se passe si elles sont dépassées",
          "3. Le coût mensuel actuel de cette tâche, mesuré, pas estimé de mémoire",
        ],
      },
      {
        kind: "p",
        text: "Si la troisième ligne manque, personne ne pourra dire dans six mois si le projet a servi. C'est la ligne qui manque le plus souvent.",
      },
      { kind: "h2", text: "Le calcul qui compte plus que le prix" },
      {
        kind: "p",
        text: "Le bon chiffre n'est pas le montant du devis, c'est le nombre de mois avant que l'économie dépasse la dépense. Une tâche qui coûte 3'000 CHF par mois en temps de travail et qu'une automatisation de 9'000 CHF ramène à 500 CHF se rembourse en un peu plus de trois mois. La même automatisation sur une tâche à 400 CHF par mois ne se rembourse jamais.",
      },
      {
        kind: "quote",
        text: "Un devis trop bas sur une tâche qui ne coûte rien reste une mauvaise affaire. Un devis élevé sur une tâche qui saigne est la meilleure dépense de l'année.",
      },
      { kind: "h2", text: "Et l'audit, faut-il le payer ?" },
      {
        kind: "p",
        text: "Beaucoup de prestataires offrent l'audit. C'est commercialement habile et cela crée un biais : un diagnostic gratuit est financé par le projet qui suit, donc il a intérêt à conclure qu'un projet est nécessaire.",
      },
      {
        kind: "p",
        text: "Un audit payé se permet de dire non. Chez moi, la demi-journée de mesure est facturée, et si le rapport entre le coût de la tâche et celui de l'automatisation ne tient pas, on s'arrête là : vous aurez payé la mesure, et vous aurez évité un projet. C'est le résultat le moins spectaculaire et souvent le plus rentable.",
      },
    ],
  },
  {
    slug: "chatgpt-copilot-ou-agent-sur-mesure",
    title: "ChatGPT, Copilot ou un agent sur mesure : lequel pour votre PME ?",
    summary:
      "Les trois ne répondent pas au même besoin, et l'ordre dans lequel on les adopte compte davantage que le choix lui-même. Ce qui se décide en dix minutes.",
    question: "Faut-il un abonnement ChatGPT, Microsoft Copilot ou un agent IA sur mesure pour une PME ?",
    answer:
      "Les trois répondent à des besoins différents et ne se remplacent pas. Un abonnement grand public (de l'ordre de 20 à 30 CHF par personne et par mois) sert à un individu qui rédige, résume ou réfléchit : il change le travail personnel et ne change aucun processus. Copilot a du sens dans une entreprise déjà entièrement sur Microsoft 365, parce qu'il lit les documents et les courriels en place. Un agent sur mesure ne se justifie que pour une tâche répétitive identifiée, dont le coût mensuel mesuré dépasse celui de la construction. L'ordre correct est : abonnements d'abord, mesure ensuite, développement en dernier.",
    published: "2026-09-23",
    readingMinutes: 5,
    tag: "Outils",
    blocks: [
      {
        kind: "p",
        text: "La question arrive presque toujours à l'envers : on demande quel outil prendre avant de savoir quel travail est en cause. Or les trois options ne se comparent pas, elles s'empilent, et la plupart des entreprises devraient commencer par la moins chère.",
      },
      { kind: "h2", text: "L'abonnement grand public" },
      {
        kind: "p",
        text: "Une vingtaine de francs par personne et par mois, actif en cinq minutes. Cela transforme la façon dont une personne rédige, trie ses idées, prépare un document ou comprend un texte technique. C'est le meilleur rapport entre la dépense et l'effet, et c'est aussi la limite : cela améliore des gestes individuels et ne touche à aucun processus.",
      },
      {
        kind: "p",
        text: "Le seul travail à faire avant de déployer, c'est une règle écrite sur ce qui peut y être collé et ce qui ne peut pas. Cinq lignes suffisent, et elles évitent le problème le plus fréquent : personne ne sait ce qu'il a le droit d'envoyer, donc chacun décide seul.",
      },
      { kind: "h2", text: "Copilot, ou l'intégration comme argument" },
      {
        kind: "p",
        text: "L'intérêt de Copilot n'est pas la qualité du modèle, c'est qu'il voit déjà vos courriels, vos fichiers et vos réunions sans qu'on ait rien à brancher. Si l'entreprise vit entièrement dans Microsoft 365, cette intégration vaut plus qu'un modèle légèrement meilleur ailleurs.",
      },
      {
        kind: "p",
        text: "Si la moitié de l'activité se passe hors de cet écosystème, l'argument tombe, et on paie une intégration qu'on n'utilise qu'à moitié.",
      },
      { kind: "h2", text: "L'agent sur mesure" },
      {
        kind: "p",
        text: "Un agent sur mesure fait une chose précise, tout le temps, sans qu'on le lui demande : il récupère les pièces qui arrivent, les extrait, les classe, les renomme, relance ce qui manque. Ce n'est pas un assistant à qui on parle, c'est une machine qui tourne.",
      },
      {
        kind: "p",
        text: "Il ne se justifie qu'à une condition : que la tâche visée soit répétitive, identifiée, et qu'on connaisse son coût mensuel réel. Sans ce chiffre, la décision est une intuition, et une intuition ne rembourse pas un développement.",
      },
      {
        kind: "example",
        title: "La règle de décision",
        lines: [
          "Le travail est individuel et varié : abonnement, rien d'autre",
          "Le travail est dans Microsoft 365 et surtout documentaire : Copilot",
          "La même tâche revient chaque semaine, à l'identique, et coûte cher : agent sur mesure",
          "Vous ne savez pas laquelle de ces trois lignes vous décrit : mesurez avant d'acheter",
        ],
      },
      { kind: "h2", text: "L'erreur la plus coûteuse" },
      {
        kind: "quote",
        text: "Faire développer un agent avant d'avoir donné un abonnement à son équipe, c'est construire une usine avant de savoir si le produit se vend.",
      },
      {
        kind: "p",
        text: "Les abonnements révèlent où l'IA aide réellement dans votre métier, pour quelques centaines de francs et sans engagement. Trois mois d'usage produisent une liste de tâches candidates bien plus juste que n'importe quel atelier. C'est cette liste qui mérite ensuite d'être mesurée, et une ou deux lignes seulement mériteront d'être construites.",
      },
    ],
  },
  {
    slug: "plateforme-automatisation-ou-code",
    title: "Zapier, Make, n8n ou du code : sur quoi construire une automatisation qui dure ?",
    summary:
      "Les plateformes sont imbattables pour tester une idée en une après-midi, et fragiles comme fondation. Où passe la frontière, et à quel moment il faut changer de terrain.",
    question: "Faut-il construire ses automatisations sur Zapier, Make ou n8n, ou en code ?",
    answer:
      "Une plateforme d'automatisation est le bon choix pour valider une idée : montée en une après-midi, sans développeur, et abandonnée sans regret si l'idée ne tient pas. Elle devient un mauvais choix dès que l'entreprise dépend du résultat, pour trois raisons mesurables : le coût augmente avec le volume traité au lieu de rester fixe, la logique métier vit dans un compte chez un tiers plutôt que dans un dépôt que vous possédez, et une mise à jour de la plateforme peut casser un enchaînement sans alerte. La règle utile : prototyper sur une plateforme, reconstruire en code le jour où l'automatisation devient indispensable.",
    published: "2026-09-23",
    readingMinutes: 6,
    tag: "Ingénierie",
    blocks: [
      {
        kind: "p",
        text: "La question se pose rarement en ces termes, parce qu'elle est presque toujours déjà tranchée : quelqu'un a monté un enchaînement sur une plateforme, ça marche, et deux ans plus tard l'entreprise en dépend. Le problème n'est pas d'avoir commencé là. Le problème est de ne jamais en être sorti.",
      },
      { kind: "h2", text: "Ce que les plateformes font très bien" },
      {
        kind: "p",
        text: "Elles suppriment l'obstacle le plus cher d'un projet : le démarrage. Une idée peut être testée en une après-midi, par quelqu'un qui n'écrit pas de code, avec des connecteurs déjà prêts pour la plupart des logiciels du marché. Et surtout, elle peut être abandonnée sans que personne n'ait à justifier des semaines de développement.",
      },
      {
        kind: "p",
        text: "Pour un premier essai, c'est le bon terrain, et je m'en sers pour cela.",
      },
      { kind: "h2", text: "Ce qui se retourne quand ça devient sérieux" },
      {
        kind: "list",
        items: [
          "Le coût suit le volume. La facturation est liée au nombre d'opérations traitées. Une automatisation qui réussit traite plus, donc coûte plus, exactement quand elle devient indispensable.",
          "La logique n'est pas à vous. Elle vit dans une interface, dans un compte. On ne peut pas la relire ligne à ligne, ni la comparer entre deux versions, ni retrouver qui a changé quoi la semaine dernière.",
          "Rien n'est testable. Il n'existe pas de moyen de vérifier automatiquement qu'une modification n'a rien cassé ailleurs. On le découvre en production.",
          "Les pannes sont silencieuses. Un connecteur mis à jour change de comportement, l'enchaînement continue de tourner et produit des résultats faux. Personne ne reçoit d'alerte, parce que techniquement rien n'a échoué.",
          "La sortie est difficile. Au bout de deux ans, reconstruire ailleurs suppose de relire des dizaines d'écrans pour retrouver des règles que personne n'a documentées.",
        ],
      },
      { kind: "h2", text: "Ce que le code coûte, et ce qu'il rend" },
      {
        kind: "p",
        text: "Le code demande plus de travail au départ, c'est sa seule mauvaise nouvelle. En échange : il tourne où vous voulez, y compris sur une machine dans vos locaux ; son coût ne dépend pas du volume traité ; chaque modification est datée et attribuée ; et on peut écrire des tests qui échouent avant la mise en production plutôt qu'après.",
      },
      {
        kind: "p",
        text: "Ce n'est pas une préférence esthétique. C'est la différence entre une automatisation que vous possédez et une automatisation que vous louez.",
      },
      { kind: "h2", text: "La frontière, en pratique" },
      {
        kind: "example",
        title: "Rester sur une plateforme, ou passer au code",
        lines: [
          "Test d'une idée, quelques dizaines d'opérations par mois : plateforme",
          "Notification interne, rappel, petite synchronisation sans enjeu : plateforme, et n'y touchez plus",
          "L'enchaînement traite de la donnée client ou comptable : code",
          "Une panne d'une journée poserait un problème réel : code",
          "Le volume mensuel se compte en milliers d'opérations : code, le calcul est déjà en votre faveur",
        ],
      },
      {
        kind: "quote",
        text: "Une plateforme est un prototype qui a réussi à passer en production. Le jour où l'entreprise en dépend, il faut la traiter comme une dette, pas comme une fondation.",
      },
      { kind: "h2", text: "Le moment du changement" },
      {
        kind: "p",
        text: "Il y a un signal clair : la première fois que quelqu'un dit « il ne faut surtout pas toucher à ça ». À cet instant, l'automatisation est devenue critique et elle n'est pas outillée pour l'être. La reconstruction coûte une à trois semaines selon la complexité, et elle se paie d'elle-même en abonnements évités si le volume est là.",
      },
      {
        kind: "p",
        text: "Le bon ordre est donc le même que partout ailleurs : tester vite et à bas coût, mesurer ce que ça rapporte, puis construire solidement ce qui a prouvé sa valeur. L'erreur n'est pas de commencer sur une plateforme. C'est de considérer que l'étape provisoire est l'arrivée.",
      },
    ],
  },
];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first, which is the order a returning reader expects. */
export const ARTICLES_BY_DATE = [...ARTICLES].sort((a, b) =>
  b.published.localeCompare(a.published),
);
