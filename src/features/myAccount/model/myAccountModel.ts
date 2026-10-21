import DeviceInfo from 'react-native-device-info';
import {
  ACCOUNT_IDENTITY_DETAILS,
  ACCOUNT_SESSION_STATUS,
  ACCOUNT_SIGN_OUT_LABEL,
} from '../../../shared/constants/account';
import { API_PROFILE_URL } from '../../../shared/constants/api';
import { apiClient } from '../../../service/apiClient';

export interface AccountProfile {
  currentLocation: string;
  gender: string;
  image: string;
  name: string;
  origin: string;
  species: string;
  status: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function fetchAccountProfile(): Promise<AccountProfile> {
  const response = await apiClient.get(API_PROFILE_URL);

  if (
    !isRecord(response) ||
    !isRecord(response.origin) ||
    !isRecord(response.location) ||
    typeof response.name !== 'string' ||
    typeof response.image !== 'string' ||
    typeof response.status !== 'string' ||
    typeof response.species !== 'string' ||
    typeof response.gender !== 'string' ||
    typeof response.origin.name !== 'string' ||
    typeof response.location.name !== 'string'
  ) {
    throw new Error('The profile API returned invalid profile data.');
  }

  return {
    name: response.name,
    image: response.image,
    status: response.status,
    species: response.species,
    gender: response.gender,
    origin: response.origin.name,
    currentLocation: response.location.name,
  };
}

export function getAccountDetails(profile: AccountProfile) {
  return {
    profile,
    identityDetails: ACCOUNT_IDENTITY_DETAILS.map(detail => ({
      ...detail,
      value: profile[detail.key],
    })),
    signOutLabel: ACCOUNT_SIGN_OUT_LABEL,
    appVersion: DeviceInfo.getVersion(),
    sessionStatus: ACCOUNT_SESSION_STATUS,
  };
}
