import { NextRequest, NextResponse } from "next/server";
import { getWish, setWish } from "@/lib/cart-server";
import { getProduct } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json({ ok: true, data: await getWish() });
}

export async function POST(req: NextRequest) {
  const b = await req.json().catch(() => null);
  const productId = Number(b?.productId);
  if (!getProduct(productId)) return NextResponse.json({ ok: false, message: "상품을 찾을 수 없습니다." });
  const on = !!b?.on;
  await setWish(productId, on);
  return NextResponse.json({ ok: true, data: { productId, on } });
}
