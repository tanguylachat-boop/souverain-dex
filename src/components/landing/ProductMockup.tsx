export function ProductMockup() {
  return (
    <svg
      viewBox="0 0 520 440"
      className="w-full h-auto"
      role="img"
      aria-label="Hardware dédié installé dans le cabinet, traitement local des documents"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Soft frame */}
      <rect x="0.5" y="0.5" width="519" height="439" rx="14" fill="var(--surface)" stroke="var(--border)" />

      {/* LAN perimeter (dashed) */}
      <rect
        x="28"
        y="36"
        width="464"
        height="368"
        rx="18"
        fill="none"
        stroke="var(--border)"
        strokeDasharray="4 6"
      />
      <text x="48" y="58" fontSize="11" fill="var(--muted-foreground)" letterSpacing="0.08em">
        PÉRIMÈTRE LAN — VOTRE CABINET
      </text>

      {/* Incoming documents */}
      <g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${60}, ${110 + i * 70})`}>
            <rect width="78" height="96" rx="6" fill="white" stroke="var(--border)" />
            <rect x="10" y="14" width="40" height="5" rx="1" fill="var(--border)" />
            <rect x="10" y="26" width="58" height="3" rx="1" fill="var(--border)" />
            <rect x="10" y="34" width="50" height="3" rx="1" fill="var(--border)" />
            <rect x="10" y="42" width="55" height="3" rx="1" fill="var(--border)" />
            <rect x="10" y="50" width="38" height="3" rx="1" fill="var(--border)" />
            <text x="10" y="82" fontSize="9" fill="var(--muted-foreground)" fontWeight="500">
              {["facture.pdf", "scan.jpg", "tva.pdf"][i]}
            </text>
          </g>
        ))}
      </g>

      {/* Arrows */}
      <g stroke="var(--primary)" strokeWidth="1.5" fill="none">
        <path d="M148 158 L208 218" />
        <path d="M148 228 L208 228" />
        <path d="M148 298 L208 238" />
      </g>

      {/* Hardware dédié (center) */}
      <g transform="translate(208, 178)">
        <rect width="148" height="100" rx="10" fill="var(--foreground)" />
        <rect x="14" y="14" width="120" height="2" rx="1" fill="white" opacity="0.15" />
        <circle cx="74" cy="56" r="14" fill="none" stroke="white" opacity="0.35" strokeWidth="1.5" />
        <circle cx="74" cy="56" r="3" fill="white" opacity="0.5" />
        <text x="74" y="88" textAnchor="middle" fontSize="9" fill="white" opacity="0.6" letterSpacing="0.1em">
          AGENT IA — LOCAL
        </text>
      </g>

      {/* Output: organized folders */}
      <g transform="translate(384, 130)">
        {["Clients", "TVA 2026", "Relances"].map((label, i) => (
          <g key={label} transform={`translate(0, ${i * 56})`}>
            <rect width="84" height="44" rx="6" fill="white" stroke="var(--border)" />
            <path
              d="M10 14 H28 L32 19 H74"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <rect x="10" y="22" width="64" height="14" rx="3" fill="var(--surface)" />
            <text x="14" y="32" fontSize="9" fill="var(--foreground)" fontWeight="500">
              {label}
            </text>
          </g>
        ))}
      </g>

      <g stroke="var(--primary)" strokeWidth="1.5" fill="none">
        <path d="M356 200 L384 152" />
        <path d="M356 228 L384 208" />
        <path d="M356 256 L384 264" />
      </g>

      {/* Lock badge */}
      <g transform="translate(40, 360)">
        <rect width="160" height="28" rx="14" fill="var(--background)" stroke="var(--border)" />
        <g transform="translate(12, 7)" stroke="var(--primary)" strokeWidth="1.5" fill="none">
          <rect x="1" y="6" width="12" height="9" rx="1.5" />
          <path d="M3.5 6 V4 a3.5 3.5 0 0 1 7 0 V6" />
        </g>
        <text x="34" y="18" fontSize="11" fill="var(--foreground)" fontWeight="500">
          Données locales · Aucun cloud
        </text>
      </g>
    </svg>
  );
}
