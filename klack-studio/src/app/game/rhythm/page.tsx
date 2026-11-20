import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "리듬 타건왕 — 게임랜드",
  description: "D F J K 네 개의 키로 박자를 맞추는 리듬 게임. 곡 3개, 정확도와 콤보로 점수.",
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
          <Link href="/game/ranking?game=rhythm">랭킹</Link>
        </p>
        <div className="rg">
          <div className="rg-stage sh-stage">
            <canvas className="sh-canvas" aria-label="리듬 타건왕 화면" />
            <div className="rg-over">
              <div className="rg-card" style={{ width: "min(620px,100%)" }}>
                <p className="rg-verdict is-win">RHYTHM TYPER</p>
                <p className="rg-big" style={{ fontSize: "clamp(30px,6vw,46px)" }}>
                  리듬 타건왕
                </p>
                <p className="rg-sub">
                  {"떨어지는 노트가 판정선에 닿을 때 "}
                  <kbd>D</kbd> <kbd>F</kbd> <kbd>J</kbd> <kbd>K</kbd>
                  {" 를 누르세요. 휴대폰은 레인을 터치."}
                </p>
                <div className="rh-songs">
                  <button type="button" className="rh-song" aria-pressed="true" style={{ "--sc": "#7fd1ff" } as CSSProperties}>
                    <span className="rh-lv">★☆☆</span>
                    <b>새벽 타건</b>
                    <small>
                      Dawn Keys{" · BPM "}96{" · "}느긋한 로파이 · 입문
                    </small>
                  </button>
                  <button type="button" className="rh-song" aria-pressed="false" style={{ "--sc": "#ff4fd8" } as CSSProperties}>
                    <span className="rh-lv">★★☆</span>
                    <b>네온 드라이브</b>
                    <small>
                      Neon Drive{" · BPM "}124{" · "}신스웨이브 · 보통
                    </small>
                  </button>
                  <button type="button" className="rh-song" aria-pressed="false" style={{ "--sc": "#ffd23c" } as CSSProperties}>
                    <span className="rh-lv">★★★</span>
                    <b>오버클럭</b>
                    <small>
                      Overclock{" · BPM "}150{" · "}빠른 일렉트로 · 어려움
                    </small>
                  </button>
                </div>
                <div className="rh-opts">
                  <label>
                    {"노트 속도 "}
                    <input type="range" min="0.8" max="2.2" step="0.1" defaultValue="1.2" /> <b>1.2×</b>
                  </label>
                  <label title="노트가 소리보다 늦게 보이면 +, 빠르면 -">
                    {"화면 보정 "}
                    <input type="range" min="-150" max="150" step="5" defaultValue="0" /> <b>0ms</b>
                  </label>
                </div>
                <div className="rg-acts">
                  <button type="button" className="rg-start">
                    {"시작 "}
                    <kbd>Enter</kbd>
                  </button>
                  <Link className="rg-ghost" href={"/game/ranking?game=rhythm&mode=lofi"}>
                    랭킹
                  </Link>
                </div>
                <p className="rg-sub" style={{ fontSize: "12px" }}>
                  소리가 납니다. 이어폰을 쓰면 박자 맞추기가 쉽습니다. 블루투스 이어폰은 지연이 있어 ‘화면 보정’을 +로 올려 보세요.
                </p>
                <p className="rg-login">
                  <Link href="/login?next=/game/rhythm">로그인</Link>하면 기록이 랭킹에 오르고 골드를 받습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="gl-note">
          곡은 브라우저가 직접 합성합니다. 판정은 서버가 입력 기록으로 다시 계산해 확정합니다. 게임 골드는 쇼핑몰 적립금과 별개입니다.
        </div>
      </main>
      <Tail />
    </>
  );
}
