import React, { useCallback } from 'react';
import {
  Alert,
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { useAppDispatch } from '../../../app/store/hooks';
import { RootStackParamList } from '../../../app/navigation/types';
import {
  removeCartItem,
  updateCartItemQuantity,
} from '../../../app/store/slices/cartSlice';
import {
  BAG_ASSURANCES,
  BAG_CHECKOUT_ALERT_MESSAGE,
  BAG_CHECKOUT_ALERT_TITLE,
  BAG_CURRENCY,
  BAG_DELIVERY_ADDRESS,
  BAG_PROMOTION_LABEL,
  BAG_PROMOTION_PERCENT,
  BAG_VOUCHER_LABEL,
} from '../../../shared/constants/cart';
import EmptyState from '../../../shared/components/EmptyState';
import StoreHeader from '../../../shared/components/StoreHeader';
import { CartItem } from '../model/cartModel';
import { useCartViewModel } from '../viewModel/useCartViewModel';

type StoreNavigation = NavigationProp<{ Shop: undefined }>;

export default function CartScreen() {
  const navigation = useNavigation<StoreNavigation>();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();
  const cart = useCartViewModel();

  const formatPrice = (price: number) => `${BAG_CURRENCY} ${price.toFixed(2)}`;

  const updateQuantity = useCallback(
    (item: CartItem, quantityChange: number) => {
      dispatch(
        updateCartItemQuantity({
          productId: item.product.id,
          size: item.size,
          colorName: item.color.name,
          quantityChange,
        }),
      );
    },
    [dispatch],
  );

  const renderItem: ListRenderItem<CartItem> = ({ item }) => (
    <View style={styles.cartItem}>
      <Image
        accessibilityLabel={item.product.title}
        resizeMode="cover"
        source={{ uri: item.product.imageUrl }}
        style={styles.productImage}
      />
      <View style={styles.itemDetails}>
        <View style={styles.itemTitleRow}>
          <Text numberOfLines={2} style={styles.productTitle}>
            {item.product.title}
          </Text>
          <Pressable
            accessibilityLabel={`Remove ${item.product.title} from bag`}
            accessibilityRole="button"
            onPress={() =>
              dispatch(
                removeCartItem({
                  productId: item.product.id,
                  size: item.size,
                  colorName: item.color.name,
                }),
              )
            }
            style={styles.removeButton}
          >
            <Lucide name="trash-2" size={17} color="#777777" />
          </Pressable>
        </View>
        <Text style={styles.itemMeta}>
          {item.color.name} / Size {item.size}
        </Text>
        <Text style={styles.itemPrice}>{formatPrice(item.product.price)}</Text>
        <View style={styles.quantityControl}>
          <Pressable
            accessibilityLabel={`Decrease ${item.product.title} quantity`}
            accessibilityRole="button"
            onPress={() => updateQuantity(item, -1)}
            style={styles.quantityButton}
          >
            <Lucide name="minus" size={14} color="#111111" />
          </Pressable>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <Pressable
            accessibilityLabel={`Increase ${item.product.title} quantity`}
            accessibilityRole="button"
            onPress={() => updateQuantity(item, 1)}
            style={styles.quantityButton}
          >
            <Lucide name="plus" size={14} color="#111111" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  const listHeader = (
    <>
      <View style={styles.deliveryCard}>
        <View style={styles.deliveryIcon}>
          <Lucide name="map-pin" size={18} color="#111111" />
        </View>
        <View style={styles.deliveryCopy}>
          <Text style={styles.deliveryLabel}>DELIVER TO</Text>
          <Text style={styles.deliveryAddress}>{BAG_DELIVERY_ADDRESS}</Text>
        </View>
        <Pressable accessibilityRole="button" style={styles.changeButton}>
          <Text style={styles.changeText}>CHANGE</Text>
        </Pressable>
      </View>
      {!cart.isEmpty ? (
        <View style={styles.sectionHeading}>
          <Text style={styles.sectionTitle}>SHOPPING BAG</Text>
          <Text style={styles.itemCount}>
            {cart.itemCount} {cart.itemCount === 1 ? 'ITEM' : 'ITEMS'}
          </Text>
        </View>
      ) : null}
    </>
  );

  const listFooter = !cart.isEmpty ? (
    <View style={styles.summaryContainer}>
      <View style={styles.voucherCard}>
        <View style={styles.voucherIcon}>
          <Lucide name="tag" size={18} color="#164C3B" />
        </View>
        <View style={styles.voucherCopy}>
          <Text style={styles.voucherTitle}>{BAG_VOUCHER_LABEL}</Text>
          <Text style={styles.voucherDescription}>
            {BAG_PROMOTION_LABEL} ({BAG_PROMOTION_PERCENT}%)
          </Text>
        </View>
        <Lucide name="circle-check" size={19} color="#57936B" />
      </View>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>ORDER SUMMARY</Text>
        <SummaryRow label="Subtotal" value={formatPrice(cart.subtotal)} />
        <SummaryRow
          label="Estimated Shipping"
          value={formatPrice(cart.shipping)}
        />
        <SummaryRow
          label={`${BAG_PROMOTION_LABEL} (${BAG_PROMOTION_PERCENT}%)`}
          value={`-${formatPrice(cart.promotionDiscount)}`}
          discount
        />
        <SummaryRow
          label="Estimated UAE VAT (5%)"
          value={formatPrice(cart.vat)}
        />
        <View style={styles.summaryDivider} />
        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.taxIncluded}>Inclusive of all local taxes</Text>
          </View>
          <Text style={styles.totalPrice}>{formatPrice(cart.total)}</Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        onPress={() =>
          Alert.alert(BAG_CHECKOUT_ALERT_TITLE, BAG_CHECKOUT_ALERT_MESSAGE)
        }
        style={styles.checkoutButton}
      >
        <Text style={styles.checkoutText}>PROCEED TO CHECKOUT</Text>
        <Lucide name="arrow-right" size={19} color="#FFFFFF" />
      </Pressable>

      <View style={styles.assurances}>
        {BAG_ASSURANCES.map(assurance => (
          <View key={assurance.label} style={styles.assuranceItem}>
            <Lucide name={assurance.icon} size={17} color="#666666" />
            <Text style={styles.assuranceText}>{assurance.label}</Text>
          </View>
        ))}
      </View>
    </View>
  ) : null;

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.screen}>
        <StoreHeader
          onAccountPress={() => rootNavigation.navigate('MyAccount')}
          title="SHOPPING BAG"
          variant="page"
        />
        <FlatList
          contentContainerStyle={styles.listContent}
          data={cart.items}
          ItemSeparatorComponent={ItemSeparator}
          keyExtractor={item =>
            `${item.product.id}-${item.size}-${item.color.name}`
          }
          ListEmptyComponent={
            <EmptyState
              actionLabel="CONTINUE SHOPPING"
              message="Your bag is waiting for something special."
              onPress={() => navigation.navigate('Shop')}
              title="Your bag is empty"
            />
          }
          ListFooterComponent={listFooter ?? undefined}
          ListHeaderComponent={listHeader}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({
  discount = false,
  label,
  value,
}: {
  discount?: boolean;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={[styles.summaryValue, discount && styles.discountValue]}>
        {value}
      </Text>
    </View>
  );
}

function ItemSeparator() {
  return <View style={styles.itemSeparator} />;
}

const styles = StyleSheet.create({
  assuranceItem: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  assuranceText: {
    color: '#666666',
    fontSize: 11,
    marginLeft: 8,
  },
  assurances: {
    paddingBottom: 18,
    paddingTop: 18,
  },
  cartItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 12,
  },
  changeButton: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  changeText: {
    color: '#111111',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: '#080808',
    borderRadius: 6,
    flexDirection: 'row',
    height: 54,
    justifyContent: 'center',
    marginTop: 14,
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginRight: 12,
  },
  deliveryAddress: {
    color: '#171717',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 3,
  },
  deliveryCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    flexDirection: 'row',
    marginBottom: 22,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  deliveryCopy: {
    flex: 1,
  },
  deliveryIcon: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    height: 38,
    justifyContent: 'center',
    marginRight: 11,
    width: 38,
  },
  deliveryLabel: {
    color: '#777777',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  discountValue: {
    color: '#397252',
  },
  itemCount: {
    color: '#707070',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 12,
  },
  itemMeta: {
    color: '#696969',
    fontSize: 11,
    marginTop: 5,
  },
  itemPrice: {
    color: '#151515',
    fontSize: 13,
    fontWeight: '700',
    marginTop: 8,
  },
  itemSeparator: {
    height: 12,
  },
  itemTitleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 14,
  },
  productImage: {
    backgroundColor: '#F0F0EF',
    borderRadius: 7,
    height: 132,
    width: 112,
  },
  productTitle: {
    color: '#171717',
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    paddingRight: 5,
  },
  quantityButton: {
    alignItems: 'center',
    borderColor: '#D8D8D8',
    borderRadius: 4,
    borderWidth: 1,
    height: 27,
    justifyContent: 'center',
    width: 29,
  },
  quantityControl: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 11,
    marginTop: 9,
  },
  quantityText: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '600',
    minWidth: 12,
    textAlign: 'center',
  },
  removeButton: {
    padding: 2,
  },
  safeArea: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  screen: {
    backgroundColor: '#F7F7F7',
    flex: 1,
  },
  sectionHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: 16,
    padding: 16,
  },
  summaryContainer: {
    paddingTop: 18,
  },
  summaryDivider: {
    backgroundColor: '#E6E6E6',
    height: StyleSheet.hairlineWidth,
    marginVertical: 14,
  },
  summaryLabel: {
    color: '#666666',
    fontSize: 12,
  },
  summaryRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  summaryTitle: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 2,
  },
  summaryValue: {
    color: '#222222',
    fontSize: 12,
    fontWeight: '600',
  },
  taxIncluded: {
    color: '#777777',
    fontSize: 10,
    marginTop: 4,
  },
  totalLabel: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  totalPrice: {
    color: '#111111',
    fontSize: 17,
    fontWeight: '700',
  },
  totalRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voucherCard: {
    alignItems: 'center',
    backgroundColor: '#EDF4EF',
    borderColor: '#D8E6DC',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  voucherCopy: {
    flex: 1,
    marginLeft: 10,
  },
  voucherDescription: {
    color: '#557260',
    fontSize: 10,
    marginTop: 3,
  },
  voucherIcon: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  voucherTitle: {
    color: '#294B36',
    fontSize: 11,
    fontWeight: '700',
  },
});
