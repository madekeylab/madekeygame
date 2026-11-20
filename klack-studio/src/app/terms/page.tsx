import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";

export const metadata: Metadata = { title: "이용약관" };

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
              <Link className="is-active" aria-current="page" href="/terms">
                이용약관
              </Link>
            </li>
            <li>
              <Link href="/privacy">개인정보처리방침</Link>
            </li>
          </ul>
        </nav>
        <div className="info-body">
          <header className="ik-hero is-light">
            <div className="ik-hero-t">
              <p className="eyebrow">Terms of Service</p>
              <h1>이용약관</h1>
              <p className="ik-lead">전자상거래 등에서의 소비자보호에 관한 법률과 공정거래위원회 표준약관을 기준으로 합니다.</p>
              <ul className="ik-chips">
                <li>표준약관 기준</li>
                <li>15개 조항</li>
                <li>법무 검토 후 본문 등록</li>
              </ul>
            </div>
          </header>
          <section id="biz" className="st-sec ik-sec " aria-labelledby="biz-h">
            <div className="st-h">
              <p className="eyebrow">Business</p>
              <h3 id="biz-h">사업자 정보</h3>
            </div>
            <dl className="st-spec">
              <div>
                <dt>상호</dt>
                <dd>메이드키</dd>
              </div>
              <div>
                <dt>브랜드</dt>
                <dd>클랙스튜디오</dd>
              </div>
              <div>
                <dt>대표자</dt>
                <dd>양원석</dd>
              </div>
              <div>
                <dt>사업자등록번호</dt>
                <dd>524-72-00750</dd>
              </div>
              <div>
                <dt>통신판매업 신고번호</dt>
                <dd>준비중</dd>
              </div>
              <div>
                <dt>사업장 주소</dt>
                <dd>경기도 성남시 중원구 성남대로1130번길 21-1, 3층(성남동)</dd>
              </div>
              <div>
                <dt>연락처</dt>
                <dd>준비중</dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd>준비중</dd>
              </div>
            </dl>
          </section>
          <section id="articles" className="st-sec ik-sec " aria-labelledby="articles-h">
            <div className="st-h">
              <p className="eyebrow">Articles</p>
              <h3 id="articles-h">조항 구성</h3>
            </div>
            <nav className="ik-doc-toc" aria-label="조항 바로가기">
              <a href="#art-1">제1조</a>
              <a href="#art-2">제2조</a>
              <a href="#art-3">제3조</a>
              <a href="#art-4">제4조</a>
              <a href="#art-5">제5조</a>
              <a href="#art-6">제6조</a>
              <a href="#art-7">제7조</a>
              <a href="#art-8">제8조</a>
              <a href="#art-9">제9조</a>
              <a href="#art-10">제10조</a>
              <a href="#art-11">제11조</a>
              <a href="#art-12">제12조</a>
              <a href="#art-13">제13조</a>
              <a href="#art-14">제14조</a>
              <a href="#art-15">제15조</a>
            </nav>
            <ol className="ik-doc">
              <li id="art-1" className="ik-doc-i">
                <span className="ik-no">01</span>
                <div>
                  <b>제1조 (목적)</b>
                  <p>이 약관이 정하는 범위 — 사이버몰 이용 조건과 절차, 회사와 이용자의 권리·의무.</p>
                </div>
              </li>
              <li id="art-2" className="ik-doc-i">
                <span className="ik-no">02</span>
                <div>
                  <b>제2조 (정의)</b>
                  <p>몰, 이용자, 회원, 비회원 등 용어의 뜻.</p>
                </div>
              </li>
              <li id="art-3" className="ik-doc-i">
                <span className="ik-no">03</span>
                <div>
                  <b>제3조 (약관의 게시와 개정)</b>
                  <p>약관의 게시 위치, 개정 절차와 공지 방법.</p>
                </div>
              </li>
              <li id="art-4" className="ik-doc-i">
                <span className="ik-no">04</span>
                <div>
                  <b>제4조 (서비스의 제공 및 변경)</b>
                  <p>제공하는 서비스와 변경 시 통지.</p>
                </div>
              </li>
              <li id="art-5" className="ik-doc-i">
                <span className="ik-no">05</span>
                <div>
                  <b>제5조 (회원가입)</b>
                  <p>가입 신청과 승낙, 가입 제한 사유.</p>
                </div>
              </li>
              <li id="art-6" className="ik-doc-i">
                <span className="ik-no">06</span>
                <div>
                  <b>제6조 (회원 탈퇴 및 자격 상실)</b>
                  <p>탈퇴 방법과 자격 제한·상실 사유.</p>
                </div>
              </li>
              <li id="art-7" className="ik-doc-i">
                <span className="ik-no">07</span>
                <div>
                  <b>제7조 (구매 신청 및 계약의 성립)</b>
                  <p>구매 신청 절차와 계약 성립 시점.</p>
                </div>
              </li>
              <li id="art-8" className="ik-doc-i">
                <span className="ik-no">08</span>
                <div>
                  <b>제8조 (지급 방법)</b>
                  <p>이용 가능한 결제 수단.</p>
                </div>
              </li>
              <li id="art-9" className="ik-doc-i">
                <span className="ik-no">09</span>
                <div>
                  <b>제9조 (배송)</b>
                  <p>택배 배송의 인도 범위, 재고 상품과 주문 제작 상품의 출고 시점.</p>
                </div>
              </li>
              <li id="art-10" className="ik-doc-i">
                <span className="ik-no">10</span>
                <div>
                  <b>제10조 (주문 제작 상품)</b>
                  <p>고객이 고른 구성(스위치·키캡·윤활·각인 등)으로 제작하는 상품의 제작 착수 시점, 제작 기간, 착수 후 변경·취소 제한.</p>
                </div>
              </li>
              <li id="art-11" className="ik-doc-i">
                <span className="ik-no">11</span>
                <div>
                  <b>제11조 (청약철회 및 반품·교환)</b>
                  <p>청약철회 기간과 예외(주문 제작 상품 포함), 반품·교환 절차, 배송비 부담 기준.</p>
                </div>
              </li>
              <li id="art-12" className="ik-doc-i">
                <span className="ik-no">12</span>
                <div>
                  <b>제12조 (타건 검수 및 A/S)</b>
                  <p>출고 전 타건 검수의 범위, 수령 후 하자 처리, 공방 A/S 의 무상·유상 기준과 접수 창구.</p>
                </div>
              </li>
              <li id="art-13" className="ik-doc-i">
                <span className="ik-no">13</span>
                <div>
                  <b>제13조 (환급)</b>
                  <p>환급 시기와 방법.</p>
                </div>
              </li>
              <li id="art-14" className="ik-doc-i">
                <span className="ik-no">14</span>
                <div>
                  <b>제14조 (개인정보 보호)</b>
                  <p>개인정보의 수집·이용·보호 원칙(개인정보처리방침 참조).</p>
                </div>
              </li>
              <li id="art-15" className="ik-doc-i">
                <span className="ik-no">15</span>
                <div>
                  <b>제15조 (분쟁 해결)</b>
                  <p>피해 보상 처리 기구, 관할 법원.</p>
                </div>
              </li>
            </ol>
          </section>
          <aside className="ik-callout is-ink">
            <b>본문 등록 안내</b>
            <div>
              <p>
                약관 본문은 법무 검토가 끝난 뒤 등록됩니다. 그 전까지는 전자상거래 등에서의 소비자보호에 관한 법률과 공정거래위원회 표준약관을 따르며, 확정되지
                않은 번호는 임의로 표기하지 않습니다.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
