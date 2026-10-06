import { CONTACT, IMAGES } from "@/content/home";
import { Btn, Chars, Pastille } from "./text";

/** Parlons-en : section claire, puis le paysage qui fond vers le pied de page. */
export function Contact() {
  const img = IMAGES.paysage;
  return (
    <section id={CONTACT.id} className="sec cta" aria-labelledby="cta-title">
      <div className="wrap cta-inner" data-rv="true">
        <Pastille>{CONTACT.eyebrow}</Pastille>
        <h2 className="h2 cta-h2" id="cta-title">
          <Chars text={CONTACT.title} />
        </h2>
        <p className="lead center">{CONTACT.lede}</p>
        <div className="cta-btn">
          <Btn href={CONTACT.cta.href}>{CONTACT.cta.label}</Btn>
        </div>
      </div>
      <div className="pf-scene" aria-hidden="true">
        <img
          className="pf-plan"
          src={img.src}
          width={img.width}
          height={img.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <img
          className="pf-plan pf-avant"
          src={img.src}
          width={img.width}
          height={img.height}
          alt=""
          loading="lazy"
          decoding="async"
        />
        <div className="pf-haut" />
        <div className="pf-bas" />
      </div>
    </section>
  );
}
