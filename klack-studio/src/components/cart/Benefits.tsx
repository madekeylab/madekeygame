import Link from "next/link";

/** 장바구니 · 찜 페이지 위쪽의 이용 혜택 띠 */
export default function Benefits() {
  return (
  <ul className="ph-benefits" aria-label="이용 혜택">
    <li>
      <Link href="/inspection">
        <i>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
  );
}
