import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "RPM 레이싱 챔피언 — 게임랜드",
  description: "키보드로 RPM 에 맞춰 변속하는 400m 드래그 레이스. PERFECT 변속과 출발 반응으로 승부하세요.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall"]} />
      <Band />
      <main className="page shop-main">
        <p style={{ margin: "18px 0 10px", fontSize: "13px" }}>
          <Link href="/game">‹ 게임랜드</Link>
          {" · "}
          <Link href="/game/ranking">랭킹</Link>
        </p>
        <div className="rg">
          <div className="rg-garage">
            <div className="rg-topline">
              <nav className="rg-tabs" aria-label="화면">
                <button type="button" aria-pressed="true">
                  레이스
                </button>
                <button type="button" aria-pressed="false">
                  차고 · 튜닝
                </button>
              </nav>
              <span className="rg-gold" title="게임 골드 — 쇼핑몰 적립금과 별개, 현금 · 상품 교환 없음">
                <Link href="/login?next=/game/rpm">로그인하면 골드를 모읍니다</Link>
              </span>
            </div>
            <section className="rg-block">
              <h3>모드</h3>
              <div className="rg-seg">
                <button type="button" aria-pressed="true">
                  <b>400m 드래그</b>
                  <small>변속 3~5번 · 10~16초 승부</small>
                </button>
                <button type="button" aria-pressed="false">
                  <b>4km 하이웨이</b>
                  <small>모든 단 · 부스터 존 6곳 · 45~85초</small>
                </button>
              </div>
            </section>
            <section className="rg-block">
              <h3>맵</h3>
              <div className="rg-maps">
                <button
                  type="button"
                  className="rg-map"
                  aria-pressed="true"
                  style={{ background: "linear-gradient(180deg,#04040a 0%,#120a26 45%,#2a0f3a 62%,#14141c 63%,#22222c 100%)" }}
                >
                  <span className="rg-map-en">NEON CITY</span>
                  <b>네온 시티</b>
                  <small>야간 도심. 조건이 가장 고르다 — 기본 맵.</small>
                </button>
                <button
                  type="button"
                  className="rg-map"
                  aria-pressed="false"
                  style={{ background: "linear-gradient(180deg,#1b1440 0%,#c2456a 45%,#ffb56b 62%,#231a26 63%,#352833 100%)" }}
                >
                  <span className="rg-map-en">SUNSET COAST</span>
                  <b>선셋 코스트</b>
                  <small>해 질 녘 해안도로. 바닷바람이 등을 밀어 준다(공기저항 -6%).</small>
                </button>
                <button
                  type="button"
                  className="rg-map"
                  aria-pressed="false"
                  style={{ background: "linear-gradient(180deg,#3f8fd8 0%,#9cd0f2 45%,#f6e2bd 62%,#4a4038 63%,#5c5046 100%)" }}
                >
                  <span className="rg-map-en">DESERT HIGHWAY</span>
                  <b>데저트 하이웨이</b>
                  <small>한낮의 사막. 뜨거운 공기에 출력 -3%, 모래 먼지에 접지 -4%.</small>
                </button>
                <button
                  type="button"
                  className="rg-map"
                  aria-pressed="false"
                  style={{ background: "linear-gradient(180deg,#06080d 0%,#121a24 45%,#202c38 62%,#0f1318 63%,#1b2129 100%)" }}
                >
                  <span className="rg-map-en">RAIN HARBOR</span>
                  <b>레인 하버</b>
                  <small>비 오는 항만. 젖은 노면이라 접지 -14% — 출발 휠스핀 주의.</small>
                </button>
                <button
                  type="button"
                  className="rg-map"
                  aria-pressed="false"
                  style={{ background: "linear-gradient(180deg,#1d2a44 0%,#5a6f93 45%,#cfd9ea 62%,#3a3f48 63%,#4b515b 100%)" }}
                >
                  <span className="rg-map-en">ALPINE PASS</span>
                  <b>알파인 패스</b>
                  <small>눈 덮인 고갯길. 접지 -20%, 높은 고도에 출력 -2%.</small>
                </button>
              </div>
            </section>
            <div className="rg-two">
              <section className="rg-block">
                <h3>상대 리그</h3>
                <div className="rg-seg is-tiers">
                  <button type="button" aria-pressed="false" style={{ "--tc": "#9aa3ad" } as CSSProperties}>
                    <b>D</b>
                    <small>루키</small>
                  </button>
                  <button type="button" aria-pressed="true" style={{ "--tc": "#3aa0ff" } as CSSProperties}>
                    <b>C</b>
                    <small>아마추어</small>
                  </button>
                  <button type="button" aria-pressed="false" style={{ "--tc": "#ff7a3c" } as CSSProperties}>
                    <b>B</b>
                    <small>세미프로</small>
                  </button>
                  <button type="button" aria-pressed="false" style={{ "--tc": "#b7ff3c" } as CSSProperties}>
                    <b>A</b>
                    <small>프로</small>
                  </button>
                  <button type="button" aria-pressed="false" style={{ "--tc": "#c58cff" } as CSSProperties}>
                    <b>S</b>
                    <small>레전드</small>
                  </button>
                </div>
                <p className="rg-hint">높은 리그일수록 상대가 정확하고, 이기면 골드를 더 받습니다.</p>
              </section>
              <section className="rg-block">
                <h3>규정</h3>
                <div className="rg-seg">
                  <button type="button" aria-pressed="true">
                    <b>스톡 · 공식</b>
                    <small>튜닝 없이 같은 성능으로 실력만</small>
                  </button>
                  <button type="button" aria-pressed="false" disabled>
                    <b>튜닝 · 자유</b>
                    <small>로그인 후</small>
                  </button>
                </div>
              </section>
            </div>
            <section className="rg-block">
              <h3>차량</h3>
              <div className="rg-cars" role="radiogroup" aria-label="차량">
                <button type="button" role="radio" aria-checked="true" className="rg-car is-on" style={{ "--car": "#e9e4d8" } as CSSProperties}>
                  <span className="rg-grade" style={{ background: "#9aa3ad" }}>
                    D
                  </span>
                  <svg className="rg-car-svg" viewBox="0 0 120 44" aria-hidden="true">
                    <ellipse cx="60" cy="40" rx="50" ry="3" fill="rgba(0,0,0,.5)" />
                    <path d="M6 30 Q8 22 22 20 L40 18 Q50 8 66 8 L80 9 Q92 11 100 19 L110 21 Q116 23 116 30 L114 34 L8 34 Z" fill="var(--car)" />
                    <path d="M44 18 Q52 11 64 11 L78 12 Q86 13 93 19 Z" fill="rgba(10,14,24,.85)" />
                    <path d="M10 26 L116 27" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
                    <circle cx="32" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="32" cy="34" r="4" fill="#9aa0a8" />
                    <circle cx="94" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="94" cy="34" r="4" fill="#9aa0a8" />
                    <rect x="110" y="24" width="5" height="3" fill="#ff3040" />
                    <rect x="6" y="25" width="5" height="3" fill="#fff6c8" />
                  </svg>
                  <b>모노 C1</b>
                  <small>
                    132{"마력 · "}5{"단 · "}6,800rpm
                  </small>
                </button>
                <button type="button" role="radio" aria-checked="false" className="rg-car" style={{ "--car": "#3aa0ff" } as CSSProperties}>
                  <span className="rg-grade" style={{ background: "#3aa0ff" }}>
                    C
                  </span>
                  <svg className="rg-car-svg" viewBox="0 0 120 44" aria-hidden="true">
                    <ellipse cx="60" cy="40" rx="50" ry="3" fill="rgba(0,0,0,.5)" />
                    <path d="M6 30 Q8 22 22 20 L40 18 Q50 8 66 8 L80 9 Q92 11 100 19 L110 21 Q116 23 116 30 L114 34 L8 34 Z" fill="var(--car)" />
                    <path d="M44 18 Q52 11 64 11 L78 12 Q86 13 93 19 Z" fill="rgba(10,14,24,.85)" />
                    <path d="M10 26 L116 27" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
                    <circle cx="32" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="32" cy="34" r="4" fill="#9aa0a8" />
                    <circle cx="94" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="94" cy="34" r="4" fill="#9aa0a8" />
                    <rect x="110" y="24" width="5" height="3" fill="#ff3040" />
                    <rect x="6" y="25" width="5" height="3" fill="#fff6c8" />
                  </svg>
                  <b>벡터 GT</b>
                  <small>
                    265{"마력 · "}6{"단 · "}7,000rpm
                  </small>
                </button>
                <button type="button" role="radio" aria-checked="false" className="rg-car" style={{ "--car": "#ff5a36" } as CSSProperties}>
                  <span className="rg-grade" style={{ background: "#ff7a3c" }}>
                    B
                  </span>
                  <svg className="rg-car-svg" viewBox="0 0 120 44" aria-hidden="true">
                    <ellipse cx="60" cy="40" rx="50" ry="3" fill="rgba(0,0,0,.5)" />
                    <path d="M6 30 Q8 22 22 20 L40 18 Q50 8 66 8 L80 9 Q92 11 100 19 L110 21 Q116 23 116 30 L114 34 L8 34 Z" fill="var(--car)" />
                    <path d="M44 18 Q52 11 64 11 L78 12 Q86 13 93 19 Z" fill="rgba(10,14,24,.85)" />
                    <path d="M10 26 L116 27" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
                    <circle cx="32" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="32" cy="34" r="4" fill="#9aa0a8" />
                    <circle cx="94" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="94" cy="34" r="4" fill="#9aa0a8" />
                    <rect x="110" y="24" width="5" height="3" fill="#ff3040" />
                    <rect x="6" y="25" width="5" height="3" fill="#fff6c8" />
                  </svg>
                  <b>카본 RS</b>
                  <small>
                    420{"마력 · "}6{"단 · "}8,600rpm
                  </small>
                </button>
                <button type="button" role="radio" aria-checked="false" className="rg-car" style={{ "--car": "#b7ff3c" } as CSSProperties}>
                  <span className="rg-grade" style={{ background: "#b7ff3c" }}>
                    A
                  </span>
                  <svg className="rg-car-svg" viewBox="0 0 120 44" aria-hidden="true">
                    <ellipse cx="60" cy="40" rx="50" ry="3" fill="rgba(0,0,0,.5)" />
                    <path d="M6 30 Q8 22 22 20 L40 18 Q50 8 66 8 L80 9 Q92 11 100 19 L110 21 Q116 23 116 30 L114 34 L8 34 Z" fill="var(--car)" />
                    <path d="M44 18 Q52 11 64 11 L78 12 Q86 13 93 19 Z" fill="rgba(10,14,24,.85)" />
                    <path d="M10 26 L116 27" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
                    <circle cx="32" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="32" cy="34" r="4" fill="#9aa0a8" />
                    <circle cx="94" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="94" cy="34" r="4" fill="#9aa0a8" />
                    <rect x="110" y="24" width="5" height="3" fill="#ff3040" />
                    <rect x="6" y="25" width="5" height="3" fill="#fff6c8" />
                  </svg>
                  <b>타이탄 V8</b>
                  <small>
                    610{"마력 · "}6{"단 · "}7,000rpm
                  </small>
                </button>
                <button type="button" role="radio" aria-checked="false" className="rg-car" style={{ "--car": "#c58cff" } as CSSProperties}>
                  <span className="rg-grade" style={{ background: "#c58cff" }}>
                    S
                  </span>
                  <svg className="rg-car-svg" viewBox="0 0 120 44" aria-hidden="true">
                    <ellipse cx="60" cy="40" rx="50" ry="3" fill="rgba(0,0,0,.5)" />
                    <path d="M6 30 Q8 22 22 20 L40 18 Q50 8 66 8 L80 9 Q92 11 100 19 L110 21 Q116 23 116 30 L114 34 L8 34 Z" fill="var(--car)" />
                    <path d="M44 18 Q52 11 64 11 L78 12 Q86 13 93 19 Z" fill="rgba(10,14,24,.85)" />
                    <path d="M10 26 L116 27" stroke="rgba(255,255,255,.35)" strokeWidth="1" />
                    <circle cx="32" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="32" cy="34" r="4" fill="#9aa0a8" />
                    <circle cx="94" cy="34" r="8" fill="#0a0a0a" />
                    <circle cx="94" cy="34" r="4" fill="#9aa0a8" />
                    <rect x="110" y="24" width="5" height="3" fill="#ff3040" />
                    <rect x="6" y="25" width="5" height="3" fill="#fff6c8" />
                  </svg>
                  <b>스트라토 S</b>
                  <small>
                    820{"마력 · "}7{"단 · "}9,200rpm
                  </small>
                </button>
              </div>
            </section>
            <div className="rg-detail">
              <div>
                <p className="rg-eyebrow">
                  D{"급 · "}네온 시티{" · "}400m{" · vs "}C급 아마추어
                </p>
                <h2>모노 C1</h2>
                <p className="rg-tag">가볍고 순한 입문 해치백. 판정 창이 넓어 연습용으로 좋다.</p>
                <dl className="rg-stats">
                  <div className="rg-stat">
                    <dt>출력</dt>
                    <dd>
                      <span className="rg-bar">
                        <i style={{ width: "13.200000000000001%" }} />
                      </span>
                      <b>132</b>
                      <small>마력</small>
                    </dd>
                  </div>
                  <div className="rg-stat">
                    <dt>무게</dt>
                    <dd>
                      <span className="rg-bar">
                        <i style={{ width: "74.47368421052632%" }} />
                      </span>
                      <b>1,150</b>
                      <small>kg</small>
                    </dd>
                  </div>
                  <div className="rg-stat" title="맵 노면 반영">
                    <dt>접지</dt>
                    <dd>
                      <span className="rg-bar">
                        <i style={{ width: "62.5%" }} />
                      </span>
                      <b>100</b>
                      <small>%</small>
                    </dd>
                  </div>
                  <div className="rg-stat" title="PERFECT 창 — 클수록 쉬움">
                    <dt>판정 여유</dt>
                    <dd>
                      <span className="rg-bar">
                        <i style={{ width: "93.33333333333333%" }} />
                      </span>
                      <b>2.8</b>
                      <small>%</small>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rg-go">
                <button type="button" className="rg-start">
                  {"레이스 시작 "}
                  <kbd>Enter</kbd>
                </button>
                <ul className="rg-keys">
                  <li>
                    <kbd>Space</kbd> <kbd>↑</kbd>
                    {" 출발 · 변속 — 초록불 전에 누르면 부정 출발"}
                  </li>
                  <li>
                    <kbd>N</kbd> <kbd>↓</kbd>
                    {" 니트로 — "}
                    <b className="c-p">부스터 존</b>(파란 화살표) 안에서 쓰면 ×1.75
                  </li>
                  <li>PERFECT 변속 = 니트로 1칸 충전, GREAT = 반 칸</li>
                </ul>
                <label className="rg-mute">
                  <input type="checkbox" defaultChecked />
                  {" 엔진 소리"}
                </label>
                <p className="rg-login">
                  <Link href="/login?next=/game/rpm">로그인</Link>하면 기록이 랭킹에 오르고 골드로 차를 사고 튜닝할 수 있습니다. 지금은 모든 차 시승(스톡)만
                  됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="gl-note">
          <b>안내</b>
          {
            " — 차량 5종은 가상 브랜드입니다. 게임 골드는 레이스로만 모이며 쇼핑몰 적립금과 별개이고, 현금 · 상품으로 바꿀 수 없습니다(하루 3,000 골드 상한). 공식 기록은 서버가 입력 기록으로 처음부터 다시 계산해 정하고, 기계처럼 정확한 입력은 공식 랭킹에서 제외됩니다. 랭킹은 모드 · 맵 · 규정별로 따로 겨룹니다."
          }
        </div>
      </main>
      <Tail />
    </>
  );
}
