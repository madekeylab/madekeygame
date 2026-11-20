import { NextResponse } from "next/server";

// 이메일 로그인 · 가입 자리. 회원 DB와 세션이 아직 없어 실제 처리는 하지 않는다.
// 연결할 때: 입력 검증 → 비밀번호 해시 저장/대조 → 세션 쿠키 발급 → { ok: true, data: { next } } 응답.
export async function POST() {
  return NextResponse.json({ ok: false, error: "not_ready", message: "회원 로그인은 아직 준비 중입니다. 비회원으로도 주문 · 주문 조회를 이용할 수 있습니다." });
}
