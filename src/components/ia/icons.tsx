/** Les quelques glyphes du site, tracés à la main pour ne charger aucune bibliothèque. */

type IconProps = { className?: string; size?: number };

function Svg({
  className,
  size = 16,
  children,
  viewBox = "0 0 16 16",
}: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconArrow(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 8h10M9 4l4 4-4 4" />
    </Svg>
  );
}
export function IconArrowUp(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 13V3M4 7l4-4 4 4" />
    </Svg>
  );
}
export function IconPlus(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 3v10M3 8h10" />
    </Svg>
  );
}
export function IconChevron(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 6l4 4 4-4" />
    </Svg>
  );
}
export function IconCheck(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 8.5l3 3 7-7" />
    </Svg>
  );
}
export function IconMenu(p: IconProps) {
  return (
    <Svg {...p} viewBox="0 0 20 20" size={p.size ?? 20}>
      <path d="M3 6h14M3 10h14M3 14h14" />
    </Svg>
  );
}
export function IconClose(p: IconProps) {
  return (
    <Svg {...p} viewBox="0 0 20 20" size={p.size ?? 20}>
      <path d="M5 5l10 10M15 5L5 15" />
    </Svg>
  );
}
export function IconDownload(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" />
    </Svg>
  );
}
export function IconPlay(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 3.5v9l7-4.5z" fill="currentColor" stroke="none" />
    </Svg>
  );
}
