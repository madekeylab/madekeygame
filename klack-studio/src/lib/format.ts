export const won = (n: number) => Math.round(n).toLocaleString("ko-KR");
/** +10,000원 / −30,000원 / "" */
export const diff = (n: number) => (n > 0 ? `+${won(n)}원` : n < 0 ? `−${won(-n)}원` : "");
export const leadLabel = (days: number) => (days > 0 ? `주문 후 ${days}일` : "재고 출고");
export const shipFeeLabel = (fee: number) => (fee > 0 ? `${won(fee)}원` : "무료배송");
