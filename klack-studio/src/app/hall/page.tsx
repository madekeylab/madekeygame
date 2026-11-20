import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "명예의 전당",
  description: "클랙 게임랜드와 커스텀 키보드 대회의 챔피언들 — 월간 RPM 챔피언, 커스텀 대회 수상작, 3회 우승자, 올해의 커스텀 마스터.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "game-hall", "contest-hall-used"]} />
      <Band />
      <main className="page shop-main">
        <section className="ct-hero hf-hero">
          <p className="ct-eyebrow">HALL OF FAME</p>
          <h1>명예의 전당</h1>
          <p className="ct-lead">게임랜드 기록과 커스텀 키보드 대회의 챔피언이 여기에 남습니다. 게임 기록은 서버가 다시 계산해 확인한 공식 기록만 오릅니다.</p>
          <div className="ct-cta">
            <Link className="ct-btn is-gold" href="/game/rpm">
              RPM 레이싱 도전
            </Link>
            <Link className="ct-btn is-line" href="/contest">
              커스텀 대회
            </Link>
          </div>
        </section>
        <h2 className="ct-sec">
          {"지금의 RPM 챔피언 "}
          <small style={{ fontSize: "13px", color: "var(--ink-3)", fontWeight: "500" }}>400m · 네온 시티 · 스톡(공식) · 실시간</small>
        </h2>
        <div className="hf-live">
          <div className="hf-champ">
            <small>오늘의 챔피언</small>
            <b style={{ color: "var(--ink-3)" }}>비어 있음</b>
            <small style={{ marginTop: "4px" }}>
              <Link href="/game/rpm">첫 기록에 도전하기 ›</Link>
            </small>
          </div>
          <div className="hf-champ">
            <small>주간 챔피언</small>
            <b style={{ color: "var(--ink-3)" }}>비어 있음</b>
            <small style={{ marginTop: "4px" }}>
              <Link href="/game/rpm">첫 기록에 도전하기 ›</Link>
            </small>
          </div>
          <div className="hf-champ">
            <small>이달의 RPM 챔피언</small>
            <b style={{ color: "var(--ink-3)" }}>비어 있음</b>
            <small style={{ marginTop: "4px" }}>
              <Link href="/game/rpm">첫 기록에 도전하기 ›</Link>
            </small>
          </div>
        </div>
        <div className="hf-cols" style={{ marginTop: "16px" }}>
          <section className="hf-box">
            <h3>
              {"400m 역대 최고 기록 "}
              <small style={{ color: "var(--ink-3)", fontWeight: "400" }}>네온 시티 · 스톡</small>
            </h3>
            <p className="gl-empty">아직 기록이 없습니다. 첫 번째 챔피언이 되어 보세요.</p>
          </section>
          <section className="hf-box">
            <h3>커스텀 키보드 챔피언(대회 1등)</h3>
            <p className="hf-empty">첫 대회 결과가 발표되면 여기에 오릅니다.</p>
          </section>
        </div>
        <div className="hf-cols" style={{ marginTop: "16px" }}>
          <section className="hf-box">
            <h3>올해(2026)의 커스텀 마스터</h3>
            <p className="hf-empty">결과가 나온 대회가 생기면 점수가 쌓입니다. (1등 10 · 2등 6 · 3등 4 · 특별상 3 · 출품 1)</p>
          </section>
          <section className="hf-box">
            <h3>3회 우승자</h3>
            <p className="hf-empty">대회 1등 · 월간 RPM 1위를 합쳐 세 번 차지하면 이름이 오릅니다.</p>
          </section>
        </div>
        <h2 className="ct-sec">역대 챔피언</h2>
        <div className="hf-cols">
          <section className="hf-box">
            <h3>월간 RPM 챔피언</h3>
            <p className="hf-empty">달이 바뀌면 지난달 1~3위가 자동으로 오릅니다.</p>
          </section>
          <section className="hf-box">
            <h3>커스텀 대회 수상</h3>
            <p className="hf-empty">아직 결과가 발표된 대회가 없습니다.</p>
          </section>
        </div>
        <p className="gl-note">게임 랭킹 · 명예의 전당에는 경품이 걸려 있지 않습니다(명예 · 배지만). 커스텀 대회 예정 경품은 법률 검토 후 확정합니다.</p>
      </main>
      <Tail />
    </>
  );
}
