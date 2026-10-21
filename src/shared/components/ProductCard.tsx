import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { Product } from '../models/product';

interface ProductCardProps {
  onPress?: (productId: string) => void;
  product: Product;
}

export default function ProductCard({ onPress, product }: ProductCardProps) {
  return (
    <Pressable
      accessibilityLabel={`View ${product.title} details`}
      accessibilityRole="button"
      onPress={() => onPress?.(product.id)}
      style={styles.card}
    >
      <View style={styles.imageContainer}>
        <Image
          accessibilityLabel={product.title}
          resizeMode="cover"
          source={{ uri: product.imageUrl }}
          style={styles.image}
        />
        {product.tag ? (
          <View style={styles.tag}>
            <Text style={styles.tagText}>{product.tag}</Text>
          </View>
        ) : null}
        <View
          accessibilityLabel="Wishlist actions will be available soon"
          accessibilityRole="image"
          style={styles.favoriteButton}
        >
          <Lucide name="heart" size={23} color="black" />
        </View>
      </View>

      <Text numberOfLines={1} style={styles.title}>
        {product.title}
      </Text>
      <Text style={styles.price}>
        {product.currency} {product.price}
      </Text>
      <View style={styles.swatches}>
        {product.colors.map((color, index) => (
          <View
            accessibilityLabel={color.name}
            key={`${product.id}-${color.name}`}
            style={[styles.swatchOuter, index === 0 && styles.selectedSwatch]}
          >
            <View style={[styles.swatch, { backgroundColor: color.hex }]} />
          </View>
        ))}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 6,
    width: '100%',
  },
  favoriteButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: 8,
    top: 8,
    width: 36,
  },
  heart: {
    color: '#111111',
    fontSize: 25,
    lineHeight: 29,
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    aspectRatio: 1,
    backgroundColor: '#EEEEEC',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  price: {
    color: '#666666',
    fontSize: 13,
    marginTop: 3,
  },
  selectedSwatch: {
    borderColor: '#111111',
    borderWidth: 1,
    height: 22,
    width: 22,
  },
  swatch: {
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 99,
    borderWidth: StyleSheet.hairlineWidth,
    height: 16,
    width: 16,
  },
  swatches: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    marginTop: 8,
    minHeight: 22,
  },
  swatchOuter: {
    alignItems: 'center',
    borderColor: 'transparent',
    borderRadius: 99,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    width: 22,
  },
  tag: {
    backgroundColor: '#111111',
    borderRadius: 3,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 4,
    position: 'absolute',
    top: 8,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  title: {
    color: '#171717',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginTop: 8,
  },
});
