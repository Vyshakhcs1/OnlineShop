import { Product } from '../models/product';

export const productFixture: Product = {
  id: 'tee-red',
  imageUrl: 'https://example.com/tee.jpg',
  tag: 'New',
  title: 'Red Tee',
  price: 100,
  currency: 'AED',
  category: 'T-Shirts & Tops',
  sizes: ['S', 'M'],
  colors: [{ name: 'Red', hex: '#C41E2B' }],
  description: 'A red tee.',
  relatedProducts: [],
};
