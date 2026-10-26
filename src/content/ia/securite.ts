/**
 * Source unique de la page /securite ET du dossier sécurité en PDF
 * (scripts/dossier-pdf.ts). Ce qui n'est pas encore fixé est dit comme tel
 * (fixé à l'installation, consigné dans le dossier) ; ce qui n'est pas fait est
 * dit non fait (test d'intrusion). Aucune affirmation juridique sans source.
 */

export const SECURITE_VERSION = {
  version: "1.1",
  date: "26.10.2026",
  file: "/dossier-securite-lx-studio.pdf",
} as const;

export const SECURITE_SEO = {
  path: "/securite",
  title: "Sécurité et conformité d'une IA installée sur site | LX Studio",
  description:
    "Où tournent les données, chiffrement, contrôle des accès, journalisation, sauvegardes, fin de contrat, nLPD et secret professionnel : la page que lit votre responsable informatique. Dossier sécurité en PDF.",
  keywords:
    "IA on-premise sécurité, IA conforme nLPD, IA secret professionnel, souveraineté des données Suisse, IA locale chiffrement",
} as const;

export const SECURITE_HERO = {
  eyebrow: "Sécurité et conformité",
  title: "Vos données restent chez vous. Voici comment, point par point.",
  sub: "Cette page est écrite pour le responsable informatique, le commandant ou l'associé qui doit répondre de la sécurité. Ce qui est fixé à l'installation est dit comme tel, et ce qui n'est pas encore fait aussi.",
} as const;

export type SecuriteSection = {
  id: string;
  title: string;
  /** Résumé en une phrase, repris dans la page 1 du PDF. */
  summary: string;
  points: readonly string[];
  /** Référence citée en bas de section, sans affirmation au-delà de la source. */
  source?: { label: string; url: string };
};

export const SECURITE_SECTIONS: ReadonlyArray<SecuriteSection> = [
  {
    id: "donnees",
    title: "Où tournent les données",
    summary:
      "Sur une machine installée chez vous, sur votre réseau, sans appel vers un service externe pendant le traitement.",
    points: [
      "Le système est installé sur une machine dédiée dans vos locaux, fournie avec le système.",
      "Pendant le traitement d'un document, aucune requête ne part vers un service externe : ni vers un éditeur de modèle d'IA, ni vers LX Studio.",
      "Les documents traités, les résultats et les journaux restent sur le disque de cette machine.",
      "Les connecteurs vers vos outils (Bexio, messagerie, dossiers) parlent à ces outils depuis votre réseau, avec vos comptes. La liste des connecteurs actifs et de leurs flux est consignée dans le dossier à l'installation.",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    summary:
      "Trois briques sur une seule machine : les connecteurs vers vos outils, le moteur d'IA, et l'interface de validation.",
    points: [
      "Connecteurs : ils lisent vos sources (messagerie, dossiers, logiciel comptable) et y réécrivent les résultats validés.",
      "Moteur : un ou plusieurs modèles d'IA ouverts, exécutés localement sur la machine ; leurs noms et versions sont consignés dans le dossier à l'installation.",
      "Interface : une page web accessible depuis votre réseau interne seulement, où vos équipes valident ou corrigent.",
      "Aucune de ces briques n'est joignable depuis l'extérieur de votre réseau sans votre autorisation explicite.",
    ],
  },
  {
    id: "chiffrement",
    title: "Chiffrement",
    summary: "Chiffrement du disque au repos et des échanges en transit sur votre réseau.",
    points: [
      "Au repos : le disque de la machine est chiffré ; la méthode et la garde de la clé sont consignées dans le dossier à l'installation.",
      "En transit : les échanges entre vos postes et l'interface, et entre la machine et vos outils, passent par des connexions chiffrées (TLS), avec des certificats émis pour votre réseau et consignés dans le dossier.",
      "Les sauvegardes, si vous en demandez, sont chiffrées avant d'être écrites sur votre support.",
    ],
  },
  {
    id: "acces",
    title: "Contrôle des accès et journalisation",
    summary: "Vous décidez qui accède au système ; chaque action est journalisée chez vous.",
    points: [
      "Les comptes utilisateurs sont créés et retirés par vous ; l'intégration à votre annuaire existant est étudiée à l'installation.",
      "Les droits suivent les rôles : qui peut lancer un traitement, qui peut valider, qui peut consulter les journaux.",
      "Chaque traitement est journalisé : utilisateur, document, heure, résultat. Les journaux restent sur la machine ; leur durée de conservation est fixée avec vous.",
      "L'accès de LX Studio pour la maintenance n'existe que si vous l'activez, pour une intervention datée, et il est journalisé comme les autres.",
    ],
  },
  {
    id: "sauvegardes",
    title: "Sauvegardes",
    summary: "Les sauvegardes sont faites sur vos supports, selon votre politique.",
    points: [
      "Le système n'envoie aucune sauvegarde hors de votre réseau.",
      "Vous choisissez le support (NAS, serveur, disque) et la fréquence. La procédure de restauration est décrite dans le dossier remis à l'installation.",
      "Les données traitées peuvent être purgées de la machine après validation, selon la durée que vous fixez.",
    ],
  },
  {
    id: "mises-a-jour",
    title: "Mises à jour",
    summary:
      "Planifiées avec vous, appliquées sur place ou par un accès que vous ouvrez le temps de l'intervention.",
    points: [
      "Aucune mise à jour automatique silencieuse : chaque mise à jour est annoncée, datée et documentée.",
      "Les mises à jour de sécurité du système d'exploitation suivent votre politique interne : qui les applique, et quand, est fixé avec vous à l'installation.",
      "Les modèles d'IA ne changent pas sans un test sur vos vrais documents et votre accord.",
    ],
  },
  {
    id: "fin-de-contrat",
    title: "En fin de contrat",
    summary: "La machine et les données restent chez vous. Le système continue de fonctionner.",
    points: [
      "La machine vous appartient dès l'installation ; les conditions figurent dans le devis.",
      "Le code et la documentation vous sont remis, et un autre prestataire peut reprendre la maintenance.",
      "Si vous arrêtez le système, les données restent sur votre machine, et vous pouvez les effacer vous-même.",
    ],
  },
  {
    id: "nlpd",
    title: "nLPD et secret professionnel",
    summary:
      "Conçu pour respecter la nLPD : les données ne quittent pas vos murs et ne sont transmises à aucun tiers.",
    points: [
      "La loi fédérale sur la protection des données (nLPD), en vigueur depuis le 1er septembre 2023, encadre le traitement des données personnelles par les entreprises suisses. Le système est conçu pour la respecter : traitement sur place, aucune communication à un tiers, journalisation, mesures de sécurité adaptées au risque (art. 8 LPD). Il ne s'agit pas d'une certification.",
      "Le secret professionnel (article 321 du Code pénal suisse) s'impose notamment aux avocats, aux notaires, aux médecins et aux autres professions de la santé, ainsi qu'aux réviseurs astreints au secret par le code des obligations ; les fiduciaires sont tenues par leur mandat et, souvent, par les règles de leur association. Les administrations relèvent du secret de fonction (article 320). Un traitement qui ne fait sortir aucun document de vos murs est la condition de base pour l'envisager. L'appréciation finale revient à votre conseil.",
      "Un registre des traitements et une analyse d'impact peuvent être documentés avec vous si votre activité l'exige.",
    ],
    source: {
      label:
        "Loi fédérale sur la protection des données (LPD, RS 235.1) et Code pénal (RS 311.0, art. 320 et 321), textes consolidés sur fedlex.admin.ch ; Préposé fédéral à la protection des données et à la transparence (PFPDT)",
      url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
    },
  },
  {
    id: "pentest",
    title: "Test d'intrusion",
    summary:
      "Aucun test d'intrusion indépendant n'a encore été réalisé ; il sera documenté ici quand il aura lieu.",
    points: [
      "Aucun test d'intrusion indépendant n'a encore été réalisé sur le système. Quand il le sera, sa date, son prestataire et les correctifs apportés seront ajoutés à ce dossier.",
      "Les correctifs issus d'un test sont documentés et livrés avec la version suivante du dossier.",
    ],
  },
];

export const SECURITE_DOSSIER = {
  eyebrow: "Dossier sécurité",
  title: "Télécharger le dossier sécurité (PDF)",
  text: "Quatre pages : résumé pour la direction, architecture et flux de données, mesures de sécurité, conformité et engagements. Indiquez votre nom, votre entreprise et votre e-mail : le dossier s'ouvre et vous est envoyé par e-mail.",
  button: "Télécharger le dossier sécurité (PDF)",
  fields: { name: "Votre nom", company: "Entreprise", email: "E-mail" },
  consent:
    "J'accepte que mes données soient utilisées pour m'envoyer le dossier et répondre à mes questions, conformément à la politique de confidentialité.",
  submit: "Recevoir le dossier",
  success: {
    title: "Le dossier s'ouvre dans un nouvel onglet.",
    text: "Vous le recevez aussi par e-mail. Si la fenêtre n'est pas apparue, utilisez le lien ci-dessous.",
    textNoMail:
      "L'envoi par e-mail n'a pas abouti. Gardez le lien ci-dessous, ou écrivez-moi à contact@lxstudio.ch pour le recevoir directement.",
    link: "Ouvrir le dossier sécurité (PDF)",
  },
  error:
    "L'envoi n'a pas abouti. Écrivez-moi à contact@lxstudio.ch, je vous envoie le dossier directement.",
} as const;

/** Engagements contractuels, page 4 du PDF. */
export const SECURITE_ENGAGEMENTS = [
  "Aucune donnée traitée ne quitte le réseau du client pendant le traitement.",
  "Aucun accès de LX Studio sans activation par le client, pour une intervention datée et journalisée.",
  "La machine, le code et la documentation restent au client en fin de contrat.",
  "Chaque mise à jour est annoncée, datée et documentée.",
] as const;
