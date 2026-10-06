import { CLOSING, IMAGES } from "@/content/home";
import { Section, Action } from "./ui";
import { Appear } from "./Appear";

/**
 * Écran 7 : réserver.
 *
 * La photo de la personne qu'on va appeler, une phrase, un bouton. Le
 * « À propos » tient en une ligne : à ce stade le lecteur veut savoir à qui
 * il parle, pas lire une biographie.
 */
export function Closing() {
  const image = IMAGES.tanguy;

  return (
    <Section id={CLOSING.id} tone="deep" labelledBy="reserver-title">
      <Appear>
        <div className="closing">
          <img
            className="closing-photo"
            src={image.src}
            width={image.width}
            height={image.height}
            alt={image.alt}
            loading="lazy"
            decoding="async"
          />
          <div>
            <h2 id="reserver-title" className="closing-title">
              {CLOSING.title}
            </h2>
            <p className="closing-body">{CLOSING.body}</p>
            <p className="closing-person">
              {CLOSING.person} <span>{CLOSING.credential}.</span>
            </p>
            <div className="closing-actions">
              <Action variant="primary" arrow href={CLOSING.primary.href}>
                {CLOSING.primary.label}
              </Action>
              <Action variant="secondary" href={CLOSING.secondary.href}>
                {CLOSING.secondary.label}
              </Action>
            </div>
          </div>
        </div>
      </Appear>
    </Section>
  );
}
