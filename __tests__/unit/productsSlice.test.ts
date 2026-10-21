import productsReducer, {
  setProducts,
} from '../../src/app/store/slices/productsSlice';
import { productFixture } from '../../src/shared/constants/fixtures';

describe('products slice', () => {
  it('starts with an empty product array', () => {
    expect(productsReducer(undefined, { type: 'unknown' })).toEqual([]);
  });

  it('replaces the catalog with the supplied products', () => {
    expect(
      productsReducer([], setProducts([productFixture])),
    ).toEqual([productFixture]);
  });
});
