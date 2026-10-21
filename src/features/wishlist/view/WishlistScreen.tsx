import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../../../app/navigation/types';
import EmptyState from '../../../shared/components/EmptyState';
import StoreHeader from '../../../shared/components/StoreHeader';
import ProductGrid from '../../../shared/components/ProductGrid';
import { useWishlistViewModel } from '../viewModel/useWishlistViewModel';

type StoreNavigation = NavigationProp<{ Shop: undefined }>;

export default function WishlistScreen() {
  const navigation = useNavigation<StoreNavigation>();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const wishlist = useWishlistViewModel();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.screen}>
        <StoreHeader
          onAccountPress={() => rootNavigation.navigate('MyAccount')}
          title="WISHLIST"
          variant="page"
        />
        <ProductGrid
          ListEmptyComponent={
            <EmptyState
              actionLabel="EXPLORE THE COLLECTION"
              message="Save your favorite pieces here for later."
              onPress={() => navigation.navigate('Shop')}
              title="Your wishlist is empty"
            />
          }
          onProductPress={productId =>
            rootNavigation.navigate('ProductDetails', { productId })
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
