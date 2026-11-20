"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "홈", match: (p: string) => p === "/", icon: <path d="M3 10.5 12 3l9 7.5M5 9.5V21h5v-6h4v6h5V9.5" /> },
  {
    href: "/category/all",
    label: "카테고리",
    match: (p: string) => p.startsWith("/category") || p.startsWith("/brand"),
    icon: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.3" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.3" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.3" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.3" />
      </>
    ),
  },
  {
    href: "/search",
    label: "검색",
    match: (p: string) => p.startsWith("/search") || p.startsWith("/ranking"),
    icon: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  { href: "/wishlist", label: "찜", match: (p: string) => p.startsWith("/wishlist"), icon: <path d="M12 20.5C6 16.5 3.5 13 3.5 9.3 3.5 6.6 5.6 4.7 8 4.7c1.6 0 3.1.8 4 2.2.9-1.4 2.4-2.2 4-2.2 2.4 0 4.5 1.9 4.5 4.6 0 3.7-2.5 7.2-8.5 11.2Z" /> },
  {
    href: "/mypage",
    label: "마이",
    match: (p: string) => p.startsWith("/mypage") || p.startsWith("/membership") || p.startsWith("/order"),
    icon: (
      <>
        <circle cx="12" cy="8" r="3.6" />
        <path d="M5 20c0-3.6 3.13-6 7-6s7 2.4 7 6" />
      </>
    ),
  },
];

/** 모바일 하단 탭 */
export default function MobileTab() {
  const path = usePathname() || "/";
  return (
    <nav className="mtab" aria-label="모바일 메뉴">
      {TABS.map((t) => {
        const on = t.match(path);
        return (
          <Link key={t.href} href={t.href} className={on ? "on" : ""} aria-current={on ? "page" : undefined}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              {t.icon}
            </svg>
            <span>{t.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
