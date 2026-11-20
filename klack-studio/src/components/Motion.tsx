"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** 스크롤 등장 효과([data-reveal]) · 화면 밖 애니메이션 정지([data-anim]) */
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") return;
    document.documentElement.setAttribute("data-motion", "");
    const reveal = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            reveal.unobserve(e.target);
          }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]:not([data-shown])").forEach((el) => reveal.observe(el));
    const off = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.toggleAttribute("data-offscreen", !e.isIntersecting);
      },
      { rootMargin: "80px 0px" },
    );
    document.querySelectorAll("[data-anim]").forEach((el) => off.observe(el));
    return () => {
      reveal.disconnect();
      off.disconnect();
    };
  }, [path]);
  return null;
}
