import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import ProductCard from "@/components/ProductCard";
import Styles from "@/components/Styles";
import { card } from "@/lib/cards";

export const metadata: Metadata = { title: "랭킹" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop", "ranking"]} />
      <Band />
      <main className="page shop-main">
        <header className="fl-head">
          <p className="eyebrow">Ranking</p>
          <h1>인기 랭킹</h1>
          <p className="fl-sub">최근 판매량 기준으로 가장 많이 고른 키보드 · 부품입니다.</p>
        </header>
        <section className="sec" aria-labelledby="sec-rank">
          <div className="sec-h">
            <div>
              <p className="eyebrow">Best Sellers</p>
              <h2 id="sec-rank">판매 상위 8</h2>
            </div>
            <Link className="sec-more" href="/category/all?sort=popular">
              전체보기 ›
            </Link>
          </div>
          <ol className="rk">
            <li>
              <Link className="rk-row" href="/product/33">
                <span className="rk-no">01</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/2026101089875bca4b90b3d8-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-name">수리·진단 접수</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>15,000</b>원
                </span>
              </Link>
            </li>
            <li>
              <Link className="rk-row" href="/product/32">
                <span className="rk-no">02</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/2026104de8bab633530c78a4-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-name">조립 대행 서비스</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>50,000</b>원
                </span>
              </Link>
            </li>
            <li>
              <Link className="rk-row" href="/product/31">
                <span className="rk-no">03</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/202610be719d8ea29ab517d3-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-name">스태빌 튜닝 서비스</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>20,000</b>원
                </span>
              </Link>
            </li>
            <li>
              <Link className="rk-row" href="/product/30">
                <span className="rk-no">04</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/2026102ebf630d6217d5285f-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-name">스위치 윤활 서비스</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>30,000</b>원
                </span>
              </Link>
            </li>
            <li>
              <Link className="rk-row" href="/product/29">
                <span className="rk-no">05</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/202610793da58b1bbaaf4c2b-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-maker">클랙 데스크</span>
                  <span className="rk-name">스위치 오프너·키캡 풀러 공구 세트</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>19,000</b>원
                </span>
              </Link>
            </li>
            <li>
              <Link className="rk-row" href="/product/28">
                <span className="rk-no">06</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/202610d2feb30ddf12f731a1-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-maker">클랙 데스크</span>
                  <span className="rk-name">데스크매트 900×400</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>29,000</b>원
                </span>
              </Link>
            </li>
            <li>
              <Link className="rk-row" href="/product/27">
                <span className="rk-no">07</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/202610bdee1cd57164baacde-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-maker">클랙 데스크</span>
                  <span className="rk-name">원목 손목받침 65%</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>45,000</b>원
                </span>
              </Link>
            </li>
            <li>
              <Link className="rk-row" href="/product/26">
                <span className="rk-no">08</span>
                <span className="rk-thumb">
                  <div className="fth is-square">
                    <img src="/uploads/2026/10/20261051c3b91bf2f280c839-main.webp" alt="" loading="lazy" decoding="async" fetchPriority="auto" />
                  </div>
                </span>
                <span className="rk-body">
                  <span className="rk-maker">클랙 데스크</span>
                  <span className="rk-name">코일 케이블 USB-C</span>
                  <span className="rk-spec">
                    <em className="rk-ship is-parcel">일반택배</em>
                  </span>
                </span>
                <span className="rk-price">
                  <b>39,000</b>원
                </span>
              </Link>
            </li>
          </ol>
        </section>
        <section className="sec">
          <div className="sec-h">
            <div>
              <p className="eyebrow">{"9 – "}20</p>
              <h2>다음 순위</h2>
            </div>
          </div>
          <div className="fl-grid" role="list">
            <ProductCard p={card(25)} />
            <ProductCard p={card(24)} />
            <ProductCard p={card(23)} />
            <ProductCard p={card(22)} />
            <ProductCard p={card(21)} />
            <ProductCard p={card(20)} />
            <ProductCard p={card(19)} />
            <ProductCard p={card(18)} />
            <ProductCard p={card(17)} />
            <ProductCard p={card(16)} />
            <ProductCard p={card(15)} />
            <ProductCard p={card(14)} />
          </div>
        </section>
      </main>
    </>
  );
}
