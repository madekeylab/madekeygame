import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import MouseTester from "@/components/devtest/MouseTester";

export const metadata: Metadata = { title: "마우스 테스트", description: "마우스 5버튼 · 휠 · 더블클릭 간격 · 폴링 레이트를 확인하는 마우스 테스트." };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "device-test"]} />
      <Band />
      <main className="page shop-main">
        <div className="dt">
          <header className="dt-head">
            <p className="dt-eyebrow">Workshop · Device Test</p>
            <h1>마우스 테스트</h1>
            <p>5개 버튼 · 휠 · 더블클릭 간격 · 폴링 레이트를 확인합니다.</p>
          </header>
          <nav aria-label="기기테스트 종류">
            <ul className="dt-tabs">
              <li>
                <Link href="/device-test">전체</Link>
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
                <Link aria-current="page" href="/device-test/mouse">
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
          <MouseTester />
        </div>
      </main>
      <Tail />
    </>
  );
}
