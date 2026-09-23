/**
 * The hero visual: what the work actually looks like.
 *
 * A consulting studio has no product photography, and a stock photo of
 * someone at a laptop says nothing. So the visual is the process itself:
 * documents arrive on one lane, pass through the agent, and come out filed.
 *
 * One lane is the whole design decision. An earlier version spread the
 * documents across four heights and read as scattered debris rather than a
 * flow; a single track, entering left and leaving right, is legible in the
 * half-second a hero visual actually gets.
 *
 * Everything moves on `transform` and `opacity` only, so it stays on the
 * compositor and never triggers layout. The SVG is decorative and hidden
 * from assistive technology; `prefers-reduced-motion` freezes it into a
 * still diagram that still reads correctly.
 */

/** Four documents sharing one lane, offset by a quarter-cycle each. */
const LANE_Y = 96;
const CYCLE = 9.2;
const INCOMING = [0, 2.3, 4.6, 6.9] as const;

const FILED = [
  { y: 168, delay: 1.6 },
  { y: 218, delay: 3.9 },
  { y: 268, delay: 6.2 },
] as const;

export function AgentFlow() {
  return (
    <div
      className="agent-flow"
      role="img"
      aria-label="Schéma animé : des documents arrivent un par un, passent par l'agent, et ressortent classés."
    >
      <svg viewBox="0 0 460 330" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="af-core" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4b7cc9" />
            <stop offset="100%" stopColor="#e0904a" />
          </linearGradient>
          <linearGradient id="af-lane" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8ab0ee" stopOpacity="0" />
            <stop offset="45%" stopColor="#8ab0ee" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#e0904a" stopOpacity="0.15" />
          </linearGradient>
          {/* Documents fade at both ends of the lane, so they read as coming
              from and going somewhere beyond the frame. */}
          <linearGradient id="af-edges" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="14%" stopColor="#ffffff" />
            <stop offset="86%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="af-edge-mask">
            <rect width="460" height="330" fill="url(#af-edges)" />
          </mask>
        </defs>

        {/* The lane the documents ride. */}
        <path
          d={`M10 ${LANE_Y + 26} H450`}
          stroke="url(#af-lane)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />

        <g mask="url(#af-edge-mask)">
          {INCOMING.map((delay, i) => (
            <g key={i} className="af-doc" style={{ animationDelay: `${delay}s` }}>
              <g transform={`translate(0 ${LANE_Y})`}>
                <rect
                  width="92"
                  height="52"
                  rx="9"
                  fill="rgba(255,255,255,0.055)"
                  stroke="rgba(255,255,255,0.16)"
                />
                <rect x="14" y="15" width="50" height="4" rx="2" fill="rgba(255,255,255,0.32)" />
                <rect x="14" y="26" width="34" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
                <rect x="14" y="37" width="42" height="4" rx="2" fill="rgba(255,255,255,0.18)" />
              </g>
            </g>
          ))}
        </g>

        {/* The agent, centred on the lane. The ring breathes; the core does
            not, so the eye has something still to rest on. */}
        <g transform={`translate(196 ${LANE_Y - 6})`}>
          <circle
            className="af-ring"
            cx="32"
            cy="32"
            r="31"
            stroke="url(#af-core)"
            strokeWidth="1.25"
            fill="none"
          />
          <rect
            x="4"
            y="4"
            width="56"
            height="56"
            rx="17"
            fill="#0a0a10"
            stroke="rgba(138,176,238,0.5)"
          />
          <g className="af-spark" stroke="#8ab0ee" strokeWidth="1.8" strokeLinecap="round">
            <path d="M32 17v7M32 40v7M17 32h7M40 32h7" />
          </g>
          <circle cx="32" cy="32" r="5" fill="url(#af-core)" />
        </g>

        {/* Filed results, appearing in sequence below the lane.
            The animation and the placement must live on different elements:
            a CSS `transform` replaces an SVG `transform` attribute outright,
            so putting both on one group collapses every card onto the
            origin. Outer group animates, inner group positions. */}
        {FILED.map((row) => (
          <g
            key={row.y}
            className="af-filed"
            style={{ animationDelay: `${row.delay}s` }}
          >
            <g transform={`translate(150 ${row.y})`}>
            <rect
              width="160"
              height="40"
              rx="11"
              fill="rgba(224,144,74,0.09)"
              stroke="rgba(224,144,74,0.32)"
            />
            <path
              d="M16 20l5 5 9-10"
              stroke="#f0b47a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <rect x="42" y="13" width="72" height="4" rx="2" fill="rgba(255,255,255,0.42)" />
            <rect x="42" y="23" width="44" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}

export const AGENT_FLOW_CYCLE = CYCLE;
