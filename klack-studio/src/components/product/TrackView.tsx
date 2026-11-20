"use client";
import { useEffect } from "react";

/** 상품 조회 기록 전송 */
export default function TrackView({ productId }: { productId: number }) {
  useEffect(() => {
    fetch("/api/track", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ type: "view", productId }), keepalive: true }).catch(() => {});
  }, [productId]);
  return null;
}
