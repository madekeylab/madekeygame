import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import ProductCard from "@/components/ProductCard";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import { card } from "@/lib/cards";

export const metadata: Metadata = { title: "주문 조회" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "order", "order-3", "shop-7", "shop"]} />
      <Band />
      <main className="page shop-main">
        <header className="ph has-wide-steps">
          <div className="ph-main">
            <p className="eyebrow">Order</p>
            <h1 className="ph-title">주문 조회</h1>
            <p className="ph-desc">주문번호와 연락처로 진행 상황을 확인하실 수 있습니다. 로그인 회원은 마이페이지에서 주문이 자동으로 모입니다.</p>
          </div>
          <ol className="ph-steps" aria-label="진행 단계">
            <li className="is-todo">
              <span className="ph-step-no">01</span>
              <span className="ph-step-label">주문접수</span>
            </li>
            <li className="is-todo">
              <span className="ph-step-no">02</span>
              <span className="ph-step-label">결제확인</span>
            </li>
            <li className="is-todo">
              <span className="ph-step-no">03</span>
              <span className="ph-step-label">제작·타건 검수</span>
            </li>
            <li className="is-todo">
              <span className="ph-step-no">04</span>
              <span className="ph-step-label">출고</span>
            </li>
            <li className="is-todo">
              <span className="ph-step-no">05</span>
              <span className="ph-step-label">배송중</span>
            </li>
            <li className="is-todo">
              <span className="ph-step-no">06</span>
              <span className="ph-step-label">배송완료</span>
            </li>
          </ol>
          <ul className="ph-stats" aria-label="요약">
            <li>
              <Link href="/mypage">
                <b>내 주문 ›</b>
                <span>마이페이지</span>
              </Link>
            </li>
            <li>
              <Link href="/support">
                <b>문의 ›</b>
                <span>고객센터</span>
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
        <div className="ord-view">
          <section className="ord-lookup">
            <form className="ord-form card" noValidate>
              <label>
                <span>주문번호</span>
                <input placeholder="20260916-0001" inputMode="numeric" autoComplete="off" required name="orderNo" defaultValue="" />
              </label>
              <label>
                <span>연락처</span>
                <input placeholder="010-0000-0000" inputMode="tel" autoComplete="tel" required name="tel" defaultValue="" />
              </label>
              <button type="submit" className="crt-btn crt-btn-primary">
                조회하기
              </button>
              <p className="ord-note">주문 시 입력한 주문자 연락처로 조회합니다. 하이픈은 있어도 없어도 됩니다.</p>
            </form>
          </section>
        </div>
        <section className="sec">
          <div className="sec-h">
            <div>
              <p className="eyebrow">Delivery Steps</p>
              <h2>배송 진행 6단계</h2>
              <p className="ord-steps-sub">주문 제작 상품은 3단계 「제작·타건 검수」가 제작 기간만큼 걸립니다.</p>
            </div>
            <Link className="btn-ghost" href="/order/track">
              진행 현황 보기 ›
            </Link>
          </div>
          <ol className="ord-steps">
            <li title="주문이 접수되었습니다. 결제 확인을 기다립니다.">
              <span className="ord-no">01</span>주문접수
            </li>
            <li title="결제가 확인되었습니다. 구성이 확정되어 제작을 준비합니다.">
              <span className="ord-no">02</span>결제확인
            </li>
            <li title="공방에서 조립 · 윤활 · 타건 검수를 진행합니다. 주문 제작 상품은 이 단계가 제작 기간만큼 걸립니다.">
              <span className="ord-no">03</span>제작·타건 검수
            </li>
            <li title="타건 검수를 마치고 출고되었습니다. 포장 상태와 구성품을 확인해 보냈습니다.">
              <span className="ord-no">04</span>출고
            </li>
            <li title="택배로 배송 중입니다. 보통 1~2일 안에 도착합니다.">
              <span className="ord-no">05</span>배송중
            </li>
            <li title="배송이 완료되었습니다. 파손·오배송은 7일 이내에 알려 주세요.">
              <span className="ord-no">06</span>배송완료
            </li>
          </ol>
        </section>
        <section className="sec rec-sec" aria-labelledby="rec-h">
          <div className="sec-h">
            <div>
              <p className="eyebrow">You may also like</p>
              <h2 id="rec-h">이런 상품은 어떠세요</h2>
            </div>
            <Link className="sec-more" href="/ranking">
              랭킹 더 보기 ›
            </Link>
          </div>
          <div className="fl-grid" role="list">
            <ProductCard p={card(33)} />
            <ProductCard p={card(32)} />
            <ProductCard p={card(31)} />
            <ProductCard p={card(30)} />
            <ProductCard p={card(29)} />
            <ProductCard p={card(28)} />
            <ProductCard p={card(27)} />
            <ProductCard p={card(26)} />
          </div>
        </section>
      </main>
      <Tail />
    </>
  );
}
