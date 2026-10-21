import cartReducer, {
  addCartItem,
  removeCartItem,
  updateCartItemQuantity,
} from '../../src/app/store/slices/cartSlice';
import { CartItem } from '../../src/features/cart/model/cartModel';
import { productFixture } from '../../src/shared/constants/fixtures';

const red = productFixture.colors[0];
const blue = { name: 'Blue', hex: '#0000FF' };
const redMedium: CartItem = {
  product: productFixture,
  size: 'M',
  color: red,
  quantity: 1,
};

describe('cart slice', () => {
  it('adds a selected product variant with quantity one', () => {
    expect(
      cartReducer(
        [],
        addCartItem({ product: productFixture, size: 'M', color: red }),
      ),
    ).toEqual([redMedium]);
  });

  it('increments quantity for the same product, size, and color', () => {
    const once = cartReducer(
      [],
      addCartItem({ product: productFixture, size: 'M', color: red }),
    );

    expect(
      cartReducer(
        once,
        addCartItem({ product: productFixture, size: 'M', color: red }),
      ),
    ).toEqual([{ ...redMedium, quantity: 2 }]);
  });

  it('keeps different sizes and colors as separate cart lines', () => {
    const withRedMedium = cartReducer(
      [],
      addCartItem({ product: productFixture, size: 'M', color: red }),
    );
    const withBlueMedium = cartReducer(
      withRedMedium,
      addCartItem({ product: productFixture, size: 'M', color: blue }),
    );

    expect(
      cartReducer(
        withBlueMedium,
        addCartItem({ product: productFixture, size: 'S', color: red }),
      ),
    ).toHaveLength(3);
  });

  it('increments and decrements the matching item quantity', () => {
    const incremented = cartReducer(
      [redMedium],
      updateCartItemQuantity({
        productId: productFixture.id,
        size: 'M',
        colorName: 'Red',
        quantityChange: 1,
      }),
    );

    expect(incremented[0].quantity).toBe(2);
    expect(
      cartReducer(
        incremented,
        updateCartItemQuantity({
          productId: productFixture.id,
          size: 'M',
          colorName: 'Red',
          quantityChange: -1,
        }),
      )[0].quantity,
    ).toBe(1);
  });

  it('removes an item when decrementing quantity to zero', () => {
    expect(
      cartReducer(
        [redMedium],
        updateCartItemQuantity({
          productId: productFixture.id,
          size: 'M',
          colorName: 'Red',
          quantityChange: -1,
        }),
      ),
    ).toEqual([]);
  });

  it('removes only the specified variant', () => {
    const blueMedium: CartItem = {
      ...redMedium,
      color: blue,
    };

    expect(
      cartReducer(
        [redMedium, blueMedium],
        removeCartItem({
          productId: productFixture.id,
          size: 'M',
          colorName: 'Red',
        }),
      ),
    ).toEqual([blueMedium]);
  });
});
