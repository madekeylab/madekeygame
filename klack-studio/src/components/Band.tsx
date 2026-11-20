import Link from "next/link";

/** 본문 위 안내 띠 */
export default function Band() {
  return (
    <div className="page slot-band">
      <aside className="gband" aria-label="배송 안내">
        <ul className="gband-list">
          <li>
            <b>주문 제작 · 타건 검수 후 출고</b>
            <span>제작 기간과 배송비는 상품 상세와 주문서에서 확인할 수 있습니다</span>
          </li>
        </ul>
        <Link className="gband-more" href="/guide">
          제작 가이드 ›
        </Link>
      </aside>
    </div>
  );
}
