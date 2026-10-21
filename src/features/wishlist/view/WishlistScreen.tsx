import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../../shared/components/EmptyState';
import StoreHeader from '../../../shared/components/StoreHeader';
import ProductGrid from '../../../shared/components/ProductGrid';
import { useWishlistViewModel } from '../viewModel/useWishlistViewModel';

type StoreNavigation = NavigationProp<{ Shop: undefined }>;

export default function WishlistScreen() {
  const navigation = useNavigation<StoreNavigation>();
  const wishlist = useWishlistViewModel();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.screen}>
        <StoreHeader title="WISHLIST" variant="page" />
        <ProductGrid
          ListEmptyComponent={
            <EmptyState
              actionLabel="EXPLORE THE COLLECTION"
              message="Save your favorite pieces here for later."
              onPress={() => navigation.navigate('Shop')}
              title="Your wishlist is empty"
            />
          }
          products={wishlist.products}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  screen: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
});
