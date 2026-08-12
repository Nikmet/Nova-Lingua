/**
 * Inline SVG flags for the language switcher.
 * Not emoji: Windows has no flag-emoji glyphs and falls back to bare letter pairs.
 */

const STAR =
  "M0,-1 L0.225,-0.309 L0.951,-0.309 L0.363,0.118 L0.588,0.809 L0,0.382 L-0.588,0.809 L-0.363,0.118 L-0.951,-0.309 L-0.225,-0.309 Z";

type FlagProps = { className?: string };

function FlagFrame({ children, className }: FlagProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 20 15"
      aria-hidden="true"
      focusable="false"
      className={className ?? "h-[12px] w-4 flex-none rounded-[2px]"}
    >
      {children}
      <rect x="0.25" y="0.25" width="19.5" height="14.5" rx="1.5" fill="none" stroke="oklch(23.1% 0.0771 255.4 / .18)" strokeWidth="0.5" />
    </svg>
  );
}

export function FlagRU({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="20" height="5" fill="#FFFFFF" />
      <rect y="5" width="20" height="5" fill="#0039A6" />
      <rect y="10" width="20" height="5" fill="#D52B1E" />
    </FlagFrame>
  );
}

export function FlagGB({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="20" height="15" fill="#012169" />
      <path d="M0,0 L20,15 M20,0 L0,15" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M0,0 L20,15 M20,0 L0,15" stroke="#C8102E" strokeWidth="1.6" />
      <path d="M10,0 V15 M0,7.5 H20" stroke="#FFFFFF" strokeWidth="5" />
      <path d="M10,0 V15 M0,7.5 H20" stroke="#C8102E" strokeWidth="3" />
    </FlagFrame>
  );
}

export function FlagES({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="20" height="15" fill="#AA151B" />
      <rect y="3.75" width="20" height="7.5" fill="#F1BF00" />
    </FlagFrame>
  );
}

export function FlagCN({ className }: FlagProps) {
  return (
    <FlagFrame className={className}>
      <rect width="20" height="15" fill="#DE2910" />
      <g fill="#FFDE00">
        <path d={STAR} transform="translate(3.6 3.9) scale(2.4)" />
        <path d={STAR} transform="translate(7.4 1.5) scale(0.8)" />
        <path d={STAR} transform="translate(8.9 3.3) scale(0.8)" />
        <path d={STAR} transform="translate(8.9 5.6) scale(0.8)" />
        <path d={STAR} transform="translate(7.4 7.2) scale(0.8)" />
      </g>
    </FlagFrame>
  );
}
