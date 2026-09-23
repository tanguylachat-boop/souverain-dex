import { Section, Eyebrow, H2, Lede, Body } from "./ui";
import { Reveal } from "./Reveal";
import { BrowserFrame } from "./BrowserFrame";
import richozLogo from "@/assets/clients/richoz-sanitaire.png";
import oasisLogo from "@/assets/clients/oasis-drink.png";
import taxiElsaShot from "@/assets/work/taxi-elsa.webp";
import taxiDandreaShot from "@/assets/work/taxi-dandrea.webp";

/**
 * Delivered work.
 *
 * Two kinds of reference sit here, and they are shown differently on purpose.
 * A public site can be screenshotted and opened, so it is; a private business
 * application cannot be shown without exposing a client's data, so it gets its
 * logo and a description instead. Presenting a login screen as a portfolio
 * piece would prove nothing.
 *
 * Each entry names the client, which is what makes it checkable. Logos are
 * used as their owners drew them, on a light tile, never recoloured.
 */

type Item = {
  client: string;
  place: string;
  work: string;
  /** Shown as proof when the result is a public page. */
  shot?: string;
  url?: string;
  href?: string;
  /** Used when the result is a private application. */
  logo?: string;
  logoAlt?: string;
};

const ITEMS: ReadonlyArray<Item> = [
  {
    client: "Taxi Elsa",
    place: "Canton du Jura",
    work: "Site de réservation pour une entreprise de taxi. Réservation par WhatsApp en un geste, tarifs annoncés à l'avance, pages par ville pour être trouvé sur les recherches locales.",
    shot: taxiElsaShot,
    url: "taxi-elsa.ch",
    href: "https://taxi-elsa.ch",
  },
  {
    client: "Taxi d'Andrea",
    place: "Delémont",
    work: "Site pour un chauffeur indépendant, construit autour d'une seule action : appeler. Transferts aéroport, transport médical et scolaire, chaque prestation ayant sa page.",
    shot: taxiDandreaShot,
    // The .ch domain does not resolve yet, so the frame shows the address the
    // link actually opens. Writing a nicer URL than the one behind the link
    // would be a small lie in the one place meant to prove honesty.
    url: "taxi-dandrea.vercel.app",
    href: "https://taxi-dandrea.vercel.app",
  },
  {
    client: "Oasis Drink Distribution Sàrl",
    place: "Genève",
    work: "Plateforme de gestion des commandes, des livraisons et de la facturation. Espace client, tableau de bord administrateur, accès comptable et application pour les livreurs sur le terrain. Factures avec QR-facture suisse.",
    logo: oasisLogo,
    logoAlt: "Logo d'Oasis Drink Distribution Sàrl",
  },
  {
    client: "Richoz Sanitaire",
    place: "Suisse romande",
    work: "Automatisation des rapports d'intervention, du planning des techniciens et des bulletins de livraison. Les documents se remplissent et se classent seuls à partir de ce que les techniciens saisissent sur place.",
    logo: richozLogo,
    logoAlt: "Logo de Richoz Sanitaire",
  },
];

function LogoTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        height: 168,
        borderRadius: 14,
        border: "1px solid var(--border-subtle)",
        background: "var(--surface-2)",
      }}
    >
      <div
        style={{
          display: "grid",
          placeItems: "center",
          width: 104,
          height: 104,
          padding: "0.875rem",
          borderRadius: 18,
          background: "#ffffff",
        }}
      >
        <img
          src={src}
          alt={alt}
          width={256}
          height={256}
          loading="lazy"
          decoding="async"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
    </div>
  );
}

export function Work() {
  return (
    <Section id="realisations" tone="base" labelledBy="realisations-title">
      <div style={{ maxWidth: "46rem" }}>
        <Eyebrow>Réalisations</Eyebrow>
        <H2 id="realisations-title" style={{ maxWidth: "22ch" }}>
          Quatre entreprises suisses, et ce qui tourne chez chacune.
        </H2>
        <Lede>
          Ce n'est pas un mur de logos. Chaque nom porte ce qui a été livré, et
          les sites publics sont ouvrables : vous pouvez aller voir, et poser la
          question au client.
        </Lede>
      </div>

      <div
        style={{
          marginTop: "3.5rem",
          display: "grid",
          // Two columns, so four entries form a clean block rather than a row
          // of three and a lone fourth. Wider cards also make the screenshots
          // legible instead of decorative.
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 430px), 1fr))",
          gap: "1.75rem",
        }}
      >
        {ITEMS.map((item, i) => (
          <Reveal key={item.client} delay={(i % 2) * 0.08} as="article">
            <div
              className="card lift"
              style={{
                height: "100%",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              {item.shot && item.url ? (
                <BrowserFrame
                  src={item.shot}
                  alt={`Page d'accueil du site ${item.client}, réalisé par LX Studio`}
                  url={item.url}
                  width={1200}
                  height={750}
                />
              ) : (
                <LogoTile src={item.logo!} alt={item.logoAlt!} />
              )}

              <div style={{ padding: "0 0.5rem 0.5rem" }}>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {item.client}
                </h3>
                <p
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.8125rem",
                    color: "var(--accent-text)",
                  }}
                >
                  {item.place}
                </p>
                <Body style={{ marginTop: "0.875rem" }}>{item.work}</Body>

                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: "1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4375rem",
                      minHeight: 44,
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      textDecoration: "none",
                    }}
                  >
                    Ouvrir le site
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                ) : (
                  <p
                    style={{
                      marginTop: "1rem",
                      display: "inline-flex",
                      alignItems: "center",
                      minHeight: 44,
                      fontSize: "0.8125rem",
                      color: "var(--text-faint)",
                    }}
                  >
                    Application interne, non publique
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
