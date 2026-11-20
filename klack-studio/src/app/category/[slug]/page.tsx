import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import FilterSheet from "@/components/shop/FilterSheet";
import { Grid, Pager, PriceFilter } from "@/components/shop/ListingParts";
import { productsInCategory, SORTS } from "@/lib/catalog";
import { listing, type ListQuery } from "@/lib/listing";
import { catHref, NAV_AXES } from "@/lib/site";

const ALL = { slug: "all", label: "전체상품", eyebrow: "All products", desc: "완성형 키보드부터 스위치 · 키캡 · 부품 · 공방 서비스까지 한자리에 모았습니다." };
const TONE: Record<string, string> = { all: "cw1", "custom-built": "cw1", kit: "cw2", switch: "cw3", keycap: "cw4", parts: "cw5", accessory: "ink", service: "white" };
const find = (slug: string) => (slug === "all" ? ALL : NAV_AXES.find((a) => a.slug === slug));

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<ListQuery> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cat = find((await params).slug);
  return cat ? { title: cat.label, description: cat.desc } : {};
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const cat = find(slug);
  if (!cat) notFound();
  const base = catHref(slug);
  const l = listing(productsInCategory(slug), base, await searchParams);
  const applied = l.price ? 1 : 0;

  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "brand-brands-category", "shop"]} />
      <Band />
      <main className="page shop-main">
        <header className={`fl-head kx-lhead v2-lhead is-${TONE[slug] ?? "cw1"}`}>
          <nav className="fl-crumb" aria-label="경로">
            <Link href="/">HOME</Link>
            <span aria-hidden="true">/</span>
            <b>{cat.label}</b>
          </nav>
          <div className="kx-lhead-row">
            <div>
              <p className="v2-pill is-white">{cat.eyebrow}</p>
              <h1>{cat.label}</h1>
              <p className="fl-sub">{cat.desc}</p>
            </div>
            <p className="kx-lhead-count" aria-label={`총 ${l.total}개`}>
              <b>{l.total}</b>
              <span>개 상품</span>
            </p>
          </div>
        </header>
        {slug === "all" && (
          <nav className="fl-tabs" aria-label="하위 카테고리">
            <Link className="fl-tab" aria-current="true" href={catHref("all")}>
              전체
            </Link>
            {NAV_AXES.map((a) => (
              <Link key={a.slug} className="fl-tab" href={catHref(a.slug)}>
                {a.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="kx-shop">
          <aside className="kx-filter" aria-label="상품 필터">
            <p className="kx-filter-h">
              <span>필터</span>
              <b>{applied}개 적용</b>
            </p>
            <PriceFilter l={l} />
            {applied > 0 && (
              <Link className="kx-btn kx-filter-reset" href={base}>
                필터 초기화
              </Link>
            )}
            <dl className="kx-filter-read" aria-hidden="true">
              <div>
                <dt>결과</dt>
                <dd>{l.total}</dd>
              </div>
              <div>
                <dt>페이지</dt>
                <dd>
                  {l.page}/{l.pages}
                </dd>
              </div>
            </dl>
          </aside>
          <div className="kx-shop-main">
            <div className="fl-bar">
              <FilterSheet applied={applied} total={l.total} resetHref={applied ? l.priceHref() : undefined}>
                <PriceFilter l={l} />
              </FilterSheet>
              <p className="fl-total">
                <span>상품</span> <b>{l.total}</b>
              </p>
              <nav className="kx-seg" aria-label="정렬">
                {SORTS.map((s) => (
                  <Link key={s.key} aria-current={l.sort === s.key ? "true" : undefined} href={l.sortHref(s.key)}>
                    {s.label}
                  </Link>
                ))}
              </nav>
            </div>
            {l.total > 0 ? (
              <>
                <Grid l={l} />
                <Pager l={l} />
              </>
            ) : (
              <div className="fl-empty v5-empty">
                <p className="v2-pill is-cw4">결과 없음</p>
                <p className="v5-empty-t">조건에 맞는 상품이 없습니다</p>
                <p className="v5-empty-d">필터를 하나씩 풀어 보세요. 가격대보다 소재 조건이 결과를 더 많이 줄입니다.</p>
                <div className="v5-empty-act">
                  <Link className="v5-btn is-solid" href={base}>
                    필터 해제
                  </Link>
                  <Link className="v5-btn" href="/category/all">
                    전체상품
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Tail />
    </>
  );
}
