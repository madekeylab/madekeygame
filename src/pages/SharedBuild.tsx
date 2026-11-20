import { useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BuildPreview } from '../components/KeyboardSvg';
import { SharePanel } from '../components/SharePanel';
import { IssueList } from '../components/ui';
import { getProduct } from '../data/products';
import { BUILD_STEPS, CATEGORY_LABEL } from '../data/types';
import { buildProducts, buildTotal, checkBuild, isComplete, quantityFor } from '../lib/compat';
import { won } from '../lib/format';
import { decodeBuild } from '../lib/share';
import { useStore } from '../store/StoreContext';

/** Page a shared link opens: shows someone's build and lets the visitor reuse it. */
export function SharedBuild() {
  const { search } = useLocation();
  const { build, name } = decodeBuild(search);
  const { dispatch } = useStore();
  const navigate = useNavigate();
  const previewRef = useRef<SVGSVGElement>(null);
  const parts = buildProducts(build);
  const issues = checkBuild(build);
  const title = name || '공유된 키보드';

  if (!parts.length) {
    return <p className="empty">빌드 정보를 읽을 수 없어요. 링크가 잘렸는지 확인해 주세요. <Link to="/builder">직접 조립하기</Link></p>;
  }

  const remix = () => {
    dispatch({ type: 'draft/set', draft: { name: `${title} (리믹스)`, parts: build } });
    navigate('/builder');
  };

  const addToCart = () => {
    dispatch({
      type: 'cart/add',
      lines: parts.map((p) => ({ productId: p.id, quantity: quantityFor(p, build), buildName: title })),
    });
    navigate('/cart');
  };

  return (
    <div className="narrow">
      <p className="small muted">공유된 빌드</p>
      <h1>{title}</h1>
      <div className="card preview-card">
        <BuildPreview ref={previewRef} build={build} title={title} />
      </div>
      <table className="specs wide">
        <tbody>
          {BUILD_STEPS.map((c) => {
            const p = getProduct(build[c]);
            const qty = p ? quantityFor(p, build) : 0;
            return (
              <tr key={c}>
                <th>{CATEGORY_LABEL[c]}</th>
                <td>{p ? <Link to={`/product/${p.id}`}>{p.name}</Link> : <span className="muted">없음</span>}</td>
                <td className="right">{p ? `${qty > 1 ? `${qty}개 · ` : ''}${won(p.price * qty)}` : ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <IssueList issues={issues} />
      <div className="total-row">
        <span>합계</span>
        <strong className="price lg">{won(buildTotal(build))}</strong>
      </div>
      <div className="row gap wrap">
        <button className="btn primary" onClick={addToCart} disabled={!isComplete(build) || issues.some((i) => i.level === 'error')}>
          🛒 이 구성 그대로 담기
        </button>
        <button className="btn" onClick={remix}>🧩 이 빌드로 조립 시작</button>
      </div>
      <div className="card">
        <strong>다시 공유하기</strong>
        <SharePanel build={build} name={name} previewRef={previewRef} />
      </div>
    </div>
  );
}
