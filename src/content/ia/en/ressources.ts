/**
 * Les quatre articles de la refonte « IA locale », en anglais. Même forme
 * que `../ressources.ts` : mêmes blocs dans le même ordre, mêmes sources,
 * dates et auteur inchangés. Les cinq anciens articles ne sont pas traduits :
 * la version anglaise n'a que ces quatre-là. Les URL fedlex pointent vers la
 * traduction anglaise, fournie à titre d'information.
 */

import type { Resource } from "../ressources.ts";

export type { Resource, ResourceBlock } from "../ressources.ts";

const AUTHOR = "Tanguy Lachat";

export const RESOURCES: ReadonlyArray<Resource> = [
  {
    slug: "local-ai-switzerland",
    title: "Local AI in business: use AI without your data leaving Switzerland",
    summary:
      "What a local AI is, also called sovereign or on-premise AI, what it changes for a Swiss company, which hardware it needs and how to get started.",
    question: "What is a local AI in a business, and why choose one in Switzerland?",
    answer:
      "A local AI, also called sovereign AI, on-premise AI or on-site AI, is an open language model that runs on a machine installed on the company's premises, without sending documents to an external service. A Swiss company chooses it when its files cannot leave its walls: professional secrecy, official secrecy, the Swiss Federal Act on Data Protection (FADP, revised in 2023), client contracts, or simple caution. LX Studio, in Bassecourt (Jura), installs this type of system for its clients.",
    keyword: "local AI Switzerland",
    published: "2026-10-24",
    updated: "2026-11-05",
    readingMinutes: 7,
    tag: "Local AI",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "This article explains what “local” means in practice, what it changes compared with ChatGPT or Copilot, what hardware it takes, and how to get started without buying a server for nothing.",
      },
      {
        kind: "resume",
        items: [
          "Local means the model runs on a machine on your premises: the documents pass through no third-party server during processing.",
          "The difference from consumer tools is not the quality of the model, it is where your data is read.",
          "For most office tasks, the hardware needed fits in a box the size of a small desktop computer.",
          "The right way to start: one specific task, measured before and after, not a chatbot for everyone.",
        ],
      },
      { kind: "h2", text: "What “local” means, and what it does not mean" },
      {
        kind: "p",
        text: "When you write to ChatGPT, your text goes to the provider's servers, is processed there, and the answer comes back. With a local AI, the model itself is copied onto a machine inside your company. The document stays on its disk, the computation runs on its processor, and the answer has never left the building.",
      },
      {
        kind: "p",
        text: "Local does not mean “home-made” or “less capable”. The open models we install today are published by the same laboratories as the major services, or by teams that follow them closely. For reading an invoice, filing an email or writing the first draft of a report, they do the job.",
      },
      {
        kind: "p",
        text: "Nor does local mean “offline”. The machine can stay connected to your network to receive updates or talk to your software. What matters is that the processing of the documents itself stays in-house.",
      },
      { kind: "h2", text: "Why the question arises particularly in Switzerland" },
      {
        kind: "p",
        text: "Three reasons keep coming up among the companies in French-speaking Switzerland that contact me. The first is legal: the Swiss Federal Act on Data Protection (FADP), revised and in force since 1 September 2023, governs the disclosure of personal data abroad (Articles 16 and 17 FADP, see the source at the bottom of the page).",
      },
      {
        kind: "p",
        text: "The second is professional: fiduciaries, lawyers, doctors and some public administrations are bound by secrecy, and a file that goes to a foreign server raises a question nobody wants to answer in front of a client.",
      },
      {
        kind: "p",
        text: "The third is contractual: many SMEs work for principals whose terms prohibit any subcontracting of data outside Switzerland. An American cloud tool, even a paid one, can put them in breach.",
      },
      { kind: "h2", text: "What a local AI does well, and what is better left to others" },
      {
        kind: "p",
        text: "It is comfortable with repetitive tasks that involve your own documents: reading accounting documents, extracting amounts, sorting emails, writing a first draft from your notes, anonymising a document before it is sent. These are tasks where the model does not need to know the day's news, only to read what you give it.",
      },
      {
        kind: "p",
        text: "It is less useful for open questions about the world, online research or long creative writing, where the largest models keep a lead. Nothing stops you from keeping ChatGPT for those uses, provided you only put in information that is allowed to leave.",
      },
      { kind: "h2", text: "What hardware you really need" },
      {
        kind: "p",
        text: "For the office tasks described above, a recent desktop machine with plenty of memory is enough in most cases. In my installations, it is an Apple Mac mini with 64 GB of unified memory: it fits in the hand, plugs into a power socket and a network cable, and needs no server room. The price of the machine is listed in the quote.",
      },
      {
        kind: "p",
        text: "The classic trap is buying too big too early, on the basis of a need nobody has measured. The right sequence is the reverse: measure the task, choose the model that does it, then size the machine for that model.",
      },
      { kind: "h2", text: "How to get started without getting it wrong" },
      { kind: "h3", text: "Start with a task, not a tool" },
      {
        kind: "p",
        text: "The best starting point is the task that costs your teams the most hours and involves documents you cannot send out. At a fiduciary, it is often document entry. At an SME, sorting the info@ mailbox or sending payment reminders.",
      },
      { kind: "h3", text: "Measure before installing" },
      {
        kind: "p",
        text: "Time the task over a real week. Without that figure, nobody will be able to say whether the installation was worth anything. It is also what stops you buying a machine for a task that only takes two hours a month.",
      },
      { kind: "h3", text: "Keep human validation" },
      {
        kind: "p",
        text: "A local AI proposes, a person validates. For bookkeeping, the journal entry is proposed and the staff member confirms it. For a report, the first draft is written and the author reviews it. That is what makes the tool acceptable to your clients and to you.",
      },
      {
        kind: "quote",
        text: "The question is not whether the AI is good. It is where your documents are read.",
      },
      { kind: "h2", text: "What I do for my clients" },
      {
        kind: "p",
        text: "I install a machine on the premises, connect the system to the existing tools, and deliver one task that runs on its own, with a monthly report of the hours saved. The fiduciaries page describes the most common case, and the diagnostic form is the right starting point if you have a task in mind.",
      },
    ],
    sources: [
      {
        label:
          "Federal Act on Data Protection (FADP) of 25 September 2020, as at 1 September 2023, fedlex.admin.ch (English translation for information only)",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/en",
      },
      {
        label:
          "Federal Data Protection and Information Commissioner (FDPIC), disclosure of data abroad",
        url: "https://www.edoeb.admin.ch/",
      },
    ],
  },
  {
    slug: "chatgpt-swiss-data-protection-act",
    title: "ChatGPT and the Swiss Data Protection Act: what your company really risks",
    summary:
      "Putting client data into ChatGPT makes your company responsible under the Swiss FADP. What the law says, the risks, the US CLOUD Act, how to protect yourself.",
    question: "What does a Swiss company risk when it puts personal data into ChatGPT?",
    answer:
      "Under the Swiss Federal Act on Data Protection (FADP, revised in 2023), a company that puts personal data into ChatGPT remains responsible for that processing, including the disclosure of that data abroad, since the provider is established outside Switzerland. The risk depends on what is sent: an anonymous text poses no problem, whereas a client file that contains names does. The simplest way to stay within the law is not to send anything: anonymise first, or process the documents on site.",
    keyword: "ChatGPT Swiss data protection act",
    published: "2026-10-24",
    updated: "2026-11-05",
    readingMinutes: 8,
    tag: "Data protection",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "This article is not legal advice. It summarises what the law says, based on its articles and on the publications of the Federal Data Protection and Information Commissioner (FDPIC), and it describes what I observe in companies in French-speaking Switzerland. The points flagged for checking must be checked with your legal counsel.",
      },
      {
        kind: "resume",
        items: [
          "The Swiss Federal Act on Data Protection (FADP, revised in 2023) applies to every Swiss company that processes personal data, whatever its size.",
          "Putting a document containing personal data into a cloud tool is processing and, depending on the provider, a disclosure abroad.",
          "The real risk comes down to three points: the basis for the processing, informing the people concerned, and data security.",
          "The simple solution is not to send: anonymise first, or process on site.",
        ],
      },
      { kind: "h2", text: "What the FADP requires, in four points" },
      {
        kind: "p",
        text: "The revised Swiss Federal Act on Data Protection came into force on 1 September 2023. It applies to the processing of personal data, that is, any information relating to an identified or identifiable person: a name, an email address, a phone number, but also an invoice made out to a person or a report that mentions someone (Article 5 FADP).",
      },
      {
        kind: "list",
        items: [
          "The principles: lawfulness, good faith, proportionality, purpose. You process only what is necessary, for a recognisable purpose (Article 6 FADP).",
          "Information: the person must know that their data is being collected and, where applicable, disclosed abroad, with the name of the recipient country (Article 19 FADP).",
          "Security: technical and organisational measures appropriate to the risk (Article 8 FADP).",
          "Disclosure abroad: permitted if the country offers adequate protection or if safeguards are in place, otherwise subject to the exceptions provided for, such as express consent (Articles 16 and 17 FADP).",
        ],
      },
      { kind: "h2", text: "Why this applies to ChatGPT" },
      {
        kind: "p",
        text: "When a staff member pastes a client's email into ChatGPT to draft a reply, three things happen: personal data is processed, it is disclosed to a third party, and that third party is established outside Switzerland. Each of these three things falls under the law.",
      },
      {
        kind: "p",
        text: "Paid versions and business plans come with contractual commitments that change the analysis on security and on the use of data for training. They do not change the fact that the document has left your company. The exact terms are those published by each provider at the time you sign.",
      },
      { kind: "h2", text: "What is risky, and what is not" },
      { kind: "h3", text: "No personal data, no problem" },
      {
        kind: "p",
        text: "Asking ChatGPT to reword an internal policy, summarise a public article or write an email template with no names or references processes no personal data. It is the most common use, and from this point of view it is risk-free.",
      },
      {
        kind: "h3",
        text: "Ordinary personal data: a question of basis and information",
      },
      {
        kind: "p",
        text: "A client's email with their name and their request, a contact list, a contract in someone's name: these are ordinary personal data. Sending them assumes that the processing is proportionate, that the people concerned have been informed, and that the disclosure abroad is covered. In practice, few companies have done this work.",
      },
      { kind: "h3", text: "Sensitive personal data: the red zone" },
      {
        kind: "p",
        text: "The law gives greater protection to certain data: health and intimate life, religious, philosophical, political or trade union views, racial or ethnic origin, criminal or administrative proceedings and sanctions, social assistance measures, genetic and biometric data (Article 5 FADP). A medical file, a police file or a debt enforcement case should not go through a consumer cloud tool. Lawyers and the health professions add professional secrecy on top, public administrations add official secrecy.",
      },
      { kind: "h2", text: "What the company actually risks" },
      {
        kind: "p",
        text: "The FADP provides for criminal fines aimed at the natural persons responsible, of up to CHF 250'000 in the cases set out in the law, in particular for intentional breach of the duty to provide information (Article 60 FADP) or for disclosure of data abroad without safeguards or an applicable exception (Article 61 FADP). The FDPIC can also open an investigation and order measures.",
      },
      {
        kind: "p",
        text: "The most frequent risk, however, is not the fine. It is the question from a client, a principal or an auditor: “Where did our data go?” A vague answer costs more than proceedings.",
      },
      { kind: "h2", text: "And the US CLOUD Act?" },
      {
        kind: "p",
        text: "The US CLOUD Act, a US law in force since 2018, allows the United States authorities to demand from a provider subject to their law the data it controls, wherever that data is stored. Hosting “in Europe” with an American provider therefore does not settle the question of disclosure abroad. The only way not to have to answer it is for the document never to be under the control of such a provider: processed on site, it stays under yours.",
      },
      { kind: "h2", text: "How to use AI without exposing yourself" },
      {
        kind: "list",
        items: [
          "Write a simple rule for your teams: no personal data in a cloud tool without approval, and never any sensitive personal data.",
          "Anonymise before sending, when possible: remove names, addresses, numbers, references.",
          "Process on site what cannot leave: a local AI installed on the company's premises reads the documents without disclosing them to anyone.",
          "Keep a record of processing activities and document the choice made for each use, so that you can answer the day someone asks.",
        ],
      },
      {
        kind: "quote",
        text: "The simplest way to comply with the law on disclosing data abroad is to disclose nothing.",
      },
      {
        kind: "p",
        text: "That is the principle behind what I install for my clients: one specific task, processed on a machine on their premises, without a single document leaving. The security page describes the measures in detail, and the diagnostic form is the right starting point if you have a use in mind.",
      },
    ],
    sources: [
      {
        label:
          "Federal Act on Data Protection (FADP), Articles 5, 6, 8, 16, 17, 19 and 60, fedlex.admin.ch (English translation for information only)",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/en",
      },
      {
        label:
          "Federal Data Protection and Information Commissioner (FDPIC), the new Data Protection Act",
        url: "https://www.edoeb.admin.ch/",
      },
      {
        label:
          "Clarifying Lawful Overseas Use of Data Act (CLOUD Act), H.R. 4943, 115th United States Congress, congress.gov",
        url: "https://www.congress.gov/bill/115th-congress/house-bill/4943",
      },
    ],
  },
  {
    slug: "professional-secrecy-ai",
    title: "Professional secrecy and AI: what fiduciaries, lawyers, doctors must know",
    summary:
      "A file put into an online AI tool is disclosed to a third party. Art. 321 of the Criminal Code, what remains possible, how to use AI without breaching secrecy.",
    question: "Can a professional bound by secrecy use AI on their files?",
    answer:
      "Yes, provided the files are disclosed to no one, which in principle rules out online tools that read documents on their own servers. Article 321 of the Swiss Criminal Code punishes the disclosure of a secret entrusted by reason of one's profession, and sending a file to an online tool is a disclosure to a third party. An AI installed within the firm, which processes the files without disclosing them, makes it possible to use AI without breaching secrecy. The AI proposes, the professional decides and signs.",
    keyword: "AI professional secrecy",
    published: "2026-10-24",
    updated: "2026-11-05",
    readingMinutes: 7,
    tag: "Professional secrecy",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "This article is for fiduciaries, lawyers, doctors and every profession bound by secrecy. It is not legal advice: the passages that cite the law carry their source and are to be checked with your legal counsel or your professional association.",
      },
      {
        kind: "resume",
        items: [
          "Article 321 of the Swiss Criminal Code punishes the disclosure of a secret entrusted by reason of one's profession, for the professions it lists.",
          "Sending a file to an online tool that reads it on its servers is a disclosure to a third party.",
          "An AI installed within the firm, with no transmission outside, discloses nothing to anyone.",
          "Human validation remains the rule: the AI proposes, the professional decides and signs.",
        ],
      },
      { kind: "h2", text: "What Article 321 of the Swiss Criminal Code says" },
      {
        kind: "p",
        text: "Article 321 of the Swiss Criminal Code punishes members of the clergy, lawyers, defence counsel, notaries, patent attorneys, auditors bound to professional secrecy under the Code of Obligations, doctors, dentists, chiropractors, pharmacists, midwives, psychologists, nurses, physiotherapists, occupational therapists, dietitians, optometrists, osteopaths, and their auxiliaries, who disclose a secret entrusted to them by virtue of their profession. Disclosure is punished on complaint, and the secrecy obligation continues after the end of professional activity.",
      },
      {
        kind: "p",
        text: "Not all fiduciaries are covered by this article as such. Many are bound by secrecy through their contract, through the rules of their professional association, through business secrecy or, for auditors, through company law. The obligation then comes from elsewhere, but the practical question is the same: a file that leaves the firm is a file that has been disclosed.",
      },
      { kind: "h2", text: "Why an online tool is a problem" },
      {
        kind: "p",
        text: "An online AI tool can only read a document once it has received it. The document is therefore transmitted to the provider, stored at least for the duration of the processing, and read by its systems. That the provider promises not to use it for anything else does not change the nature of the act: it has received the secret.",
      },
      {
        kind: "p",
        text: "The client's consent lifts the secrecy, but it must be given with full knowledge of the facts, for each file or each use. Asking every client to consent to their file being read by a foreign provider is rarely realistic, and rarely good for the relationship.",
      },
      { kind: "h2", text: "What remains possible" },
      { kind: "h3", text: "Working on documents that hold no secret" },
      {
        kind: "p",
        text: "Drafting a letter template, summarising published case law, preparing a checklist: none of this discloses a secret, and online tools are useful for it.",
      },
      { kind: "h3", text: "Anonymising before sending" },
      {
        kind: "p",
        text: "A text from which everything that identifies the client has been removed can, depending on the case, be processed online. The difficulty is practical: an invoice, a medical report or a contract are full of identifying details, and manual anonymisation often takes more time than the hoped-for gain.",
      },
      { kind: "h3", text: "Processing on site" },
      {
        kind: "p",
        text: "An AI installed on a machine within the firm reads the files where they are, without transmitting them to anyone. Nobody receives the secret. It is the only configuration that makes it possible to automate the reading of accounting documents, the writing of first drafts or the anonymisation itself, without the question of disclosure ever arising.",
      },
      { kind: "h2", text: "The safeguards that matter, even on site" },
      {
        kind: "list",
        items: [
          "Access to the machine is restricted to people within the firm who are already bound by secrecy.",
          "Every processing operation is logged: who, when, on which file.",
          "Maintenance by an external provider takes place under your control, for a dated intervention, with no permanent access.",
          "The AI proposes and the professional validates: the decision remains a human decision, signed.",
        ],
      },
      {
        kind: "quote",
        text: "Secrecy does not depend on the quality of the tool. It depends on who has seen the file.",
      },
      {
        kind: "p",
        text: "That is the principle of the system I install at fiduciaries: document entry, done within the firm, without a single client file leaving. The fiduciaries page describes how it works, and the security dossier details each measure for your IT manager or your legal counsel.",
      },
    ],
    sources: [
      {
        label:
          "Swiss Criminal Code, Article 321 (breach of professional secrecy), fedlex.admin.ch (English translation for information only)",
        url: "https://www.fedlex.admin.ch/eli/cc/54/757_781_799/en#art_321",
      },
      {
        label:
          "Federal Act on Data Protection (FADP), fedlex.admin.ch (English translation for information only)",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/en",
      },
    ],
  },
  {
    slug: "accounting-firm-automate-bookkeeping-ai",
    title: "Fiduciaries: automate document entry with an AI installed at the firm",
    summary:
      "How an AI installed at the firm reads the documents, sorts them and proposes the journal entries in Bexio without a client file leaving, and where to start.",
    question:
      "How can a fiduciary automate document entry without the client files leaving the firm?",
    answer:
      "By installing an AI on a machine within the firm, connected to the accounting software. It reads each accounting document, extracts the amounts, dates and VAT, proposes the journal entry, and the staff member validates or corrects it. The system learns from the corrections. The client files do not leave the firm, and the hours spent on document entry are measured before the installation, then every month after it.",
    keyword: "AI for accounting firms",
    published: "2026-10-24",
    updated: "2026-11-05",
    readingMinutes: 8,
    tag: "Fiduciaries",
    author: AUTHOR,
    blocks: [
      {
        kind: "p",
        text: "This article describes how it works in practice, what the system does well, what still requires human validation, and where to start. It draws on what I install for my clients and on the pilot under way at a firm in French-speaking Switzerland.",
      },
      {
        kind: "resume",
        items: [
          "Document entry is the most repetitive task in the firm and the one best suited to automation.",
          "The system reads the documents on a machine at the firm, sorts them by client file and proposes the journal entries in Bexio.",
          "The staff member validates or corrects; the system learns from the corrections.",
          "The hours spent on document entry are measured before the installation, then every month after it.",
        ],
      },
      { kind: "h2", text: "Why start with document entry" },
      {
        kind: "p",
        text: "In a firm, document entry has three characteristics that make it the ideal starting point: it repeats every week, it follows stable rules, and it involves documents that cannot leave. It is also the task that staff members are least sorry to see go.",
      },
      {
        kind: "p",
        text: "Document recognition tools have been around for a long time. What changes with recent models is their ability to understand an unusual document, to read a handwritten or badly framed invoice, and to propose an account rather than just figures.",
      },
      { kind: "h2", text: "How the system works, step by step" },
      { kind: "h3", text: "1. The documents arrive" },
      {
        kind: "p",
        text: "By scan, by email, by drop into a shared folder or by photo from a phone: the documents are deposited where the firm already receives them. The system monitors these entry points on the firm's network.",
      },
      { kind: "h3", text: "2. Reading" },
      {
        kind: "p",
        text: "Each document is read on the firm's machine. The system identifies the type of document, the supplier or the client, the date, the amounts excluding and including VAT, the VAT rate, the reference. For Swiss QR-bills, it reads the QR code directly, which eliminates entry errors on amounts and payment references. Documents arrive as PDF or as images (scan, photo).",
      },
      { kind: "h3", text: "3. Sorting" },
      {
        kind: "p",
        text: "The document is placed in the folder of the right client file, renamed according to the firm's convention, and ready for archiving. A document the system cannot assign is set aside with the reason, for manual processing.",
      },
      { kind: "h3", text: "4. The proposed journal entry" },
      {
        kind: "p",
        text: "The journal entry is prepared in Bexio, with the account and the VAT code proposed from the client file's chart of accounts and past entries. The staff member sees it in an interface accessible from the firm's network, validates it in one click or corrects it. For Abacus, Crésus or WinBIZ, the status of the connector is specified during the diagnostic.",
      },
      { kind: "h3", text: "5. Learning" },
      {
        kind: "p",
        text: "Each correction is remembered for the client file concerned. A supplier posted once to an account will be proposed there the next time. The correction rate falls over the weeks, and it is tracked in the monthly report.",
      },
      { kind: "h2", text: "What stays in the staff member's hands" },
      {
        kind: "list",
        items: [
          "The final validation of each journal entry: nothing is posted without a click.",
          "The documents set aside: insufficient legibility, unknown client file, doubtful amount.",
          "The judgement calls: a re-invoicing, a down payment, a document that spans two financial years.",
          "The year-end closing, the audit and the client relationship, which are not document entry.",
        ],
      },
      { kind: "h2", text: "What to measure before installing" },
      {
        kind: "p",
        text: "The only figure that matters is the time spent on document entry per week, measured over a real week, client file by client file if possible. That figure says whether the installation is worth it, and it is the benchmark against which the monthly report compares the hours actually saved after the system goes live.",
      },
      {
        kind: "example",
        title: "What the measurement contains",
        lines: [
          "Number of documents per week",
          "Average time per document, entry and sorting",
          "Share of QR-bills",
          "Share of difficult documents (handwritten, photos)",
          "Hours per week, total",
        ],
      },
      {
        kind: "h2",
        text: "Professional secrecy and the Swiss Federal Act on Data Protection (FADP)",
      },
      {
        kind: "p",
        text: "The system is designed so that nothing leaves the firm: reading, sorting and preparing the journal entries take place on the machine installed on your premises, and the exchange with Bexio takes place from your network, with your accounts. The security measures, access, logging and what happens at the end of the contract are described in the security dossier.",
      },
      { kind: "h2", text: "Where to start" },
      {
        kind: "p",
        text: "With a 30-minute diagnostic: we identify the client files and the types of documents that cost the most hours, then we measure. The fiduciaries page describes the offer, and the diagnostic form is the starting point.",
      },
    ],
    sources: [
      {
        label:
          "Federal Act on Data Protection (FADP), fedlex.admin.ch (English translation for information only)",
        url: "https://www.fedlex.admin.ch/eli/cc/2022/491/en",
      },
      {
        label:
          "Swiss Criminal Code, Article 321, fedlex.admin.ch (English translation for information only)",
        url: "https://www.fedlex.admin.ch/eli/cc/54/757_781_799/en#art_321",
      },
      {
        label: "SIX, the QR-bill in Switzerland",
        url: "https://www.six-group.com/en/products-services/banking-services/payment-standardization/standards/qr-bill.html",
      },
    ],
  },
];

/** All the articles, most recent first. */
export const ALL_RESOURCES: ReadonlyArray<Resource> = [...RESOURCES].sort((a, b) =>
  a.published < b.published ? 1 : a.published > b.published ? -1 : 0,
);

export function resourceBySlug(slug: string): Resource | undefined {
  return ALL_RESOURCES.find((r) => r.slug === slug);
}
