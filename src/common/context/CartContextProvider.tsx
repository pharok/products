import React, {createContext, useContext, useState} from 'react';

interface Props {
  children: React.ReactNode;
  [x: string]: any;
}

type ProductsContextType = {
  cart: CartProduct[];
  incrementProduct: (product: Product, index: number) => void;
  decrementProduct: (products: Product, index: number) => void;
  removeProduct: (products: Product, index: number) => void;
};

const CartContext = createContext<ProductsContextType | null>(null);

export const useCart = () => useContext(CartContext) as ProductsContextType;

const CartContextProvider = (props: Props) => {
  const [cart, setCart] = useState<CartProduct[]>([]);

  const incrementProduct = (product: Product, index: number) => {
    if (index === -1) {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    } else {
      setCart(
        cart.map((p) => {
          if (p.id === product.id) {
            return {
              ...p,
              quantity: p.quantity + 1,
            };
          }
          return p;
        }),
      );
    }
  };

  const decrementProduct = (product: Product, index: number) => {
    if (index !== -1) {
      if (cart[index].quantity === 1) {
        removeProduct(product, index);
      } else {
        setCart(
          cart.map((p) => {
            if (p.id === product.id) {
              return {
                ...p,
                quantity: p.quantity - 1,
              };
            }
            return p;
          }),
        );
      }
    }
  };

  const removeProduct = (product: Product, index: number) => {
    setCart([...cart.slice(0, index), ...cart.slice(index + 1)]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        incrementProduct,
        decrementProduct,
        removeProduct,
      }}
      {...props}
    />
  );
};

export default CartContextProvider;
