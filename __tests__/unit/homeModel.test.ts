import { apiClient } from '../../src/service/apiClient';
import { API_GCP_URL } from '../../src/shared/constants/api';
import { fetchProducts } from '../../src/features/home/model/homeModel';
import { productFixture } from '../../src/shared/constants/fixtures';

jest.mock('../../src/service/apiClient', () => ({
  apiClient: { get: jest.fn() },
}));

const mockGet = apiClient.get as jest.MockedFunction<typeof apiClient.get>;

describe('fetchProducts', () => {
  beforeEach(() => mockGet.mockReset());

  it('requests the configured URL and returns the product array unchanged', async () => {
    const products = [productFixture];
    mockGet.mockResolvedValue(products);

    await expect(fetchProducts()).resolves.toBe(products);
    expect(mockGet).toHaveBeenCalledWith(API_GCP_URL);
  });

  it('rejects a response that is not an array', async () => {
    mockGet.mockResolvedValue({ products: [productFixture] });

    await expect(fetchProducts()).rejects.toThrow(
      'The product API returned invalid product data.',
    );
  });

  it('rejects products that are missing required fields', async () => {
    const invalidProduct = { ...productFixture, price: undefined };
    mockGet.mockResolvedValue([invalidProduct]);

    await expect(fetchProducts()).rejects.toThrow(
      'The product API returned invalid product data.',
    );
  });

  it('rejects products with malformed color entries', async () => {
    mockGet.mockResolvedValue([
      { ...productFixture, colors: [{ name: 'Red', hex: 10 }] },
    ]);

    await expect(fetchProducts()).rejects.toThrow(
      'The product API returned invalid product data.',
    );
  });
});
