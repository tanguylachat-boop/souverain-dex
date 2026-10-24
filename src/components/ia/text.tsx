import type { CSSProperties, ElementType, ReactNode } from "react";

/** Variables CSS dans un attribut style, sans contorsion de typage. */
export function vars(v: Record<string, string | number>): CSSProperties {
  return v as CSSProperties;
}

const PLACEHOLDER = /(\[À [^\]]+\])/;

/**
 * Un texte du contenu, avec ses marqueurs « [À COMPLÉTER : ...] » rendus
 * visibles. Le brief l'exige : un trou se voit, il ne se devine pas.
 */
export function T({ children }: { children: string }) {
  const parts = children.split(PLACEHOLDER);
  if (parts.length === 1) return <>{children}</>;
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("[À ") ? (
          <mark key={i} className="ia-placeholder">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

/**
 * Un titre dont chaque mot monte depuis sa propre boîte, comme sur la page
 * de référence. `now` : l'animation part au premier rendu (premier écran),
 * sinon elle attend que le titre entre dans l'écran.
 */
export function Words({
  text,
  as: Tag = "h2",
  className = "",
  now = false,
  id,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  now?: boolean;
  id?: string;
}) {
  const words = text.split(" ");
  return (
    <Tag
      id={id}
      className={`${className} ia-words`.trim()}
      data-now={now ? "" : undefined}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i}>
          <span className="ia-w">
            <span className="ia-w-in" style={vars({ "--i": i })}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}

export function Eyebrow({ children, now = false }: { children: ReactNode; now?: boolean }) {
  return (
    <p className="ia-eyebrow" data-rv="" data-now={now ? "" : undefined}>
      <span className="ia-eyebrow-line" aria-hidden="true" />
      {children}
    </p>
  );
}

/** L'en-tête d'une section : surtitre, titre révélé mot à mot, chapeau. */
export function SectionHead({
  id,
  eyebrow,
  title,
  lede,
  aside,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lede?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="ia-head">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <Words as="h2" id={id} className="ia-title" text={title} />
        {lede ? (
          <p className="ia-lede" data-rv="">
            <T>{lede}</T>
          </p>
        ) : null}
      </div>
      {aside ? <div data-rv="">{aside}</div> : null}
    </div>
  );
}
