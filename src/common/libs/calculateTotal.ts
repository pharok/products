const calculateTotal = (products: CartProduct[]) => {
  return products
    .reduce((total, product) => (total += product.price * product.quantity), 0)
    .toFixed(2);
};

export default calculateTotal;
