import { useEffect, useState } from 'react';
import { KeyboardSvg, type KeyStyle } from '../components/KeyboardSvg';
import { LAYOUTS, type KeyDef } from '../data/layouts';
import { LAYOUT_LABEL, type LayoutId } from '../data/types';
import { CHATTER_MS, emptyTester, keyDown, keyUp, releaseAll } from '../lib/tester';

const isTyping = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable);

const COLORS = {
  idle: { fill: '#f3f4f6', text: '#6b7280' },
  pressed: { fill: '#ff8a3d', text: '#ffffff', stroke: '#c2410c' },
  tested: { fill: '#34c77b', text: '#ffffff' },
  chatter: { fill: '#ef4444', text: '#ffffff', stroke: '#991b1b' },
};

export function Tester() {
  const [layoutId, setLayoutId] = useState<LayoutId>('tkl');
  const [state, setState] = useState(emptyTester);
  const layout = LAYOUTS[layoutId];

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      // Keep Tab, Space, arrows, F-keys etc. from moving focus or scrolling the page.
      e.preventDefault();
      setState((s) => keyDown(s, e.code, e.key, e.timeStamp, e.repeat));
    };
    const up = (e: KeyboardEvent) => {
      if (isTyping(e.target)) return;
      e.preventDefault();
      setState((s) => keyUp(s, e.code, e.key, e.timeStamp));
    };
    const blur = () => setState(releaseAll);
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    window.addEventListener('blur', blur);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
      window.removeEventListener('blur', blur);
    };
  }, []);

  const codes = new Set(layout.keys.map((k) => k.code));
  const testedCount = layout.keys.filter((k) => state.presses[k.code]).length;
  const chatterKeys = Object.entries(state.chatter);
  const outside = Object.keys(state.presses).filter((c) => !codes.has(c));
  const pct = Math.round((testedCount / layout.keys.length) * 100);
  const last = state.log[0];

  const keyStyle = (k: KeyDef): KeyStyle => {
    if (k.code in state.down) return COLORS.pressed;
    if (state.chatter[k.code]) return COLORS.chatter;
    if (state.presses[k.code]) return COLORS.tested;
    return COLORS.idle;
  };

  return (
    <>
      <h1>키 테스트</h1>
      <p className="muted">
        키보드의 모든 키를 하나씩 눌러보세요. 눌린 키는 <span className="dot pressed" />주황색,
        확인된 키는 <span className="dot tested" />초록색, 한 번 눌렀는데 두 번 입력되는
        채터링이 의심되는 키는 <span className="dot chatter" />빨간색으로 표시돼요.
      </p>

      <div className="toolbar">
        <label className="field inline">
          배열
          <select value={layoutId} onChange={(e) => { setLayoutId(e.target.value as LayoutId); e.target.blur(); }}>
            {(Object.keys(LAYOUTS) as LayoutId[]).map((l) => <option key={l} value={l}>{LAYOUT_LABEL[l]}</option>)}
          </select>
        </label>
        <button className="btn" onClick={(e) => { setState(emptyTester()); e.currentTarget.blur(); }}>초기화</button>
      </div>

      <div className="card tester-board">
        <KeyboardSvg layout={layoutId} frame="#2b2f38" keyStyle={keyStyle} title="키 테스트 키보드" />
      </div>

      <div className="grid three tester-stats">
        <div className="card stat">
          <span className="muted small">확인한 키</span>
          <strong className="stat-num">{testedCount} / {layout.keys.length}</strong>
          <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${pct}%` }} />
          </div>
          {pct === 100 && <span className="small ok">🎉 모든 키가 정상 입력됐어요!</span>}
        </div>
        <div className="card stat">
          <span className="muted small">마지막 입력</span>
          {last ? (
            <>
              <strong className="stat-num">{last.key === ' ' ? 'Space' : last.key}</strong>
              <span className="small mono">
                code: {last.code}
                {last.held !== undefined && ` · ${last.held}ms 눌림`}
              </span>
            </>
          ) : (
            <strong className="stat-num muted">아무 키나 누르세요</strong>
          )}
        </div>
        <div className="card stat">
          <span className="muted small">채터링 의심 ({CHATTER_MS}ms 이내 재입력)</span>
          <strong className={`stat-num ${chatterKeys.length ? 'error-text' : ''}`}>{chatterKeys.length}개 키</strong>
          <span className="small mono">{chatterKeys.map(([c, n]) => `${c}×${n}`).join(', ') || '문제 없음'}</span>
        </div>
      </div>

      <div className="grid two">
        <div className="card">
          <strong>입력 기록</strong>
          <ol className="key-log mono small">
            {state.log.map((l, i) => (
              <li key={`${l.t}-${i}`} className={l.chatter ? 'error-text' : ''}>
                {l.type === 'down' ? '▼' : '▲'} {l.code}
                {l.held !== undefined && <span className="muted"> ({l.held}ms)</span>}
                {l.chatter && ' ⚠ 채터링'}
              </li>
            ))}
            {!state.log.length && <li className="muted">기록 없음</li>}
          </ol>
        </div>
        <div className="card small">
          <strong>알아두세요</strong>
          <ul className="notes">
            <li>Fn 키는 키보드 안에서 처리돼 브라우저로 신호가 오지 않아 테스트할 수 없어요.</li>
            <li>Win, Alt+Tab, PrtSc처럼 운영체제가 먼저 가로채는 키는 표시되지 않을 수 있어요.</li>
            <li>한/영·한자 키는 오른쪽 Alt·Ctrl 자리에 표시돼요.</li>
            {outside.length > 0 && <li>이 배열에 없는 키 입력: <span className="mono">{outside.join(', ')}</span></li>}
          </ul>
        </div>
      </div>
    </>
  );
}
