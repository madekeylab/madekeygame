"use client";
import { useState, type CSSProperties } from "react";

export type TierConfig = {
  tiers: { key: string; name: string; color: string }[];
  benefits: { key: string; label: string; help?: string; values: Record<string, string> }[];
};

export const Gem = ({ color, size = 16 }: { color: string; size?: number }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" className="tier-gem">
    <path d="M6 3h12l4 6-10 12L2 9z" fill={color} stroke="rgba(0,0,0,.18)" strokeWidth="1" />
    <path d="M2 9h20M6 3l6 6 6-6M12 9v12" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
  </svg>
);

/** 회원 등급별 혜택 표. ? 버튼으로 항목 설명을 펼친다 */
export default function TierTable({ cfg, myTier, compact }: { cfg: TierConfig; myTier?: string; compact?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className={`tt-wrap${compact ? " is-compact" : ""}`}>
      <table className="tt">
        <thead>
          <tr>
            <th className="tt-first">
              <span>전체 혜택 자세히 보기</span>
            </th>
            {cfg.tiers.map((t) => (
              <th key={t.key} className={t.key === myTier ? "is-me" : undefined} style={{ "--tier": t.color } as CSSProperties}>
                <Gem color={t.color} />
                {t.name}
                {t.key === myTier && <small className="tt-me">내 등급</small>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cfg.benefits.map((b) => (
            <tr key={b.key}>
              <th className="tt-first">
                <span>{b.label}</span>
                {b.help && (
                  <button type="button" className="tt-help" aria-expanded={open === b.key} aria-label={`${b.label} 설명`} onClick={() => setOpen(open === b.key ? null : b.key)}>
                    <span aria-hidden="true">?</span>
                  </button>
                )}
                {open === b.key && b.help && <p className="tt-help-text">{b.help}</p>}
              </th>
              {cfg.tiers.map((t) => (
                <td key={t.key} className={t.key === myTier ? "is-me" : undefined}>
                  {b.values[t.key] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
