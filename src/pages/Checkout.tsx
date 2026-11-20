import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProduct } from '../data/products';
import { cartSubtotal } from '../lib/cart';
import { newId, shippingFor, won } from '../lib/format';
import { useStore } from '../store/StoreContext';

export function Checkout() {
  const { cart, dispatch } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agree, setAgree] = useState(false);

  const subtotal = cartSubtotal(cart);
  const shipping = shippingFor(subtotal);

  if (!cart.length) {
    return <p className="empty">주문할 상품이 없어요. <Link to="/shop">쇼핑하러 가기</Link></p>;
  }

  const phoneOk = /^01[0-9]-?\d{3,4}-?\d{4}$/.test(phone.trim());

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!phoneOk) return;
    const id = newId('MK').toUpperCase();
    dispatch({
      type: 'order/place',
      order: {
        id, lines: cart, total: subtotal + shipping, shippingFee: shipping,
        name: name.trim(), phone: phone.trim(), address: address.trim(), createdAt: new Date().toISOString(),
      },
    });
    navigate(`/orders?placed=${id}`);
  };

  return (
    <div className="narrow">
      <h1>주문하기</h1>
      <div className="notice">이 사이트는 데모입니다. 주문 버튼을 눌러도 실제 결제나 배송은 이루어지지 않아요.</div>
      <form className="card form" onSubmit={submit}>
        <label className="field">받는 분<input value={name} onChange={(e) => setName(e.target.value)} required maxLength={20} autoComplete="name" /></label>
        <label className="field">
          연락처
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="010-1234-5678" inputMode="tel" autoComplete="tel" />
          {phone && !phoneOk && <span className="small error-text">휴대폰 번호 형식을 확인해 주세요.</span>}
        </label>
        <label className="field">주소<input value={address} onChange={(e) => setAddress(e.target.value)} required maxLength={120} autoComplete="street-address" /></label>

        <div className="order-lines small">
          {cart.map((l, i) => {
            const p = getProduct(l.productId);
            return p && (
              <div key={i} className="row between">
                <span>{p.name} × {l.quantity}</span>
                <span>{won(p.price * l.quantity)}</span>
              </div>
            );
          })}
          <div className="row between muted"><span>배송비</span><span>{shipping ? won(shipping) : '무료'}</span></div>
        </div>
        <div className="total-row"><span>결제 금액</span><strong className="price lg">{won(subtotal + shipping)}</strong></div>
        <label className="check"><input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} required /> 주문 내용을 확인했습니다</label>
        <button className="btn primary block" type="submit" disabled={!agree || !phoneOk}>{won(subtotal + shipping)} 주문하기</button>
      </form>
    </div>
  );
}
