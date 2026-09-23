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
];

export function articleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

/** Newest first, which is the order a returning reader expects. */
export const ARTICLES_BY_DATE = [...ARTICLES].sort((a, b) =>
  b.published.localeCompare(a.published),
);
