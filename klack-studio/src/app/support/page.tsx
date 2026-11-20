import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";

export const metadata: Metadata = {
  title: "고객센터",
  description: "구성 상담 · 제작 일정 · 배송 · 타건 검수 · A/S · 교환과 반품 — 클랙스튜디오에 가장 많이 묻는 것들을 모았습니다.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-5", "product-support", "shop-2", "shop-11"]} />
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
              <Link href="/guide">
                제작 가이드<small>주문·제작 기간·배송·교환</small>
              </Link>
            </li>
            <li>
              <Link href="/inspection">
                타건 검수<small>조립·윤활·출고 전 확인</small>
              </Link>
            </li>
            <li>
              <Link className="is-active" aria-current="page" href="/support">
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
              <p className="eyebrow">Customer Care</p>
              <h1>
                주문 전이든 후든,
                <br />
                언제든 물어보세요
              </h1>
              <p className="ik-lead">
                어떤 스위치가 맞을지, 제작이 어디까지 진행됐는지, 받은 키보드의 키 하나가 이상한지 — 자료에 답이 있는 질문은 AI 상담원이 바로, 사람이 필요한
                일은 공방이 이어받습니다. 주문번호를 함께 알려 주시면 훨씬 빠릅니다.
              </p>
              <ul className="ik-chips">
                <li>구성 상담</li>
                <li>제작 진행 확인</li>
                <li>타건 · 입력 문제</li>
                <li>주문번호로 빠른 확인</li>
              </ul>
            </div>
          </header>
          <section id="contact" className="st-sec ik-sec " aria-labelledby="contact-h">
            <div className="st-h">
              <p className="eyebrow">Contact</p>
              <h3 id="contact-h">바로 문의하기</h3>
            </div>
            <div className="inq inq-lg" role="group" aria-label="문의하기">
              <Link className="inq-btn is-kakao is-ready" title="아직 채널이 열리지 않았습니다 — 고객센터 안내로 이동" href="/support">
                <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3C6.5 3 2 6.5 2 10.8c0 2.7 1.8 5.1 4.5 6.5l-.9 3.4c-.1.3.2.5.5.4l4-2.7c.6.1 1.3.1 1.9.1 5.5 0 10-3.5 10-7.7S17.5 3 12 3z"
                  />
                </svg>
                <span>
                  <b>카카오톡 문의</b>
                  <small>구성 · 제작 일정 · 배송 1:1 상담</small>
                </span>
                <em>준비중</em>
              </Link>
            </div>
            <p className="ik-desc" style={{ marginTop: "10px" }}>
              카카오톡 채널 · 전화 · 이메일은 준비중입니다. 그동안은 AI 상담원(상담원 연결 포함)을 이용해 주세요.
            </p>
            <div style={{ marginTop: "var(--gap-6)" }}>
              <ul className="st-points ik-facts">
                <li>
                  <b>준비중</b>
                  <span>운영 시간</span>
                </li>
                <li>
                  <b>준비중</b>
                  <span>전화</span>
                </li>
                <li>
                  <b>준비중</b>
                  <span>이메일</span>
                </li>
                <li>
                  <b>AI</b>
                  <span>AI 상담원(구성 · 배송 · 제작 일정)</span>
                </li>
              </ul>
            </div>
          </section>
          <section id="quick" className="st-sec ik-sec " aria-labelledby="quick-h">
            <div className="st-h">
              <p className="eyebrow">Self Service</p>
              <h3 id="quick-h">직접 해결하기</h3>
            </div>
            <ol className="ik-steps cols-4">
              <li>
                <span className="ik-no">01</span>
                <b>주문 조회</b>
                <p>주문번호와 연락처로 진행 상황을 확인하고, 제작 착수 전이면 취소를 요청할 수 있습니다.</p>
                <small>/order</small>
              </li>
              <li>
                <span className="ik-no">02</span>
                <b>배송 진행 현황</b>
                <p>제작 · 검수 · 출고 단계와 운송장 번호를 봅니다.</p>
                <small>/order/track</small>
              </li>
              <li>
                <span className="ik-no">03</span>
                <b>교환 · 반품</b>
                <p>수령 후 7일 이내 접수. 주문 제작 상품의 기준은 제작 가이드에 적어 두었습니다.</p>
                <small>/guide#return</small>
              </li>
              <li>
                <span className="ik-no">04</span>
                <b>구성 고르기</b>
                <p>스위치 · 보강판 · 키캡 조합이 고민되면 원하는 타건감을 알려 주세요.</p>
                <small>/guide#build</small>
              </li>
            </ol>
            <p className="ik-desc" style={{ marginTop: "10px" }}>
              <Link className="info-link" href="/order">
                주문 조회
              </Link>
              {" · "}
              <Link className="info-link" href="/order/track">
                배송 진행 현황
              </Link>
              {" · "}
              <Link className="info-link" href="/guide#return">
                교환 · 반품 안내
              </Link>
              {" · "}
              <Link className="info-link" href="/inspection">
                타건 검수 안내
              </Link>
            </p>
          </section>
          <section id="faq" className="st-sec ik-sec " aria-labelledby="faq-h">
            <div className="st-h">
              <p className="eyebrow">FAQ</p>
              <h3 id="faq-h">자주 묻는 질문</h3>
            </div>
            <div className="ik-faq">
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>언제 받을 수 있나요?
                </summary>
                <div className="ik-a">
                  재고 상품은 결제 확인 후 출고하고, 주문 제작 상품은 상품 상세에 적힌 제작 기간과 타건 검수를 마친 뒤 출고합니다. 예정일은 주문 조회에서 확인할
                  수 있습니다.
                </div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>주문을 취소하거나 구성을 바꿀 수 있나요?
                </summary>
                <div className="ik-a">
                  제작 착수 전에는 무료로 취소하거나 구성을 바꿀 수 있습니다. 제작에 들어간 뒤에는 고객님 구성으로 부품을 윤활 · 조립하기 때문에 단순 변심
                  취소가 제한될 수 있습니다.
                </div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>어떤 스위치를 골라야 할지 모르겠어요.
                </summary>
                <div className="ik-a">
                  조용한 타건을 원하시는지, 구분감이 있는 손맛을 원하시는지 알려 주시면 맞는 스위치를 추천해 드립니다. 타건음 영상은 영상관에서 보실 수
                  있습니다(준비중).
                </div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>받은 키보드의 키 하나가 안 눌려요.
                </summary>
                <div className="ik-a">증상이 보이는 짧은 영상과 주문번호를 보내 주세요. 수령 후 7일 이내라면 판매자 부담으로 수리 · 교환합니다.</div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>A/S 는 어떻게 접수하나요?
                </summary>
                <div className="ik-a">고객센터로 접수해 주시면 공방에서 직접 증상을 확인하고 수리 방법과 비용(무상 여부)을 안내드립니다.</div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>갖고 있는 키보드의 윤활 · 수리도 되나요?
                </summary>
                <div className="ik-a">공방 서비스 카테고리에서 윤활 · 튜닝 · 수리 · 조립 대행을 접수합니다. 보내 주시기 전에 상태를 먼저 상담해 드립니다.</div>
              </details>
              <details className="ik-faq-i">
                <summary>
                  <span className="ik-q">Q</span>상담원과 직접 이야기하고 싶어요
                </summary>
                <div className="ik-a">
                  AI 상담원 창에서 "상담원 연결"이라고 말씀하시거나 상담원 연결 버튼을 누르면 담당자에게 전달되고, 연락처를 남기시면 확인 후 연락드립니다.
                </div>
              </details>
            </div>
          </section>
          <aside className="ik-callout is-gold">
            <b>문의할 때 이것만 알려 주세요</b>
            <div>
              <p>① 주문번호 ② 상품명과 고른 구성 ③ 상황 설명과 사진 · 영상. 입력 · 소리 문제는 짧은 영상 하나가 긴 설명보다 빠릅니다.</p>
            </div>
          </aside>
          <section className="st-sec st-service ik-cta" aria-label="사람이 필요한 순간엔 공방이 이어받습니다">
            <div className="st-h">
              <p className="eyebrow">Klack Workshop</p>
              <h3>사람이 필요한 순간엔 공방이 이어받습니다</h3>
            </div>
            <ol className="st-steps">
              <li>
                <b>01</b>
                <strong>AI 가 먼저</strong>
                <span>제작 일정 · 배송 · 구성 질문은 AI 상담원이 먼저 답합니다.</span>
              </li>
              <li>
                <b>02</b>
                <strong>상담원 연결</strong>
                <span>"상담원 연결" 한마디면 공방 담당자에게 전달됩니다.</span>
              </li>
              <li>
                <b>03</b>
                <strong>연락처 남기기</strong>
                <span>이름 · 전화번호를 남기면 순서대로 연락드립니다.</span>
              </li>
              <li>
                <b>04</b>
                <strong>기록이 남습니다</strong>
                <span>문의 내용과 답변이 남아 다음 문의가 더 빨라집니다.</span>
              </li>
            </ol>
            <div className="ik-cta-act">
              <Link className="ik-btn is-p" href="/order">
                주문 조회
              </Link>
              <Link className="ik-btn" href="/guide">
                제작 가이드
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
