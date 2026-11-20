import { NextRequest, NextResponse } from "next/server";
import { MAKERS, searchProducts } from "@/lib/catalog";
import { NAV_AXES } from "@/lib/site";

export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").trim();
  const t = q.toLowerCase();
  if (!t) return NextResponse.json({ ok: true, data: { products: [], categories: [], brands: [] } });
  const products = (t.length >= 2 ? searchProducts(q) : []).slice(0, 6).map((p) => ({
    id: p.id,
    name: p.name,
    thumbUrl: p.thumbUrl,
    salePrice: p.salePrice,
    discountRate: p.discountRate,
    brand: p.maker?.nameKo ?? "",
  }));
  const categories = NAV_AXES.map((a, i) => ({ id: i + 1, slug: a.slug, name: a.label })).filter((c) => c.name.toLowerCase().includes(t));
  const brands = MAKERS.filter((m) => m.nameKo.toLowerCase().includes(t) || m.nameEn.toLowerCase().includes(t)).map((m) => ({
    id: m.id,
    slug: m.slug,
    nameKo: m.nameKo,
    nameEn: m.nameEn,
    logoUrl: null,
  }));
  return NextResponse.json({ ok: true, data: { products, categories, brands } });
}
