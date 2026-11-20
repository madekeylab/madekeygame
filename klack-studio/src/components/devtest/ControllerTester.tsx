"use client";
import { useEffect, useRef } from "react";
import { dtKit } from "./kit";

const STANDARD_BUTTONS = ["A / ×", "B / ○", "X / □", "Y / △", "LB / L1", "RB / R1", "LT / L2", "RT / R2", "View / Share", "Menu / Options", "L3(왼스틱)", "R3(오른스틱)", "▲", "▼", "◀", "▶", "Home / PS"];
const esc = (s: string) => s.replace(/[<&>"]/g, (c) => ({ "<": "&lt;", "&": "&amp;", ">": "&gt;", '"': "&quot;" })[c]!);

type PadView = { p: HTMLElement; btns: NodeListOf<HTMLElement>; sticks: NodeListOf<HTMLElement>; labels: NodeListOf<HTMLElement> };

/** 컨트롤러 테스트 — 버튼 입력값 · 스틱 위치(드리프트) · 진동 */
export default function ControllerTester() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { $, status, on, cleanup } = dtKit(ref.current!);
    const views: Record<number, PadView> = {};
    let raf = 0;
    let alive = true;

    async function rumble(index: number, strong: boolean, msg: HTMLElement) {
      const pad = navigator.getGamepads()[index];
      const act = pad && (pad as any).vibrationActuator;
      if (!act || !act.playEffect) {
        msg.textContent = "이 컨트롤러/브라우저는 진동을 지원하지 않습니다.";
        return;
      }
      try {
        await act.playEffect("dual-rumble", { duration: 800, strongMagnitude: strong ? 1 : 0.2, weakMagnitude: strong ? 0.6 : 0.8 });
        msg.textContent = "진동 명령을 보냈습니다.";
      } catch (e) {
        msg.textContent = "진동 실패: " + (e as Error).message;
      }
    }

    function addPad(pad: Gamepad) {
      const el = document.createElement("div");
      el.className = "panel";
      let btns = "";
      pad.buttons.forEach((_, i) => {
        btns += "<div><i></i><span>" + (pad.mapping === "standard" && STANDARD_BUTTONS[i] ? STANDARD_BUTTONS[i] : "버튼 " + i) + '<br><b class="mono">0.00</b></span></div>';
      });
      let sticks = "";
      for (let i = 0; i + 1 < pad.axes.length; i += 2) sticks += '<div><div class="stick"><i></i></div><div class="small muted mono" style="text-align:center;margin-top:6px">축 ' + i + "/" + (i + 1) + ": <span>0.00, 0.00</span></div></div>";
      el.innerHTML =
        "<h2>#" +
        (pad.index + 1) +
        " " +
        esc(pad.id) +
        '</h2><p class="small muted" style="margin:-6px 0 12px">매핑: ' +
        (pad.mapping === "standard" ? "표준" : "비표준(버튼 번호로 표시)") +
        " · 버튼 " +
        pad.buttons.length +
        "개 · 축 " +
        pad.axes.length +
        '개</p><div class="sticks" style="margin-bottom:14px">' +
        sticks +
        '</div><div class="pad-btns">' +
        btns +
        '</div><div class="row" style="margin-top:14px"><button type="button" class="btn" data-rumble="weak">약한 진동</button><button type="button" class="btn" data-rumble="strong">강한 진동</button><span class="small muted rmsg"></span></div>';
      $("#dt-pads").appendChild(el);
      el.querySelectorAll<HTMLElement>("[data-rumble]").forEach((b) => {
        b.onclick = () => void rumble(pad.index, b.dataset.rumble === "strong", el.querySelector<HTMLElement>(".rmsg")!);
      });
      views[pad.index] = { p: el, btns: el.querySelectorAll(".pad-btns > div"), sticks: el.querySelectorAll(".stick i"), labels: el.querySelectorAll(".sticks span") };
    }

    function poll() {
      if (!alive) return;
      raf = requestAnimationFrame(poll);
      const pads = navigator.getGamepads ? navigator.getGamepads() : [];
      let n = 0;
      for (const pad of pads) {
        if (!pad) continue;
        n++;
        if (!views[pad.index]) addPad(pad);
        const v = views[pad.index];
        pad.buttons.forEach((b, i) => {
          const el = v.btns[i];
          if (!el) return;
          el.querySelector<HTMLElement>("i")!.style.width = 100 * b.value + "%";
          el.querySelector("b")!.textContent = b.value.toFixed(2);
        });
        for (let i = 0, s = 0; i + 1 < pad.axes.length; i += 2, s++) {
          const x = pad.axes[i];
          const y = pad.axes[i + 1];
          if (v.sticks[s]) v.sticks[s].style.transform = "translate(" + 54 * x + "px," + 54 * y + "px)";
          if (v.labels[s]) v.labels[s].textContent = x.toFixed(2) + ", " + y.toFixed(2);
        }
      }
      // 연결된 패드가 없으면 쉬다가 gamepadconnected 때 다시 돈다
      if (!n) cancelAnimationFrame(raf);
    }

    on(window, "gamepadconnected", (e: GamepadEvent) => {
      status("#dt-st", "ok", "<b>연결됨:</b> " + esc(e.gamepad.id) + " — 버튼과 스틱을 움직여 보세요.");
      cancelAnimationFrame(raf);
      poll();
    });
    on(window, "gamepaddisconnected", (e: GamepadEvent) => {
      const v = views[e.gamepad.index];
      if (v) {
        v.p.remove();
        delete views[e.gamepad.index];
      }
      status("#dt-st", "warn", "컨트롤러 연결이 끊어졌습니다.");
    });
    if ("getGamepads" in navigator) poll();
    else status("#dt-st", "bad", "이 브라우저는 게임패드를 지원하지 않습니다. 크롬 · 엣지 · 파이어폭스 최신 버전을 사용해 주세요.");
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return (
    <div ref={ref}>
      <div className="panel">
        <div id="dt-st" className="status">
          <span className="dot" />
          <span>
            컨트롤러를 USB 나 블루투스로 연결한 뒤 <b>아무 버튼이나 한 번 눌러 주세요.</b> 브라우저는 버튼을 누르기 전까지 컨트롤러를 알려 주지 않습니다.
          </span>
        </div>
      </div>
      <div className="pads" id="dt-pads" />
      <div className="panel help">
        <h2>참고</h2>
        <ul>
          <li>Xbox · PlayStation(DualShock/DualSense) · 스위치 프로 컨트롤러 등 대부분의 표준 게임패드를 지원합니다.</li>
          <li>
            <b>스틱 드리프트</b>: 손을 뗐는데 스틱 값이 0.05 이상으로 남아 있으면 드리프트(쏠림)가 의심됩니다.
          </li>
          <li>진동은 크롬 · 엣지에서 지원되며, 컨트롤러와 연결 방식에 따라 동작하지 않을 수 있습니다.</li>
        </ul>
      </div>
    </div>
  );
}
