"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type InputHTMLAttributes, type ReactNode } from "react";
import { LineOption } from "@/components/CartDrawer";
import { won } from "@/lib/format";
import { AVAILABLE_PAY_METHODS, BANK, EMPTY_ORDER, FREE_SHIP_OVER, isBankReady, ORDER_FIELDS, PAY_LABEL, shipFee, validateOrder, type OrderField, type OrderForm } from "@/lib/order";
import type { CartData, CartLine, CartPlan } from "@/lib/types";

type Errors = Partial<Record<OrderField, string>>;
type Fail = { code: string; message: string; items?: string[]; fieldErrors?: Errors };
type FocusEl = HTMLInputElement | HTMLTextAreaElement | null;

type FieldProps = { id: string; label: string; error?: string; hint?: string; required?: boolean; wide?: boolean; multiline?: boolean; inputRef: (el: FocusEl) => void } & Omit<InputHTMLAttributes<HTMLInputElement & HTMLTextAreaElement>, "id">;

function Field({ id, label, error, hint, required, wide, multiline, inputRef, ...rest }: FieldProps) {
  const errId = `${id}-err`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errId : null, hint ? hintId : null].filter(Boolean).join(" ") || undefined;
  const common = { id, "aria-invalid": !!error || undefined, "aria-describedby": describedBy, "aria-required": required || undefined };
  return (
    <div className={`co-f${wide ? " co-f-wide" : ""}`}>
      <label htmlFor={id}>
        {label}
        {required && <i aria-hidden="true">*</i>}
      </label>
      {multiline ? <textarea ref={inputRef} {...common} {...rest} /> : <input ref={inputRef} {...common} {...rest} />}
      {error && (
        <p id={errId} className="co-err" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={hintId} className="co-hint">
          {hint}
        </p>
      )}
    </div>
  );
}

function Items({ lines, plan }: { lines: CartLine[]; plan: CartPlan }) {
  const lead = new Map(plan.items.map((i) => [i.productId, i.leadDays]));
  return (
    <section className="co-sec card" aria-labelledby="co-items-h">
      <div className="co-sec-h">
        <h2 id="co-items-h">
          주문 상품 <b>{lines.length}</b>
        </h2>
        <Link href="/cart" className="co-sec-more">
          장바구니에서 수정 ›
        </Link>
      </div>
      <ul className="co-items">
        {lines.map((l) => {
          const days = lead.get(l.productId) ?? 0;
          return (
            <li key={l.id} className="co-item">
              <Link href={`/product/${l.productId}`} className="co-thumb">
                {l.thumbUrl ? <img src={l.thumbUrl} width={64} height={64} alt="" aria-hidden="true" /> : null}
              </Link>
              <div className="co-item-body">
                <p className="co-item-brand">{l.brandName}</p>
                <Link href={`/product/${l.productId}`} className="co-item-name">
                  {l.name}
                </Link>
                <LineOption line={l} />
                <p className="co-item-qty">
                  {won(l.salePrice)}원 × {l.qty}개
                </p>
                {days > 0 && (
                  <p className="co-item-tags">
                    <span>납기 {days}일</span>
                  </p>
                )}
              </div>
              <div className="co-item-pay">{won(l.linePay)}원</div>
            </li>
          );
        })}
      </ul>
      {plan.productShipFee > 0 && <p className="co-group-note">상품별 배송비가 합산되어 결제금액에 포함됩니다.</p>}
    </section>
  );
}

function Summary({ summary, busy, canSubmit, lockReason, plan, children }: { summary: CartData["summary"]; busy: boolean; canSubmit: boolean; lockReason: string | null; plan: CartPlan; children?: ReactNode }) {
  const pay = summary.totalPay;
  const ship = shipFee(plan.productShipFee, pay);
  const perProduct = plan.productShipFee > 0;
  const more = FREE_SHIP_OVER - pay;
  const total = pay + ship;
  return (
    <aside className="co-side">
      <div className="co-sum card">
        <h2>결제 예정 금액</h2>
        <div>
          <span>총 상품금액</span>
          <b>{won(summary.totalList)}원</b>
        </div>
        <div>
          <span>총 할인금액</span>
          <b className="co-off">{summary.totalDiscount > 0 ? `-${won(summary.totalDiscount)}` : "0"}원</b>
        </div>
        <div>
          <span>배송비</span>
          <b>{ship === 0 ? <em className="co-free">무료</em> : `${won(ship)}원`}</b>
        </div>
        <p className="co-ship-note">
          {perProduct ? (
            <>상품별 배송비 합계입니다.</>
          ) : (
            <>
              {FREE_SHIP_OVER / 10000}만원 이상 무료배송
              {ship > 0 && more > 0 && (
                <>
                  {" · "}
                  <b>{won(more)}원</b> 더 담으면 무료
                </>
              )}
            </>
          )}
        </p>
        {plan.leadDaysMax > 0 && (
          <p className="co-ship-kind">
            제작 납기 최대 <b>{plan.leadDaysMax}일</b>
          </p>
        )}
        <div className="co-sum-total">
          <span>결제예정금액</span>
          <strong>{won(total)}원</strong>
        </div>
        {children}
        <button type="submit" className="btn btn-primary co-submit" disabled={!canSubmit || busy} aria-busy={busy || undefined}>
          {busy ? "주문을 접수하는 중…" : `${won(total)}원 주문하기`}
        </button>
        {!busy && !canSubmit && lockReason && (
          <p className="co-lock" aria-live="polite">
            {lockReason}
          </p>
        )}
        <div className="co-mbar" aria-hidden="false">
          <span>
            <small>총 결제금액</small>
            <b>{won(total)}원</b>
          </span>
          <button type="submit" form="co-form" className="btn btn-primary" disabled={!canSubmit || busy}>
            {busy ? "접수 중…" : "주문하기"}
          </button>
        </div>
        <p className="co-note">표시 금액은 미리보기이며, 확정 금액은 주문 접수 시 서버가 상품 가격을 다시 읽어 계산합니다.</p>
      </div>
    </aside>
  );
}

function Alert({ fail }: { fail: Fail }) {
  return (
    <div className="co-alert" role="alert">
      <p>
        <strong>주문을 접수하지 못했습니다.</strong> {fail.message}
      </p>
      {fail.code === "out_of_stock" && fail.items && fail.items.length > 0 && (
        <ul>
          {fail.items.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}
      {fail.code === "out_of_stock" && (
        <p>
          <Link href="/cart">장바구니에서 수량 조정하기 ›</Link>
        </p>
      )}
      {fail.code === "cart_empty" && (
        <p>
          <Link href="/cart">장바구니로 가기 ›</Link>
        </p>
      )}
    </div>
  );
}

const FAIL_TEXT: Record<string, string> = { out_of_stock: "재고가 부족한 상품이 있습니다.", cart_empty: "장바구니가 비어 있습니다.", bad_request: "입력 내용을 확인해 주세요.", validation: "입력 내용을 확인해 주세요.", invalid: "입력 내용을 확인해 주세요." };

/** 주문서 — 주문자 · 받는 분 · 배송지 · 결제수단 · 동의 → /api/orders */
export default function CheckoutForm({ initial, initialPlan }: { initial: CartData; initialPlan: CartPlan }) {
  const router = useRouter();
  const [cart, setCart] = useState(initial);
  const [plan, setPlan] = useState(initialPlan);
  const [form, setForm] = useState<OrderForm>(EMPTY_ORDER);
  const [same, setSame] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [fail, setFail] = useState<Fail | null>(null);
  const [busy, setBusy] = useState(false);
  const refs = useRef<Partial<Record<OrderField, FocusEl>>>({});
  const ref = (k: OrderField) => (el: FocusEl) => {
    refs.current[k] = el;
  };
  const { lines, summary } = cart;

  if (!lines.length)
    return (
      <div className="co-empty">
        <p>담긴 상품이 없습니다.</p>
        <Link href="/category/all" className="btn btn-primary">
          쇼핑하러 가기
        </Link>
      </div>
    );

  const set = <K extends OrderField>(k: K, v: OrderForm[K]) => {
    setForm((f) => {
      const n = { ...f, [k]: v };
      if (same && k === "ordererName") n.receiverName = v as string;
      if (same && k === "ordererTel") n.receiverTel = v as string;
      return n;
    });
    setErrors((e) => {
      if (!e[k]) return e;
      const { [k]: _drop, ...rest } = e;
      return rest;
    });
  };
  const focusFirst = (e: Errors) => {
    const k = ORDER_FIELDS.find((k) => e[k]);
    if (k) refs.current[k]?.focus();
  };
  const reloadCart = async () => {
    try {
      const r = await fetch("/api/cart", { cache: "no-store" });
      const j = await r.json();
      if (j?.ok) {
        setCart(j.data);
        if (j.plan) setPlan(j.plan);
        window.dispatchEvent(new CustomEvent("mall:cart-changed"));
      }
    } catch {}
  };
  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (busy) return;
    setFail(null);
    const v = validateOrder(form);
    if (!v.ok) {
      setErrors(v.errors);
      focusFirst(v.errors);
      return;
    }
    setBusy(true);
    try {
      const r = await fetch("/api/orders", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...v.data, usePoints: 0 }) });
      const j = await r.json().catch(() => null);
      if (r.ok && j?.ok) {
        const no = j.data?.orderNo;
        if (typeof no === "string" && no) {
          window.dispatchEvent(new CustomEvent("mall:cart-changed"));
          router.push(`/order/done?no=${encodeURIComponent(no)}`);
          return;
        }
        setFail({ code: "bad_response", message: "주문은 접수됐지만 주문번호를 받지 못했습니다. 주문조회에서 확인해 주세요." });
        return;
      }
      const code: string = j?.error ?? (r.status >= 500 ? "server" : "unknown");
      const f: Fail = { code, message: j?.message ?? FAIL_TEXT[code] ?? "잠시 후 다시 시도해 주세요.", items: j?.items, fieldErrors: j?.fieldErrors };
      if (f.fieldErrors) {
        setErrors(f.fieldErrors);
        focusFirst(f.fieldErrors);
      }
      setFail(f);
      if (code === "out_of_stock" || code === "cart_empty") reloadCart();
    } catch {
      setFail({ code: "network", message: "서버와 연결하지 못했습니다. 잠시 후 다시 시도해 주세요." });
    } finally {
      setBusy(false);
    }
  };
  const lockReason = form.agree ? null : "주문 내용 확인 및 결제 진행에 동의하면 주문할 수 있습니다.";

  return (
    <form id="co-form" className="co" onSubmit={submit} noValidate aria-busy={busy || undefined}>
      <div className="co-main">
        <Items lines={lines} plan={plan} />
        <section className="co-sec card" aria-labelledby="co-orderer-h">
          <div className="co-sec-h">
            <h2 id="co-orderer-h">주문자</h2>
          </div>
          <div className="co-grid">
            <Field id="ordererName" label="이름" required autoComplete="name" inputRef={ref("ordererName")} value={form.ordererName} onChange={(e) => set("ordererName", e.target.value)} error={errors.ordererName} disabled={busy} />
            <Field id="ordererTel" label="연락처" required type="tel" inputMode="tel" autoComplete="tel" placeholder="01012345678" inputRef={ref("ordererTel")} value={form.ordererTel} onChange={(e) => set("ordererTel", e.target.value)} error={errors.ordererTel} disabled={busy} />
            <Field id="ordererEmail" label="이메일" type="email" inputMode="email" autoComplete="email" wide hint="주문 확인 메일을 받을 주소(선택)" inputRef={ref("ordererEmail")} value={form.ordererEmail} onChange={(e) => set("ordererEmail", e.target.value)} error={errors.ordererEmail} disabled={busy} />
          </div>
        </section>
        <section className="co-sec card" aria-labelledby="co-receiver-h">
          <div className="co-sec-h">
            <h2 id="co-receiver-h">받는 분</h2>
            <label className="co-check">
              <input
                type="checkbox"
                id="sameAsOrderer"
                checked={same}
                onChange={(e) => {
                  const on = e.target.checked;
                  setSame(on);
                  if (on) {
                    setForm((f) => ({ ...f, receiverName: f.ordererName, receiverTel: f.ordererTel }));
                    setErrors(({ receiverName: _a, receiverTel: _b, ...rest }) => rest);
                  }
                }}
                disabled={busy}
              />
              <span>주문자와 동일</span>
            </label>
          </div>
          <div className="co-grid">
            <Field id="receiverName" label="이름" required autoComplete="shipping name" readOnly={same} inputRef={ref("receiverName")} value={form.receiverName} onChange={(e) => set("receiverName", e.target.value)} error={errors.receiverName} disabled={busy} />
            <Field id="receiverTel" label="연락처" required type="tel" inputMode="tel" autoComplete="shipping tel" placeholder="01012345678" readOnly={same} inputRef={ref("receiverTel")} value={form.receiverTel} onChange={(e) => set("receiverTel", e.target.value)} error={errors.receiverTel} disabled={busy} />
          </div>
        </section>
        <section className="co-sec card" aria-labelledby="co-addr-h">
          <div className="co-sec-h">
            <h2 id="co-addr-h">배송지</h2>
          </div>
          <p className="co-sec-sub">우편번호 검색은 제공하지 않습니다. 우편번호와 주소를 직접 입력해 주세요.</p>
          <div className="co-grid">
            <Field id="postcode" label="우편번호" required inputMode="numeric" autoComplete="shipping postal-code" placeholder="5자리" inputRef={ref("postcode")} value={form.postcode} onChange={(e) => set("postcode", e.target.value)} error={errors.postcode} disabled={busy} />
            <Field id="addr1" label="주소" required wide autoComplete="shipping address-line1" placeholder="도로명 또는 지번 주소" inputRef={ref("addr1")} value={form.addr1} onChange={(e) => set("addr1", e.target.value)} error={errors.addr1} disabled={busy} />
            <Field id="addr2" label="상세주소" wide autoComplete="shipping address-line2" placeholder="동·호수 등" inputRef={ref("addr2")} value={form.addr2} onChange={(e) => set("addr2", e.target.value)} error={errors.addr2} disabled={busy} />
            <Field id="memo" label="배송메모" wide multiline maxLength={200} placeholder="예) 부재 시 문 앞에 두어 주세요" inputRef={ref("memo")} value={form.memo} onChange={(e) => set("memo", e.target.value)} error={errors.memo} disabled={busy} />
          </div>
        </section>
        <section className="co-sec card" aria-labelledby="co-pay-h">
          <div className="co-sec-h">
            <h2 id="co-pay-h">결제수단</h2>
          </div>
          {AVAILABLE_PAY_METHODS.length > 1 ? (
            <div className="co-pay" role="radiogroup" aria-labelledby="co-pay-h" aria-describedby="co-pay-demo">
              {AVAILABLE_PAY_METHODS.map((m, i) => (
                <label key={m}>
                  <input type="radio" name="payMethod" value={m} checked={form.payMethod === m} onChange={() => set("payMethod", m)} disabled={busy} ref={i === 0 ? ref("payMethod") : undefined} />
                  {PAY_LABEL[m]}
                </label>
              ))}
            </div>
          ) : (
            <p className="co-pay-one">
              <b>{PAY_LABEL[form.payMethod]}</b>입금이 확인되면 제작·출고가 진행됩니다.
            </p>
          )}
          {errors.payMethod && (
            <p className="co-err" role="alert">
              {errors.payMethod}
            </p>
          )}
          {form.payMethod === "bank" && <p className="co-pay-bank">{isBankReady(BANK) ? `입금 계좌: ${BANK.name} ${BANK.account} · ${BANK.holder}` : "입금 계좌는 준비중입니다."}</p>}
          <p className="co-demo" id="co-pay-demo">
            <i>DEMO</i>
            <span>데모 환경이라 실제 결제는 이루어지지 않습니다. 주문은 「주문접수」 상태로만 저장됩니다.</span>
          </p>
        </section>
        <section className="co-sec card" aria-labelledby="co-agree-h">
          <h2 id="co-agree-h" className="sr-only">
            동의
          </h2>
          <label className="co-check">
            <input type="checkbox" id="agree" checked={form.agree} onChange={(e) => set("agree", e.target.checked)} ref={ref("agree")} disabled={busy} aria-describedby={errors.agree ? "agree-err" : undefined} />
            <span>
              <b>주문 내용을 확인했으며 결제 진행에 동의합니다.</b>
              <br />
              상품·수량·배송지를 다시 한 번 확인해 주세요.
            </span>
          </label>
          {errors.agree && (
            <p id="agree-err" className="co-err" role="alert">
              {errors.agree}
            </p>
          )}
        </section>
      </div>
      <Summary summary={summary} busy={busy} canSubmit={form.agree} lockReason={lockReason} plan={plan}>
        {fail && <Alert fail={fail} />}
      </Summary>
    </form>
  );
}
