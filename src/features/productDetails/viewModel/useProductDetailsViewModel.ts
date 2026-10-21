import { useState } from 'react';
import { findProductById } from '../model/productDetailsModel';

export function useProductDetailsViewModel(productId: string) {
  const product = findProductById(productId);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes.includes('M') ? 'M' : product?.sizes[0] ?? '',
  );
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isAddedToBag, setIsAddedToBag] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return {
    isAddedToBag,
    isDescriptionExpanded,
    isFavorite,
    product,
    selectedColorIndex,
    selectedSize,
    setIsAddedToBag,
    setIsDescriptionExpanded,
    setIsFavorite,
    setSelectedColorIndex,
    setSelectedSize,
  };
}
