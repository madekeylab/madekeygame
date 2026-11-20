import { getProduct, PRODUCTS } from "./catalog";
import type { CardProduct } from "@/components/ProductCard";
import type { Product } from "./types";

/** 카드에 필요한 필드만 추려 클라이언트로 넘긴다(옵션 그룹 전체를 싣지 않도록). */
export const toCard = (p: Product): CardProduct => ({
  id: p.id,
  name: p.name,
  categorySlug: p.categorySlug,
  listPrice: p.listPrice,
  salePrice: p.salePrice,
  discountRate: p.discountRate,
  thumbUrl: p.thumbUrl,
  stock: p.stock,
  isCustom: p.isCustom,
  optionGroups: p.optionGroups,
  specLine: p.specLine,
});
export const card = (id: number) => toCard(getProduct(id) ?? PRODUCTS[0]);
