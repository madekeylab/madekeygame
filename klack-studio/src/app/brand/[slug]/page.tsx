import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import Thumb from "@/components/Thumb";
import { ChipBar, Grid, Pager } from "@/components/shop/ListingParts";
import { MAKERS, PRODUCTS } from "@/lib/catalog";
import { listing, type ListQuery } from "@/lib/listing";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<ListQuery> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const m = MAKERS.find((m) => m.slug === slug);
  return m ? { title: `${m.nameKo} 제조사` } : {};
}

export default async function BrandPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const maker = MAKERS.find((m) => m.slug === slug);
  if (!maker) notFound();
  const l = listing(
    PRODUCTS.filter((p) => p.maker?.slug === slug),
    `/brand/${slug}`,
    await searchParams,
    { defaultSort: "popular" },
  );
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop", "brand-brands", "brand-brands-category"]} />
      <Band />
      <main className="page shop-main">
        <nav className="bd-crumb" aria-label="경로">
          <Link aria-label="홈" href="/">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/brands">제조사 · 시리즈</Link>
          <span aria-hidden="true">›</span>
          <b>{maker.nameKo}</b>
        </nav>
        <header className="mk-head">
          <div className="mk-head-shot">
            <Thumb src={null} alt={`${maker.nameKo} 작업 사진`} name={maker.nameKo} ratio="wide" priority sizes="(max-width:760px) 100vw, 320px" />
          </div>
          <div className="mk-head-t">
            <h1 className="mk-title">
              {maker.nameKo}
              <small>{maker.nameEn}</small>
            </h1>
            <p className="mk-lead">클랙스튜디오는 클랙스튜디오가 직접 운영하는 자사 제조 라인입니다. 치수 변경·주문제작 상담이 가장 빠른 곳입니다.</p>
            <ul className="mk-chips">
              <li>자사 제조</li>
              <li>품질보증 1년(12개월)</li>
              <li>재고 출고</li>
            </ul>
            <dl className="mk-spec">
              <div>
                <dt>품질보증</dt>
                <dd>1년(12개월)</dd>
              </div>
              <div>
                <dt>제작 납기</dt>
                <dd>재고 출고</dd>
              </div>
              <div>
                <dt>상품</dt>
                <dd>{maker.count}개</dd>
              </div>
            </dl>
            <div className="mk-links">
              {maker.categories.map((c) => (
                <Link key={c.slug} className="mk-link" href={`/category/${c.slug}`}>
                  {c.label}
                  <i>{c.count}</i>
                </Link>
              ))}
            </div>
          </div>
        </header>
        <section aria-labelledby="mk-items-t">
          <ChipBar l={l} id="mk-items-t" />
          <Grid l={l} />
          <Pager l={l} />
        </section>
      </main>
      <Tail />
    </>
  );
}
