import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductCard, TagChip, ratingOf } from '../components/ui';
import { PRODUCTS, allTags } from '../data/products';
import { BUILD_STEPS, CATEGORY_LABEL, type Category } from '../data/types';
import { useStore } from '../store/StoreContext';

type Sort = 'popular' | 'priceAsc' | 'priceDesc' | 'rating';

export function Shop() {
  const [params, setParams] = useSearchParams();
  const { reviews } = useStore();
  const category = (params.get('cat') ?? '') as Category | '';
  const tags = params.getAll('tag');
  const q = params.get('q') ?? '';
  const sort = (params.get('sort') ?? 'popular') as Sort;

  const update = (fn: (p: URLSearchParams) => void) => {
    const next = new URLSearchParams(params);
    fn(next);
    setParams(next, { replace: true });
  };

  const toggleTag = (t: string) =>
    update((p) => {
      const cur = p.getAll('tag');
      p.delete('tag');
      (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]).forEach((x) => p.append('tag', x));
    });

  const inCategory = PRODUCTS.filter((p) => !category || p.category === category);
  const tagOptions = allTags(inCategory);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = inCategory.filter(
      (p) =>
        tags.every((t) => p.tags.includes(t)) &&
        (!needle || p.name.toLowerCase().includes(needle) || p.tags.some((t) => t.includes(needle))),
    );
    const score = (id: string) => {
      const r = ratingOf(id, reviews);
      return { ...r, popular: r.count * 2 + r.avg };
    };
    return [...filtered].sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (sort === 'rating') return score(b.id).avg - score(a.id).avg;
      return score(b.id).popular - score(a.id).popular;
    });
  }, [inCategory, tags, q, sort, reviews]);

  return (
    <>
      <h1>부품 쇼핑</h1>
      <div className="tabs" role="tablist" aria-label="카테고리">
        {(['', ...BUILD_STEPS] as const).map((c) => (
          <button
            key={c || 'all'}
            role="tab"
            aria-selected={category === c}
            className={category === c ? 'active' : ''}
            onClick={() => update((p) => (c ? p.set('cat', c) : p.delete('cat')))}
          >
            {c ? CATEGORY_LABEL[c] : '전체'}
          </button>
        ))}
      </div>

      <div className="toolbar">
        <input
          type="search"
          placeholder="상품명·태그 검색"
          value={q}
          onChange={(e) => update((p) => (e.target.value ? p.set('q', e.target.value) : p.delete('q')))}
          aria-label="검색"
        />
        <select value={sort} onChange={(e) => update((p) => p.set('sort', e.target.value))} aria-label="정렬">
          <option value="popular">인기순</option>
          <option value="rating">평점순</option>
          <option value="priceAsc">낮은 가격순</option>
          <option value="priceDesc">높은 가격순</option>
        </select>
      </div>

      <div className="tag-row wrap" aria-label="태그 필터">
        {tagOptions.map((t) => (
          <TagChip key={t} tag={t} active={tags.includes(t)} onClick={() => toggleTag(t)} />
        ))}
        {tags.filter((t) => !tagOptions.includes(t)).map((t) => (
          <TagChip key={t} tag={t} active onClick={() => toggleTag(t)} />
        ))}
        {tags.length > 0 && (
          <button className="link-btn small" onClick={() => update((p) => p.delete('tag'))}>태그 초기화</button>
        )}
      </div>

      <p className="muted small">{list.length}개 상품</p>
      {list.length ? (
        <div className="grid products">
          {list.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <p className="empty">조건에 맞는 상품이 없어요. 태그를 줄여 보세요.</p>
      )}
    </>
  );
}
