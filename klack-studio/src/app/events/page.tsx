import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = { title: "이벤트" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-7", "events-2"]} />
      <Band />
      <main className="page shop-main">
        <header className="ph">
          <div className="ph-main">
            <p className="eyebrow">Events</p>
            <h1 className="ph-title">진행 중인 이벤트</h1>
            <p className="ph-desc">포인트는 다음 주문에서 현금처럼 쓸 수 있습니다. 로그인한 회원에게 적립됩니다.</p>
          </div>
          <ul className="ph-stats" aria-label="요약">
            <li>
              <Link href="/mypage">
                <b>마이페이지 ›</b>
                <span>내 포인트</span>
              </Link>
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
        <section className="sec">
          <ul className="ev-grid">
            <li>
              <Link className="ev-card" href="/events/scratch">
                <span className="ev-badge">매일</span>
                <p className="eyebrow">Daily</p>
                <b>포인트 복권</b>
                <span className="ev-desc">하루 1회 무료 스크래치, 이후 300P 로 4회 더. 당첨 포인트는 바로 적립.</span>
                <span className="ev-go">자세히 보기 ›</span>
              </Link>
            </li>
            <li>
              <Link className="ev-card" href="/events/review">
                <span className="ev-badge">500P</span>
                <p className="eyebrow">Review</p>
                <b>후기 작성 이벤트</b>
                <span className="ev-desc">구매하신 상품의 솔직한 후기를 남겨 주시면 포인트를 드립니다.</span>
                <span className="ev-go">자세히 보기 ›</span>
              </Link>
            </li>
            <li>
              <Link className="ev-card" href="/events/friend">
                <span className="ev-badge">+5,000P</span>
                <p className="eyebrow">Friends</p>
                <b>친구 추천 이벤트</b>
                <span className="ev-desc">내 추천 링크로 가입한 친구가 첫 주문을 결제하면 두 분 모두 포인트를 드립니다.</span>
                <span className="ev-go">자세히 보기 ›</span>
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Tail />
    </>
  );
}
