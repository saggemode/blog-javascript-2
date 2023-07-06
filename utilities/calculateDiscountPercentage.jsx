export const calculateDiscountPercentage = (price, discountPercentage) => {
  return price - price * (discountPercentage * 0.01);
};
