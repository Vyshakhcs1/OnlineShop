import { Product, ProductColor } from '../../../shared/models/product';
import {
  BAG_PROMOTION_PERCENT,
  BAG_SHIPPING_FEE,
  BAG_VAT_PERCENT,
} from '../../../shared/constants/cart';

export interface CartItem {
  color: ProductColor;
  product: Product;
  quantity: number;
  size: string;
}

export interface CartSummary {
  itemCount: number;
  promotionDiscount: number;
  shipping: number;
  subtotal: number;
  total: number;
  vat: number;
}

export function calculateCartSummary(items: CartItem[]): CartSummary {
  const { itemCount, subtotal } = items.reduce(
    (summary, item) => ({
      itemCount: summary.itemCount + item.quantity,
      subtotal: summary.subtotal + item.product.price * item.quantity,
    }),
    { itemCount: 0, subtotal: 0 },
  );
  const promotionDiscount = subtotal * (BAG_PROMOTION_PERCENT / 100);
  const shipping = items.length > 0 ? BAG_SHIPPING_FEE : 0;
  const vat =
    ((subtotal - promotionDiscount + shipping) * BAG_VAT_PERCENT) / 100;

  return {
    itemCount,
    promotionDiscount,
    shipping,
    subtotal,
    total: subtotal - promotionDiscount + shipping + vat,
    vat,
  };
}
