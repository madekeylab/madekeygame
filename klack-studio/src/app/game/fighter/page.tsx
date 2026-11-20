import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "키보드 격투왕 — 게임랜드",
  description: "살아 움직이는 키캡들의 1:1 격투. 타건사 K 로 ESC 닌자 · 스페이스 바론 · 엔터 골렘을 차례로 꺾으세요.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall", "game-5"]} />
      <Band />
      <main className="page shop-main">
        <p style={{ margin: "18px 0 10px", fontSize: "13px" }}>
          <Link href="/game">‹ 게임랜드</Link>
          {" · "}
          <Link href="/game/ranking?game=fighter">랭킹</Link>
        </p>
        <div className="rg">
          <div className="rg-stage">
            <canvas className="fg-canvas" aria-label="키보드 격투왕 화면" width="1238" height="696" />
            <div className="rg-topbar">
              <button type="button">소리 켜짐</button>
            </div>
            <div className="rg-over">
              <div className="rg-card">
                <p className="rg-verdict is-win">KEYCAP FIGHTER</p>
                <p className="rg-big" style={{ fontSize: "clamp(30px,6vw,46px)" }}>
                  키보드 격투왕
                </p>
                <p className="rg-sub">타건사 K 가 되어 ESC 닌자 · 스페이스 바론 · 엔터 골렘을 차례로 꺾으세요. 경기마다 3판 2선승, 한 번 지면 끝.</p>
                <dl className="fg-guide">
                  <dt>
                    <kbd>←</kbd>
                    <kbd>→</kbd> <kbd>↑</kbd>
                    <kbd>↓</kbd>
                  </dt>
                  <dd>
                    {"이동 · 점프 · 앉기 — "}
                    <b>상대 반대쪽을 누르면 가드</b>(앉아서 막아야 하는 하단 킥 주의)
                  </dd>
                  <dt>
                    <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd>
                  </dt>
                  <dd>약공격(빠름) · 강공격(느리고 띄움) · 킥(길다, 앉으면 하단)</dd>
                  <dt>연계</dt>
                  <dd>
                    {"맞히는 순간 "}
                    <kbd>A</kbd>→<kbd>D</kbd>→<kbd>S</kbd>
                    {" 로 이어 누르면 콤보"}
                  </dd>
                  <dt>
                    <kbd>↓</kbd>
                    <kbd>→</kbd>
                    <kbd>A</kbd>
                  </dt>
                  <dd>타건파 — 날아가는 장풍(재사용 1.5초)</dd>
                  <dt>
                    <kbd>Space</kbd>
                  </dt>
                  <dd>
                    {"게이지가 가득 차면 "}
                    <b>풀 스트로크</b>
                    {" 돌진 필살기"}
                  </dd>
                  <dt>휴대폰</dt>
                  <dd>아래 방향 패드 + A · S · D · SP 버튼</dd>
                </dl>
                <div className="rg-acts">
                  <button type="button" className="rg-start">
                    {"시작 "}
                    <kbd>Enter</kbd>
                  </button>
                  <Link className="rg-ghost" href="/game/ranking?game=fighter">
                    랭킹
                  </Link>
                </div>
                <p className="rg-login">
                  <Link href="/login?next=/game/fighter">로그인</Link>하면 기록이 랭킹에 오르고 골드를 받습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="fg-pads" aria-label="터치 조작">
            <div className="fg-dpad">
              <i className="u">▲</i>
              <i className="d">▼</i>
              <i className="l">◀</i>
              <i className="r">▶</i>
            </div>
            <div className="fg-btns">
              <button type="button" className="fg-btn is-a">
                <span>
                  A<small>약</small>
                </span>
              </button>
              <button type="button" className="fg-btn is-s">
                <span>
                  S<small>강</small>
                </span>
              </button>
              <button type="button" className="fg-btn is-d">
                <span>
                  D<small>킥</small>
                </span>
              </button>
              <button type="button" className="fg-btn is-sp">
                <span>
                  SP<small>필살</small>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="gl-note">
          점수는 서버가 입력 기록으로 같은 대전을 처음부터 다시 돌려 확정합니다. 게임 골드는 쇼핑몰 적립금과 별개이며 현금 · 상품으로 바꿀 수 없습니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
