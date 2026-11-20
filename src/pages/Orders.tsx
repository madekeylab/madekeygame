import { Link, useSearchParams } from 'react-router-dom';
import { getProduct } from '../data/products';
import { won } from '../lib/format';
import { useStore } from '../store/StoreContext';

export function Orders() {
  const { orders } = useStore();
  const [params] = useSearchParams();
  const placed = params.get('placed');

  return (
    <>
      <h1>주문 내역</h1>
      {placed && (
        <div className="notice ok">
          🎉 주문이 접수됐어요! 주문번호 <strong className="mono">{placed}</strong> (데모 주문이라 실제 배송은 없어요)
        </div>
      )}
      {!orders.length ? (
        <p className="empty">주문 내역이 없어요. <Link to="/shop">쇼핑하러 가기</Link></p>
      ) : (
        <div className="stack">
          {orders.map((o) => (
            <article key={o.id} className={`card ${o.id === placed ? 'selected' : ''}`}>
              <div className="row between wrap">
                <strong className="mono">{o.id}</strong>
                <span className="muted small">{new Date(o.createdAt).toLocaleString('ko-KR')}</span>
              </div>
              <ul className="small plain">
                {o.lines.map((l, i) => (
                  <li key={i}>
                    {l.buildName && <span className="badge">{l.buildName}</span>} {getProduct(l.productId)?.name ?? '판매 종료 상품'} × {l.quantity}
                  </li>
                ))}
              </ul>
              <div className="row between">
                <span className="small muted">{o.name} · {o.address}</span>
                <strong className="price">{won(o.total)}</strong>
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
}
