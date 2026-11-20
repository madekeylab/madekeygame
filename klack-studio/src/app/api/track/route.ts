import { NextResponse } from "next/server";

// 상품 조회 기록 수집 자리. 지금은 받기만 한다.
export async function POST() {
  return NextResponse.json({ ok: true });
}
