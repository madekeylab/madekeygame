import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import CartDrawer from "@/components/CartDrawer";
import CompareBar from "@/components/CompareBar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileTab from "@/components/MobileTab";
import Motion from "@/components/Motion";
import Styles, { CORE_STYLES, WIDGET_STYLES } from "@/components/Styles";
import Toasts from "@/components/Toasts";
import { BRAND, CW_COOKIE, isColorway } from "@/lib/site";

export const metadata: Metadata = {
  // 배포 주소. 공유 이미지(og) 절대경로에 쓰인다 — 배포 환경에서 NEXT_PUBLIC_SITE_URL 을 지정한다
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: BRAND.metaTitle, template: BRAND.metaTitleTemplate },
  description: BRAND.metaDescription,
  manifest: "/manifest.webmanifest",
  icons: { icon: "/favicon.ico", apple: "/brand/klack-192.png" },
  openGraph: { title: BRAND.metaTitle, description: BRAND.metaDescription, siteName: BRAND.nameKo, locale: "ko_KR", type: "website", images: [{ url: "/og/klack-share-20261106.jpg", width: 1200, height: 630, alt: "클랙스튜디오 KLACK STUDIO" }] },
  robots: { index: false, follow: false },
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#f6f7f8" };

// 글꼴 변수 클래스 — public/css/core*.css 가 정의한다(DM Mono · Bricolage Grotesque)
const FONT_VARS = "dm_mono_1c392dbc-module__2BbqbG__variable bricolage_grotesque_2704bcbf-module__JjqCpG__variable";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const jar = await cookies();
  const cw = jar.get(CW_COOKIE)?.value;
  const showCompare = jar.get("v2cmp")?.value !== "closed";
  return (
    <html lang="ko" className={`${FONT_VARS} kx`} data-design="colorway" data-zone="shop" data-cw={isColorway(cw) && cw !== "signal" ? cw : undefined} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('ensol.gridCols')==='3')document.documentElement.setAttribute('data-mcols','3')}catch(e){}" }} />
      </head>
      <body>
        <Styles names={CORE_STYLES} />
        {showCompare && <CompareBar />}
        <Header />
        {children}
        <Footer />
        <Styles names={WIDGET_STYLES} />
        <CartDrawer />
        <Toasts />
        <Motion />
        <MobileTab />
      </body>
    </html>
  );
}
