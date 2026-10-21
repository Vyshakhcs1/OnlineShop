import { useCallback, useState } from 'react';
import {
  AccountProfile,
  fetchAccountProfile,
  getAccountDetails,
} from '../model/myAccountModel';

export function useMyAccountViewModel() {
  const [profile, setProfile] = useState<AccountProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      setProfile(await fetchAccountProfile());
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Unable to load account details. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    account: profile ? getAccountDetails(profile) : null,
    errorMessage,
    isLoading,
    loadProfile,
  };
}
