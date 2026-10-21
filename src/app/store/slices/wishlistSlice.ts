import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../shared/models/product';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [] as Product[],
  reducers: {
    toggleWishlistProduct: (state, action: PayloadAction<Product>) => {
      const existingIndex = state.findIndex(
        product => product.id === action.payload.id,
      );

      if (existingIndex >= 0) {
        state.splice(existingIndex, 1);
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { toggleWishlistProduct } = wishlistSlice.actions;
export default wishlistSlice.reducer;
