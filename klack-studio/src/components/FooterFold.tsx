"use client";
import { useEffect, useState, type ReactNode } from "react";

/** 푸터 열 — 모바일에서는 접었다 펴는 아코디언 */
export default function FooterFold({ title, children }: { title: string; children: ReactNode }) {
  const [mobile, setMobile] = useState(false);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(max-width:760px)");
    const sync = () => {
      setMobile(mq.matches);
      setOpen(!mq.matches);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return (
    <div className={`ft-col ft-fold${open ? " is-open" : ""}`}>
      {mobile ? (
        <h3>
          <button type="button" className="ft-fold-btn" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {title}
            <i aria-hidden="true">{open ? "−" : "+"}</i>
          </button>
        </h3>
      ) : (
        <h3>{title}</h3>
      )}
      <div hidden={!open}>{children}</div>
    </div>
  );
}
