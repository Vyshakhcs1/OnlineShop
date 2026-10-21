import { useMemo } from 'react';
import { useAppSelector } from '../../../app/store/hooks';
import { calculateCartSummary } from '../model/cartModel';

export function useCartViewModel() {
  const items = useAppSelector(state => state.cart);
  const summary = useMemo(() => calculateCartSummary(items), [items]);

  return {
    isEmpty: items.length === 0,
    items,
    ...summary,
  };
}
