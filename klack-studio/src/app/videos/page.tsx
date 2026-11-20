import type { Metadata } from "next";
import Link from "next/link";
import Band from "@/components/Band";
import Styles from "@/components/Styles";
import Tail from "@/components/Tail";

export const metadata: Metadata = { title: "영상관" };

export default function Page() {
  return (
    <>
      <Styles names={["shop-10", "shop-4", "shop-3", "shop-6", "shop-8", "shop-9", "shop-7", "product-videos"]} />
      <Band />
      <main className="page shop-main">
        <header className="ph">
          <div className="ph-main">
            <p className="eyebrow">Videos</p>
            <h1 className="ph-title">영상관</h1>
            <p className="ph-desc">클랙스튜디오가 유튜브에 올리는 제작기 · 타건음 · 리뷰 영상을 모았습니다.</p>
          </div>
        </header>
        <div className="vd-bar">
          <nav className="vd-tabs kx-seg" aria-label="영상 종류">
            <Link className="vd-tab" aria-current="page" href="/videos">
              전체
            </Link>
            <Link className="vd-tab" href="/videos?kind=build">
              제작기
            </Link>
            <Link className="vd-tab" href="/videos?kind=sound">
              타건음
            </Link>
            <Link className="vd-tab" href="/videos?kind=review">
              리뷰
            </Link>
            <Link className="vd-tab" href="/videos?kind=howto">
              가이드
            </Link>
          </nav>
          <p className="vd-count">
            <span>CHANNELS</span> <b>000</b>
          </p>
        </div>
        <div className="vd-off">
          <p className="vd-empty">곧 공방의 조립 · 윤활 과정과 타건 영상을 올립니다.</p>
          <ul className="vd-ph-grid" aria-hidden="true">
            <li className="vd-ph">
              <span className="vd-play" />
              <b>NO SIGNAL</b>
              <small>
                CH-01{" · "}BUILD LOG{" · 16:9"}
              </small>
            </li>
            <li className="vd-ph">
              <span className="vd-play" />
              <b>NO SIGNAL</b>
              <small>
                CH-02{" · "}SOUND TEST{" · 16:9"}
              </small>
            </li>
            <li className="vd-ph">
              <span className="vd-play" />
              <b>NO SIGNAL</b>
              <small>
                CH-03{" · "}REVIEW{" · 16:9"}
              </small>
            </li>
          </ul>
          <p className="vd-sub">쇼츠</p>
          <ul className="vd-ph-shorts" aria-hidden="true">
            <li className="vd-ph is-short">
              <span className="vd-play" />
              <small>S-01{" · 9:16"}</small>
            </li>
            <li className="vd-ph is-short">
              <span className="vd-play" />
              <small>S-02{" · 9:16"}</small>
            </li>
            <li className="vd-ph is-short">
              <span className="vd-play" />
              <small>S-03{" · 9:16"}</small>
            </li>
            <li className="vd-ph is-short">
              <span className="vd-play" />
              <small>S-04{" · 9:16"}</small>
            </li>
            <li className="vd-ph is-short">
              <span className="vd-play" />
              <small>S-05{" · 9:16"}</small>
            </li>
          </ul>
        </div>
      </main>
      <Tail />
    </>
  );
}
