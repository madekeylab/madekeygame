import { NextRequest, NextResponse } from "next/server";
import { getCart, removeLine } from "@/lib/cart-server";
import { validateOrder } from "@/lib/order";
import { createOrder } from "@/lib/orders-server";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ ok: false, error: "bad_request", message: "입력 내용을 확인해 주세요." }, { status: 400 });
  const v = validateOrder(body);
  if (!v.ok) return NextResponse.json({ ok: false, error: "validation", message: "입력 내용을 확인해 주세요.", fieldErrors: v.errors }, { status: 400 });
  // 금액은 화면 값을 믿지 않고 장바구니에서 다시 계산한다
  const { data, plan } = await getCart();
  if (!data.lines.length) return NextResponse.json({ ok: false, error: "cart_empty", message: "장바구니가 비어 있습니다." }, { status: 400 });
  const order = createOrder(v.data, data.lines, data.summary, plan.productShipFee, plan.leadDaysMax);
  await removeLine();
  return NextResponse.json({ ok: true, data: { orderNo: order.orderNo } });
}
