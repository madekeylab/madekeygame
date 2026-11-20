import { useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { BuildPreview } from '../components/KeyboardSvg';
import { ProductThumb } from '../components/ProductThumb';
import { SharePanel } from '../components/SharePanel';
import { IssueList } from '../components/ui';
import { keyCount } from '../data/layouts';
import { PRODUCTS, getProduct } from '../data/products';
import { BUILD_STEPS, CATEGORY_LABEL, LAYOUT_LABEL, type Build, type Category } from '../data/types';
import {
  buildLayout, buildTotal, candidateIssues, checkBuild, isComplete, quantityFor,
} from '../lib/compat';
import { won } from '../lib/format';
import { useStore } from '../store/StoreContext';

const STEP_HINT: Record<Category, string> = {
  case: '키보드의 외형과 배열을 결정해요. 먼저 고르면 나머지 부품을 맞춰 드려요.',
  pcb: '키 입력을 처리하는 기판이에요. 핫스왑이면 납땜 없이 스위치를 끼울 수 있어요.',
  plate: '스위치를 고정하는 판이에요. 소재에 따라 타건감과 소리가 달라져요.',
  switch: '타건감을 가장 크게 좌우해요. 키 개수만큼 담깁니다.',
  stabilizer: '스페이스바 같은 긴 키가 흔들리지 않게 잡아줘요.',
  keycap: '손가락이 닿는 부분이에요. 색과 프로파일을 골라보세요.',
};

export function Builder() {
  const { draft, dispatch, newSavedBuild } = useStore();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const previewRef = useRef<SVGSVGElement>(null);
  const [notice, setNotice] = useState('');

  const step = (BUILD_STEPS as string[]).includes(params.get('step') ?? '')
    ? (params.get('step') as Category)
    : BUILD_STEPS.find((c) => !draft.parts[c]) ?? 'case';
  const parts = draft.parts;
  const layout = buildLayout(parts);
  const issues = checkBuild(parts);
  const errors = issues.filter((i) => i.level === 'error');
  const complete = isComplete(parts);
  const hasAny = BUILD_STEPS.some((c) => parts[c]);

  const setDraft = (next: Partial<typeof draft>) => dispatch({ type: 'draft/set', draft: { ...draft, ...next } });
  const goStep = (c: Category) => setParams({ step: c }, { replace: true });

  const choose = (c: Category, id: string) => {
    const next: Build = { ...parts };
    if (next[c] === id) delete next[c];
    else next[c] = id;
    setDraft({ parts: next });
    const nextStep = BUILD_STEPS.find((s) => s !== c && !next[s]);
    if (next[c] && nextStep) goStep(nextStep);
  };

  const flash = (m: string) => {
    setNotice(m);
    window.setTimeout(() => setNotice(''), 3000);
  };

  const save = () => {
    const saved = { ...newSavedBuild(draft.name, parts), ...(draft.savedId ? { id: draft.savedId } : {}) };
    dispatch({ type: 'build/save', build: saved });
    setDraft({ savedId: saved.id, name: saved.name });
    flash(`"${saved.name}"을(를) 내 빌드에 저장했어요.`);
  };

  const addToCart = () => {
    const name = draft.name.trim() || '나의 키보드';
    dispatch({
      type: 'cart/add',
      lines: BUILD_STEPS.map((c) => getProduct(parts[c])!).map((p) => ({
        productId: p.id, quantity: quantityFor(p, parts), buildName: name,
      })),
    });
    navigate('/cart');
  };

  const reset = () => {
    if (hasAny && !window.confirm('지금 조립 중인 구성을 비울까요?')) return;
    dispatch({ type: 'draft/set', draft: { name: '', parts: {} } });
    goStep('case');
  };

  const options = PRODUCTS.filter((p) => p.category === step);

  return (
    <div className="builder">
      <section className="builder-summary">
        <h1>키보드 조립</h1>
        <div className="card preview-card">
          <BuildPreview ref={previewRef} build={parts} title={draft.name || '조립 중인 키보드'} />
          <p className="small muted center">
            {layout ? `${LAYOUT_LABEL[layout]} 배열 · 키 ${keyCount(layout)}개` : '케이스를 고르면 배열이 정해져요'}
          </p>
        </div>

        <label className="field">
          빌드 이름
          <input
            value={draft.name}
            placeholder="예: 밀크티 도각 65"
            maxLength={40}
            onChange={(e) => setDraft({ name: e.target.value })}
          />
        </label>

        <ol className="parts-list">
          {BUILD_STEPS.map((c) => {
            const p = getProduct(parts[c]);
            const qty = p ? quantityFor(p, parts) : 0;
            const flagged = issues.some((i) => i.categories.includes(c) && i.level === 'error');
            return (
              <li key={c} className={`${c === step ? 'current' : ''} ${flagged ? 'flagged' : ''}`}>
                <button type="button" onClick={() => goStep(c)}>
                  <span className="part-cat">{p ? '✅' : '⬜'} {CATEGORY_LABEL[c]}</span>
                  <span className="part-name">{p ? p.name : '선택 안 함'}</span>
                  <span className="part-price">
                    {p ? (c === 'switch' ? (qty ? `${qty}개 · ${won(p.price * qty)}` : '배열 선택 후 계산') : won(p.price)) : ''}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <IssueList issues={issues} />

        <div className="total-row">
          <span>합계</span>
          <strong className="price lg">{won(buildTotal(parts))}</strong>
        </div>

        <div className="stack">
          <button className="btn primary" onClick={addToCart} disabled={!complete || errors.length > 0}>
            🛒 빌드 전체 장바구니 담기
          </button>
          {!complete && <p className="small muted">6가지 부품을 모두 고르면 장바구니에 담을 수 있어요.</p>}
          {complete && errors.length > 0 && <p className="small error-text">호환되지 않는 부품을 바꿔주세요.</p>}
          <div className="row gap">
            <button className="btn" onClick={save} disabled={!hasAny}>💾 내 빌드에 저장</button>
            <button className="btn ghost" onClick={reset}>처음부터</button>
          </div>
          <p className="small ok" role="status" aria-live="polite">
            {notice}{notice && <> <Link to="/builds">내 빌드 보기 →</Link></>}
          </p>
        </div>

        {hasAny && (
          <div className="card">
            <strong>SNS에 자랑하기</strong>
            <SharePanel build={parts} name={draft.name} previewRef={previewRef} />
          </div>
        )}
      </section>

      <section className="builder-options">
        <div className="tabs" role="tablist" aria-label="부품 단계">
          {BUILD_STEPS.map((c, i) => (
            <button
              key={c}
              role="tab"
              aria-selected={c === step}
              className={c === step ? 'active' : ''}
              onClick={() => goStep(c)}
            >
              {i + 1}. {CATEGORY_LABEL[c]}
            </button>
          ))}
        </div>
        <p className="muted">{STEP_HINT[step]}</p>
        <div className="stack">
          {options.map((p) => {
            const cand = candidateIssues(p, parts);
            const bad = cand.some((i) => i.level === 'error');
            const warn = !bad && cand.length > 0;
            const selected = parts[step] === p.id;
            const qty = p.category === 'switch' && layout ? keyCount(layout) : 1;
            return (
              <article key={p.id} className={`card option ${selected ? 'selected' : ''} ${bad ? 'incompatible' : ''}`}>
                <ProductThumb product={p} size={84} />
                <div className="option-body">
                  <div className="row between wrap">
                    <strong>{p.name}</strong>
                    <span className="price">
                      {won(p.price * qty)}
                      {p.category === 'switch' && <span className="muted small"> ({won(p.price)} × {layout ? qty : '?'})</span>}
                    </span>
                  </div>
                  <p className="small muted">{p.description}</p>
                  <div className="tag-row">
                    {bad && <span className="badge error">호환 불가</span>}
                    {warn && <span className="badge warn">주의</span>}
                    {!cand.length && hasAny && <span className="badge ok">호환</span>}
                    {p.tags.slice(0, 3).map((t) => <span key={t} className="tag static">#{t}</span>)}
                  </div>
                  {cand.length > 0 && <p className="small option-issue">{cand[0].message}</p>}
                  <div className="row gap">
                    <button className={`btn ${selected ? '' : 'primary'}`} onClick={() => choose(step, p.id)}>
                      {selected ? '선택 해제' : '선택'}
                    </button>
                    <Link to={`/product/${p.id}`} className="btn ghost">상세·리뷰</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
