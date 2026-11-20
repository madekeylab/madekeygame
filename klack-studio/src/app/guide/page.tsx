import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";

export const metadata: Metadata = {
  title: "제작 가이드",
  description: "구성 고르기 · 주문 확정 · 공방 제작 · 타건 검수 · 출고까지, 클랙스튜디오 주문 제작 키보드를 받는 과정과 취소 · 교환 기준을 정리했습니다.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-5", "shop-2", "shop-11"]} />
      <Band />
      <main className="page info">
        <nav className="info-toc" aria-label="안내 메뉴">
          <p className="eyebrow">Information</p>
          <ul>
            <li>
              <Link href="/membership">
                회원 혜택<small>등급별 적립</small>
              </Link>
            </li>
            <li>
              <Link className="is-active" aria-current="page" href="/guide">
                제작 가이드<small>주문·제작 기간·배송·교환</small>
              </Link>
            </li>
            <li>
              <Link href="/inspection">
                타건 검수<small>조립·윤활·출고 전 확인</small>
              </Link>
            </li>
            <li>
              <Link href="/support">
                고객센터<small>AI·카카오·문의</small>
              </Link>
            </li>
            <li>
              <Link href="/terms">이용약관</Link>
            </li>
            <li>
              <Link href="/privacy">개인정보처리방침</Link>
            </li>
          </ul>
        </nav>
        <div className="info-body">
          <header className="ik-hero is-dark">
            <div className="ik-hero-t">
              <p className="eyebrow">Build Guide</p>
              <h1>
                고르고, 만들고,
                <br />
                눌러 보고 보냅니다
              </h1>
              <p className="ik-lead">
                클랙스튜디오의 키보드는 주문을 받은 뒤 공방에서 한 대씩 조립합니다. 구성 고르는 법부터 제작 기간, 타건 검수, 배송, 취소 · 교환 기준까지 순서대로
                안내해 드립니다.
              </p>
              <ul className="ik-chips">
                <li>구성 고르기</li>
                <li>주문 제작</li>
                <li>제작 착수 후 취소 제한</li>
                <li>타건 검수 후 출고</li>
                <li>수령 후 7일 접수</li>
              </ul>
            </div>
          </header>
          <section id="build" className="st-sec ik-sec " aria-labelledby="build-h">
            <div className="st-h">
              <p className="eyebrow">Step 1 · Choose</p>
              <h3 id="build-h">구성은 네 가지를 고릅니다</h3>
              <p className="ik-desc">완성형 커스텀 상품은 상품 상세에서 단계별로 옵션을 고르고, 오른쪽 요약에서 합계를 확인한 뒤 담습니다.</p>
            </div>
            <ol className="ik-steps cols-4">
              <li>
                <span className="ik-no">01</span>
                <b>하우징 · 배열</b>
                <p>키보드의 크기(배열)와 하우징 소재 · 색상을 고릅니다. 책상 폭과 자주 쓰는 키(방향키 · 숫자패드)를 기준으로 정하면 실패가 적습니다.</p>
                <small>배열 · 소재 · 색</small>
              </li>
              <li>
                <span className="ik-no">02</span>
                <b>보강판</b>
                <p>보강판 소재에 따라 타건감이 달라집니다. 단단한 소재는 또렷하고, 무른 소재는 부드럽게 눌립니다.</p>
                <small>타건감</small>
              </li>
              <li>
                <span className="ik-no">03</span>
                <b>스위치</b>
                <p>리니어(걸림 없이 매끈) · 택타일(구분감) · 클릭(소리) 중에서 고르고, 필요하면 윤활 옵션을 추가합니다.</p>
                <small>리니어 · 택타일 · 클릭</small>
              </li>
              <li>
                <span className="ik-no">04</span>
                <b>키캡</b>
                <p>프로파일(체리 · OEM · XDA · MDA)과 소재(PBT · ABS)를 고릅니다. 각인 문구가 있는 상품은 이 단계에서 입력합니다.</p>
                <small>프로파일 · 소재</small>
              </li>
            </ol>
            <div style={{ marginTop: "var(--gap-6)" }}>
              <aside className="ik-callout is-gold">
                <b>조합이 고민되면 주문 전에 물어보세요</b>
                <div>
                  <p>
                    {"원하는 타건감(조용한지 · 경쾌한지)과 쓰는 환경을 "}
                    <Link className="info-link" href="/support">
                      고객센터
                    </Link>
                    {"로 알려 주시면 스위치 · 보강판 · 키캡 조합을 함께 골라 드립니다. 타건음은 "}
                    <Link className="info-link" href="/videos">
                      영상관
                    </Link>
                    에서 미리 들어 보실 수 있습니다.
                  </p>
                </div>
              </aside>
            </div>
          </section>
          <section id="order" className="st-sec ik-sec " aria-labelledby="order-h">
            <div className="st-h">
              <p className="eyebrow">Step 2 · Order</p>
              <h3 id="order-h">주문 제작은 이렇게 진행됩니다</h3>
              <p className="ik-desc">결제가 확인되면 구성이 확정되고, 공방 일정에 맞춰 제작에 들어갑니다. 진행 상황은 주문 조회에서 볼 수 있습니다.</p>
            </div>
            <ol className="ik-steps cols-5">
              <li>
                <span className="ik-no">01</span>
                <b>결제 · 구성 확정</b>
                <p>결제 확인 시점의 옵션으로 제작합니다. 구성 변경은 제작 착수 전까지만 가능합니다.</p>
              </li>
              <li>
                <span className="ik-no">02</span>
                <b>제작 착수</b>
                <p>부품을 꺼내 스위치 윤활 · 스태빌 튜닝을 시작합니다. 이때부터 단순 변심 취소가 제한됩니다.</p>
              </li>
              <li>
                <span className="ik-no">03</span>
                <b>조립</b>
                <p>보강판 · PCB · 스위치 · 키캡을 조립합니다.</p>
              </li>
              <li>
                <span className="ik-no">04</span>
                <b>타건 검수</b>
                <p>모든 키의 입력과 소리를 확인합니다. 자세한 기준은 타건 검수 안내에 있습니다.</p>
              </li>
              <li>
                <span className="ik-no">05</span>
                <b>출고</b>
                <p>검수를 마친 키보드를 포장해 택배로 보내고, 운송장 번호를 알려 드립니다.</p>
              </li>
            </ol>
            <div style={{ marginTop: "var(--gap-6)" }}>
              <ul className="st-points ik-facts">
                <li>
                  <b>상품별</b>
                  <span>제작 기간 (상품 상세에 표기)</span>
                </li>
                <li>
                  <b>착수 전</b>
                  <span>구성 변경 · 무료 취소 가능</span>
                </li>
                <li>
                  <b>전 키</b>
                  <span>출고 전 타건 검수</span>
                </li>
                <li>
                  <b>7일</b>
                  <span>수령 후 교환 · 반품 접수</span>
                </li>
              </ul>
            </div>
            <div style={{ marginTop: "var(--gap-6)" }}>
              <aside className="ik-callout is-warn">
                <b>제작 착수 이후에는 취소가 제한됩니다</b>
                <div>
                  <p>
                    주문 제작 상품은 고객님이 고른 구성으로 부품을 윤활 · 가공하기 때문에, 제작에 들어간 뒤에는 단순 변심에 의한 취소 · 반품이 제한될 수
                    있습니다. 착수 전에는 언제든 무료로 취소하거나 구성을 바꿀 수 있으니, 변경이 필요하면 가능한 한 빨리 알려 주세요.
                  </p>
                </div>
              </aside>
            </div>
          </section>
          <section id="delivery" className="st-sec ik-sec " aria-labelledby="delivery-h">
            <div className="st-h">
              <p className="eyebrow">Step 3 · Delivery</p>
              <h3 id="delivery-h">배송은 택배로 보냅니다</h3>
              <p className="ik-desc">
                스위치 · 키캡 · 액세서리처럼 제작이 필요 없는 상품은 재고가 있으면 바로 출고하고, 완성형 · 조립 상품은 타건 검수를 마친 뒤 출고합니다.
              </p>
            </div>
            <dl className="st-spec">
              <div>
                <dt>배송 방법</dt>
                <dd>택배 (운송장 번호로 추적)</dd>
              </div>
              <div>
                <dt>배송비</dt>
                <dd>3만원 이상 무료 · 그 미만은 주문서에 표기 · 제주 · 도서산간 추가</dd>
              </div>
              <div>
                <dt>출고 시점</dt>
                <dd>재고 상품은 결제 확인 후 출고, 주문 제작 상품은 제작 기간 + 타건 검수 후 출고</dd>
              </div>
              <div>
                <dt>함께 주문하면</dt>
                <dd>제작 상품과 재고 상품을 함께 주문하면 제작이 끝난 뒤 한 번에 보내 드립니다(나눠 받기 요청 가능)</dd>
              </div>
            </dl>
          </section>
          <section id="return" className="st-sec ik-sec " aria-labelledby="return-h">
            <div className="st-h">
              <p className="eyebrow">Exchange · Return</p>
              <h3 id="return-h">교환 · 반품은 이렇게 됩니다</h3>
              <p className="ik-desc">주문 제작 상품과 일반 상품의 기준이 다릅니다. 상품 상세에도 따로 표기합니다.</p>
            </div>
            <ol className="ik-steps cols-3">
              <li>
                <span className="ik-no">01</span>
                <b>단순 변심</b>
                <p>
                  수령 후 7일 이내 접수. 왕복 배송비는 구매자 부담입니다. 주문 제작 상품(윤활 · 조립 · 각인 등 고객 구성으로 만든 상품)은 단순 변심 반품이
                  제한될 수 있습니다.
                </p>
              </li>
              <li>
                <span className="ik-no">02</span>
                <b>하자 · 파손 · 오배송</b>
                <p>
                  판매자 부담으로 교환 · 수리 또는 환불합니다. 수령 후 7일 이내에 증상이 보이는 사진이나 영상과 함께 알려 주세요. 키 입력 불량은 짧은 영상이
                  가장 빠릅니다.
                </p>
              </li>
              <li>
                <span className="ik-no">03</span>
                <b>반품이 어려운 경우</b>
                <p>사용 흔적 · 오염 · 임의 분해나 개조로 상태가 바뀐 상품, 개봉한 스위치 낱개, 각인 상품은 반품이 제한됩니다.</p>
              </li>
            </ol>
            <div style={{ marginTop: "var(--gap-6)" }}>
              <aside className="ik-callout is-gold">
                <b>접수 전에 확인해 주세요</b>
                <div>
                  <p>
                    {"주문번호 · 사유 · 증상이 보이는 사진이나 영상을 "}
                    <Link className="info-link" href="/support">
                      고객센터
                    </Link>
                    로 보내 주시면 회수 일정과 비용을 안내드립니다. 포장재는 회수일까지 버리지 말아 주세요.
                  </p>
                </div>
              </aside>
            </div>
          </section>
          <section id="faq" className="st-sec ik-sec " aria-labelledby="faq-h">
            <div className="st-h">
              <p className="eyebrow">FAQ</p>
              <h3 id="faq-h">자주 묻는 질문</h3>
            </div>
            <div className="ik-faq">
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>제작 기간은 얼마나 걸리나요?
                </summary>
                <div className="ik-a">
                  구성과 공방 일정에 따라 다르며, 상품 상세에 상품별 제작 기간을 적어 둡니다. 결제 후 실제 출고 예정일은 주문 조회에서 확인할 수 있습니다.
                </div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>주문 후에 스위치를 바꿀 수 있나요?
                </summary>
                <div className="ik-a">
                  제작 착수 전이라면 가능합니다. 가격 차이가 있으면 차액을 안내드립니다. 착수 후에는 이미 윤활 · 조립한 부품이 있어 변경이 어렵습니다.
                </div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>키트를 사서 직접 조립해도 되나요?
                </summary>
                <div className="ik-a">
                  베어본 · 하우징 키트는 직접 조립하시는 분을 위한 상품입니다. 조립이 어렵다면 공방 서비스의 조립 대행을 함께 주문해 주세요.
                </div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>갖고 있는 키보드도 윤활 · 수리해 주시나요?
                </summary>
                <div className="ik-a">공방 서비스 카테고리에서 윤활 · 튜닝 · 수리 · 조립 대행을 접수합니다. 보내 주시기 전에 상태를 먼저 상담해 드립니다.</div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>A/S 는 어디로 접수하나요?
                </summary>
                <div className="ik-a">고객센터로 접수해 주세요. 공방에서 직접 증상을 확인하고 수리 방법과 비용(무상 여부)을 안내드립니다.</div>
              </details>
            </div>
          </section>
          <section className="st-sec st-service ik-cta" aria-label="클랙스튜디오는 이렇게 만듭니다">
            <div className="st-h">
              <p className="eyebrow">Klack Workshop</p>
              <h3>클랙스튜디오는 이렇게 만듭니다</h3>
            </div>
            <ol className="st-steps">
              <li>
                <b>01</b>
                <strong>구성 확정</strong>
                <span>하우징 · 보강판 · 스위치 · 키캡 옵션을 고르면 주문이 확정됩니다.</span>
              </li>
              <li>
                <b>02</b>
                <strong>공방 제작</strong>
                <span>스위치 윤활 · 스태빌 튜닝 · 조립을 한 대씩 손으로 진행합니다.</span>
              </li>
              <li>
                <b>03</b>
                <strong>타건 검수</strong>
                <span>모든 키의 입력과 소리, 스태빌 잡음을 확인한 뒤 포장합니다.</span>
              </li>
              <li>
                <b>04</b>
                <strong>출고와 A/S</strong>
                <span>택배로 보내 드리고, 사용 중 문제는 공방에서 직접 살펴봅니다.</span>
              </li>
            </ol>
            <div className="ik-cta-act">
              <Link className="ik-btn is-p" href="/category/custom-built">
                완성형 커스텀 보기
              </Link>
              <Link className="ik-btn" href="/inspection">
                타건 검수 안내
              </Link>
              <Link className="ik-btn" href="/support">
                고객센터
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
