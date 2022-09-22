import products from '../products.json';

export const createStubProduct = (overrides: Partial<Product>) => {
  return {
    id: 0,
    name: '',
    price: 10,
    colour: '',
    img: 'https://via.placeholder.com/160x160',
    ...overrides,
  } as Product;
};

export const mockFetch = async () => {
  return {
    ok: true,
    status: 200,
    json: async () => products,
  };
};
