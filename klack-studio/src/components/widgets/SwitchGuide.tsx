"use client";
import Link from "next/link";
import { useId, useState } from "react";
import Keycap from "@/components/Keycap";
import { catHref } from "@/lib/site";

type Pt = [number, number];
const SWITCHES: { key: "linear" | "tactile" | "clicky"; en: string; ko: string; lead: string; press: Pt[]; click?: number; rows: [string, string][] }[] = [
  {
    key: "linear",
    en: "LINEAR",
    ko: "리니어",
    lead: "처음부터 바닥까지 걸림 없이 일정하게 내려갑니다.",
    press: [
      [0, 0.3],
      [0.82, 0.62],
      [0.9, 0.68],
      [0.94, 0.95],
    ],
    rows: [
      ["느낌", "걸림 없이 일정함"],
      ["소리", "조용한 편 — 바닥 소리 위주"],
      ["추천", "빠른 연타 · 게임 · 조용한 자리"],
    ],
  },
  {
    key: "tactile",
    en: "TACTILE",
    ko: "택타일",
    lead: "중간에 손끝에 걸리는 턱(범프)이 있어 입력 순간이 느껴집니다.",
    press: [
      [0, 0.3],
      [0.18, 0.56],
      [0.28, 0.68],
      [0.36, 0.46],
      [0.5, 0.44],
      [0.82, 0.62],
      [0.9, 0.68],
      [0.94, 0.95],
    ],
    rows: [
      ["느낌", "중간에 한 번 걸림"],
      ["소리", "리니어와 비슷하거나 조금 더"],
      ["추천", "긴 문서 작업 · 또렷한 입력감"],
    ],
  },
  {
    key: "clicky",
    en: "CLICKY",
    ko: "클릭",
    lead: "걸림과 함께 ‘딸깍’ 하는 클릭음이 납니다. 소리까지 타건의 일부입니다.",
    press: [
      [0, 0.3],
      [0.2, 0.58],
      [0.3, 0.74],
      [0.32, 0.4],
      [0.5, 0.42],
      [0.82, 0.62],
      [0.9, 0.68],
      [0.94, 0.95],
    ],
    click: 0.31,
    rows: [
      ["느낌", "걸림 + 또렷한 끊김"],
      ["소리", "큰 편 — 공용 공간에선 주의"],
      ["추천", "타건음을 즐기는 분"],
    ],
  },
];
const TONE = { linear: "cw1", tactile: "cw2", clicky: "cw3" };
const path = (pts: Pt[]) => pts.map(([x, y], i) => `${i ? "L" : "M"}${(20 + 440 * x).toFixed(1)} ${(220 - 200 * y).toFixed(1)}`).join(" ");
const area = (pts: Pt[]) => `${path(pts)} L${(20 + 440 * pts[pts.length - 1][0]).toFixed(1)} 220 L20 220 Z`;

/** 스위치 비교 — 리니어 · 택타일 · 클릭의 키압 곡선 개념도 */
export default function SwitchGuide() {
  const [key, setKey] = useState(SWITCHES[0].key);
  const sw = SWITCHES.find((s) => s.key === key) ?? SWITCHES[0];
  const uid = useId();
  return (
    <section className="sec v2-sec v2-switch" data-v2-switch="" aria-labelledby="v2-sw-t">
      <header className="v2-head" data-reveal="">
        <div className="v2-head-main">
          <p className="v2-pill is-cw3">SWITCH GUIDE</p>
          <h2 id="v2-sw-t">손끝 느낌은 세 가지</h2>
          <p className="v2-head-sub">누를 때 힘이 어떻게 변하는지가 스위치의 성격입니다. 키캡을 눌러 비교해 보세요.</p>
        </div>
        <Link href={catHref("switch")} className="v2-key is-white">
          스위치 보기<span aria-hidden="true"> →</span>
        </Link>
      </header>
      <div className="v2-sw" data-reveal="">
        <div className="v2-sw-keys" role="tablist" aria-label="스위치 종류">
          {SWITCHES.map((s) => (
            <button key={s.key} type="button" role="tab" id={`${uid}-${s.key}`} aria-selected={s.key === key} aria-controls={`${uid}-panel`} className={`v2-sw-key is-${TONE[s.key]}`} onClick={() => setKey(s.key)}>
              <Keycap legend={s.ko} sub={s.en} className="v2-sw-cap" />
            </button>
          ))}
        </div>
        <div className={`v2-sw-panel is-${TONE[sw.key]}`} role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-${sw.key}`}>
          <div className="v2-sw-copy">
            <p className="v2-eyebrow">{sw.en}</p>
            <h3>{sw.ko}</h3>
            <p className="v2-sw-lead">{sw.lead}</p>
            <ul className="v2-sw-rows">
              {sw.rows.map(([k, v]) => (
                <li key={k}>
                  <b>{k}</b>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
          <figure className="v2-sw-chart">
            <svg viewBox="0 0 480 240" role="img" aria-label={`${sw.ko} 스위치 키압 곡선 개념도 — ${sw.lead}`}>
              <path className="v2-sw-area" d={area(sw.press)} />
              <path key={sw.key} className="v2-sw-line" d={path(sw.press)} pathLength={1} />
              {sw.click != null && <circle className="v2-sw-click" cx={20 + 440 * sw.click} cy={72} r="10" />}
              <text className="v2-sw-ax" x={460} y={236} textAnchor="end">
                눌린 깊이 →
              </text>
              <text className="v2-sw-ax" x={20} y={14}>
                힘 ↑
              </text>
            </svg>
            <figcaption>곡선은 모양만 보여 주는 개념도입니다. 실제 수치는 각 스위치 상품의 스펙에서 확인하세요.</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
