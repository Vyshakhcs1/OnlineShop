import { wishlistProducts } from '../model/wishlistModel';

export function useWishlistViewModel() {
  return {
    products: wishlistProducts,
  };
}
