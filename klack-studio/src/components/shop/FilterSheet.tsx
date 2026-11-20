"use client";
import { useRef, type ReactNode } from "react";

/** 모바일 필터 시트(<details>). '상품 N개 보기'를 누르면 닫힌다. */
export default function FilterSheet({ applied, total, resetHref, children }: { applied: number; total: number; resetHref?: string; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  return (
    <details className="fl-fsheet" ref={ref}>
      <summary className="fl-fbtn">
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
          <path d="M3 5h14M6 10h8M9 15h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
        필터{applied > 0 && <i>{applied}</i>}
      </summary>
      <div className="fl-fsheet-body" role="dialog" aria-label="상품 필터">
        <p className="fl-fsheet-h">
          <b>필터</b>
          {resetHref && (
            <a className="fl-fsheet-reset" href={resetHref}>
              초기화
            </a>
          )}
        </p>
        {children}
        <button type="button" className="fl-fsheet-go" onClick={() => ref.current?.removeAttribute("open")}>
          상품 {total}개 보기
        </button>
      </div>
    </details>
  );
}
