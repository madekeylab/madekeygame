import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";

export const metadata: Metadata = { title: "개인정보처리방침" };

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
              <Link className="is-active" aria-current="page" href="/privacy">
                개인정보처리방침
              </Link>
            </li>
          </ul>
        </nav>
        <div className="info-body">
          <header className="ik-hero is-light">
            <div className="ik-hero-t">
              <p className="eyebrow">Privacy Policy</p>
              <h1>개인정보처리방침</h1>
              <p className="ik-lead">개인정보 보호법에 따라 수집·이용 내역과 정보주체의 권리를 안내합니다.</p>
              <ul className="ik-chips">
                <li>개인정보 보호법 기준</li>
                <li>9개 항목</li>
                <li>보호책임자 양원석</li>
              </ul>
            </div>
          </header>
          <section id="who" className="st-sec ik-sec " aria-labelledby="who-h">
            <div className="st-h">
              <p className="eyebrow">Controller</p>
              <h3 id="who-h">처리자 정보</h3>
            </div>
            <dl className="st-spec">
              <div>
                <dt>상호</dt>
                <dd>메이드키 (클랙스튜디오)</dd>
              </div>
              <div>
                <dt>사업자 정보</dt>
                <dd>사업자등록번호 524-72-00750 · 대표자 양원석</dd>
              </div>
              <div>
                <dt>개인정보 보호책임자</dt>
                <dd>양원석</dd>
              </div>
            </dl>
          </section>
          <section id="sections" className="st-sec ik-sec " aria-labelledby="sections-h">
            <div className="st-h">
              <p className="eyebrow">Sections</p>
              <h3 id="sections-h">항목 구성</h3>
            </div>
            <nav className="ik-doc-toc" aria-label="항목 바로가기">
              <a href="#sec-1">1{". "}수집하는 개인정보 항목</a>
              <a href="#sec-2">2{". "}개인정보의 수집 및 이용 목적</a>
              <a href="#sec-3">3{". "}개인정보의 보유 및 이용 기간</a>
              <a href="#sec-4">4{". "}개인정보의 제3자 제공</a>
              <a href="#sec-5">5{". "}개인정보 처리의 위탁</a>
              <a href="#sec-6">6{". "}정보주체의 권리와 행사 방법</a>
              <a href="#sec-7">7{". "}개인정보의 파기 절차 및 방법</a>
              <a href="#sec-8">8{". "}개인정보 보호책임자</a>
              <a href="#sec-9">9{". "}개인정보 처리방침의 변경</a>
            </nav>
            <ol className="ik-doc">
              <li id="sec-1" className="ik-doc-i">
                <span className="ik-no">01</span>
                <div>
                  <b>1{". "}수집하는 개인정보 항목</b>
                  <p>회원가입·주문·상담 과정에서 받는 항목(이름, 연락처, 주소, 이메일 등)과 각인 문구처럼 주문 제작에 필요한 항목, 자동 수집 항목.</p>
                </div>
              </li>
              <li id="sec-2" className="ik-doc-i">
                <span className="ik-no">02</span>
                <div>
                  <b>2{". "}개인정보의 수집 및 이용 목적</b>
                  <p>주문 처리와 제작·배송, 회원 관리, 고객 상담, 수리·A/S 접수, 부정 이용 방지.</p>
                </div>
              </li>
              <li id="sec-3" className="ik-doc-i">
                <span className="ik-no">03</span>
                <div>
                  <b>3{". "}개인정보의 보유 및 이용 기간</b>
                  <p>목적 달성 시 파기 원칙과 법령상 보존 기간(전자상거래법 등).</p>
                </div>
              </li>
              <li id="sec-4" className="ik-doc-i">
                <span className="ik-no">04</span>
                <div>
                  <b>4{". "}개인정보의 제3자 제공</b>
                  <p>제공하는 경우와 상대방, 항목, 목적.</p>
                </div>
              </li>
              <li id="sec-5" className="ik-doc-i">
                <span className="ik-no">05</span>
                <div>
                  <b>5{". "}개인정보 처리의 위탁</b>
                  <p>택배사, 결제·알림 등 수탁 업체와 위탁 업무.</p>
                </div>
              </li>
              <li id="sec-6" className="ik-doc-i">
                <span className="ik-no">06</span>
                <div>
                  <b>6{". "}정보주체의 권리와 행사 방법</b>
                  <p>열람·정정·삭제·처리정지 요구 방법.</p>
                </div>
              </li>
              <li id="sec-7" className="ik-doc-i">
                <span className="ik-no">07</span>
                <div>
                  <b>7{". "}개인정보의 파기 절차 및 방법</b>
                  <p>파기 절차와 방법.</p>
                </div>
              </li>
              <li id="sec-8" className="ik-doc-i">
                <span className="ik-no">08</span>
                <div>
                  <b>8{". "}개인정보 보호책임자</b>
                  <p>책임자와 연락처.</p>
                </div>
              </li>
              <li id="sec-9" className="ik-doc-i">
                <span className="ik-no">09</span>
                <div>
                  <b>9{". "}개인정보 처리방침의 변경</b>
                  <p>변경 시 공지 방법.</p>
                </div>
              </li>
            </ol>
          </section>
          <aside className="ik-callout is-ink">
            <b>본문 등록 안내</b>
            <div>
              <p>각 항목의 구체적인 내용은 실제 수집 항목과 위탁 업체(배송·결제)가 확정된 뒤 등록됩니다.{" 개인정보 보호책임자: 양원석"}</p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
