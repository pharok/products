import React from 'react';
import {render, screen} from '@testing-library/react';

import CartContextProvider from '../../common/context/CartContextProvider';
import Products from './index';
import {act} from 'react-dom/test-utils';
import {mockFetch} from '../../data/__fixtures__/product';
import userEvent from '@testing-library/user-event';
beforeEach(() => {
  jest.spyOn(window, 'fetch').mockImplementation(mockFetch as jest.Mock);
});

afterEach(() => {
  jest.restoreAllMocks();
});

const MockProducts = () => {
  return (
    <CartContextProvider>
      <Products />
    </CartContextProvider>
  );
};

describe('Product filter integration tests', () => {
  it('by default all products should be visible', async () => {
    await act(async () => {
      render(<MockProducts />);
    });
    const products = screen.getAllByTestId('product');
    expect(products).toHaveLength(3);
  });

  it('only show black color products when black filter is applied', async () => {
    await act(async () => {
      render(<MockProducts />);
    });
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['Black']);
    const products = screen.getAllByTestId('product');
    expect(products).toHaveLength(2);
  });

  it('only show stone color products when stone filter is applied', async () => {
    await act(async () => {
      render(<MockProducts />);
    });
    const select = screen.getByRole('combobox');
    await userEvent.selectOptions(select, ['Stone']);
    const products = screen.getAllByTestId('product');
    expect(products).toHaveLength(1);
  });
});

describe('cart functionality integration tests', () => {
  it('initial total should be 0', async () => {
    await act(async () => {
      render(<MockProducts />);
    });
    const cartTotal = await screen.queryByText('£0.00');
    expect(cartTotal).toBeInTheDocument();
  });

  it('total should update after incrementing products', async () => {
    await act(async () => {
      render(<MockProducts />);
    });
    const increments = screen.getAllByRole('button', {name: '+'});
    await userEvent.click(increments[0]);
    await userEvent.click(increments[1]);
    await userEvent.click(increments[2]);
    const cartTotal = await screen.queryByText('£60.00');
    expect(cartTotal).toBeInTheDocument();
  });

  it('total should update after decrementing products', async () => {
    await act(async () => {
      render(<MockProducts />);
    });
    const increments = screen.getAllByRole('button', {name: '+'});
    await userEvent.click(increments[0]);
    await userEvent.click(increments[1]);
    await userEvent.click(increments[2]);
    let cartTotal = await screen.queryByText('£60.00');
    expect(cartTotal).toBeInTheDocument();

    const decrements = screen.getAllByRole('button', {name: '-'});
    await userEvent.click(decrements[0]);
    await userEvent.click(decrements[1]);
    await userEvent.click(decrements[2]);

    cartTotal = await screen.queryByText('£0.00');
    expect(cartTotal).toBeInTheDocument();
  });

  it('total should update after removing products', async () => {
    await act(async () => {
      render(<MockProducts />);
    });
    const increments = screen.getAllByRole('button', {name: '+'});
    await userEvent.click(increments[0]);
    await userEvent.click(increments[1]);
    await userEvent.click(increments[2]);
    let cartTotal = await screen.queryByText('£60.00');
    expect(cartTotal).toBeInTheDocument();

    const removes = screen.getAllByRole('button', {name: 'remove'});
    await userEvent.click(removes[0]);
    await userEvent.click(removes[1]);
    await userEvent.click(removes[2]);

    cartTotal = await screen.queryByText('£0.00');
    expect(cartTotal).toBeInTheDocument();
  });
});
