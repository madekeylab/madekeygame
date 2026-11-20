"use client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { isSingle, maxPick, OPTION_TEXT_MAX, visibleGroups } from "@/lib/catalog";
import { toast } from "@/lib/client";
import { diff, won } from "@/lib/format";
import type { OptionGroup, OptionValue } from "@/lib/types";
import AnimatedNumber from "./AnimatedNumber";
import KeyboardPreview, { layoutFrom, type PreviewConfig } from "./KeyboardPreview";

type Picks = Record<number, number[]>;
type Texts = Record<number, string>;

const out = (v: OptionValue) => v.stock != null && v.stock <= 0;

/** 보이지 않게 된 단계의 선택 · 입력을 지운다(연쇄 의존까지) */
function prune(groups: OptionGroup[], picks: Picks, texts: Texts) {
  let p = picks;
  let t = texts;
  for (let i = 0; i < groups.length; i++) {
    const vis = visibleGroups(groups, p);
    const stale = groups.filter((g) => !vis.has(g.id) && ((p[g.id]?.length ?? 0) > 0 || !!t[g.id]));
    if (!stale.length) break;
    p = { ...p };
    t = { ...t };
    for (const g of stale) {
      delete p[g.id];
      delete t[g.id];
    }
  }
  return { picks: p, texts: t };
}

const RE = { layout: /배열|layout/i, housing: /하우징|케이스|housing|case/i, plate: /보강판|plate/i, sw: /스위치\s*타입|스위치$|switch/i, caps: /키캡|keycap/i, engrave: /각인|engrav/i };

function housingHex(groups: OptionGroup[], picks: Picks) {
  const sw = groups.filter((g) => g.kind === "swatch");
  const g = sw.find((g) => RE.housing.test(g.name)) ?? sw[0];
  if (!g) return null;
  return g.values.find((v) => picks[g.id]?.includes(v.id))?.swatchHex ?? null;
}
function picked(groups: OptionGroup[], picks: Picks, re: RegExp) {
  const g = groups.find((g) => re.test(g.name));
  return g?.values.find((v) => picks[g.id]?.includes(v.id))?.label ?? "";
}

/** 선택 상태 → 미리보기 설정. 배열 정보가 전혀 없는 상품이면 null(미리보기 탭 없음) */
function previewOf(groups: OptionGroup[], picks: Picks, texts: Texts, hint: string): PreviewConfig | null {
  const has = (re: RegExp) => groups.some((g) => re.test(g.name));
  const hinted = layoutFrom(hint);
  if (!has(RE.layout) && !hinted) return null;
  const plate = picked(groups, picks, RE.plate);
  const sw = picked(groups, picks, RE.sw);
  const caps = picked(groups, picks, RE.caps);
  const eg = groups.find((g) => g.kind === "text" && RE.engrave.test(g.name));
  return {
    layout: layoutFrom(picked(groups, picks, RE.layout)) ?? hinted ?? "65",
    housing: housingHex(groups, picks) ?? "#2b2a28",
    plate: /황동|brass/i.test(plate) ? "brass" : /PC|폴리/i.test(plate) ? "pc" : /FR4/i.test(plate) ? "fr4" : "al",
    switchType: !has(RE.sw) || /미포함/.test(sw) ? "none" : /택타일|tactile/i.test(sw) ? "tactile" : /클릭|click/i.test(sw) ? "clicky" : "linear",
    caps: !has(RE.caps) || /미포함/.test(caps) || !caps ? "none" : /노벨티|novel/i.test(caps) ? "novelty" : "base",
    engrave: eg ? (texts[eg.id] ?? "") : "",
  };
}

/** 선택한 옵션 값에 사진이 있으면 그것을 우선 보여 준다(하우징 → 키캡 → 그 외) */
function optionPhoto(groups: OptionGroup[], picks: Picks) {
  const rank = (g: OptionGroup) => (RE.housing.test(g.name) ? 0 : RE.caps.test(g.name) ? 1 : 2);
  for (const g of [...groups].sort((a, b) => rank(a) - rank(b))) {
    const v = g.values.find((v) => picks[g.id]?.includes(v.id) && v.imageUrl);
    if (v?.imageUrl) return v.imageUrl;
  }
  return null;
}

type Props = { productId: number; productName: string; basePrice: number; groups: OptionGroup[]; soldOut?: boolean; intro?: ReactNode; visual?: ReactNode; spec?: ReactNode; layoutHint?: string };

/** 상품 상세의 옵션 구성기 — 단계별 선택 · 합계 · 담기/바로구매 */
export default function Configurator({ productId, productName, basePrice, groups, soldOut = false, intro, visual, spec, layoutHint = "" }: Props) {
  const router = useRouter();
  const [state, setState] = useState(() => {
    const picks: Picks = {};
    for (const g of groups) {
      if (g.kind === "text") continue;
      const def = g.values
        .filter((v) => v.isDefault && !out(v))
        .slice(0, maxPick(g))
        .map((v) => v.id);
      if (def.length) picks[g.id] = def;
    }
    return prune(groups, picks, {});
  });
  const { picks, texts } = state;
  const [qty, setQty] = useState(1);
  const [busy, setBusy] = useState<null | "cart" | "buy">(null);
  const [error, setError] = useState("");
  const [sumOpen, setSumOpen] = useState(false);

  const vis = useMemo(() => visibleGroups(groups, picks), [groups, picks]);
  const shown = groups.filter((g) => vis.has(g.id));
  const lines = shown.flatMap((g) => {
    if (g.kind === "text") {
      const t = texts[g.id]?.trim();
      return t ? [{ g, label: `“${t}”`, extra: 0 }] : [];
    }
    const vals = g.values.filter((v) => picks[g.id]?.includes(v.id));
    return vals.length ? [{ g, label: vals.map((v) => v.label).join(", "), extra: vals.reduce((n, v) => n + v.extraPrice, 0) }] : [];
  });
  const extra = lines.reduce((n, l) => n + l.extra, 0);
  const total = (basePrice + extra) * qty;
  const missing = shown.filter((g) => g.required && !lines.some((l) => l.g.id === g.id));

  useEffect(() => {
    setError("");
  }, [picks, texts, qty]);
  useEffect(() => {
    document.body.classList.add("has-kb-bar");
    return () => document.body.classList.remove("has-kb-bar");
  }, []);

  const update = (p: Picks, t: Texts = texts) => setState(prune(groups, p, t));
  const scrollTimer = useRef(0);
  useEffect(() => () => window.clearTimeout(scrollTimer.current), []);

  const choose = (g: OptionGroup, v: OptionValue) => {
    if (out(v)) return;
    const cur = picks[g.id] ?? [];
    if (isSingle(g)) {
      update({ ...picks, [g.id]: cur.includes(v.id) ? (g.required ? cur : []) : [v.id] });
      // 모바일: 처음 고른 단계면 다음 단계로 부드럽게 내려간다
      if (!cur.length && window.matchMedia("(max-width:1023px)").matches) {
        window.clearTimeout(scrollTimer.current);
        scrollTimer.current = window.setTimeout(() => {
          const next = document.getElementById(`kb-g-${g.id}`)?.closest("li")?.nextElementSibling;
          if (!next || next.getBoundingClientRect().top < 0) return;
          next.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
        }, 260);
      }
      return;
    }
    if (cur.includes(v.id)) update({ ...picks, [g.id]: cur.filter((id) => id !== v.id) });
    else if (cur.length >= maxPick(g)) toast(`「${g.name}」은 최대 ${maxPick(g)}개까지 고를 수 있습니다.`);
    else update({ ...picks, [g.id]: [...cur, v.id] });
  };

  const submit = async (mode: "stay" | "checkout") => {
    if (busy || soldOut) return;
    setBusy(mode === "stay" ? "cart" : "buy");
    setError("");
    const selections = shown.flatMap((g) => (g.kind === "text" ? (texts[g.id]?.trim() ? [{ groupId: g.id, valueIds: [], text: texts[g.id].trim() }] : []) : (picks[g.id]?.length ?? 0) > 0 ? [{ groupId: g.id, valueIds: picks[g.id] }] : []));
    try {
      const r = await fetch("/api/cart", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ productId, qty, selections }) });
      const j = await r.json().catch(() => null);
      window.dispatchEvent(new CustomEvent(j?.ok ? "mall:cart-changed" : "mall:cart-error"));
      if (!j?.ok) {
        setError(j?.message ?? "장바구니에 담지 못했습니다.");
        setSumOpen(true);
        setBusy(null);
        return;
      }
      if (mode === "checkout") return void router.push("/checkout");
      toast(`장바구니에 ${qty}개 담았습니다 · ${productName}`, { href: "/cart", label: "장바구니" });
      window.dispatchEvent(new CustomEvent("mall:cart-open"));
    } catch {
      setError("네트워크 오류가 발생했습니다. 잠시 뒤 다시 시도해 주세요.");
    }
    setBusy(null);
  };

  const housing = housingHex(groups, picks);
  const preview = useMemo(() => previewOf(groups, picks, texts, layoutHint), [groups, picks, texts, layoutHint]);
  const photo = optionPhoto(groups, picks);
  const [view, setView] = useState<"photo" | "3d">("photo");
  // 처음으로 구성이 바뀌면 3D 미리보기로 한 번 자동 전환한다
  const switched = useRef(false);
  const initial = useRef(preview);
  useEffect(() => {
    if (!preview || switched.current || photo) return;
    if (JSON.stringify(preview) !== JSON.stringify(initial.current)) {
      switched.current = true;
      setView("3d");
    }
  }, [preview, photo]);

  const done = shown.length - missing.length;
  const nextId = missing[0]?.id;
  const sumLines = lines.map((l) => (
    <li key={l.g.id}>
      <span>{l.g.name}</span>
      <b>{l.label}</b>
      {l.extra !== 0 && <em>{diff(l.extra)}</em>}
    </li>
  ));

  return (
    <section className={`kb${visual ? " is-cfg" : ""}`} id="klack-builder" data-klack-builder="" aria-labelledby="kb-title" style={housing ? ({ "--kx-housing": housing } as CSSProperties) : undefined}>
      {visual && (
        <div className="kb-visual">
          <div className={`kb-stage${preview && view === "3d" ? " is-3d" : ""}`}>
            {preview && (
              <div className="kb-view" role="tablist" aria-label="보기">
                <button type="button" role="tab" aria-selected={view === "photo"} onClick={() => setView("photo")}>
                  사진
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={view === "3d"}
                  onClick={() => {
                    switched.current = true;
                    setView("3d");
                  }}
                >
                  3D 구성
                </button>
              </div>
            )}
            {preview && view === "3d" ? (
              <KeyboardPreview cfg={preview} />
            ) : photo ? (
              <div className="fth is-square kb-optphoto">
                <img src={photo} alt="선택한 옵션 사진" />
              </div>
            ) : (
              visual
            )}
            <ul className="kb-stage-tags" aria-hidden="true">
              {lines.slice(0, 4).map((l) => (
                <li key={l.g.id}>
                  <span>{l.g.name}</span>
                  {l.label}
                </li>
              ))}
            </ul>
          </div>
          {spec}
        </div>
      )}
      <div className="kb-steps">
        {intro}
        <header className="kb-head">
          <p className="v2-pill is-cw2">
            옵션 구성 · {done}/{shown.length} 완료
          </p>
          <h2 id="kb-title">옵션 구성하기</h2>
          <p className="kb-progress" aria-hidden="true">
            {shown.map((g) => (
              <i key={g.id} className={missing.some((m) => m.id === g.id) ? "" : "on"} />
            ))}
          </p>
          <p className="kb-sub">단계별로 고르면 아래 합계가 바로 바뀝니다. 최종 금액은 담을 때 서버에서 다시 확인합니다.</p>
        </header>
        <ol className="kb-list">
          {shown.map((g, i) => {
            const cur = picks[g.id] ?? [];
            const id = `kb-g-${g.id}`;
            return (
              <li key={g.id} className={`kb-step is-${g.kind}${g.id === nextId ? " is-next" : ""}${cur.length || texts[g.id] ? " is-set" : ""}`} aria-labelledby={id}>
                <div className="kb-step-h">
                  <span className="kb-step-no" aria-label={`${i + 1}단계`}>
                    {i + 1}
                  </span>
                  <h3 id={id}>{g.name}</h3>
                  {g.required ? <em className="kb-req">필수</em> : <small className="kb-opt">선택</small>}
                  {g.kind === "check" && <small className="kb-max">최대 {maxPick(g)}개</small>}
                  {g.dependsOnGroupId != null && <small className="kb-cond">추가 단계</small>}
                </div>
                {g.help && <p className="kb-help">{g.help}</p>}
                {g.kind === "text" ? (
                  <div className="kb-text">
                    <input type="text" value={texts[g.id] ?? ""} maxLength={OPTION_TEXT_MAX} aria-labelledby={id} placeholder="입력하지 않으면 생략됩니다" onChange={(e) => update(picks, { ...texts, [g.id]: e.target.value.slice(0, OPTION_TEXT_MAX) })} />
                    <span className="kb-count" aria-live="polite">
                      {(texts[g.id] ?? "").length} / {OPTION_TEXT_MAX}자
                    </span>
                  </div>
                ) : g.kind === "swatch" ? (
                  <div className="kb-swatches" role="radiogroup" aria-labelledby={id}>
                    {g.values.map((v) => (
                      <button key={v.id} type="button" role="radio" aria-checked={cur.includes(v.id)} disabled={out(v)} className="kb-swatch" onClick={() => choose(g, v)}>
                        <span className="kb-chip" style={v.swatchHex ? { background: v.swatchHex } : undefined} aria-hidden="true" />
                        <span className="kb-swatch-name">{v.label}</span>
                        {v.extraPrice !== 0 && <small className="kb-diff">{diff(v.extraPrice)}</small>}
                        {out(v) && <i className="kb-out">품절</i>}
                      </button>
                    ))}
                  </div>
                ) : g.kind === "select" ? (
                  <div className="kb-cards" role="radiogroup" aria-labelledby={id}>
                    {g.values.map((v) => (
                      <button key={v.id} type="button" role="radio" aria-checked={cur.includes(v.id)} disabled={out(v)} className="kb-card" onClick={() => choose(g, v)}>
                        {v.imageUrl && <img src={v.imageUrl} alt="" loading="lazy" className="kb-card-img" />}
                        <b>{v.label}</b>
                        <span className="kb-diff">{out(v) ? "품절" : diff(v.extraPrice) || "추가금 없음"}</span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="kb-rows" role={g.kind === "radio" ? "radiogroup" : "group"} aria-labelledby={id}>
                    {g.values.map((v) => (
                      <label key={v.id} className={`kb-row${out(v) ? " is-out" : ""}`}>
                        <input type={g.kind === "radio" ? "radio" : "checkbox"} name={id} checked={cur.includes(v.id)} disabled={out(v)} onChange={() => choose(g, v)} onClick={g.kind === "radio" && cur.includes(v.id) && !g.required ? () => choose(g, v) : undefined} />
                        <span>{v.label}</span>
                        <small className="kb-diff">{out(v) ? "품절" : diff(v.extraPrice)}</small>
                      </label>
                    ))}
                    {g.kind === "check" && (
                      <p className="kb-note">
                        {cur.length} / {maxPick(g)}개 선택
                      </p>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <div className="kb-review">
          <h3 className="kb-sum-h">선택 내역</h3>
          {lines.length ? <ul className="kb-lines">{sumLines}</ul> : <p className="kb-empty">아직 고른 옵션이 없습니다.</p>}
        </div>
      </div>
      <aside className={`kb-sum${sumOpen ? " is-open" : ""}`} aria-label="선택 요약">
        <button type="button" className="kb-sum-toggle" aria-expanded={sumOpen} onClick={() => setSumOpen((v) => !v)}>
          <span>
            {missing.length ? (
              <>
                필수 {missing.length}개 남음<small> · {missing.map((g) => g.name).join(", ")}</small>
              </>
            ) : (
              "선택 내역 보기"
            )}
          </span>
          <b>{won(total)}원</b>
        </button>
        <div className="kb-sum-body">
          <ul className="kb-lines is-sheet">{sumLines}</ul>
          <dl className="kb-price">
            <div>
              <dt>기본가</dt>
              <dd>{won(basePrice)}</dd>
            </div>
            <div>
              <dt>옵션</dt>
              <dd className={extra ? "is-on" : ""}>{extra === 0 ? "+0" : diff(extra).replace("원", "")}</dd>
            </div>
            <div className="kb-qty-wrap">
              <dt>수량</dt>
              <dd className="kb-qty">
                <button type="button" aria-label="수량 줄이기" onClick={() => setQty((n) => Math.max(1, n - 1))}>
                  −
                </button>
                <b aria-live="polite">{qty}</b>
                <button type="button" aria-label="수량 늘리기" onClick={() => setQty((n) => Math.min(99, n + 1))}>
                  +
                </button>
              </dd>
            </div>
          </dl>
          <p className="kb-total">
            <span>합계</span>
            <strong>
              <AnimatedNumber value={total} />
              <i>원</i>
            </strong>
          </p>
          {missing.length > 0 && (
            <p className="kb-missing" aria-live="polite">
              필수 선택: {missing.map((g) => g.name).join(", ")}
            </p>
          )}
          {error && (
            <p className="kb-error" role="alert">
              {error}
            </p>
          )}
        </div>
        <div className="kb-cta">
          <button type="button" className="fd-btn fd-btn-ghost" disabled={soldOut || busy !== null} aria-busy={busy === "cart"} onClick={() => submit("stay")}>
            {busy === "cart" ? "담는 중…" : "담기"}
          </button>
          <button type="button" className="fd-btn fd-btn-primary" disabled={soldOut || busy !== null} aria-busy={busy === "buy"} onClick={() => submit("checkout")}>
            {soldOut ? "일시 품절" : busy === "buy" ? "주문서로…" : "바로구매"}
          </button>
        </div>
      </aside>
    </section>
  );
}
