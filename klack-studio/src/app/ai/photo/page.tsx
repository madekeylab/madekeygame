import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "사진으로 키보드 찾기",
  description: "해외나 다른 곳에서 본 키보드 · 키캡 사진을 올리면 무엇인지 추정하고 비슷한 상품을 찾아 드립니다.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-7", "ai"]} />
      <Band />
      <main className="page shop-main">
        <header className="ph">
          <div className="ph-main">
            <p className="eyebrow">Klack AI</p>
            <h1 className="ph-title">사진으로 찾기</h1>
            <p className="ph-desc">SNS · 해외 매장에서 본 그 키보드, 사진 한 장이면 비슷한 제품을 찾아 드립니다.</p>
          </div>
        </header>
        <div className="ai-wrap">
          <div>
            <div className="ap-drop" role="button" tabIndex={0}>
              <b>키보드 · 키캡 · 스위치 사진 올리기</b>
              <span style={{ color: "var(--ink-3)", fontSize: "14px" }}>눌러서 고르거나 끌어다 놓기 · 8MB 이하 · 사진은 저장하지 않습니다</span>
            </div>
            <input type="file" accept="image/*" hidden />
            <div className="ap-row">
              <input maxLength={200} placeholder="메모(선택) — 예) 일본 매장에서 봤어요, 키캡만 찾고 싶어요" aria-label="메모" defaultValue="" />
              <button type="button" disabled>
                찾아보기
              </button>
            </div>
          </div>
          <aside className="ai-side">
            <section>
              <h3>이렇게 찾아 드려요</h3>
              <ul>
                <li>사진 속 로고 · 배열 · 키캡 모양으로 무엇인지 추정합니다.</li>
                <li>근거가 약하면 ‘비슷한 종류’ 로 알려 드립니다. 한정판 · 공동구매 제품은 정확한 모델을 못 맞힐 수 있어요.</li>
                <li>국내 · 해외 검색 링크와 클랙의 비슷한 상품을 함께 보여 드립니다.</li>
              </ul>
            </section>
            <section>
              <h3>말로 설명하는 게 편하다면</h3>
              <p>원하는 키감 · 소리를 말하면 맞는 상품을 골라 드립니다.</p>
              <Link className="ai-cta" href="/ai">
                AI 키보드 추천 ›
              </Link>
            </section>
            <section>
              <p>사진은 분석에만 쓰고 서버에 저장하지 않습니다. AI 결과는 참고용이며 틀릴 수 있습니다.{" 비회원은 하루 이용 횟수가 적습니다."}</p>
            </section>
          </aside>
        </div>
      </main>
      <Tail />
    </>
  );
}
