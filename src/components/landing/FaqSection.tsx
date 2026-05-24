import { useState } from "react";
import { Reveal } from "@/hooks/use-scroll-reveal";

const FAQ_ITEMS = [
  {
    question: "Quel matériel est installé exactement ?",
    answer:
      "Un Mac mini M4 Pro avec 64 Go de RAM, installé physiquement dans votre cabinet. Il fait tourner les modèles d'IA en local — aucun serveur distant, aucun cloud. Vous le voyez, vous le contrôlez.",
  },
  {
    question: "Que se passe-t-il si le Mac mini tombe en panne ?",
    answer:
      "Des sauvegardes chiffrées automatiques sont effectuées chaque nuit. En cas de panne matérielle, nous intervenons sous 48 heures avec un appareil de remplacement. Vos données sont restaurées depuis la dernière sauvegarde — aucune perte.",
  },
  {
    question: "Comment accédez-vous à distance pour le support ?",
    answer:
      "Par défaut, aucun accès distant n'est configuré. Si vous souhaitez un support à distance, nous mettons en place un tunnel chiffré activable uniquement par vous, sur votre initiative. Rien ne sort sans votre accord explicite.",
  },
  {
    question: "Que se passe-t-il si je résilie ?",
    answer:
      "Vous êtes propriétaire de vos données. En cas de résiliation, nous exportons l'intégralité de vos fichiers classés, désinstallons le système et récupérons le matériel. Aucun engagement au-delà du préavis contractuel.",
  },
  {
    question: "Quel niveau de personnalisation par cabinet ?",
    answer:
      "Chaque installation est configurée selon votre plan de comptes, vos mandants, votre logiciel comptable (Bexio, Abacus, Crésus, WinBIZ) et vos règles de classement. Le système apprend de vos corrections et s'affine au fil du temps.",
  },
];

function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          padding: "1.5rem 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            color: isOpen ? "#ffffff" : "rgba(255,255,255,0.7)",
            transition: "color 0.3s",
            lineHeight: 1.5,
          }}
        >
          {question}
        </span>
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.1)",
            transition: "all 0.3s",
            transform: isOpen ? "rotate(45deg)" : "none",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isOpen ? "#4b7cc9" : "rgba(255,255,255,0.4)"}
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? "300px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s",
          opacity: isOpen ? 1 : 0,
        }}
      >
        <p
          style={{
            paddingBottom: "1.5rem",
            fontSize: "0.875rem",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.75,
            maxWidth: "44rem",
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      style={{
        position: "relative",
        padding: "8rem 0",
        background: "linear-gradient(180deg, #0a0a10 0%, #060608 50%, #0a0a10 100%)",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "48rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <Reveal>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#4b7cc9",
                marginBottom: "1.25rem",
              }}
            >
              Questions fréquentes
            </p>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 700,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
            >
              Tout ce qu'il faut savoir avant de{" "}
              <span style={{ color: "#4b7cc9" }}>passer le cap.</span>
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {FAQ_ITEMS.map((item, i) => (
              <FaqItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </Reveal>

        {/* CTA under FAQ */}
        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <p
              style={{
                fontSize: "0.875rem",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "1rem",
              }}
            >
              Une question qui n'est pas ici ?
            </p>
            <a
              href="mailto:contact@lxstudio.ch"
              style={{
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#4b7cc9",
                textDecoration: "none",
                transition: "opacity 0.3s",
              }}
            >
              contact@lxstudio.ch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
