import { forwardRef } from 'react';
import { getProduct } from '../data/products';
import { LAYOUTS, type KeyDef } from '../data/layouts';
import type { Build, LayoutId } from '../data/types';
import { buildLayout } from '../lib/compat';

const U = 40; // pixels per key unit
const PAD = 14; // case border around the keys
const GAP = 3; // space between keycaps

export interface KeyStyle {
  fill: string;
  text: string;
  stroke?: string;
}

interface Props {
  layout: LayoutId;
  frame: string;
  keyStyle: (k: KeyDef) => KeyStyle;
  showLabels?: boolean;
  title?: string;
  onKeyClick?: (k: KeyDef) => void;
}

/**
 * Draws a keyboard with inline attributes only (no CSS classes), so the same SVG
 * can be serialized and rasterized into a share image.
 */
export const KeyboardSvg = forwardRef<SVGSVGElement, Props>(function KeyboardSvg(
  { layout, frame, keyStyle, showLabels = true, title, onKeyClick },
  ref,
) {
  const l = LAYOUTS[layout];
  const w = l.width * U + PAD * 2;
  const h = l.height * U + PAD * 2;
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      width="100%"
      role="img"
      aria-label={title ?? `${layout} 배열 키보드`}
      style={{ display: 'block', maxWidth: w }}
    >
      <rect x={0} y={0} width={w} height={h} rx={14} fill={frame} />
      <rect x={4} y={4} width={w - 8} height={h - 8} rx={11} fill="rgba(0,0,0,0.18)" />
      {l.keys.map((k) => {
        const s = keyStyle(k);
        const x = PAD + k.x * U + GAP / 2;
        const y = PAD + k.y * U + GAP / 2;
        const kw = k.w * U - GAP;
        const kh = U - GAP;
        return (
          <g
            key={k.code}
            onClick={onKeyClick ? () => onKeyClick(k) : undefined}
            style={onKeyClick ? { cursor: 'pointer' } : undefined}
          >
            <rect x={x} y={y} width={kw} height={kh} rx={5} fill={s.fill} stroke={s.stroke ?? 'rgba(0,0,0,0.25)'} strokeWidth={s.stroke ? 2 : 1} />
            <rect x={x + 4} y={y + 3} width={kw - 8} height={kh - 10} rx={4} fill="rgba(255,255,255,0.12)" />
            {showLabels && k.label && (
              <text
                x={x + 7}
                y={y + 15}
                fontSize={k.label.length > 3 ? 9 : 11}
                fontFamily="system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
                fontWeight={600}
                fill={s.text}
              >
                {k.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
});

const DEFAULT_CAP: KeyStyle = { fill: '#f4f4f2', text: '#555' };
const DEFAULT_ACCENT: KeyStyle = { fill: '#c9c9c4', text: '#444' };

/** Preview of a build: case color for the frame, keycap colors for the keys. */
export const BuildPreview = forwardRef<SVGSVGElement, { build: Build; title?: string }>(function BuildPreview(
  { build, title },
  ref,
) {
  const layout = buildLayout(build) ?? '65';
  const kc = getProduct(build.keycap);
  const cs = getProduct(build.case);
  const frame = cs ? cs.color : '#9aa1ab';
  const keyStyle = (k: KeyDef): KeyStyle => {
    if (kc?.category !== 'keycap') return k.accent ? DEFAULT_ACCENT : DEFAULT_CAP;
    return k.accent ? { fill: kc.accent, text: kc.legend } : { fill: kc.color, text: kc.legend };
  };
  return <KeyboardSvg ref={ref} layout={layout} frame={frame} keyStyle={keyStyle} title={title} />;
});
