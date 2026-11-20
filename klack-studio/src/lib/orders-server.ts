// 주문 저장소 — 지금은 서버 메모리(재시작 시 초기화). DB 연결 시 이 파일만 교체하면 된다.
import { shipFee, type OrderForm } from "./order";
import type { CartLine } from "./types";

export type Order = {
  orderNo: string;
  createdAt: string;
  status: "pending";
  form: Omit<OrderForm, "agree">;
  lines: CartLine[];
  totalList: number;
  totalDiscount: number;
  shipFee: number;
  totalPay: number;
  leadDaysMax: number;
};

const g = globalThis as unknown as { __klackOrders?: Map<string, Order>; __klackOrderSeq?: number };
const store = (g.__klackOrders ??= new Map<string, Order>());

export function createOrder(form: OrderForm, lines: CartLine[], sum: { totalList: number; totalDiscount: number; totalPay: number }, productShipFee: number, leadDaysMax: number): Order {
  const now = new Date();
  const ymd = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  g.__klackOrderSeq = (g.__klackOrderSeq ?? 0) + 1;
  // 주문번호: YYYYMMDD-NNNN (원본 주문조회 형식과 같음)
  const orderNo = `${ymd}-${String(1000 + ((g.__klackOrderSeq * 37 + now.getSeconds()) % 9000)).padStart(4, "0")}`;
  const ship = shipFee(productShipFee, sum.totalPay);
  const { agree: _agree, ...rest } = form;
  const order: Order = { orderNo, createdAt: now.toISOString(), status: "pending", form: rest, lines, totalList: sum.totalList, totalDiscount: sum.totalDiscount, shipFee: ship, totalPay: sum.totalPay + ship, leadDaysMax };
  store.set(orderNo, order);
  return order;
}
export const getOrder = (orderNo: string) => store.get(orderNo);
