import { Link, useNavigate } from 'react-router-dom';
import { BuildPreview } from '../components/KeyboardSvg';
import { buildTotal, checkBuild, isComplete } from '../lib/compat';
import { won } from '../lib/format';
import { encodeBuild } from '../lib/share';
import { useStore } from '../store/StoreContext';

export function MyBuilds() {
  const { builds, dispatch } = useStore();
  const navigate = useNavigate();

  if (!builds.length) {
    return (
      <>
        <h1>내 빌드</h1>
        <p className="empty">저장한 빌드가 없어요. <Link to="/builder">키보드를 조립</Link>하고 저장해 보세요.</p>
      </>
    );
  }

  return (
    <>
      <h1>내 빌드</h1>
      <p className="muted small">빌드는 이 브라우저에 저장돼요. 공유 페이지에서 SNS로 자랑할 수 있어요.</p>
      <div className="grid two">
        {builds.map((b) => {
          const errors = checkBuild(b.parts).filter((i) => i.level === 'error').length;
          return (
            <article key={b.id} className="card">
              <BuildPreview build={b.parts} title={b.name} />
              <div className="row between wrap">
                <strong>{b.name}</strong>
                <span className="price">{won(buildTotal(b.parts))}</span>
              </div>
              <p className="small muted">
                {new Date(b.createdAt).toLocaleDateString('ko-KR')} 저장 ·{' '}
                {isComplete(b.parts) ? (errors ? `호환 문제 ${errors}개` : '완성') : '조립 중'}
              </p>
              <div className="row gap wrap">
                <button
                  className="btn primary"
                  onClick={() => {
                    dispatch({ type: 'draft/set', draft: { name: b.name, parts: b.parts, savedId: b.id } });
                    navigate('/builder');
                  }}
                >
                  이어서 조립
                </button>
                <Link className="btn" to={`/b?${encodeBuild(b.parts, b.name)}`}>📣 공유 페이지</Link>
                <button
                  className="btn ghost"
                  onClick={() => window.confirm(`"${b.name}"을(를) 삭제할까요?`) && dispatch({ type: 'build/delete', id: b.id })}
                >
                  삭제
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
