import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import ProductCard from "@/components/ProductCard";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import Benefits from "@/components/cart/Benefits";
import CartPage from "@/components/cart/CartPage";
import PageHead from "@/components/cart/PageHead";
import { toCard } from "@/lib/cards";
import { getCart } from "@/lib/cart-server";
import { PRODUCTS, sortProducts } from "@/lib/catalog";
import { won } from "@/lib/format";
import { FREE_SHIP_OVER, shipFee } from "@/lib/order";

export const metadata: Metadata = { title: "장바구니" };

export default async function Page() {
  const { data, plan } = await getCart();
  const count = data.lines.length;
  const pay = data.summary.totalPay;
  const total = pay + (count ? shipFee(plan.productShipFee, pay) : 0);
  const desc = !count
    ? "담아 둔 상품이 주문 전까지 여기에 보관됩니다. 로그인하면 다른 기기에서도 이어서 볼 수 있습니다."
    : pay >= FREE_SHIP_OVER
      ? "배송비 무료 조건을 채웠습니다. 주문서에서 결제 수단과 배송지를 입력해 주세요."
      : `${won(FREE_SHIP_OVER - pay)}원 더 담으면 배송비가 무료입니다. 주문서에서 결제 수단과 배송지를 입력해 주세요.`;
  const inCart = new Set(data.lines.map((l) => l.productId));
  const rec = sortProducts(PRODUCTS, "popular")
    .filter((p) => !inCart.has(p.id))
    .slice(0, 8);
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "core-7", "shop-7", "shop"]} />
      <Band />
      <main className="page shop-main">
        <PageHead eyebrow="Shopping Bag" title="장바구니" desc={desc} step={1}>
          <ul className="ph-stats" aria-label="요약">
            <li>
              <b>{count}개</b>
              <span>담긴 상품</span>
            </li>
            <li>
              <b>{won(total)}원</b>
              <span>결제 예정</span>
            </li>
            <li>
              <Link href="/wishlist">
                <b>찜 목록 ›</b>
                <span>찜한 상품</span>
              </Link>
            </li>
          </ul>
        </PageHead>
        <Benefits />
        {count ? (
          <CartPage initial={data} plan={plan} />
        ) : (
          <div className="lst-empty v5-empty">
            <svg className="v5-empty-ico" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M10 14h7l6 28h26l6-20H21" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="26" cy="51" r="4" fill="currentColor" />
              <circle cx="46" cy="51" r="4" fill="currentColor" />
            </svg>
            <p className="v5-empty-t">장바구니가 비어 있습니다</p>
            <p className="v5-empty-d">구성을 고른 키보드와 스위치 · 키캡 · 부품을 담아 두면 한 번에 주문하고 함께 받아 보실 수 있습니다.</p>
            <div className="v5-empty-act">
              <Link className="v5-btn is-solid" href="/category/all">
                전체상품 보기
              </Link>
              <Link className="v5-btn" href="/wishlist">
                찜한 상품
              </Link>
            </div>
          </div>
        )}
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
            {rec.map((p) => (
              <ProductCard key={p.id} p={toCard(p)} />
            ))}
          </div>
        </section>
      </main>
      <Tail />
    </>
  );
}
