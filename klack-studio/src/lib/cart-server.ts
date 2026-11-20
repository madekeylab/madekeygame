// 장바구니 · 찜 서버 로직. 저장소는 쿠키(로그인/DB 없이 동작) — 나중에 DB 세션으로 교체 가능.
import { cookies } from "next/headers";
import { getProduct, leadDays, maxPick, OPTION_TEXT_MAX, visibleGroups } from "./catalog";
import type { CartData, CartLine, CartPlan, Selection } from "./types";

const CART_COOKIE = "klack_cart";
const WISH_COOKIE = "klack_wish";
const YEAR = 60 * 60 * 24 * 365;

type StoredLine = { id: number; p: number; q: number; s: Selection[] };
type Stored = { seq: number; lines: StoredLine[] };

async function read(): Promise<Stored> {
  try {
    const v = (await cookies()).get(CART_COOKIE)?.value;
    const d = v ? JSON.parse(v) : null;
    if (d && Array.isArray(d.lines)) return d;
  } catch {}
  return { seq: 0, lines: [] };
}
async function write(d: Stored) {
  (await cookies()).set(CART_COOKIE, JSON.stringify(d), { path: "/", maxAge: YEAR, sameSite: "lax", httpOnly: true });
}

export class CartError extends Error {
  constructor(public code: string, message: string) {
    super(message);
  }
}

function normalize(productId: number, input: Selection[] | undefined) {
  const p = getProduct(productId);
  if (!p) throw new CartError("not_found", "상품을 찾을 수 없습니다.");
  const picks: Record<number, number[]> = {};
  const texts: Record<number, string> = {};
  for (const s of input ?? []) {
    const g = p.groups.find((g) => g.id === s.groupId);
    if (!g) continue;
    if (g.kind === "text") {
      const t = (s.text ?? "").trim().slice(0, OPTION_TEXT_MAX);
      if (t) texts[g.id] = t;
    } else {
      const ids = (s.valueIds ?? []).filter((v) => g.values.some((x) => x.id === v)).slice(0, maxPick(g));
      if (ids.length) picks[g.id] = ids;
    }
  }
  const visible = visibleGroups(p.groups, picks);
  const out: Selection[] = [];
  for (const g of p.groups) {
    if (!visible.has(g.id)) continue;
    if (g.kind === "text") {
      if (texts[g.id]) out.push({ groupId: g.id, valueIds: [], text: texts[g.id] });
    } else if (picks[g.id]) out.push({ groupId: g.id, valueIds: picks[g.id] });
    else if (g.required) throw new CartError("option_required", `「${g.name}」 옵션을 선택해 주세요.`);
  }
  return out;
}

function toLine(l: StoredLine): CartLine | null {
  const p = getProduct(l.p);
  if (!p) return null;
  let extra = 0;
  const labels: string[] = [];
  for (const s of l.s) {
    const g = p.groups.find((g) => g.id === s.groupId);
    if (!g) continue;
    if (g.kind === "text") {
      if (s.text) labels.push(`${g.name} ${s.text}`);
      continue;
    }
    const vals = g.values.filter((v) => s.valueIds.includes(v.id));
    extra += vals.reduce((n, v) => n + v.extraPrice, 0);
    if (vals.length) labels.push(`${g.name} ${vals.map((v) => v.label).join(", ")}`);
  }
  const listPrice = p.listPrice + extra;
  const salePrice = p.salePrice + extra;
  return {
    id: l.id,
    productId: p.id,
    name: p.name,
    brandName: "",
    thumbUrl: p.thumbUrl,
    listPrice,
    salePrice,
    discountRate: listPrice > salePrice ? Math.round(((listPrice - salePrice) / listPrice) * 100) : 0,
    qty: l.q,
    lineList: listPrice * l.q,
    lineDiscount: (listPrice - salePrice) * l.q,
    linePay: salePrice * l.q,
    stock: p.stock,
    optionId: null,
    optionLabel: labels.join(" · "),
    optionSku: "",
    optionExtra: extra,
  };
}

function view(d: Stored): { data: CartData; plan: CartPlan } {
  const lines = d.lines.map(toLine).filter((l): l is CartLine => !!l);
  const sum = (f: (l: CartLine) => number) => lines.reduce((n, l) => n + f(l), 0);
  const items = lines.map((l) => {
    const p = getProduct(l.productId)!;
    return { productId: p.id, shipType: p.shipType, assembly: p.assembly, shipFee: 0, leadDays: leadDays(p) };
  });
  return {
    data: { lines, summary: { count: lines.length, totalList: sum((l) => l.lineList), totalDiscount: sum((l) => l.lineDiscount), totalPay: sum((l) => l.linePay) } },
    plan: { items, kind: "parcel", productShipFee: 0, leadDaysMax: Math.max(0, ...items.map((i) => i.leadDays)) },
  };
}

export async function getCart() {
  return view(await read());
}

export async function addToCart(productId: number, qty: number, selections?: Selection[]) {
  const p = getProduct(productId);
  if (!p) throw new CartError("not_found", "상품을 찾을 수 없습니다.");
  if (p.stock <= 0 && !p.isCustom) throw new CartError("sold_out", "일시 품절된 상품입니다.");
  const sel = normalize(productId, selections);
  const d = await read();
  const n = Math.max(1, Math.min(99, Math.floor(qty) || 1));
  const same = d.lines.find((l) => l.p === productId && JSON.stringify(l.s) === JSON.stringify(sel));
  if (same) same.q = Math.min(99, same.q + n);
  else d.lines.push({ id: ++d.seq, p: productId, q: n, s: sel });
  await write(d);
  return view(d);
}

export async function setQty(lineId: number, qty: number) {
  const d = await read();
  const l = d.lines.find((l) => l.id === lineId);
  if (l) {
    if (qty < 1) d.lines = d.lines.filter((x) => x !== l);
    else l.q = Math.min(99, Math.floor(qty));
    await write(d);
  }
  return view(d);
}

export async function removeLine(lineId?: number) {
  const d = await read();
  d.lines = lineId == null ? [] : d.lines.filter((l) => l.id !== lineId);
  await write(d);
  return view(d);
}

/* ───── 찜 ───── */
export async function getWish(): Promise<number[]> {
  try {
    const v = (await cookies()).get(WISH_COOKIE)?.value;
    const d = v ? JSON.parse(v) : [];
    return Array.isArray(d) ? d.filter((n) => getProduct(n)) : [];
  } catch {
    return [];
  }
}
export async function setWish(productId: number, on: boolean) {
  const cur = new Set(await getWish());
  if (on) cur.add(productId);
  else cur.delete(productId);
  (await cookies()).set(WISH_COOKIE, JSON.stringify([...cur]), { path: "/", maxAge: YEAR, sameSite: "lax", httpOnly: true });
}
