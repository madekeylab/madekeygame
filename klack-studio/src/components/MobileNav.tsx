"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { createPortal } from "react-dom";
import { BRAND, catHref, COMMUNITY_MENU, NAV_AXES } from "@/lib/site";
import SearchBox from "./SearchBox";

const svg = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.4", "aria-hidden": true } as const;
const ICON = {
  menu: (
    <svg {...svg} width="22" height="22">
      <path d="M3 7h18M3 12h18M3 17h12" />
    </svg>
  ),
  search: (
    <svg {...svg} width="21" height="21">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  ),
  close: (
    <svg {...svg} width="22" height="22">
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  ),
  plus: (
    <svg {...svg} width="16" height="16">
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
};

/** 레이어가 열려 있는 동안: 스크롤 잠금, 포커스 가두기, ESC · 뒤로가기로 닫기 */
function useLayer(open: boolean, close: () => void, ref: RefObject<HTMLDivElement | null>, viaUrl = false) {
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const y = window.scrollY;
    document.body.style.top = `-${y}px`;
    root.classList.add("mn-lock");
    const t = setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      if (el.hasAttribute("data-focus-self")) return void el.focus({ preventScroll: true });
      (el.querySelector<HTMLElement>("[data-autofocus]") ?? el.querySelector<HTMLElement>("a, button, input"))?.focus();
    }, 30);
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !viaUrl) {
        e.preventDefault();
        close();
      }
      if (e.key === "Tab" && ref.current) {
        const f = [...ref.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])')].filter((x) => x.offsetParent !== null);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    if (!viaUrl) history.pushState({ mn: 1 }, "");
    const pop = () => close();
    document.addEventListener("keydown", key);
    window.addEventListener("popstate", pop);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", key);
      window.removeEventListener("popstate", pop);
      root.classList.remove("mn-lock");
      document.body.style.top = "";
      window.scrollTo(0, y);
      prev?.focus?.();
      if (history.state?.mn) history.back();
    };
  }, [open, close, ref, viaUrl]);
}

const CAPS = ["cw1", "cw2", "cw3", "cw4", "cw5", "ink", "cw1"];

/** 모바일 전체 메뉴 서랍 + 검색 레이어 */
export default function MobileNav({ user = null }: { user?: { name: string } | null }) {
  const path = usePathname() ?? "/";
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [openAxis, setOpenAxis] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [rendered, setRendered] = useState(false);
  const drawer = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const [viaUrl, setViaUrl] = useState(false);

  // 처음 열 때만 레이어를 그린 뒤 두 프레임 뒤에 연다(열림 애니메이션용)
  const openWith = (set: (v: boolean) => void) => {
    if (rendered) set(true);
    else {
      setRendered(true);
      requestAnimationFrame(() => requestAnimationFrame(() => set(true)));
    }
  };
  useEffect(() => {
    setMounted(true);
    if (new URLSearchParams(window.location.search).get("menu") === "open") {
      setViaUrl(true);
      setRendered(true);
      setMenu(true);
    }
  }, []);
  const closeMenu = useCallback(() => {
    setMenu(false);
    setViaUrl(false);
  }, []);
  const closeSearch = useCallback(() => setSearch(false), []);
  useLayer(menu, closeMenu, drawer, viaUrl);
  useLayer(search, closeSearch, searchRef);

  const last = useRef(path);
  useEffect(() => {
    if (last.current !== path) {
      last.current = path;
      setMenu(false);
      setSearch(false);
      setViaUrl(false);
    }
  }, [path]);

  const cur = (href: string) => {
    const h = href.split("?")[0];
    return path === h || path.startsWith(h + "/") ? "page" : undefined;
  };
  const games = COMMUNITY_MENU.find((m) => m.children)?.children;

  const menuLayer = (
    <div className={`mn-layer${menu ? " is-open" : ""}`} aria-hidden={!menu} inert={!menu}>
      <button type="button" className="mn-dim" aria-label="메뉴 닫기" tabIndex={-1} onClick={closeMenu} />
      <div ref={drawer} className="mn-drawer" role="dialog" aria-modal="true" aria-label="전체 메뉴" tabIndex={-1} data-focus-self="">
        <div className="mn-head">
          <Link href="/" className="mn-brand" aria-label={`${BRAND.nameKo} 홈`}>
            <span className="v2-logo-cap" aria-hidden="true">
              K
            </span>
            <span className="v2-logo-word">klack</span>
          </Link>
          {viaUrl ? (
            <Link href={path} className="mn-icon mn-x" aria-label="메뉴 닫기" onClick={closeMenu}>
              {ICON.close}
            </Link>
          ) : (
            <button type="button" className="mn-icon mn-x" aria-label="메뉴 닫기" onClick={closeMenu}>
              {ICON.close}
            </button>
          )}
        </div>
        <div className="mn-body">
          <p className="mn-label">카테고리</p>
          <ul className="mn-axes">
            {NAV_AXES.map((a, i) => {
              const on = openAxis === a.key;
              return (
                <li key={a.key}>
                  <div className="mn-axis">
                    <Link href={catHref(a.slug)} aria-current={cur(catHref(a.slug))} data-autofocus={a === NAV_AXES[0] ? "" : undefined}>
                      <i className={`mn-cap is-${CAPS[i % CAPS.length]}`} aria-hidden="true">
                        {i + 1}
                      </i>
                      <span className="mn-axis-t">
                        <b>{a.label}</b>
                        <small>{a.desc}</small>
                      </span>
                      <em aria-hidden="true">→</em>
                    </Link>
                    {a.items.length > 0 && (
                      <button type="button" className={`mn-icon mn-toggle${on ? " is-open" : ""}`} aria-expanded={on} aria-label={`${a.label} 하위 분류 ${on ? "접기" : "펼치기"}`} onClick={() => setOpenAxis(on ? null : a.key)}>
                        {ICON.plus}
                      </button>
                    )}
                  </div>
                  {a.items.length > 0 && (
                    <ul className="mn-subs" hidden={!on}>
                      {a.items.map((s) => (
                        <li key={s.slug}>
                          <Link href={catHref(s.slug)} aria-current={cur(catHref(s.slug))}>
                            {s.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
          <ul className="mn-feature">
            <li>
              <Link href="/videos" className="is-cw2" aria-current={cur("/videos")}>
                <b>영상관</b>
                <span>타건 소리 · 조립 과정</span>
              </Link>
            </li>
            <li>
              <Link href="/guide" className="is-cw3" aria-current={cur("/guide")}>
                <b>제작 가이드</b>
                <span>주문부터 출고까지</span>
              </Link>
            </li>
            {COMMUNITY_MENU.map((m, i) => (
              <li key={m.key}>
                <Link href={m.href} className={i % 2 ? "is-cw3" : "is-cw2"} aria-current={cur(m.href)}>
                  <b>{m.label}</b>
                  <span>{m.children ? `게임 ${m.children.length - 1}종 · 랭킹` : "커뮤니티"}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/used" className="is-cw2" aria-current={cur("/used")}>
                <b>중고마켓</b>
                <span>키보드 사고팔기</span>
              </Link>
            </li>
          </ul>
          <ul className="mn-links mn-game-subs" aria-label="게임랜드">
            {games?.map((g) => (
              <li key={g.key}>
                <Link href={g.href} aria-current={cur(g.href)}>
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mn-links">
            <li>
              <Link href="/category/all?sort=new">신상품</Link>
            </li>
            <li>
              <Link href="/brands" aria-current={cur("/brands")}>
                브랜드
              </Link>
            </li>
            <li>
              <Link href="/category/all?sort=discount">특가</Link>
            </li>
            <li>
              <Link href="/ranking" aria-current={cur("/ranking")}>
                베스트
              </Link>
            </li>
            <li>
              <Link href="/category/all" aria-current={cur("/category/all")}>
                전체상품
              </Link>
            </li>
            <li>
              <Link href="/inspection" aria-current={cur("/inspection")}>
                타건 검수
              </Link>
            </li>
            <li>
              <Link href="/device-test" aria-current={cur("/device-test")}>
                기기테스트
              </Link>
            </li>
            <li>
              <Link href="/support" aria-current={cur("/support")}>
                고객센터
              </Link>
            </li>
            <li>
              <Link href="/order">주문 조회</Link>
            </li>
          </ul>
        </div>
        <div className="mn-account">
          {user ? (
            <Link href="/mypage" className="mn-me">
              <b>{user.name}</b>
              <span>마이페이지 →</span>
            </Link>
          ) : (
            <Link href="/login" className="mn-me">
              <b>로그인 · 회원가입</b>
              <span>이메일 · 카카오 · 네이버</span>
            </Link>
          )}
          <ul>
            <li>
              <Link href="/wishlist">찜</Link>
            </li>
            <li>
              <Link href="/cart">장바구니</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );

  const searchLayer = (
    <div className={`mn-search${search ? " is-open" : ""}`} aria-hidden={!search} inert={!search}>
      <div ref={searchRef} role="dialog" aria-modal="true" aria-label="상품 검색" className="mn-search-in">
        <div className="mn-search-bar">
          <div className="mn-search-box">
            <SearchBox />
          </div>
          <button type="button" className="mn-icon" aria-label="검색 닫기" onClick={closeSearch}>
            {ICON.close}
          </button>
        </div>
        <p className="mn-label">자주 찾는 분류</p>
        <ul className="mn-chips">
          {NAV_AXES.map((a) => (
            <li key={a.slug}>
              <Link href={catHref(a.slug)}>{a.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <>
      <button type="button" className="mn-btn mn-btn-menu" aria-label="전체 메뉴" aria-expanded={menu} onClick={() => openWith(setMenu)}>
        {ICON.menu}
      </button>
      <button type="button" className="mn-btn mn-btn-search" aria-label="검색" aria-expanded={search} onClick={() => openWith(setSearch)}>
        {ICON.search}
      </button>
      {mounted &&
        rendered &&
        createPortal(
          <>
            {menuLayer}
            {searchLayer}
          </>,
          document.body,
        )}
    </>
  );
}
