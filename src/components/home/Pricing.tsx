import { PRICING } from "@/content/home";
import { Btn, CHECK, Head } from "./text";

/** Deux cartes en perspective ; aucun montant, un devis par offre. */
export function Pricing() {
  return (
    <section id={PRICING.id} className="sec tarifs" data-ink="true" aria-labelledby="pricing-title">
      <Head
        eyebrow={PRICING.eyebrow}
        title={PRICING.title}
        lede={PRICING.lede}
        id="pricing-title"
      />
      <div className="wrap pr-grid" data-rv="true">
        {PRICING.cards.map((card) => (
          <article key={card.label} className={`pr-card${card.featured ? " feat" : ""}`}>
            <p className="pr-label mono">{card.label}</p>
            <p className="pr-price">
              {card.price}
              {card.priceNote ? <span className="pr-ht">{card.priceNote}</span> : null}
            </p>
            <p className="pr-body">{card.body}</p>
            <ul className="pr-list">
              {card.items.map((item) => (
                <li key={item}>
                  <span className="pr-ck" aria-hidden="true">
                    {CHECK}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="pr-cta">
              <Btn href={card.cta.href} variant={card.featured ? "primary" : "secondary"}>
                {card.cta.label}
              </Btn>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
