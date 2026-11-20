import type { CSSProperties } from "react";

/** 키캡 일러스트(SVG). w 는 키 폭(1u = 1) */
export default function Keycap({ legend, sub, className = "", w = 1, style, title }: { legend?: string; sub?: string; className?: string; w?: number; style?: CSSProperties; title?: string }) {
  const width = 100 * w;
  return (
    <svg className={`v2-kc ${className}`} viewBox={`0 0 ${width} 108`} style={style} role={title ? "img" : undefined} aria-label={title} aria-hidden={!title || undefined}>
      <rect className="v2-kc-shadow" x="4" y="12" width={width - 8} height={94} rx="22" />
      <rect className="v2-kc-side" x="2" y="2" width={width - 4} height={98} rx="22" />
      <g className="v2-kc-top">
        <rect x="13" y="7" width={width - 26} height={70} rx="15" />
        {legend && (
          <text className="v2-kc-leg" x="24" y={sub ? 46 : 52}>
            {legend}
          </text>
        )}
        {sub && (
          <text className="v2-kc-sub" x="25" y="64">
            {sub}
          </text>
        )}
      </g>
    </svg>
  );
}
