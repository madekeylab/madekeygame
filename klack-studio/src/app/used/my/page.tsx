import { redirect } from "next/navigation";

// 내 판매 글은 로그인해야 볼 수 있다
export default function Page() {
  redirect("/login?next=/used/my");
}
