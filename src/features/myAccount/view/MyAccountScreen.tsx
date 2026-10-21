import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lucide } from '@react-native-vector-icons/lucide/static';
import { RootStackParamList } from '../../../app/navigation/types';
import StoreHeader from '../../../shared/components/StoreHeader';
import { useMyAccountViewModel } from '../viewModel/useMyAccountViewModel';

type Props = NativeStackScreenProps<RootStackParamList, 'MyAccount'>;

export default function MyAccountScreen({ navigation }: Props) {
  const viewModel = useMyAccountViewModel();
  const { loadProfile } = viewModel;

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.screen}>
        <StoreHeader
          onBackPress={() => navigation.goBack()}
          title="MY ACCOUNT"
          variant="page"
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {viewModel.isLoading ? (
            <View accessibilityRole="progressbar" style={styles.requestState}>
              <ActivityIndicator color="#111111" size="large" />
              <Text style={styles.requestMessage}>Loading account...</Text>
            </View>
          ) : viewModel.errorMessage ? (
            <View style={styles.requestState}>
              <Text style={styles.requestTitle}>
                Couldn’t load account details
              </Text>
              <Text style={styles.requestMessage}>
                {viewModel.errorMessage}
              </Text>
              <Pressable
                accessibilityRole="button"
                onPress={loadProfile}
                style={styles.retryButton}
              >
                <Text style={styles.retryButtonText}>TRY AGAIN</Text>
              </Pressable>
            </View>
          ) : viewModel.account ? (
            <>
              <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                  <Image
                    accessibilityLabel={`${viewModel.account.profile.name} profile`}
                    source={{ uri: viewModel.account.profile.image }}
                    style={styles.avatar}
                  />
                  <View style={styles.verifiedBadge}>
                    <Lucide name="check" size={13} color="#FFFFFF" />
                  </View>
                </View>
                <Text style={styles.profileName}>
                  {viewModel.account.profile.name}
                </Text>
              </View>

              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>IDENTITY MATRIX</Text>
              </View>

              <View style={styles.identityCard}>
                {viewModel.account.identityDetails.map((detail, index) => (
                  <View key={detail.label}>
                    {index > 0 ? <View style={styles.rowDivider} /> : null}
                    <View style={styles.identityRow}>
                      <View style={styles.identityIcon}>
                        <Lucide name={detail.icon} size={19} color="#555555" />
                      </View>
                      <View style={styles.identityCopy}>
                        <Text style={styles.identityLabel}>{detail.label}</Text>
                        <Text style={styles.identityValue}>{detail.value}</Text>
                      </View>
                      <Lucide name="chevron-right" size={18} color="#A0A0A0" />
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.signOutButton}>
                <Lucide name="log-out" size={19} color="#8F2D2D" />
                <Text style={styles.signOutText}>
                  {viewModel.account.signOutLabel}
                </Text>
              </View>

              <View style={styles.sessionFooter}>
                <Text style={styles.versionText}>
                  APP VERSION {viewModel.account.appVersion}
                </Text>
                <View style={styles.sessionStatus}>
                  <View style={styles.sessionDot} />
                  <Text style={styles.sessionText}>
                    {viewModel.account.sessionStatus}
                  </Text>
                </View>
              </View>
            </>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: '#E8E8E8',
    borderRadius: 48,
    height: 96,
    width: 96,
  },
  avatarContainer: {
    marginBottom: 18,
    position: 'relative',
  },
  identityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  identityCopy: {
    flex: 1,
  },
  identityIcon: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    borderRadius: 20,
    height: 40,
    justifyContent: 'center',
    marginRight: 13,
    width: 40,
  },
  identityLabel: {
    color: '#737373',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  identityRow: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 66,
  },
  identityValue: {
    color: '#1A1C1C',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginBottom: 25,
    paddingHorizontal: 24,
    paddingVertical: 28,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  profileName: {
    color: '#111111',
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
  requestMessage: {
    color: '#737373',
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
  },
  requestState: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
    paddingHorizontal: 20,
  },
  requestTitle: {
    color: '#111111',
    fontSize: 16,
    fontWeight: '700',
  },
  retryButton: {
    backgroundColor: '#111111',
    borderRadius: 6,
    marginTop: 18,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  rowDivider: {
    backgroundColor: '#EEEEEE',
    height: StyleSheet.hairlineWidth,
    marginLeft: 53,
  },
  safeArea: {
    backgroundColor: '#F9F9F9',
    flex: 1,
  },
  screen: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 36,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionHeader: {
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    color: '#111111',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  sessionDot: {
    backgroundColor: '#57936B',
    borderRadius: 3,
    height: 6,
    marginRight: 7,
    width: 6,
  },
  sessionFooter: {
    alignItems: 'center',
    marginTop: 27,
  },
  sessionStatus: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  sessionText: {
    color: '#7A7A7A',
    fontSize: 10,
    letterSpacing: 0.4,
  },
  signOutButton: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#EADADA',
    borderRadius: 9,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
    minHeight: 52,
  },
  signOutText: {
    color: '#8F2D2D',
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 10,
  },
  verifiedBadge: {
    alignItems: 'center',
    backgroundColor: '#111111',
    borderColor: '#FFFFFF',
    borderRadius: 11,
    borderWidth: 2,
    bottom: 0,
    height: 23,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    width: 23,
  },
  versionText: {
    color: '#818181',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 1,
  },
});
