// 주문 규칙 — 배송비, 입력 검증(주문서 화면과 주문 API가 같이 쓴다)
export const FREE_SHIP_OVER = 30000;
export const BASE_SHIP_FEE = 3000;
/** 상품별 배송비가 있으면 그 합, 없으면 3만원 이상 무료 */
export const shipFee = (productShipFee: number, pay: number) => (productShipFee > 0 ? Math.round(productShipFee) : pay >= FREE_SHIP_OVER ? 0 : BASE_SHIP_FEE);

export const PAY_LABEL = { bank: "무통장 입금", card: "신용카드", vbank: "가상계좌" } as const;
export type PayMethod = keyof typeof PAY_LABEL;
export const AVAILABLE_PAY_METHODS: PayMethod[] = ["bank"];
export const STATUS_LABEL = { pending: "주문접수", paid: "결제확인", inspect: "제작·타건 검수", packing: "출고", shipping: "배송중", done: "배송완료", canceled: "주문취소" } as const;

/** 입금 계좌(준비 전) */
export const BANK = { name: "준비중", account: "준비중", holder: "준비중" };
export const isBankReady = (b: typeof BANK) =>
  [b.name, b.account, b.holder].every((v) => {
    const t = (v ?? "").trim();
    return !!t && t !== "준비중" && !/^[0O\-\s]+$/.test(t) && !/^OO/.test(t);
  });

export type OrderForm = {
  ordererName: string;
  ordererTel: string;
  ordererEmail: string;
  receiverName: string;
  receiverTel: string;
  postcode: string;
  addr1: string;
  addr2: string;
  memo: string;
  payMethod: PayMethod;
  agree: boolean;
};
export const ORDER_FIELDS = ["ordererName", "ordererTel", "ordererEmail", "receiverName", "receiverTel", "postcode", "addr1", "addr2", "memo", "payMethod", "agree"] as const;
export type OrderField = (typeof ORDER_FIELDS)[number];
export const EMPTY_ORDER: OrderForm = { ordererName: "", ordererTel: "", ordererEmail: "", receiverName: "", receiverTel: "", postcode: "", addr1: "", addr2: "", memo: "", payMethod: AVAILABLE_PAY_METHODS[0], agree: false };

const tel = (v: string) => v.trim().replace(/\D/g, "");
const telOk = (v: string) => v.length >= 9 && v.length <= 11;

/** 주문서 검증. 통과하면 정리된 값, 아니면 필드별 첫 오류 */
export function validateOrder(f: OrderForm): { ok: true; data: OrderForm } | { ok: false; errors: Partial<Record<OrderField, string>> } {
  const e: Partial<Record<OrderField, string>> = {};
  const d: OrderForm = {
    ...f,
    ordererName: f.ordererName.trim(),
    ordererTel: tel(f.ordererTel),
    ordererEmail: f.ordererEmail.trim(),
    receiverName: f.receiverName.trim(),
    receiverTel: tel(f.receiverTel),
    postcode: f.postcode.trim(),
    addr1: f.addr1.trim(),
    addr2: f.addr2.trim(),
    memo: f.memo.trim(),
  };
  if (!d.ordererName || d.ordererName.length > 40) e.ordererName = "주문자명을 입력해 주세요.";
  if (!telOk(d.ordererTel)) e.ordererTel = "연락처를 확인해 주세요.";
  if (d.ordererEmail && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.ordererEmail) || d.ordererEmail.length > 120)) e.ordererEmail = "이메일 형식을 확인해 주세요.";
  if (!d.receiverName || d.receiverName.length > 40) e.receiverName = "받는 분을 입력해 주세요.";
  if (!telOk(d.receiverTel)) e.receiverTel = "연락처를 확인해 주세요.";
  if (!d.postcode || d.postcode.length > 10) e.postcode = "우편번호를 입력해 주세요.";
  if (!d.addr1 || d.addr1.length > 160) e.addr1 = "주소를 입력해 주세요.";
  if (d.addr2.length > 160) e.addr2 = "상세주소가 너무 깁니다.";
  if (d.memo.length > 200) e.memo = "배송메모는 200자까지 입력할 수 있습니다.";
  if (!AVAILABLE_PAY_METHODS.includes(d.payMethod)) e.payMethod = "결제수단을 선택해 주세요.";
  if (d.agree !== true) e.agree = "주문 내용 확인 및 결제에 동의해 주세요.";
  return Object.keys(e).length ? { ok: false, errors: e } : { ok: true, data: d };
}
