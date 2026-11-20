"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Toast = { id: number; text: string; href?: string; label?: string };

/** window 'mall:toast' 이벤트를 받아 화면 아래에 잠깐 띄운다 */
export default function Toasts() {
  const [list, setList] = useState<Toast[]>([]);
  useEffect(() => {
    let seq = 0;
    const on = (e: Event) => {
      const d = (e as CustomEvent).detail;
      const id = ++seq;
      setList((l) => [...l.slice(-2), { id, ...d }]);
      window.setTimeout(() => setList((l) => l.filter((t) => t.id !== id)), 2800);
    };
    window.addEventListener("mall:toast", on);
    return () => window.removeEventListener("mall:toast", on);
  }, []);
  if (!list.length) return null;
  return (
    <div className="toast-stack" role="status" aria-live="polite">
      {list.map((t) => (
        <div key={t.id} className="toast">
          <span>{t.text}</span>
          {t.href && (
            <Link href={t.href} className="toast-link">
              {t.label ?? "보기"} ›
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}
