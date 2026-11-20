import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "브랜드",
  description: "클랙스튜디오가 다루는 스위치 · 키캡 · 하우징 제조사와 시리즈 — 원산지 · 제작 기간과 상품 수를 한자리에서 확인하세요.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop", "brand-brands", "brand-brands-category"]} />
      <Band />
      <main className="page shop-main">
        <nav className="bd-crumb" aria-label="경로">
          <Link aria-label="홈" href="/">
            <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
              <path
                d="M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <span aria-hidden="true">›</span>
          <Link href="/category/all">전체상품</Link>
          <span aria-hidden="true">›</span>
          <b>브랜드</b>
        </nav>
        <header className="bd-head">
          <p className="eyebrow">{"Makers & Series"}</p>
          <h1 className="bd-title">브랜드</h1>
          <p className="mk-h-desc">
            클랙스튜디오가 다루는 부품의 제조사 6곳 · 시리즈 0개 · 상품 22개를 모았습니다. 카드를 누르면 그곳에서 만든 상품만 모아 봅니다.
          </p>
        </header>
        <div className="mk-dir">
          <section className="mk-sec" aria-labelledby="mk-maker-t">
            <div className="mk-h">
              <p className="eyebrow">Makers</p>
              <h2 id="mk-maker-t" className="mk-h2">
                {"제조사 "}6곳
              </h2>
              <p className="mk-h-desc">스위치 · 키캡 · 하우징은 만든 곳에 따라 소재와 공차가 다릅니다. 원산지와 제작 기간을 함께 확인하세요.</p>
            </div>
            <ul className="mk-grid">
              <li className="mk-item">
                <Link className="mk-card" title="클랙 빌트 제조사 상품 보기" href="/brand/klack-built">
                  <div className="mk-shot">
                    <div className="fth is-wide">
                      <div className="fth-ph is-t0" role="img" aria-label="클랙 빌트 사진 준비 중">
                        <svg className="v2-kc fth-ph-kb" viewBox="0 0 100 108" aria-hidden="true">
                          <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                          <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                          <g className="v2-kc-top">
                            <rect x="13" y="7" width="74" height="70" rx="15" />
                            <text className="v2-kc-leg" x="24" y="52">
                              클
                            </text>
                          </g>
                        </svg>
                        <small aria-hidden="true">사진 준비 중</small>
                      </div>
                    </div>
                  </div>
                  <div className="mk-body">
                    <span className="mk-name">
                      클랙 빌트<em className="mk-badge">자사</em>
                    </span>
                    <span className="mk-en">KLACK BUILT</span>
                    <span className="mk-facts">자사 제조 · 품질보증 1년(12개월) · 재고 출고</span>
                    <span className="mk-cnt">4개 상품</span>
                  </div>
                </Link>
              </li>
              <li className="mk-item">
                <Link className="mk-card" title="클랙 키트 제조사 상품 보기" href="/brand/klack-kit">
                  <div className="mk-shot">
                    <div className="fth is-wide">
                      <div className="fth-ph is-t2" role="img" aria-label="클랙 키트 사진 준비 중">
                        <svg className="v2-kc fth-ph-kb" viewBox="0 0 100 108" aria-hidden="true">
                          <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                          <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                          <g className="v2-kc-top">
                            <rect x="13" y="7" width="74" height="70" rx="15" />
                            <text className="v2-kc-leg" x="24" y="52">
                              클
                            </text>
                          </g>
                        </svg>
                        <small aria-hidden="true">사진 준비 중</small>
                      </div>
                    </div>
                  </div>
                  <div className="mk-body">
                    <span className="mk-name">
                      클랙 키트<em className="mk-badge">자사</em>
                    </span>
                    <span className="mk-en">KLACK KIT</span>
                    <span className="mk-facts">자사 제조 · 품질보증 1년(12개월) · 재고 출고</span>
                    <span className="mk-cnt">3개 상품</span>
                  </div>
                </Link>
              </li>
              <li className="mk-item">
                <Link className="mk-card" title="클랙 스위치 제조사 상품 보기" href="/brand/klack-switch">
                  <div className="mk-shot">
                    <div className="fth is-wide">
                      <div className="fth-ph is-t3" role="img" aria-label="클랙 스위치 사진 준비 중">
                        <svg className="v2-kc fth-ph-kb" viewBox="0 0 100 108" aria-hidden="true">
                          <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                          <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                          <g className="v2-kc-top">
                            <rect x="13" y="7" width="74" height="70" rx="15" />
                            <text className="v2-kc-leg" x="24" y="52">
                              클
                            </text>
                          </g>
                        </svg>
                        <small aria-hidden="true">사진 준비 중</small>
                      </div>
                    </div>
                  </div>
                  <div className="mk-body">
                    <span className="mk-name">
                      클랙 스위치<em className="mk-badge">자사</em>
                    </span>
                    <span className="mk-en">KLACK SWITCH</span>
                    <span className="mk-facts">자사 제조 · 품질보증 1년(12개월) · 재고 출고</span>
                    <span className="mk-cnt">4개 상품</span>
                  </div>
                </Link>
              </li>
              <li className="mk-item">
                <Link className="mk-card" title="클랙 캡스 제조사 상품 보기" href="/brand/klack-caps">
                  <div className="mk-shot">
                    <div className="fth is-wide">
                      <div className="fth-ph is-t1" role="img" aria-label="클랙 캡스 사진 준비 중">
                        <svg className="v2-kc fth-ph-kb" viewBox="0 0 100 108" aria-hidden="true">
                          <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                          <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                          <g className="v2-kc-top">
                            <rect x="13" y="7" width="74" height="70" rx="15" />
                            <text className="v2-kc-leg" x="24" y="52">
                              클
                            </text>
                          </g>
                        </svg>
                        <small aria-hidden="true">사진 준비 중</small>
                      </div>
                    </div>
                  </div>
                  <div className="mk-body">
                    <span className="mk-name">
                      클랙 캡스<em className="mk-badge">자사</em>
                    </span>
                    <span className="mk-en">KLACK CAPS</span>
                    <span className="mk-facts">자사 제조 · 품질보증 1년(12개월) · 재고 출고</span>
                    <span className="mk-cnt">3개 상품</span>
                  </div>
                </Link>
              </li>
              <li className="mk-item">
                <Link className="mk-card" title="클랙 파츠 제조사 상품 보기" href="/brand/klack-parts">
                  <div className="mk-shot">
                    <div className="fth is-wide">
                      <div className="fth-ph is-t0" role="img" aria-label="클랙 파츠 사진 준비 중">
                        <svg className="v2-kc fth-ph-kb" viewBox="0 0 100 108" aria-hidden="true">
                          <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                          <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                          <g className="v2-kc-top">
                            <rect x="13" y="7" width="74" height="70" rx="15" />
                            <text className="v2-kc-leg" x="24" y="52">
                              클
                            </text>
                          </g>
                        </svg>
                        <small aria-hidden="true">사진 준비 중</small>
                      </div>
                    </div>
                  </div>
                  <div className="mk-body">
                    <span className="mk-name">
                      클랙 파츠<em className="mk-badge">자사</em>
                    </span>
                    <span className="mk-en">KLACK PARTS</span>
                    <span className="mk-facts">자사 제조 · 품질보증 1년(12개월) · 재고 출고</span>
                    <span className="mk-cnt">4개 상품</span>
                  </div>
                </Link>
              </li>
              <li className="mk-item">
                <Link className="mk-card" title="클랙 데스크 제조사 상품 보기" href="/brand/klack-desk">
                  <div className="mk-shot">
                    <div className="fth is-wide">
                      <div className="fth-ph is-t0" role="img" aria-label="클랙 데스크 사진 준비 중">
                        <svg className="v2-kc fth-ph-kb" viewBox="0 0 100 108" aria-hidden="true">
                          <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                          <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                          <g className="v2-kc-top">
                            <rect x="13" y="7" width="74" height="70" rx="15" />
                            <text className="v2-kc-leg" x="24" y="52">
                              클
                            </text>
                          </g>
                        </svg>
                        <small aria-hidden="true">사진 준비 중</small>
                      </div>
                    </div>
                  </div>
                  <div className="mk-body">
                    <span className="mk-name">
                      클랙 데스크<em className="mk-badge">자사</em>
                    </span>
                    <span className="mk-en">KLACK DESK</span>
                    <span className="mk-facts">자사 제조 · 품질보증 1년(12개월) · 재고 출고</span>
                    <span className="mk-cnt">4개 상품</span>
                  </div>
                </Link>
              </li>
            </ul>
          </section>
          <section className="mk-sec" aria-labelledby="mk-series-t">
            <div className="mk-h">
              <p className="eyebrow">Series</p>
              <h2 id="mk-series-t" className="mk-h2">
                {"시리즈 "}0개
              </h2>
              <p className="mk-h-desc">하우징 · 보강판 · 키캡을 같은 색과 소재로 맞출 때는 시리즈로 고르는 편이 빠릅니다.</p>
            </div>
            <p className="mk-empty">등록된 시리즈가 아직 없습니다.</p>
          </section>
        </div>
      </main>
      <Tail />
    </>
  );
}
