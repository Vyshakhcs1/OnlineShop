export interface ProductColor {
  name: string;
  hex: string;
}

export interface RelatedProduct {
  title: string;
  imageUrl: string;
}

export interface Product {
  id: string;
  imageUrl: string;
  detailImageUrl?: string;
  tag: string | null;
  title: string;
  price: number;
  currency: string;
  category: string;
  sizes: string[];
  colors: ProductColor[];
  description: string;
  productDetails?: string[];
  relatedProducts: RelatedProduct[];
}
