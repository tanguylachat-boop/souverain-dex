import type { ReactNode, SyntheticEvent } from "react";

/**
 * Un bloc repliable, en `details` natif.
 *
 * Le navigateur gère l'ouverture, le clavier, l'état pour les lecteurs
 * d'écran et la recherche dans la page. Tout le contenu replié est dans le
 * HTML servi. Avec un `name`, les blocs qui le partagent forment un
 * accordéon : le navigateur ferme les autres, et le gestionnaire ci-dessous
 * fait la même chose pour ceux qui ne connaissent pas encore l'attribut.
 */
export function Disclosure({
  summary,
  children,
  name,
  open,
  className,
}: {
  summary: ReactNode;
  children: ReactNode;
  name?: string;
  open?: boolean;
  className?: string;
}) {
  const onToggle = (event: SyntheticEvent<HTMLDetailsElement>) => {
    const el = event.currentTarget;
    if (!name || !el.open) return;
    for (const other of document.querySelectorAll<HTMLDetailsElement>(`details[name="${name}"]`)) {
      if (other !== el && other.open) other.open = false;
    }
  };

  return (
    <details
      className={["disclosure", className].filter(Boolean).join(" ")}
      name={name}
      open={open}
      onToggle={onToggle}
    >
      <summary className="disclosure-summary">
        <span>{summary}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="disclosure-body">
        <div>{children}</div>
      </div>
    </details>
  );
}
