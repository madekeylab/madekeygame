import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import ProductCard from "@/components/ProductCard";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import { card } from "@/lib/cards";

export const metadata: Metadata = { title: "배송 진행 현황" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "order", "shop-7", "order-2", "shop"]} />
      <Band />
      <main className="page shop-main">
        <header className="ph has-wide-steps">
          <div className="ph-main">
            <p className="eyebrow">Delivery</p>
            <h1 className="ph-title">배송 진행 현황</h1>
            <p className="ph-desc">내 키보드가 지금 어디까지 왔는지 — 제작 · 검수 · 출고 단계와 다음 단계를 한눈에 보여드립니다.</p>
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
              <Link href="/order">
                <b>주문번호로 ›</b>
                <span>주문 조회</span>
              </Link>
            </li>
            <li>
              <Link href="/mypage">
                <b>내 주문 ›</b>
                <span>마이페이지</span>
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
        <section className="sec trk-mine" aria-labelledby="trk-mine">
          <div className="sec-h">
            <div>
              <p className="eyebrow">My Orders</p>
              <h2 id="trk-mine">내 주문 진행</h2>
              <p className="trk-sub">
                {"로그인하면 내 주문이 여기에 모입니다. "}
                <Link href="/login?next=/order/track">로그인</Link>
                {" · 비회원 주문은 "}
                <Link href="/order">주문번호 조회</Link>
              </p>
            </div>
          </div>
        </section>
        <section className="sec trk-process" aria-labelledby="trk-p">
          <div className="sec-h">
            <div>
              <p className="eyebrow">Process</p>
              <h2 id="trk-p">6단계로 보여드립니다</h2>
            </div>
            <p className="trk-note">
              {"단계 이름보다 "}
              <b>"내 키보드가 지금 어디까지 왔고 언제 도착하는지"</b>
              {"가 보이는 것이 핵심입니다. 주문 제작 상품은 "}
              <b>제작·타건 검수</b>
              {" 단계가 제작 기간만큼 걸립니다."}
            </p>
          </div>
          <ol className="trk-steps">
            <li>
              <span className="trk-no">01</span>
              <b>주문접수</b>
              <p>주문이 접수되었습니다. 결제 확인을 기다립니다.</p>
            </li>
            <li>
              <span className="trk-no">02</span>
              <b>결제확인</b>
              <p>결제가 확인되었습니다. 구성이 확정되어 제작을 준비합니다.</p>
            </li>
            <li>
              <span className="trk-no">03</span>
              <b>제작·타건 검수</b>
              <p>공방에서 조립 · 윤활 · 타건 검수를 진행합니다. 주문 제작 상품은 이 단계가 제작 기간만큼 걸립니다.</p>
            </li>
            <li>
              <span className="trk-no">04</span>
              <b>출고</b>
              <p>타건 검수를 마치고 출고되었습니다. 포장 상태와 구성품을 확인해 보냈습니다.</p>
            </li>
            <li>
              <span className="trk-no">05</span>
              <b>배송중</b>
              <p>택배로 배송 중입니다. 보통 1~2일 안에 도착합니다.</p>
            </li>
            <li>
              <span className="trk-no">06</span>
              <b>배송완료</b>
              <p>배송이 완료되었습니다. 파손·오배송은 7일 이내에 알려 주세요.</p>
            </li>
          </ol>
        </section>
        <section className="sec trk-board" aria-labelledby="trk-b">
          <div className="sec-h">
            <div>
              <p className="eyebrow">Live Tracking</p>
              <h2 id="trk-b">지금 진행 중인 고객 주문</h2>
              <p className="trk-sub">
                {"회원은 "}
                <Link href="/mypage">마이페이지</Link>
                {"에서 내 주문만 모아 볼 수 있고, 비회원은 "}
                <Link href="/order">주문번호 조회</Link>로 확인합니다. 아래는 지금 진행 중인 주문의 현재 위치입니다(닉네임 마스킹).
              </p>
            </div>
            <div className="trk-filters" role="tablist">
              <button type="button" role="tab" aria-selected="true">
                전체 0
              </button>
              <button type="button" role="tab" aria-selected="false">
                진행 중 0
              </button>
              <button type="button" role="tab" aria-selected="false">
                배송완료 0
              </button>
            </div>
          </div>
          <p className="lst-empty">표시할 주문이 없습니다.</p>
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
