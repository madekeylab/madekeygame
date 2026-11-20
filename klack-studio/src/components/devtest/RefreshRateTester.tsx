"use client";
import { useEffect, useRef } from "react";
import { dtKit } from "./kit";

const STANDARD_HZ = [24, 30, 48, 50, 60, 72, 75, 90, 100, 120, 144, 165, 170, 180, 200, 240, 280, 300, 360, 480, 500, 540];
const median = (a: number[]) => {
  const s = a.slice().sort((x, y) => x - y);
  return s[Math.floor(s.length / 2)] || 0;
};

/** 주사율 테스트 — 프레임 간격으로 화면 Hz 추정, 분포 그래프, 움직임 비교 */
export default function RefreshRateTester() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const { $, fitCanvas, css, on, cleanup } = dtKit(ref.current!);
    let last = 0;
    let frames: number[] = [];
    let startedAt = 0;
    let dropped = 0;
    let tick = 0;
    let motionStart = 0;
    let raf = 0;
    const DIV = [1, 2, 4];
    const heldAt: Record<number, number> = {};

    on($("#dt-reset"), "click", () => {
      frames = [];
      dropped = 0;
      last = 0;
      tick = 0;
      $("#dt-drop").textContent = "0";
    });
    on(document, "visibilitychange", () => {
      last = 0;
    });

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      tick++;
      if (last) {
        const dt = t - last;
        if (dt < 250) {
          frames.push(dt);
          if (frames.length > 600) frames.shift();
          const m = median(frames);
          if (frames.length > 30 && dt > 1.6 * m) dropped++;
        }
      } else startedAt = t;
      last = t;

      if (tick % 10 === 0 && frames.length > 20) {
        const med = median(frames);
        const hz = 1000 / med;
        const mean = frames.reduce((a, b) => a + b, 0) / frames.length;
        const jitter = Math.sqrt(frames.reduce((a, b) => a + (b - mean) * (b - mean), 0) / frames.length);
        const near = STANDARD_HZ.reduce((a, b) => (Math.abs(b - hz) < Math.abs(a - hz) ? b : a));
        $("#dt-hz").innerHTML = hz.toFixed(hz >= 100 ? 0 : 1) + '<span style="font-size:.4em;color:var(--dt-muted)"> Hz</span>';
        $("#dt-guess").textContent = Math.abs(near - hz) / near < 0.03 ? "이 화면은 약 " + near + "Hz 로 동작하고 있습니다." : "표준 값과 다릅니다. 가변 주사율(VRR)이나 절전 모드일 수 있습니다.";
        $("#dt-ft").innerHTML = med.toFixed(2) + "<small>ms</small>";
        $("#dt-jit").innerHTML = jitter.toFixed(2) + "<small>ms</small>";
        $("#dt-drop").textContent = String(dropped);
        $("#dt-dur").innerHTML = Math.floor((t - startedAt) / 1000) + "<small>초</small>";
        // 프레임 시간 분포
        const hc = $<HTMLCanvasElement>("#dt-hist");
        const g = fitCanvas(hc);
        const W = hc.width;
        const H = hc.height;
        const bins = Array(60).fill(0);
        const span = Math.max(20, 2.5 * med);
        frames.forEach((f) => {
          bins[Math.min(59, Math.floor((f / span) * 60))]++;
        });
        const peak = Math.max(...bins);
        g.clearRect(0, 0, W, H);
        g.fillStyle = css("--dt-acc") || css("--accent");
        bins.forEach((n, i) => {
          const h = (n / peak) * (H - 18);
          g.fillRect((i * W) / 60 + 1, H - 16 - h, W / 60 - 2, h);
        });
        g.fillStyle = css("--dt-faint") || css("--ink-4");
        g.font = 11 * (window.devicePixelRatio || 1) + "px sans-serif";
        g.textAlign = "left";
        g.fillText("0ms", 2, H - 3);
        g.textAlign = "right";
        g.fillText(span.toFixed(0) + "ms", W - 2, H - 3);
      }

      // 같은 속도의 막대 셋: 매 프레임 / 2프레임마다 / 4프레임마다 갱신
      const mc = $<HTMLCanvasElement>("#dt-motion");
      const m = fitCanvas(mc);
      const W = mc.width;
      const H = mc.height;
      const dpr = window.devicePixelRatio || 1;
      if (!motionStart) motionStart = t;
      const speed = W / 2.5;
      const bar = 60 * dpr;
      m.clearRect(0, 0, W, H);
      const colors = [css("--accent"), css("--ink-2"), "#e0a63a"];
      DIV.forEach((d, i) => {
        if (heldAt[d] === undefined || tick % d === 0) heldAt[d] = t;
        const x = ((((heldAt[d] - motionStart) / 1000) * speed) % (W + bar)) - bar;
        const y = ((i + 0.5) * H) / 3;
        m.fillStyle = css("--line");
        m.fillRect(0, y - 1, W, 2);
        m.fillStyle = colors[i];
        m.fillRect(x, y - 16 * dpr, bar, 32 * dpr);
        m.fillStyle = css("--ink-3");
        m.font = 12 * dpr + "px sans-serif";
        m.textAlign = "left";
        m.fillText(["매 프레임", "1/2 프레임", "1/4 프레임"][i], 6 * dpr, y - 20 * dpr);
      });
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      cleanup();
    };
  }, []);

  return (
    <div ref={ref}>
      <div className="panel">
        <div className="big-num" id="dt-hz">
          –<span style={{ fontSize: ".4em", color: "var(--dt-muted)" }}> Hz</span>
        </div>
        <p className="muted" style={{ textAlign: "center", margin: "8px 0 16px" }} id="dt-guess">
          측정 중… 이 탭을 앞에 띄워 두고 마우스를 움직이지 마세요.
        </p>
        <div className="stats">
          <div className="stat">
            <div className="k">프레임 시간</div>
            <div className="v" id="dt-ft">
              –<small>ms</small>
            </div>
          </div>
          <div className="stat">
            <div className="k">흔들림(지터)</div>
            <div className="v" id="dt-jit">
              –<small>ms</small>
            </div>
          </div>
          <div className="stat">
            <div className="k">끊긴 프레임</div>
            <div className="v" id="dt-drop">
              0
            </div>
          </div>
          <div className="stat">
            <div className="k">측정 시간</div>
            <div className="v" id="dt-dur">
              0<small>초</small>
            </div>
          </div>
        </div>
        <canvas className="viz" id="dt-hist" style={{ marginTop: 14, height: 120 }} />
        <div className="row" style={{ marginTop: 12 }}>
          <button type="button" className="btn" id="dt-reset">
            다시 측정
          </button>
        </div>
      </div>
      <div className="panel">
        <h2>움직임 부드러움 비교</h2>
        <p className="small muted" style={{ margin: "0 0 12px" }}>
          같은 속도로 움직이는 세 개의 막대입니다. 위에서부터 매 프레임 / 절반 / 1/4 로 그려집니다. 주사율이 높을수록 위쪽 막대가 훨씬 매끄럽게 보입니다.
        </p>
        <canvas id="dt-motion" className="viz" style={{ height: 180 }} />
      </div>
      <div className="panel help">
        <h2>값이 예상보다 낮게 나올 때</h2>
        <ul>
          <li>Windows: 설정 → 디스플레이 → 고급 디스플레이에서 ‘새로 고침 빈도’를 최대로 고르세요.</li>
          <li>노트북은 전원 연결을 해제하면 절전 때문에 60Hz 로 떨어지는 경우가 많습니다.</li>
          <li>케이블 규격(HDMI 1.4 는 144Hz 제한 등)과 그래픽 드라이버의 하드웨어 가속 설정도 영향을 줍니다.</li>
          <li>모니터가 여러 대면 이 창이 있는 모니터 기준으로 측정됩니다.</li>
        </ul>
      </div>
    </div>
  );
}
