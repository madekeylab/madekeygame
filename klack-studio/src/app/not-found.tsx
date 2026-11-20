import type { Metadata } from "next";
import Link from "next/link";
import Styles from "@/components/Styles";

export const metadata: Metadata = { title: "페이지를 찾을 수 없습니다" };

export default function NotFound() {
  return (
    <>
      <Styles names={["not-found"]} />
      <main className="page errp">
        <p className="eyebrow">404</p>
        <h1>페이지를 찾을 수 없습니다</h1>
        <p className="errp-sub">주소가 바뀌었거나 판매가 끝난 상품일 수 있습니다. 아래에서 다시 찾아보세요.</p>
        <form className="errp-search" action="/search" method="get" role="search">
          <input name="q" placeholder="상품명 · 제조사 · 소재 검색" aria-label="검색어" />
          <button type="submit" className="btn btn-primary">
            검색
          </button>
        </form>
        <ul className="errp-links">
          <li>
            <Link href="/">홈</Link>
          </li>
          <li>
            <Link href="/category/all">전체상품</Link>
          </li>
          <li>
            <Link href="/brands">제조사 · 시리즈</Link>
          </li>
          <li>
            <Link href="/order">주문 조회</Link>
          </li>
          <li>
            <Link href="/support">고객센터</Link>
          </li>
        </ul>
      </main>
    </>
  );
}
