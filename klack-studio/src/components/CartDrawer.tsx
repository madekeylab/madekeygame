"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { won } from "@/lib/format";
import { CART_LABEL, CHANNELS, CS } from "@/lib/site";
import type { CartData, CartLine } from "@/lib/types";

const MY_LINKS = [
  ["/order", "주문 조회"],
  ["/wishlist", "찜한 상품"],
  ["/brands", "제조사 · 시리즈"],
  ["/cart", "장바구니 전체보기"],
];
const INFO_LINKS = [
  ["/guide", "배송 · 설치 안내"],
  ["/order/track", "배송 현황 조회"],
  ["/support", "고객센터"],
  ["/terms", "교환 · 반품"],
];
const CHANNEL_LIST = [{ key: "kakao" as const, label: "카카오톡 채널", desc: "치수 · 설치 1:1 상담 · 평일 10~18시" }];

/** 서랍 아래 접이식 위젯: 내 쇼핑 · 상담 채널 · 이용 안내 · 고객센터 */
function Widgets({ me = null }: { me?: { name: string } | null }) {
  const tel = (CS.tel ?? "").trim();
  const pending = !tel || /^[0\s-]+$/.test(tel) || tel === "준비중";
  return (
    <div className="rw">
      <section className="rw-card" aria-labelledby="rw-my">
        <h2 id="rw-my" className="rw-h">
          내 쇼핑
        </h2>
        <ul className="rw-list">
          <li>
            {me ? (
              <Link href="/mypage">
                <b>{me.name}</b> 님 · 마이페이지<span aria-hidden="true">›</span>
              </Link>
            ) : (
              <Link href="/login">
                로그인 / 회원가입<span aria-hidden="true">›</span>
              </Link>
            )}
          </li>
          {MY_LINKS.map(([href, label]) => (
            <li key={href}>
              <Link href={href}>
                {label}
                <span aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="rw-card" aria-labelledby="rw-ch">
        <h2 id="rw-ch" className="rw-h">
          상담 채널
        </h2>
        <ul className="rw-ch">
          {CHANNEL_LIST.map((c) => {
            const url = CHANNELS[c.key];
            const body = (
              <>
                <span className="rw-ch-ico" aria-hidden="true" />
                <span className="rw-ch-t">
                  <b>{c.label}</b>
                  <small>{c.desc}</small>
                </span>
                {url ? <em className="rw-soon is-live">바로가기 ›</em> : <em className="rw-soon">준비중</em>}
              </>
            );
            return (
              <li key={c.key} className={`rw-ch-i is-${c.key}${url ? " is-link" : ""}`}>
                {url ? (
                  <a href={url} target="_blank" rel="noreferrer" className="rw-ch-a">
                    {body}
                  </a>
                ) : (
                  body
                )}
              </li>
            );
          })}
        </ul>
      </section>
      <section className="rw-card" aria-labelledby="rw-info">
        <h2 id="rw-info" className="rw-h">
          이용 안내
        </h2>
        <ul className="rw-list">
          {INFO_LINKS.map(([href, label]) => (
            <li key={href}>
              <Link href={href}>
                {label}
                <span aria-hidden="true">›</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section className="rw-card rw-cs" aria-labelledby="rw-cs">
        <h2 id="rw-cs" className="rw-h">
          고객센터
        </h2>
        <p className={`rw-tel${pending ? " is-pending" : ""}`}>{pending ? "개설 준비중" : CS.tel}</p>
        <p className="rw-cs-t">
          {CS.hours}
          <br />
          {CS.hoursNote}
        </p>
      </section>
    </div>
  );
}

export function LineOption({ line }: { line: Pick<CartLine, "optionLabel" | "optionExtra"> }) {
  const label = line.optionLabel ?? "";
  if (!label) return null;
  const extra = Number(line.optionExtra ?? 0);
  return (
    <p className="crt-opt">
      <span className="crt-opt-label">{label}</span>
      {extra !== 0 && <em className="crt-opt-extra">{extra > 0 ? `+${won(extra)}` : `−${won(-extra)}`}원</em>}
    </p>
  );
}

const EMPTY: CartData = { lines: [], summary: { count: 0, totalList: 0, totalDiscount: 0, totalPay: 0 } };
const ALPHA_KEY = "ensol.cartAlpha";
const RAIL_KEY = "ensol.railCollapsed";

function useMedia(query: string) {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => true,
  );
}

/** 떠 있는 장바구니 버튼 + 서랍. 아주 넓은 화면(1660px↑)에서는 오른쪽 레일로 펼칠 수 있다. */
export default function CartDrawer({ label = CART_LABEL }: { label?: string }) {
  const desktop = useMedia("(min-width: 1024px)");
  const wide = useMedia("(min-width: 1660px)");
  const [collapsed, setCollapsed] = useState(true);
  const path = usePathname() ?? "";
  const hiddenHere = /^\/(cart|checkout|login)(\/|$)/.test(path);
  const [cart, setCart] = useState(EMPTY);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [alpha, setAlphaState] = useState(1);
  const [adjust, setAdjust] = useState(false);
  const [widgets, setWidgets] = useState(false);
  const pressTimer = useRef<number | null>(null);
  const longPressed = useRef(false);
  const adjustAt = useRef(0);

  useEffect(() => {
    try {
      const a = Number(localStorage.getItem(ALPHA_KEY));
      setAlphaState(a >= 0.3 && a <= 1 ? a : 1);
    } catch {
      setAlphaState(1);
    }
    try {
      setCollapsed(localStorage.getItem(RAIL_KEY) === "1");
    } catch {
      setCollapsed(false);
    }
  }, []);
  const saveCollapsed = (v: boolean) => {
    setCollapsed(v);
    try {
      localStorage.setItem(RAIL_KEY, v ? "1" : "0");
    } catch {}
  };
  const isHome = path === "/" || path === "";
  const rail = wide && !collapsed && !hiddenHere && !isHome;
  const setAlpha = (v: number) => {
    const a = Math.min(1, Math.max(0.3, v));
    setAlphaState(a);
    try {
      localStorage.setItem(ALPHA_KEY, String(a));
    } catch {}
  };

  const load = useCallback(async () => {
    try {
      const r = await fetch("/api/cart", { headers: { accept: "application/json" } });
      const j = await r.json();
      if (j?.ok) setCart(j.data);
    } catch {}
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => {
    const changed = () => {
      load();
      setHidden(false);
    };
    const openIt = () => {
      setHidden(false);
      setOpen(true);
    };
    window.addEventListener("mall:cart-changed", changed);
    window.addEventListener("mall:cart-open", openIt);
    return () => {
      window.removeEventListener("mall:cart-changed", changed);
      window.removeEventListener("mall:cart-open", openIt);
    };
  }, [load]);
  useEffect(() => {
    document.body.classList.toggle("has-rail", rail);
    return () => document.body.classList.remove("has-rail");
  }, [rail]);
  useEffect(() => {
    if (!open && !adjust) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setAdjust(false);
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [open, adjust]);

  const showAdjust = () => {
    adjustAt.current = Date.now();
    setAdjust(true);
  };
  const clearPress = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };
  const call = async (init: RequestInit, url = "/api/cart") => {
    setBusy(true);
    try {
      const r = await fetch(url, { ...init, headers: { "content-type": "application/json", accept: "application/json" } });
      const j = await r.json();
      if (j?.ok) {
        setCart(j.data);
      }
    } finally {
      setBusy(false);
    }
  };
  const setQty = (lineId: number, qty: number) => call({ method: "PATCH", body: JSON.stringify({ lineId, qty }) });
  const remove = (lineId: number) => call({ method: "DELETE" }, `/api/cart?lineId=${lineId}`);
  const clear = () => call({ method: "DELETE" });

  const { lines, summary } = cart;
  const pct = Math.round(100 * alpha);
  const fcStyle = { "--fc-alpha": alpha } as CSSProperties;

  const adjustPanel = adjust && (
    <div
      className="fc-adjust"
      role="dialog"
      aria-label={`${label} 표시 설정`}
      style={{ opacity: 1 }}
      onClickCapture={(e) => {
        if (Date.now() - adjustAt.current < 600) {
          e.stopPropagation();
          e.preventDefault();
        }
      }}
    >
      <div className="fc-adjust-h">
        <b>{label} 투명도</b>
        <span>{pct}%</span>
      </div>
      <input type="range" min={30} max={100} step={5} value={pct} onChange={(e) => setAlpha(Number(e.target.value) / 100)} aria-label="투명도" />
      <div className="fc-presets">
        {[100, 60, 30].map((v) => (
          <button key={v} type="button" aria-pressed={pct === v} onClick={() => setAlpha(v / 100)}>
            {v}% {v === 100 ? "선명" : v === 60 ? "중간" : "반투명"}
          </button>
        ))}
      </div>
      <p className="fc-adjust-note">뒤의 상품·옵션을 보면서 금액을 맞출 때 반투명으로 두세요. 숨기면 새로고침 때 다시 나타납니다.</p>
      <div className="fc-adjust-act">
        <button
          type="button"
          className="fc-hide"
          onClick={() => {
            setAdjust(false);
            setOpen(false);
            setHidden(true);
          }}
        >
          ✕ 잠시 숨기기
        </button>
        <button type="button" className="fc-done" onClick={() => setAdjust(false)}>
          완료
        </button>
      </div>
    </div>
  );

  const lineList = (closeOnNav: boolean) =>
    lines.length === 0 ? (
      <div className="crt-empty">
        <p className="crt-empty-t">담긴 상품이 없습니다</p>
        <p className="crt-empty-d">상품 카드의 담기 버튼을 누르면 여기에 모입니다.</p>
      </div>
    ) : (
      <ul className="crt-list">
        {lines.map((l) => (
          <li key={l.id} className="crt-item">
            <Link href={`/product/${l.productId}`} className="crt-thumb" onClick={closeOnNav ? () => setOpen(false) : undefined}>
              {l.thumbUrl ? <img src={l.thumbUrl} width={64} height={64} alt="" aria-hidden="true" /> : null}
            </Link>
            <div className="crt-body">
              <p className="crt-brand">{l.brandName}</p>
              <Link href={`/product/${l.productId}`} className="crt-name" onClick={closeOnNav ? () => setOpen(false) : undefined}>
                {l.name}
              </Link>
              <LineOption line={l} />
              <dl className="crt-price">
                <dt>원가</dt>
                <dd className="crt-list-price">{won(l.listPrice)}원</dd>
                <dt>할인율</dt>
                <dd className="crt-off">{l.discountRate}%</dd>
                <dt>할인가</dt>
                <dd className="crt-pay">{won(l.salePrice)}원</dd>
              </dl>
              <div className="crt-qty">
                <button type="button" aria-label="수량 줄이기" onClick={() => setQty(l.id, l.qty - 1)} disabled={busy}>
                  −
                </button>
                <b aria-live="polite">{l.qty}</b>
                <button type="button" aria-label="수량 늘리기" onClick={() => setQty(l.id, l.qty + 1)} disabled={busy || l.qty >= l.stock}>
                  +
                </button>
              </div>
            </div>
            <button type="button" className="crt-del" aria-label={`${l.name} 삭제`} onClick={() => remove(l.id)} disabled={busy}>
              ✕
            </button>
          </li>
        ))}
      </ul>
    );

  const totals = (
    <div className="crt-sum" aria-live="polite">
      <div>
        <span>총 상품금액 ({summary.count})</span>
        <b>{won(summary.totalList)}원</b>
      </div>
      <div>
        <span>총 할인금액</span>
        <b className="crt-off">{summary.totalDiscount > 0 ? `-${won(summary.totalDiscount)}` : "0"}원</b>
      </div>
      <div className="crt-sum-total">
        <span>총 결제예상금액</span>
        <strong>{won(summary.totalPay)}원</strong>
      </div>
    </div>
  );

  if (rail)
    return (
      <aside className="rail" aria-label="사이드 패널">
        <div className="crt-rail" aria-label={label}>
          <header className="crt-head fc-head">
            <h2>
              {label} <b>({summary.count})</b>
            </h2>
            <div className="fc-head-act">
              {lines.length > 0 && (
                <button type="button" className="crt-clear" onClick={clear} disabled={busy}>
                  전체 삭제
                </button>
              )}
              <button type="button" className="crt-close" onClick={() => saveCollapsed(true)} aria-label="레일 접기" title="접기(플로팅 버튼으로 전환)">
                ›
              </button>
            </div>
          </header>
          <div className="crt-rail-scroll">
            {lineList(false)}
            {totals}
            <div className="crt-cta">
              {summary.count > 0 ? (
                <Link href="/checkout" className="crt-btn crt-btn-primary">
                  선택 상품 주문하기
                </Link>
              ) : (
                <Link href="/category/all" className="crt-btn crt-btn-primary">
                  상품 보러가기
                </Link>
              )}
              <div className="crt-jump">
                <Link href="/wishlist">찜한 상품 보기</Link>
                <Link href="/brands">제조사 · 시리즈</Link>
              </div>
            </div>
          </div>
        </div>
        <Widgets />
      </aside>
    );

  return (
    <>
      {!hidden && !hiddenHere && (
        <div className="fc" style={fcStyle}>
          {wide && collapsed && (
            <button type="button" className="fc-rail-open" onClick={() => saveCollapsed(false)} title="오른쪽 레일 펼치기" aria-label="오른쪽 레일 펼치기">
              ‹ 레일
            </button>
          )}
          <button
            type="button"
            className="fc-btn"
            onClick={() => {
              if (longPressed.current) {
                longPressed.current = false;
                return;
              }
              setOpen(true);
            }}
            aria-label={`${label} 열기${summary.count ? ` (${summary.count})` : ""}`}
            aria-expanded={open}
            onPointerDown={() => {
              longPressed.current = false;
              pressTimer.current = window.setTimeout(() => {
                longPressed.current = true;
                showAdjust();
              }, 500);
            }}
            onPointerUp={clearPress}
            onPointerLeave={clearPress}
            onPointerCancel={clearPress}
            onContextMenu={(e) => {
              e.preventDefault();
              longPressed.current = true;
              showAdjust();
            }}
            onTouchEnd={(e) => {
              if (longPressed.current && e.cancelable) e.preventDefault();
            }}
            title="길게 누르면 투명도·숨기기"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M3 4h2.2l1.6 9.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6.4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9.5" cy="19" r="1.4" fill="currentColor" />
              <circle cx="16.5" cy="19" r="1.4" fill="currentColor" />
            </svg>
            {summary.count > 0 && (
              <span className="fc-badge" aria-hidden="true">
                {summary.count > 99 ? "99+" : summary.count}
              </span>
            )}
          </button>
          {!open && adjustPanel}
        </div>
      )}
      {open && (
        <>
          <div className="fc-backdrop" style={{ opacity: alpha }} onClick={() => setOpen(false)} aria-hidden="true" />
          <aside className={`fc-drawer${desktop ? "" : " is-mobile"}`} role="dialog" aria-modal="true" aria-label={label} style={fcStyle}>
            <header className="crt-head fc-head">
              <h2>
                {label} <b>({summary.count})</b>
              </h2>
              <div className="fc-head-act">
                {lines.length > 0 && (
                  <button type="button" className="crt-clear" onClick={clear} disabled={busy}>
                    전체 삭제
                  </button>
                )}
                <button type="button" className="fc-gear" onClick={() => (adjust ? setAdjust(false) : showAdjust())} aria-label="투명도·숨기기 설정" title="투명도·숨기기">
                  ◐ {pct}%
                </button>
                <button type="button" className="crt-close" onClick={() => setOpen(false)} aria-label="닫기">
                  ✕
                </button>
              </div>
            </header>
            {adjust && <div className="fc-adjust-in">{adjustPanel}</div>}
            {lineList(true)}
            {totals}
            <div className="crt-cta">
              <Link href="/checkout" className={`crt-btn crt-btn-primary${lines.length ? "" : " is-off"}`} onClick={() => setOpen(false)}>
                선택 상품 주문하기
              </Link>
              <div className="crt-jump">
                <Link href="/wishlist" onClick={() => setOpen(false)}>
                  찜한 상품 보기
                </Link>
                <Link href="/brands" onClick={() => setOpen(false)}>
                  제조사 · 시리즈
                </Link>
              </div>
            </div>
            <div className="fc-widgets">
              <button type="button" className="fc-widgets-t" aria-expanded={widgets} onClick={() => setWidgets((v) => !v)}>
                내 쇼핑 · 상담 채널 · 이용안내 <span aria-hidden="true">{widgets ? "−" : "+"}</span>
              </button>
              {widgets && <Widgets />}
            </div>
          </aside>
        </>
      )}
    </>
  );
}
