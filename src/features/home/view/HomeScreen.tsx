import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../app/navigation/types';
import ProductGrid from '../../../shared/components/ProductGrid';
import StoreHeader from '../../../shared/components/StoreHeader';
import { HOME_CATEGORIES } from '../../../shared/constants/storeOptions';
import { useHomeViewModel } from '../viewModel/useHomeViewModel';

export default function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const home = useHomeViewModel();
  const catalogHeader = (
    <>
      <View style={styles.catalogToolbar}>
        <Text numberOfLines={1} style={styles.catalogTitle}>
          {home.selectedCategory === HOME_CATEGORIES[0]
            ? 'MEN / TOPS'
            : `MEN / ${home.selectedCategory.toUpperCase()}`}{' '}
          <Text style={styles.productCount}>({home.products.length})</Text>
        </Text>
        <View style={styles.toolbarActions}>
          <Pressable
            accessibilityRole="button"
            onPress={home.cycleSortOrder}
            style={styles.toolbarButton}
          >
            <Text numberOfLines={1} style={styles.toolbarText}>
              {home.sortLabel}⌄
            </Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => home.setIsFilterOpen(!home.isFilterOpen)}
            style={styles.toolbarButton}
          >
            <Text style={styles.filterGlyph}>☷</Text>
            <Text style={styles.toolbarText}>Filter</Text>
          </Pressable>
        </View>
      </View>

      {home.isFilterOpen ? (
        <View style={styles.filterPanel}>
          <Text style={styles.filterHeading}>SIZE</Text>
          <View style={styles.sizeOptions}>
            {home.sizes.map(size => {
              const isSelected = home.selectedSize === size;
              return (
                <Pressable
                  accessibilityRole="button"
                  key={size}
                  onPress={() => home.toggleSize(size)}
                  style={[
                    styles.sizeOption,
                    isSelected && styles.selectedSizeOption,
                  ]}
                >
                  <Text
                    style={[
                      styles.sizeText,
                      isSelected && styles.selectedSizeText,
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      ) : null}
    </>
  );
  const emptyResults = (
    <View style={styles.emptyResults}>
      <Text style={styles.emptyResultsTitle}>No products found</Text>
      <Text style={styles.emptyResultsMessage}>
        Try another category or clear your search and size filters.
      </Text>
      <Pressable
        accessibilityLabel="View all products"
        accessibilityRole="button"
        onPress={home.clearFilters}
        style={styles.emptyResultsAction}
      >
        <Text style={styles.emptyResultsActionText}>VIEW ALL PRODUCTS</Text>
        <Text accessibilityElementsHidden style={styles.emptyResultsArrow}>
          →
        </Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.screen}>
        <StoreHeader
          footer={
            <ScrollView
              automaticallyAdjustContentInsets={false}
              contentContainerStyle={styles.categoryRow}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScrollView}
            >
              {HOME_CATEGORIES.map(category => {
                const isSelected = home.selectedCategory === category;
                return (
                  <Pressable
                    accessibilityRole="button"
                    key={category}
                    onPress={() => home.setSelectedCategory(category)}
                    style={[
                      styles.categoryPill,
                      isSelected && styles.selectedCategoryPill,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.selectedCategoryText,
                      ]}
                    >
                      {category}
                    </Text>
                  </Pressable>
                );
              })}
            </ScrollView>
          }
          onSearchChange={home.setQuery}
          searchQuery={home.query}
          variant="shop"
        />

        <ProductGrid
          ListEmptyComponent={emptyResults}
          ListHeaderComponent={catalogHeader}
          onProductPress={productId =>
            navigation.navigate('ProductDetails', { productId })
          }
          products={home.products}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  catalogTitle: {
    color: '#151515',
    flexShrink: 1,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  categoryPill: {
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 7,
    justifyContent: 'center',
    marginRight: 7,
    minHeight: 38,
    paddingHorizontal: 16,
  },
  categoryRow: {
    alignItems: 'center',
    paddingBottom: 6,
    paddingTop: 0,
  },
  categoryScrollView: {
    paddingTop: 15,
  },
  categoryText: {
    color: '#585858',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  filterGlyph: {
    color: '#111111',
    fontSize: 20,
    marginRight: 4,
  },
  filterHeading: {
    color: '#444444',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
  },
  filterPanel: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 12,
  },
  emptyResults: {
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  emptyResultsAction: {
    alignItems: 'center',
    backgroundColor: '#111111',
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
    minHeight: 44,
    paddingHorizontal: 16,
  },
  emptyResultsActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  emptyResultsArrow: {
    color: '#FFFFFF',
    fontSize: 18,
    marginLeft: 12,
  },
  emptyResultsMessage: {
    color: '#666666',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
  emptyResultsTitle: {
    color: '#151515',
    fontSize: 14,
    fontWeight: '600',
  },
  productCount: {
    color: '#666666',
    fontSize: 13,
    fontWeight: '400',
    letterSpacing: 0,
  },
  safeArea: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  screen: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  selectedCategoryPill: {
    backgroundColor: '#080808',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  selectedSizeOption: {
    backgroundColor: '#111111',
    borderColor: '#111111',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  sizeOption: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#D9D9D9',
    borderRadius: 5,
    borderWidth: 1,
    height: 34,
    justifyContent: 'center',
    minWidth: 42,
  },
  sizeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sizeText: {
    color: '#333333',
    fontSize: 12,
    fontWeight: '600',
  },
  toolbarActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  toolbarButton: {
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 7,
    flexDirection: 'row',
    height: 38,
    justifyContent: 'center',
    paddingHorizontal: 9,
  },
  toolbarText: {
    color: '#171717',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  catalogToolbar: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
