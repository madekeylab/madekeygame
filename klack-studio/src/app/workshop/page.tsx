import type { Metadata } from "next";
import Link from "next/link";
import Styles from "@/components/Styles";

export const metadata: Metadata = { title: "공방 이야기", description: "한 대의 커스텀 키보드가 구성 · 윤활 · 조립 · 타건 검수를 거쳐 만들어지는 과정" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-4", "home-switch-lab-workshop"]} />
      <main className="v2-home">
        <h1 className="sr-only">공방 이야기</h1>
        <div className="page">
          <section className="sec v2-sec v2-process" data-v2-process="" aria-labelledby="v2-process-t">
            <header className="v2-head" data-reveal="" data-shown="">
              <div className="v2-head-main">
                <p className="v2-pill is-cw1">HOW IT'S MADE</p>
                <h2 id="v2-process-t">한 대가 만들어지는 네 번의 누름</h2>
                <p className="v2-head-sub">주문이 들어오면 네 단계를 차례로 지납니다. 단계를 건너뛰지 않습니다.</p>
              </div>
              <Link className="v2-key is-white" href="/guide">
                제작 가이드<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <ol className="v2-steps" data-reveal="" data-shown="">
              <li className="v2-step is-cw1">
                <svg className="v2-kc v2-step-cap" viewBox="0 0 100 108" aria-hidden="true">
                  <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                  <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                  <g className="v2-kc-top">
                    <rect x="13" y="7" width="74" height="70" rx="15" />
                    <text className="v2-kc-leg" x="24" y="52">
                      1
                    </text>
                  </g>
                </svg>
                <h3>구성 선택</h3>
                <p>하우징 · 보강판 · 스위치 · 키캡을 단계별로 고릅니다. 고른 조합은 주문서에 그대로 실립니다.</p>
              </li>
              <li className="v2-step is-cw2">
                <svg className="v2-kc v2-step-cap" viewBox="0 0 100 108" aria-hidden="true">
                  <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                  <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                  <g className="v2-kc-top">
                    <rect x="13" y="7" width="74" height="70" rx="15" />
                    <text className="v2-kc-leg" x="24" y="52">
                      2
                    </text>
                  </g>
                </svg>
                <h3>윤활 · 튜닝</h3>
                <p>스위치를 하나씩 열어 윤활하고, 스태빌라이저 잡소리를 잡습니다.</p>
              </li>
              <li className="v2-step is-cw3">
                <svg className="v2-kc v2-step-cap" viewBox="0 0 100 108" aria-hidden="true">
                  <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                  <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                  <g className="v2-kc-top">
                    <rect x="13" y="7" width="74" height="70" rx="15" />
                    <text className="v2-kc-leg" x="24" y="52">
                      3
                    </text>
                  </g>
                </svg>
                <h3>조립</h3>
                <p>보강판 · PCB · 폼을 맞추고 스위치를 끼워 한 대로 조립합니다.</p>
              </li>
              <li className="v2-step is-cw4">
                <svg className="v2-kc v2-step-cap" viewBox="0 0 100 108" aria-hidden="true">
                  <rect className="v2-kc-shadow" x="4" y="12" width="92" height="94" rx="22" />
                  <rect className="v2-kc-side" x="2" y="2" width="96" height="98" rx="22" />
                  <g className="v2-kc-top">
                    <rect x="13" y="7" width="74" height="70" rx="15" />
                    <text className="v2-kc-leg" x="24" y="52">
                      4
                    </text>
                  </g>
                </svg>
                <h3>타건 검수</h3>
                <p>전 키 입력을 확인하고 타건음을 들어 본 뒤 포장합니다. 검수 영상은 영상관에 공개합니다.</p>
              </li>
            </ol>
          </section>
          <section className="sec v2-sec v2-cats" data-v2-categories="" aria-labelledby="v2-cats-t">
            <header className="v2-head" data-reveal="" data-shown="">
              <div className="v2-head-main">
                <p className="v2-pill is-cw2">SHOP BY PART</p>
                <h2 id="v2-cats-t">부품 하나씩 골라 담기</h2>
              </div>
              <Link className="v2-key is-white" href="/category/all">
                전체상품<span aria-hidden="true">{" →"}</span>
              </Link>
            </header>
            <ul className="v2-cat-grid" data-reveal="">
              <li>
                <Link className="v2-cat is-cw1" href="/category/custom-built">
                  <svg viewBox="0 0 24 24" className="v2-cat-ico" aria-hidden="true">
                    <rect x="2.5" y="7" width="19" height="10" rx="1" />
                    <path d="M5.5 10h1M8.5 10h1M11.5 10h1M14.5 10h1M17.5 10h1M7 14h10" />
                  </svg>
                  <b className="v2-cat-name">완성형 커스텀</b>
                  <span className="v2-cat-desc">공방이 조립·윤활·타건 검수까지 끝내 보내는 키보드</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link className="v2-cat is-cw2" href="/category/kit">
                  <svg viewBox="0 0 24 24" className="v2-cat-ico" aria-hidden="true">
                    <path d="M3 10h18l-1.6 7H4.6z" />
                    <path d="M5 10V8h14v2" />
                    <path d="M7 13.5h10" />
                  </svg>
                  <b className="v2-cat-name">베어본 · 하우징 키트</b>
                  <span className="v2-cat-desc">하우징 + PCB + 보강판, 스위치·키캡은 따로 고르는 키트</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link className="v2-cat is-cw3" href="/category/switch">
                  <svg viewBox="0 0 24 24" className="v2-cat-ico" aria-hidden="true">
                    <rect x="5" y="5" width="14" height="14" rx="1" />
                    <rect x="8" y="8" width="8" height="8" />
                    <path d="M12 10v4M10 12h4" />
                  </svg>
                  <b className="v2-cat-name">스위치</b>
                  <span className="v2-cat-desc">리니어 · 택타일 · 클릭, 개수 단위로 담는 스위치</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link className="v2-cat is-cw4" href="/category/keycap">
                  <svg viewBox="0 0 24 24" className="v2-cat-ico" aria-hidden="true">
                    <path d="M4.5 18.5 6.6 6h10.8l2.1 12.5z" />
                    <path d="M8.6 8.5h6.8l.9 6.5H7.7z" />
                  </svg>
                  <b className="v2-cat-name">키캡</b>
                  <span className="v2-cat-desc">체리 · OEM · XDA · MDA 프로파일, PBT · ABS 키캡</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link className="v2-cat is-cw5" href="/category/parts">
                  <svg viewBox="0 0 24 24" className="v2-cat-ico" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="1" />
                    <circle cx="8" cy="10" r="1.4" />
                    <circle cx="16" cy="14" r="1.4" />
                    <path d="M9.4 10H13v4h1.6M6 15h4" />
                  </svg>
                  <b className="v2-cat-name">보강판 · PCB · 스태빌</b>
                  <span className="v2-cat-desc">교체 · 업그레이드용 부품</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link className="v2-cat is-ink" href="/category/accessory">
                  <svg viewBox="0 0 24 24" className="v2-cat-ico" aria-hidden="true">
                    <path d="M5 19c0-5 3-6 6-6s6-1 6-6" />
                    <rect x="15" y="3" width="4" height="4.5" />
                    <path d="M3.5 19h3" />
                  </svg>
                  <b className="v2-cat-name">액세서리</b>
                  <span className="v2-cat-desc">케이블 · 손목받침 · 데스크매트 · 공구</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link className="v2-cat is-white" href="/category/service">
                  <svg viewBox="0 0 24 24" className="v2-cat-ico" aria-hidden="true">
                    <path d="M14.6 6.3a4 4 0 0 0-5.2 5.2L4 16.9 7.1 20l5.4-5.4a4 4 0 0 0 5.2-5.2l-2.4 2.4-2.6-.5-.5-2.6z" />
                  </svg>
                  <b className="v2-cat-name">공방 서비스</b>
                  <span className="v2-cat-desc">윤활 · 튜닝 · 수리 · 조립 대행</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
              <li>
                <Link className="v2-cat is-all" href="/category/all">
                  <span className="v2-cat-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <b className="v2-cat-name">전체상품</b>
                  <span className="v2-cat-desc">완성형부터 부품 · 공방 서비스까지 한 번에.</span>
                  <span className="v2-cat-go" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
