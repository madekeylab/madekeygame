"use client";
import Link from "next/link";
import { useState, type CSSProperties } from "react";
import Keycap from "@/components/Keycap";
import { BRAND, catHref } from "@/lib/site";

const CAPS = [
  { leg: "K", tone: "ink", x: 6, y: 50, r: -14, s: 1.08, w: 1 },
  { leg: "L", tone: "cw2", x: 40, y: 8, r: 9, s: 0.96, w: 1 },
  { leg: "A", tone: "white", x: 44, y: 54, r: -6, s: 1.16, w: 1 },
  { leg: "C", tone: "cw3", x: 70, y: 30, r: 16, s: 0.9, w: 1 },
  { leg: "Space", tone: "cw4", x: 14, y: 2, r: -4, s: 0.78, w: 2.25 },
];

/** 홈 첫 화면 — 눌러 볼 수 있는 키캡 더미 */
export default function Hero() {
  const [pressed, setPressed] = useState<number | null>(null);
  return (
    <section className="v2-hero" data-v2-hero="" data-anim="" aria-labelledby="v2-hero-t">
      <div className="page v2-hero-in">
        <div className="v2-hero-copy">
          <p className="v2-pill is-on-color">CUSTOM KEYBOARD STUDIO · SEOUL</p>
          <h1 id="v2-hero-t" className="v2-hero-title">
            <span>Click,</span> <span>clack,</span> <span className="is-out">yours.</span>
          </h1>
          <p className="v2-hero-sub">
            하우징부터 스위치 윤활, 타건 검수까지 —<br />한 대씩 조립해 소리까지 확인하고 보내는 커스텀 키보드.
          </p>
          <div className="v2-hero-cta">
            <Link href={catHref("custom-built")} className="v2-key is-ink is-lg">
              구성 시작하기 <span aria-hidden="true">→</span>
            </Link>
            <Link href="/videos" className="v2-key is-white is-lg">
              타건 영상 보기
            </Link>
          </div>
        </div>
        <div className="v2-hero-stack" role="group" aria-label="눌러 보는 키캡(장식)">
          {CAPS.map((c, i) => (
            <button
              key={i}
              type="button"
              className={`v2-hero-cap is-${c.tone}${pressed === i ? " is-pressed" : ""}`}
              style={{ left: `${c.x}%`, top: `${c.y}%`, "--r": `${c.r}deg`, "--s": c.s, "--w": c.w, "--i": i } as CSSProperties}
              aria-label={`${c.leg} 키캡 누르기`}
              onClick={() => {
                setPressed(i);
                window.setTimeout(() => setPressed((p) => (p === i ? null : p)), 180);
              }}
            >
              <Keycap legend={c.leg} w={c.w} />
            </button>
          ))}
          <p className="v2-hero-hint" aria-hidden="true">
            키캡을 눌러 보세요
          </p>
        </div>
      </div>
      <p className="sr-only">{BRAND.metaDescription}</p>
    </section>
  );
}
