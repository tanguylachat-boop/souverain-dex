import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { SECURITE_DOSSIER } from "@/content/ia/securite";
import { IconDownload, IconPlus } from "./icons";
import { SectionHead, T } from "./text";

/**
 * Questions fréquentes : une seule ouverte à la fois, la hauteur animée par
 * une grille (0fr vers 1fr). Les réponses marquées `dossier` renvoient au
 * dossier sécurité, sur la page si elle l'héberge, sinon sur /securite.
 */
export function Faq({
  id = "faq",
  eyebrow,
  title,
  entries,
  dossierOnPage = false,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  entries: ReadonlyArray<{ q: string; a: string; dossier?: boolean }>;
  dossierOnPage?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="ia-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="ia-container">
        <SectionHead id={`${id}-title`} eyebrow={eyebrow} title={title} />
        <div className="ia-faq">
          {entries.map((entry, i) => {
            const isOpen = open === i;
            return (
              <div key={entry.q} className="ia-faq-item" data-open={isOpen} data-rv="">
                <h3 style={{ margin: 0, fontSize: "inherit", fontWeight: "inherit" }}>
                  <button
                    type="button"
                    className="ia-faq-q"
                    id={`${id}-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {entry.q}
                    <i aria-hidden="true">
                      <IconPlus size={14} />
                    </i>
                  </button>
                </h3>
                <div
                  className="ia-faq-a"
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                >
                  <div>
                    <p>
                      <T>{entry.a}</T>
                      {entry.dossier ? (
                        <>
                          {" "}
                          {dossierOnPage ? (
                            <a href="#dossier">
                              <IconDownload size={13} /> {SECURITE_DOSSIER.button}
                            </a>
                          ) : (
                            <Link to="/securite" hash="dossier">
                              <IconDownload size={13} /> {SECURITE_DOSSIER.button}
                            </Link>
                          )}
                        </>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
