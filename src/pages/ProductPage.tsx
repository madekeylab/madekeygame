import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ProductThumb } from '../components/ProductThumb';
import { ReviewItem, StarInput, Stars, TagChip, ratingOf } from '../components/ui';
import { getProduct } from '../data/products';
import { CATEGORY_LABEL, LAYOUT_LABEL, type Product } from '../data/types';
import { newId, today, won } from '../lib/format';
import { useStore } from '../store/StoreContext';

const SWITCH_TYPE = { linear: '리니어', tactile: '택타일', clicky: '클리키' };

function specs(p: Product): [string, string][] {
  switch (p.category) {
    case 'case':
      return [['배열', LAYOUT_LABEL[p.layout]], ['소재', p.material], ['마운트', p.mount]];
    case 'pcb':
      return [
        ['배열', LAYOUT_LABEL[p.layout]],
        ['핫스왑', p.hotswap ? '지원' : '미지원 (납땜 필요)'],
        ['스위치 핀', p.fivePin ? '3핀 / 5핀' : '3핀 전용'],
        ['스태빌라이저', p.stabMount === 'pcb' ? 'PCB 마운트' : '판 마운트'],
        ['연결', p.wireless ? '유선 + 블루투스' : '유선'],
      ];
    case 'plate':
      return [['배열', LAYOUT_LABEL[p.layout]], ['소재', p.material]];
    case 'switch':
      return [['종류', SWITCH_TYPE[p.switchType]], ['핀', `${p.pins}핀`], ['입력압', `${p.force}g`]];
    case 'keycap':
      return [['프로파일', p.profile], ['지원 배열', p.layouts.map((l) => LAYOUT_LABEL[l]).join(', ')]];
    case 'stabilizer':
      return [['마운트', p.mount === 'pcb' ? 'PCB 마운트' : '판 마운트']];
  }
}

function ReviewForm({ productId }: { productId: string }) {
  const { dispatch } = useStore();
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'review/add',
      review: {
        id: newId('rv'), productId, rating, author: author.trim() || '익명',
        title: title.trim(), body: body.trim(), date: today(), helpful: 0, mine: true,
      },
    });
    setTitle('');
    setBody('');
    setDone(true);
  };

  return (
    <form className="card form" onSubmit={submit}>
      <strong>리뷰 쓰기</strong>
      <label>별점 <StarInput value={rating} onChange={setRating} /></label>
      <input placeholder="닉네임 (비우면 익명)" value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={20} />
      <input placeholder="한 줄 요약" value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={40} />
      <textarea placeholder="사용해 본 느낌을 알려주세요" value={body} onChange={(e) => setBody(e.target.value)} required rows={3} maxLength={500} />
      <div className="row between">
        <span className="small muted">{done ? '리뷰를 등록했습니다. 고마워요!' : '리뷰는 이 브라우저에 저장됩니다.'}</span>
        <button className="btn primary" type="submit">등록</button>
      </div>
    </form>
  );
}

export function ProductPage() {
  const { id } = useParams();
  // Keyed so quantity and form state reset when moving between products.
  return <ProductDetail key={id} id={id} />;
}

function ProductDetail({ id }: { id: string | undefined }) {
  const navigate = useNavigate();
  const { reviews, dispatch, draft } = useStore();
  const product = getProduct(id);
  const [qty, setQty] = useState(product?.category === 'switch' ? 70 : 1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <p className="empty">상품을 찾을 수 없어요. <Link to="/shop">쇼핑으로 돌아가기</Link></p>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const { avg, count } = ratingOf(product.id, reviews);
  const isSwitch = product.category === 'switch';

  const addToCart = () => {
    dispatch({ type: 'cart/add', lines: [{ productId: product.id, quantity: qty }] });
    setAdded(true);
  };

  const useInBuild = () => {
    dispatch({ type: 'draft/set', draft: { ...draft, parts: { ...draft.parts, [product.category]: product.id } } });
    navigate(`/builder?step=${product.category}`);
  };

  return (
    <>
      <nav className="small muted crumbs">
        <Link to="/shop">쇼핑</Link> › <Link to={`/shop?cat=${product.category}`}>{CATEGORY_LABEL[product.category]}</Link>
      </nav>
      <section className="product-detail">
        <ProductThumb product={product} size={280} />
        <div className="product-info">
          <h1>{product.name}</h1>
          {count > 0 && (
            <a href="#reviews" className="small"><Stars value={avg} /> {avg.toFixed(1)} · 리뷰 {count}개</a>
          )}
          <p className="price lg">
            {won(product.price)}{isSwitch && <span className="muted small"> / 1개</span>}
          </p>
          <p>{product.description}</p>
          <div className="tag-row wrap">{product.tags.map((t) => <TagChip key={t} tag={t} />)}</div>
          <table className="specs">
            <tbody>
              {specs(product).map(([k, v]) => (
                <tr key={k}><th>{k}</th><td>{v}</td></tr>
              ))}
              <tr><th>재고</th><td>{product.stock > 0 ? `${product.stock.toLocaleString()}개` : '품절'}</td></tr>
            </tbody>
          </table>
          <div className="buy-box">
            <label className="qty">
              수량
              <input
                type="number" min={1} max={product.stock} value={qty}
                onChange={(e) => setQty(Math.max(1, Math.min(product.stock, Number(e.target.value) || 1)))}
              />
            </label>
            <span className="price">{won(product.price * qty)}</span>
            <button className="btn primary" onClick={addToCart} disabled={product.stock === 0}>장바구니 담기</button>
            <button className="btn" onClick={useInBuild}>내 빌드에 넣기</button>
          </div>
          {added && <p className="small ok">장바구니에 담았어요. <Link to="/cart">장바구니 보기 →</Link></p>}
          {isSwitch && <p className="small muted">스위치는 키 개수만큼 필요해요. 65% 배열은 보통 68개입니다.</p>}
        </div>
      </section>

      <section id="reviews">
        <h2>리뷰 {count}개</h2>
        <div className="grid two">
          <div className="stack">
            {productReviews.length ? productReviews.map((r) => <ReviewItem key={r.id} review={r} />) : (
              <p className="empty">아직 리뷰가 없어요. 첫 리뷰를 남겨주세요!</p>
            )}
          </div>
          <ReviewForm productId={product.id} />
        </div>
      </section>
    </>
  );
}
