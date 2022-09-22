import React from 'react';
import {useCart} from '../../common/context/CartContextProvider';

interface Props {
  product: Product;
}

function Product({product}: Props) {
  const {cart, removeProduct, incrementProduct, decrementProduct} = useCart();
  const index = cart.findIndex((p) => p.id === product.id);
  return (
    <div
      className="flex flex-col mb-10 md:flex-row md:mb-2"
      data-testid="product"
    >
      <div className="flex relative flex-1">
        <img
          className="object-cover h-56 rounded-lg"
          src={product.img}
          alt=""
        />

        <div className="flex flex-col justify-between mx-6">
          <a
            href="#"
            className="text-xl font-semibold text-gray-800 hover:underline dark:text-white "
          >
            {product.name}
          </a>

          <span className="absolute top-[5rem] right-0 text-md text-gray-500 dark:text-gray-300">
            £{product.price}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 dark:text-white justify-center items-center">
        <span className="px-5 text-3xl">
          {index === -1 ? 0 : cart[index].quantity}
        </span>
        <div className="flex mt-2">
          <button
            className="p-3 border-gray-300 border-solid border-2"
            onClick={() => decrementProduct(product, index)}
          >
            -
          </button>
          <div className="flex flex-col justify-center items-center px-3">
            <button
              className="p-3 border-gray-300 border-solid border-2"
              onClick={() => removeProduct(product, index)}
            >
              remove
            </button>
          </div>
          <button
            className="p-3 border-gray-300 border-solid border-2"
            onClick={() => incrementProduct(product, index)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
