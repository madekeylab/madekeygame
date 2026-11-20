"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { catHref, COMMUNITY_MENU, NAV_AXES, SHOP_MENU, STUDIO_MENU } from "@/lib/site";
import SearchBox from "./SearchBox";
import { IcoCart, IcoSearch } from "./icons";

/** 헤더 장바구니 아이콘 + 담긴 줄 수 배지 */
export function CartBadge() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let alive = true;
    const load = () =>
      fetch("/api/cart", { headers: { accept: "application/json" } })
        .then((r) => r.json())
        .then((j) => {
          if (alive && j?.ok) setCount(Number(j.data?.summary?.count) || 0);
        })
        .catch(() => {});
    load();
    window.addEventListener("mall:cart-changed", load);
    return () => {
      alive = false;
      window.removeEventListener("mall:cart-changed", load);
    };
  }, []);
  return (
    <Link href="/cart" className="hdr-ico kx-cart" aria-label={count ? `장바구니 ${count}개` : "장바구니"}>
      <IcoCart />
      {count > 0 && (
        <b className="kx-badge" aria-hidden="true">
          {count > 99 ? "99+" : count}
        </b>
      )}
    </Link>
  );
}

/** 데스크톱 상단 메뉴 */
export function HeaderNav() {
  const path = usePathname() ?? "/";
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const apply = () => {
      raf = 0;
      root.toggleAttribute("data-scrolled", window.scrollY > 24);
    };
    const onScroll = () => {
      raf ||= requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  const cur = (href: string) => (path === href || path.startsWith(href + "/") ? "page" : undefined);
  return (
    <nav className="kx-nav" aria-label="쇼핑 메뉴">
      <ul>
        <li className="kx-dd-wrap">
          <Link href="/category/all" aria-haspopup="true">
            <span>카테고리 ▾</span>
          </Link>
          <div className="kx-dd">
            <ul>
              {NAV_AXES.map((a) => (
                <li key={a.key}>
                  <Link href={catHref(a.slug)} aria-current={cur(catHref(a.slug))}>
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
        {SHOP_MENU.map((m) => (
          <li key={m.key}>
            <Link href={m.href} aria-current={cur(m.href)}>
              <span>{m.label}</span>
            </Link>
          </li>
        ))}
        <li className="kx-nav-sep" aria-hidden="true" />
        <li className="kx-dd-wrap">
          <Link href="/workshop" aria-haspopup="true" aria-current={cur("/workshop")}>
            <span>공방 ▾</span>
          </Link>
          <div className="kx-dd">
            <ul>
              {STUDIO_MENU.map((m) => (
                <li key={m.key}>
                  <Link href={m.href} aria-current={cur(m.href)}>
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>
        <li className="kx-dd-wrap">
          <Link href={COMMUNITY_MENU[0].href} aria-haspopup="true" aria-current={COMMUNITY_MENU.some((m) => cur(m.href) || m.children?.some((c) => cur(c.href))) ? "page" : undefined}>
            <small aria-hidden="true">COM</small>
            <span>커뮤니티 ▾</span>
          </Link>
          <div className="kx-dd">
            <ul>
              {COMMUNITY_MENU.map((m) =>
                m.children ? (
                  <li key={m.key} className="kx-dd-sub">
                    <Link href={m.href} aria-haspopup="true" aria-current={cur(m.href)}>
                      <i aria-hidden="true">‹</i>
                      {m.label}
                    </Link>
                    <div className="kx-dd kx-dd-fly">
                      <ul>
                        {m.children.map((c) => (
                          <li key={c.key}>
                            <Link href={c.href} aria-current={cur(c.href)}>
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={m.key}>
                    <Link href={m.href} aria-current={cur(m.href)}>
                      {m.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
}

/** 데스크톱 검색 버튼 + 펼침 패널 */
export function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => panel.current?.querySelector("input")?.focus(), 60);
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const down = (e: MouseEvent) => {
      if (panel.current && !panel.current.parentElement?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", key);
    document.addEventListener("mousedown", down);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", key);
      document.removeEventListener("mousedown", down);
    };
  }, [open]);
  return (
    <div className="kx-search">
      <button type="button" className="hdr-ico" aria-label="검색" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
        <IcoSearch />
      </button>
      <div ref={panel} className={`kx-search-panel${open ? " is-open" : ""}`} inert={!open}>
        <div className="page kx-search-in">
          <span className="kx-search-label" aria-hidden="true">
            검색
          </span>
          {open && <SearchBox />}
        </div>
      </div>
    </div>
  );
}
