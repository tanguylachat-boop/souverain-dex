import type { CSSProperties, ReactNode } from "react";

/**
 * Texte révélé lettre par lettre.
 *
 * Chaque mot est un bloc insécable, chaque lettre un `span.c` numéroté. Le
 * numéro donne le retard de transition (20 ms par lettre) ; l'apparition
 * elle-même est déclenchée par la classe `in` posée sur l'ancêtre `[data-rv]`
 * (voir effects.ts). Le texte brut reste lisible par les moteurs : les spans
 * ne cassent pas les mots, et les espaces sont de vrais espaces.
 */
export function Chars({ text, start = 0 }: { text: string; start?: number }) {
  const words = text.split(" ");
  let i = start;
  return (
    <>
      {words.map((word, w) => {
        const letters = Array.from(word);
        const node = (
          <span className="w" key={`w${w}`}>
            {letters.map((ch, k) => (
              <span className="c" key={k} style={{ "--i": i++ } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
        );
        return w < words.length - 1 ? (
          <span key={`g${w}`}>
            {node}
            <span className="wsp"> </span>
          </span>
        ) : (
          node
        );
      })}
    </>
  );
}

/** Petite étiquette en capitales au-dessus d'un titre. */
export function Pastille({ children }: { children: ReactNode }) {
  return <span className="pastille">{children}</span>;
}

/** En-tête de section : pastille, titre révélé, intro. */
export function Head({
  eyebrow,
  title,
  lede,
  center = true,
  id,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  center?: boolean;
  id?: string;
  as?: "h2" | "p";
}) {
  return (
    <div className={`wrap head${center ? " center" : ""}`} data-rv="true">
      <Pastille>{eyebrow}</Pastille>
      <Tag className={`h2${center ? "" : " left"}`} id={id}>
        <Chars text={title} />
      </Tag>
      {lede ? <p className={`lead${center ? " center" : ""}`}>{lede}</p> : null}
    </div>
  );
}

const ARROW = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

/** Bouton ou lien, dans le style de la page d'accueil. */
export function Btn({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className={`b-${variant}${className ? ` ${className}` : ""}`}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{children}</span>
      {arrow ? ARROW : null}
    </a>
  );
}

export const CHECK = (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);
