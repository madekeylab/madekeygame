"use client";
import { useEffect, useRef } from "react";
import { dtKit } from "./kit";

type K = [code: string, label: string, x: number, y: number, w: number, h: number, top?: string];
type RowKey = [code: string, label: string, w?: number, top?: string];

/** 풀배열(104키 + 한/영 · 한자) 자판 배치. 단위는 키 1칸 */
function buildLayout(): K[] {
  const keys: K[] = [];
  const row = (y: number, x: number, list: RowKey[]) =>
    list.forEach(([code, label, w, top]) => {
      keys.push([code, label, x, y, w || 1, 1, top]);
      x += w || 1;
    });
  keys.push(["Escape", "Esc", 0, 0, 1, 1]);
  ["F1", "F2", "F3", "F4"].forEach((k, i) => keys.push([k, k, 2 + i, 0, 1, 1]));
  ["F5", "F6", "F7", "F8"].forEach((k, i) => keys.push([k, k, 6.5 + i, 0, 1, 1]));
  ["F9", "F10", "F11", "F12"].forEach((k, i) => keys.push([k, k, 11 + i, 0, 1, 1]));
  [
    ["PrintScreen", "PrtSc"],
    ["ScrollLock", "ScrLk"],
    ["Pause", "Pause"],
  ].forEach(([c, l], i) => keys.push([c, l, 15.25 + i, 0, 1, 1]));
  row(1.5, 0, [["Backquote", "`", 1, "~"], ["Digit1", "1", 1, "!"], ["Digit2", "2", 1, "@"], ["Digit3", "3", 1, "#"], ["Digit4", "4", 1, "$"], ["Digit5", "5", 1, "%"], ["Digit6", "6", 1, "^"], ["Digit7", "7", 1, "&"], ["Digit8", "8", 1, "*"], ["Digit9", "9", 1, "("], ["Digit0", "0", 1, ")"], ["Minus", "-", 1, "_"], ["Equal", "=", 1, "+"], ["Backspace", "Backspace", 2]]);
  row(2.5, 0, [["Tab", "Tab", 1.5], ["KeyQ", "Q", 1, "ㅂ"], ["KeyW", "W", 1, "ㅈ"], ["KeyE", "E", 1, "ㄷ"], ["KeyR", "R", 1, "ㄱ"], ["KeyT", "T", 1, "ㅅ"], ["KeyY", "Y", 1, "ㅛ"], ["KeyU", "U", 1, "ㅕ"], ["KeyI", "I", 1, "ㅑ"], ["KeyO", "O", 1, "ㅐ"], ["KeyP", "P", 1, "ㅔ"], ["BracketLeft", "[", 1, "{"], ["BracketRight", "]", 1, "}"], ["Backslash", "\\", 1.5, "|"]]);
  row(3.5, 0, [["CapsLock", "Caps Lock", 1.75], ["KeyA", "A", 1, "ㅁ"], ["KeyS", "S", 1, "ㄴ"], ["KeyD", "D", 1, "ㅇ"], ["KeyF", "F", 1, "ㄹ"], ["KeyG", "G", 1, "ㅎ"], ["KeyH", "H", 1, "ㅗ"], ["KeyJ", "J", 1, "ㅓ"], ["KeyK", "K", 1, "ㅏ"], ["KeyL", "L", 1, "ㅣ"], ["Semicolon", ";", 1, ":"], ["Quote", "'", 1, '"'], ["Enter", "Enter", 2.25]]);
  row(4.5, 0, [["ShiftLeft", "Shift", 2.25], ["KeyZ", "Z", 1, "ㅋ"], ["KeyX", "X", 1, "ㅌ"], ["KeyC", "C", 1, "ㅊ"], ["KeyV", "V", 1, "ㅍ"], ["KeyB", "B", 1, "ㅠ"], ["KeyN", "N", 1, "ㅜ"], ["KeyM", "M", 1, "ㅡ"], ["Comma", ",", 1, "<"], ["Period", ".", 1, ">"], ["Slash", "/", 1, "?"], ["ShiftRight", "Shift", 2.75]]);
  row(5.5, 0, [["ControlLeft", "Ctrl", 1.25], ["MetaLeft", "Win", 1], ["AltLeft", "Alt", 1.25], ["Lang2", "한자", 1], ["Space", "", 5.25], ["Lang1", "한/영", 1], ["AltRight", "Alt", 1], ["MetaRight", "Win", 1], ["ContextMenu", "Menu", 1], ["ControlRight", "Ctrl", 1.25]]);
  [
    ["Insert", "Insert"],
    ["Home", "Home"],
    ["PageUp", "Page Up"],
  ].forEach(([c, l], i) => keys.push([c, l, 15.25 + i, 1.5, 1, 1]));
  [
    ["Delete", "Delete"],
    ["End", "End"],
    ["PageDown", "Page Down"],
  ].forEach(([c, l], i) => keys.push([c, l, 15.25 + i, 2.5, 1, 1]));
  keys.push(["ArrowUp", "↑", 16.25, 4.5, 1, 1]);
  [
    ["ArrowLeft", "←"],
    ["ArrowDown", "↓"],
    ["ArrowRight", "→"],
  ].forEach(([c, l], i) => keys.push([c, l, 15.25 + i, 5.5, 1, 1]));
  [
    ["NumLock", "Num Lock"],
    ["NumpadDivide", "/"],
    ["NumpadMultiply", "*"],
    ["NumpadSubtract", "−"],
  ].forEach(([c, l], i) => keys.push([c, l, 18.5 + i, 1.5, 1, 1]));
  [
    ["Numpad7", "7", "Home"],
    ["Numpad8", "8", "↑"],
    ["Numpad9", "9", "PgUp"],
  ].forEach(([c, l, t], i) => keys.push([c, l, 18.5 + i, 2.5, 1, 1, t]));
  keys.push(["NumpadAdd", "+", 21.5, 2.5, 1, 2]);
  [
    ["Numpad4", "4", "←"],
    ["Numpad5", "5", ""],
    ["Numpad6", "6", "→"],
  ].forEach(([c, l, t], i) => keys.push([c, l, 18.5 + i, 3.5, 1, 1, t || undefined]));
  [
    ["Numpad1", "1", "End"],
    ["Numpad2", "2", "↓"],
    ["Numpad3", "3", "PgDn"],
  ].forEach(([c, l, t], i) => keys.push([c, l, 18.5 + i, 4.5, 1, 1, t]));
  keys.push(["NumpadEnter", "Enter", 21.5, 4.5, 1, 2]);
  keys.push(["Numpad0", "0", 18.5, 5.5, 2, 1, "Ins"]);
  keys.push(["NumpadDecimal", ".", 20.5, 5.5, 1, 1, "Del"]);
  return keys;
}

const COLS = 22.5;
const ROWS = 6.5;
// 브라우저마다 다르게 주는 코드 · 키 값을 하나로 맞춘다
const CODE_ALIAS: Record<string, string> = { HangulMode: "Lang1", Hanja: "Lang2", OSLeft: "MetaLeft", OSRight: "MetaRight" };
const KEY_ALIAS: Record<string, string> = { HangulMode: "Lang1", HanjaMode: "Lang2" };

/** 키보드 테스트 — 눌린 키 표시, 동시 입력 수, 채터링(40ms 미만 반복) 경고 */
export default function KeyboardTester() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { $, status, on, cleanup } = dtKit(ref.current!);
    const layout = buildLayout();
    const kb = $(".kb");
    const els: Record<string, HTMLElement> = {};
    kb.innerHTML = "";
    kb.style.aspectRatio = `${COLS} / ${ROWS}`;
    layout.forEach(([code, label, x, y, w, h, top]) => {
      const el = document.createElement("div");
      el.className = "key" + (label.length > 2 ? " word" : "");
      el.style.left = (x / COLS) * 100 + "%";
      el.style.top = (y / ROWS) * 100 + "%";
      el.style.width = "calc(" + (w / COLS) * 100 + "% - 0.35cqw)";
      el.style.height = "calc(" + (h / ROWS) * 100 + "% - 0.35cqw)";
      if (top) {
        const t = document.createElement("span");
        t.className = "top";
        t.textContent = top;
        el.appendChild(t);
      }
      const s = document.createElement("span");
      s.textContent = label;
      el.appendChild(s);
      el.title = code;
      kb.appendChild(el);
      els[code] = el;
    });
    const leds = document.createElement("div");
    leds.className = "leds";
    leds.style.left = (18.5 / COLS) * 100 + "%";
    leds.style.width = (4 / COLS) * 100 + "%";
    leds.style.height = (1 / ROWS) * 100 + "%";
    leds.innerHTML = '<span data-l="NumLock"><i></i>Num</span><span data-l="CapsLock"><i></i>Caps</span><span data-l="ScrollLock"><i></i>Scroll</span>';
    kb.appendChild(leds);
    const syncLeds = (e: KeyboardEvent) => {
      if (e.getModifierState) ["NumLock", "CapsLock", "ScrollLock"].forEach((k) => leds.querySelector('[data-l="' + k + '"]')!.classList.toggle("on", !!e.getModifierState(k)));
    };
    on(window, "keydown", syncLeds);
    on(window, "keyup", syncLeds);

    const down = new Set<string>();
    const seen = new Set<string>();
    const lastAt: Record<string, number> = {};
    let maxDown = 0;
    const log = $(".log");
    const addLog = (line: string) => {
      log.textContent = line + "\n" + (log.textContent ?? "").split("\n").slice(0, 60).join("\n");
    };
    const showCount = () => {
      $("#dt-cnt").innerHTML = seen.size + "<small>/ " + layout.length + "</small>";
    };
    const idOf = (e: KeyboardEvent) => KEY_ALIAS[e.key] || CODE_ALIAS[e.code] || e.code || e.key;

    on(window, "keydown", (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest?.("input,textarea,[contenteditable]")) return;
      if (!((e.ctrlKey || e.metaKey) && e.code !== "Tab")) e.preventDefault();
      const id = idOf(e);
      const now = performance.now();
      if (!e.repeat) {
        const gap = lastAt[id] ? now - lastAt[id] : null;
        lastAt[id] = now;
        addLog("↓ " + (id || "?") + "  key=" + JSON.stringify(e.key) + (gap !== null && gap < 40 ? "  ⚠ " + gap.toFixed(0) + "ms 간격(채터링 의심)" : ""));
      }
      down.add(id);
      seen.add(id);
      els[id]?.classList.add("down", "done");
      maxDown = Math.max(maxDown, down.size);
      $("#dt-last").textContent = id || e.key;
      $("#dt-now").textContent = String(down.size);
      $("#dt-max").innerHTML = maxDown + "<small>키</small>";
      showCount();
      status("#dt-st", "ok", "<b>" + (id || e.key) + "</b> 입력됨 · 키 값 " + JSON.stringify(e.key) + " · 위치 " + ["기본", "왼쪽", "오른쪽", "숫자패드"][e.location || 0]);
    });
    on(window, "keyup", (e: KeyboardEvent) => {
      const id = idOf(e);
      down.delete(id);
      els[id]?.classList.remove("down");
      $("#dt-now").textContent = String(down.size);
      if (!seen.has(id)) {
        seen.add(id);
        els[id]?.classList.add("done");
        showCount();
        addLog("↑ " + id + " (keyup 만 감지)");
      }
    });
    on(window, "blur", () => {
      down.clear();
      Object.values(els).forEach((el) => el.classList.remove("down"));
      $("#dt-now").textContent = "0";
    });
    on($("#dt-reset"), "click", () => {
      down.clear();
      seen.clear();
      maxDown = 0;
      log.textContent = "";
      Object.values(els).forEach((el) => el.classList.remove("down", "done"));
      $("#dt-now").textContent = "0";
      $("#dt-cnt").textContent = "0";
      $("#dt-max").innerHTML = "0<small>키</small>";
      $("#dt-last").textContent = "–";
      $("#dt-reset").blur();
    });
    return cleanup;
  }, []);

  return (
    <div ref={ref}>
      <div className="panel">
        <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
          <div id="dt-st" className="status" style={{ flex: 1 }}>
            <span className="dot" />
            <span>아무 키나 눌러 보세요. 한 번이라도 눌린 키는 강조색으로 남습니다.</span>
          </div>
          <button type="button" className="btn" id="dt-reset">
            초기화
          </button>
        </div>
        <div className="kb-scroll">
          <div className="kb" />
        </div>
        <p className="small muted" style={{ margin: "10px 0 0" }}>
          휴대폰에서는 자판을 옆으로 밀어 넘패드를 볼 수 있습니다. 키 위에 마우스를 올리면 키 코드가 보입니다.
        </p>
      </div>
      <div className="panel">
        <div className="stats">
          <div className="stat">
            <div className="k">마지막 키</div>
            <div className="v mono" id="dt-last" style={{ fontSize: 18 }}>
              –
            </div>
          </div>
          <div className="stat">
            <div className="k">지금 눌린 키</div>
            <div className="v" id="dt-now">
              0
            </div>
          </div>
          <div className="stat">
            <div className="k">최대 동시 입력</div>
            <div className="v" id="dt-max">
              0<small>키</small>
            </div>
          </div>
          <div className="stat">
            <div className="k">확인한 키</div>
            <div className="v" id="dt-cnt">
              0
            </div>
          </div>
        </div>
        <h2 style={{ marginTop: 16 }}>입력 기록</h2>
        <div className="log" />
      </div>
      <div className="panel help">
        <h2>참고</h2>
        <ul>
          <li>
            <b>동시 입력(롤오버)</b>: 여러 키를 한꺼번에 눌러 몇 개까지 인식되는지 보세요. 게이밍 키보드는 6키 이상(NKRO)을 지원합니다.
          </li>
          <li>Windows 키, Alt+Tab, Fn 키처럼 운영체제가 먼저 가져가는 키는 브라우저에서 확인할 수 없습니다.</li>
          <li>한 번 눌렀는데 두 번 찍히면 ‘채터링’입니다. 입력 기록에서 같은 키가 매우 짧은 간격(40ms 미만)으로 반복되면 경고가 붙습니다. 클랙 공방의 타건 검수 · 스위치 교체 상담을 이용해 보세요.</li>
        </ul>
      </div>
    </div>
  );
}
