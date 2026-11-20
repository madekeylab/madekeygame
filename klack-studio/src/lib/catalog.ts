// 상품 카탈로그 — 지금은 JSON 파일이 원본. DB로 옮길 때 이 파일만 바꾸면 된다.
import raw from "@/data/products.json";
import type { OptionGroup, Product } from "./types";
import { NAV_AXES } from "./site";

export const PRODUCTS = raw as unknown as Product[];
const byId = new Map(PRODUCTS.map((p) => [p.id, p]));
export const getProduct = (id: number) => byId.get(id);

export const PAGE_SIZE = 24;

export const PRICE_BANDS = [
  { key: "p1", label: "10만원 미만", min: 0, max: 100000 },
  { key: "p2", label: "10~30만원", min: 100000, max: 300000 },
  { key: "p3", label: "30~70만원", min: 300000, max: 700000 },
  { key: "p4", label: "70~150만원", min: 700000, max: 1500000 },
  { key: "p5", label: "150만원 이상", min: 1500000, max: Infinity },
] as const;

export const SORTS = [
  { key: "new", label: "신상품" },
  { key: "popular", label: "인기" },
  { key: "price_asc", label: "낮은가격" },
  { key: "price_desc", label: "높은가격" },
] as const;

export function sortProducts(list: Product[], sort?: string) {
  const out = [...list];
  if (sort === "popular") out.sort((a, b) => b.id - a.id);
  else if (sort === "price_asc") out.sort((a, b) => a.salePrice - b.salePrice || a.id - b.id);
  else if (sort === "price_desc") out.sort((a, b) => b.salePrice - a.salePrice || a.id - b.id);
  else out.sort((a, b) => a.id - b.id);
  return out;
}

export function filterByPrice(list: Product[], price?: string) {
  const band = PRICE_BANDS.find((b) => b.key === price);
  return band ? list.filter((p) => p.salePrice >= band.min && p.salePrice < band.max) : list;
}

export const productsInCategory = (slug: string) => (slug === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.categorySlug === slug));

export type Maker = { id: number; slug: string; nameKo: string; nameEn: string; count: number; categories: { slug: string; label: string; count: number }[] };

export const MAKERS: Maker[] = (() => {
  const m = new Map<string, Maker>();
  for (const p of PRODUCTS) {
    if (!p.maker) continue;
    let k = m.get(p.maker.slug);
    if (!k) {
      k = { ...p.maker, nameEn: p.maker.slug.replace(/-/g, " ").toUpperCase(), count: 0, categories: [] };
      m.set(p.maker.slug, k);
    }
    k.count++;
    const c = k.categories.find((c) => c.slug === p.categorySlug);
    if (c) c.count++;
    else k.categories.push({ slug: p.categorySlug, label: NAV_AXES.find((a) => a.slug === p.categorySlug)?.label ?? p.categoryLabel, count: 1 });
  }
  return [...m.values()].sort((a, b) => a.id - b.id);
})();

export function searchProducts(q: string) {
  const t = q.trim().toLowerCase();
  if (!t) return [];
  return PRODUCTS.filter((p) => [p.name, p.summary, p.specLine, p.sku].some((s) => s.toLowerCase().includes(t)));
}

/** 제작 납기(일) — 스펙 시트의 '납기' 행에서 읽는다 */
export function leadDays(p: Product) {
  const row = p.sheet.find(([k]) => k === "납기")?.[1] ?? "";
  const m = /주문 후 (\d+)일/.exec(row);
  return m ? Number(m[1]) : 0;
}

/* ───── 옵션 규칙 (상품 상세 구성기와 장바구니 API가 함께 쓴다) ───── */
export const OPTION_TEXT_MAX = 100;
export const isSingle = (g: OptionGroup) => g.kind === "select" || g.kind === "swatch" || g.kind === "radio";
export const maxPick = (g: OptionGroup) => (isSingle(g) ? 1 : Math.max(1, g.maxSelect));

/** 앞 단계 선택에 따라 지금 보이는(유효한) 옵션 그룹 id */
export function visibleGroups(groups: OptionGroup[], picks: Record<number, number[]>) {
  const map = new Map(groups.map((g) => [g.id, g]));
  const memo = new Map<number, boolean>();
  const ok = (g: OptionGroup, seen: Set<number>): boolean => {
    const hit = memo.get(g.id);
    if (hit != null) return hit;
    let r = true;
    if (g.dependsOnGroupId != null) {
      const parent = map.get(g.dependsOnGroupId);
      if (!parent || seen.has(g.id)) r = false;
      else {
        seen.add(g.id);
        const sel = picks[parent.id] ?? [];
        r = ok(parent, seen) && sel.length > 0 && (!g.dependsOnValueIds.length || sel.some((v) => g.dependsOnValueIds.includes(v)));
      }
    }
    memo.set(g.id, r);
    return r;
  };
  return new Set(groups.filter((g) => ok(g, new Set())).map((g) => g.id));
}
