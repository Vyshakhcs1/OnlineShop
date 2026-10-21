import React from 'react';
import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { STORE_DEPARTMENTS } from '../constants/storeOptions';

interface StoreHeaderProps {
  footer?: ReactNode;
  onAccountPress?: () => void;
  onBackPress?: () => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  title?: string;
  variant: 'shop' | 'page';
}

export default function StoreHeader({
  footer,
  onAccountPress,
  onBackPress,
  onSearchChange,
  searchQuery,
  title,
  variant,
}: StoreHeaderProps) {
  return (
    <View style={[styles.header, variant === 'shop' && styles.shopHeader]}>
      <View style={styles.topBar}>
        {onBackPress ? (
          <Pressable
            accessibilityLabel="Go back"
            accessibilityRole="button"
            onPress={onBackPress}
            style={styles.backButton}
          >
            <Lucide name="arrow-left" size={23} color="#111111" />
          </Pressable>
        ) : (
          <Text accessibilityLabel="Menu" style={styles.menuIcon}>
            ☰
          </Text>
        )}
        <Text style={styles.brand}>ShopSquare</Text>
        <Pressable
          accessibilityLabel="My account"
          accessibilityRole="button"
          disabled={!onAccountPress}
          onPress={onAccountPress}
          style={styles.profileIcon}
        >
          <Lucide name="user-round" size={19} color="white" />
        </Pressable>
      </View>

      {variant === 'shop' ? (
        <>
          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>⌕</Text>
            <TextInput
              accessibilityLabel="Search collection"
              onChangeText={onSearchChange}
              placeholder="SEARCH COLLECTION..."
              placeholderTextColor="#656565"
              returnKeyType="search"
              style={styles.searchInput}
              value={searchQuery}
            />
          </View>
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
          {footer}
        </>
      ) : (
        <Text style={styles.pageHeading}>{title}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  activeDepartment: {
    borderBottomColor: '#111111',
    borderBottomWidth: 2,
    color: '#111111',
  },
  brand: {
    color: '#080808',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -1,
  },
  backButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 45,
  },
  department: {
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    color: '#666666',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginRight: 23,
    paddingBottom: 0,
  },
  departmentRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
  },
  header: {
    backgroundColor: '#FAFAFA',
    paddingBottom: 10,
    paddingHorizontal: 16,
    paddingTop: 4,
  },
  shopHeader: {
    paddingBottom: 0,
  },
  menuIcon: {
    color: '#111111',
    fontSize: 24,
    width: 45,
  },
  pageHeading: {
    color: '#161616',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 14,
  },
  profileGlyph: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: 26,
  },
  profileIcon: {
    alignItems: 'center',
    backgroundColor: '#080808',
    borderRadius: 16,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    borderRadius: 7,
    flexDirection: 'row',
    height: 42,
    marginTop: 14,
    paddingHorizontal: 14,
  },
  searchIcon: {
    color: '#555555',
    fontSize: 27,
    lineHeight: 32,
    marginRight: 10,
  },
  searchInput: {
    color: '#171717',
    flex: 1,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.9,
    padding: 0,
  },
  topBar: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 42,
    justifyContent: 'space-between',
  },
});
