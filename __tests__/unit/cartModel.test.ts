import {
  calculateCartSummary,
  CartItem,
} from '../../src/features/cart/model/cartModel';
import { productFixture } from '../../src/shared/constants/fixtures';

const item: CartItem = {
  product: productFixture,
  size: 'M',
  color: productFixture.colors[0],
  quantity: 1,
};

describe('calculateCartSummary', () => {
  it('returns zero totals for an empty cart', () => {
    expect(calculateCartSummary([])).toEqual({
      itemCount: 0,
      subtotal: 0,
      promotionDiscount: 0,
      shipping: 0,
      vat: 0,
      total: 0,
    });
  });

  it('calculates count, subtotal, discount, shipping, VAT, and total', () => {
    expect(calculateCartSummary([{ ...item, quantity: 2 }])).toEqual({
      itemCount: 2,
      subtotal: 200,
      promotionDiscount: 20,
      shipping: 30,
      vat: 10.5,
      total: 220.5,
    });
  });

  it('aggregates multiple product lines and their quantities', () => {
    const secondItem: CartItem = {
      ...item,
      product: { ...productFixture, id: 'tee-blue', price: 150 },
      size: 'L',
      quantity: 3,
    };

    expect(calculateCartSummary([item, secondItem])).toEqual({
      itemCount: 4,
      subtotal: 550,
      promotionDiscount: 55,
      shipping: 30,
      vat: 26.25,
      total: 551.25,
    });
  });
});
