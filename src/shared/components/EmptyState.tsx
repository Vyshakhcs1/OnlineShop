import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface EmptyStateProps {
  actionLabel: string;
  compact?: boolean;
  message: string;
  onPress: () => void;
  title: string;
}

export default function EmptyState({
  actionLabel,
  compact = false,
  message,
  onPress,
  title,
}: EmptyStateProps) {
  return (
    <View style={[styles.emptyState, compact && styles.compactEmptyState]}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={[styles.emptyMessage, compact && styles.compactMessage]}>
        {message}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.emptyAction, compact && styles.compactEmptyAction]}
      >
        <Text style={styles.emptyActionText}>{actionLabel}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyAction: {
    backgroundColor: '#111111',
    borderRadius: 6,
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 13,
  },
  emptyActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  compactEmptyAction: {
    marginTop: 12,
  },
  compactEmptyIcon: {
    fontSize: 30,
    marginBottom: 4,
  },
  compactEmptyState: {
    flex: 0,
    justifyContent: 'flex-start',
    minHeight: 0,
    paddingBottom: 12,
    paddingHorizontal: 24,
    paddingTop: 8,
  },
  compactMessage: {
    marginTop: 4,
  },
  emptyIcon: {
    color: '#444444',
    fontSize: 42,
    marginBottom: 10,
  },
  emptyMessage: {
    color: '#666666',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 8,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    minHeight: 420,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#151515',
    fontSize: 18,
    fontWeight: '700',
  },
});
