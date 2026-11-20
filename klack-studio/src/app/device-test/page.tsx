import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "기기테스트",
  description: "키보드 · 마우스 · 컨트롤러 · 모니터 주사율을 브라우저에서 바로 확인하는 무료 기기 테스트.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "device-test"]} />
      <Band />
      <main className="page shop-main">
        <div className="dt">
          <header className="dt-head">
            <p className="dt-eyebrow">Workshop · Device Test</p>
            <h1>기기테스트</h1>
            <p>
              키보드 · 마우스 · 컨트롤러 · 모니터가 제대로 동작하는지 브라우저에서 바로 확인하세요. 설치 · 로그인 없이 쓸 수 있고, 입력 내용은 어디에도 저장되지
              않습니다.
            </p>
          </header>
          <nav aria-label="기기테스트 종류">
            <ul className="dt-tabs">
              <li>
                <Link aria-current="page" href="/device-test">
                  전체
                </Link>
              </li>
              <li>
                <Link href="/device-test/keyboard">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
                  </svg>
                  키보드 테스트
                </Link>
              </li>
              <li>
                <Link href="/device-test/mouse">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="6" y="3" width="12" height="18" rx="6" />
                    <path d="M12 7v4" />
                  </svg>
                  마우스 테스트
                </Link>
              </li>
              <li>
                <Link href="/device-test/controller">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 8h10a4 4 0 0 1 4 4l.5 4a2.5 2.5 0 0 1-4.6 1.4L15.5 15h-7l-1.4 2.4A2.5 2.5 0 0 1 2.5 16L3 12a4 4 0 0 1 4-4z" />
                    <path d="M7 11v3M5.5 12.5h3M16 12h.01M18 11h.01" />
                  </svg>
                  컨트롤러 테스트
                </Link>
              </li>
              <li>
                <Link href="/device-test/refresh-rate">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="12" rx="2" />
                    <path d="M8 20h8M6 12l2.5-4 2.5 4 2.5-4 2.5 4" />
                  </svg>
                  주사율 테스트
                </Link>
              </li>
            </ul>
          </nav>
          <div className="dt-hub">
            <Link className="dt-card" href="/device-test/keyboard">
              <i>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="2" y="6" width="20" height="12" rx="2" />
                  <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
                </svg>
              </i>
              <b>키보드 테스트</b>
              <p>눌린 키를 자판 위에 표시하고 동시 입력(롤오버) · 채터링 의심 입력을 확인합니다.</p>
              <span>테스트 시작 →</span>
            </Link>
            <Link className="dt-card" href="/device-test/mouse">
              <i>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="6" y="3" width="12" height="18" rx="6" />
                  <path d="M12 7v4" />
                </svg>
              </i>
              <b>마우스 테스트</b>
              <p>5개 버튼 · 휠 · 더블클릭 간격 · 폴링 레이트를 확인합니다.</p>
              <span>테스트 시작 →</span>
            </Link>
            <Link className="dt-card" href="/device-test/controller">
              <i>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 8h10a4 4 0 0 1 4 4l.5 4a2.5 2.5 0 0 1-4.6 1.4L15.5 15h-7l-1.4 2.4A2.5 2.5 0 0 1 2.5 16L3 12a4 4 0 0 1 4-4z" />
                  <path d="M7 11v3M5.5 12.5h3M16 12h.01M18 11h.01" />
                </svg>
              </i>
              <b>컨트롤러 테스트</b>
              <p>게임패드 버튼 · 스틱 · 트리거 값과 진동, 스틱 드리프트를 확인합니다.</p>
              <span>테스트 시작 →</span>
            </Link>
            <Link className="dt-card" href="/device-test/refresh-rate">
              <i>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M8 20h8M6 12l2.5-4 2.5 4 2.5-4 2.5 4" />
                </svg>
              </i>
              <b>주사율 테스트</b>
              <p>모니터가 실제로 몇 Hz 로 그려지는지 측정하고 움직임을 비교합니다.</p>
              <span>테스트 시작 →</span>
            </Link>
          </div>
          <div className="panel help" style={{ marginTop: "16px" }}>
            <h2>이럴 때 써 보세요</h2>
            <ul>
              <li>새로 산 키보드 · 마우스가 모든 키 · 버튼을 제대로 인식하는지 확인할 때</li>
              <li>한 번 눌렀는데 두 번 입력되는 채터링이 의심될 때 — 클랙 공방에서 스위치 교체 · 타건 검수를 받을 수 있습니다.</li>
              <li>게임패드 스틱 쏠림(드리프트)이나 모니터가 제 주사율로 나오는지 확인할 때</li>
            </ul>
          </div>
        </div>
      </main>
      <Tail />
    </>
  );
}
