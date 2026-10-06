import { Link } from "@tanstack/react-router";
import { EXAMPLES, IMAGES } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";

/**
 * Quatre tâches qu'on automatise le plus souvent dans une PME.
 *
 * Chaque carte dit ce qui déclenche, ce qui se passe, et ce que la personne
 * continue de décider, parce que ce dernier point est celui que chaque patron
 * demande et celui que la plupart des vendeurs oublient. Deux cartes portent
 * une photo, les deux autres non : c'est voulu, une grille de quatre photos
 * identiques se lit comme une brochure.
 */
export function Examples() {
  const { labels } = EXAMPLES;

  return (
    <Section id={EXAMPLES.id} tone="base" labelledBy="exemples-title">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{EXAMPLES.eyebrow}</Eyebrow>
          <H2 id="exemples-title" style={{ maxWidth: "22ch" }}>
            {EXAMPLES.title}
          </H2>
          <Lede size="lg">{EXAMPLES.lede}</Lede>
        </div>
      </Appear>

      <div className="examples-grid">
        {EXAMPLES.items.map((example, i) => {
          const image = example.image ? IMAGES[example.image] : undefined;
          const rows = [
            [labels.trigger, example.trigger],
            [labels.happens, example.happens],
            [labels.keep, example.keep],
          ] as const;

          return (
            <Appear
              as="article"
              key={example.key}
              delay={(i % 2) * 60}
              className="card example-card"
            >
              {image && (
                <img
                  className="example-photo"
                  src={image.src}
                  width={image.width}
                  height={image.height}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div className="example-body">
                <h3 className="example-title">{example.title}</h3>
                <dl className="example-rows">
                  {rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
                {example.aside && (
                  <p className="example-aside">
                    {example.aside.text}{" "}
                    <Link to={example.aside.to} className="prose-link">
                      {example.aside.linkLabel}
                    </Link>
                  </p>
                )}
              </div>
            </Appear>
          );
        })}
      </div>
    </Section>
  );
}
