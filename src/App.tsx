import { useEffect } from 'react';
import { HashRouter, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './store/StoreContext';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductPage } from './pages/ProductPage';
import { Builder } from './pages/Builder';
import { SharedBuild } from './pages/SharedBuild';
import { MyBuilds } from './pages/MyBuilds';
import { Tester } from './pages/Tester';
import { ReviewsPage } from './pages/ReviewsPage';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Orders } from './pages/Orders';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Header() {
  const { cartCount } = useStore();
  const link = ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : '');
  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink to="/" className="logo" aria-label="메이드키 홈">
          <span className="logo-mark">⌨</span> 메이드키
        </NavLink>
        <nav className="main-nav" aria-label="주 메뉴">
          <NavLink to="/shop" className={link}>쇼핑</NavLink>
          <NavLink to="/builder" className={link}>키보드 조립</NavLink>
          <NavLink to="/tester" className={link}>키 테스트</NavLink>
          <NavLink to="/reviews" className={link}>리뷰</NavLink>
          <NavLink to="/builds" className={link}>내 빌드</NavLink>
        </nav>
        <NavLink to="/cart" className={({ isActive }) => `cart-link ${isActive ? 'active' : ''}`}>
          🛒 장바구니{cartCount > 0 && <span className="count">{cartCount}</span>}
        </NavLink>
      </div>
    </header>
  );
}

export function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Header />
      <main className="container main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/b" element={<SharedBuild />} />
          <Route path="/builds" element={<MyBuilds />} />
          <Route path="/tester" element={<Tester />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container small muted">
          © 메이드키 MadeKey · 데모 쇼핑몰입니다. 실제 결제와 배송은 이루어지지 않습니다.
        </div>
      </footer>
    </HashRouter>
  );
}
