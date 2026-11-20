import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = { title: "게임랜드 랭킹" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall"]} />
      <Band />
      <main className="page shop-main">
        <section className="gl-hero" style={{ padding: "clamp(20px,3vw,36px)" }}>
          <p className="gl-eyebrow">{"RANKING · "}RPM 400m · 네온 시티 · 스톡(공식)</p>
          <h1 style={{ fontSize: "clamp(28px,4.4vw,46px)" }}>
            이번 주{"의 "}
            <span>챔피언</span>
          </h1>
          <p className="gl-lead">회원별 최고 기록입니다. 서버가 입력 기록으로 다시 계산해 확인한 공식 기록만 오릅니다.</p>
          <div className="gl-cta">
            <Link className="rg-start" style={{ height: "46px" }} href="/game/rpm">
              도전하기
            </Link>
          </div>
        </section>
        <nav className="gl-tabs" aria-label="게임">
          <Link aria-current="page" href={"/game/ranking?game=rpm&period=week"}>
            RPM 레이싱
          </Link>
          <Link href={"/game/ranking?game=shooter&period=week"}>우주 슈팅왕</Link>
          <Link href={"/game/ranking?game=rhythm&period=week"}>리듬 타건왕</Link>
          <Link href={"/game/ranking?game=bubble&period=week"}>버블 몬스터</Link>
          <Link href={"/game/ranking?game=blocks&period=week"}>블록 퍼즐왕</Link>
          <Link href={"/game/ranking?game=survival&period=week"}>몬스터 서바이벌</Link>
          <Link href={"/game/ranking?game=fighter&period=week"}>키보드 격투왕</Link>
          <Link href={"/game/ranking?game=formula&period=week"}>하이퍼 포뮬러</Link>
        </nav>
        <nav className="gl-tabs" aria-label="기간">
          <Link href={"/game/ranking?game=rpm&period=day&mode=400m&map=city&reg=stock"}>오늘</Link>
          <Link aria-current="page" href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock"}>
            이번 주
          </Link>
          <Link href={"/game/ranking?game=rpm&period=month&mode=400m&map=city&reg=stock"}>이번 달</Link>
          <Link href={"/game/ranking?game=rpm&period=all&mode=400m&map=city&reg=stock"}>전체</Link>
        </nav>
        <nav className="gl-tabs" aria-label="모드">
          <Link aria-current="page" href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock"}>
            400m 드래그
          </Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=4km&map=city&reg=stock"}>4km 하이웨이</Link>
          <Link aria-current="page" href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock"}>
            스톡 · 공식
          </Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=tuned"}>튜닝 · 자유</Link>
        </nav>
        <nav className="gl-tabs" aria-label="맵">
          <Link aria-current="page" href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock"}>
            네온 시티
          </Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=coast&reg=stock"}>선셋 코스트</Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=desert&reg=stock"}>데저트 하이웨이</Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=harbor&reg=stock"}>레인 하버</Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=alpine&reg=stock"}>알파인 패스</Link>
        </nav>
        <nav className="gl-tabs" aria-label="차량">
          <Link aria-current="page" href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock"}>
            전체 차량
          </Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock&car=mono-c1"}>D{" · "}모노 C1</Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock&car=vector-gt"}>C{" · "}벡터 GT</Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock&car=carbon-rs"}>B{" · "}카본 RS</Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock&car=titan-v8"}>A{" · "}타이탄 V8</Link>
          <Link href={"/game/ranking?game=rpm&period=week&mode=400m&map=city&reg=stock&car=strato-s"}>S{" · "}스트라토 S</Link>
        </nav>
        <section className="gl-box">
          <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
        </section>
        <p className="gl-note">게임 랭킹에는 경품을 걸지 않습니다(명예 · 배지만). 월간 RPM 챔피언은 명예의 전당에 남습니다.</p>
      </main>
      <Tail />
    </>
  );
}
