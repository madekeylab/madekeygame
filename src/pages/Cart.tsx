import { Link } from 'react-router-dom';
import { ProductThumb } from '../components/ProductThumb';
import { getProduct } from '../data/products';
import { CATEGORY_LABEL } from '../data/types';
import { cartSubtotal } from '../lib/cart';
import { FREE_SHIPPING_FROM, shippingFor, won } from '../lib/format';
import { useStore } from '../store/StoreContext';

export function Cart() {
  const { cart, dispatch } = useStore();
  const subtotal = cartSubtotal(cart);
  const shipping = shippingFor(subtotal);

  if (!cart.length) {
    return (
      <>
        <h1>장바구니</h1>
        <p className="empty">장바구니가 비었어요. <Link to="/builder">키보드를 조립</Link>하거나 <Link to="/shop">부품을 둘러보세요</Link>.</p>
      </>
    );
  }

  // Group lines added from the same build under one heading.
  const groups = new Map<string, number[]>();
  cart.forEach((l, i) => {
    const g = l.buildName ? `🧩 빌드: ${l.buildName}` : '개별 상품';
    groups.set(g, [...(groups.get(g) ?? []), i]);
  });

  return (
    <>
      <h1>장바구니</h1>
      <div className="cart-layout">
        <div className="stack">
          {[...groups.entries()].map(([title, idx]) => (
            <section key={title} className="card">
              <strong>{title}</strong>
              <ul className="cart-lines">
                {idx.map((i) => {
                  const l = cart[i];
                  const p = getProduct(l.productId);
                  if (!p) return null;
                  return (
                    <li key={i}>
                      <ProductThumb product={p} size={56} />
                      <div className="cart-line-body">
                        <span className="muted small">{CATEGORY_LABEL[p.category]}</span>
                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                        <span className="small muted">{won(p.price)} × {l.quantity}</span>
                      </div>
                      <input
                        type="number" min={1} max={p.stock} value={l.quantity}
                        aria-label={`${p.name} 수량`}
                        onChange={(e) => dispatch({ type: 'cart/setQty', index: i, quantity: Math.min(p.stock, Number(e.target.value) || 1) })}
                      />
                      <strong className="price">{won(p.price * l.quantity)}</strong>
                      <button className="link-btn" onClick={() => dispatch({ type: 'cart/remove', index: i })} aria-label={`${p.name} 삭제`}>✕</button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
        <aside className="card order-summary">
          <div className="row between"><span>상품 금액</span><span>{won(subtotal)}</span></div>
          <div className="row between"><span>배송비</span><span>{shipping ? won(shipping) : '무료'}</span></div>
          {shipping > 0 && <p className="small muted">{won(FREE_SHIPPING_FROM - subtotal)} 더 담으면 무료 배송</p>}
          <div className="total-row"><span>결제 예정</span><strong className="price lg">{won(subtotal + shipping)}</strong></div>
          <Link to="/checkout" className="btn primary block">주문하기</Link>
        </aside>
      </div>
    </>
  );
}
