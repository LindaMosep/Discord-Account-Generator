import React from 'react';

type P = {size?: number; color?: string; stroke?: number};

const Svg: React.FC<P & {children: React.ReactNode}> = ({size = 24, color = 'currentColor', stroke = 2, children}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

export const Check: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </Svg>
);
export const ArrowUp: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Svg>
);
export const ArrowDown: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M17 7L7 17M15 17H7V9" />
  </Svg>
);
export const Plus: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);
export const Search: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" />
  </Svg>
);
export const Heart: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z" />
  </Svg>
);
export const Flame: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 21c-4 0-6.5-2.7-6.5-6.2 0-3.7 3-5.6 3.8-9.3 2.3 1.4 3.2 3.5 3.2 5.2 1-.6 1.7-1.7 1.9-3.1 2 1.7 4.1 4.3 4.1 7.2C18.5 18.3 16 21 12 21z" />
  </Svg>
);
export const Bolt: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z" />
  </Svg>
);
export const Star: React.FC<P & {fill?: string}> = ({fill, ...p}) => (
  <svg width={p.size ?? 24} height={p.size ?? 24} viewBox="0 0 24 24">
    <path
      d="M12 3l2.7 5.6 6.1.8-4.5 4.2 1.1 6.1L12 16.8 6.6 19.7l1.1-6.1L3.2 9.4l6.1-.8L12 3z"
      fill={fill ?? p.color ?? 'currentColor'}
    />
  </svg>
);
export const Clock: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);
export const Phone: React.FC<P> = (p) => (
  <Svg {...p}>
    <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
    <path d="M10.5 18.5h3" />
  </Svg>
);
export const Code: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" />
  </Svg>
);
export const Sparkle: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" />
  </Svg>
);
export const Rocket: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M5 15c-1.5 1.3-2 4-2 6 2 0 4.7-.5 6-2M14.5 4.5C17 3 20 3 21 3c0 1-.1 4-1.5 6.5L13 16l-5-5 6.5-6.5z" />
    <circle cx="15.5" cy="8.5" r="1.5" />
  </Svg>
);
export const Layers: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M12 3l9 5-9 5-9-5 9-5z" />
    <path d="M3 13l9 5 9-5" />
  </Svg>
);
export const Home: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 11l8-7 8 7v8.5a1 1 0 01-1 1h-4.5V15h-5v5.5H5a1 1 0 01-1-1V11z" />
  </Svg>
);
export const Chart: React.FC<P> = (p) => (
  <Svg {...p}>
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </Svg>
);
export const User: React.FC<P> = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
  </Svg>
);
