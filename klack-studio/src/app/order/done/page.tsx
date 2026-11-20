import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";
import PageHead from "@/components/cart/PageHead";
import { won } from "@/lib/format";
import { BANK, isBankReady, PAY_LABEL, STATUS_LABEL } from "@/lib/order";
import { getOrder } from "@/lib/orders-server";

export const metadata: Metadata = { title: "주문 완료" };

// 주문 완료 화면. 원본 사이트의 이 화면은 확인하지 못해(실제 주문이 필요) 주문서와 같은 부품으로 새로 구성했다.
export default async function Page({ searchParams }: { searchParams: Promise<{ no?: string }> }) {
  const no = ((await searchParams).no ?? "").trim();
  const order = no ? getOrder(no) : undefined;
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "core-7", "checkout", "shop-7"]} />
      <Band />
      <main className="page shop-main">
        <PageHead eyebrow="Order Complete" title="주문 완료" desc={order ? "주문이 접수되었습니다. 입금이 확인되면 제작 · 출고가 진행됩니다." : "주문 정보를 찾지 못했습니다. 주문 조회에서 주문번호로 다시 확인해 주세요."} step={4} />
        {order ? (
          <div className="co">
            <div className="co-main">
              <section className="co-sec card" aria-labelledby="od-items-h">
                <div className="co-sec-h">
                  <h2 id="od-items-h">
                    주문 상품 <b>{order.lines.length}</b>
                  </h2>
                  <span className="co-sec-more">주문번호 {order.orderNo}</span>
                </div>
                <ul className="co-items">
                  {order.lines.map((l) => (
                    <li key={l.id} className="co-item">
                      <Link href={`/product/${l.productId}`} className="co-thumb">
                        {l.thumbUrl ? <img src={l.thumbUrl} width={64} height={64} alt="" aria-hidden="true" /> : null}
                      </Link>
                      <div className="co-item-body">
                        <Link href={`/product/${l.productId}`} className="co-item-name">
                          {l.name}
                        </Link>
                        {l.optionLabel && (
                          <p className="crt-opt">
                            <span className="crt-opt-label">{l.optionLabel}</span>
                          </p>
                        )}
                        <p className="co-item-qty">
                          {won(l.salePrice)}원 × {l.qty}개
                        </p>
                      </div>
                      <div className="co-item-pay">{won(l.linePay)}원</div>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="co-sec card" aria-labelledby="od-ship-h">
                <div className="co-sec-h">
                  <h2 id="od-ship-h">배송지</h2>
                </div>
                <p className="co-sec-sub">
                  {order.form.receiverName} · {order.form.receiverTel}
                  <br />({order.form.postcode}) {order.form.addr1} {order.form.addr2}
                  {order.form.memo && (
                    <>
                      <br />
                      배송메모: {order.form.memo}
                    </>
                  )}
                </p>
              </section>
              <section className="co-sec card" aria-labelledby="od-pay-h">
                <div className="co-sec-h">
                  <h2 id="od-pay-h">결제</h2>
                </div>
                <p className="co-pay-one">
                  <b>{PAY_LABEL[order.form.payMethod]}</b>
                  {STATUS_LABEL[order.status]} 상태입니다.
                </p>
                <p className="co-pay-bank">{isBankReady(BANK) ? `입금 계좌: ${BANK.name} ${BANK.account} · ${BANK.holder}` : "입금 계좌는 준비중입니다."}</p>
                <p className="co-demo">
                  <i>DEMO</i>
                  <span>데모 환경이라 실제 결제는 이루어지지 않습니다. 주문은 「주문접수」 상태로만 저장됩니다.</span>
                </p>
              </section>
            </div>
            <aside className="co-side">
              <div className="co-sum card">
                <h2>결제 금액</h2>
                <div>
                  <span>총 상품금액</span>
                  <b>{won(order.totalList)}원</b>
                </div>
                <div>
                  <span>총 할인금액</span>
                  <b className="co-off">{order.totalDiscount > 0 ? `-${won(order.totalDiscount)}` : "0"}원</b>
                </div>
                <div>
                  <span>배송비</span>
                  <b>{order.shipFee === 0 ? <em className="co-free">무료</em> : `${won(order.shipFee)}원`}</b>
                </div>
                {order.leadDaysMax > 0 && (
                  <p className="co-ship-kind">
                    제작 납기 최대 <b>{order.leadDaysMax}일</b>
                  </p>
                )}
                <div className="co-sum-total">
                  <span>결제금액</span>
                  <strong>{won(order.totalPay)}원</strong>
                </div>
                <Link href="/category/all" className="btn btn-primary co-submit">
                  쇼핑 계속하기
                </Link>
                <p className="co-note">주문 내역은 주문 조회에서 주문번호와 연락처로 확인할 수 있습니다.</p>
              </div>
            </aside>
          </div>
        ) : (
          <div className="co-empty">
            <p>주문 정보를 찾지 못했습니다.</p>
            <Link href="/order" className="btn btn-primary">
              주문 조회로 가기
            </Link>
          </div>
        )}
      </main>
      <Tail />
    </>
  );
}
