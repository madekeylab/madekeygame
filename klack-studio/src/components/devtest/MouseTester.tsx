"use client";
import { useEffect, useRef } from "react";
import { dtKit } from "./kit";

const BUTTONS = ["왼쪽", "가운데(휠)", "오른쪽", "뒤로(4번)", "앞으로(5번)"];
const BUTTON_LABELS = ["왼쪽 버튼", "가운데(휠)", "오른쪽 버튼", "뒤로(4번)", "앞으로(5번)"];

/** 마우스 테스트 — 버튼 · 휠 · 더블클릭 간격 · 폴링 레이트 추정 */
export default function MouseTester() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = ref.current!;
    const { $, $$, status, on, cleanup } = dtKit(root);
    const area = $("#dt-area");
    const counts = [0, 0, 0, 0, 0];
    let up = 0;
    let downN = 0;
    let tilt = 0;
    let lastClick: Record<number, number> = {};
    let moves: number[] = [];
    let best = 0;
    const cell = (b: number) => root.querySelector<HTMLElement>('[data-b="' + b + '"]');

    on(area, "contextmenu", (e: Event) => e.preventDefault());
    on(area, "mousedown", (e: MouseEvent) => {
      e.preventDefault();
      const b = e.button;
      if (b > 4) return;
      counts[b]++;
      const c = cell(b)!;
      c.classList.add("down", "done");
      c.querySelector(".c")!.textContent = String(counts[b]);
      const now = performance.now();
      const gap = lastClick[b] ? now - lastClick[b] : null;
      lastClick[b] = now;
      let msg = "<b>" + BUTTONS[b] + "</b> 버튼 눌림";
      if (gap !== null && gap < 500) {
        $("#dt-dbl").innerHTML = gap.toFixed(0) + "<small>ms</small>";
        msg += " · 직전 클릭과 " + gap.toFixed(0) + "ms 간격";
        if (gap < 80) return status("#dt-st", "warn", msg + " — <b>너무 짧습니다. 한 번만 눌렀다면 더블클릭 불량(채터링)이 의심됩니다.</b>");
      }
      status("#dt-st", "ok", msg);
    });
    on(window, "mouseup", (e: MouseEvent) => {
      cell(e.button)?.classList.remove("down");
    });
    on(area, "auxclick", (e: Event) => e.preventDefault());
    // 뒤로/앞으로 버튼이 페이지를 넘기지 않도록 막는다
    on(
      window,
      "mouseup",
      (e: MouseEvent) => {
        if (e.button === 3 || e.button === 4) e.preventDefault();
      },
      true,
    );
    on(
      area,
      "wheel",
      (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) up++;
        else if (e.deltaY > 0) downN++;
        if (e.deltaX) tilt++;
        $("#dt-wu").textContent = String(up);
        $("#dt-wd").textContent = String(downN);
        $("#dt-wx").textContent = String(tilt);
        status("#dt-st", "ok", "휠 " + (e.deltaY < 0 ? "위로" : e.deltaY > 0 ? "아래로" : e.deltaX < 0 ? "왼쪽" : "오른쪽") + " · 이동량 " + Math.round(e.deltaY || e.deltaX) + (e.deltaMode ? " 줄" : " px"));
      },
      { passive: false },
    );
    // 0.5초 구간의 이동 이벤트 수로 폴링 레이트를 추정한다
    const moveEvent = "onpointerrawupdate" in window ? "pointerrawupdate" : "pointermove";
    on(area, moveEvent, (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      (moveEvent === "pointermove" && e.getCoalescedEvents ? e.getCoalescedEvents() : [e]).forEach((x) => moves.push(x.timeStamp));
      const t = e.timeStamp;
      while (moves.length && t - moves[0] > 500) moves.shift();
      if (moves.length > 20) {
        const hz = Math.round((moves.length - 1) / ((moves[moves.length - 1] - moves[0]) / 1000));
        if (isFinite(hz)) {
          $("#dt-hz").innerHTML = hz + "<small>Hz</small>";
          if (hz > best && hz < 9000) {
            best = hz;
            $("#dt-hzmax").innerHTML = hz + "<small>Hz</small>";
          }
        }
      }
    });
    on($("#dt-reset"), "click", () => {
      counts.fill(0);
      up = downN = tilt = 0;
      best = 0;
      lastClick = {};
      moves = [];
      $$(".mbtns div").forEach((d) => {
        d.classList.remove("done", "down");
        d.querySelector(".c")!.textContent = "0";
      });
      ["#dt-wu", "#dt-wd", "#dt-wx"].forEach((s) => {
        $(s).textContent = "0";
      });
      ["#dt-dbl", "#dt-hz", "#dt-hzmax"].forEach((s) => {
        $(s).innerHTML = "–<small>" + (s === "#dt-dbl" ? "ms" : "Hz") + "</small>";
      });
      status("#dt-st", "", "초기화했습니다.");
    });
    return cleanup;
  }, []);

  return (
    <div ref={ref}>
      <div className="panel">
        <div className="mbtns" style={{ marginBottom: 12 }}>
          {BUTTON_LABELS.map((label, i) => (
            <div key={label} data-b={i}>
              {label}
              <br />
              <b className="c">0</b>
            </div>
          ))}
        </div>
        <div className="mouse-area" id="dt-area">
          <div>
            <b>이 영역 안에서</b> 클릭 · 휠 · 더블클릭을 해 보세요
            <br />
            <span className="small">오른쪽 클릭 메뉴와 뒤로 가기는 이 영역에서 막혀 있습니다</span>
          </div>
        </div>
        <div id="dt-st" className="status" style={{ marginTop: 12 }}>
          <span className="dot" />
          <span>대기 중</span>
        </div>
      </div>
      <div className="panel">
        <div className="stats">
          <div className="stat">
            <div className="k">휠 위로</div>
            <div className="v" id="dt-wu">
              0
            </div>
          </div>
          <div className="stat">
            <div className="k">휠 아래로</div>
            <div className="v" id="dt-wd">
              0
            </div>
          </div>
          <div className="stat">
            <div className="k">휠 좌우(틸트)</div>
            <div className="v" id="dt-wx">
              0
            </div>
          </div>
          <div className="stat">
            <div className="k">더블클릭 간격</div>
            <div className="v" id="dt-dbl">
              –<small>ms</small>
            </div>
          </div>
          <div className="stat">
            <div className="k">폴링 레이트(추정)</div>
            <div className="v" id="dt-hz">
              –<small>Hz</small>
            </div>
          </div>
          <div className="stat">
            <div className="k">최고 폴링</div>
            <div className="v" id="dt-hzmax">
              –<small>Hz</small>
            </div>
          </div>
        </div>
        <p className="small muted" style={{ margin: "12px 0 0" }}>
          폴링 레이트는 영역 안에서 마우스를 빠르게 원을 그리며 움직일 때 측정됩니다. 브라우저 · 화면 주사율 영향으로 실제보다 낮게 나올 수 있습니다.
        </p>
        <div className="row" style={{ marginTop: 12 }}>
          <button type="button" className="btn" id="dt-reset">
            초기화
          </button>
        </div>
      </div>
      <div className="panel help">
        <h2>더블클릭 문제(한 번 눌렀는데 두 번 눌림)</h2>
        <ul>
          <li>한 번만 천천히 눌렀는데 ‘더블클릭 간격’이 80ms 이하로 찍히면 스위치 마모(채터링)일 가능성이 큽니다.</li>
          <li>휠 버튼이 안 눌리면 ‘가운데(휠)’ 칸이 강조색으로 바뀌는지 확인하세요.</li>
        </ul>
      </div>
    </div>
  );
}
