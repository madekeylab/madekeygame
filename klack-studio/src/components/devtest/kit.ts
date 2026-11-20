// 기기테스트 공용 도구 — 테스트들은 React 상태 대신 DOM을 직접 고친다(초당 수백 번 갱신되는 값이 많아서).
export function dtKit(root: HTMLElement) {
  const $ = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector(sel) as T;
  const offs: (() => void)[] = [];
  return {
    $,
    $$: (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel)),
    /** 상태 줄 갱신. kind: "" | ok | warn | bad */
    status(target: string | HTMLElement, kind: string, html: string) {
      const el = typeof target === "string" ? $(target) : target;
      if (!el) return;
      el.className = "status" + (kind ? " " + kind : "");
      el.innerHTML = '<span class="dot"></span><span>' + html + "</span>";
    },
    /** 캔버스 해상도를 화면 배율에 맞추고 2D 컨텍스트를 돌려준다 */
    fitCanvas(c: HTMLCanvasElement) {
      const r = c.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (c.width !== w || c.height !== h) {
        c.width = w;
        c.height = h;
      }
      return c.getContext("2d")!;
    },
    css: (name: string) => getComputedStyle(root).getPropertyValue(name).trim(),
    on(target: EventTarget, type: string, fn: (e: any) => void, opts?: boolean | AddEventListenerOptions) {
      target.addEventListener(type, fn, opts);
      offs.push(() => target.removeEventListener(type, fn, opts));
    },
    cleanup: () => {
      offs.splice(0).forEach((f) => f());
    },
  };
}
