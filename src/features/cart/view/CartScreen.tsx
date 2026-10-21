import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '../../../shared/components/EmptyState';
import StoreHeader from '../../../shared/components/StoreHeader';
import { useCartViewModel } from '../viewModel/useCartViewModel';

type StoreNavigation = NavigationProp<{ Shop: undefined }>;

export default function CartScreen() {
  const navigation = useNavigation<StoreNavigation>();
  const cart = useCartViewModel();

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.screen}>
        <StoreHeader title="YOUR BAG" variant="page" />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {cart.isEmpty ? (
            <EmptyState
              actionLabel="CONTINUE SHOPPING"
              message="Your bag is waiting for something special."
              onPress={() => navigation.navigate('Shop')}
              title="Your bag is empty"
            />
          ) : (
            <View style={styles.cartContent}>
              {cart.items.map(item => (
                <View key={item.product.id} style={styles.cartItem}>
                  <Image
                    accessibilityLabel={item.product.title}
                    source={{ uri: item.product.imageUrl }}
                    style={styles.productImage}
                  />
                  <View style={styles.itemDetails}>
                    <Text style={styles.productTitle}>
                      {item.product.title}
                    </Text>
                    <Text style={styles.itemMeta}>
                      Quantity: {item.quantity}
                    </Text>
                    <Text style={styles.itemPrice}>
                      {item.product.currency}{' '}
                      {item.product.price * item.quantity}
                    </Text>
                  </View>
                </View>
              ))}
              <Text style={styles.subtotal}>
                Subtotal: {cart.items[0].product.currency} {cart.subtotal}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cartContent: {
    padding: 16,
  },
  cartItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 8,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 12,
  },
  itemMeta: {
    color: '#666666',
    fontSize: 12,
    marginTop: 6,
  },
  itemPrice: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  productImage: {
    backgroundColor: '#EEEEEC',
    borderRadius: 6,
    height: 84,
    width: 84,
  },
  productTitle: {
    color: '#151515',
    fontSize: 14,
    fontWeight: '600',
  },
  safeArea: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  screen: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  subtotal: {
    color: '#151515',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
    textAlign: 'right',
  },
});
