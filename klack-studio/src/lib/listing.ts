import { filterByPrice, PAGE_SIZE, sortProducts } from "./catalog";
import type { Product } from "./types";

export type ListQuery = { sort?: string; price?: string; page?: string; q?: string };
const SORT_KEYS = ["new", "popular", "price_asc", "price_desc"];

/** 목록 페이지 공통: 정렬 · 가격대 필터 · 페이지 나누기와 그에 맞는 링크 만들기 */
export function listing(all: Product[], base: string, query: ListQuery, opts: { keep?: Record<string, string | undefined>; defaultSort?: string } = {}) {
  const keep = opts.keep ?? {};
  const sort = SORT_KEYS.includes(query.sort ?? "") ? query.sort! : (opts.defaultSort ?? "new");
  const filtered = sortProducts(filterByPrice(all, query.price), sort);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(pages, Math.max(1, Number(query.page) || 1));
  const href = (params: Record<string, string | undefined>) => {
    const qs = Object.entries({ ...keep, ...params })
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}=${encodeURIComponent(v!)}`)
      .join("&");
    return qs ? `${base}?${qs}` : base;
  };
  return {
    sort,
    price: query.price,
    total: filtered.length,
    page,
    pages,
    items: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    /** 정렬 링크 — 지금 고른 정렬은 sort 를 뺀 주소 */
    sortHref: (key: string) => href({ price: query.price, sort: key === sort ? undefined : key }),
    /** 가격대 링크 — 이미 고른 가격대를 누르면 해제 */
    priceHref: (key?: string) => href({ price: key && key !== query.price ? key : undefined, sort }),
    pageHref: (n: number) => href({ price: query.price, sort, page: n > 1 ? String(n) : undefined }),
  };
}
export type Listing = ReturnType<typeof listing>;
