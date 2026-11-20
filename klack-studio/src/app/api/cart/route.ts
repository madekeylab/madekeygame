import { NextRequest, NextResponse } from "next/server";
import { addToCart, CartError, getCart, removeLine, setQty } from "@/lib/cart-server";

const ok = (v: Awaited<ReturnType<typeof getCart>>) => NextResponse.json({ ok: true, ...v });
const fail = (e: unknown) =>
  e instanceof CartError
    ? NextResponse.json({ ok: false, error: e.code, message: e.message })
    : NextResponse.json({ ok: false, error: "server_error", message: "장바구니를 처리하지 못했습니다." }, { status: 500 });

export async function GET() {
  return ok(await getCart());
}

export async function POST(req: NextRequest) {
  try {
    const b = await req.json();
    return ok(await addToCart(Number(b.productId), Number(b.qty) || 1, b.selections));
  } catch (e) {
    return fail(e);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const b = await req.json();
    return ok(await setQty(Number(b.lineId), Number(b.qty)));
  } catch (e) {
    return fail(e);
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("lineId");
  return ok(await removeLine(id == null ? undefined : Number(id)));
}
