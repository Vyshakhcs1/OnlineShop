import { Product } from '../../../shared/models/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const initialCartItems: CartItem[] = [];
