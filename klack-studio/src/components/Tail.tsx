import Link from "next/link";
import { PRODUCTS, sortProducts } from "@/lib/catalog";
import { won } from "@/lib/format";

/** 본문 아래 '지금 인기' 꼬리 영역 */
export default function Tail() {
  const top = sortProducts(PRODUCTS, "popular").slice(0, 8);
  return (
    <div className="page site-tail" aria-label="지금 인기 · 고객 후기">
      <section className="sec" aria-labelledby="sec-rank">
        <div className="sec-h">
          <div>
            <p className="eyebrow">Trending Now</p>
            <h2 id="sec-rank">지금 인기</h2>
          </div>
          <Link className="sec-more" href="/category/all?sort=popular">
            전체보기 ›
          </Link>
        </div>
        <ol className="rank">
          {top.map((p, i) => (
            <li key={p.id}>
              <Link className="rank-row" href={`/product/${p.id}`}>
                <span className="rank-no">{String(i + 1).padStart(2, "0")}</span>
                <span className="rank-thumb">
                  {p.thumbUrl && <img src={p.thumbUrl} width="64" height="64" decoding="async" alt="" aria-hidden="true" loading="lazy" />}
                </span>
                <span className="rank-body">
                  <span className="rank-name">{p.name}</span>
                  <span className="rank-price">
                    <b>{won(p.salePrice)}</b>원
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
