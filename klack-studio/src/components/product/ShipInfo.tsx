import Link from "next/link";

/** 상품 상세 하단 — 결제 안내 · 문의 방법 */
export default function ShipInfo() {
  return (
    <section className="sec">
      <article className="st st-ship">
        <section className="st-sec">
          <header className="st-h">
            <p className="eyebrow">Payment</p>
            <h3>결제 안내</h3>
          </header>
          <div className="sh-cols">
            <div className="sh-card">
              <b>무통장 입금</b>
              <p>입금이 확인되면 제작·출고가 진행됩니다. 입금 계좌는 준비중입니다.</p>
            </div>
            <div className="sh-card">
              <b>신용카드</b>
              <p>준비중입니다. 지금은 무통장 입금으로 주문해 주세요.</p>
            </div>
            <div className="sh-card">
              <b>가상계좌</b>
              <p>준비중입니다. 지금은 무통장 입금으로 주문해 주세요.</p>
            </div>
            <div className="sh-card">
              <b>회원 혜택</b>
              <p>
                판매가는 모든 고객에게 같습니다. 로그인 후 주문하면 배송·설치 완료 시 등급별로 포인트가 적립됩니다.{" "}
                <Link className="sec-more" href="/membership">
                  혜택 보기 ›
                </Link>
              </p>
            </div>
          </div>
        </section>
        <section className="st-sec st-service">
          <header className="st-h">
            <p className="eyebrow">Customer Care</p>
            <h3>문의는 이렇게</h3>
          </header>
          <div className="sh-cs">
            <div>
              <p className="sh-tel">준비중</p>
              <p className="sh-hours">운영 시간 준비중</p>
              <p className="sh-hours">치수 · 반입 경로 · 배송 일정 문의는 카카오톡 채널이 가장 빠릅니다.</p>
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
          </div>
        </section>
      </article>
    </section>
  );
}
