"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

/** 맨 위 '디자인 시안' 안내 띠. 닫으면 30일 동안 숨긴다. */
export default function CompareBar() {
  const path = usePathname() ?? "/";
  const [show, setShow] = useState(true);
  if (!show) return null;
  return (
    <div className="v2-cmp" data-v2-compare="" role="region" aria-label="디자인 시안 안내">
      <div className="page v2-cmp-in">
        <p className="v2-cmp-t">
          <span className="v2-cmp-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          {"디자인 시안 "}
          <b>v2 · COLORWAY</b>
          <span className="v2-cmp-sub"> — 같은 상품 · 같은 기능, 겉모습만 다른 두 번째 안</span>
        </p>
        <a className="v2-cmp-go" href={`https://klack.ensol.club${path}`}>
          v1 보기<span aria-hidden="true"> ↗</span>
        </a>
        <button
          type="button"
          className="v2-cmp-x"
          aria-label="시안 안내 숨기기"
          onClick={() => {
            document.cookie = "v2cmp=closed; path=/; max-age=2592000; samesite=lax";
            setShow(false);
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
      </div>
    </div>
  );
}
