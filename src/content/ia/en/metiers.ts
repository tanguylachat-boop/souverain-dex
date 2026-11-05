/**
 * The three trade pages, in English. Same template as the home page, text
 * specific to each trade. `/en/fiduciaries` is the priority page and the most
 * complete one. Translation of ../metiers.ts, which owns the type.
 */
import type { Metier } from "../metiers.ts";

export const METIERS: ReadonlyArray<Metier> = [
  {
    slug: "fiduciaries",
    path: "/en/fiduciaries",
    seo: {
      title: "AI for fiduciaries: documents booked in-house | LX Studio",
      description:
        "An AI installed at the firm books accounting documents, reads Swiss QR-bills and writes to Bexio. No client file leaves the firm. FADP and professional secrecy.",
      keywords:
        "AI for fiduciaries Switzerland, AI accounting firm, automated bookkeeping AI, Bexio AI, professional secrecy AI, Swiss data protection act AI",
    },
    hero: {
      eyebrow: "Fiduciaries · Jura and French-speaking Switzerland",
      title:
        "AI for fiduciaries: your accounting documents booked at the firm. Not one client file leaves it.",
      sub: "An AI installed on a machine in your office reads the documents, files them, books them in Bexio and leaves the validation to you. Nothing goes to an external server. The product is already running as a pilot in a firm in French-speaking Switzerland.",
    },
    tasks: {
      eyebrow: "What the system does",
      title: "Monday's documents, processed before your first coffee.",
      items: [
        {
          title: "Document reading",
          text: "Supplier invoices, receipts, statements, Swiss QR-bills: each document is read, and its amounts, dates, VAT and references are extracted on the firm's machine.",
        },
        {
          title: "Filing and renaming",
          text: "Each document is filed in the right client's folder, renamed according to your convention, ready for archiving.",
        },
        {
          title: "Booking in Bexio",
          text: "The journal entry is proposed in Bexio with the account and the VAT code. You validate, you correct, and the system learns from your corrections. For Abacus, Crésus and WinBIZ, the status of the connector is clarified during the diagnostic.",
        },
        {
          title: "Reminders and missing documents",
          text: "The system spots the documents that are missing and prepares the reminders to your clients, which you send in one click.",
        },
      ],
    },
    problem: {
      title: "You want AI. You cannot put your clients' files into it.",
      blocks: [
        "Your staff spend hours re-entering documents that nobody will read twice.",
        "The AI tools on the market would help, but they send your clients' documents to servers outside the firm, and professional secrecy does not allow it.",
        "So the bookkeeping stays manual, and year-end closings are still done in the evening.",
      ],
    },
    difference: {
      title: "Others sell you a server. I deliver your documents, already booked.",
      rows: [
        {
          label: "What we install",
          generic: "A chatbot",
          lx: "Document entry, running on its own",
        },
        {
          label: "Who has to use it",
          generic: "Your staff have to learn it",
          lx: "They validate, the rest runs in the background",
        },
        {
          label: "How we measure",
          generic: "Nothing",
          lx: "The bookkeeping hours recovered every month",
        },
        { label: "Where the files are", generic: "Often in the cloud", lx: "At the firm" },
      ],
    },
    method: {
      title: "We measure the bookkeeping before installing, and we check afterwards.",
      steps: [
        {
          title: "Diagnostic",
          meta: "30 minutes, free",
          text: "We identify the client files and the types of documents that cost the most hours.",
        },
        {
          title: "Measurement",
          meta: "Before you sign",
          text: "We time the bookkeeping over a real week and put a figure on the recoverable hours, before you sign anything.",
        },
        {
          title: "Solution",
          meta: "At the firm",
          text: "The machine is installed at the firm, connected to Bexio and to your files. You validate the journal entries on your real client files before it goes live.",
        },
        {
          title: "Check",
          meta: "Every month",
          text: "A monthly report of the hours actually saved, for several months. If the gap with the measurement is too wide, we adjust.",
        },
      ],
    },
    faq: [
      {
        q: "Do my clients' files leave the firm?",
        a: "No. Reading, filing and booking take place on the machine installed at the firm. No document is sent to an external service during processing.",
        dossier: true,
      },
      {
        q: "What about professional secrecy?",
        a: "The system is designed so that nothing leaves the firm, which is the condition for working on files covered by professional secrecy. The security dossier describes each measure.",
        dossier: true,
      },
      {
        q: "Does it work with Bexio, Abacus, Crésus or WinBIZ?",
        a: "Bexio: yes. Abacus, Crésus and WinBIZ: the status of the connector is clarified during the diagnostic, depending on your version.",
      },
      {
        q: "What does the system do with a document it does not understand?",
        a: "It sets it aside with the reason, and you process it by hand. Nothing is booked without a sufficient confidence level, and you keep the final validation.",
      },
      {
        q: "How much does it cost?",
        a: "Quoted after the diagnostic, depending on the number of client files and the volume of documents. The quote details the hours and what is included.",
      },
    ],
    form: {
      title:
        "Tell me how many documents you book each month. I will tell you in 30 minutes what the firm can recover.",
      text: "Reply within one working day. The diagnostic is free and without obligation.",
    },
    dossier: true,
  },
  {
    slug: "public-administrations",
    path: "/en/public-administrations",
    seo: {
      title: "On-premise AI for police and public administrations | LX Studio",
      description:
        "Reports drafted and documents anonymised by an AI installed on the servers of your municipality, canton or police force. No data leaves your network.",
      keywords:
        "AI public administration Switzerland, AI police reports, AI document anonymisation, sovereign AI public administration, on-premise AI French-speaking Switzerland",
    },
    hero: {
      eyebrow: "Police and public administrations · French-speaking Switzerland",
      title:
        "AI for police and public administrations: reports drafted and documents anonymised, on your servers.",
      sub: "An AI installed on the servers of a municipality, a cantonal department or a police force drafts the first versions of reports from your notes and anonymises documents before they are passed on. No data leaves your network: that is the basic condition for working under official secrecy (Article 320 of the Swiss Criminal Code).",
    },
    tasks: {
      eyebrow: "What the system does",
      title: "The writing work, done before proofreading.",
      items: [
        {
          title: "Report drafting",
          text: "From your notes, minutes or forms, the system produces a first version structured according to your template. You proofread and sign.",
        },
        {
          title: "Anonymisation",
          text: "Names, addresses, number plates, numbers: personal data is spotted and replaced before a document is passed on or archived. The categories handled are set with you at installation.",
        },
        {
          title: "Filing and search",
          text: "Documents are indexed on your server so that a file can be found by its content, without any index leaving your walls.",
        },
        {
          title: "Logging",
          text: "Every processing operation is logged: who launched what, on which document, at what time. The format and the retention period of the logs are set with you at installation.",
        },
      ],
    },
    problem: {
      title: "You want AI. You cannot put a file into it.",
      blocks: [
        "Your officers spend hours drafting, rewording and redacting documents.",
        "Consumer AI tools would help them, but no file can go to a foreign server.",
        "So the reports wait, and the core work comes after the writing.",
      ],
    },
    difference: {
      title: "Others sell you a server. I deliver the report, already drafted.",
      rows: [
        {
          label: "What we install",
          generic: "A chatbot",
          lx: "Drafting and anonymisation, running on their own",
        },
        {
          label: "Who has to use it",
          generic: "Your officers have to learn it",
          lx: "They proofread, the rest runs in the background",
        },
        {
          label: "How we measure",
          generic: "Nothing",
          lx: "The writing hours recovered every month",
        },
        { label: "Where the data is", generic: "Often in the cloud", lx: "On your servers" },
      ],
    },
    method: {
      title: "We measure before installing, and we check afterwards.",
      steps: [
        {
          title: "Diagnostic",
          meta: "30 minutes, free",
          text: "We identify the documents that cost the most hours to produce.",
        },
        {
          title: "Measurement",
          meta: "Before you sign",
          text: "We time the drafting and the anonymisation on real files, and put a figure on the recoverable hours.",
        },
        {
          title: "Solution",
          meta: "On your servers",
          text: "The system is installed on your infrastructure, with your document templates, and validated with your IT manager.",
        },
        {
          title: "Check",
          meta: "Every month",
          text: "A monthly report of the hours actually saved. If the gap with the measurement is too wide, we adjust.",
        },
      ],
    },
    faq: [
      {
        q: "Where is the data processed?",
        a: "On your servers or on a machine installed on your premises. No call to an external service during processing.",
        dossier: true,
      },
      {
        q: "Who controls access?",
        a: "You do. Accounts are created and removed by you, every action is logged, and integration with your existing directory is examined during the diagnostic.",
        dossier: true,
      },
      {
        q: "What about official secrecy?",
        a: "Public officials are bound by official secrecy (Article 320 of the Swiss Criminal Code). Processing that lets no document leave your network is the basic condition for considering it; the final assessment rests with your legal department.",
        dossier: true,
      },
      {
        q: "Does the system make decisions?",
        a: "No. It drafts first versions and proposes anonymisations. The decision and the signature remain human.",
      },
      {
        q: "How much does it cost?",
        a: "Quoted after the diagnostic, depending on the types of documents and the volume.",
      },
    ],
    form: {
      title:
        "Tell me which documents cost you the most. I will tell you in 30 minutes what AI can do with them.",
      text: "Reply within one working day. The diagnostic is free and without obligation.",
    },
    dossier: true,
  },
  {
    slug: "smes",
    path: "/en/smes",
    seo: {
      title: "Local AI for SMEs: emails sorted, invoices chased | LX Studio",
      description:
        "An on-site AI sorts your emails, chases invoices and prepares quotes. No cloud subscription, no data with third parties. Jura and French-speaking Switzerland.",
      keywords:
        "local AI SMEs Switzerland, AI administrative automation, automatic invoice reminders, AI email sorting, AI without cloud, AI Jura",
    },
    hero: {
      eyebrow: "SMEs · Jura and French-speaking Switzerland",
      title: "Local AI for SMEs: emails sorted, invoices chased, no cloud subscription.",
      sub: "An AI installed on your premises sorts the info@ mailbox, chases overdue invoices and prepares quotes, directly in your tools. No subscription, no data held by a third party.",
    },
    tasks: {
      eyebrow: "What the system does",
      title: "The office work that repeats itself, done without you.",
      items: [
        {
          title: "Email sorting",
          text: "Every incoming email is classified, requests are forwarded to the right person, and routine replies are prepared for validation.",
        },
        {
          title: "Payment reminders",
          text: "Overdue invoices are spotted in Bexio and the reminders prepared according to your reminder levels, ready to send.",
        },
        {
          title: "Quotes and documents",
          text: "From an email or a note, the system prepares the quote in your template, with your prices. You check and send.",
        },
        {
          title: "Documents for your fiduciary",
          text: "Supporting documents are gathered, named and sent to your fiduciary at the agreed frequency.",
        },
      ],
    },
    problem: {
      title: "You want AI. You cannot put your clients into it.",
      blocks: [
        "You or your staff spend hours on data entry, sorting and reminders.",
        "ChatGPT or Copilot would help, but your quotes, your margins and your clients would go to American servers.",
        "So you wait, while the admin work keeps eating up whole days.",
      ],
    },
    difference: {
      title: "Others sell you a subscription. I deliver the work, done.",
      rows: [
        {
          label: "What we install",
          generic: "A chatbot",
          lx: "One specific task, running on its own",
        },
        {
          label: "Who has to use it",
          generic: "You have to learn it",
          lx: "It runs in the background",
        },
        { label: "How we measure", generic: "Nothing", lx: "The hours recovered every month" },
        {
          label: "Where the data is",
          generic: "In the cloud, with a subscription",
          lx: "On your premises, without a subscription",
        },
      ],
    },
    method: {
      title: "We measure before installing, and we check afterwards.",
      steps: [
        {
          title: "Diagnostic",
          meta: "30 minutes, free",
          text: "We identify the tasks that cost you the most hours.",
        },
        {
          title: "Measurement",
          meta: "Before you sign",
          text: "We time these tasks over a real week and put a figure on the recoverable hours.",
        },
        {
          title: "Solution",
          meta: "On your premises",
          text: "The machine is installed on your premises and connected to your tools: Bexio, email, files.",
        },
        {
          title: "Check",
          meta: "Every month",
          text: "A monthly report of the hours actually saved. If the gap with the measurement is too wide, we adjust.",
        },
      ],
    },
    faq: [
      {
        q: "No subscription, really?",
        a: "The system is bought and installed on your premises. The monthly follow-up for the first months is included in the quote. After that, maintenance is covered by a separate agreement, with no subscription to a cloud service.",
      },
      {
        q: "Does it work with my email system?",
        a: "Microsoft 365, Google Workspace, Infomaniak: the status of the connector is clarified during the diagnostic, depending on your tool.",
      },
      {
        q: "What if I change tools?",
        a: "The system is connected to your tools through connectors. Changing a tool means changing a connector, not the system.",
      },
      {
        q: "How much does it cost?",
        a: "Quoted after the diagnostic, depending on the task and the volume.",
      },
    ],
    form: {
      title:
        "Tell me which task costs you the most. I will tell you in 30 minutes what AI can do with it.",
      text: "Reply within one working day. The diagnostic is free and without obligation.",
    },
    dossier: false,
  },
];

export function metierBySlug(slug: string): Metier | undefined {
  return METIERS.find((m) => m.slug === slug);
}
