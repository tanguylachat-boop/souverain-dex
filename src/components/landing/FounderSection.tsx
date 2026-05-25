import { Reveal } from "@/hooks/use-scroll-reveal";
import tanguyPhoto from "@/assets/tanguy.jpg";

export function FounderSection() {
  return (
    <section
      id="fondateur"
      style={{
        position: "relative",
        padding: "8rem 0",
        background: "linear-gradient(180deg, #0a0a10 0%, #070710 50%, #0a0a10 100%)",
        overflow: "hidden",
      }}
    >
      {/* Accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: "76rem",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <Reveal>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              maxWidth: "40rem",
              margin: "0 auto",
            }}
          >
            <p
              style={{
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase" as const,
                color: "#4b7cc9",
                marginBottom: "2rem",
              }}
            >
              Qui sommes-nous
            </p>

            {/* Photo */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                border: "2px solid rgba(75, 124, 201, 0.25)",
                overflow: "hidden",
                marginBottom: "1.75rem",
                boxShadow: "0 0 40px rgba(75, 124, 201, 0.1)",
              }}
            >
              <img
                src={tanguyPhoto}
                alt="Tanguy Lachat, fondateur de LX Studio"
                width={120}
                height={120}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 15%",
                }}
              />
            </div>

            <h3
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                color: "#ffffff",
                marginBottom: "0.25rem",
              }}
            >
              Tanguy Lachat
            </h3>
            <p
              style={{
                fontSize: "0.8125rem",
                color: "#4b7cc9",
                fontWeight: 500,
                marginBottom: "1.5rem",
              }}
            >
              Fondateur, LX Studio
            </p>

            <p
              style={{
                fontSize: "1.0625rem",
                color: "rgba(255,255,255,0.5)",
                lineHeight: 1.8,
                maxWidth: "36rem",
              }}
            >
              Builder IA basé à Genève. Je construis des systèmes d'automatisation
              pour les métiers réglementés — en commençant par les fiduciaires
              suisses, parce que c'est là où la rigueur et la confidentialité
              ne sont pas négociables.
            </p>

            <div
              style={{
                marginTop: "2rem",
                display: "flex",
                flexWrap: "wrap" as const,
                justifyContent: "center",
                gap: "1.5rem",
              }}
            >
              {[
                "Basé à Genève",
                "Expert IA & automatisation",
                "Intervention sur site en 48h",
              ].map((tag) => (
                <span
                  key={tag}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    fontSize: "0.75rem",
                    color: "rgba(255,255,255,0.35)",
                  }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "#4b7cc9",
                      boxShadow: "0 0 8px rgba(75,124,201,0.4)",
                    }}
                  />
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider quote */}
            <div
              style={{
                marginTop: "2.5rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                maxWidth: "30rem",
              }}
            >
              <p
                style={{
                  fontSize: "0.9375rem",
                  fontStyle: "italic",
                  color: "rgba(255,255,255,0.35)",
                  lineHeight: 1.7,
                }}
              >
                "Un fiduciaire ne devrait pas choisir entre automatisation et
                secret professionnel. C'est pour ça que tout reste dans vos murs."
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
