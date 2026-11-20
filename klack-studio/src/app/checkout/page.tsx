import type { Metadata } from "next";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import CheckoutForm from "@/components/cart/CheckoutForm";
import PageHead from "@/components/cart/PageHead";
import { getCart } from "@/lib/cart-server";

export const metadata: Metadata = { title: "주문서" };

export default async function Page() {
  const { data, plan } = await getCart();
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "core-7", "checkout", "shop-7"]} />
      <Band />
      <main className="page shop-main">
        <PageHead eyebrow="Checkout" title="주문서" desc="비회원도 주문할 수 있습니다. 로그인하면 등급 할인과 포인트가 적용됩니다." step={2} />
        <CheckoutForm initial={data} initialPlan={plan} />
      </main>
      <Tail />
    </>
  );
}
