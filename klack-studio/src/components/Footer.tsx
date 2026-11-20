import Link from "next/link";
import FooterFold from "./FooterFold";

export default function Footer() {
  return (
    <footer className="ft kx-ft">
      <div className="page kx-ft-mark" aria-hidden="true">
        <span className="v2-ft-word">klack studio</span>
        <span className="v2-ft-caps">
          <i>K</i>
          <i>L</i>
          <i>A</i>
          <i>C</i>
          <i>K</i>
        </span>
      </div>
      <div className="page ft-in">
        <div className="ft-col ft-brand">
          <p className="kx-label">KLACK STUDIO</p>
          <p className="ft-tagline">손으로 조립하고 직접 타건해 보내는 커스텀 키보드 공방</p>
          <p className="kx-label">고객센터</p>
          <p className="ft-tel">준비중</p>
          <p className="ft-hours">운영 시간 준비중</p>
          <p className="ft-note">
            {"구성 · 제작 일정 · 배송 문의는 "}카카오톡 채널(준비중){"이나 "}
            <Link href="/support">고객센터</Link>로 주세요.
          </p>
        </div>
        <FooterFold title="사업자 정보">
          <dl className="ft-dl">
            <dt>상호</dt>
            <dd>메이드키{" ("}클랙스튜디오)</dd>
            <dt>대표자</dt>
            <dd>양원석</dd>
            <dt>사업자등록번호</dt>
            <dd>524-72-00750</dd>
            <dt>통신판매업신고</dt>
            <dd>준비중</dd>
            <dt>주소</dt>
            <dd>경기도 성남시 중원구 성남대로1130번길 21-1, 3층(성남동)</dd>
            <dt>개인정보책임자</dt>
            <dd>양원석</dd>
            <dt>이메일</dt>
            <dd>준비중</dd>
          </dl>
        </FooterFold>
        <FooterFold title="카테고리">
          <ul className="ft-links kx-ft-cats">
            <li>
              <Link href="/category/custom-built">완성형 커스텀</Link>
            </li>
            <li>
              <Link href="/category/kit">베어본 · 하우징 키트</Link>
            </li>
            <li>
              <Link href="/category/switch">스위치</Link>
            </li>
            <li>
              <Link href="/category/keycap">키캡</Link>
            </li>
            <li>
              <Link href="/category/parts">보강판 · PCB · 스태빌</Link>
            </li>
            <li>
              <Link href="/category/accessory">액세서리</Link>
            </li>
            <li>
              <Link href="/category/service">공방 서비스</Link>
            </li>
            <li>
              <Link href="/videos">영상관</Link>
            </li>
            <li>
              <Link href="/guide">제작 가이드</Link>
            </li>
          </ul>
        </FooterFold>
        <FooterFold title="이용 안내">
          <ul className="ft-links">
            <li>
              <Link href="/category/all">전체상품</Link>
            </li>
            <li>
              <Link href="/ranking">베스트</Link>
            </li>
            <li>
              <Link href="/inspection">타건 검수</Link>
            </li>
            <li>
              <Link href="/device-test">기기테스트</Link>
            </li>
            <li>
              <Link href="/order">주문 조회</Link>
            </li>
            <li>
              <Link href="/support">고객센터</Link>
            </li>
            <li>
              <Link href="/membership">회원 등급별 혜택</Link>
            </li>
            <li>
              <Link href="/events">이벤트</Link>
            </li>
            <li>
              <Link href="/terms">이용약관</Link>
            </li>
            <li>
              <Link href="/privacy">개인정보처리방침</Link>
            </li>
            <li>
              <Link href="/guide#delivery">배송 안내</Link>
            </li>
            <li>
              <Link href="/guide#return">교환 · 반품</Link>
            </li>
          </ul>
        </FooterFold>
      </div>
      <div className="ft-bottom">
        <div className="page ft-bottom-in">
          <p>
            {"© "}2026 메이드키{" — All rights reserved"}
          </p>
          <p className="ft-legal">주문 제작 상품은 옵션 확정 후 제작에 들어가며, 제작 착수 이후에는 단순 변심 취소가 제한될 수 있습니다.</p>
        </div>
      </div>
    </footer>
  );
}
