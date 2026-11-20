import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Styles from "@/components/Styles";
import { card } from "@/lib/cards";
import Hero from "@/components/home/Hero";
import Colorway from "@/components/home/Colorway";
import BestTabs from "@/components/home/BestTabs";

// '이번 주 베스트'에 올릴 상품 id — 탭을 누르면 이 안에서 카테고리별로 거른다
const BEST = [8, 12, 15, 19, 22, 26, 9, 13, 16, 20, 23, 27, 10, 14, 17, 21, 24, 28, 11, 18, 25, 29];
const BEST_TABS = [
  { slug: "custom-built", label: "완성형" },
  { slug: "kit", label: "키트" },
  { slug: "switch", label: "스위치" },
  { slug: "keycap", label: "키캡" },
  { slug: "parts", label: "부품" },
  { slug: "accessory", label: "액세서리" },
];

export default function Page() {
  return (
    <>
      <Styles names={["shop", "shop-3", "shop-6", "shop-4", "home-switch-lab-workshop", "home"]} />
      <main className="sh-home v2-home">
        <Hero />
        <Colorway />
        <div className="page">
          <div className="sh-promos">
            <Link className="sh-promo is-a" href="/category/custom-built">
              <small>주문 제작</small>
              <b>옵션을 골라 나만의 한 대</b>
              <span>완성형 보기 →</span>
            </Link>
            <Link className="sh-promo is-b" href="/inspection">
              <small>타건 검수</small>
              <b>출고 전 전 키 입력 확인</b>
              <span>검수 안내 →</span>
            </Link>
            <Link className="sh-promo is-c" href="/category/service">
              <small>공방 서비스</small>
              <b>윤활 · 튜닝 · 수리 · 조립 대행</b>
              <span>서비스 접수 →</span>
            </Link>
          </div>
          <section className="sh-sec" aria-labelledby="sh-cat">
            <header className="sh-head">
              <div>
                <p className="sh-label">CATEGORY</p>
                <h2 id="sh-cat">카테고리</h2>
              </div>
              <Link className="sh-more" href="/category/all">
                전체상품<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <ul className="sh-cats">
              <li>
                <Link href="/category/custom-built">
                  <span className="sh-cat-img">
                    <img src="/uploads/2026/10/2026107b8396ed1c13a707fe-main.webp" alt="" width="160" height="160" loading="lazy" />
                  </span>
                  <b>완성형</b>
                </Link>
              </li>
              <li>
                <Link href="/category/kit">
                  <span className="sh-cat-img">
                    <img src="/uploads/2026/10/2026108b45627b6388306673-main.webp" alt="" width="160" height="160" loading="lazy" />
                  </span>
                  <b>키트</b>
                </Link>
              </li>
              <li>
                <Link href="/category/switch">
                  <span className="sh-cat-img">
                    <img src="/uploads/2026/10/202610b6bee8bba919d94d3d-main.webp" alt="" width="160" height="160" loading="lazy" />
                  </span>
                  <b>스위치</b>
                </Link>
              </li>
              <li>
                <Link href="/category/keycap">
                  <span className="sh-cat-img">
                    <img src="/uploads/2026/10/202610e908b68161332ab438-main.webp" alt="" width="160" height="160" loading="lazy" />
                  </span>
                  <b>키캡</b>
                </Link>
              </li>
              <li>
                <Link href="/category/parts">
                  <span className="sh-cat-img">
                    <img src="/uploads/2026/10/2026108510f6299de4334274-main.webp" alt="" width="160" height="160" loading="lazy" />
                  </span>
                  <b>부품</b>
                </Link>
              </li>
              <li>
                <Link href="/category/accessory">
                  <span className="sh-cat-img">
                    <img src="/uploads/2026/10/20261051c3b91bf2f280c839-main.webp" alt="" width="160" height="160" loading="lazy" />
                  </span>
                  <b>액세서리</b>
                </Link>
              </li>
              <li>
                <Link href="/category/service">
                  <span className="sh-cat-img">
                    <img src="/uploads/2026/10/2026102ebf630d6217d5285f-main.webp" alt="" width="160" height="160" loading="lazy" />
                  </span>
                  <b>공방 서비스</b>
                </Link>
              </li>
            </ul>
          </section>
          <section className="sh-sec" aria-labelledby="sh-brand">
            <header className="sh-head">
              <div>
                <p className="sh-label">BRAND</p>
                <h2 id="sh-brand">브랜드관</h2>
              </div>
              <Link className="sh-more" href="/brands">
                브랜드 전체<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <ul className="sh-brands">
              <li>
                <Link href="/brand/klack-built">
                  <b>KLACK BUILT</b>
                  <span>클랙 빌트{" · "}4개</span>
                </Link>
              </li>
              <li>
                <Link href="/brand/klack-kit">
                  <b>KLACK KIT</b>
                  <span>클랙 키트{" · "}3개</span>
                </Link>
              </li>
              <li>
                <Link href="/brand/klack-switch">
                  <b>KLACK SWITCH</b>
                  <span>클랙 스위치{" · "}4개</span>
                </Link>
              </li>
              <li>
                <Link href="/brand/klack-caps">
                  <b>KLACK CAPS</b>
                  <span>클랙 캡스{" · "}3개</span>
                </Link>
              </li>
              <li>
                <Link href="/brand/klack-parts">
                  <b>KLACK PARTS</b>
                  <span>클랙 파츠{" · "}4개</span>
                </Link>
              </li>
              <li>
                <Link href="/brand/klack-desk">
                  <b>KLACK DESK</b>
                  <span>클랙 데스크{" · "}4개</span>
                </Link>
              </li>
            </ul>
          </section>
          <section className="sh-sec" aria-labelledby="sh-best">
            <header className="sh-head">
              <div>
                <p className="sh-label">BEST</p>
                <h2 id="sh-best">이번 주 베스트</h2>
                <p className="sh-sub">카테고리별 대표 상품을 먼저 모았습니다.</p>
              </div>
              <Link className="sh-more" href="/ranking">
                전체보기<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <BestTabs items={BEST.map(card)} tabs={BEST_TABS} />
          </section>
          <section className="sh-sec" aria-labelledby="sh-md">
            <header className="sh-head">
              <div>
                <p className="sh-label">RECOMMENDED</p>
                <h2 id="sh-md">MD 추천</h2>
                <p className="sh-sub">공방 담당자가 함께 살펴보기 좋은 상품으로 골랐습니다.</p>
              </div>
              <Link className="sh-more" href="/category/all">
                전체보기<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <div className="fl-grid" role="list">
              <ProductCard p={card(9)} />
              <ProductCard p={card(13)} />
              <ProductCard p={card(16)} />
              <ProductCard p={card(20)} />
            </div>
          </section>
          <section className="sh-sec" aria-labelledby="sh-new">
            <header className="sh-head">
              <div>
                <p className="sh-label">NEW ARRIVALS</p>
                <h2 id="sh-new">신상품</h2>
                <p className="sh-sub">최근 등록된 상품입니다.</p>
              </div>
              <Link className="sh-more" href="/category/all?sort=new">
                전체보기<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <div className="fl-grid" role="list">
              <ProductCard p={card(8)} />
              <ProductCard p={card(9)} />
              <ProductCard p={card(10)} />
              <ProductCard p={card(11)} />
              <ProductCard p={card(12)} />
              <ProductCard p={card(13)} />
              <ProductCard p={card(14)} />
              <ProductCard p={card(15)} />
            </div>
          </section>
          <section className="sh-sec" aria-labelledby="sh-hot">
            <header className="sh-head">
              <div>
                <p className="sh-label">TRENDING</p>
                <h2 id="sh-hot">지금 인기</h2>
                <p className="sh-sub">스위치 · 키캡 · 부품 · 액세서리에서 골랐습니다.</p>
              </div>
              <Link className="sh-more" href="/ranking">
                전체보기<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <ol className="sh-rank">
              <li>
                <Link href="/product/16">
                  <img src="/uploads/2026/10/2026105e2cec96ef303d1d63-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>마블 택타일 스위치 62g</span>
                  <b>45,000원</b>
                </Link>
              </li>
              <li>
                <Link href="/product/20">
                  <img src="/uploads/2026/10/202610a57379599909812624-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>PBT 염료승화 키캡 — 시그널 오렌지</span>
                  <b>79,000원</b>
                </Link>
              </li>
              <li>
                <Link href="/product/23">
                  <img src="/uploads/2026/10/20261021f2788d2357b0131f-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>75% 폴리카보네이트 보강판</span>
                  <b>29,000원</b>
                </Link>
              </li>
              <li>
                <Link href="/product/27">
                  <img src="/uploads/2026/10/202610bdee1cd57164baacde-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>원목 손목받침 65%</span>
                  <b>45,000원</b>
                </Link>
              </li>
              <li>
                <Link href="/product/17">
                  <img src="/uploads/2026/10/202610da213a330796423564-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>클리어 클릭 스위치 55g</span>
                  <b>35,000원</b>
                </Link>
              </li>
              <li>
                <Link href="/product/21">
                  <img src="/uploads/2026/10/2026101f8e5795430d6f1e80-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>레트로 베이지 키캡</span>
                  <b>85,000원</b>
                </Link>
              </li>
              <li>
                <Link href="/product/24">
                  <img src="/uploads/2026/10/2026107662456cf47ea8ec2c-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>스크류인 스태빌라이저 세트</span>
                  <b>25,000원</b>
                </Link>
              </li>
              <li>
                <Link href="/product/28">
                  <img src="/uploads/2026/10/202610d2feb30ddf12f731a1-main.webp" alt="" width="64" height="64" loading="lazy" />
                  <span>데스크매트 900×400</span>
                  <b>29,000원</b>
                </Link>
              </li>
            </ol>
          </section>
        </div>
        <section className="sh-sale" aria-labelledby="sh-sale">
          <div className="page">
            <header className="sh-head">
              <div>
                <p className="sh-label">SPECIAL PRICE</p>
                <h2 id="sh-sale">특가</h2>
                <p className="sh-sub">할인율이 높은 순서입니다.</p>
              </div>
              <Link className="sh-more" href="/category/all?sort=discount">
                전체보기<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <div className="fl-grid" role="list">
              <ProductCard p={card(29)} />
              <ProductCard p={card(28)} />
              <ProductCard p={card(23)} />
              <ProductCard p={card(22)} />
              <ProductCard p={card(17)} />
              <ProductCard p={card(25)} />
              <ProductCard p={card(12)} />
              <ProductCard p={card(24)} />
            </div>
          </div>
        </section>
        <div className="page" />
      </main>
    </>
  );
}
