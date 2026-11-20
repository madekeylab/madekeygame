import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "게임랜드",
  description:
    "키보드로 즐기는 아케이드 7종 — RPM 레이싱, 우주 슈팅왕, 리듬 타건왕, 버블 몬스터, 블록 퍼즐왕, 몬스터 서바이벌, 키보드 격투왕. 매일 · 매주 · 매달 챔피언에 도전하세요.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall"]} />
      <Band />
      <main className="page shop-main">
        <section className="gl-hero">
          <p className="gl-eyebrow">KLACK GAME LAND</p>
          <h1>
            키보드로 즐기는
            <br />
            <span>아케이드</span>
          </h1>
          <p className="gl-lead">살 키보드가 없어도 괜찮아요. 키 하나의 타이밍으로 승부하는 게임들 — 매일 · 매주 · 매달 챔피언이 바뀝니다.</p>
          <div className="gl-cta">
            <Link className="rg-start" style={{ height: "50px" }} href="/game/rpm">
              RPM 레이싱
            </Link>
            <Link className="rg-ghost" style={{ height: "50px" }} href="/game/shooter">
              우주 슈팅왕
            </Link>
            <Link className="rg-ghost" style={{ height: "50px" }} href="/game/rhythm">
              리듬 타건왕
            </Link>
          </div>
        </section>
        <div className="gl-grid">
          <Link
            className="gl-card is-main"
            style={
              {
                "--art":
                  "radial-gradient(60% 90% at 80% 30%,#ff2d7a 0%,transparent 55%),radial-gradient(50% 70% at 15% 90%,#4ff7ff66,transparent 60%),repeating-linear-gradient(100deg,transparent 0 46px,rgba(255,214,60,.2) 46px 52px),linear-gradient(180deg,#1a1030,#07070c)",
              } as CSSProperties
            }
            href="/game/rpm"
          >
            <span className="gl-badge">PLAY · 대표 게임</span>
            <b>RPM 레이싱 챔피언</b>
            <p>키 하나로 변속하고, 부스터 존에서 니트로. 맵 5종 · 400m 드래그 · 4km 하이웨이 · 상대 리그 D~S · 차고와 튜닝.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}맵 5종 · 차량 5종 · 튜닝 6종</span>
          </Link>
          <Link
            className="gl-card"
            style={
              {
                "--art": "radial-gradient(60% 80% at 70% 20%,#2d4bff 0%,transparent 60%),radial-gradient(40% 50% at 20% 80%,#ff2d7a55,transparent),#05061a",
              } as CSSProperties
            }
            href="/game/shooter"
          >
            <span className="gl-badge">PLAY · NEW</span>
            <b>우주 슈팅왕</b>
            <p>60초 동안 격추! 연속 격추 배율 ×5, 45초에 보스.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}1분 챌린지</span>
          </Link>
          <Link
            className="gl-card"
            style={
              {
                "--art":
                  "repeating-linear-gradient(90deg,#ff2d7a22 0 2px,transparent 2px 40px),radial-gradient(70% 70% at 50% 100%,#ff2d7a 0%,transparent 60%),#12051a",
              } as CSSProperties
            }
            href="/game/rhythm"
          >
            <span className="gl-badge">PLAY · NEW</span>
            <b>리듬 타건왕</b>
            <p>D F J K 로 박자를 맞추는 리듬 게임. 곡 3개 · 정확도 · 풀콤보.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}곡 3개 · ★~★★★</span>
          </Link>
          <Link
            className="gl-card is-span2"
            style={
              {
                "--art":
                  "linear-gradient(115deg,transparent 40%,#46c8ff22 41%,transparent 43%,transparent 60%,#ffcf4a22 61%,transparent 63%),radial-gradient(60% 80% at 80% 20%,#3a1a7a 0%,transparent 60%),radial-gradient(50% 60% at 10% 90%,#46c8ff44,transparent),#05070d",
              } as CSSProperties
            }
            href="/game/formula"
          >
            <span className="gl-badge">3D · NEW</span>
            <b>하이퍼 포뮬러</b>
            <p>AI 내비 NOVA 와 달리는 3D 미래형 포뮬러. 직선은 스트레이트 모드, 코너는 에어로 날개를 펼치는 코너 모드. 부스트 · 슬립스트림 · 코스별 미션.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}코스 3종 · 8대 · 3랩</span>
          </Link>
          <Link
            className="gl-card"
            style={
              {
                "--art":
                  "radial-gradient(30% 30% at 30% 40%,#4ff7ff88,transparent),radial-gradient(25% 25% at 70% 60%,#b7ff3c66,transparent),radial-gradient(20% 20% at 55% 25%,#ff2d7a55,transparent),#061218",
              } as CSSProperties
            }
            href="/game/bubble"
          >
            <span className="gl-badge">PLAY · NEW</span>
            <b>버블 몬스터</b>
            <p>같은 색 버블 3개를 맞춰 갇힌 키보드 몬스터를 구출하세요. 벽 튕기기 · 콤보 · 천장 하강.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}2분 챌린지</span>
          </Link>
          <Link
            className="gl-card"
            style={
              {
                "--art":
                  "repeating-linear-gradient(0deg,rgba(255,255,255,.06) 0 1px,transparent 1px 34px),repeating-linear-gradient(90deg,rgba(255,255,255,.06) 0 1px,transparent 1px 34px),radial-gradient(60% 70% at 70% 30%,#ffd23c55,transparent),#0d0f1a",
              } as CSSProperties
            }
            href="/game/blocks"
          >
            <span className="gl-badge">PLAY · NEW</span>
            <b>블록 퍼즐왕</b>
            <p>키캡 블록을 8×8 보강판에 끼워 가로 · 세로 줄을 완성하세요. 회전 가능 · 연속 정렬 배율.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}2분 챌린지</span>
          </Link>
          <Link
            className="gl-card"
            style={
              {
                "--art":
                  "radial-gradient(40% 50% at 50% 60%,#b7ff3c33,transparent),radial-gradient(80% 60% at 50% 120%,#ff4d5e55,transparent),linear-gradient(160deg,#1a2410,#0b0b12 70%)",
              } as CSSProperties
            }
            href="/game/survival"
          >
            <span className="gl-badge">PLAY · NEW</span>
            <b>몬스터 서바이벌</b>
            <p>책상 위로 몰려오는 먼지벌레 떼에서 3분 버티기. 레벨업마다 능력 3택 1, 150초에 보스.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}3분 생존</span>
          </Link>
          <Link
            className="gl-card is-span2"
            style={
              {
                "--art":
                  "radial-gradient(60% 80% at 20% 30%,#ff4d5e66,transparent),radial-gradient(60% 80% at 80% 70%,#4ff7ff44,transparent),linear-gradient(160deg,#3a0d0d,#0b0b12 70%)",
              } as CSSProperties
            }
            href="/game/fighter"
          >
            <span className="gl-badge">PLAY · NEW</span>
            <b>키보드 격투왕</b>
            <p>살아 있는 키캡끼리 1:1 대결. ESC 닌자 · 스페이스 바론 · 엔터 골렘을 차례로 꺾어라.</p>
            <span className="gl-play">{"▶ 지금 하기 · "}3인 래더</span>
          </Link>
          <a
            href="https://apexmeridian.starplan.one/"
            target="_blank"
            rel="noopener noreferrer"
            className="gl-card"
            style={
              {
                "--art":
                  "linear-gradient(105deg,transparent 46%,rgba(255,176,32,.28) 47%,transparent 50%),radial-gradient(70% 90% at 85% 15%,#b8590f 0%,transparent 58%),radial-gradient(50% 60% at 10% 95%,#1546b866,transparent),#090b10",
              } as CSSProperties
            }
          >
            <span className="gl-badge">3D · 새 창</span>
            <b>APEX MERIDIAN</b>
            <p>리얼 지향 서킷 레이싱. 가상의 차량 27대와 서킷 8곳, 튜닝·세팅, 날씨와 피트 전략, 온라인 순위표.</p>
            <span className="gl-play">▶ 새 창에서 열기 · 차량 27대 · 서킷 8곳</span>
          </a>
        </div>
        <div className="gl-sec">
          <h2>이번 주 챔피언</h2>
          <Link href="/game/ranking">전체 랭킹 ›</Link>
        </div>
        <div className="gl-rank is-3">
          <section className="gl-box">
            <h3>RPM 400m · 네온 시티 · 스톡</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="gl-box">
            <h3>우주 슈팅왕 · 60초</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="gl-box">
            <h3>리듬 타건왕 · 네온 드라이브</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
        </div>
        <div className="gl-rank is-4" style={{ marginTop: "14px" }}>
          <section className="gl-box">
            <h3>버블 몬스터</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="gl-box">
            <h3>블록 퍼즐왕</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="gl-box">
            <h3>몬스터 서바이벌</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="gl-box">
            <h3>키보드 격투왕</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
        </div>
        <div className="gl-rank is-3" style={{ marginTop: "14px" }}>
          <section className="gl-box">
            <h3>하이퍼 포뮬러 · 네오 시티</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="gl-box">
            <h3>하이퍼 포뮬러 · 선셋 하버</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="gl-box">
            <h3>하이퍼 포뮬러 · 레드 캐니언</h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
        </div>
        <p className="gl-note">
          게임 골드는 모든 게임에서 모이며(하루 3,000 상한) RPM 레이싱 차량 · 튜닝에 씁니다. 쇼핑몰 적립금과 별개이고 현금이나 상품으로 바꿀 수 없습니다. 랭킹은
          서버가 입력 기록으로 다시 계산해 확인한 기록만 오릅니다. <Link href="/login?next=/game">로그인</Link>하면 기록이 랭킹에 오릅니다.
        </p>
      </main>
      <Tail />
    </>
  );
}
