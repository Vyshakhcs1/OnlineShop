import { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store/hooks';
import {
  APPAREL_SIZES,
  HOME_CATEGORIES,
} from '../../../shared/constants/storeOptions';
import { setProducts } from '../../../app/store/slices/productsSlice';
import { fetchProducts, HomeCategory } from '../model/homeModel';

export function useHomeViewModel() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.products);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HomeCategory>(
    HOME_CATEGORIES[0],
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<
    'featured' | 'lowToHigh' | 'highToLow'
  >('featured');

  const initializeCatalog = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const apiProducts = await fetchProducts();
      dispatch(setProducts(apiProducts));
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load products. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  const visibleProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory =
        selectedCategory === HOME_CATEGORIES[0] ||
        product.category === selectedCategory;
      const normalizedQuery = query.trim().toLocaleLowerCase();
      const matchesQuery =
        normalizedQuery.length === 0 ||
        `${product.title} ${product.description} ${product.colors
          .map(color => color.name)
          .join(' ')}`
          .toLocaleLowerCase()
          .includes(normalizedQuery);
      const matchesSize =
        selectedSize === null || product.sizes.includes(selectedSize);

      return matchesCategory && matchesQuery && matchesSize;
    });

    if (sortOrder === 'lowToHigh') {
      result = [...result].sort((left, right) => left.price - right.price);
    } else if (sortOrder === 'highToLow') {
      result = [...result].sort((left, right) => right.price - left.price);
    }

    return result;
  }, [products, query, selectedCategory, selectedSize, sortOrder]);

  const cycleSortOrder = () => {
    setSortOrder(current =>
      current === 'featured'
        ? 'lowToHigh'
        : current === 'lowToHigh'
        ? 'highToLow'
        : 'featured',
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSize(current => (current === size ? null : size));
  };

  const clearFilters = () => {
    setQuery('');
    setSelectedCategory(HOME_CATEGORIES[0]);
    setSelectedSize(null);
  };

  return {
    clearFilters,
    cycleSortOrder,
    errorMessage,
    initializeCatalog,
    isFilterOpen,
    isLoading,
    products: visibleProducts,
    query,
    selectedCategory,
    selectedSize,
    setIsFilterOpen,
    setQuery,
    setSelectedCategory,
    sizes: APPAREL_SIZES,
    sortLabel:
      sortOrder === 'featured'
        ? 'Sort by'
        : sortOrder === 'lowToHigh'
        ? 'Price: low to high'
        : 'Price: high to low',
    toggleSize,
  };
}
