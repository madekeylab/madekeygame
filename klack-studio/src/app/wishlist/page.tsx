import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import ProductCard from "@/components/ProductCard";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import Benefits from "@/components/cart/Benefits";
import PageHead from "@/components/cart/PageHead";
import { toCard } from "@/lib/cards";
import { getWish } from "@/lib/cart-server";
import { getProduct, PRODUCTS, sortProducts } from "@/lib/catalog";
import { won } from "@/lib/format";
import type { Product } from "@/lib/types";

export const metadata: Metadata = { title: "찜한 상품" };

export default async function Page() {
  const ids = await getWish();
  const wished = ids.map(getProduct).filter((p): p is Product => !!p);
  const set = new Set(ids);
  const rec = sortProducts(PRODUCTS, "new")
    .filter((p) => !set.has(p.id))
    .slice(0, 8);
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop", "shop-7"]} />
      <Band />
      <main className="page shop-main">
        <PageHead
          eyebrow="Wishlist"
          title="찜한 상품"
          desc={wished.length ? "마음에 드는 상품은 장바구니로 옮겨 두세요. 로그인하면 다른 기기에서 찜한 것도 함께 보입니다." : "상품 카드의 하트를 누르면 여기에 모입니다. 로그인하면 다른 기기에서 찜한 것도 함께 보입니다."}
        >
          <ul className="ph-stats" aria-label="요약">
            <li>
              <b>{wished.length}개</b>
              <span>찜한 상품</span>
            </li>
            <li>
              <b>{won(wished.reduce((n, p) => n + p.salePrice, 0))}원</b>
              <span>찜 총액</span>
            </li>
            <li>
              <Link href="/cart">
                <b>보기 ›</b>
                <span>장바구니</span>
              </Link>
            </li>
          </ul>
        </PageHead>
        <Benefits />
        {wished.length ? (
          <div className="fl-grid" role="list">
            {wished.map((p) => (
              <ProductCard key={p.id} p={toCard(p)} />
            ))}
          </div>
        ) : (
          <div className="lst-empty v5-empty">
            <svg className="v5-empty-ico" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 53S9 39 9 23a11 11 0 0 1 23-5 11 11 0 0 1 23 5c0 16-23 30-23 30z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            </svg>
            <p className="v5-empty-t">아직 찜한 상품이 없습니다</p>
            <p className="v5-empty-d">상품 카드의 하트를 누르면 여기에 모입니다. 마음에 드는 스위치 · 키캡 · 키보드를 모아 두고 비교해 보세요.</p>
            <div className="v5-empty-act">
              <Link className="v5-btn is-solid" href="/category/all">
                전체상품 보기
              </Link>
              <Link className="v5-btn" href="/ranking">
                베스트
              </Link>
            </div>
          </div>
        )}
        <section className="sec rec-sec" aria-labelledby="rec-h">
          <div className="sec-h">
            <div>
              <p className="eyebrow">New Arrivals</p>
              <h2 id="rec-h">방금 도착한 신상</h2>
            </div>
            <Link className="sec-more" href="/category/all?sort=new">
              신상품 더 보기 ›
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
