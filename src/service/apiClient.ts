import { API_MAX_RETRIES } from '../shared/constants/api';

async function request(
  url: string,
  retriesRemaining: number,
): Promise<unknown> {
  try {
    const response = await fetch(url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (retriesRemaining === 0) {
      throw error instanceof Error ? error : new Error('Request failed');
    }

    return request(url, retriesRemaining - 1);
  }
}

function get(url: string): Promise<unknown> {
  return request(url, API_MAX_RETRIES);
}

export const apiClient = {
  get,
};
