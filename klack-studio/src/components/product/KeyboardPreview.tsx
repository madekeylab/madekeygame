"use client";
import { useEffect, useRef, useState } from "react";

/* 옵션 선택을 반영해 그리는 키보드 미리보기(일러스트). 배열 · 하우징 색 · 보강판 · 스위치 · 키캡 · 각인 */
export type PreviewConfig = {
  layout: "65" | "75" | "tkl";
  housing: string;
  plate: "al" | "pc" | "fr4" | "brass";
  switchType: "linear" | "tactile" | "clicky" | "none";
  caps: "none" | "base" | "novelty";
  engrave: string;
};

type KeyDef = [code: string, label: string, w?: number, mod?: boolean];
type Row = { y: number; x?: number; keys: KeyDef[] };
type Key = { code: string; label: string; x: number; y: number; w: number; mod: boolean };

const letters = (s: string): KeyDef[] => [...s].map((c) => [`Key${c}`, c]);
const digits = (s: string): KeyDef[] => [...s].map((c) => [`Digit${c}`, c]);
const gap = (w: number): KeyDef => [`_gap${w}`, "", w];
const MOD_RE = /^(Esc|Tab|Caps|Shift|Control|Meta|Alt|Fn|Menu|Enter|Backspace|Arrow|Home|End|Page|Delete|Insert|F\d|Print|Scroll|Pause)/;

function place(rows: Row[]): Key[] {
  const out: Key[] = [];
  for (const row of rows) {
    let x = row.x ?? 0;
    for (const [code, label, w = 1, mod] of row.keys) {
      if (code.startsWith("_gap")) {
        x += w;
        continue;
      }
      out.push({ code, label, x, y: row.y, w, mod: mod ?? (w > 1 || MOD_RE.test(code)) });
      x += w;
    }
  }
  return out;
}

const R1: KeyDef[] = [["Escape", "ESC"], ...digits("1234567890"), ["Minus", "-"], ["Equal", "="], ["Backspace", "BKSP", 2]];
const R2: KeyDef[] = [["Tab", "TAB", 1.5], ...letters("QWERTYUIOP"), ["BracketLeft", "["], ["BracketRight", "]"], ["Backslash", "\\", 1.5]];
const R3: KeyDef[] = [["CapsLock", "CAPS", 1.75], ...letters("ASDFGHJKL"), ["Semicolon", ";"], ["Quote", "'"], ["Enter", "ENTER", 2.25]];
const R4: KeyDef[] = [["ShiftLeft", "SHIFT", 2.25], ...letters("ZXCVBNM"), ["Comma", ","], ["Period", "."], ["Slash", "/"], ["ShiftRight", "SHIFT", 1.75]];
const R5: KeyDef[] = [
  ["ControlLeft", "CTRL", 1.25],
  ["MetaLeft", "OS", 1.25],
  ["AltLeft", "ALT", 1.25],
  ["Space", "", 6.25],
  ["AltRight", "ALT"],
  ["Fn", "FN"],
  ["ControlRight", "CTRL"],
];
const FROW: KeyDef[] = [["F1", "F1"], ["F2", "F2"], ["F3", "F3"], ["F4", "F4"], gap(0.25), ["F5", "F5"], ["F6", "F6"], ["F7", "F7"], ["F8", "F8"], gap(0.25), ["F9", "F9"], ["F10", "F10"], ["F11", "F11"], ["F12", "F12"]];

const base65 = (y: number): Row[] => [
  { y, keys: [...R1, ["Home", "HOME"]] },
  { y: y + 1, keys: [...R2, ["PageUp", "PGUP"]] },
  { y: y + 2, keys: [...R3, ["PageDown", "PGDN"]] },
  { y: y + 3, keys: [...R4, ["ArrowUp", "↑"], ["End", "END"]] },
  { y: y + 4, keys: [...R5, ["ArrowLeft", "←"], ["ArrowDown", "↓"], ["ArrowRight", "→"]] },
];

const LAYOUTS: Record<PreviewConfig["layout"], { name: string; w: number; h: number; keys: Key[] }> = {
  "65": { name: "65%", w: 16, h: 5, keys: place(base65(0)) },
  "75": {
    name: "75%",
    w: 16,
    h: 6.25,
    keys: place([{ y: 0, keys: [["Escape", "ESC"], gap(0.25), ...FROW, gap(1.25), ["Delete", "DEL"]] }, ...base65(1.25).map((r, i) => (i === 0 ? { ...r, keys: [["Backquote", "`"] as KeyDef, ...r.keys.slice(1)] } : r))]),
  },
  tkl: {
    name: "TKL",
    w: 18.25,
    h: 6.25,
    keys: place([
      { y: 0, keys: [["Escape", "ESC"], gap(1), ...FROW, gap(0.75), ["PrintScreen", "PRT"], ["ScrollLock", "SCR"], ["Pause", "PSE"]] },
      { y: 1.25, keys: [["Backquote", "`"], ...digits("1234567890"), ["Minus", "-"], ["Equal", "="], ["Backspace", "BKSP", 2], gap(0.25), ["Insert", "INS"], ["Home", "HOME"], ["PageUp", "PGUP"]] },
      { y: 2.25, keys: [...R2, gap(0.25), ["Delete", "DEL"], ["End", "END"], ["PageDown", "PGDN"]] },
      { y: 3.25, keys: R3 },
      { y: 4.25, keys: [["ShiftLeft", "SHIFT", 2.25], ...letters("ZXCVBNM"), ["Comma", ","], ["Period", "."], ["Slash", "/"], ["ShiftRight", "SHIFT", 2.75], gap(1.25), ["ArrowUp", "↑"]] },
      {
        y: 5.25,
        keys: [
          ["ControlLeft", "CTRL", 1.25],
          ["MetaLeft", "OS", 1.25],
          ["AltLeft", "ALT", 1.25],
          ["Space", "", 6.25],
          ["AltRight", "ALT", 1.25],
          ["MetaRight", "OS", 1.25],
          ["ContextMenu", "MENU", 1.25],
          ["ControlRight", "CTRL", 1.25],
          gap(0.25),
          ["ArrowLeft", "←"],
          ["ArrowDown", "↓"],
          ["ArrowRight", "→"],
        ],
      },
    ]),
  },
};

/** 옵션 라벨 · 스펙 문구에서 배열 추정 */
export function layoutFrom(text?: string | null): PreviewConfig["layout"] | null {
  if (!text) return null;
  if (/TKL|텐키리스|87/i.test(text)) return "tkl";
  if (/75\s*%|75%|\b75\b/.test(text)) return "75";
  if (/65\s*%|\b65\b/.test(text)) return "65";
  return null;
}

const ACCENT = new Set(["Escape", "Enter", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"]);
const PLATE = {
  al: { c: "linear-gradient(135deg,#a4aab1,#7c838b 55%,#9ba1a8)", name: "알루미늄" },
  pc: { c: "linear-gradient(135deg,rgba(238,240,236,.78),rgba(205,210,206,.62))", name: "PC" },
  fr4: { c: "linear-gradient(135deg,#4a4a2c,#33331f)", name: "FR4" },
  brass: { c: "linear-gradient(135deg,#d6b066,#a47c35 55%,#c9a258)", name: "황동" },
};
const STEM = { linear: "#d44a3c", tactile: "#8c5a2e", clicky: "#3c6fd6", none: "transparent" };

/** 색을 밝게(+)/어둡게(−) */
function shade(hex: string, amt: number) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
  const r = f(n >> 16);
  const g = f((n >> 8) & 255);
  const b = f(n & 255);
  return `#${(0x1000000 | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

const U = 38; // 1u(px)
const SCENE_W = 740.62;
const SCENE_H = 284.62;
const ALL_CODES = [...new Map([...LAYOUTS["65"].keys, ...LAYOUTS["75"].keys, ...LAYOUTS.tkl.keys].map((k) => [k.code, k])).keys()];

export default function KeyboardPreview({ cfg }: { cfg: PreviewConfig }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(Math.min(1.25, el.clientWidth / 844.3068)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const lay = LAYOUTS[cfg.layout];
  const w = (lay.w + 1.24) * U;
  const h = (lay.h + 1.24) * U;
  const left = (SCENE_W - w) / 2;
  const top = (SCENE_H - h) / 2;
  const housing = cfg.housing || "#2a2a2a";
  const hi = shade(housing, 0.22);
  const lo = shade(housing, -0.45);
  const edge = shade(housing, -0.62);
  const caps = cfg.caps;
  const engrave = cfg.engrave.trim().slice(0, 40);
  return (
    <div className="kr" ref={ref} role="img" aria-label={`구성 미리보기 — ${lay.name} 배열, 보강판 ${PLATE[cfg.plate].name}, ${caps === "none" ? "키캡 미포함" : caps === "novelty" ? "노벨티 키캡" : "기본 키캡"}`}>
      <div className="kr-scene" style={{ width: SCENE_W, height: SCENE_H, transform: `translate(-50%,-50%) scale(${scale})` }}>
        <div className="kr-tilt">
          <span className="kr-floor" style={{ left: left + 0.06 * w, top: top + 0.2 * h, width: 0.88 * w, height: 0.9 * h }} />
          <div
            className="kr-case"
            style={{
              left,
              top,
              width: w,
              height: h,
              background: `linear-gradient(160deg,${hi} 0%,${housing} 38%,${lo} 100%)`,
              boxShadow: `${Array.from({ length: 18 }, (_, i) => `0 ${i + 1}px 0 ${edge}`).join(",")},0 26px 40px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.28)`,
            }}
          >
            <div className="kr-well" style={{ left: 17.56, top: 17.56, right: 17.56, bottom: 17.56 }}>
              <div className="kr-plate" style={{ background: PLATE[cfg.plate].c }} data-plate={cfg.plate} />
            </div>
            {engrave && (
              <span className="kr-engrave" style={{ color: shade(housing, -0.15) }}>
                {engrave}
              </span>
            )}
          </div>
          {ALL_CODES.map((code) => {
            const k = lay.keys.find((k) => k.code === code);
            const x = left + (0.62 + (k?.x ?? 0)) * U;
            const y = top + (0.62 + (k?.y ?? 0)) * U;
            const kw = (k?.w ?? 1) * U;
            const accent = caps === "novelty" && ACCENT.has(code);
            return (
              <div key={code} className={`kr-key${k?.mod ? " is-mod" : ""}${accent ? " is-accent" : ""}${caps === "none" ? " is-bare" : ""}`} style={{ transform: `translate3d(${x}px,${y}px,7px)`, width: kw, height: U, opacity: k ? 1 : 0 }}>
                {caps === "none" && (k?.w ?? 1) >= 2 && <i className="kr-stab" />}
                {caps === "none" ? (
                  cfg.switchType === "none" ? (
                    <i className="kr-cut" />
                  ) : (
                    <i className="kr-sw">
                      <b style={{ background: STEM[cfg.switchType] }} />
                    </i>
                  )
                ) : (
                  <i className="kr-cap">
                    <span>{accent && code !== "Escape" && code !== "Enter" ? "◆" : k?.label}</span>
                  </i>
                )}
              </div>
            );
          })}
          <span className="kr-sheen" style={{ left, top, width: w, height: h }} />
        </div>
      </div>
      <p className="kr-note">구성 미리보기 · 일러스트이며 실물 색감 · 비율과 다를 수 있습니다</p>
    </div>
  );
}
