"use client";
import { useEffect, useState } from "react";
import { COLORWAYS, CW_COOKIE, isColorway } from "@/lib/site";

/** 컬러웨이 고르기 — 고르면 <html data-cw> 와 쿠키에 저장되어 사이트 전체 색이 바뀐다 */
export default function Colorway() {
  const [cw, setCw] = useState("signal");
  useEffect(() => {
    const cur = document.documentElement.getAttribute("data-cw");
    if (isColorway(cur)) setCw(cur!);
  }, []);
  const pick = (key: string) => {
    setCw(key);
    const root = document.documentElement;
    if (key === "signal") root.removeAttribute("data-cw");
    else root.setAttribute("data-cw", key);
    document.cookie = `${CW_COOKIE}=${key}; path=/; max-age=31536000; samesite=lax`;
  };
  return (
    <section className="v2-cw" data-v2-colorways="" aria-labelledby="v2-cw-t">
      <div className="page">
        <div className="v2-cw-in">
          <div className="v2-cw-head">
            <p className="v2-eyebrow">COLORWAY</p>
            <h2 id="v2-cw-t">오늘의 컬러웨이 고르기</h2>
            <p className="v2-cw-sub">키캡 세트처럼 세 가지 색을 한 벌로. 고르면 페이지 전체가 그 색으로 갈아입습니다.</p>
          </div>
          <div className="v2-cw-chips" role="radiogroup" aria-labelledby="v2-cw-t">
            {COLORWAYS.map((c) => (
              <button key={c.key} type="button" role="radio" aria-checked={cw === c.key} className="v2-cw-chip" onClick={() => pick(c.key)}>
                <span className="v2-cw-sw" aria-hidden="true">
                  {c.swatch.map((s, i) => (
                    <i key={i} style={{ background: s }} />
                  ))}
                </span>
                <b>{c.name}</b>
                <small>{c.ko}</small>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
