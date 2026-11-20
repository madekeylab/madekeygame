export const won = (n: number) => `${n.toLocaleString('ko-KR')}원`;

export const FREE_SHIPPING_FROM = 50000;
export const SHIPPING_FEE = 3000;

export const shippingFor = (subtotal: number) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE;

export const newId = (prefix: string) =>
  `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export const today = () => new Date().toISOString().slice(0, 10);
