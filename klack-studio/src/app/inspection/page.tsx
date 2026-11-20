import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";

export const metadata: Metadata = {
  title: "타건 검수",
  description: "클랙스튜디오가 조립을 마친 키보드를 출고 전에 어떻게 타건 검수하는지, 받으신 뒤 무엇을 확인하면 되는지 정리했습니다.",
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
              <Link href="/guide">
                제작 가이드<small>주문·제작 기간·배송·교환</small>
              </Link>
            </li>
            <li>
              <Link className="is-active" aria-current="page" href="/inspection">
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
              <p className="eyebrow">{"Sound Test & Inspection"}</p>
              <h1>
                보내기 전에
                <br />
                모든 키를 눌러 봅니다
              </h1>
              <p className="ik-lead">
                클랙스튜디오의 완성형 키보드는 조립이 끝나면 공방에서 직접 타건 검수를 거칩니다. 키 입력, 소리, 스태빌라이저 잡음, 외관을 확인하고 기준을 통과한
                키보드만 포장합니다.
              </p>
              <ul className="ik-chips">
                <li>전 키 입력 확인</li>
                <li>타건음 · 잡음 확인</li>
                <li>스태빌 튜닝 점검</li>
                <li>외관 · 구성 대조</li>
                <li>이상 시 출고 보류</li>
              </ul>
            </div>
          </header>
          <section id="check" className="st-sec ik-sec " aria-labelledby="check-h">
            <div className="st-h">
              <p className="eyebrow">Before Shipping</p>
              <h3 id="check-h">타건 검수 항목</h3>
              <p className="ik-desc">조립을 마친 키보드를 사람이 직접 눌러 보며 네 가지를 확인합니다.</p>
            </div>
            <ol className="ik-steps cols-4">
              <li>
                <span className="ik-no">01</span>
                <b>키 입력</b>
                <p>테스트 프로그램을 띄워 모든 키를 하나씩 누르고, 입력 누락 · 중복 입력(채터링)이 없는지 확인합니다.</p>
              </li>
              <li>
                <span className="ik-no">02</span>
                <b>타건음 · 손맛</b>
                <p>같은 스위치끼리 소리와 걸림이 고른지 들어 봅니다. 튀는 스위치는 다시 윤활하거나 교체합니다.</p>
              </li>
              <li>
                <span className="ik-no">03</span>
                <b>스태빌라이저</b>
                <p>스페이스 · 엔터 · 시프트처럼 긴 키의 덜그럭거림과 철심 소리를 확인하고 필요하면 다시 튜닝합니다.</p>
              </li>
              <li>
                <span className="ik-no">04</span>
                <b>외관 · 구성</b>
                <p>하우징 긁힘 · 키캡 배열 · 각인을 보고, 고른 옵션과 구성품(케이블 · 키캡 리무버 등)이 주문과 맞는지 대조합니다.</p>
              </li>
            </ol>
            <div style={{ marginTop: "var(--gap-6)" }}>
              <ul className="st-points ik-facts">
                <li>
                  <b>전 키</b>
                  <span>출고 전 입력 확인</span>
                </li>
                <li>
                  <b>긴 키</b>
                  <span>스태빌 잡음 별도 확인</span>
                </li>
                <li>
                  <b>보류</b>
                  <span>기준 미달 시 출고하지 않음</span>
                </li>
                <li>
                  <b>7일</b>
                  <span>수령 후 하자 접수</span>
                </li>
              </ul>
            </div>
          </section>
          <section id="issue" className="st-sec ik-sec " aria-labelledby="issue-h">
            <div className="st-h">
              <p className="eyebrow">If Something's Wrong</p>
              <h3 id="issue-h">검수에서 문제가 나오면</h3>
            </div>
            <ol className="ik-steps cols-3">
              <li>
                <span className="ik-no">01</span>
                <b>출고 전이면 멈춥니다</b>
                <p>검수에서 문제가 나오면 보내지 않고 다시 손봅니다. 부품 수급으로 일정이 늦어지면 먼저 연락드리고, 기다리시거나 취소하실 수 있습니다.</p>
              </li>
              <li>
                <span className="ik-no">02</span>
                <b>수령 후 7일 이내</b>
                <p>받으신 뒤 발견된 입력 불량 · 파손은 7일 이내 접수하면 판매자 부담으로 수리 · 교환 또는 환불합니다.</p>
              </li>
              <li>
                <span className="ik-no">03</span>
                <b>그 이후에는 A/S</b>
                <p>사용 중 생긴 문제는 고객센터로 접수해 주세요. 공방에서 직접 증상을 보고 수리 방법과 비용을 안내드립니다.</p>
              </li>
            </ol>
          </section>
          <section id="receive" className="st-sec ik-sec " aria-labelledby="receive-h">
            <div className="st-h">
              <p className="eyebrow">Checklist</p>
              <h3 id="receive-h">받으시면 이것만 확인해 주세요</h3>
              <p className="ik-desc">포장재는 확인이 끝날 때까지 두세요. 문제가 보이면 짧은 영상을 찍어 두시면 접수가 가장 빠릅니다.</p>
            </div>
            <dl className="st-spec">
              <div>
                <dt>외관</dt>
                <dd>하우징 긁힘 · 찍힘 · 키캡 빠짐</dd>
              </div>
              <div>
                <dt>구성</dt>
                <dd>주문한 옵션(색상 · 스위치 · 키캡)과 구성품 · 케이블</dd>
              </div>
              <div>
                <dt>입력</dt>
                <dd>키 입력 테스트 사이트에서 모든 키 확인</dd>
              </div>
              <div>
                <dt>소리</dt>
                <dd>긴 키(스페이스 · 엔터 · 시프트)의 덜그럭거림</dd>
              </div>
              <div>
                <dt>연결</dt>
                <dd>유선 · 무선 연결과 표시등 동작(해당 상품)</dd>
              </div>
            </dl>
            <div style={{ marginTop: "var(--gap-6)" }}>
              <aside className="ik-callout is-ink">
                <b>검수는 상태 확인 절차입니다</b>
                <div>
                  <p>
                    {"타건 검수는 출고 시점의 상태를 확인하는 절차이고, 사용 중 생기는 문제를 대신 보증하지는 않습니다. 정상 사용 중 생긴 문제는 "}
                    <Link className="info-link" href="/support">
                      고객센터
                    </Link>
                    로 알려 주시면 공방에서 함께 살펴봅니다.
                  </p>
                </div>
              </aside>
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
              <Link className="ik-btn is-p" href="/guide">
                제작 가이드
              </Link>
              <Link className="ik-btn" href="/support">
                고객센터
              </Link>
              <Link className="ik-btn" href="/category/all">
                전체상품 보기
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
