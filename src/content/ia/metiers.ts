/**
 * Les trois pages métier. Même gabarit que l'accueil, texte propre à chaque
 * métier. `/fiduciaires` est la page prioritaire et la plus complète.
 */

export type Metier = {
  slug: "fiduciaires" | "administrations" | "pme";
  path: string;
  seo: { title: string; description: string; keywords: string };
  hero: { eyebrow: string; title: string; sub: string };
  /** Ce que le système fait, concrètement. */
  tasks: { eyebrow: string; title: string; items: ReadonlyArray<{ title: string; text: string }> };
  problem: { title: string; blocks: readonly string[] };
  difference: {
    title: string;
    rows: ReadonlyArray<{ label: string; generic: string; lx: string }>;
  };
  method: { title: string; steps: ReadonlyArray<{ title: string; meta: string; text: string }> };
  faq: ReadonlyArray<{ q: string; a: string; dossier?: boolean }>;
  form: { title: string; text: string };
  /** Montre la carte du dossier sécurité. */
  dossier: boolean;
};

export const METIERS: ReadonlyArray<Metier> = [
  {
    slug: "fiduciaires",
    path: "/fiduciaires",
    seo: {
      title: "IA pour fiduciaires : pièces saisies au cabinet | LX Studio",
      description:
        "Une IA installée dans votre cabinet qui saisit les pièces comptables, lit les factures QR suisses et écrit dans Bexio. Aucun dossier client ne quitte le cabinet. Conçu pour la nLPD et le secret professionnel.",
      keywords:
        "intelligence artificielle fiduciaire, IA fiduciaire Suisse, saisie automatique pièces comptables, IA Bexio, IA secret professionnel, IA conforme nLPD",
    },
    hero: {
      eyebrow: "Fiduciaires · Jura et Suisse romande",
      title:
        "Vos pièces comptables saisies toutes seules. Pas un dossier client ne quitte le cabinet.",
      sub: "Une IA installée sur une machine dans votre cabinet lit les pièces, les classe, les saisit dans Bexio et vous laisse valider. Rien ne part sur un serveur externe. Le produit tourne déjà en pilote dans un cabinet romand. [À COMPLÉTER : nom du cabinet pilote, avec son accord]",
    },
    tasks: {
      eyebrow: "Ce que le système fait",
      title: "Les pièces du lundi, traitées avant votre premier café.",
      items: [
        {
          title: "Lecture des pièces",
          text: "Factures fournisseurs, tickets, relevés, factures QR suisses : chaque pièce est lue, ses montants, dates, TVA et références sont extraits sur la machine du cabinet.",
        },
        {
          title: "Classement et renommage",
          text: "Chaque pièce est rangée dans le dossier du bon client, renommée selon votre convention, prête pour l'archivage.",
        },
        {
          title: "Saisie dans Bexio",
          text: "L'écriture est proposée dans Bexio avec le compte et le code TVA. Vous validez, vous corrigez, le système apprend de vos corrections. [À COMPLÉTER : état des connecteurs Abacus, Crésus, WinBIZ]",
        },
        {
          title: "Relances et pièces manquantes",
          text: "Le système repère les pièces qui manquent et prépare les relances à vos clients, que vous envoyez en un clic.",
        },
      ],
    },
    problem: {
      title: "Vous voulez l'IA. Vous ne pouvez pas y mettre les dossiers de vos clients.",
      blocks: [
        "Vos collaborateurs passent des heures à ressaisir des pièces que personne ne lira deux fois.",
        "Les outils d'IA du marché aideraient, mais ils envoient les documents de vos clients sur des serveurs hors du cabinet, et le secret professionnel ne le permet pas.",
        "Alors la saisie reste manuelle, et les bouclements continuent de se faire le soir.",
      ],
    },
    difference: {
      title: "Les autres vous vendent un serveur. Moi, je vous livre les pièces saisies.",
      rows: [
        {
          label: "Ce qu'on installe",
          generic: "Un chat",
          lx: "La saisie des pièces, qui tourne seule",
        },
        {
          label: "Qui doit l'utiliser",
          generic: "Vos collaborateurs doivent apprendre",
          lx: "Ils valident, le reste tourne en arrière-plan",
        },
        {
          label: "Comment on mesure",
          generic: "Rien",
          lx: "Les heures de saisie récupérées chaque mois",
        },
        { label: "Où sont les dossiers", generic: "Souvent dans le cloud", lx: "Dans le cabinet" },
      ],
    },
    method: {
      title: "On mesure la saisie avant d'installer, et on contrôle après.",
      steps: [
        {
          title: "Diagnostic",
          meta: "30 minutes, gratuit",
          text: "On identifie les mandats et les types de pièces qui coûtent le plus d'heures.",
        },
        {
          title: "Mesure",
          meta: "Avant de signer",
          text: "On chronomètre la saisie sur une semaine réelle et on chiffre les heures récupérables, avant que vous signiez quoi que ce soit.",
        },
        {
          title: "Solution",
          meta: "Au cabinet",
          text: "La machine est installée au cabinet, branchée sur Bexio et sur vos dossiers. Vous validez les écritures sur vos vrais mandats avant la mise en service.",
        },
        {
          title: "Contrôle",
          meta: "Chaque mois",
          text: "Un rapport mensuel des heures réellement gagnées, pendant plusieurs mois. Si l'écart avec la mesure est trop grand, on ajuste.",
        },
      ],
    },
    faq: [
      {
        q: "Les dossiers de mes clients sortent-ils du cabinet ?",
        a: "Non. La lecture, le classement et la saisie se font sur la machine installée au cabinet. Aucun document n'est envoyé à un service externe pendant le traitement.",
        dossier: true,
      },
      {
        q: "Et le secret professionnel ?",
        a: "Le système est conçu pour que rien ne sorte du cabinet, ce qui est la condition pour travailler des dossiers couverts par le secret professionnel. Le dossier sécurité décrit chaque mesure. [À VÉRIFIER PAR TANGUY : relecture juridique]",
        dossier: true,
      },
      {
        q: "Ça marche avec Bexio, Abacus, Crésus ou WinBIZ ?",
        a: "Bexio : oui. Abacus, Crésus et WinBIZ : [À COMPLÉTER : état de chaque connecteur].",
      },
      {
        q: "Que fait le système d'une pièce qu'il ne comprend pas ?",
        a: "Il la met de côté avec la raison, et vous la traitez à la main. Rien n'est saisi sans un niveau de confiance suffisant, et vous gardez la validation finale.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Sur devis après le diagnostic, selon le nombre de mandats et le volume de pièces. Le devis détaille les heures et ce qui est compris.",
      },
    ],
    form: {
      title:
        "Dites-moi combien de pièces vous saisissez par mois. Je vous dis en 30 minutes ce que le cabinet peut récupérer.",
      text: "Réponse sous un jour ouvré. Le diagnostic est gratuit et n'engage à rien.",
    },
    dossier: true,
  },
  {
    slug: "administrations",
    path: "/administrations",
    seo: {
      title: "IA pour polices et administrations, sur vos serveurs | LX Studio",
      description:
        "Rédaction de rapports et anonymisation de documents par une IA installée sur vos serveurs, sans qu'une donnée ne quitte votre réseau. Conçu pour la nLPD. Jura et Suisse romande.",
      keywords:
        "IA administration publique Suisse, IA police rapports, anonymisation documents IA, IA souveraine administration, IA on-premise Suisse romande",
    },
    hero: {
      eyebrow: "Polices et administrations · Suisse romande",
      title: "Rapports rédigés et documents anonymisés, sur vos serveurs.",
      sub: "Une IA installée dans vos locaux rédige les premières versions de vos rapports à partir de vos notes et anonymise les documents avant transmission. Aucune donnée ne quitte votre réseau.",
    },
    tasks: {
      eyebrow: "Ce que le système fait",
      title: "Le travail d'écriture, fait avant la relecture.",
      items: [
        {
          title: "Rédaction de rapports",
          text: "À partir de vos notes, procès-verbaux ou formulaires, le système produit une première version structurée selon votre modèle. Vous relisez et signez.",
        },
        {
          title: "Anonymisation",
          text: "Noms, adresses, plaques, numéros : les données personnelles sont repérées et remplacées avant qu'un document soit transmis ou archivé. [À COMPLÉTER : catégories de données traitées]",
        },
        {
          title: "Classement et recherche",
          text: "Les documents sont indexés sur votre serveur pour retrouver un dossier par son contenu, sans qu'aucun index ne quitte vos murs.",
        },
        {
          title: "Journalisation",
          text: "Chaque traitement est journalisé : qui a lancé quoi, sur quel document, à quelle heure. [À CONFIRMER PAR TANGUY : format et durée de conservation des journaux]",
        },
      ],
    },
    problem: {
      title: "Vous voulez l'IA. Vous ne pouvez pas y mettre un dossier.",
      blocks: [
        "Vos agents passent des heures à rédiger, reformuler et caviarder des documents.",
        "Les outils d'IA grand public les aideraient, mais aucun dossier ne peut partir sur un serveur étranger.",
        "Alors les rapports attendent, et le travail de fond passe après l'écriture.",
      ],
    },
    difference: {
      title: "Les autres vous vendent un serveur. Moi, je vous livre le rapport rédigé.",
      rows: [
        {
          label: "Ce qu'on installe",
          generic: "Un chat",
          lx: "La rédaction et l'anonymisation, qui tournent seules",
        },
        {
          label: "Qui doit l'utiliser",
          generic: "Vos agents doivent apprendre",
          lx: "Ils relisent, le reste tourne en arrière-plan",
        },
        {
          label: "Comment on mesure",
          generic: "Rien",
          lx: "Les heures d'écriture récupérées chaque mois",
        },
        { label: "Où sont les données", generic: "Souvent dans le cloud", lx: "Sur vos serveurs" },
      ],
    },
    method: {
      title: "On mesure avant d'installer, et on contrôle après.",
      steps: [
        {
          title: "Diagnostic",
          meta: "30 minutes, gratuit",
          text: "On identifie les documents qui coûtent le plus d'heures à produire.",
        },
        {
          title: "Mesure",
          meta: "Avant de signer",
          text: "On chronomètre la rédaction et l'anonymisation sur des dossiers réels, et on chiffre les heures récupérables.",
        },
        {
          title: "Solution",
          meta: "Sur vos serveurs",
          text: "Le système est installé sur votre infrastructure, avec vos modèles de documents, validé avec votre responsable informatique.",
        },
        {
          title: "Contrôle",
          meta: "Chaque mois",
          text: "Un rapport mensuel des heures réellement gagnées. Si l'écart avec la mesure est trop grand, on ajuste.",
        },
      ],
    },
    faq: [
      {
        q: "Où tournent les données ?",
        a: "Sur vos serveurs ou sur une machine installée dans vos locaux. Aucun appel vers un service externe pendant le traitement.",
        dossier: true,
      },
      {
        q: "Qui contrôle les accès ?",
        a: "Vous. Le système s'intègre à vos comptes existants et journalise chaque action. [À CONFIRMER PAR TANGUY : annuaire pris en charge]",
        dossier: true,
      },
      {
        q: "Le système prend-il des décisions ?",
        a: "Non. Il rédige des premières versions et propose des anonymisations. La décision et la signature restent humaines.",
      },
      {
        q: "Combien ça coûte ?",
        a: "Sur devis après le diagnostic, selon les types de documents et le volume.",
      },
    ],
    form: {
      title:
        "Dites-moi quels documents vous coûtent le plus. Je vous dis en 30 minutes ce que l'IA peut en faire.",
      text: "Réponse sous un jour ouvré. Le diagnostic est gratuit et n'engage à rien.",
    },
    dossier: true,
  },
  {
    slug: "pme",
    path: "/pme",
    seo: {
      title: "IA locale pour PME : mails triés, factures relancées | LX Studio",
      description:
        "Une IA installée chez vous trie vos mails, relance vos factures et prépare vos devis, sans abonnement cloud et sans qu'une donnée ne quitte l'entreprise. Jura et Suisse romande.",
      keywords:
        "IA locale PME Suisse, automatisation administrative IA, relance factures automatique, tri des mails IA, IA sans cloud, IA Jura",
    },
    hero: {
      eyebrow: "PME · Jura et Suisse romande",
      title: "Mails triés, factures relancées, sans abonnement cloud.",
      sub: "Une IA installée chez vous trie la boîte info@, relance les factures en retard et prépare les devis, directement dans vos outils. Pas d'abonnement, pas de données chez un tiers.",
    },
    tasks: {
      eyebrow: "Ce que le système fait",
      title: "Le travail de bureau qui se répète, fait sans vous.",
      items: [
        {
          title: "Tri des mails",
          text: "Chaque mail entrant est classé, les demandes sont transmises à la bonne personne, les réponses courantes sont préparées pour validation.",
        },
        {
          title: "Relance des factures",
          text: "Les factures en retard sont repérées dans Bexio et les relances préparées selon vos paliers, prêtes à partir.",
        },
        {
          title: "Devis et documents",
          text: "Depuis un mail ou une note, le système prépare le devis dans votre modèle, avec vos prix. Vous vérifiez et envoyez.",
        },
        {
          title: "Pièces pour la fiduciaire",
          text: "Les justificatifs sont rassemblés, nommés et transmis à votre fiduciaire au rythme convenu.",
        },
      ],
    },
    problem: {
      title: "Vous voulez l'IA. Vous ne pouvez pas y mettre vos clients.",
      blocks: [
        "Vous ou vos collaborateurs passez des heures sur de la saisie, du tri et des relances.",
        "ChatGPT ou Copilot aideraient, mais vos devis, vos marges et vos clients partiraient sur des serveurs américains.",
        "Alors vous attendez, pendant que l'administratif continue de manger des journées.",
      ],
    },
    difference: {
      title: "Les autres vous vendent un abonnement. Moi, je vous livre le travail fait.",
      rows: [
        {
          label: "Ce qu'on installe",
          generic: "Un chat",
          lx: "Une tâche précise qui tourne seule",
        },
        {
          label: "Qui doit l'utiliser",
          generic: "Vous devez apprendre",
          lx: "Ça tourne en arrière-plan",
        },
        { label: "Comment on mesure", generic: "Rien", lx: "Les heures récupérées chaque mois" },
        {
          label: "Où sont les données",
          generic: "Dans le cloud, avec un abonnement",
          lx: "Chez vous, sans abonnement",
        },
      ],
    },
    method: {
      title: "On mesure avant d'installer, et on contrôle après.",
      steps: [
        {
          title: "Diagnostic",
          meta: "30 minutes, gratuit",
          text: "On identifie les tâches qui vous coûtent le plus d'heures.",
        },
        {
          title: "Mesure",
          meta: "Avant de signer",
          text: "On chronomètre ces tâches sur une semaine réelle et on chiffre les heures récupérables.",
        },
        {
          title: "Solution",
          meta: "Chez vous",
          text: "La machine est installée dans vos locaux et branchée sur vos outils : Bexio, messagerie, dossiers.",
        },
        {
          title: "Contrôle",
          meta: "Chaque mois",
          text: "Un rapport mensuel des heures réellement gagnées. Si l'écart avec la mesure est trop grand, on ajuste.",
        },
      ],
    },
    faq: [
      {
        q: "Pas d'abonnement, vraiment ?",
        a: "Le système est acheté et installé chez vous. Le suivi mensuel des premiers mois est compris dans le devis. Ensuite, la maintenance fait l'objet d'un accord séparé, sans abonnement à un service cloud. [À CONFIRMER PAR TANGUY : modèle de maintenance]",
      },
      {
        q: "Ça fonctionne avec ma messagerie ?",
        a: "Microsoft 365, Google Workspace, Infomaniak : [À COMPLÉTER : état de chaque connecteur].",
      },
      {
        q: "Et si je change d'outil ?",
        a: "Le système est branché sur vos outils par des connecteurs. Changer d'outil, c'est changer un connecteur, pas le système.",
      },
      { q: "Combien ça coûte ?", a: "Sur devis après le diagnostic, selon la tâche et le volume." },
    ],
    form: {
      title:
        "Dites-moi quelle tâche vous coûte le plus. Je vous dis en 30 minutes ce que l'IA peut en faire.",
      text: "Réponse sous un jour ouvré. Le diagnostic est gratuit et n'engage à rien.",
    },
    dossier: false,
  },
];

export function metierBySlug(slug: string): Metier | undefined {
  return METIERS.find((m) => m.slug === slug);
}
