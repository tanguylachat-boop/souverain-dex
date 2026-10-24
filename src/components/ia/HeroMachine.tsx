/**
 * Le visuel du premier écran, en code tant que la photo manque : une machine
 * en verre posée sur un plan, la marque LX sur sa face, un câble réseau
 * débranché qui traîne à côté, et des documents qui entrent dans la machine.
 * Remplaçable par une photo dans Hero.tsx sans toucher au reste.
 */
export function HeroMachine() {
  return (
    <svg viewBox="0 0 640 520" role="img" aria-labelledby="hm-title" className="hm">
      <title id="hm-title">
        Une machine dans un bureau, câble réseau débranché : l'IA tourne sur place
      </title>
      <defs>
        <linearGradient id="hm-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#15317a" stopOpacity="0.92" />
          <stop offset="0.55" stopColor="#0a1a4e" stopOpacity="0.96" />
          <stop offset="1" stopColor="#050a24" />
        </linearGradient>
        <linearGradient id="hm-glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9cc8ff" stopOpacity="0.34" />
          <stop offset="0.35" stopColor="#9cc8ff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#9cc8ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hm-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9cc8ff" stopOpacity="0.75" />
          <stop offset="0.5" stopColor="#5b8dff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#9cc8ff" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="hm-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#1f5fd0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#1f5fd0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hm-led" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#dff1ff" />
          <stop offset="0.4" stopColor="#9cc8ff" />
          <stop offset="1" stopColor="#9cc8ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hm-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b8dff" />
          <stop offset="1" stopColor="#1f5fd0" />
        </linearGradient>
        <clipPath id="hm-clip">
          <rect x="214" y="118" width="252" height="312" rx="30" />
        </clipPath>
      </defs>

      {/* Le plan de travail et la lueur au sol. */}
      <ellipse cx="340" cy="452" rx="250" ry="40" fill="url(#hm-floor)" />
      <ellipse cx="340" cy="446" rx="150" ry="16" fill="#000" fillOpacity="0.45" />
      <path d="M60 452 H620" stroke="#9cc8ff" strokeOpacity="0.18" strokeWidth="1" />

      {/* Les documents qui entrent, l'un après l'autre. */}
      <g className="hm-docs" fill="none" stroke="#9cc8ff" strokeOpacity="0.55" strokeWidth="1.4">
        <g className="hm-doc hm-doc-1">
          <rect x="60" y="188" width="64" height="80" rx="8" fill="#0c1e5c" fillOpacity="0.55" />
          <path d="M72 206h40M72 220h40M72 234h28" strokeLinecap="round" />
        </g>
        <g className="hm-doc hm-doc-2">
          <rect x="60" y="188" width="64" height="80" rx="8" fill="#0c1e5c" fillOpacity="0.55" />
          <path d="M72 206h40M72 220h26M72 234h40" strokeLinecap="round" />
        </g>
        <g className="hm-doc hm-doc-3">
          <rect x="60" y="188" width="64" height="80" rx="8" fill="#0c1e5c" fillOpacity="0.55" />
          <path d="M72 206h30M72 220h40M72 234h36" strokeLinecap="round" />
        </g>
      </g>

      {/* La fente d'entrée. */}
      <rect
        x="206"
        y="216"
        width="10"
        height="26"
        rx="3"
        fill="#050a24"
        stroke="#9cc8ff"
        strokeOpacity="0.5"
      />

      {/* Le corps en verre. */}
      <g>
        <rect x="214" y="118" width="252" height="312" rx="30" fill="url(#hm-body)" />
        <rect x="214" y="118" width="252" height="312" rx="30" fill="url(#hm-glass)" />
        <rect
          x="214.75"
          y="118.75"
          width="250.5"
          height="310.5"
          rx="29.5"
          fill="none"
          stroke="url(#hm-edge)"
          strokeWidth="1.5"
        />
        <path
          d="M244 134 H436"
          stroke="#ffffff"
          strokeOpacity="0.32"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M230 160 V380"
          stroke="#ffffff"
          strokeOpacity="0.1"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* L'intérieur : l'anneau de calcul et les grilles. */}
      <g clipPath="url(#hm-clip)">
        <g className="hm-ring" fill="none" strokeLinecap="round">
          <circle cx="340" cy="236" r="52" stroke="#9cc8ff" strokeOpacity="0.14" strokeWidth="10" />
          <circle
            cx="340"
            cy="236"
            r="52"
            stroke="#9cc8ff"
            strokeOpacity="0.85"
            strokeWidth="3"
            strokeDasharray="90 237"
            className="hm-ring-arc"
          />
          <circle
            cx="340"
            cy="236"
            r="34"
            stroke="#5b8dff"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeDasharray="4 7"
            className="hm-ring-dots"
          />
        </g>
        <g stroke="#9cc8ff" strokeOpacity="0.16" strokeWidth="1.5" strokeLinecap="round">
          <path d="M248 322h184M248 338h184M248 354h184M248 370h184M248 386h184" />
        </g>
      </g>

      {/* La marque et le voyant. */}
      <g>
        <rect x="286" y="152" width="22" height="22" rx="6" fill="url(#hm-mark)" />
        <text
          x="318"
          y="170"
          fill="#f6f9ff"
          fontSize="18"
          fontWeight="800"
          letterSpacing="-0.03em"
          fontFamily="inherit"
        >
          LX Studio
        </text>
        <circle cx="440" cy="163" r="12" fill="url(#hm-led)" className="hm-led" />
        <circle cx="440" cy="163" r="3.2" fill="#f6f9ff" />
      </g>

      {/* La prise réseau vide, et le câble qui traîne, débranché. */}
      <g>
        <rect
          x="396"
          y="400"
          width="30"
          height="20"
          rx="4"
          fill="#050a24"
          stroke="#9cc8ff"
          strokeOpacity="0.55"
          strokeWidth="1.5"
        />
        <path
          d="M403 400v-5h16v5"
          fill="none"
          stroke="#9cc8ff"
          strokeOpacity="0.4"
          strokeWidth="1.2"
        />
        <path
          d="M548 468 C 580 452, 596 420, 572 404 C 548 388, 500 396, 470 414 C 440 432, 436 452, 456 462"
          fill="none"
          stroke="#9cc8ff"
          strokeOpacity="0.7"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <g transform="translate(548 468) rotate(-38)">
          <rect
            x="-16"
            y="-9"
            width="34"
            height="18"
            rx="3"
            fill="#0c1e5c"
            stroke="#9cc8ff"
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />
          <path
            d="M18 -4 h8 v8 h-8"
            fill="none"
            stroke="#9cc8ff"
            strokeOpacity="0.8"
            strokeWidth="1.5"
          />
          <path
            d="M-10 -9 v-5 h22 v5"
            fill="none"
            stroke="#9cc8ff"
            strokeOpacity="0.6"
            strokeWidth="1.2"
          />
        </g>
        <text
          x="470"
          y="494"
          fill="#9cc8ff"
          fillOpacity="0.8"
          fontSize="11"
          fontWeight="700"
          letterSpacing="0.22em"
          fontFamily="inherit"
        >
          HORS LIGNE
        </text>
      </g>
    </svg>
  );
}
