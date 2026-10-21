import { useAppSelector } from '../../../app/store/hooks';

export function useWishlistViewModel() {
  const products = useAppSelector(state => state.wishlist);

  return { products };
}
