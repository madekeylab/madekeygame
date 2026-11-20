"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type MouseEvent } from "react";
import { addToCart, toast, useWish } from "@/lib/client";
import { won } from "@/lib/format";
import { NAV_AXES } from "@/lib/site";
import type { Product } from "@/lib/types";
import Thumb from "./Thumb";
import { IcoCart, IcoHeart } from "./icons";

export type CardProduct = Pick<Product, "id" | "name" | "categorySlug" | "listPrice" | "salePrice" | "discountRate" | "thumbUrl" | "stock" | "isCustom" | "optionGroups" | "specLine">;

export default function ProductCard({ p, priority = false }: { p: CardProduct; priority?: boolean }) {
  const router = useRouter();
  const { on, toggle } = useWish(p.id, p.name);
  const [busy, setBusy] = useState(false);
  const href = `/product/${p.id}`;
  const soldOut = p.stock <= 0 && !p.isCustom;
  const discounted = p.discountRate > 0 && p.listPrice > p.salePrice;
  const hasOptions = p.optionGroups > 0;
  const axis = NAV_AXES.find((a) => a.slug === p.categorySlug);
  const specs = (p.specLine || "")
    .split(/\s+·\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 3);
  const stop = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onCart = async (e: MouseEvent) => {
    stop(e);
    if (hasOptions) return void router.push(href);
    if (busy || soldOut) return;
    setBusy(true);
    const r = await addToCart(p.id, 1);
    toast(r.ok ? `‘${p.name}’ 을(를) 장바구니에 담았습니다` : (r.message ?? "장바구니에 담지 못했습니다."), r.ok ? { href: "/cart", label: "장바구니" } : {});
    setBusy(false);
  };
  return (
    <article className="fc" role="listitem" onClick={() => router.push(href)}>
      <div className="fc-thumb">
        <Thumb src={p.thumbUrl} alt={p.name} name={p.name} priority={priority} sizes="(max-width:760px) 50vw, (max-width:1100px) 33vw, 320px" />
        <span className="fc-code" aria-hidden="true">
          {axis?.short ?? "클랙"}
        </span>
        {p.isCustom && <span className="fc-flag">주문 제작</span>}
        <div className="fc-quick" role="group" aria-label="빠른 작업">
          <button
            type="button"
            className="fc-qbtn"
            aria-label={`${p.name} 찜하기`}
            aria-pressed={on}
            onClick={(e) => {
              stop(e);
              toggle();
            }}
          >
            <IcoHeart />
          </button>
        </div>
        {soldOut && (
          <div className="fc-soldout" aria-hidden="true">
            일시 품절
          </div>
        )}
      </div>
      <div className="fc-body">
        <p className="fc-cat">
          {axis ? axis.eyebrow : "Klack"}
          {p.isCustom && <em className="fc-tag is-custom">주문 제작</em>}
        </p>
        <h3 className="fc-name">
          <Link href={href} onClick={(e) => e.stopPropagation()}>
            {p.name}
          </Link>
        </h3>
        <dl className="fc-spec" title={p.specLine || undefined}>
          {specs.length ? (
            specs.map((s, i) => (
              <div key={i}>
                <dt>스펙 {i + 1}</dt>
                <dd>{s}</dd>
              </div>
            ))
          ) : (
            <div>
              <dt>스펙</dt>
              <dd>—</dd>
            </div>
          )}
        </dl>
        <div className="fc-foot">
          <span className="fc-price">
            {discounted && <s>{won(p.listPrice)}원</s>}
            <span className="fc-price-row">
              {discounted && <em>−{p.discountRate}%</em>}
              <b>{won(p.salePrice)}</b>
              <i>원</i>
            </span>
          </span>
          {hasOptions && (
            <span className="fc-opts" title={`고를 수 있는 옵션 그룹 ${p.optionGroups}개`}>
              옵션 {p.optionGroups}종
            </span>
          )}
          <button type="button" className="fc-cart" disabled={!hasOptions && (soldOut || busy)} aria-busy={busy} aria-label={hasOptions ? `${p.name} 옵션 구성하기` : soldOut ? `${p.name} 품절` : `${p.name} 장바구니 담기`} onClick={onCart}>
            {hasOptions ? <span aria-hidden="true">→</span> : <IcoCart w={1.7} />}
          </button>
        </div>
      </div>
    </article>
  );
}
