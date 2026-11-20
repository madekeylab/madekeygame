import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import EmailAuth from "@/components/widgets/EmailAuth";

export const metadata: Metadata = { title: "로그인" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "login"]} />
      <Band />
      <main className="page lg lg-gagu">
        <div className="lg-card card">
          <p className="lg-brand ks-wordmark">
            <b>KLACK STUDIO</b>
            <small>클랙스튜디오</small>
          </p>
          <h1 className="lg-title">로그인 / 회원가입</h1>
          <p className="lg-sub">소셜 계정 또는 이메일로 시작하세요. 회원이 되면 타건음 커뮤니티 · 게임랜드 랭킹에 참여할 수 있습니다.</p>
          <p className="lg-notice">
            <b>카카오 · 네이버 로그인 연동 준비중</b>사업자 등록을 마쳐 카카오 · 네이버 로그인을 연동하고 있습니다. 그동안은 아래 이메일로 가입하실 수 있고,
            비회원 주문 · 주문번호 조회도 그대로 됩니다.
          </p>
          <div className="lg-btns">
            <button type="button" className="lg-btn lg-kakao" disabled aria-disabled="true">
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 3C6.5 3 2 6.5 2 10.8c0 2.7 1.8 5.1 4.5 6.5l-.9 3.4c-.1.3.2.5.5.4l4-2.7c.6.1 1.3.1 1.9.1 5.5 0 10-3.5 10-7.7S17.5 3 12 3z"
                />
              </svg>
              카카오 로그인<i>오픈 예정</i>
            </button>
            <button type="button" className="lg-btn lg-naver" disabled aria-disabled="true">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path fill="currentColor" d="M15.6 4v8.4L8.6 4H4v16h4.4v-8.4l7 8.4H20V4z" />
              </svg>
              네이버 로그인<i>오픈 예정</i>
            </button>
          </div>
          <EmailAuth next="/mypage" />
          <p className="lg-wait">로그인이 열리기 전에도 비회원 주문 · 주문 조회 · 구성 상담은 모두 됩니다.</p>
          <p className="lg-terms">
            {"계속 진행하면 "}
            <Link href="/terms">이용약관</Link>
            {"과 "}
            <Link href="/privacy">개인정보처리방침</Link>에 동의하는 것으로 봅니다. 제공자에서 동의한 항목(이름 · 이메일 · 프로필 사진 등)만 저장합니다.
          </p>
          <p className="lg-guest">
            <Link href="/order">비회원 주문 조회 ›</Link>
            <Link href="/support">구성 · 제작 문의 ›</Link>
          </p>
        </div>
      </main>
    </>
  );
}
