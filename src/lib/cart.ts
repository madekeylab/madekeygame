import { getProduct } from '../data/products';
import type { CartLine } from '../data/types';

export function cartSubtotal(cart: CartLine[]): number {
  return cart.reduce((s, l) => s + (getProduct(l.productId)?.price ?? 0) * l.quantity, 0);
}
