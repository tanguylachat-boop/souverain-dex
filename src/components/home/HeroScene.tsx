import { useEffect, useRef } from "react";
import { HERO_SCENE } from "@/content/home";

/**
 * Motion design du premier écran, en SVG animé (SMIL), sans fichier vidéo :
 * des documents entrent par la gauche, filent vers le système au centre, y
 * sont absorbés, et une coche en ressort vers le haut à droite. Tout tourne
 * sur une période de onze secondes, une carte toutes les 2,2 secondes, chaque
 * carte visible 5,5 secondes : deux à trois cartes à l'écran, jamais empilées.
 *
 * Les animations démarrent avec le document, avant le script. Le script ne
 * sert qu'à les mettre en pause : hors écran, et avec mouvement réduit (la
 * scène est alors figée sur une image du milieu de la boucle).
 */

const PERIOD = 11;
const STEP = 2.2;
const ENTRY = "M -70 470 C 20 470, 120 330, 200 236";
const EXIT = "M 200 236 C 240 190, 320 160, 430 60";
const CARD_W = 112;
const CARD_H = 136;

export function HeroScene({ reduced }: { reduced: boolean }) {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    if (reduced) {
      el.setCurrentTime(9);
      el.pauseAnimations();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.unpauseAnimations();
        else el.pauseAnimations();
      },
      { threshold: 0 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      el.unpauseAnimations();
    };
  }, [reduced]);

  return (
    <svg
      ref={svg}
      className="hs"
      viewBox="0 0 400 560"
      preserveAspectRatio="xMidYMin meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="hs-glow">
          <stop offset="0" stopColor="var(--acc)" stopOpacity="0.26" />
          <stop offset="0.55" stopColor="var(--acc)" stopOpacity="0.07" />
          <stop offset="1" stopColor="var(--acc)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Les deux routes, en pointillé qui avance. */}
      <path className="hs-route" d={ENTRY}>
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-16"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      <path className="hs-route" d={EXIT}>
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-16"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>

      {/* Le système : halo, anneaux, noyau, impulsions. */}
      <g className="hs-core">
        <circle cx="200" cy="236" r="150" fill="url(#hs-glow)" />
        {[0, 1.5, 3].map((begin) => (
          <circle key={begin} className="hs-pulse" cx="200" cy="236" r="74">
            <animate
              attributeName="r"
              values="74;140"
              dur="4.5s"
              begin={`${begin}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="0.35;0"
              dur="4.5s"
              begin={`${begin}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <circle className="hs-ring-dash" cx="200" cy="236" r="92">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 236"
            to="360 200 236"
            dur="60s"
            repeatCount="indefinite"
          />
        </circle>
        <circle className="hs-ring" cx="200" cy="236" r="74" />
        <circle className="hs-ring-in" cx="200" cy="236" r="27" />
        <circle className="hs-nucleus" cx="200" cy="236" r="16">
          <animate attributeName="r" values="16;19;16" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Les documents : un groupe pour le trajet, un pour l'échelle et l'opacité. */}
      {HERO_SCENE.cards.map((label, i) => {
        const begin = `${(i * STEP).toFixed(1)}s`;
        const dur = `${PERIOD}s`;
        return (
          <g key={label}>
            <animateMotion
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
              path={ENTRY}
              calcMode="spline"
              keyPoints="0;1;1"
              keyTimes="0;0.5;1"
              keySplines="0.4 0 0.3 1;0 0 1 1"
            />
            <g className="hs-card" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;1;0;0"
                keyTimes="0;0.08;0.42;0.5;1"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
              <animateTransform
                attributeName="transform"
                type="scale"
                values="0.85;1;1;0.2;0.2"
                keyTimes="0;0.1;0.36;0.5;1"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
              <g transform={`translate(${-CARD_W / 2} ${-CARD_H / 2})`}>
                <rect
                  className="hs-card-ombre"
                  x="4"
                  y="7"
                  width={CARD_W}
                  height={CARD_H}
                  rx="10"
                />
                <rect className="hs-card-papier" width={CARD_W} height={CARD_H} rx="10" />
                <circle className="hs-card-pt" cx="16" cy="20" r="2.5" />
                <text className="hs-tag" x="24" y="23.5">
                  {label}
                </text>
                <rect className="hs-l" x="16" y="44" width="66" height="3" rx="1.5" />
                <rect className="hs-l" x="16" y="56" width="48" height="3" rx="1.5" />
                <rect className="hs-l" x="16" y="68" width="58" height="3" rx="1.5" />
                <rect className="hs-l hs-l-faible" x="16" y="80" width="40" height="3" rx="1.5" />
                <rect className="hs-total" x="16" y="104" width="80" height="16" rx="4" />
                <rect className="hs-l" x="22" y="110" width="26" height="4" rx="2" />
                <rect className="hs-montant" x="68" y="110" width="22" height="4" rx="2" />
              </g>
            </g>
          </g>
        );
      })}

      {/* Les coches : une par document, qui part quand le document est absorbé. */}
      {HERO_SCENE.cards.map((label, i) => {
        const begin = `${(i * STEP + PERIOD * 0.48).toFixed(2)}s`;
        const dur = `${PERIOD}s`;
        return (
          <g key={label}>
            <animateMotion
              dur={dur}
              begin={begin}
              repeatCount="indefinite"
              path={EXIT}
              calcMode="spline"
              keyPoints="0;1;1"
              keyTimes="0;0.3;1"
              keySplines="0.3 0 0.2 1;0 0 1 1"
            />
            <g className="hs-coche" opacity="0">
              <animate
                attributeName="opacity"
                values="0;1;1;0;0"
                keyTimes="0;0.04;0.23;0.3;1"
                dur={dur}
                begin={begin}
                repeatCount="indefinite"
              />
              <circle className="hs-coche-fond" r="12" />
              <path className="hs-coche-trait" d="M -5 0.5 L -1.5 4 L 5.5 -4" />
            </g>
          </g>
        );
      })}
    </svg>
  );
}
