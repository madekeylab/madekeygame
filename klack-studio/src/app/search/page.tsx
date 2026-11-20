import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import { ChipBar, Grid, Pager } from "@/components/shop/ListingParts";
import { productsInCategory, searchProducts } from "@/lib/catalog";
import { listing, type ListQuery } from "@/lib/listing";
import { NAV_AXES } from "@/lib/site";

export const metadata: Metadata = { title: "검색" };

/** 분류 바로가기 칩 — 상품이 많은 분류부터 */
function CategoryChips({ title }: { title: string }) {
  const cats = NAV_AXES.map((a) => ({ ...a, count: productsInCategory(a.slug).length })).sort((a, b) => b.count - a.count);
  return (
    <section className="fl-filters" aria-labelledby="sp-cats" style={{ marginTop: "var(--gap-5)" }}>
      <p className="fl-sub" id="sp-cats" style={{ margin: "0" }}>
        {title}
      </p>
      <div className="fl-chips">
        <Link className="fl-chip" href="/category/all">
          전체상품
        </Link>
        {cats.map((c) => (
          <Link key={c.slug} className="fl-chip" href={`/category/${c.slug}`}>
            {c.label}
            <i>{c.count}</i>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<ListQuery> }) {
  const query = await searchParams;
  const q = (query.q ?? "").trim();
  const l = q ? listing(searchProducts(q), "/search", query, { keep: { q }, defaultSort: "popular" }) : null;
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop"]} />
      <Band />
      <main className="page shop-main">
        {l ? (
          <>
            <header className="fl-head">
              <p className="eyebrow">Search</p>
              <h1>‘{q}’ 검색 결과</h1>
              <p className="fl-sub">상품명 · 소재에서 찾았습니다.</p>
            </header>
            <ChipBar l={l} />
            {l.total > 0 ? (
              <>
                <Grid l={l} />
                <Pager l={l} />
              </>
            ) : (
              <>
                <p className="fl-empty">‘{q}’ 에 해당하는 상품이 없습니다. 스위치 종류(리니어 · 택타일 · 클릭)나 키캡 프로파일(체리 · OEM)로도 찾아보세요.</p>
                <CategoryChips title="분류로 바로가기" />
              </>
            )}
          </>
        ) : (
          <>
            <header className="fl-head">
              <p className="eyebrow">Search</p>
              <h1>검색</h1>
              <p className="fl-sub">상품명 · 소재로 찾으실 수 있습니다. 예: ‘리니어 스위치’, ‘PBT 키캡’, ‘알루미늄 하우징’.</p>
            </header>
            <CategoryChips title="분류로 찾기" />
          </>
        )}
      </main>
      <Tail />
    </>
  );
}
