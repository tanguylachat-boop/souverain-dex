/**
 * Home page, section by section, in the order of the brief.
 * English version of ../home.ts, same shape, guaranteed by ../shape.ts.
 * Each title is a promise of what the client gets.
 */
import type { HomeContent } from "../shape.ts";

export const HOME_SEO: HomeContent["HOME_SEO"] = {
  path: "/en",
  title: "Local AI installed on site, Jura, Switzerland | LX Studio",
  description:
    "An AI installed on your premises (sovereign or on-premise AI) handles your accounting documents, emails and reports. Nothing is sent out. Jura, Switzerland.",
  keywords:
    "on-premise AI Switzerland, sovereign AI Switzerland, local AI for businesses, AI without cloud, Swiss data protection act AI, AI Jura",
};

export const HERO: HomeContent["HERO"] = {
  eyebrow: "AI installed on your premises · Jura · French-speaking Switzerland",
  title: "AI does the work. Your data never leaves your premises.",
  sub: "I install an AI on your premises that processes your accounting documents, your emails and your reports, directly on your own machines. Nothing goes to OpenAI. Nothing leaves the building.",
  primary: { label: "Book a free 30-minute diagnostic", to: "#diagnostic" },
  secondary: { label: "Watch the 2-minute demo", to: "#demo" },
  /** Alt text of the visual, built in code (a photo of the machine can replace it). */
  visualAlt: "A machine sitting in an office, network cable unplugged: the AI runs on site",
};

/** The 2-minute demo: video rendered by `npm run demo` from scripts/demo/demo.html. Narrated in French. */
export const DEMO: HomeContent["DEMO"] = {
  eyebrow: "The demo",
  title: "Two minutes to watch a document processed, from the scan to the validated journal entry.",
  text: "The video is narrated in French; its full text is written in English below. A sample invoice comes in, is read, filed and put forward for validation, on a machine that makes no call to the outside world during processing. A voice explains each step, and everything is also written on screen.",
  play: "Watch the 2-minute demo",
  poster: "/demo/demo-poster.jpg",
  mp4: "/demo/demo-lx-studio.mp4",
  webm: "/demo/demo-lx-studio.webm",
  duration: "PT2M",
  uploadDate: "2026-10-24",
  transcriptLabel: "The text of the video",
  chapters: [
    {
      time: "0:00",
      title: "An accounting document, from the scan to the validated journal entry.",
      text: "Here is what happens when an accounting document arrives at a firm equipped by LX Studio.",
    },
    {
      time: "0:06",
      title: "The machine is on your premises.",
      text: "The machine is on your premises. Installed in your offices, connected to your network. During processing, no call goes out to any external service: not to an artificial intelligence provider, not to LX Studio.",
    },
    {
      time: "0:20",
      title: "Documents arrive as they do today.",
      text: "Documents arrive as they do today. Through the scanner, by email, as a photo taken on a phone. Nothing changes for your clients or for your staff.",
    },
    {
      time: "0:34",
      title: "Read on site.",
      text: "The document is read on site. The supplier, the date, the amounts, the VAT, the Swiss QR-bill reference: everything is extracted on the machine, within your walls.",
    },
    {
      time: "0:49",
      title: "Filed, renamed.",
      text: "It is then filed under the right client file. And renamed according to your naming convention, ready for archiving.",
    },
    {
      time: "1:01",
      title: "The journal entry is proposed. You validate it.",
      text: "The journal entry is proposed in your accounting software, with the account and the VAT code inferred from your past entries. One click to validate. One click to correct. If you correct it, the system remembers the correction for that client file and proposes it the next time.",
    },
    {
      time: "1:23",
      title: "What it does not understand, it sets aside.",
      text: "What it does not understand, it sets aside. With the reason. Nothing is booked without your click.",
    },
    {
      time: "1:37",
      title: "Every month, a report.",
      text: "And every month, a report: the documents processed, the bookkeeping hours recovered, the corrections made. Compared with the measurement taken before the installation. Measured on your premises, not promised.",
    },
    {
      time: "1:51",
      title: "Nothing has left the firm.",
      text: "Nothing has left the firm. Book a free 30-minute diagnostic at lxstudio.ch.",
    },
  ],
};

export const CREDIBILITY: HomeContent["CREDIBILITY"] = {
  eyebrow: "References",
  title: "They trusted me with their processes",
  clients: [
    {
      name: "Facchinetti Automobiles",
      note: "BMW Delémont",
      line: "Contact capture and vehicle sheets by QR code at the Comptoir du Jura trade fair",
      logo: "/logos/facchinetti.png",
      logoNight: "/logos/facchinetti-blanc.png",
      width: 640,
      height: 158,
    },
    {
      name: "Richoz Sanitaire",
      note: "Geneva",
      line: "Service call and technician management, connected to Bexio",
      logo: "/logos/richoz.webp",
      logoNight: "/logos/richoz.webp",
      width: 350,
      height: 131,
    },
    {
      name: "Oasis Drink",
      note: "Beverage distribution",
      line: "Ordering system for a beverage distributor",
      logo: "",
      logoNight: "",
      width: 0,
      height: 0,
    },
    {
      name: "Coca-Cola HBC",
      note: "Switzerland",
      line: "Automated reports",
      logo: "",
      logoNight: "",
      width: 0,
      height: 0,
      /** Only with written consent (SHOW_CCHBC variable). */
      gated: true,
    },
  ],
};

export const PROBLEM: HomeContent["PROBLEM"] = {
  eyebrow: "The problem",
  title: "You want AI. You cannot put your files into it.",
  blocks: [
    "Your teams spend hours on data entry, sorting and payment reminders.",
    "ChatGPT or Copilot would help them, but your data would end up on American servers.",
    "So you wait, while admin work keeps eating up whole days.",
  ],
};

export const DIFFERENCE: HomeContent["DIFFERENCE"] = {
  eyebrow: "The difference",
  title: "Others sell you a server. I deliver the work, done.",
  columns: ["A generic AI", "LX Studio"],
  rows: [
    {
      label: "What gets installed",
      generic: "A chat",
      lx: "One specific task that runs on its own",
    },
    {
      label: "Who has to use it",
      generic: "Your teams have to learn it",
      lx: "It runs in the background",
    },
    { label: "How it is measured", generic: "Nothing", lx: "The hours recovered every month" },
    { label: "Where the data is", generic: "Often in the cloud", lx: "On your premises" },
  ],
};

export const METHOD: HomeContent["METHOD"] = {
  eyebrow: "The method",
  title: "We measure before installing, and we monitor afterwards.",
  steps: [
    {
      title: "Diagnostic",
      meta: "30 minutes, free",
      text: "We identify the tasks that cost you the most hours.",
    },
    {
      title: "Measurement",
      meta: "Before you sign",
      text: "We time those tasks and put a figure on the recoverable hours, before you sign anything.",
    },
    {
      title: "Solution",
      meta: "On your premises",
      text: "The AI is installed on your machine, on your premises, and connected to your tools: Bexio, email, folders.",
    },
    {
      title: "Monitoring",
      meta: "Every month",
      text: "A monthly follow-up, over several months, with a report of the hours actually saved. If the gap with the measurement is too wide, we adjust.",
    },
  ],
  /** Guarantee: none published until Tanguy validates its wording (question 10). */
  guarantee: "",
};

export const SECTORS: HomeContent["SECTORS"] = {
  eyebrow: "By sector",
  title: "One specific task, for your line of work.",
  cards: [
    {
      to: "/en/fiduciaries",
      kicker: "Fiduciaries",
      title:
        "Your accounting documents entered on their own, without a client file ever leaving the firm.",
      cta: "See it for fiduciaries",
    },
    {
      to: "/en/public-administrations",
      kicker: "Police and public administrations",
      title: "Reports drafted and documents anonymised, on your servers.",
      cta: "See it for public administrations",
    },
    {
      to: "/en/smes",
      kicker: "SMEs",
      title: "Emails sorted, invoices chased, with no cloud subscription.",
      cta: "See it for SMEs",
    },
  ],
};

export const ARTICLES_TEASER: HomeContent["ARTICLES_TEASER"] = {
  eyebrow: "Resources",
  title: "What you need to know before installing an AI on your premises.",
  cta: { label: "All resources", to: "/en/resources" },
  /** The four articles of the brief, by English slug. */
  slugs: [
    "local-ai-switzerland",
    "chatgpt-swiss-data-protection-act",
    "professional-secrecy-ai",
    "accounting-firm-automate-bookkeeping-ai",
  ],
};

export const FORM: HomeContent["FORM"] = {
  id: "diagnostic",
  eyebrow: "Free diagnostic",
  title:
    "Tell me which task costs you the most. In 30 minutes, I will tell you what AI can do with it.",
  text: "Reply within one working day. The diagnostic is free and commits you to nothing.",
  fields: {
    name: "Your name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    size: "Number of staff",
    task: "The task that takes you the most time",
    taskPlaceholder:
      "For example: Monday's document entry, end-of-month payment reminders, sorting the info@ inbox",
  },
  sizes: ["1 to 5", "6 to 20", "21 to 50", "51 to 200", "More than 200"],
  consent:
    "I agree that my data may be used to process my request, in accordance with the privacy policy.",
  submit: "Request my diagnostic",
  sending: "Sending",
  success: {
    title: "Thank you, your request has been sent.",
    text: "I will reply within one working day. To move faster, you can book a 30-minute slot directly.",
    cta: "Book the diagnostic",
  },
  error:
    "The message could not be sent. Write to me directly at contact@lxstudio.ch or call 078 703 88 00.",
};

export const FAQ: HomeContent["FAQ"] = {
  eyebrow: "Frequently asked questions",
  title: "The questions I am asked before installing.",
  entries: [
    {
      q: "Where exactly is my data processed?",
      a: "On a machine installed on your premises, connected to your network: this is what is called local AI, sovereign AI or on-premise AI. During processing, no call goes out to any external service. The documents you entrust to the system stay on that disk, on your premises.",
    },
    {
      q: "What hardware do I need?",
      a: "A power socket, access to your network and a space the size of a book. The machine is supplied and installed with the system: an Apple Mac mini (M4 Pro chip, 64 GB of unified memory), whose price is listed in the quote.",
    },
    {
      q: "How much does it cost?",
      a: "Quoted after the diagnostic, depending on the task and the volume. The quote details the hours and what is included. Nothing is invoiced before you have approved it.",
    },
    {
      q: "How long does the installation take?",
      a: "The timeline is set in the quote and runs from its approval, measurement included. You follow each step and validate the result on your real files before going live.",
    },
    {
      q: "Is an internet connection required?",
      a: "Not to process your documents. A connection is used for updates, scheduled with you, and for remote monitoring if you allow it.",
    },
    {
      q: "How is this different from ChatGPT Enterprise or Copilot?",
      a: "Those tools run on their vendor's servers and require your teams to talk to a chat. Here, the AI runs on your premises and does one specific task on its own, with a report of the hours saved every month.",
    },
    {
      q: "Does it work with Bexio, Abacus or my email system?",
      a: "Bexio: yes, a system connected to Bexio is already running at a client's. Abacus and the common email systems (Microsoft 365, Google Workspace, Infomaniak): the status of the connector is specified during the diagnostic, depending on your tool and its version.",
    },
    {
      q: "Who is behind LX Studio?",
      a: "Tanguy Lachat, AI engineer, founder of LX Studio in Bassecourt, in the Jura. I install every system myself, in the Jura and across French-speaking Switzerland, and I remain your point of contact after go-live.",
    },
    {
      q: "What happens if LX Studio disappears?",
      a: "The machine and the system stay with you. The code and the documentation are handed over to you at installation, and another provider can take over the maintenance.",
    },
    {
      q: "Is it compatible with professional secrecy and the Swiss FADP?",
      a: "The system is designed to comply with the Swiss Federal Act on Data Protection (FADP, revised in 2023): the data stays within your walls and is not passed on to any third party. For professional secrecy, it is precisely because nothing leaves the firm that the use becomes possible. The security dossier details each measure.",
      dossier: true,
    },
  ],
};
