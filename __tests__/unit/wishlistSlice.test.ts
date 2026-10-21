import wishlistReducer, {
  toggleWishlistProduct,
} from '../../src/app/store/slices/wishlistSlice';
import { productFixture } from '../../src/shared/constants/fixtures';

describe('wishlist slice', () => {
  it('adds a product when toggled on', () => {
    expect(
      wishlistReducer([], toggleWishlistProduct(productFixture)),
    ).toEqual([productFixture]);
  });

  it('removes an existing product when toggled again', () => {
    expect(
      wishlistReducer([productFixture], toggleWishlistProduct(productFixture)),
    ).toEqual([]);
  });

  it('preserves other products when toggling one product', () => {
    const otherProduct = { ...productFixture, id: 'tee-blue' };

    expect(
      wishlistReducer(
        [productFixture, otherProduct],
        toggleWishlistProduct(productFixture),
      ),
    ).toEqual([otherProduct]);
  });
});
