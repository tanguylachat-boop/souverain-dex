import { Section, Eyebrow, H2, Lede, Body } from "./ui";
import richoz from "@/assets/clients/richoz-sanitaire.png";
import oasis from "@/assets/clients/oasis-drink.png";

/**
 * Clients, with what was actually delivered to each.
 *
 * Two logos on their own would read as a thin wall of marks. Naming the work
 * next to each one is both more credible and checkable: a visitor can ask the
 * client whether it is true, which is the only reason a logo carries weight.
 *
 * Logos sit on a light tile because they were drawn for light backgrounds.
 * Recolouring or knocking them out to fit a dark page would misuse marks that
 * belong to someone else.
 */

const CLIENTS = [
  {
    logo: oasis,
    /** Written out so a screen reader announces the company, not a file. */
    alt: "Logo d'Oasis Drink Distribution Sàrl",
    name: "Oasis Drink Distribution Sàrl",
    place: "Genève",
    work: "Plateforme de gestion des commandes, des livraisons et de la facturation. Espace client, tableau de bord administrateur, accès comptable et application pour les livreurs sur le terrain. Factures avec QR-facture suisse.",
    width: 256,
    height: 256,
  },
  {
    logo: richoz,
    alt: "Logo de Richoz Sanitaire",
    name: "Richoz Sanitaire",
    place: "Suisse romande",
    work: "Automatisation des rapports d'intervention, du planning des techniciens et des bulletins de livraison. Les documents se remplissent et se classent seuls à partir de ce que les techniciens saisissent sur place.",
    width: 320,
    height: 312,
  },
] as const;

export function Clients() {
  return (
    <Section id="clients" tone="base" labelledBy="clients-title">
      <div style={{ maxWidth: "44rem" }}>
        <Eyebrow>Ils m'ont fait confiance</Eyebrow>
        <H2 id="clients-title">Deux entreprises suisses, deux systèmes en service.</H2>
        <Lede>
          Ce n'est pas un mur de logos. Chaque nom est accompagné de ce qui a
          été livré, pour que vous puissiez leur poser la question.
        </Lede>
      </div>

      <div
        style={{
          marginTop: "3.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {CLIENTS.map((client, i) => (
          <div
            key={client.name}
            data-reveal="up"
            style={{ transitionDelay: `${i * 0.08}s` }}
          >
            <article
              className="card"
              style={{
                height: "100%",
                padding: "1.75rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  alignSelf: "flex-start",
                  display: "grid",
                  placeItems: "center",
                  width: 104,
                  height: 104,
                  padding: "0.875rem",
                  borderRadius: 18,
                  background: "#ffffff",
                  border: "1px solid var(--border-subtle)",
                }}
              >
                {/* The box is fixed and object-fit does the letterboxing, so
                    the tile holds its size before the file arrives. Sizing to
                    the image's own dimensions would collapse it to nothing
                    until load and shift everything below it. */}
                <img
                  src={client.logo}
                  alt={client.alt}
                  width={client.width}
                  height={client.height}
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                  }}
                >
                  {client.name}
                </h3>
                <p
                  style={{
                    marginTop: "0.25rem",
                    fontSize: "0.8125rem",
                    color: "var(--accent-text)",
                  }}
                >
                  {client.place}
                </p>
                <Body style={{ marginTop: "0.875rem" }}>{client.work}</Body>
              </div>
            </article>
          </div>
        ))}
      </div>
    </Section>
  );
}
