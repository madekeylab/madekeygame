import { Link } from 'react-router-dom';
import { BuildPreview } from '../components/KeyboardSvg';
import { ReviewItem, TagChip } from '../components/ui';
import { allTags } from '../data/products';
import type { Build } from '../data/types';
import { buildTotal } from '../lib/compat';
import { won } from '../lib/format';
import { encodeBuild } from '../lib/share';
import { useStore } from '../store/StoreContext';

const FEATURED: { name: string; build: Build }[] = [
  {
    name: '밀크티 도각 65',
    build: {
      case: 'case-pebble65', pcb: 'pcb-65-hs-bt', plate: 'plate-65-pc',
      switch: 'sw-cream-linear', stabilizer: 'stab-pcb-screw', keycap: 'kc-milk-tea',
    },
  },
  {
    name: '미드나잇 오피스 75',
    build: {
      case: 'case-orbit75', pcb: 'pcb-75-hs', plate: 'plate-75-alu',
      switch: 'sw-silent-ink', stabilizer: 'stab-plate', keycap: 'kc-midnight',
    },
  },
];

export function Home() {
  const { reviews } = useStore();
  const best = [...reviews].sort((a, b) => b.helpful - a.helpful).slice(0, 3);
  return (
    <>
      <section className="hero">
        <div className="hero-text">
          <h1>나만의 키보드를<br />직접 조립하세요</h1>
          <p className="lead">
            케이스부터 키캡까지 부품을 고르면 호환성을 바로 확인해 드려요.
            완성한 키보드는 장바구니에 한 번에 담고, SNS로 자랑하세요.
          </p>
          <div className="row gap">
            <Link to="/builder" className="btn primary lg">조립 시작하기</Link>
            <Link to="/shop" className="btn lg">부품 둘러보기</Link>
          </div>
        </div>
        <div className="hero-preview">
          <BuildPreview build={FEATURED[0].build} title="추천 빌드 미리보기" />
        </div>
      </section>

      <section className="features">
        <Link to="/builder" className="card feature">
          <span className="feature-icon">🧩</span>
          <strong>키보드 조립</strong>
          <span className="muted small">배열·핀·마운트 호환성을 자동으로 검사해요</span>
        </Link>
        <Link to="/tester" className="card feature">
          <span className="feature-icon">⌨️</span>
          <strong>키 테스트</strong>
          <span className="muted small">모든 키가 제대로 눌리는지, 채터링은 없는지 확인</span>
        </Link>
        <Link to="/reviews" className="card feature">
          <span className="feature-icon">💬</span>
          <strong>리뷰 모아보기</strong>
          <span className="muted small">부품별·태그별 리뷰를 한곳에서 비교</span>
        </Link>
        <Link to="/builds" className="card feature">
          <span className="feature-icon">📣</span>
          <strong>SNS 공유</strong>
          <span className="muted small">내 빌드를 링크와 이미지로 공유</span>
        </Link>
      </section>

      <section>
        <h2>추천 빌드</h2>
        <div className="grid two">
          {FEATURED.map((f) => (
            <Link key={f.name} to={`/b?${encodeBuild(f.build, f.name)}`} className="card featured-build">
              <BuildPreview build={f.build} title={f.name} />
              <div className="row between">
                <strong>{f.name}</strong>
                <span className="price">{won(buildTotal(f.build))}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2>태그로 찾기</h2>
        <div className="tag-row wrap">
          {allTags().slice(0, 16).map((t) => <TagChip key={t} tag={t} />)}
        </div>
      </section>

      <section>
        <div className="row between">
          <h2>도움이 많이 된 리뷰</h2>
          <Link to="/reviews" className="small">전체 리뷰 보기 →</Link>
        </div>
        <div className="grid three">
          {best.map((r) => <ReviewItem key={r.id} review={r} showProduct />)}
        </div>
      </section>
    </>
  );
}
