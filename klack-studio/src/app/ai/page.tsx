import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "AI 키보드 추천",
  description: "원하는 키감 · 소리 · 무게감을 말하면 클랙 상품 중에서 맞는 키보드와 스위치를 골라 이유와 함께 알려 드립니다.",
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
            <h1 className="ph-title">AI 키보드 추천</h1>
            <p className="ph-desc">‘부드럽고 묵직하고 조용한 키보드’ 처럼 말로 물어보세요. 클랙 상품 안에서 골라 드립니다.</p>
          </div>
        </header>
        <div className="ai-wrap">
          <div className="ai-chat">
            <div className="ai-intro">
              <b>어떤 키보드를 찾고 계세요?</b>
              <p>
                키감(부드러움 · 걸림 · 딸깍), 소리(조용함 · 도각 · 경쾌), 무게감, 쓰는 곳, 예산을 편하게 말해 주세요. 클랙에서 파는 상품 중에서 맞는 것을 골라
                이유와 함께 알려 드립니다.
              </p>
              <div className="ai-chips">
                <button type="button">타격감보다 부드럽고 묵직하면서 조용한 모델 알려주세요</button>
                <button type="button">사무실에서 쓸 저소음 키보드, 예산 20만 원 정도</button>
                <button type="button">도각도각 낮은 소리 나는 75% 키보드 추천해 주세요</button>
                <button type="button">처음 커스텀 키보드를 만들어 보려는데 무엇부터 사야 하나요?</button>
                <button type="button">손가락이 쉽게 피곤해요. 가볍게 눌리는 스위치는?</button>
              </div>
            </div>
            <div />
            <form className="ai-form">
              <textarea maxLength={400} placeholder="예) 조용하고 묵직한 리니어, 75% 배열이면 좋겠어요" aria-label="질문" />
              <button type="submit" disabled>
                물어보기
              </button>
            </form>
          </div>
          <aside className="ai-side">
            <section>
              <h3>이렇게 골라 드려요</h3>
              <ul>
                <li>클랙에서 파는 상품 안에서만 추천합니다.</li>
                <li>상품마다 정리한 키감 · 소리 · 무게감을 근거로 이유를 적습니다.</li>
                <li>딱 맞는 상품이 없으면 솔직하게 말씀드립니다.</li>
              </ul>
            </section>
            <section>
              <h3>직접 들어 보고 싶다면</h3>
              <p>회원들이 올린 실제 타건음을 들어 보세요.</p>
              <Link className="ai-cta" href="/sound">
                타건음 자랑 ›
              </Link>
            </section>
            <section>
              <h3>사진 속 그 키보드</h3>
              <p>해외에서 본 키보드 · 키캡 사진으로 비슷한 상품을 찾아 드립니다.</p>
              <Link className="ai-cta" href="/ai/photo">
                사진으로 찾기 ›
              </Link>
            </section>
            <section>
              <p>
                {"AI 답변은 참고용이며 틀릴 수 있습니다. 정확한 구성 · 호환은 "}
                <Link href="/support">고객센터</Link>에 물어봐 주세요.{" 비회원은 하루 이용 횟수가 적습니다."}
              </p>
            </section>
          </aside>
        </div>
      </main>
      <Tail />
    </>
  );
}
