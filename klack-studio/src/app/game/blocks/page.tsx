import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "블록 퍼즐왕 — 게임랜드",
  description: "키캡 블록을 8×8 보강판에 꽂아 가로 · 세로 줄을 정렬하는 2분 퍼즐. 회전 가능, 연속 정렬 최대 ×4, 금 키캡 보너스.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall", "game-2"]} />
      <Band />
      <main className="page shop-main">
        <p style={{ margin: "18px 0 10px", fontSize: "13px" }}>
          <Link href="/game">‹ 게임랜드</Link>
          {" · "}
          <Link href="/game/ranking?game=blocks">랭킹</Link>
        </p>
        <div className="rg">
          <div className="rg-stage bk-stage">
            <canvas className="bk-canvas" aria-label="블록 퍼즐왕 화면" />
            <div className="rg-topbar bk-topbar">
              <button type="button">소리 켜짐</button>
            </div>
            <div className="rg-over">
              <div className="rg-card">
                <p className="rg-verdict is-win">KEYCAP PUZZLE</p>
                <p className="rg-big" style={{ fontSize: "clamp(30px,6vw,46px)" }}>
                  블록 퍼즐왕
                </p>
                <p className="rg-sub">
                  2분 동안 키캡 블록을 8×8 보강판에 꽂으세요. 가로 · 세로 한 줄이 꽉 차면 ‘키 정렬 완료’로 빠지고, 연속으로 정렬하면 최대 ×4.
                </p>
                <ul className="rg-keys" style={{ textAlign: "left" }}>
                  <li>
                    <kbd>←</kbd>
                    <kbd>→</kbd>
                    <kbd>↑</kbd>
                    <kbd>↓</kbd>
                    {" 자리 이동(길게 누르면 반복) · "}
                    <kbd>Space</kbd>
                    {" 꽂기"}
                  </li>
                  <li>
                    <kbd>Z</kbd>
                    {" 회전 · "}
                    <kbd>X</kbd>
                    {" 또는 "}
                    <kbd>Tab</kbd>
                    {" 다음 조각 · 휴대폰은 아래 버튼"}
                  </li>
                  <li>
                    <b style={{ color: "#ffd23c" }}>금 키캡</b>이 든 줄을 정렬하면 +300 · 판을 다 비우면 +2,000 · 놓을 곳이 없으면 끝
                  </li>
                </ul>
                <div className="rg-acts">
                  <button type="button" className="rg-start">
                    {"시작 "}
                    <kbd>Enter</kbd>
                  </button>
                  <Link className="rg-ghost" href="/game/ranking?game=blocks">
                    랭킹
                  </Link>
                </div>
                <p className="rg-login">
                  <Link href="/login?next=/game/blocks">로그인</Link>하면 기록이 랭킹에 오르고 골드를 받습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="bk-pad" aria-hidden="true">
            <div className="bk-dpad">
              <button type="button" className="bk-btn is-up" aria-label="↑" disabled>
                ↑
              </button>
              <button type="button" className="bk-btn is-left" aria-label="←" disabled>
                ←
              </button>
              <button type="button" className="bk-btn is-down" aria-label="↓" disabled>
                ↓
              </button>
              <button type="button" className="bk-btn is-right" aria-label="→" disabled>
                →
              </button>
            </div>
            <div className="bk-acts">
              <button type="button" className="bk-btn " aria-label="회전" disabled>
                회전
              </button>
              <button type="button" className="bk-btn " aria-label="다음" disabled>
                다음
              </button>
              <button type="button" className="bk-btn is-place" aria-label="꽂기" disabled>
                꽂기
              </button>
            </div>
          </div>
        </div>
        <div className="gl-note">
          점수는 서버가 입력 기록으로 같은 2분을 다시 돌려 확정합니다. 게임 골드는 쇼핑몰 적립금과 별개이며 현금 · 상품으로 바꿀 수 없습니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
