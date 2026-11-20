import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "버블 몬스터 — 게임랜드",
  description: "키캡 유리병에 갇힌 키보드 몬스터를 구하는 120초 버블 슈팅. 같은 색 3개로 터뜨리고, 끊긴 방울은 떨어뜨려 큰 점수.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall", "game-3"]} />
      <Band />
      <main className="page shop-main">
        <p style={{ margin: "18px 0 10px", fontSize: "13px" }}>
          <Link href="/game">‹ 게임랜드</Link>
          {" · "}
          <Link href="/game/ranking?game=bubble">랭킹</Link>
        </p>
        <div className="rg">
          <div className="rg-stage bb-stage">
            <canvas className="bb-canvas" aria-label="버블 몬스터 화면" />
            <div className="rg-topbar">
              <button type="button">소리 켜짐</button>
            </div>
            <div className="rg-over">
              <div className="rg-card">
                <p className="rg-verdict is-win">BUBBLE MONSTER</p>
                <p className="rg-big" style={{ fontSize: "clamp(30px,6vw,46px)" }}>
                  버블 몬스터
                </p>
                <p className="rg-sub">
                  키캡 유리병에 갇힌 키보드 몬스터들을 구해 주세요. 같은 색 3개 이상이면 터지고, 천장과 끊긴 방울은 우수수 떨어집니다. 120초!
                </p>
                <ul className="rg-keys" style={{ textAlign: "left" }}>
                  <li>
                    <kbd>←</kbd>
                    <kbd>→</kbd>
                    {" 조준(누르고 있기) · "}
                    <kbd>Space</kbd>
                    {" 발사 · "}
                    <kbd>↑</kbd>
                    {" 또는 "}
                    <kbd>X</kbd>
                    {" 다음 방울과 교체"}
                  </li>
                  <li>휴대폰: 아래 버튼, 또는 화면을 끌어 조준하고 손을 떼면 발사 · 오른쪽 아래 다음 방울을 누르면 교체</li>
                  <li>떨어뜨리기 개수² × 20 · 몬스터 구출 +150 · 연속 성공 콤보 최대 ×3 · 판 비우면 웨이브 × 1,000</li>
                  <li>안 터뜨린 발사 8번마다, 그리고 25초마다 천장이 한 줄 내려옵니다. 위험선을 넘으면 끝</li>
                </ul>
                <div className="rg-acts">
                  <button type="button" className="rg-start">
                    {"시작 "}
                    <kbd>Enter</kbd>
                  </button>
                  <Link className="rg-ghost" href="/game/ranking?game=bubble">
                    랭킹
                  </Link>
                </div>
                <p className="rg-login">
                  <Link href="/login?next=/game/bubble">로그인</Link>하면 기록이 랭킹에 오르고 골드를 받습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="bb-pads">
            <button type="button" className="bb-pad " aria-label="◀">
              ◀
            </button>
            <button type="button" className="bb-pad " aria-label="▶">
              ▶
            </button>
            <button type="button" className="bb-pad is-fire" aria-label="발사">
              발사
            </button>
            <button type="button" className="bb-pad is-swap" aria-label="교체">
              교체
            </button>
          </div>
        </div>
        <div className="gl-note">
          점수는 서버가 입력 기록으로 같은 120초를 다시 돌려 확정합니다. 게임 골드는 쇼핑몰 적립금과 별개이며 현금 · 상품으로 바꿀 수 없습니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
