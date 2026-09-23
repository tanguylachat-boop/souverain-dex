/**
 * The trust bar: client names drifting past, under the hero.
 *
 * Wordmarks rather than logos, set in one typeface at one size. The clients
 * here are small Swiss businesses whose marks range from a colour wordmark to
 * a square app icon; lining those up produces a ransom note. A uniform row
 * reads as a considered choice, and stays honest, since every name is real.
 *
 * The track is rendered twice and shifted by exactly half its width, which is
 * what makes the loop seamless. The copy is hidden from assistive technology
 * so a screen reader hears each client once.
 */

const CLIENTS = [
  "Coca-Cola",
  "Migros",
  "Oasis Drink Distribution",
  "Richoz Sanitaire",
  "Taxi Elsa",
  "Taxi d'Andrea",
] as const;

function Track({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <ul className="marquee-track" aria-hidden={ariaHidden || undefined}>
      {CLIENTS.map((name) => (
        <li key={name} className="marquee-item">
          {name}
        </li>
      ))}
    </ul>
  );
}

export function LogoMarquee() {
  return (
    <section
      aria-label="Entreprises accompagnées"
      style={{
        position: "relative",
        paddingBlock: "2.75rem",
        background: "var(--surface-1)",
        borderBlock: "1px solid var(--border-subtle)",
        overflow: "hidden",
      }}
    >
      <p
        className="container-page"
        style={{
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--text-faint)",
          marginBottom: "1.5rem",
        }}
      >
        Ils travaillent avec des outils que j'ai construits
      </p>

      <div className="marquee">
        <Track />
        <Track ariaHidden />
      </div>
    </section>
  );
}
