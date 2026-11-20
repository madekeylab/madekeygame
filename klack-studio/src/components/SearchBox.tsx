"use client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { IcoSearch } from "./icons";

type Suggest = {
  products: { id: number; name: string; thumbUrl: string | null; salePrice: number; discountRate: number; brand: string }[];
  categories: { id: number; slug: string; name: string }[];
  brands: { id: number; slug: string; nameKo: string; nameEn: string; logoUrl: string | null }[];
};
type Item = { kind: "brand" | "product" | "category"; key: string; href: string; name: string; sub?: string; thumbUrl?: string | null; salePrice?: number; discountRate?: number; brand?: string };
const EMPTY: Suggest = { products: [], categories: [], brands: [] };
const KIND = { product: "상품", category: "카테고리", brand: "브랜드" };

/** 자동완성이 붙은 상품 검색창 */
export default function SearchBox({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const listId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initial);
  const [data, setData] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loadedFor, setLoadedFor] = useState("");
  const q = value.trim();

  const items = useMemo<Item[]>(
    () => [
      ...data.brands.map((b) => ({ kind: "brand" as const, key: `b${b.id}`, href: `/brand/${b.slug}`, name: b.nameKo, sub: b.nameEn && b.nameEn !== b.nameKo ? b.nameEn : undefined, thumbUrl: b.logoUrl ?? null })),
      ...data.products.map((p) => ({ kind: "product" as const, key: `p${p.id}`, href: `/product/${p.id}`, name: p.name, thumbUrl: p.thumbUrl, salePrice: p.salePrice, discountRate: p.discountRate, brand: p.brand })),
      ...data.categories.map((c) => ({ kind: "category" as const, key: `c${c.id}`, href: `/category/${c.slug}`, name: c.name })),
    ],
    [data],
  );
  const ready = q.length >= 1 && loadedFor === q && !loading;
  const none = ready && items.length === 0;

  useEffect(() => {
    if (q.length < 1) {
      setData(EMPTY);
      setLoadedFor("");
      setLoading(false);
      return;
    }
    const ac = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const r = await fetch(`/api/search/suggest?q=${encodeURIComponent(q)}`, { signal: ac.signal });
        const j = await r.json();
        if (ac.signal.aborted) return;
        setData(j.ok && j.data ? j.data : EMPTY);
        setLoadedFor(q);
        setActive(-1);
        if (document.activeElement === inputRef.current) setOpen(true);
      } catch {
        if (!ac.signal.aborted) {
          setData(EMPTY);
          setLoadedFor(q);
        }
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    }, 250);
    return () => {
      clearTimeout(t);
      ac.abort();
    };
  }, [q]);

  const close = useCallback(() => {
    setOpen(false);
    setActive(-1);
  }, []);
  useEffect(() => {
    if (!open) return;
    const down = (e: MouseEvent) => {
      if (!formRef.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", down);
    return () => document.removeEventListener("mousedown", down);
  }, [open, close]);

  const go = (it: Item) => {
    close();
    router.push(it.href);
  };
  const show = open && q.length >= 1 && (items.length > 0 || none || loading);
  const optId = (i: number) => `${listId}-opt-${i}`;

  return (
    <form ref={formRef} className="sbox" action="/search" role="search" onSubmit={close}>
      <IcoSearch />
      <input
        ref={inputRef}
        className="sbox-input"
        type="search"
        name="q"
        placeholder="상품 검색..."
        aria-label="상품 검색"
        autoComplete="off"
        value={value}
        role="combobox"
        aria-autocomplete="list"
        aria-haspopup="listbox"
        aria-expanded={show}
        aria-controls={listId}
        aria-activedescendant={show && active >= 0 ? optId(active) : undefined}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          if (q.length >= 1) setOpen(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            if (open) {
              e.preventDefault();
              close();
            }
            return;
          }
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            if (!items.length) return;
            e.preventDefault();
            if (!open) {
              setOpen(true);
              setActive(e.key === "ArrowDown" ? 0 : items.length - 1);
              return;
            }
            const step = e.key === "ArrowDown" ? 1 : -1;
            setActive((i) => {
              const n = i + step;
              return n >= items.length ? -1 : n < -1 ? items.length - 1 : n;
            });
            return;
          }
          if (e.key === "Enter" && open && active >= 0 && items[active]) {
            e.preventDefault();
            go(items[active]);
          }
        }}
      />
      <div className="sr-only" role="status" aria-live="polite">
        {ready ? (items.length ? `검색 제안 ${items.length}건` : "검색 제안 없음") : ""}
      </div>
      <div className={`sbox-dd${show ? " is-open" : ""}`} onMouseDown={(e) => e.preventDefault()}>
        <ul id={listId} role="listbox" aria-label="검색 제안" className="sbox-list">
          {items.map((it, i) => (
            <li key={it.key} id={optId(i)} role="option" aria-selected={i === active} className={`sbox-opt sbox-opt-${it.kind}${i === active ? " is-active" : ""}`} onMouseEnter={() => setActive(i)} onClick={() => go(it)}>
              {it.kind === "product" ? (
                <>
                  <span className="sbox-thumb" aria-hidden="true">
                    {it.thumbUrl ? <img src={it.thumbUrl} width={40} height={40} alt="" loading="lazy" /> : null}
                  </span>
                  <span className="sbox-txt">
                    <span className="sbox-name">{it.name}</span>
                    {it.brand ? <span className="sbox-sub">{it.brand}</span> : null}
                  </span>
                  <span className="sbox-price price">
                    <b>{Math.round(it.salePrice ?? 0).toLocaleString("ko-KR")}</b>
                    <small>원</small>
                    {(it.discountRate ?? 0) > 0 ? <em>{it.discountRate}%</em> : null}
                  </span>
                </>
              ) : it.kind === "brand" ? (
                <>
                  <span className="sbox-logo" aria-hidden="true">
                    {it.thumbUrl ? <img src={it.thumbUrl} width={40} height={40} alt="" loading="lazy" /> : <b>{(it.sub || it.name).charAt(0)}</b>}
                  </span>
                  <span className="sbox-txt">
                    <span className="sbox-name">
                      {it.name}
                      {it.sub ? <span className="sbox-en"> / {it.sub}</span> : null}
                    </span>
                    <span className="sbox-sub">브랜드</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="sbox-kind">{KIND[it.kind]}</span>
                  <span className="sbox-txt">
                    <span className="sbox-name">{it.name}</span>
                  </span>
                </>
              )}
            </li>
          ))}
        </ul>
        {loading && !items.length ? <p className="sbox-msg">불러오는 중…</p> : null}
        {none ? (
          <p className="sbox-msg">
            <strong>‘{q}’</strong>에 대한 제안이 없습니다.<span>Enter 를 누르면 전체 검색으로 이동합니다.</span>
          </p>
        ) : null}
        {show && !loading ? (
          <button type="submit" className="sbox-all">
            ‘{q}’ 전체 검색 →
          </button>
        ) : null}
      </div>
    </form>
  );
}
