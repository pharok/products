import React, {useEffect, useState} from 'react';
import {useCart} from '../../common/context/CartContextProvider';
import Product from './Product';
import FilterBar from '../../common/components/FilterBar';
import fetchProducts from '../../common/libs/fetchProducts';
import calculateTotal from '../../common/libs/calculateTotal';
import {useFilter} from '../../common/hooks/useFilter';

function Products() {
  const {cart} = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, colour, setColour] = useFilter();

  useEffect(() => {
    fetchProducts()
      .then((products) => {
        setIsLoading(false);
        setProducts(products);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log('error', error);
      });
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 min-h-[100vh]">
      <div className="px-6 py-10">
        <FilterBar colour={colour} setColour={setColour} />
        <div className="grid grid-cols-1 gap-8 mt-8 md:mt-16">
          {isLoading ? (
            <h1 className="text-5xl dark:text-white">Loading</h1>
          ) : (
            products
              .filter(filter)
              .map((product) => <Product key={product.id} product={product} />)
          )}
          <div className="flex">
            <div className="flex relative flex-1"></div>
            <div className="flex flex-1 dark:text-white justify-center items-center">
              <div className="p-5 text-3xl">Total</div>
              <span
                data-testid="cart-total"
                className="p-3 border-gray-300 border-solid border-2 text-xl"
              >
                £{calculateTotal(cart)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Products;
