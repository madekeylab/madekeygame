import { Link } from 'react-router-dom';

export function NotFound() {
  return <p className="empty">페이지를 찾을 수 없어요. <Link to="/">홈으로</Link></p>;
}
