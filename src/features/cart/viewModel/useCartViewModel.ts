import { useMemo, useState } from 'react';
import { initialCartItems } from '../model/cartModel';

export function useCartViewModel() {
  const [items] = useState(initialCartItems);
  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [items],
  );

  return {
    isEmpty: items.length === 0,
    items,
    subtotal,
  };
}
