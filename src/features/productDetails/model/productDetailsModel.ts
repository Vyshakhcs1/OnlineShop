import { Product } from '../../../shared/models/product';

export function findProductById(
  products: Product[],
  productId: string,
): Product | undefined {
  return products.find(product => product.id === productId);
}
