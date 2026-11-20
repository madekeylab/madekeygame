import type { ReactNode } from "react";

const STEPS = ["장바구니", "주문서 작성", "주문 완료"];

/** 장바구니 · 주문서 · 찜 페이지 머리말. step(1~3)을 주면 진행 단계를 함께 그린다 */
export default function PageHead({ eyebrow, title, desc, step, children }: { eyebrow: string; title: string; desc: string; step?: number; children?: ReactNode }) {
  return (
    <header className="ph">
      <div className="ph-main">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="ph-title">{title}</h1>
        <p className="ph-desc">{desc}</p>
      </div>
      {step != null && (
        <ol className="ph-steps" aria-label="진행 단계">
          {STEPS.map((label, i) => {
            const n = i + 1;
            return (
              <li key={label} className={n < step ? "is-done" : n === step ? "is-current" : "is-todo"}>
                <span className="ph-step-no">{n < step ? "✓" : String(n).padStart(2, "0")}</span>
                <span className="ph-step-label">{label}</span>
              </li>
            );
          })}
        </ol>
      )}
      {children}
    </header>
  );
}
