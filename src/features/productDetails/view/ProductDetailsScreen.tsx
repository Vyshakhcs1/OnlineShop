import React, { useState } from 'react';
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { RootStackParamList } from '../../../app/navigation/types';
import { STORE_DEPARTMENTS } from '../../../shared/constants/storeOptions';
import { RelatedProduct } from '../../../shared/models/product';
import { useProductDetailsViewModel } from '../viewModel/useProductDetailsViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen({ navigation, route }: Props) {
  const detail = useProductDetailsViewModel(route.params.productId);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isSizeGuideVisible, setIsSizeGuideVisible] = useState(false);

  if (!detail.product) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Product unavailable</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>GO BACK</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const product = detail.product;
  const productImageUrl = product.detailImageUrl ?? product.imageUrl;
  const selectedColor = product.colors[detail.selectedColorIndex];
  const productDetails = product.productDetails ?? [product.description];

  const renderRelatedProduct = ({ item }: { item: RelatedProduct }) => (
    <View style={styles.relatedCard}>
      <View style={styles.relatedImageFrame}>
        <Image
          resizeMode="contain"
          source={{ uri: item.imageUrl }}
          style={styles.relatedImage}
        />
      </View>
      <Text numberOfLines={1} style={styles.relatedTitle}>
        {item.title}
      </Text>
      <Text style={styles.relatedPrice}>
        {product.currency} {product.price}
      </Text>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.topBar}>
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={() => navigation.goBack()}
            style={styles.headerIconButton}
          >
            <Lucide name="arrow-left" size={23} color="#111111" />
          </Pressable>
          <Text style={styles.headerTitle}>PRODUCT DETAILS</Text>
          <View style={styles.headerActions}>
            <Pressable
              accessibilityLabel="Share product"
              accessibilityRole="button"
              style={styles.headerIconButton}
            >
              <Lucide name="share-2" size={20} color="#111111" />
            </Pressable>
            <Pressable
              accessibilityLabel="My account"
              accessibilityRole="button"
              onPress={() => navigation.navigate('MyAccount')}
              style={styles.profileIcon}
            >
              <Lucide name="user-round" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.departmentRow}>
            {STORE_DEPARTMENTS.map((department, index) => (
              <Text
                key={department}
                style={[
                  styles.department,
                  index === 0 && styles.activeDepartment,
                ]}
              >
                {department}
              </Text>
            ))}
          </View>

          <View style={styles.searchBox}>
            <TextInput
              accessibilityLabel="Search"
              editable={false}
              placeholder="SEARCH"
              placeholderTextColor="#333333"
              style={styles.searchInput}
            />
            <Lucide name="search" size={18} color="#555555" />
          </View>

          <View style={styles.heroContainer}>
            <Image
              accessibilityLabel={product.title}
              resizeMode="contain"
              source={{ uri: productImageUrl }}
              style={styles.heroImage}
            />
            <Pressable
              accessibilityLabel={
                detail.isFavorite ? 'Remove from wishlist' : 'Add to wishlist'
              }
              accessibilityRole="button"
              onPress={detail.toggleFavorite}
              style={styles.favoriteButton}
            >
              <Lucide
                name="heart"
                size={21}
                color={detail.isFavorite ? '#C41E2B' : '#111111'}
              />
            </Pressable>
            <Pressable
              accessibilityLabel="View full-size product image"
              accessibilityRole="button"
              onPress={() => setIsImageExpanded(true)}
              style={styles.expandButton}
            >
              <Lucide name="expand" size={18} color="#111111" />
            </Pressable>
          </View>

          <View style={styles.productInfo}>
            <Text style={styles.productTitle}>{product.title}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.productPrice}>
                {product.currency} {product.price}
              </Text>
              <Text style={styles.taxText}>Tax included</Text>
            </View>

            <View style={styles.sectionHeadingRow}>
              <Text style={styles.sectionLabel}>Available Sizes:</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsSizeGuideVisible(true)}
              >
                <Text style={styles.sizeGuide}>SIZE GUIDE</Text>
              </Pressable>
            </View>
            <View style={styles.sizesRow}>
              {product.sizes.map(size => {
                const selected = detail.selectedSize === size;
                return (
                  <Pressable
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    key={size}
                    onPress={() => detail.setSelectedSize(size)}
                    style={[
                      styles.sizeButton,
                      selected && styles.selectedSizeButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.sizeButtonText,
                        selected && styles.selectedSizeText,
                      ]}
                    >
                      {size}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View style={styles.colorHeading}>
              <Text style={styles.sectionLabel}>Colors:</Text>
              <Text style={styles.selectedColorName}>
                {selectedColor?.name.toUpperCase()}
              </Text>
            </View>
            <View style={styles.colorsRow}>
              {product.colors.map((color, index) => {
                const selected = index === detail.selectedColorIndex;
                return (
                  <Pressable
                    accessibilityLabel={color.name}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    key={`${product.id}-${color.name}`}
                    onPress={() => detail.setSelectedColorIndex(index)}
                    style={[
                      styles.colorButton,
                      { backgroundColor: color.hex },
                      selected && styles.selectedColorButton,
                    ]}
                  >
                    {selected ? (
                      <Lucide
                        name="check"
                        size={17}
                        color={
                          color.hex.toLowerCase() === '#ffffff'
                            ? '#111111'
                            : '#FFFFFF'
                        }
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </View>

            <Pressable
              accessibilityRole="button"
              onPress={() => detail.addToBag(detail.selectedColorIndex)}
              style={[
                styles.addToBagButton,
                detail.isAddedToBag && styles.addedToBagButton,
              ]}
            >
              <Lucide
                name={detail.isAddedToBag ? 'check' : 'shopping-bag'}
                size={18}
                color="#FFFFFF"
              />
              <Text style={styles.addToBagText}>
                {detail.isAddedToBag
                  ? 'ADDED TO BAG'
                  : `ADD TO BAG  •  ${product.currency} ${product.price}`}
              </Text>
            </Pressable>
          </View>

          <View style={styles.descriptionCard}>
            <Text style={styles.descriptionHeading}>DESCRIPTION</Text>
            <Text style={styles.descriptionText}>{product.description}</Text>
            {(detail.isDescriptionExpanded
              ? productDetails
              : productDetails.slice(0, 3)
            ).map(line => (
              <View key={line} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>{line}</Text>
              </View>
            ))}
            {productDetails.length > 3 ? (
              <Pressable
                accessibilityRole="button"
                onPress={() =>
                  detail.setIsDescriptionExpanded(!detail.isDescriptionExpanded)
                }
              >
                <Text style={styles.readMore}>
                  {detail.isDescriptionExpanded ? 'READ LESS' : 'READ MORE'}
                </Text>
              </Pressable>
            ) : null}
            <View style={styles.promisesRow}>
              <View style={styles.promise}>
                <Lucide name="truck" size={16} color="#666666" />
                <Text style={styles.promiseText}>FREE EXPRESS DELIVERY</Text>
              </View>
              <View style={styles.promise}>
                <Lucide name="badge-check" size={16} color="#666666" />
                <Text style={styles.promiseText}>100% AUTHENTIC</Text>
              </View>
            </View>
          </View>

          <View style={styles.relatedHeader}>
            <Text style={styles.descriptionHeading}>SEE MORE PRODUCTS</Text>
            <Text style={styles.styleCount}>
              {product.relatedProducts.length} STYLES
            </Text>
          </View>
          <FlatList
            contentContainerStyle={styles.relatedList}
            data={product.relatedProducts}
            horizontal
            keyExtractor={item => `${product.id}-${item.title}`}
            renderItem={renderRelatedProduct}
            showsHorizontalScrollIndicator={false}
          />
        </ScrollView>
      </View>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsImageExpanded(false)}
        visible={isImageExpanded}
      >
        <View style={styles.fullscreen}>
          <Pressable
            accessibilityLabel="Close full-size image"
            accessibilityRole="button"
            onPress={() => setIsImageExpanded(false)}
            style={styles.fullscreenClose}
          >
            <Lucide name="x" size={22} color="#FFFFFF" />
          </Pressable>
          <Image
            accessibilityLabel={`${product.title}, full-size`}
            resizeMode="contain"
            source={{ uri: productImageUrl }}
            style={styles.fullscreenImage}
          />
          <Text style={styles.fullscreenHint}>HIGH DEFINITION DETAIL</Text>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsSizeGuideVisible(false)}
        transparent
        visible={isSizeGuideVisible}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.sizeGuideCard}>
            <View style={styles.sizeGuideHeader}>
              <Text style={styles.descriptionHeading}>SIZE GUIDE</Text>
              <Pressable
                accessibilityLabel="Close size guide"
                onPress={() => setIsSizeGuideVisible(false)}
              >
                <Lucide name="x" size={20} color="#111111" />
              </Pressable>
            </View>
            <Text style={styles.sizeGuideCopy}>
              Choose your usual size for a comfortable fit.
            </Text>
            <View style={styles.sizeGuideTable}>
              <Text style={styles.sizeGuideTableText}>SIZE CHEST</Text>
              {product.sizes.map((size, index) => (
                <Text key={size} style={styles.sizeGuideTableText}>
                  {size.padEnd(8, ' ')}
                  {(88 + index * 6).toString()} cm
                </Text>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activeDepartment: {
    color: '#111111',
  },
  addToBagButton: {
    alignItems: 'center',
    backgroundColor: '#050505',
    borderRadius: 6,
    flexDirection: 'row',
    gap: 12,
    height: 50,
    justifyContent: 'center',
    marginTop: 24,
  },
  addToBagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  addedToBagButton: {
    backgroundColor: '#164C3B',
  },
  backLink: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 18,
  },
  bullet: {
    color: '#111111',
    fontSize: 18,
    lineHeight: 25,
    marginRight: 8,
  },
  bulletRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 7,
  },
  bulletText: {
    color: '#262626',
    flex: 1,
    fontSize: 14,
    lineHeight: 22,
  },
  colorButton: {
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderRadius: 7,
    borderWidth: 2,
    height: 40,
    justifyContent: 'center',
    marginRight: 10,
    width: 40,
  },
  colorHeading: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    marginTop: 20,
  },
  colorsRow: {
    flexDirection: 'row',
    marginTop: 9,
  },
  department: {
    color: '#666666',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginRight: 24,
  },
  departmentRow: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  descriptionCard: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 28,
    padding: 16,
  },
  descriptionHeading: {
    color: '#151515',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  descriptionText: {
    color: '#222222',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 10,
  },
  expandButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.86)',
    borderRadius: 8,
    bottom: 12,
    height: 38,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    width: 38,
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    position: 'absolute',
    right: 12,
    top: 12,
    width: 40,
  },
  fullscreen: {
    alignItems: 'center',
    backgroundColor: '#111111',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  fullscreenClose: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    position: 'absolute',
    right: 18,
    top: 50,
    width: 44,
    zIndex: 1,
  },
  fullscreenHint: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    marginTop: 18,
  },
  fullscreenImage: {
    height: '72%',
    width: '100%',
  },
  headerActions: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  headerIconButton: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  headerTitle: {
    color: '#111111',
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  heroContainer: {
    aspectRatio: 0.82,
    backgroundColor: '#F1F1F1',
    borderRadius: 9,
    marginHorizontal: 16,
    marginTop: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  heroImage: {
    height: '100%',
    width: '100%',
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  notFound: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  notFoundTitle: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '700',
  },
  priceRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: 10,
    marginTop: 4,
  },
  productInfo: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  productPrice: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '700',
  },
  productTitle: {
    color: '#111111',
    fontSize: 23,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  profileIcon: {
    alignItems: 'center',
    backgroundColor: '#050505',
    borderRadius: 15,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  promise: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
    marginRight: 14,
  },
  promiseText: {
    color: '#666666',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0.35,
  },
  promisesRow: {
    borderTopColor: '#DDDDDD',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 22,
    paddingTop: 16,
  },
  relatedCard: {
    marginRight: 12,
    width: 132,
  },
  relatedHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingHorizontal: 16,
  },
  relatedImage: {
    height: '100%',
    width: '100%',
  },
  relatedImageFrame: {
    aspectRatio: 0.9,
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    padding: 8,
  },
  relatedList: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  relatedPrice: {
    color: '#666666',
    fontSize: 12,
    marginTop: 3,
  },
  relatedTitle: {
    color: '#171717',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  screen: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 28,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 16,
    paddingHorizontal: 12,
  },
  searchInput: {
    color: '#111111',
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.8,
    padding: 0,
  },
  sectionHeadingRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
  },
  sectionLabel: {
    color: '#666666',
    fontSize: 14,
  },
  selectedColorButton: {
    borderColor: '#111111',
  },
  selectedColorName: {
    color: '#111111',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.7,
  },
  selectedSizeButton: {
    backgroundColor: '#050505',
  },
  selectedSizeText: {
    color: '#FFFFFF',
  },
  sizeButton: {
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 6,
    height: 46,
    justifyContent: 'center',
    marginRight: 10,
    width: 46,
  },
  sizeButtonText: {
    color: '#111111',
    fontSize: 14,
    fontWeight: '700',
  },
  sizeGuide: {
    borderBottomColor: '#111111',
    borderBottomWidth: 1,
    color: '#111111',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.7,
    paddingBottom: 2,
  },
  sizeGuideCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  sizeGuideCopy: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 12,
  },
  sizeGuideHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sizeGuideTable: {
    gap: 12,
    marginTop: 20,
  },
  sizeGuideTableText: {
    color: '#222222',
    fontSize: 13,
  },
  sizesRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  styleCount: {
    color: '#666666',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  taxText: {
    color: '#777777',
    fontSize: 12,
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    height: 52,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  safeArea: {
    backgroundColor: '#FAFAFA',
    flex: 1,
  },
  readMore: {
    color: '#111111',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginTop: 12,
  },
});
