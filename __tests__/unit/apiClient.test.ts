import { apiClient } from '../../src/service/apiClient';

const mockFetch = jest.fn();

beforeEach(() => {
  mockFetch.mockReset();
  Object.defineProperty(globalThis, 'fetch', {
    configurable: true,
    value: mockFetch,
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('apiClient.get', () => {
  it('returns JSON from a successful response without retrying', async () => {
    const payload = { result: 'ok' };
    mockFetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(payload),
    });

    await expect(apiClient.get('/products')).resolves.toEqual(payload);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith('/products', { method: 'GET' });
  });

  it('retries a network error and returns data when a later attempt succeeds', async () => {
    const payload = [{ id: 'tee-red' }];
    mockFetch
      .mockRejectedValueOnce(new Error('Network unavailable'))
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(payload),
      });

    await expect(apiClient.get('/products')).resolves.toEqual(payload);
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('retries non-OK responses', async () => {
    mockFetch
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue({ result: 'recovered' }),
      });

    await expect(apiClient.get('/products')).resolves.toEqual({
      result: 'recovered',
    });
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('makes only three attempts and rejects with the final failure', async () => {
    const finalError = new Error('Network unavailable');
    mockFetch
      .mockRejectedValueOnce(new Error('First failure'))
      .mockRejectedValueOnce(new Error('Second failure'))
      .mockRejectedValueOnce(finalError);

    await expect(apiClient.get('/products')).rejects.toBe(finalError);
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });

  it('rejects after three non-OK responses', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 503 });

    await expect(apiClient.get('/products')).rejects.toThrow(
      'Request failed with status 503',
    );
    expect(mockFetch).toHaveBeenCalledTimes(3);
  });
});
