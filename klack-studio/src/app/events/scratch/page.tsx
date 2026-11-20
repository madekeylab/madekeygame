import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = { title: "포인트 복권" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-7", "events"]} />
      <Band />
      <main className="page shop-main">
        <header className="ph">
          <div className="ph-main">
            <p className="eyebrow">Point Event</p>
            <h1 className="ph-title">오늘의 스크래치</h1>
            <p className="ph-desc">하루 한 번은 무료, 그 뒤로는 300P 로 4번 더. 당첨 포인트는 바로 적립되고 다음 주문에서 현금처럼 쓸 수 있습니다.</p>
          </div>
          <ul className="ph-stats" aria-label="요약">
            <li>
              <b>매일 1회</b>
              <span>무료 참여</span>
            </li>
            <li>
              <b>30,000P</b>
              <span>최고 당첨</span>
            </li>
          </ul>
        </header>
        <ul className="ph-benefits" aria-label="이용 혜택">
          <li>
            <Link href="/inspection">
              <i>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="7" width="18" height="11" rx="2" />
                  <path d="m9 12.5 2 2 4-4" />
                </svg>
              </i>
              <span>
                <b>공방 타건 검수 후 출고</b>
                <small>조립 · 윤활 · 전 키 타건 확인</small>
              </span>
            </Link>
          </li>
          <li>
            <Link href="/guide#delivery">
              <i>
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
                  <circle cx="7" cy="18" r="1.6" />
                  <circle cx="17" cy="18" r="1.6" />
                </svg>
              </i>
              <span>
                <b>3만원 이상 무료배송</b>
                <small>택배 출고 · 제주·도서산간 별도</small>
              </span>
            </Link>
          </li>
          <li>
            <Link href="/membership">
              <i>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                  <path d="M12 3l3 5 5 1-4 4 1 6-5-3-5 3 1-6-4-4 5-1z" />
                </svg>
              </i>
              <span>
                <b>등급별 포인트 적립</b>
                <small>판매가는 모두 같고 적립으로 돌려드림</small>
              </span>
            </Link>
          </li>
          <li>
            <Link href="/support">
              <i>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
                  <path d="M4 5h16v11H9l-5 4z" />
                </svg>
              </i>
              <span>
                <b>구성 · 타건감 1:1 상담</b>
                <small>스위치 · 키캡 조합 함께 고민</small>
              </span>
            </Link>
          </li>
        </ul>
        <div className="sc-wrap">
          <section className="sc-main card" aria-label="스크래치 카드">
            <div className="sc-login">
              <p className="eyebrow">Members only</p>
              <h2>로그인하고 오늘의 무료 복권을 긁어보세요</h2>
              <p>카카오·네이버로 3초면 시작합니다. 가입 즉시 무료 1회가 열립니다.</p>
              <Link className="crt-btn crt-btn-primary" href="/login?next=%2Fevents%2Fscratch">
                로그인하고 참여하기
              </Link>
            </div>
          </section>
          <aside className="sc-side">
            <section className="card sc-panel" aria-labelledby="sc-prizes">
              <h3 id="sc-prizes">당첨 포인트</h3>
              <ul className="sc-prizes">
                <li className="is-big">
                  <b>30,000P</b>
                </li>
                <li className="is-big">
                  <b>5,000P</b>
                </li>
                <li className="">
                  <b>1,000P</b>
                </li>
                <li className="">
                  <b>300P</b>
                </li>
                <li className="">
                  <b>100P</b>
                </li>
              </ul>
              <p className="sc-note">꽝도 있습니다. 당첨 포인트는 즉시 적립되며 유효기간 없이 다음 주문에서 사용할 수 있습니다.</p>
            </section>
            <section className="card sc-panel" aria-labelledby="sc-wins">
              <h3 id="sc-wins">최근 당첨</h3>
              <p className="sc-note">아직 당첨자가 없습니다. 첫 번째 주인공이 되어 보세요.</p>
            </section>
          </aside>
        </div>
      </main>
      <Tail />
    </>
  );
}
