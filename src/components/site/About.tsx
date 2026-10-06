import { ABOUT, IMAGES } from "@/content/home";
import { Section, Eyebrow, H2, Lede, TrustLine } from "./ui";
import { Appear } from "./Appear";

/**
 * Qui s'en occupe : une photo réelle, un paragraphe, trois faits.
 *
 * Court à dessein. Le lecteur a déjà vu trois clients et quatre exemples ;
 * ici il veut savoir à qui il va parler, et vérifier que c'est une personne.
 */
export function About() {
  const image = IMAGES.tanguy;

  return (
    <Section id={ABOUT.id} tone="base" labelledBy="a-propos-title">
      <Appear>
        <div className="about">
          <img
            className="about-photo"
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
          <div>
            <Eyebrow>{ABOUT.eyebrow}</Eyebrow>
            <H2 id="a-propos-title" style={{ maxWidth: "20ch" }}>
              {ABOUT.title}
            </H2>
            <Lede size="lg">{ABOUT.body}</Lede>
            <p className="about-credential">{ABOUT.credential}</p>
            <div style={{ marginTop: "1.5rem" }}>
              <TrustLine items={[...ABOUT.trust]} size="lg" />
            </div>
          </div>
        </div>
      </Appear>
    </Section>
  );
}
