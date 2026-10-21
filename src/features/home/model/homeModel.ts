import { HOME_CATEGORIES } from '../../../shared/constants/storeOptions';
import { API_GCP_URL } from '../../../shared/constants/api';
import { apiClient } from '../../../service/apiClient';
import { Product } from '../../../shared/models/product';

export type HomeCategory = (typeof HOME_CATEGORIES)[number];

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const product = value as Record<string, unknown>;
  const isStringArray = (items: unknown): items is string[] =>
    Array.isArray(items) && items.every(item => typeof item === 'string');

  return (
    typeof product.id === 'string' &&
    typeof product.imageUrl === 'string' &&
    (typeof product.detailImageUrl === 'string' ||
      product.detailImageUrl === undefined) &&
    (typeof product.tag === 'string' || product.tag === null) &&
    typeof product.title === 'string' &&
    typeof product.price === 'number' &&
    typeof product.currency === 'string' &&
    typeof product.category === 'string' &&
    isStringArray(product.sizes) &&
    Array.isArray(product.colors) &&
    product.colors.every(
      color =>
        typeof color === 'object' &&
        color !== null &&
        'name' in color &&
        typeof color.name === 'string' &&
        'hex' in color &&
        typeof color.hex === 'string',
    ) &&
    typeof product.description === 'string' &&
    (product.productDetails === undefined ||
      isStringArray(product.productDetails)) &&
    Array.isArray(product.relatedProducts) &&
    product.relatedProducts.every(
      relatedProduct =>
        typeof relatedProduct === 'object' &&
        relatedProduct !== null &&
        'title' in relatedProduct &&
        typeof relatedProduct.title === 'string' &&
        'imageUrl' in relatedProduct &&
        typeof relatedProduct.imageUrl === 'string',
    )
  );
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiClient.get(API_GCP_URL);

  if (!Array.isArray(response) || !response.every(isProduct)) {
    throw new Error('The product API returned invalid product data.');
  }

  return response;
}
