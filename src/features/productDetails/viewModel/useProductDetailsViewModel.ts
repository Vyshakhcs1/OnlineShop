import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import { addCartItem } from '../../../app/store/slices/cartSlice';
import { toggleWishlistProduct } from '../../../app/store/slices/wishlistSlice';
import { findProductById } from '../model/productDetailsModel';

export function useProductDetailsViewModel(productId: string) {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);
  const wishlist = useAppSelector(state => state.wishlist);
  const product = findProductById(products, productId);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes.includes('M') ? 'M' : product?.sizes[0] ?? '',
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const cart = useAppSelector(state => state.cart);
  const isFavorite = wishlist.some(item => item.id === productId);
  const isAddedToBag = cart.some(item => item.product.id === productId);

  const addToBag = (colorIndex: number) => {
    const color = product?.colors[colorIndex];
    if (product && color && selectedSize) {
      dispatch(addCartItem({ product, size: selectedSize, color }));
    }
  };

  const toggleFavorite = () => {
    if (product) {
      dispatch(toggleWishlistProduct(product));
    }
  };

  return {
    isAddedToBag,
    isDescriptionExpanded,
    isFavorite,
    product,
    selectedColorIndex,
    selectedSize,
    setIsDescriptionExpanded,
    setSelectedColorIndex,
    setSelectedSize,
    addToBag,
    toggleFavorite,
  };
}
