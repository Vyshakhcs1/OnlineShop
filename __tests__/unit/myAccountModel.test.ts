import DeviceInfo from 'react-native-device-info';
import { apiClient } from '../../src/service/apiClient';
import { API_PROFILE_URL } from '../../src/shared/constants/api';
import {
  fetchAccountProfile,
  getAccountDetails,
} from '../../src/features/myAccount/model/myAccountModel';

jest.mock('../../src/service/apiClient', () => ({
  apiClient: { get: jest.fn() },
}));

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(() => '2.5.0'),
}));

const mockGet = apiClient.get as jest.MockedFunction<typeof apiClient.get>;
const profileResponse = {
  id: 2,
  name: 'Morty Smith',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '/location/1' },
  location: { name: 'Citadel of Ricks', url: '/location/3' },
  image: 'https://example.com/morty.jpg',
  episode: [],
  url: '/character/2',
  created: '2017-11-04T18:50:21.651Z',
};

describe('My Account model', () => {
  beforeEach(() => mockGet.mockReset());

  it('requests the profile and maps only the display fields', async () => {
    mockGet.mockResolvedValue(profileResponse);

    await expect(fetchAccountProfile()).resolves.toEqual({
      name: 'Morty Smith',
      image: 'https://example.com/morty.jpg',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: 'Earth',
      currentLocation: 'Citadel of Ricks',
    });
    expect(mockGet).toHaveBeenCalledWith(API_PROFILE_URL);
  });

  it('rejects malformed profile responses', async () => {
    mockGet.mockResolvedValue({
      ...profileResponse,
      origin: { url: '/location/1' },
    });

    await expect(fetchAccountProfile()).rejects.toThrow(
      'The profile API returned invalid profile data.',
    );
  });

  it('maps identity rows and gets the installed app version', () => {
    const details = getAccountDetails({
      name: 'Morty Smith',
      image: 'https://example.com/morty.jpg',
      status: 'Alive',
      species: 'Human',
      gender: 'Male',
      origin: 'Earth',
      currentLocation: 'Citadel of Ricks',
    });

    expect(details.identityDetails.map(row => [row.label, row.value])).toEqual([
      ['Species', 'Human'],
      ['Status', 'Alive'],
      ['Gender', 'Male'],
      ['Origin', 'Earth'],
      ['Current Location', 'Citadel of Ricks'],
    ]);
    expect(details.appVersion).toBe('2.5.0');
    expect(DeviceInfo.getVersion).toHaveBeenCalledTimes(1);
  });
});
