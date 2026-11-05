/**
 * English version of the /securite content: the /en/security page AND the
 * security dossier PDF. Same shape as the French file, enforced by the
 * SecuriteContent contract: same sections, same ids (anchors, looked up by
 * the PDF script), same number of points. What is not fixed yet is said as
 * such (fixed at installation, recorded in the dossier); what has not been
 * done is said as not done (penetration test). No legal statement without a
 * source.
 */
import type { SecuriteContent } from "../shape.ts";

export type { SecuriteSection } from "../securite.ts";

export const SECURITE_VERSION: SecuriteContent["SECURITE_VERSION"] = {
  version: "1.1",
  date: "26.10.2026",
  file: "/security-dossier-lx-studio.pdf",
};

export const SECURITE_SEO: SecuriteContent["SECURITE_SEO"] = {
  path: "/en/security",
  title: "Security and compliance of on-premise AI | LX Studio",
  description:
    "Where the data is processed, encryption, access, logging, backups, end of contract, Swiss FADP, US CLOUD Act: the page your IT manager reads.",
  keywords:
    "on-premise AI security, FADP compliant AI, AI professional secrecy, data sovereignty Switzerland, local AI encryption",
};

export const SECURITE_HERO: SecuriteContent["SECURITE_HERO"] = {
  eyebrow: "Security and compliance",
  title: "Your data stays on your premises. Here is how, point by point.",
  sub: "An AI installed on site, also called sovereign AI or on-premise AI, is only worth having if every measure can be verified. This page is written for the IT manager, the commander or the partner who has to answer for security. What is fixed at installation is stated as such, and so is what has not been done yet.",
};

export const SECURITE_SECTIONS: SecuriteContent["SECURITE_SECTIONS"] = [
  {
    id: "donnees",
    title: "Where the data is processed",
    summary:
      "On a machine installed on your premises, on your network, with no call to an external service during processing.",
    points: [
      "The system is installed on a dedicated machine in your offices, supplied with it: an Apple Mac mini (M4 Pro chip, 64 GB unified memory), the size of a book.",
      "While a document is being processed, no request is sent to any external service: not to an AI model provider, not to LX Studio.",
      "The processed documents, the results and the logs stay on this machine's disk.",
      "The connectors to your tools (Bexio, email, folders) talk to those tools from your network, with your accounts. The list of active connectors and their data flows is recorded in the dossier at installation.",
    ],
  },
  {
    id: "architecture",
    title: "Architecture",
    summary:
      "Three building blocks on a single machine: the connectors to your tools, the AI engine, and the validation interface.",
    points: [
      "Connectors: they read your sources (email, folders, accounting software) and write the validated results back into them.",
      "Engine: open AI models (Llama and Qwen families), run locally on the machine by Ollama, with local text recognition (Tesseract) and a Swiss QR-bill reader; the exact names and versions are recorded in the dossier at installation.",
      "Interface: a web page reachable from your internal network only, where your teams validate or correct.",
      "None of these building blocks can be reached from outside your network without your explicit authorisation.",
    ],
  },
  {
    id: "chiffrement",
    title: "Encryption",
    summary: "Encryption of the disk at rest and of the exchanges in transit on your network.",
    points: [
      "At rest: the machine's disk is encrypted; the method and the custody of the key are recorded in the dossier at installation.",
      "In transit: the exchanges between your workstations and the interface, and between the machine and your tools, go through encrypted connections (TLS), with certificates issued for your network and recorded in the dossier.",
      "Backups, if you request them, are encrypted before being written to your storage medium.",
    ],
  },
  {
    id: "acces",
    title: "Access control and logging",
    summary: "You decide who accesses the system; every action is logged on your premises.",
    points: [
      "User accounts are created and removed by you; integration with your existing directory is assessed at installation.",
      "Rights follow roles: who can start a processing run, who can validate, who can view the logs.",
      "Every processing run is logged: user, document, time, result. The logs stay on the machine; their retention period is set with you.",
      "LX Studio's remote access for support goes through an encrypted tunnel that you authorise at installation and can cut off at any time; every intervention is dated and logged like any other action.",
    ],
  },
  {
    id: "sauvegardes",
    title: "Backups",
    summary: "Backups are made on your own storage media, according to your policy.",
    points: [
      "The system sends no backup outside your network.",
      "A scheduled backup runs on the machine; you choose the storage medium (NAS, server, disk) and the frequency. The restore procedure is described in the dossier handed over at installation.",
      "Processed data can be purged from the machine after validation, according to the period you set.",
    ],
  },
  {
    id: "mises-a-jour",
    title: "Updates",
    summary:
      "Scheduled with you, applied on site or through an access that you open for the duration of the intervention.",
    points: [
      "No silent automatic updates: every update is announced, dated and documented.",
      "Operating system security updates follow your internal policy: who applies them, and when, is set with you at installation.",
      "The AI models do not change without a test on your real documents and your approval.",
    ],
  },
  {
    id: "fin-de-contrat",
    title: "End of contract",
    summary: "The machine and the data stay with you. The system keeps working.",
    points: [
      "The machine belongs to you from installation; the terms are set out in the quote.",
      "The code and the documentation are handed over to you, and another provider can take over maintenance.",
      "If you stop the system, the data stays on your machine, and you can erase it yourself.",
    ],
  },
  {
    id: "nlpd",
    title: "FADP and professional secrecy",
    summary:
      "Designed to comply with the Swiss Federal Act on Data Protection (FADP): the data does not leave your walls and is not passed on to any third party.",
    points: [
      "The Swiss Federal Act on Data Protection (FADP, revised in 2023), in force since 1 September 2023, governs the processing of personal data by Swiss companies. The system is designed to comply with it: processing on site, no disclosure to any third party, logging, security measures appropriate to the risk (Article 8 FADP). This is not a certification.",
      "Professional secrecy (Article 321 of the Swiss Criminal Code) applies in particular to lawyers, notaries, doctors and other health professions, as well as to auditors bound to secrecy under the Swiss Code of Obligations; fiduciaries are bound by their mandate and, often, by the rules of their association. Public administrations fall under official secrecy (Article 320). Processing that lets no document leave your walls is the basic condition for considering it. The final assessment rests with your legal adviser.",
      "The US CLOUD Act (2018) allows the United States authorities to demand the data that a provider subject to their law controls, wherever it is hosted. A document processed on your machine is under the control of no provider: the question does not arise.",
      "A record of processing activities and a data protection impact assessment can be documented with you if your activity requires it.",
    ],
    source: {
      label:
        "Federal Act on Data Protection (FADP, SR 235.1) and Swiss Criminal Code (SR 311.0, Articles 320 and 321), consolidated texts on fedlex.admin.ch, English translation for information only; Federal Data Protection and Information Commissioner (FDPIC)",
      url: "https://www.fedlex.admin.ch/eli/cc/2022/491/en",
    },
  },
  {
    id: "pentest",
    title: "Penetration test",
    summary:
      "No independent penetration test has been carried out yet; it will be documented here when it takes place.",
    points: [
      "No independent penetration test has been carried out on the system yet. When it is, its date, its provider and the fixes applied will be added to this dossier.",
      "The fixes resulting from a test are documented and delivered with the next version of the dossier.",
    ],
  },
];

export const SECURITE_DOSSIER: SecuriteContent["SECURITE_DOSSIER"] = {
  eyebrow: "Security dossier",
  title: "Download the security dossier (PDF)",
  text: "Four pages: summary for management, architecture and data flows, security measures, compliance and commitments. Enter your name, your company and your email: the dossier opens and is sent to you by email.",
  button: "Download the security dossier (PDF)",
  fields: { name: "Your name", company: "Company", email: "Email" },
  consent:
    "I agree that my data may be used to send me the dossier and answer my questions, in accordance with the privacy policy.",
  submit: "Receive the dossier",
  success: {
    title: "The dossier opens in a new tab.",
    text: "You will also receive it by email. If the window did not appear, use the link below.",
    textNoMail:
      "The email could not be sent. Keep the link below, or write to me at contact@lxstudio.ch to receive it directly.",
    link: "Open the security dossier (PDF)",
  },
  error:
    "The request could not be sent. Write to me at contact@lxstudio.ch and I will send you the dossier directly.",
};

/** Contractual commitments, page 4 of the PDF. */
export const SECURITE_ENGAGEMENTS: SecuriteContent["SECURITE_ENGAGEMENTS"] = [
  "No processed data leaves the client's network during processing.",
  "No remote access by LX Studio without the client's authorisation, which the client can cut off at any time; every intervention is dated and logged.",
  "The machine, the code and the documentation remain with the client at the end of the contract.",
  "Every update is announced, dated and documented.",
];
