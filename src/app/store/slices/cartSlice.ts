import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../../../features/cart/model/cartModel';
import { Product, ProductColor } from '../../../shared/models/product';

interface AddCartItemPayload {
  color: ProductColor;
  product: Product;
  size: string;
}

interface UpdateCartQuantityPayload {
  colorName: string;
  productId: string;
  quantityChange: number;
  size: string;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [] as CartItem[],
  reducers: {
    addCartItem: (state, action: PayloadAction<AddCartItemPayload>) => {
      const { color, product, size } = action.payload;
      const existingItem = state.find(
        item =>
          item.product.id === product.id &&
          item.size === size &&
          item.color.name === color.name,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ color, product, quantity: 1, size });
      }
    },
    removeCartItem: (
      state,
      action: PayloadAction<{
        colorName: string;
        productId: string;
        size: string;
      }>,
    ) =>
      state.filter(
        item =>
          item.product.id !== action.payload.productId ||
          item.size !== action.payload.size ||
          item.color.name !== action.payload.colorName,
      ),
    updateCartItemQuantity: (
      state,
      action: PayloadAction<UpdateCartQuantityPayload>,
    ) => {
      const { colorName, productId, quantityChange, size } = action.payload;
      const existingIndex = state.findIndex(
        item =>
          item.product.id === productId &&
          item.size === size &&
          item.color.name === colorName,
      );

      if (existingIndex < 0) {
        return;
      }

      const item = state[existingIndex];
      const newQuantity = item.quantity + quantityChange;

      if (newQuantity <= 0) {
        state.splice(existingIndex, 1);
      } else {
        item.quantity = newQuantity;
      }
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItemQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
