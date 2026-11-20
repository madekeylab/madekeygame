const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const IcoCart = ({ w = 1.6 }: { w?: number }) => (
  <svg viewBox="0 0 24 24" {...stroke} strokeWidth={w}>
    <path d="M4 5h2l1.6 9.2A2 2 0 0 0 9.6 16h7.2a2 2 0 0 0 2-1.6L20 8H7" />
    <circle cx="10" cy="20" r="1.2" />
    <circle cx="18" cy="20" r="1.2" />
  </svg>
);
export const IcoSearch = () => (
  <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.6}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);
export const IcoHeart = ({ w = 1.7 }: { w?: number }) => (
  <svg viewBox="0 0 24 24" {...stroke} strokeWidth={w}>
    <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />
  </svg>
);
export const IcoUser = () => (
  <svg viewBox="0 0 24 24" {...stroke} strokeWidth={1.6}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c1.2-3.6 4-5.2 7-5.2S17.8 16.4 19 20" />
  </svg>
);
export const IcoStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 17.3-6.2 3.3 1.2-6.9L2 8.8l7-1L12 1.5l3 6.3 7 1-5 4.9 1.2 6.9z" />
  </svg>
);
