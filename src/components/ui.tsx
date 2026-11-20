import { Link } from 'react-router-dom';
import { getProduct } from '../data/products';
import { CATEGORY_LABEL, type Product, type Review } from '../data/types';
import { won } from '../lib/format';
import { useStore } from '../store/StoreContext';
import { ProductThumb } from './ProductThumb';

export function Stars({ value, size = 14 }: { value: number; size?: number }) {
  const full = Math.round(value);
  return (
    <span className="stars" style={{ fontSize: size }} aria-label={`별점 ${value.toFixed(1)}점`}>
      {'★'.repeat(full)}
      <span className="stars-off">{'★'.repeat(5 - full)}</span>
    </span>
  );
}

export function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <span className="star-input" role="radiogroup" aria-label="별점">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n}점`}
          className={n <= value ? 'on' : ''}
          onClick={() => onChange(n)}
        >
          ★
        </button>
      ))}
    </span>
  );
}

export function TagChip({ tag, active, onClick }: { tag: string; active?: boolean; onClick?: () => void }) {
  if (onClick) {
    return (
      <button type="button" className={`tag ${active ? 'active' : ''}`} onClick={onClick} aria-pressed={!!active}>
        #{tag}
      </button>
    );
  }
  return <Link className="tag" to={`/shop?tag=${encodeURIComponent(tag)}`}>#{tag}</Link>;
}

export function ratingOf(productId: string, reviews: Review[]) {
  const rs = reviews.filter((r) => r.productId === productId);
  const avg = rs.length ? rs.reduce((s, r) => s + r.rating, 0) / rs.length : 0;
  return { avg, count: rs.length };
}

export function ProductCard({ product }: { product: Product }) {
  const { reviews } = useStore();
  const { avg, count } = ratingOf(product.id, reviews);
  return (
    <Link to={`/product/${product.id}`} className="card product-card">
      <ProductThumb product={product} size={96} />
      <div className="product-card-body">
        <span className="muted small">{CATEGORY_LABEL[product.category]}</span>
        <strong className="product-name">{product.name}</strong>
        <span className="price">
          {won(product.price)}
          {product.category === 'switch' && <span className="muted small"> / 1개</span>}
        </span>
        {count > 0 && (
          <span className="small">
            <Stars value={avg} /> <span className="muted">{avg.toFixed(1)} ({count})</span>
          </span>
        )}
        <span className="tag-row">
          {product.tags.slice(0, 3).map((t) => (
            <span key={t} className="tag static">#{t}</span>
          ))}
        </span>
      </div>
    </Link>
  );
}

export function ReviewItem({ review, showProduct }: { review: Review; showProduct?: boolean }) {
  const { helpfulVotes, dispatch } = useStore();
  const product = getProduct(review.productId);
  const voted = helpfulVotes.includes(review.id);
  return (
    <article className="review">
      <header className="review-head">
        <Stars value={review.rating} />
        <strong>{review.title}</strong>
        {review.mine && <span className="badge">내 리뷰</span>}
      </header>
      {showProduct && product && (
        <Link to={`/product/${product.id}`} className="small review-product">
          {CATEGORY_LABEL[product.category]} · {product.name}
        </Link>
      )}
      <p>{review.body}</p>
      <footer className="review-foot small muted">
        <span>{review.author} · {review.date}</span>
        <button
          type="button"
          className={`link-btn ${voted ? 'on' : ''}`}
          onClick={() => dispatch({ type: 'review/helpful', id: review.id })}
          aria-pressed={voted}
        >
          👍 도움돼요 {review.helpful}
        </button>
      </footer>
    </article>
  );
}

export function IssueList({ issues }: { issues: { level: 'error' | 'warning'; message: string }[] }) {
  if (!issues.length) return null;
  return (
    <ul className="issues">
      {issues.map((i, n) => (
        <li key={n} className={i.level}>
          {i.level === 'error' ? '⛔ 호환 불가: ' : '⚠️ 주의: '}
          {i.message}
        </li>
      ))}
    </ul>
  );
}
