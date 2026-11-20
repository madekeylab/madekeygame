import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "우주 슈팅왕 — 게임랜드",
  description: "방향키로 피하고 Space 로 격추하는 1분 챌린지 슈팅 게임. 콤보 배율과 45초 보스.",
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
          <Link href="/game/ranking?game=shooter">랭킹</Link>
        </p>
        <div className="rg">
          <div className="rg-stage sh-stage">
            <canvas className="sh-canvas" aria-label="우주 슈팅왕 화면" />
            <div className="rg-topbar">
              <button type="button">소리 켜짐</button>
            </div>
            <div className="rg-over">
              <div className="rg-card">
                <p className="rg-verdict is-win">STAR SHOOTER</p>
                <p className="rg-big" style={{ fontSize: "clamp(30px,6vw,46px)" }}>
                  우주 슈팅왕
                </p>
                <p className="rg-sub">60초 동안 최대한 많이 격추하세요. 연속으로 잡으면 점수가 최대 ×5, 45초에 보스가 나옵니다.</p>
                <ul className="rg-keys" style={{ textAlign: "left" }}>
                  <li>
                    <kbd>←</kbd>
                    <kbd>→</kbd>
                    <kbd>↑</kbd>
                    <kbd>↓</kbd>
                    {" 또는 "}
                    <kbd>W</kbd>
                    <kbd>A</kbd>
                    <kbd>S</kbd>
                    <kbd>D</kbd>
                    {" 이동 · "}
                    <kbd>Space</kbd>
                    {" 발사(누르고 있기)"}
                  </li>
                  <li>휴대폰: 화면을 누른 채 끌면 그쪽으로 움직이고 자동 발사</li>
                  <li>
                    <b style={{ color: "#ff4fd8" }}>P</b>
                    {" 확산탄 · "}
                    <b style={{ color: "#4ff7ff" }}>S</b>
                    {" 보호막 · 목숨 3 · 끝까지 안 맞으면 +3,000"}
                  </li>
                </ul>
                <div className="rg-acts">
                  <button type="button" className="rg-start">
                    {"시작 "}
                    <kbd>Enter</kbd>
                  </button>
                  <Link className="rg-ghost" href="/game/ranking?game=shooter">
                    랭킹
                  </Link>
                </div>
                <p className="rg-login">
                  <Link href="/login?next=/game/shooter">로그인</Link>하면 기록이 랭킹에 오르고 골드를 받습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="gl-note">
          점수는 서버가 입력 기록으로 같은 1분을 다시 돌려 확정합니다. 게임 골드는 쇼핑몰 적립금과 별개이며 현금 · 상품으로 바꿀 수 없습니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
