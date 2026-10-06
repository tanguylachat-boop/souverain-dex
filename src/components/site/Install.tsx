import { Link } from "@tanstack/react-router";
import { INSTALL, IMAGES } from "@/content/home";
import { Section, Eyebrow, H2, Lede } from "./ui";
import { Appear } from "./Appear";
import { Rail } from "./Rail";
import { Disclosure } from "./Disclosure";
import { ZoomPhoto } from "./ZoomPhoto";

/**
 * Écran 3 : ce qu'on installe.
 *
 * Quatre cartes avec photo, un titre, une phrase. Le reste (déclencheur, ce
 * qui se passe, ce que vous gardez en main) attend derrière « Voir le
 * détail » : présent dans la page, lisible sans script, mais pas imposé.
 */
export function Install() {
  const { labels } = INSTALL;

  return (
    <Section id={INSTALL.id} tone="deep" labelledBy="installe-title">
      <Appear>
        <div style={{ maxWidth: "46rem" }}>
          <Eyebrow>{INSTALL.eyebrow}</Eyebrow>
          <H2 id="installe-title" style={{ maxWidth: "20ch" }}>
            {INSTALL.title}
          </H2>
          <Lede size="lg">{INSTALL.lede}</Lede>
        </div>
      </Appear>

      <Appear delay={60}>
        <Rail label={INSTALL.railLabel} count={INSTALL.items.length}>
          {INSTALL.items.map((item) => (
            <article key={item.key} className="card install-card">
              <ZoomPhoto image={IMAGES[item.image]} ratio="2 / 1" />
              <div className="install-body">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-body">{item.summary}</p>
                <Disclosure summary={INSTALL.detailLabel} className="card-detail">
                  <dl className="card-rows">
                    <div>
                      <dt>{labels.trigger}</dt>
                      <dd>{item.trigger}</dd>
                    </div>
                    <div>
                      <dt>{labels.happens}</dt>
                      <dd>{item.happens}</dd>
                    </div>
                    <div>
                      <dt>{labels.keep}</dt>
                      <dd>{item.keep}</dd>
                    </div>
                  </dl>
                  {item.aside && (
                    <p className="card-aside">
                      {item.aside.text}{" "}
                      <Link to={item.aside.to} className="prose-link">
                        {item.aside.linkLabel}
                      </Link>
                    </p>
                  )}
                </Disclosure>
              </div>
            </article>
          ))}
        </Rail>
      </Appear>
    </Section>
  );
}
