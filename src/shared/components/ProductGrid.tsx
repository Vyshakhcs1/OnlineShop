import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { Product } from '../models/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
  ListEmptyComponent?: React.ReactElement;
  ListHeaderComponent?: React.ReactElement;
  onProductPress?: (productId: string) => void;
  products: Product[];
}

export default function ProductGrid({
  ListEmptyComponent,
  ListHeaderComponent,
  onProductPress,
  products,
}: ProductGridProps) {
  const renderProduct: ListRenderItem<Product> = ({ item }) => (
    <View style={styles.productCell}>
      <ProductCard onPress={onProductPress} product={item} />
    </View>
  );

  return (
    <FlatList
      ListEmptyComponent={ListEmptyComponent}
      ListHeaderComponent={ListHeaderComponent}
      columnWrapperStyle={styles.productRow}
      contentContainerStyle={styles.content}
      data={products}
      initialNumToRender={6}
      ItemSeparatorComponent={ProductRowSeparator}
      keyExtractor={product => product.id}
      maxToRenderPerBatch={6}
      numColumns={2}
      removeClippedSubviews
      renderItem={renderProduct}
      windowSize={5}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  productRow: {
    flexDirection: 'row',
    gap: 12,
  },
  productCell: {
    flex: 1,
  },
  rowSeparator: {
    height: 14,
  },
});

function ProductRowSeparator() {
  return <View style={styles.rowSeparator} />;
}
