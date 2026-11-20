import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = { title: "친구 추천 이벤트" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-2", "shop-11", "events-2"]} />
      <Band />
      <main className="page shop-main">
        <header className="ik-hero is-dark has-img">
          <div className="ik-hero-t">
            <p className="eyebrow">Friend Referral</p>
            <h1>친구 추천 이벤트</h1>
            <p className="ik-lead">내 추천 링크로 가입한 친구가 첫 주문을 결제하면 두 분 모두 포인트를 드립니다.</p>
            <ul className="ik-chips">
              <li>나 +3,000P</li>
              <li>친구 +2,000P</li>
              <li>친구가 첫 주문을 결제하면</li>
              <li>월 20명까지</li>
            </ul>
          </div>
          <div className="ik-collage" aria-hidden="true">
            <span className="ik-c1">
              <img src="/uploads/2026/10/2026101089875bca4b90b3d8-main.webp" alt="" loading="eager" />
            </span>
            <span className="ik-c2">
              <img src="/uploads/2026/10/2026104de8bab633530c78a4-main.webp" alt="" loading="lazy" />
            </span>
            <span className="ik-c3">
              <img src="/uploads/2026/10/202610be719d8ea29ab517d3-main.webp" alt="" loading="lazy" />
            </span>
          </div>
        </header>
        <section id="mine" className="st-sec ik-sec " aria-labelledby="mine-h">
          <div className="st-h">
            <p className="eyebrow">My Link</p>
            <h3 id="mine-h">로그인하면 내 링크가 생깁니다</h3>
          </div>
          <aside className="ik-callout is-gold">
            <div>
              <p>
                <Link className="info-link" href="/login?next=%2Fevents%2Ffriend">
                  로그인
                </Link>
                {" 후 나만의 추천 링크를 받아 친구에게 보내세요."}
              </p>
            </div>
          </aside>
        </section>
        <section id="how" className="st-sec ik-sec " aria-labelledby="how-h">
          <div className="st-h">
            <p className="eyebrow">How it works</p>
            <h3 id="how-h">이렇게 진행됩니다</h3>
          </div>
          <ol className="ik-steps cols-4">
            <li>
              <span className="ik-no">01</span>
              <b>링크 복사</b>
              <p>내 추천 링크를 복사해 카카오톡·문자로 친구에게 보냅니다.</p>
            </li>
            <li>
              <span className="ik-no">02</span>
              <b>친구 가입</b>
              <p>친구가 그 링크로 들어와 로그인(가입)하면 추천이 연결됩니다(30일 안).</p>
            </li>
            <li>
              <span className="ik-no">03</span>
              <b>친구의 첫 결제</b>
              <p>친구의 첫 주문이 결제확인되면 두 분 모두 포인트가 적립됩니다.</p>
            </li>
            <li>
              <span className="ik-no">04</span>
              <b>포인트 사용</b>
              <p>적립 포인트는 다음 주문에서 현금처럼. 마이페이지에서 내역 확인.</p>
            </li>
          </ol>
          <div style={{ marginTop: "var(--gap-6)" }}>
            <ul className="st-points ik-facts">
              <li>
                <b>+3,000P</b>
                <span>추천한 나</span>
              </li>
              <li>
                <b>+2,000P</b>
                <span>가입한 친구</span>
              </li>
              <li>
                <b>20명</b>
                <span>월 최대 추천</span>
              </li>
              <li>
                <b>30일</b>
                <span>링크 유효(쿠키)</span>
              </li>
            </ul>
          </div>
        </section>
        <section id="faq" className="st-sec ik-sec " aria-labelledby="faq-h">
          <div className="st-h">
            <p className="eyebrow">FAQ</p>
            <h3 id="faq-h">유의사항</h3>
          </div>
          <div className="ik-faq">
            <details className="ik-faq-i">
              <summary>
                <span className="ik-q">Q</span>이미 가입한 친구도 되나요?
              </summary>
              <div className="ik-a">아니요. 추천 링크로 처음 가입(첫 로그인)하는 친구만 연결됩니다.</div>
            </details>
            <details className="ik-faq-i">
              <summary>
                <span className="ik-q">Q</span>내가 내 링크로 가입하면요?
              </summary>
              <div className="ik-a">본인 추천은 연결되지 않습니다. 같은 사람의 중복 계정도 무효 처리될 수 있습니다.</div>
            </details>
            <details className="ik-faq-i">
              <summary>
                <span className="ik-q">Q</span>보상은 언제 들어오나요?
              </summary>
              <div className="ik-a">친구의 첫 주문이 결제확인 단계가 되는 순간 두 분 모두 적립됩니다. 그 주문이 취소되면 회수될 수 있습니다.</div>
            </details>
            <details className="ik-faq-i">
              <summary>
                <span className="ik-q">Q</span>한 달에 몇 명까지요?
              </summary>
              <div className="ik-a">추천인 기준 월 20명까지 인정됩니다.</div>
            </details>
          </div>
        </section>
      </main>
      <Tail />
    </>
  );
}
