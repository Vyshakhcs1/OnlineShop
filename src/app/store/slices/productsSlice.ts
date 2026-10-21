import { createSlice } from '@reduxjs/toolkit';
import { products as initialProducts } from '../../../shared/constants/productCatalog';
import { Product } from '../../../shared/models/product';

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    initializeProducts: () => initialProducts,
  },
});

export const { initializeProducts } = productsSlice.actions;
export default productsSlice.reducer;
