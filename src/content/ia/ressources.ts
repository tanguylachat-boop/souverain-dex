/**
 * Les quatre articles de la refonte « IA locale ». Même forme que les
 * anciens articles (`content/articles.ts`), avec en plus un encadré
 * « En résumé », un mot-clé, un auteur et des sources citées en bas.
 *
 * Chaque article ouvre par une réponse directe dans les deux premières
 * phrases. Les passages juridiques citent leur source (textes vérifiés sur
 * fedlex le 26.10.2026, voir docs/a-completer.md D). Aucun chiffre inventé.
 */

import { ARTICLES, type Article, type Block } from "../articles.ts";

export type ResourceBlock =
  | Block
  | { kind: "h3"; text: string }
  | { kind: "resume"; items: readonly string[] };

export type Resource = {
  slug: string;
  title: string;
  summary: string;
  question: string;
  answer: string;
  keyword: string;
  published: string;
  readingMinutes: number;
  tag: string;
  author: string;
  blocks: readonly ResourceBlock[];
  sources: ReadonlyArray<{ label: string; url: string }>;
};

const AUTHOR = "Tanguy Lachat";

export const RESOURCES: ReadonlyArray<Resource> = [
  {
    slug: "ia-locale-entreprise-suisse",
    title: "IA locale en entreprise : utiliser l'IA sans que vos données quittent la Suisse",
    summary:
      "Ce qu'est une IA locale, ce qu'elle change pour une entreprise suisse qui ne peut pas envoyer ses dossiers à l'étranger, ce qu'il faut comme matériel, et comment la mettre en place sans se tromper.",
    question: "Qu'est-ce qu'une IA locale en entreprise et pourquoi la choisir en Suisse ?",
    answer:
      "Une IA locale est un modèle d'intelligence artificielle qui tourne sur une machine installée dans l'entreprise, sans envoyer les données à un service externe. Une entreprise suisse la choisit quand ses dossiers ne peuvent pas quitter ses murs : secret professionnel, nLPD, contrats clients, ou simple prudence.",
    keyword: "IA locale Suisse",
    published: "2026-10-24",
    readingMinutes: 7,
    tag: "IA locale",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "Une IA locale est un modèle d'intelligence artificielle qui tourne sur une machine installée dans vos locaux, et qui traite vos documents sans les envoyer à un service externe. Une entreprise suisse la choisit quand ses dossiers ne peuvent pas quitter ses murs, pour une raison de droit, de contrat ou de bon sens.",
      },
      {
        kind: "p",
        text: "Cet article explique ce que « local » veut dire concrètement, ce que cela change par rapport à ChatGPT ou Copilot, ce qu'il faut comme matériel, et comment démarrer sans acheter un serveur pour rien.",
      },
      {
        kind: "resume",
        items: [
          "Local veut dire que le modèle est exécuté sur une machine chez vous : les documents ne transitent par aucun serveur tiers pendant le traitement.",
          "La différence avec les outils grand public n'est pas la qualité du modèle, c'est l'endroit où vos données sont lues.",
          "Le matériel nécessaire tient dans un boîtier de la taille d'un petit ordinateur de bureau pour la plupart des tâches de bureau.",
          "La bonne façon de démarrer : une tâche précise, mesurée avant et après, pas un chat pour tout le monde.",
        ],
      },
      { kind: "h2", text: "Ce que « local » veut dire, et ce que ça ne veut pas dire" },
      {
        kind: "p",
        text: "Quand vous écrivez à ChatGPT, votre texte part vers les serveurs de l'éditeur, est traité là-bas, et la réponse revient. Avec une IA locale, le modèle lui-même est copié sur une machine dans votre entreprise. Le document reste sur son disque, le calcul se fait sur son processeur, et la réponse n'a jamais quitté le bâtiment.",
      },
      {
        kind: "p",
        text: "Local ne veut pas dire « fait maison » ni « moins bon ». Les modèles ouverts qu'on installe aujourd'hui sont publiés par les mêmes laboratoires que les grands services, ou par des équipes qui les suivent de près. Pour lire une facture, classer un mail ou rédiger un premier jet de rapport, ils font le travail.",
      },
      {
        kind: "p",
        text: "Local ne veut pas non plus dire « sans connexion ». La machine peut rester branchée à votre réseau pour recevoir des mises à jour ou parler à vos logiciels. Ce qui compte, c'est que le traitement des documents, lui, ne sorte pas.",
      },
      { kind: "h2", text: "Pourquoi la question se pose particulièrement en Suisse" },
      {
        kind: "p",
        text: "Trois raisons reviennent chez les entreprises romandes qui me contactent. La première est juridique : la loi fédérale sur la protection des données, révisée et en vigueur depuis le 1er septembre 2023, encadre la communication de données personnelles à l'étranger (art. 16 et 17 LPD, voir la source en bas de page).",
      },
      {
        kind: "p",
        text: "La deuxième est professionnelle : les fiduciaires, avocats, médecins et certaines administrations sont tenus au secret, et un dossier qui part sur un serveur étranger pose une question à laquelle personne n'a envie de répondre devant un client.",
      },
      {
        kind: "p",
        text: "La troisième est contractuelle : beaucoup de PME travaillent pour des donneurs d'ordre qui interdisent, dans leurs conditions, toute sous-traitance des données hors de Suisse. Un outil cloud américain, même payant, peut les mettre en défaut.",
      },
      { kind: "h2", text: "Ce qu'une IA locale fait bien, et ce qu'il vaut mieux lui laisser" },
      {
        kind: "p",
        text: "Elle est à l'aise sur les tâches répétitives qui portent sur vos propres documents : lire des pièces comptables, extraire des montants, classer des mails, rédiger une première version à partir de vos notes, anonymiser un document avant transmission. Ce sont des tâches où le modèle n'a pas besoin de connaître l'actualité du jour, seulement de lire ce que vous lui donnez.",
      },
      {
        kind: "p",
        text: "Elle est moins utile pour les questions ouvertes sur le monde, la recherche en ligne ou la rédaction créative longue, où les plus grands modèles gardent une avance. Rien ne vous empêche de garder ChatGPT pour ces usages, à condition d'y mettre uniquement des informations qui peuvent sortir.",
      },
      { kind: "h2", text: "Quel matériel il faut vraiment" },
      {
        kind: "p",
        text: "Pour les tâches de bureau décrites plus haut, une machine de bureau récente avec beaucoup de mémoire suffit dans la plupart des cas. Dans mes installations, c'est un Mac mini Apple avec 64 Go de mémoire unifiée : il tient dans la main, se branche sur une prise et un câble réseau, et ne demande pas de salle serveur. Le prix de la machine figure dans le devis.",
      },
      {
        kind: "p",
        text: "Le piège classique est d'acheter trop gros trop tôt, sur la base d'un besoin qu'on n'a pas mesuré. La bonne séquence est l'inverse : mesurer la tâche, choisir le modèle qui la fait, puis dimensionner la machine pour ce modèle.",
      },
      { kind: "h2", text: "Comment démarrer sans se tromper" },
      { kind: "h3", text: "Commencer par une tâche, pas par un outil" },
      {
        kind: "p",
        text: "Le meilleur point de départ est la tâche qui coûte le plus d'heures à vos équipes et qui porte sur des documents que vous ne pouvez pas sortir. Chez une fiduciaire, c'est souvent la saisie des pièces. Chez une PME, le tri de la boîte info@ ou les relances de factures.",
      },
      { kind: "h3", text: "Mesurer avant d'installer" },
      {
        kind: "p",
        text: "Chronométrez la tâche sur une semaine réelle. Sans ce chiffre, personne ne pourra dire si l'installation a servi à quelque chose. C'est aussi ce qui vous évite d'acheter une machine pour une tâche qui ne prend que deux heures par mois.",
      },
      { kind: "h3", text: "Garder la validation humaine" },
      {
        kind: "p",
        text: "Une IA locale propose, une personne valide. Sur la saisie comptable, l'écriture est proposée et le collaborateur la confirme. Sur un rapport, la première version est rédigée et l'auteur la relit. C'est ce qui rend l'outil acceptable pour vos clients et pour vous.",
      },
      {
        kind: "quote",
        text: "La question n'est pas de savoir si l'IA est bonne. C'est de savoir où vos documents sont lus.",
      },
      { kind: "h2", text: "Ce que je fais chez mes clients" },
      {
        kind: "p",
        text: "J'installe une machine dans les locaux, je branche le système sur les outils existants, et je livre une tâche qui tourne seule, avec un rapport mensuel des heures gagnées. La page dédiée aux fiduciaires décrit le cas le plus courant, et le formulaire de diagnostic est le bon point de départ si vous avez une tâche en tête.",
      },
    ],
    sources: [
      {
        label:
          "Loi fédérale sur la protection des données (LPD) du 25 septembre 2020, état au 1er septembre 2023, fedlex.admin.ch",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
      },
      {
        label:
          "Préposé fédéral à la protection des données et à la transparence (PFPDT), communication de données à l'étranger",
        url: "https://www.edoeb.admin.ch/",
      },
    ],
  },
  {
    slug: "chatgpt-nlpd-entreprise",
    title: "ChatGPT et la nLPD : ce que votre entreprise risque vraiment",
    summary:
      "Utiliser ChatGPT avec des données de clients ou de collaborateurs engage la responsabilité de l'entreprise au sens de la nLPD. Ce que dit la loi, ce qui est risqué, ce qui ne l'est pas, et comment utiliser l'IA sans s'exposer.",
    question: "Que risque une entreprise suisse qui met des données personnelles dans ChatGPT ?",
    answer:
      "Au sens de la nLPD, l'entreprise qui met des données personnelles dans ChatGPT reste responsable de ce traitement, y compris de la communication de ces données à l'étranger. Le risque dépend de ce qui est envoyé : un texte anonyme ne pose pas de problème, un dossier client avec des noms en pose un.",
    keyword: "ChatGPT nLPD entreprise",
    published: "2026-10-24",
    readingMinutes: 8,
    tag: "nLPD",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "Au sens de la nouvelle loi fédérale sur la protection des données, l'entreprise qui met des données personnelles dans ChatGPT reste responsable de ce traitement, y compris de leur communication à l'étranger. Le risque dépend de ce qui est envoyé : une question générale ne pose pas de problème, un dossier client avec des noms, des montants et des adresses en pose un.",
      },
      {
        kind: "p",
        text: "Cet article n'est pas un avis juridique. Il résume ce que dit la loi, à partir de ses articles et des publications du Préposé fédéral, et il décrit ce que j'observe dans les entreprises romandes. Les points marqués à vérifier doivent l'être avec votre conseil.",
      },
      {
        kind: "resume",
        items: [
          "La nLPD s'applique à toute entreprise suisse qui traite des données personnelles, quelle que soit sa taille.",
          "Mettre un document avec des données personnelles dans un outil cloud est un traitement et, selon l'éditeur, une communication à l'étranger.",
          "Le risque réel se joue sur trois points : la base du traitement, l'information des personnes, et la sécurité des données.",
          "La solution simple est de ne pas envoyer : anonymiser avant, ou traiter sur place.",
        ],
      },
      { kind: "h2", text: "Ce que la nLPD demande, en quatre points" },
      {
        kind: "p",
        text: "La loi fédérale sur la protection des données révisée est entrée en vigueur le 1er septembre 2023. Elle s'applique aux traitements de données personnelles, c'est-à-dire à toute information qui se rapporte à une personne identifiée ou identifiable : un nom, un e-mail, un numéro de téléphone, mais aussi une facture nominative ou un rapport qui cite quelqu'un (art. 5 LPD).",
      },
      {
        kind: "list",
        items: [
          "Les principes : licéité, bonne foi, proportionnalité, finalité. Vous ne traitez que ce qui est nécessaire, pour un but reconnaissable (art. 6 LPD).",
          "L'information : la personne doit savoir que ses données sont collectées et, le cas échéant, communiquées à l'étranger, avec le nom du pays destinataire (art. 19 LPD).",
          "La sécurité : des mesures techniques et organisationnelles adaptées au risque (art. 8 LPD).",
          "La communication à l'étranger : possible si le pays offre une protection adéquate ou si des garanties existent, sinon soumise aux exceptions prévues, comme le consentement exprès (art. 16 et 17 LPD).",
        ],
      },
      { kind: "h2", text: "Pourquoi ChatGPT est concerné" },
      {
        kind: "p",
        text: "Quand un collaborateur colle un mail de client dans ChatGPT pour en tirer une réponse, trois choses se passent : des données personnelles sont traitées, elles sont communiquées à un tiers, et ce tiers est établi hors de Suisse. Chacune de ces trois choses tombe sous la loi.",
      },
      {
        kind: "p",
        text: "Les versions payantes et les offres pour entreprises apportent des engagements contractuels qui changent l'analyse sur la sécurité et l'usage des données pour l'entraînement. Elles ne changent pas le fait que le document a quitté votre entreprise. Les conditions exactes sont celles publiées par chaque éditeur au moment où vous signez.",
      },
      { kind: "h2", text: "Ce qui est risqué, et ce qui ne l'est pas" },
      { kind: "h3", text: "Pas de données personnelles, pas de problème" },
      {
        kind: "p",
        text: "Demander à ChatGPT de reformuler une politique interne, de résumer un article public ou d'écrire un modèle de mail sans nom ni référence ne traite aucune donnée personnelle. C'est l'usage le plus courant, et il est sans risque de ce point de vue.",
      },
      {
        kind: "h3",
        text: "Des données personnelles ordinaires : une question de base et d'information",
      },
      {
        kind: "p",
        text: "Un mail de client avec son nom et sa demande, une liste de contacts, un contrat nominatif : ce sont des données personnelles ordinaires. Les envoyer suppose que ce traitement soit proportionné, que les personnes en soient informées, et que la communication à l'étranger soit couverte. En pratique, peu d'entreprises ont fait ce travail.",
      },
      { kind: "h3", text: "Des données sensibles : la zone rouge" },
      {
        kind: "p",
        text: "La loi protège davantage certaines données : santé et sphère intime, opinions religieuses, philosophiques, politiques ou syndicales, origine raciale ou ethnique, poursuites et sanctions pénales ou administratives, mesures d'aide sociale, données génétiques et biométriques (art. 5 LPD). Un dossier médical, un dossier de police, une situation de poursuite ne devraient pas passer par un outil cloud grand public. Les avocats et les professions de la santé y ajoutent le secret professionnel, les administrations le secret de fonction.",
      },
      { kind: "h2", text: "Ce que l'entreprise risque concrètement" },
      {
        kind: "p",
        text: "La nLPD prévoit des amendes pénales qui visent les personnes physiques responsables, jusqu'à 250 000 francs dans les cas prévus par la loi, notamment pour violation intentionnelle des obligations d'information (art. 60 LPD) ou pour communication de données à l'étranger sans garanties ni exception (art. 61 LPD). Le Préposé fédéral peut aussi ouvrir une enquête et ordonner des mesures.",
      },
      {
        kind: "p",
        text: "Le risque le plus fréquent n'est pourtant pas l'amende. C'est la question d'un client, d'un donneur d'ordre ou d'un auditeur : « Où sont passées nos données ? » Une réponse floue coûte plus cher qu'une procédure.",
      },
      { kind: "h2", text: "Comment utiliser l'IA sans s'exposer" },
      {
        kind: "list",
        items: [
          "Écrire une règle simple pour les équipes : aucune donnée personnelle dans un outil cloud sans validation, et jamais de données sensibles.",
          "Anonymiser avant d'envoyer, quand c'est possible : retirer noms, adresses, numéros, références.",
          "Traiter sur place ce qui ne peut pas sortir : une IA locale installée dans l'entreprise lit les documents sans les communiquer à qui que ce soit.",
          "Tenir un registre des traitements et documenter le choix fait pour chaque usage, pour pouvoir répondre le jour où on vous le demande.",
        ],
      },
      {
        kind: "quote",
        text: "Le plus simple pour respecter la loi sur la communication de données à l'étranger, c'est de ne rien communiquer.",
      },
      {
        kind: "p",
        text: "C'est le principe de ce que j'installe chez mes clients : une tâche précise, traitée sur une machine chez eux, sans qu'un document ne sorte. La page sécurité décrit les mesures en détail, et le formulaire de diagnostic est le bon point de départ si vous avez un usage en tête.",
      },
    ],
    sources: [
      {
        label:
          "Loi fédérale sur la protection des données (LPD), articles 5, 6, 8, 16, 17, 19 et 60, fedlex.admin.ch",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
      },
      {
        label:
          "Préposé fédéral à la protection des données et à la transparence (PFPDT), nouvelle loi sur la protection des données",
        url: "https://www.edoeb.admin.ch/",
      },
    ],
  },
  {
    slug: "secret-professionnel-ia",
    title:
      "Secret professionnel et IA : ce que les fiduciaires, avocats et médecins doivent savoir",
    summary:
      "Le secret professionnel interdit de révéler ce qu'un client, un patient ou un mandant a confié. Mettre un dossier dans un outil d'IA en ligne est une révélation à un tiers. Ce que dit l'article 321 CP, ce qui reste possible, et comment utiliser l'IA sans rompre le secret.",
    question: "Un professionnel tenu au secret peut-il utiliser l'IA sur ses dossiers ?",
    answer:
      "Oui, à condition que les dossiers ne soient révélés à personne, ce qui exclut en principe les outils en ligne qui lisent les documents sur leurs serveurs. Une IA installée dans le cabinet, qui traite les dossiers sans les communiquer, permet d'utiliser l'IA sans rompre le secret.",
    keyword: "IA secret professionnel",
    published: "2026-10-24",
    readingMinutes: 7,
    tag: "Secret professionnel",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "Un professionnel tenu au secret peut utiliser l'IA sur ses dossiers à une condition : qu'ils ne soient révélés à personne. Cela exclut en principe les outils en ligne qui lisent les documents sur leurs serveurs, et cela rend possible une IA installée dans le cabinet, qui traite les dossiers sans les communiquer.",
      },
      {
        kind: "p",
        text: "Cet article s'adresse aux fiduciaires, aux avocats, aux médecins et à toutes les professions tenues au secret. Il n'est pas un avis juridique : les passages qui citent la loi portent leur source et sont à vérifier avec votre conseil ou votre ordre professionnel.",
      },
      {
        kind: "resume",
        items: [
          "L'article 321 du Code pénal punit la révélation d'un secret confié en raison de la profession, pour les professions qu'il énumère.",
          "Envoyer un dossier à un outil en ligne qui le lit sur ses serveurs est une communication à un tiers.",
          "Une IA installée dans le cabinet, sans transmission à l'extérieur, ne révèle rien à personne.",
          "La validation humaine reste la règle : l'IA propose, le professionnel décide et signe.",
        ],
      },
      { kind: "h2", text: "Ce que dit l'article 321 du Code pénal" },
      {
        kind: "p",
        text: "L'article 321 du Code pénal suisse punit les ecclésiastiques, avocats, défenseurs en justice, notaires, conseils en brevet, contrôleurs astreints au secret professionnel en vertu du code des obligations, médecins, dentistes, chiropraticiens, pharmaciens, sages-femmes, psychologues, infirmiers, physiothérapeutes, ergothérapeutes, diététiciens, optométristes, ostéopathes, ainsi que leurs auxiliaires, qui révèlent un secret à eux confié en vertu de leur profession. La révélation est punie sur plainte, et le secret subsiste après la fin de l'activité.",
      },
      {
        kind: "p",
        text: "Les fiduciaires ne sont pas toutes visées par cet article en tant que telles. Beaucoup sont tenues au secret par leur contrat, par les règles de leur association professionnelle, par le secret d'affaires ou, pour les organes de révision, par le droit de la société anonyme. L'obligation vient alors d'ailleurs, mais la question pratique est la même : un dossier qui sort du cabinet est un dossier révélé.",
      },
      { kind: "h2", text: "Pourquoi un outil en ligne pose problème" },
      {
        kind: "p",
        text: "Un outil d'IA en ligne ne peut lire un document qu'après l'avoir reçu. Le document est donc transmis à l'éditeur, stocké au moins le temps du traitement, et lu par ses systèmes. Que l'éditeur promette de ne pas l'utiliser pour autre chose ne change pas la nature de l'acte : il a reçu le secret.",
      },
      {
        kind: "p",
        text: "Le consentement du client lève le secret, mais il doit être donné en connaissance de cause, pour chaque dossier ou chaque usage. Demander à chaque client de consentir à ce que son dossier soit lu par un éditeur étranger est rarement réaliste, et rarement bon pour la relation.",
      },
      { kind: "h2", text: "Ce qui reste possible" },
      { kind: "h3", text: "Travailler sur des documents sans secret" },
      {
        kind: "p",
        text: "Rédiger un modèle de lettre, résumer une jurisprudence publiée, préparer une check-list : rien de tout cela ne révèle un secret, et les outils en ligne y sont utiles.",
      },
      { kind: "h3", text: "Anonymiser avant d'envoyer" },
      {
        kind: "p",
        text: "Un texte dont on a retiré tout ce qui permet d'identifier le client peut, selon les cas, être traité en ligne. La difficulté est pratique : une facture, un rapport médical ou un contrat sont pleins de détails qui identifient, et l'anonymisation manuelle prend souvent plus de temps que le gain espéré.",
      },
      { kind: "h3", text: "Traiter sur place" },
      {
        kind: "p",
        text: "Une IA installée sur une machine dans le cabinet lit les dossiers là où ils sont, sans les transmettre à qui que ce soit. Personne ne reçoit le secret. C'est la seule configuration qui permet d'automatiser la lecture des pièces comptables, la rédaction de premiers jets ou l'anonymisation elle-même, sans que la question de la révélation se pose.",
      },
      { kind: "h2", text: "Les garde-fous qui comptent, même sur place" },
      {
        kind: "list",
        items: [
          "L'accès à la machine est réservé aux personnes déjà tenues au secret dans le cabinet.",
          "Chaque traitement est journalisé : qui, quand, sur quel dossier.",
          "La maintenance par un prestataire externe se fait sous votre contrôle, pour une intervention datée, sans accès permanent.",
          "L'IA propose et le professionnel valide : la décision reste une décision humaine, signée.",
        ],
      },
      {
        kind: "quote",
        text: "Le secret ne tient pas à la qualité de l'outil. Il tient à qui a vu le dossier.",
      },
      {
        kind: "p",
        text: "C'est le principe du système que j'installe chez les fiduciaires : la saisie des pièces, faite au cabinet, sans qu'un dossier client ne sorte. La page dédiée aux fiduciaires décrit le fonctionnement, et le dossier sécurité détaille chaque mesure pour votre responsable informatique ou votre conseil.",
      },
    ],
    sources: [
      {
        label:
          "Code pénal suisse, article 321 (violation du secret professionnel), fedlex.admin.ch",
        url: "https://www.fedlex.admin.ch/eli/cc/54/757_781_799/fr#art_321",
      },
      {
        label: "Loi fédérale sur la protection des données (LPD), fedlex.admin.ch",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
      },
    ],
  },
  {
    slug: "fiduciaire-automatiser-saisie-pieces-ia",
    title: "Fiduciaire : automatiser la saisie des pièces avec une IA installée au cabinet",
    summary:
      "Comment une IA installée au cabinet lit les pièces comptables, les classe et propose les écritures dans Bexio, sans qu'un dossier client ne sorte. Ce qui marche, ce qui demande encore une validation, et par où commencer.",
    question:
      "Comment une fiduciaire peut-elle automatiser la saisie des pièces sans sortir les dossiers du cabinet ?",
    answer:
      "En installant une IA sur une machine dans le cabinet, branchée sur le logiciel comptable. Elle lit chaque pièce, extrait les montants, dates et TVA, propose l'écriture, et le collaborateur valide. Les dossiers ne quittent pas le cabinet, et les heures de saisie sont mesurées avant et après.",
    keyword: "IA fiduciaire",
    published: "2026-10-24",
    readingMinutes: 8,
    tag: "Fiduciaires",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "Une fiduciaire peut automatiser la saisie des pièces sans sortir les dossiers du cabinet en installant une IA sur une machine dans ses locaux, branchée sur son logiciel comptable. Le système lit chaque pièce, extrait les montants, dates et codes TVA, propose l'écriture, et un collaborateur valide.",
      },
      {
        kind: "p",
        text: "Cet article décrit comment cela fonctionne concrètement, ce que le système fait bien, ce qui demande encore une validation humaine, et par où commencer. Il s'appuie sur ce que j'installe chez mes clients et sur le pilote en cours dans un cabinet romand.",
      },
      {
        kind: "resume",
        items: [
          "La saisie des pièces est la tâche la plus répétitive du cabinet et celle qui se prête le mieux à l'automatisation.",
          "Le système lit les pièces sur une machine au cabinet, les classe par mandat et propose les écritures dans Bexio.",
          "Le collaborateur valide ou corrige ; le système apprend des corrections.",
          "On mesure les heures de saisie avant l'installation, puis chaque mois après.",
        ],
      },
      { kind: "h2", text: "Pourquoi commencer par la saisie" },
      {
        kind: "p",
        text: "Dans un cabinet, la saisie des pièces a trois caractéristiques qui en font le point de départ idéal : elle se répète chaque semaine, elle suit des règles stables, et elle porte sur des documents qui ne peuvent pas sortir. C'est aussi la tâche que les collaborateurs ont le moins de regret à voir partir.",
      },
      {
        kind: "p",
        text: "Les outils de reconnaissance de documents existent depuis longtemps. Ce qui change avec les modèles récents, c'est leur capacité à comprendre une pièce inhabituelle, à lire une facture manuscrite ou mal cadrée, et à proposer un compte plutôt que seulement des chiffres.",
      },
      { kind: "h2", text: "Comment le système fonctionne, étape par étape" },
      { kind: "h3", text: "1. Les pièces arrivent" },
      {
        kind: "p",
        text: "Par scan, par e-mail, par dépôt dans un dossier partagé ou par photo depuis un téléphone : les pièces sont déposées là où le cabinet les reçoit déjà. Le système surveille ces points d'entrée sur le réseau du cabinet.",
      },
      { kind: "h3", text: "2. La lecture" },
      {
        kind: "p",
        text: "Chaque pièce est lue sur la machine du cabinet. Le système identifie le type de document, le fournisseur ou le client, la date, les montants hors taxe et TTC, le taux de TVA, la référence. Pour les factures QR suisses, il lit directement le code QR, ce qui élimine les erreurs de saisie sur les montants et les références de paiement. Les pièces arrivent en PDF ou en image (scan, photo).",
      },
      { kind: "h3", text: "3. Le classement" },
      {
        kind: "p",
        text: "La pièce est rangée dans le dossier du bon mandat, renommée selon la convention du cabinet, et prête pour l'archivage. Une pièce que le système ne sait pas attribuer est mise de côté avec la raison, pour un traitement manuel.",
      },
      { kind: "h3", text: "4. L'écriture proposée" },
      {
        kind: "p",
        text: "L'écriture est préparée dans Bexio, avec le compte et le code TVA proposés à partir du plan comptable du mandat et des écritures passées. Le collaborateur la voit dans une interface accessible depuis le réseau du cabinet, la valide en un clic ou la corrige. Pour Abacus, Crésus ou WinBIZ, l'état du connecteur est précisé lors du diagnostic.",
      },
      { kind: "h3", text: "5. L'apprentissage" },
      {
        kind: "p",
        text: "Chaque correction est mémorisée pour le mandat concerné. Un fournisseur imputé une fois sur un compte y sera proposé la fois suivante. Le taux de corrections baisse avec les semaines, et il est suivi dans le rapport mensuel.",
      },
      { kind: "h2", text: "Ce qui reste à la main du collaborateur" },
      {
        kind: "list",
        items: [
          "La validation finale de chaque écriture : rien n'est comptabilisé sans un clic.",
          "Les pièces mises de côté : lisibilité insuffisante, mandat inconnu, montant douteux.",
          "Les cas de jugement : une refacturation, un acompte, une pièce qui concerne deux exercices.",
          "Le bouclement, la révision et la relation avec le client, qui ne sont pas de la saisie.",
        ],
      },
      { kind: "h2", text: "Ce qu'il faut mesurer avant d'installer" },
      {
        kind: "p",
        text: "Le seul chiffre qui compte est le temps de saisie par semaine, mesuré sur une semaine réelle, mandat par mandat si possible. C'est ce chiffre qui dit si l'installation vaut la peine, et c'est contre lui que le rapport mensuel compare les heures réellement gagnées après la mise en service.",
      },
      {
        kind: "example",
        title: "Ce que contient la mesure",
        lines: [
          "Nombre de pièces par semaine",
          "Temps moyen par pièce, saisie et classement",
          "Part des factures QR",
          "Part des pièces difficiles (manuscrites, photos)",
          "Heures par semaine, total",
        ],
      },
      { kind: "h2", text: "Le secret professionnel et la nLPD" },
      {
        kind: "p",
        text: "Le système est conçu pour que rien ne sorte du cabinet : la lecture, le classement et la préparation des écritures se font sur la machine installée dans vos locaux, et l'échange avec Bexio se fait depuis votre réseau, avec vos comptes. Les mesures de sécurité, l'accès, la journalisation et ce qui se passe en fin de contrat sont décrits dans le dossier sécurité.",
      },
      { kind: "h2", text: "Par où commencer" },
      {
        kind: "p",
        text: "Par un diagnostic de 30 minutes : on identifie les mandats et les types de pièces qui coûtent le plus d'heures, puis on mesure. La page dédiée aux fiduciaires décrit l'offre, et le formulaire de diagnostic est le point de départ.",
      },
    ],
    sources: [
      {
        label: "Loi fédérale sur la protection des données (LPD), fedlex.admin.ch",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/fr",
      },
      {
        label: "Code pénal suisse, article 321, fedlex.admin.ch",
        url: "https://www.fedlex.admin.ch/eli/cc/54/757_781_799/fr#art_321",
      },
      {
        label: "SIX, la facture QR en Suisse",
        url: "https://www.six-group.com/fr/products-services/banking-services/payment-standardization/standards/qr-bill.html",
      },
    ],
  },
];

/** Les articles d'avant la refonte qui tiennent dans le nouveau positionnement, au même format. */
function fromArticle(article: Article): Resource {
  return { ...article, keyword: article.tag, author: AUTHOR, sources: [] };
}

/** Tous les articles, les plus récents d'abord. */
export const ALL_RESOURCES: ReadonlyArray<Resource> = [
  ...RESOURCES,
  ...ARTICLES.map(fromArticle),
].sort((a, b) => (a.published < b.published ? 1 : a.published > b.published ? -1 : 0));

export function resourceBySlug(slug: string): Resource | undefined {
  return ALL_RESOURCES.find((r) => r.slug === slug);
}
