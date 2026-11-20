import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Band from "@/components/Band";
import ProductCard from "@/components/ProductCard";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import Thumb from "@/components/Thumb";
import Configurator from "@/components/product/Configurator";
import Reviews from "@/components/product/Reviews";
import ShipInfo from "@/components/product/ShipInfo";
import TrackView from "@/components/product/TrackView";
import { toCard } from "@/lib/cards";
import { getProduct, leadDays, PRODUCTS, sortProducts } from "@/lib/catalog";
import { won } from "@/lib/format";
import { NAV_AXES } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct(Number((await params).id));
  return p ? { title: `${p.maker?.nameKo ?? ""} ${p.name}`.trim(), description: p.summary } : {};
}

export default async function ProductPage({ params }: Props) {
  const p = getProduct(Number((await params).id));
  if (!p) notFound();
  const axis = NAV_AXES.find((a) => a.slug === p.categorySlug);
  const discounted = p.discountRate > 0 && p.listPrice > p.salePrice;
  const soldOut = p.stock <= 0 && !p.isCustom;
  const lead = leadDays(p);
  const mates = sortProducts(
    PRODUCTS.filter((x) => x.categorySlug === p.categorySlug && x.id !== p.id),
    "popular",
  ).slice(0, 3);
  // 스펙 시트에서 '배송비'를 뺀 것이 사진 아래 요약 스펙
  const spec = p.sheet.filter(([k]) => k !== "배송비");

  const intro = (
    <header className="kx-cfg-head">
      <p className="v2-cfg-tags">
        <span className="v2-pill is-cw3">{p.categoryLabel}</span>
        {p.isCustom && <span className="v2-pill is-cw4">주문 제작</span>}
      </p>
      <h1 className="kx-cfg-name">{p.name}</h1>
      <p className="kx-cfg-sum">{p.summary}</p>
      <p className="kx-cfg-price">
        {discounted && <s>{won(p.listPrice)}</s>}
        {discounted && <em>−{p.discountRate}%</em>}
        <b>{won(p.salePrice)}</b>
        {p.groups.length > 0 && <i>부터</i>}
      </p>
      <p className="kx-cfg-state">
        <span>
          <i className={soldOut ? "" : "is-on"} />
          {soldOut ? "일시 품절" : p.isCustom ? "주문 받는 중" : "재고 있음"}
        </span>
        <span>제작 {lead > 0 ? `${lead}일` : "바로 출고"}</span>
        {p.groups.length > 0 && <span>옵션 {p.groups.length}단계</span>}
      </p>
    </header>
  );

  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-2", "product-support", "product-2", "shop", "product-3", "product-videos", "product-used", "product"]} />
      <Band />
      <main className="page shop-main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: p.name,
              sku: p.sku,
              description: p.summary,
              image: p.thumbUrl ? [p.thumbUrl] : [],
              manufacturer: p.maker ? { "@type": "Organization", name: p.maker.nameKo } : undefined,
              offers: { "@type": "Offer", priceCurrency: "KRW", price: p.salePrice, availability: soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", itemCondition: "https://schema.org/NewCondition" },
            }),
          }}
        />
        <TrackView productId={p.id} />
        <div className="kx-cfg v2-cfg is-builder" data-kx-configurator="" data-v2-builder="">
          <nav className="fd-crumb kx-cfg-crumb" aria-label="경로">
            <Link href="/">HOME</Link>
            <span aria-hidden="true">/</span>
            <Link href={`/category/${p.categorySlug}`}>{p.categoryLabel}</Link>
            <span aria-hidden="true">/</span>
            <b>{p.name}</b>
          </nav>
          <Configurator
            productId={p.id}
            productName={p.name}
            basePrice={p.salePrice}
            groups={p.groups}
            soldOut={soldOut}
            layoutHint={p.cfgExtra.layoutHint}
            intro={intro}
            visual={<Thumb src={p.thumbUrl} alt={`${p.name} 사진`} name={p.name} priority sizes="(max-width:1023px) 100vw, 760px" />}
            spec={
              <dl className="kx-spec kx-cfg-spec">
                {spec.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            }
          />
        </div>
        <section className="sec kx-sec" aria-labelledby="kx-sheet-t">
          <header className="v2-head" data-reveal="">
            <div className="v2-head-main">
              <p className="v2-pill is-cw2">SPEC SHEET</p>
              <h2 id="kx-sheet-t">스펙 시트</h2>
            </div>
          </header>
          <table className="kx-sheet">
            <tbody>
              {p.sheet.map(([k, v], i) => (
                <tr key={k}>
                  <th scope="row">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    {k}
                  </th>
                  <td>{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="sec kx-sec" aria-labelledby="kx-rv-t">
          <header className="v2-head" data-reveal="">
            <div className="v2-head-main">
              <p className="v2-pill is-cw4">FIELD REPORTS</p>
              <h2 id="kx-rv-t">리뷰</h2>
            </div>
          </header>
          <div className="kx-reviews">
            <Reviews productId={p.id} />
          </div>
        </section>
        <ShipInfo />
        {mates.length > 0 && (
          <section className="sec kx-sec" aria-labelledby="fd-mates">
            <header className="v2-head" data-reveal="">
              <div className="v2-head-main">
                <p className="v2-pill is-cw1">SAME CATEGORY</p>
                <h2 id="fd-mates">같은 분류의 다른 상품</h2>
              </div>
              <Link className="v2-key is-white" href={`/category/${p.categorySlug}`}>
                {axis?.short ?? p.categoryLabel} 전체<span aria-hidden="true"> →</span>
              </Link>
            </header>
            <div className="fl-grid" role="list">
              {mates.map((m) => (
                <ProductCard key={m.id} p={toCard(m)} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Tail />
    </>
  );
}
