"use client";
import Link from "next/link";
import { useState } from "react";
import { LineOption } from "@/components/CartDrawer";
import { won } from "@/lib/format";
import { shipFee } from "@/lib/order";
import type { CartData, CartPlan } from "@/lib/types";

/** 장바구니 본문 — 줄 목록(수량 · 삭제)과 결제 예정 금액 */
export default function CartPage({ initial, plan: initialPlan }: { initial: CartData; plan: CartPlan }) {
  const [cart, setCart] = useState(initial);
  const [plan, setPlan] = useState(initialPlan);
  const [busy, setBusy] = useState(false);
  const call = async (init: RequestInit, url = "/api/cart") => {
    setBusy(true);
    try {
      const r = await fetch(url, { ...init, headers: { "content-type": "application/json" } });
      const j = await r.json();
      if (j?.ok) {
        setCart(j.data);
        if (j.plan) setPlan(j.plan);
        window.dispatchEvent(new CustomEvent("mall:cart-changed"));
      }
    } finally {
      setBusy(false);
    }
  };
  const { lines, summary } = cart;
  if (!lines.length) return <div className="lst-empty">담긴 상품이 없습니다.</div>;
  const planOf = new Map(plan.items.map((i) => [i.productId, i]));
  const pay = summary.totalPay;
  const ship = shipFee(plan.productShipFee, pay);
  return (
    <div className="cp">
      <div className="cp-groups">
        <ul className="cp-list">
          {lines.map((l) => {
            const pi = planOf.get(l.productId);
            return (
              <li key={l.id} className="cp-item">
                <Link href={`/product/${l.productId}`} className="cp-thumb">
                  {l.thumbUrl ? <img src={l.thumbUrl} width={96} height={96} alt="" aria-hidden="true" /> : null}
                </Link>
                <div className="cp-body">
                  <p className="crt-brand">{l.brandName}</p>
                  <Link href={`/product/${l.productId}`} className="cp-name">
                    {l.name}
                  </Link>
                  <LineOption line={l} />
                  <div className="cp-prices">
                    <s>{won(l.listPrice)}원</s>
                    <em>{l.discountRate}%</em>
                    <b>{won(l.salePrice)}원</b>
                  </div>
                  {pi && (
                    <p className="cp-tags">
                      {pi.leadDays > 0 && <span>납기 {pi.leadDays}일</span>}
                      <span>배송비 {pi.shipFee > 0 ? `${won(pi.shipFee)}원` : "무료"}</span>
                    </p>
                  )}
                </div>
                <div className="cp-qty">
                  <button type="button" aria-label="수량 줄이기" disabled={busy} onClick={() => call({ method: "PATCH", body: JSON.stringify({ lineId: l.id, qty: l.qty - 1 }) })}>
                    −
                  </button>
                  <b aria-live="polite">{l.qty}</b>
                  <button type="button" aria-label="수량 늘리기" disabled={busy || l.qty >= l.stock} onClick={() => call({ method: "PATCH", body: JSON.stringify({ lineId: l.id, qty: l.qty + 1 }) })}>
                    +
                  </button>
                </div>
                <div className="cp-line-total">{won(l.linePay)}원</div>
                <button type="button" className="cp-del" aria-label={`${l.name} 삭제`} disabled={busy} onClick={() => call({ method: "DELETE" }, `/api/cart?lineId=${l.id}`)}>
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="cp-mbar">
        <span>
          <small>총 결제예상금액</small>
          <b>{won(pay + ship)}원</b>
        </span>
        <Link href="/checkout" className="crt-btn crt-btn-primary">
          주문하기
        </Link>
      </div>
      <aside className="cp-sum card">
        <h2>결제 예정 금액</h2>
        <div>
          <span>총 상품금액</span>
          <b>{won(summary.totalList)}원</b>
        </div>
        <div>
          <span>총 할인금액</span>
          <b className="crt-off">{summary.totalDiscount > 0 ? `-${won(summary.totalDiscount)}` : "0"}원</b>
        </div>
        <div>
          <span>배송비</span>
          <b>{ship > 0 ? `${won(ship)}원` : "무료"}</b>
        </div>
        <div className="cp-sum-total">
          <span>총 결제예상금액</span>
          <strong>{won(pay + ship)}원</strong>
        </div>
        {plan.productShipFee > 0 && <p className="cp-note">상품별 배송비가 합산됩니다.</p>}
        <Link href="/checkout" className="crt-btn crt-btn-primary cp-order">
          주문하기
        </Link>
        <p className="cp-note">데모 환경이라 실제 결제는 이루어지지 않습니다.</p>
      </aside>
    </div>
  );
}
