import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = { title: "후기 작성 이벤트" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-2", "shop-11", "events-2"]} />
      <Band />
      <main className="page shop-main">
        <header className="ik-hero is-dark has-img">
          <div className="ik-hero-t">
            <p className="eyebrow">Review Event</p>
            <h1>후기 작성 이벤트</h1>
            <p className="ik-lead">구매하신 상품의 솔직한 후기를 남겨 주시면 포인트를 드립니다.</p>
            <ul className="ik-chips">
              <li>후기 1건 500P</li>
              <li>20자 이상</li>
              <li>하루 3회</li>
              <li>로그인 회원 대상</li>
              <li>즉시 적립</li>
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
        <section id="how" className="st-sec ik-sec " aria-labelledby="how-h">
          <div className="st-h">
            <p className="eyebrow">How it works</p>
            <h3 id="how-h">이렇게 참여합니다</h3>
          </div>
          <ol className="ik-steps cols-4">
            <li>
              <span className="ik-no">01</span>
              <b>상품 페이지로</b>
              <p>구매한 상품(또는 써 본 상품)의 상세 페이지 후기 탭을 엽니다.</p>
            </li>
            <li>
              <span className="ik-no">02</span>
              <b>별점 + 후기</b>
              <p>별점을 고르고 20자 이상 솔직하게 씁니다. 사진 설명·착용감·사이즈 팁이 다른 분께 큰 도움이 됩니다.</p>
            </li>
            <li>
              <span className="ik-no">03</span>
              <b>즉시 적립</b>
              <p>저장되는 순간 500P 가 적립됩니다(하루 3회까지).</p>
            </li>
            <li>
              <span className="ik-no">04</span>
              <b>다음 주문에 사용</b>
              <p>적립 포인트는 결제 시 현금처럼 씁니다. 마이페이지에서 내역을 확인하세요.</p>
            </li>
          </ol>
        </section>
        <section id="mine" className="st-sec ik-sec " aria-labelledby="mine-h">
          <div className="st-h">
            <p className="eyebrow">My Turn</p>
            <h3 id="mine-h">로그인하면 바로 참여할 수 있어요</h3>
          </div>
          <aside className="ik-callout is-gold">
            <div>
              <p>
                <Link className="info-link" href="/login?next=%2Fevents%2Freview">
                  로그인
                </Link>
                {" 후 상품 페이지에서 후기를 남기면 자동으로 적립됩니다."}
              </p>
            </div>
          </aside>
          <div style={{ marginTop: "var(--gap-6)" }}>
            <ul className="st-points ik-facts">
              <li>
                <b>500P</b>
                <span>후기 1건당</span>
              </li>
              <li>
                <b>3회</b>
                <span>하루 최대</span>
              </li>
              <li>
                <b>20자</b>
                <span>최소 글자 수</span>
              </li>
              <li>
                <b>즉시</b>
                <span>적립 시점</span>
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
                <span className="ik-q">Q</span>어떤 후기가 적립되나요?
              </summary>
              <div className="ik-a">로그인한 회원이 남긴 20자 이상의 후기입니다. 같은 상품에는 한 번만 쓸 수 있고, 하루 3회까지 적립됩니다.</div>
            </details>
            <details className="ik-faq-i">
              <summary>
                <span className="ik-q">Q</span>비회원도 되나요?
              </summary>
              <div className="ik-a">후기는 남길 수 있지만 포인트는 로그인 회원에게만 적립됩니다.</div>
            </details>
            <details className="ik-faq-i">
              <summary>
                <span className="ik-q">Q</span>부적절한 후기는요?
              </summary>
              <div className="ik-a">광고·도배·욕설·무관한 내용은 비공개 처리되고 적립이 회수될 수 있습니다.</div>
            </details>
            <details className="ik-faq-i">
              <summary>
                <span className="ik-q">Q</span>포인트는 언제까지 쓰나요?
              </summary>
              <div className="ik-a">적립일로부터 1년, 결제 시 현금처럼 사용합니다.</div>
            </details>
          </div>
        </section>
      </main>
      <Tail />
    </>
  );
}
