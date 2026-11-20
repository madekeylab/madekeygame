import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = {
  title: "내 키보드 팔기",
  description: "쓰던 키보드를 클랙 중고마켓에 파세요. 공방이 검수하고 매입가를 제안하며, 동의하면 바로 입금해 드립니다.",
};

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "sound-used", "contest-hall-used", "product-used"]} />
      <Band />
      <main className="page shop-main">
        <section className="uc-hero">
          <p className="uc-eyebrow">KLACK USED MARKET · SELL</p>
          <h1>내 키보드 팔기</h1>
          <p className="uc-lead">
            {"사진 몇 장 올리고 키보드를 보내 주세요. 공방이 검수해 "}
            <b>매입가</b>
            {"를 제안하고, 동의하시면 "}
            <b>바로 입금</b>해 드립니다. 구매자를 찾고 흥정하고 직거래 약속을 잡을 필요가 없습니다 — 팔린 키보드는 공방이 고쳐서 중고마켓에 다시 올립니다.
          </p>
          <ul className="uc-chips">
            <li>등록비 없음</li>
            <li>매입가 마음에 안 들면 거절 가능</li>
            <li>동의하면 바로 입금</li>
            <li>개인정보는 구매자에게 안 보임</li>
          </ul>
        </section>
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
          {"판매 신청서 "}
          <small>모델명과 사진만 있어도 신청할 수 있습니다. 정확한 값은 검수 뒤에 정해집니다.</small>
        </h2>
        <div className="uc-form-wrap">
          <div>
            <div className="uc-empty">
              <b>로그인하면 판매 신청을 할 수 있습니다.</b>진행 상황 · 매입가 제안 · 입금을 내 계정에서 확인하기 위해서입니다.
              <div className="uc-cta" style={{ justifyContent: "center" }}>
                <Link className="uc-btn is-primary" href="/login?next=%2Fused%2Fsell">
                  로그인하고 신청하기
                </Link>
              </div>
            </div>
          </div>
          <aside className="uc-aside">
            <h3>보내는 곳</h3>
            <ul>
              <li>메이드키{" · "}경기도 성남시 중원구 성남대로1130번길 21-1, 3층(성남동)</li>
              <li>뽁뽁이 등으로 감싸 상자에 넣어 주세요. 키캡이 빠지지 않게 덮개가 있으면 씌워 주세요.</li>
              <li>
                {"상자 안에 "}
                <b>접수번호</b>를 적은 메모를 넣어 주세요.
              </li>
            </ul>
            <h3 style={{ marginTop: "16px" }}>사지 않는 키보드</h3>
            <ul>
              <li>침수 · 기판 손상 · 부품 도난 의심 제품</li>
              <li>개조로 원래 기능이 망가진 제품</li>
            </ul>
            <p className="uc-note">
              <Link href="/used/my">내 판매 내역 보기 →</Link>
              {" · "}
              <Link href="/used">중고마켓 매물 보기 →</Link>
            </p>
          </aside>
        </div>
        <h2 className="uc-sec">등급 기준</h2>
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
      </main>
      <Tail />
    </>
  );
}
