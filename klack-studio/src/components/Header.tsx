import Link from "next/link";
import { BRAND } from "@/lib/site";
import { CartBadge, HeaderNav, HeaderSearch } from "./HeaderParts";
import MobileNav from "./MobileNav";
import { IcoHeart, IcoUser } from "./icons";

export default function Header() {
  return (
    <header className="hdr kx-hdr">
      <div className="hdr-bar page">
        <MobileNav />
        <Link href="/" className="kx-mark" aria-label={`${BRAND.nameKo} 홈`}>
          <span className="v2-logo-cap" aria-hidden="true">
            K
          </span>
          <span className="v2-logo-word">
            klack<b>studio</b>
          </span>
        </Link>
        <HeaderNav />
        <div className="hdr-tail">
          <HeaderSearch />
          <Link href="/wishlist" className="hdr-ico kx-hide-m" aria-label="찜한 상품">
            <IcoHeart w={1.6} />
          </Link>
          <CartBadge />
          <Link href="/login" className="hdr-ico kx-hide-m" aria-label="로그인">
            <IcoUser />
          </Link>
        </div>
      </div>
    </header>
  );
}
