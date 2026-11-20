import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { PRICE_BANDS, SORTS } from "@/lib/catalog";
import { toCard } from "@/lib/cards";
import type { Listing } from "@/lib/listing";

/** 가격대 필터 묶음(사이드바와 모바일 시트가 같이 쓴다) */
export function PriceFilter({ l }: { l: Listing }) {
  return (
    <fieldset className="kx-fg">
      <legend>
        <span hidden>F/02</span>가격대
        {l.price && (
          <Link className="kx-fg-clear" href={l.priceHref()}>
            해제
          </Link>
        )}
      </legend>
      <ul>
        {PRICE_BANDS.map((b, i) => (
          <li key={b.key}>
            <Link className="kx-fopt" aria-current={l.price === b.key ? "true" : undefined} href={l.priceHref(b.key)}>
              <i className="kx-check" aria-hidden="true" />
              <span className="kx-fopt-l">{b.label}</span>
              <span className="kx-range" aria-hidden="true">
                <b style={{ left: `${i * 20}%`, width: "20%" }} />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

export function Grid({ l }: { l: Listing }) {
  return (
    <div className="fl-grid" role="list">
      {l.items.map((p, i) => (
        <ProductCard key={p.id} p={toCard(p)} priority={i < 4} />
      ))}
    </div>
  );
}

export function Pager({ l }: { l: Listing }) {
  if (l.pages <= 1) return null;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <nav className="fl-pager" aria-label="페이지">
      {l.page > 1 ? (
        <Link className="fl-page" href={l.pageHref(l.page - 1)}>
          ← 이전
        </Link>
      ) : (
        <span className="fl-page is-off" aria-disabled="true">
          ← 이전
        </span>
      )}
      <span className="fl-page-now" aria-live="polite">
        {pad(l.page)} / {pad(l.pages)}
      </span>
      {l.page < l.pages ? (
        <Link className="fl-page" href={l.pageHref(l.page + 1)}>
          다음 →
        </Link>
      ) : (
        <span className="fl-page is-off" aria-disabled="true">
          다음 →
        </span>
      )}
    </nav>
  );
}

/** 브랜드 · 검색 목록의 '상품 N · 정렬 칩' 줄 */
export function ChipBar({ l, id }: { l: Listing; id?: string }) {
  return (
    <div className="fl-bar">
      <p className="fl-total" id={id}>
        {"총 "}
        <b>{l.total}</b>개
      </p>
      {l.total > 0 && (
      <div className="fl-chips" role="group" aria-label="정렬">
        {SORTS.map((s) => (
          <Link key={s.key} className="fl-chip" aria-current={l.sort === s.key ? "true" : undefined} href={l.sortHref(s.key)}>
            {s.label}
          </Link>
        ))}
      </div>
      )}
    </div>
  );
}
