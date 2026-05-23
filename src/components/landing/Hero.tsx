import { useEffect, useState } from "react";

export function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(180deg, #030305 0%, #070710 40%, #0a0a14 100%)",
        overflow: "hidden",
      }}
    >
      {/* Gradient orb — top right */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-5%",
          width: "50vw",
          height: "50vw",
          maxWidth: "800px",
          maxHeight: "800px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(75, 124, 201, 0.07), transparent 70%)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />

      {/* Gradient orb — bottom left */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: "40vw",
          height: "40vw",
          maxWidth: "600px",
          maxHeight: "600px",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(75, 124, 201, 0.05), transparent 70%)",
          filter: "blur(100px)",
          pointerEvents: "none",
        }}
      />

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Horizontal accent line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(75, 124, 201, 0.2), transparent)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "76rem",
          margin: "0 auto",
          padding: "8rem 1.5rem 6rem",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.15s",
          }}
        >
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(8px)",
              padding: "0.375rem 1rem",
              fontSize: "0.6875rem",
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            <span
              style={{
                position: "relative",
                display: "inline-flex",
              }}
            >
              <span
                className="animate-pulse-ring"
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "rgba(75, 124, 201, 0.4)",
                }}
              />
              <span
                style={{
                  position: "relative",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4b7cc9",
                }}
              />
            </span>
            Pour les fiduciaires suisses
          </span>
        </div>

        {/* Massive headline */}
        <h1
          style={{
            marginTop: "2.5rem",
            fontSize: "clamp(2.75rem, 7.5vw, 7.5rem)",
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#ffffff",
            maxWidth: "18ch",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(50px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          L'IA qui scanne,
          <br />
          classe et{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #93bbf5 30%, #4b7cc9 60%, #2d5fa3 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            automatise
          </span>
          <br />
          vos documents.
        </h1>

        {/* Subtitle */}
        <p
          style={{
            marginTop: "2rem",
            fontSize: "clamp(1rem, 1.5vw, 1.375rem)",
            color: "rgba(255,255,255,0.4)",
            lineHeight: 1.75,
            maxWidth: "32rem",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(30px)",
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.5s",
          }}
        >
          Sans jamais quitter votre cabinet.
          <br />
          Conçu pour le secret professionnel suisse.
        </p>

        {/* CTAs */}
        <div
          style={{
            marginTop: "2.5rem",
            display: "flex",
            flexWrap: "wrap" as const,
            gap: "1rem",
            alignItems: "center",
            opacity: loaded ? 1 : 0,
            transform: loaded ? "none" : "translateY(20px)",
            transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.65s",
          }}
        >
          <a
            href="#demo"
            className="group"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.9375rem 2rem",
              borderRadius: "0.375rem",
              background: "#ffffff",
              color: "#050507",
              fontSize: "0.875rem",
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s",
            }}
          >
            Demander une démo
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              style={{ marginLeft: "0.5rem" }}
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#solution"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
          >
            Comment ça marche
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        {/* Trust badges */}
        <div
          style={{
            marginTop: "3.5rem",
            display: "flex",
            flexWrap: "wrap" as const,
            gap: "2rem",
            opacity: loaded ? 1 : 0,
            transition: "opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.85s",
          }}
        >
          {["Conforme nLPD", "Hébergé dans votre cabinet", "Sans cloud externe"].map(
            (t) => (
              <span
                key={t}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.3)",
                  letterSpacing: "0.02em",
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
                {t}
              </span>
            ),
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hidden md:flex"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: "0.5rem",
          opacity: loaded ? 0.35 : 0,
          transition: "opacity 1.2s ease 1.4s",
        }}
      >
        <span
          style={{
            fontSize: "0.5625rem",
            textTransform: "uppercase" as const,
            letterSpacing: "0.25em",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: 18,
            height: 28,
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.12)",
            display: "flex",
            justifyContent: "center",
            paddingTop: 5,
          }}
        >
          <div
            className="animate-bounce"
            style={{
              width: 3,
              height: 7,
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.25)",
            }}
          />
        </div>
      </div>

      {/* Bottom gradient transition to next section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "20vh",
          background: "linear-gradient(to top, #0a0a10, transparent)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}
