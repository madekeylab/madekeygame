import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "중고마켓",
  description: "키보드 사고파는 클랙 중고마켓 — 쓰던 키보드는 공방에 팔고 바로 입금받고, 공방이 수리 · 검수한 중고는 리포트를 보고 안심하고 삽니다.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "product-used"]} />
      <Band />
      <main className="page shop-main">
        <section className="um-hero" data-used-home="">
          <div className="um-hero-txt">
            <p className="uc-eyebrow">KLACK USED MARKET</p>
            <h1>
              키보드 사고파는
              <br />
              <span>클랙 중고마켓</span>
            </h1>
            <p className="uc-lead">
              쓰던 키보드는 공방에 팔고 바로 입금받으세요. 공방이 사들인 중고는 한 키씩 눌러 보고 고쳐서, 검수 리포트를 붙여 다시 팝니다. 직거래 약속 · 흥정 ·
              고장 걱정이 없는 키보드 중고마켓입니다.
            </p>
            <p className="um-stats">
              <span>
                <b>0</b>개 판매 중
              </span>
              <span>
                <b>0</b>건 매입 완료
              </span>
              <span>
                <b>v1 · v2 · v3</b>
                {" 같은 마켓"}
              </span>
            </p>
          </div>
          <div className="um-ways">
            <Link className="um-way is-sell" href="/used/sell">
              <small>SELL</small>
              <b>내 키보드 팔기</b>
              <span>사진 올리기 → 공방 검수 → 매입가 제안 → 동의하면 바로 입금</span>
              <em>판매 신청하기 →</em>
            </Link>
            <a href="#market" className="um-way is-buy">
              <small>BUY</small>
              <b>공방 검수 중고 사기</b>
              <span>수리 내역 · 성능 점검 공개, 공방이 직접 팔고 보증합니다</span>
              <em>매물 보기 ↓</em>
            </a>
          </div>
        </section>
        <section id="market" className="um-market" aria-labelledby="um-market-t">
          <div className="um-bar">
            <h2 id="um-market-t" className="uc-sec" style={{ margin: "0" }}>
              {"지금 올라온 매물 "}
              <small>곧 첫 매물이 올라옵니다</small>
            </h2>
            <form className="um-search" role="search" action="/used#market">
              <input placeholder="모델 · 브랜드 · 스위치 · 배열 검색" aria-label="중고 매물 검색" name="q" defaultValue="" />
              <button type="submit" className="uc-btn">
                검색
              </button>
            </form>
          </div>
          <nav className="um-chips" aria-label="매물 거르기">
            <Link aria-current="true" href="/used#market">
              전체 등급
            </Link>
            <Link href="/used?grade=S#market">S급</Link>
            <Link href="/used?grade=A#market">A급</Link>
            <Link href="/used?grade=B#market">B급</Link>
            <Link href="/used?grade=C#market">C급</Link>
            <span className="um-sep" aria-hidden="true" />
            <Link aria-current="true" href="/used#market">
              최신순
            </Link>
            <Link href="/used?sort=low#market">낮은 가격순</Link>
            <Link href="/used?sort=high#market">높은 가격순</Link>
            <span className="um-sep" aria-hidden="true" />
            <Link href="/used?sold=1#market">거래 완료 포함</Link>
          </nav>
          <div className="uc-empty">
            <b>아직 올라온 매물이 없습니다.</b>공방이 매입해 수리를 마친 키보드부터 차례로 올라옵니다. 첫 판매자가 되어 보세요.
            <div className="uc-cta" style={{ justifyContent: "center" }}>
              <Link className="uc-btn is-primary" href="/used/sell">
                내 키보드 팔기
              </Link>
            </div>
          </div>
        </section>
        <section className="um-two">
          <div className="um-panel">
            <h2 className="uc-sec" style={{ marginTop: "0" }}>
              {"최근 매입 시세 "}
              <small>공방이 회원에게 실제로 사들인 값입니다. 내 키보드 시세 가늠용.</small>
            </h2>
            <p className="uc-note" style={{ marginTop: "0" }}>
              첫 매입이 끝나면 여기에 모델 · 등급 · 매입가가 쌓입니다. 판매자 정보는 나오지 않습니다.
            </p>
            <Link className="uc-btn is-primary" style={{ marginTop: "14px" }} href="/used/sell">
              내 키보드 시세 받아 보기
            </Link>
          </div>
          <div className="um-panel">
            <h2 className="uc-sec" style={{ marginTop: "0" }}>
              왜 클랙 중고마켓인가요
            </h2>
            <ul className="um-why">
              <li>
                <b>파는 사람</b>직거래 약속 · 택배 사기 · 네고 문의 없이, 공방이 검수하고 값을 매겨 바로 사 갑니다.
              </li>
              <li>
                <b>사는 사람</b>사진만 보고 사지 않아도 됩니다. 전 키 · 스태빌 · 타건음 점검과 수리 내역을 공개합니다.
              </li>
              <li>
                <b>공방 보증</b>판매자는 공방입니다. 교환 · 환불 · 검수 항목 무상 수리를 공방이 책임집니다.
              </li>
            </ul>
          </div>
        </section>
        <h2 className="uc-sec">
          {"키보드 파는 순서 "}
          <small>판매자 거래는 입금으로 끝납니다. 그 뒤 수리 · 재판매는 공방이 합니다.</small>
        </h2>
        <ol className="uc-steps">
          <li>
            <b>판매 신청</b>
            <p>사진 몇 장과 모델 · 상태를 올리면 접수번호가 바로 나옵니다.</p>
          </li>
          <li>
            <b>택배 · 방문</b>
            <p>택배로 보내시거나 성남 공방에 직접 가져오세요.</p>
          </li>
          <li>
            <b>공방 검수</b>
            <p>전 키 입력 · 채터링 · 스태빌 · 타건음 · 외관을 하나씩 확인합니다.</p>
          </li>
          <li>
            <b>매입가 제안</b>
            <p>검수 결과와 등급, 공방이 사들일 가격을 화면으로 보내 드립니다.</p>
          </li>
          <li>
            <b>동의 · 바로 입금</b>
            <p>동의하면서 계좌를 적으시면 공방이 매입 대금을 보내 드립니다. 거래 끝.</p>
          </li>
          <li className="is-shop">
            <em>공방 몫</em>
            <b>수리 · 마켓 재판매</b>
            <p>공방이 손보고 검수 리포트를 붙여 중고마켓에 다시 올립니다.</p>
          </li>
        </ol>
        <h2 className="uc-sec">
          {"등급 기준 "}
          <small>기능은 모든 등급에서 정상입니다. 등급은 사용감 · 외관 기준입니다.</small>
        </h2>
        <div className="uc-grades">
          <div className="uc-grade">
            <b>S</b>
            <p>새것에 가까움</p>
          </div>
          <div className="uc-grade">
            <b>A</b>
            <p>사용감 적음</p>
          </div>
          <div className="uc-grade">
            <b>B</b>
            <p>사용감 있음</p>
          </div>
          <div className="uc-grade">
            <b>C</b>
            <p>외관 흠 있음(기능 정상)</p>
          </div>
        </div>
        <p className="uc-note">
          <Link href="/used/my">내 판매 내역 보기 →</Link>
        </p>
        <Link className="um-fab" data-sell-fab="" href="/used/sell">
          <span aria-hidden="true">＋</span>내 키보드 팔기
        </Link>
      </main>
      <Tail />
    </>
  );
}
