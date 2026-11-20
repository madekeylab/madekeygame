import type { Product } from '../data/types';

/** A small drawn picture of a product, so the catalog needs no photo files. */
export function ProductThumb({ product, size = 120 }: { product: Product; size?: number }) {
  const c = product.color;
  let art: JSX.Element;
  switch (product.category) {
    case 'case':
      art = (
        <>
          <rect x={10} y={38} width={100} height={46} rx={8} fill={c} stroke="rgba(0,0,0,.25)" />
          <rect x={16} y={44} width={88} height={34} rx={4} fill="rgba(0,0,0,.22)" />
        </>
      );
      break;
    case 'pcb':
      art = (
        <>
          <rect x={12} y={34} width={96} height={52} rx={4} fill={c} />
          {Array.from({ length: 24 }, (_, i) => (
            <circle key={i} cx={22 + (i % 8) * 11} cy={46 + Math.floor(i / 8) * 14} r={3} fill="#e7c86b" />
          ))}
        </>
      );
      break;
    case 'plate':
      art = (
        <>
          <rect x={12} y={34} width={96} height={52} rx={4} fill={c} stroke="rgba(0,0,0,.25)" />
          {Array.from({ length: 21 }, (_, i) => (
            <rect key={i} x={19 + (i % 7) * 13} y={41 + Math.floor(i / 7) * 14} width={9} height={9} fill="rgba(0,0,0,.35)" />
          ))}
        </>
      );
      break;
    case 'switch':
      art = (
        <>
          <rect x={34} y={58} width={52} height={30} rx={4} fill="#2b2b2b" opacity={0.85} />
          <rect x={38} y={36} width={44} height={26} rx={4} fill={c} stroke="rgba(0,0,0,.3)" />
          <rect x={54} y={22} width={12} height={16} rx={2} fill={c} stroke="rgba(0,0,0,.3)" />
        </>
      );
      break;
    case 'keycap':
      art = (
        <>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={14 + i * 32} y={44} width={28} height={30} rx={5} fill={i === 2 ? product.accent : c} stroke="rgba(0,0,0,.25)" />
              <rect x={18 + i * 32} y={47} width={20} height={20} rx={4} fill="rgba(255,255,255,.18)" />
              <text x={22 + i * 32} y={60} fontSize={9} fill={product.legend} fontWeight={700}>{['ㄱ', 'A', '⏎'][i]}</text>
            </g>
          ))}
        </>
      );
      break;
    case 'stabilizer':
      art = (
        <>
          <rect x={14} y={56} width={92} height={5} rx={2} fill="#a9a9a9" />
          <rect x={18} y={44} width={18} height={26} rx={3} fill={c} stroke="rgba(0,0,0,.3)" />
          <rect x={84} y={44} width={18} height={26} rx={3} fill={c} stroke="rgba(0,0,0,.3)" />
        </>
      );
      break;
  }
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="thumb" aria-hidden="true">
      <rect width={120} height={120} rx={12} fill="var(--thumb-bg)" />
      {art}
    </svg>
  );
}
