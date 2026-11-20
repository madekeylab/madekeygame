import { redirect } from "next/navigation";

// 로그인 기능 연결 전까지는 로그인 화면으로 보낸다
export default function Page() {
  redirect("/login?next=/mypage");
}
