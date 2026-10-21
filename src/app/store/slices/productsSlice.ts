import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../shared/models/product';

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    setProducts: (_state, action: PayloadAction<Product[]>) => action.payload,
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
