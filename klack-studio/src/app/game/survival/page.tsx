import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "몬스터 서바이벌 — 게임랜드",
  description: "키캡 기사가 먼지벌레 · 케이블뱀 · 커피슬라임 떼를 3분 동안 버티는 자동 공격 생존 게임. 레벨업 강화 8종과 150초 보스 먼지 대왕.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall", "game"]} />
      <Band />
      <main className="page shop-main">
        <p style={{ margin: "18px 0 10px", fontSize: "13px" }}>
          <Link href="/game">‹ 게임랜드</Link>
          {" · "}
          <Link href="/game/ranking?game=survival">랭킹</Link>
        </p>
        <div className="rg">
          <div className="rg-stage sv-stage">
            <canvas className="sv-canvas" aria-label="몬스터 서바이벌 화면" />
            <div className="rg-topbar sv-topbar">
              <button type="button">소리 켜짐</button>
            </div>
            <div className="rg-over">
              <div className="rg-card">
                <p className="rg-verdict is-win">DESK SURVIVOR</p>
                <p className="rg-big" style={{ fontSize: "clamp(30px,6vw,46px)" }}>
                  몬스터 서바이벌
                </p>
                <p className="rg-sub">책상 매트 위 키캡 기사가 먼지벌레 · 케이블뱀 · 커피슬라임 떼를 3분 동안 버팁니다. 공격은 자동, 당신은 피하고 성장만.</p>
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
                    {" 이동 · 키캡 탄은 가장 가까운 적에게 자동 발사"}
                  </li>
                  <li>
                    {"레벨업하면 세계가 멈춥니다 — "}
                    <kbd>1</kbd>
                    <kbd>2</kbd>
                    <kbd>3</kbd>
                    {" 또는 카드를 눌러 강화 선택"}
                  </li>
                  <li>휴대폰: 화면 아무 데나 누른 채 끌면 가상 조이스틱</li>
                  <li>
                    {"60초 · 120초 "}
                    <b style={{ color: "#ffd23c" }}>정예</b>
                    {", 150초 보스 "}
                    <b style={{ color: "#ff4d5e" }}>먼지 대왕</b>
                    {" · 처치 +3,000 · 3분 생존 +2,000"}
                  </li>
                </ul>
                <div className="rg-acts">
                  <button type="button" className="rg-start">
                    {"시작 "}
                    <kbd>Enter</kbd>
                  </button>
                  <Link className="rg-ghost" href="/game/ranking?game=survival">
                    랭킹
                  </Link>
                </div>
                <p className="rg-login">
                  <Link href="/login?next=/game/survival">로그인</Link>하면 기록이 랭킹에 오르고 골드를 받습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="gl-note">
          점수는 서버가 입력 기록으로 같은 3분을 다시 돌려 확정합니다. 게임 골드는 쇼핑몰 적립금과 별개이며 현금 · 상품으로 바꿀 수 없습니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
