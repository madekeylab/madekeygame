import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/catalog";

// 후기 저장소 — 지금은 서버 메모리(재시작 시 초기화). DB 연결 시 이 부분만 교체.
type Review = { id: number; productId: number; rating: number; author: string; body: string; createdAt: string };
const g = globalThis as unknown as { __klackReviews?: Review[] };
const store = (g.__klackReviews ??= []);

const EVENT = { points: 500, minLength: 20, perDay: 3, title: "후기 작성 이벤트", loggedIn: false };

export async function GET(req: NextRequest) {
  const productId = Number(req.nextUrl.searchParams.get("productId"));
  const items = store.filter((r) => r.productId === productId).sort((a, b) => b.id - a.id);
  const count = items.length;
  const avg = count ? Math.round((items.reduce((n, r) => n + r.rating, 0) / count) * 10) / 10 : 0;
  return NextResponse.json({ ok: true, data: { items, rating: { avg, count }, mine: false, event: EVENT } });
}

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  const productId = Number(b?.productId);
  const rating = Math.round(Number(b?.rating));
  const author = String(b?.author ?? "").trim().slice(0, 40);
  const body = String(b?.body ?? "").trim().slice(0, 1000);
  if (!getProduct(productId)) return NextResponse.json({ ok: false, message: "상품을 찾을 수 없습니다." });
  if (!(rating >= 1 && rating <= 5)) return NextResponse.json({ ok: false, message: "별점을 선택해 주세요." });
  if (!author) return NextResponse.json({ ok: false, message: "작성자명을 입력해 주세요." });
  if (!body) return NextResponse.json({ ok: false, message: "후기 내용을 입력해 주세요." });
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const createdAt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  const r: Review = { id: store.length + 1, productId, rating, author, body, createdAt };
  store.push(r);
  return NextResponse.json({ ok: true, data: r });
}
