"use client";
// 브라우저 쪽 공용 동작 — 토스트, 장바구니 담기, 찜
import { useCallback, useEffect, useState } from "react";

export function toast(text: string, opts: { href?: string; label?: string } = {}) {
  window.dispatchEvent(new CustomEvent("mall:toast", { detail: { text, ...opts } }));
}

export async function addToCart(productId: number, qty = 1) {
  try {
    const r = await fetch("/api/cart", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ productId, qty }) });
    const j = await r.json().catch(() => null);
    window.dispatchEvent(new CustomEvent(j?.ok ? "mall:cart-changed" : "mall:cart-error"));
    return j?.ok ? { ok: true as const } : { ok: false as const, error: j?.error, message: (j?.message as string) ?? "장바구니에 담지 못했습니다." };
  } catch {
    return { ok: false as const, message: "네트워크 오류가 발생했습니다." };
  }
}

let wishSet: Set<number> | null = null;
let wishLoading: Promise<Set<number>> | null = null;
function loadWish() {
  if (wishSet) return Promise.resolve(wishSet);
  wishLoading ??= fetch("/api/wish", { cache: "no-store" })
    .then((r) => r.json())
    .then((j) => (wishSet = new Set<number>(Array.isArray(j?.data) ? j.data : [])))
    .catch(() => (wishSet = new Set<number>()));
  return wishLoading;
}
const wishChanged = () => window.dispatchEvent(new CustomEvent("mall:wish-changed"));

async function setWish(id: number, on: boolean) {
  const set = await loadWish();
  const before = set.has(id);
  if (on) set.add(id);
  else set.delete(id);
  wishChanged();
  try {
    const r = await fetch("/api/wish", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ productId: id, on }) });
    const j = await r.json().catch(() => null);
    if (!j?.ok) throw new Error("wish_failed");
    return true;
  } catch {
    if (before) set.add(id);
    else set.delete(id);
    wishChanged();
    return false;
  }
}

export function useWish(id: number, name?: string) {
  const [on, setOn] = useState(false);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let alive = true;
    const sync = () => {
      if (alive && wishSet) setOn(wishSet.has(id));
    };
    loadWish().then(sync);
    window.addEventListener("mall:wish-changed", sync);
    return () => {
      alive = false;
      window.removeEventListener("mall:wish-changed", sync);
    };
  }, [id]);
  const toggle = useCallback(async () => {
    if (busy) return;
    setBusy(true);
    const next = !on;
    if (await setWish(id, next)) toast(next ? `${name ? `‘${name}’ 을(를) ` : ""}찜했습니다` : "찜을 해제했습니다", next ? { href: "/wishlist", label: "찜 목록" } : {});
    else toast("찜을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    setBusy(false);
  }, [busy, on, id, name]);
  return { on, busy, toggle };
}
