import { products } from '../../../shared/constants/productCatalog';
import { Product } from '../../../shared/models/product';

export function findProductById(productId: string): Product | undefined {
  return products.find(product => product.id === productId);
}
