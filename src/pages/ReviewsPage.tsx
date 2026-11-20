import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ReviewItem, Stars, TagChip } from '../components/ui';
import { PRODUCTS, allTags, getProduct } from '../data/products';
import { BUILD_STEPS, CATEGORY_LABEL, type Category } from '../data/types';
import { useStore } from '../store/StoreContext';

type Sort = 'helpful' | 'recent' | 'high' | 'low';

/** All reviews in one place, filterable by category, product tag, rating and text. */
export function ReviewsPage() {
  const { reviews } = useStore();
  const [params, setParams] = useSearchParams();
  const cat = (params.get('cat') ?? '') as Category | '';
  const tag = params.get('tag') ?? '';
  const minRating = Number(params.get('min') ?? 0);
  const q = params.get('q') ?? '';
  const sort = (params.get('sort') ?? 'helpful') as Sort;

  const set = (k: string, v: string) => {
    const next = new URLSearchParams(params);
    if (v) next.set(k, v);
    else next.delete(k);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return reviews
      .filter((r) => {
        const p = getProduct(r.productId);
        if (!p) return false;
        if (cat && p.category !== cat) return false;
        if (tag && !p.tags.includes(tag)) return false;
        if (r.rating < minRating) return false;
        if (needle && !`${r.title} ${r.body} ${p.name}`.toLowerCase().includes(needle)) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === 'recent') return b.date.localeCompare(a.date);
        if (sort === 'high') return b.rating - a.rating || b.helpful - a.helpful;
        if (sort === 'low') return a.rating - b.rating || b.helpful - a.helpful;
        return b.helpful - a.helpful;
      });
  }, [reviews, cat, tag, minRating, q, sort]);

  const avg = list.length ? list.reduce((s, r) => s + r.rating, 0) / list.length : 0;
  const dist = [5, 4, 3, 2, 1].map((n) => ({ n, count: list.filter((r) => r.rating === n).length }));
  const tagOptions = allTags(PRODUCTS.filter((p) => !cat || p.category === cat));

  return (
    <>
      <h1>리뷰 모아보기</h1>
      <div className="reviews-layout">
        <aside className="card review-summary">
          <span className="muted small">{list.length}개 리뷰 평균</span>
          <strong className="stat-num">{avg ? avg.toFixed(1) : '-'}</strong>
          <Stars value={avg} size={20} />
          <ul className="dist">
            {dist.map(({ n, count }) => (
              <li key={n}>
                <button
                  type="button"
                  className={`link-btn ${minRating === n ? 'on' : ''}`}
                  onClick={() => set('min', minRating === n ? '' : String(n))}
                  title={`${n}점 이상만 보기`}
                >
                  {n}점
                </button>
                <span className="bar"><span style={{ width: list.length ? `${(count / list.length) * 100}%` : 0 }} /></span>
                <span className="small muted">{count}</span>
              </li>
            ))}
          </ul>
          {minRating > 0 && <span className="small muted">{minRating}점 이상만 보는 중</span>}
        </aside>

        <div>
          <div className="tabs" role="tablist" aria-label="카테고리">
            {(['', ...BUILD_STEPS] as const).map((c) => (
              <button
                key={c || 'all'}
                role="tab"
                aria-selected={cat === c}
                className={cat === c ? 'active' : ''}
                onClick={() => {
                  const next = new URLSearchParams(params);
                  if (c) next.set('cat', c);
                  else next.delete('cat');
                  next.delete('tag');
                  setParams(next, { replace: true });
                }}
              >
                {c ? CATEGORY_LABEL[c] : '전체'}
              </button>
            ))}
          </div>
          <div className="toolbar">
            <input type="search" placeholder="리뷰 내용 검색" value={q} onChange={(e) => set('q', e.target.value)} aria-label="리뷰 검색" />
            <select value={sort} onChange={(e) => set('sort', e.target.value)} aria-label="정렬">
              <option value="helpful">도움순</option>
              <option value="recent">최신순</option>
              <option value="high">별점 높은순</option>
              <option value="low">별점 낮은순</option>
            </select>
          </div>
          <div className="tag-row wrap">
            {tagOptions.map((t) => (
              <TagChip key={t} tag={t} active={tag === t} onClick={() => set('tag', tag === t ? '' : t)} />
            ))}
          </div>
          <div className="stack">
            {list.length ? list.map((r) => <ReviewItem key={r.id} review={r} showProduct />) : (
              <p className="empty">조건에 맞는 리뷰가 없어요.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
