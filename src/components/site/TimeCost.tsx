import { TIME_COST, IMAGES } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";

/**
 * Ce qui coûte du temps aujourd'hui : cinq situations, une par une.
 *
 * Une liste numérotée plutôt que des cartes : le lecteur doit se reconnaître
 * dans une situation, pas comparer des offres. La photo du bureau le soir
 * illustre la section entière, à côté du titre, et reste en place sur grand
 * écran pendant que la liste défile.
 */
export function TimeCost() {
  const image = IMAGES.bureau;

  return (
    <Section id={TIME_COST.id} tone="base" labelledBy="temps-title">
      <div className="timecost">
        <div className="timecost-side">
          <Appear>
            <Eyebrow>{TIME_COST.eyebrow}</Eyebrow>
            <H2 id="temps-title" style={{ maxWidth: "16ch" }}>
              {TIME_COST.title}
            </H2>
            <Lede size="lg">{TIME_COST.lede}</Lede>
          </Appear>
          <Appear delay={60}>
            <figure className="timecost-figure">
              <img
                src={image.src}
                width={image.width}
                height={image.height}
                alt={image.alt}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Appear>
        </div>

        <ol className="timecost-list">
          {TIME_COST.items.map((item, i) => (
            <Appear as="li" key={item.title} delay={i * 60} className="timecost-item">
              <span className="timecost-num" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="timecost-title">{item.title}</h3>
                <p className="timecost-body">{item.body}</p>
              </div>
            </Appear>
          ))}
        </ol>
      </div>
    </Section>
  );
}
