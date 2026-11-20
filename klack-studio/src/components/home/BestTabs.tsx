"use client";
import { useMemo, useState } from "react";
import ProductCard, { type CardProduct } from "@/components/ProductCard";

/** '이번 주 베스트' — 카테고리 탭으로 거르는 상품 그리드 */
export default function BestTabs({ items, tabs, rows = 2 }: { items: CardProduct[]; tabs: { slug: string; label: string }[]; rows?: number }) {
  const [tab, setTab] = useState("all");
  const list = useMemo(() => (tab === "all" ? items : items.filter((p) => p.categorySlug === tab)).slice(0, 4 * rows), [items, tab, rows]);
  return (
    <>
      <div className="sh-tabs" role="group" aria-label="카테고리 선택">
        <button type="button" aria-pressed={tab === "all"} onClick={() => setTab("all")}>
          전체
        </button>
        {tabs.map((t) => (
          <button key={t.slug} type="button" aria-pressed={tab === t.slug} onClick={() => setTab(t.slug)}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="fl-grid" role="list">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </>
  );
}
