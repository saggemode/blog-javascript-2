// Rial currency format
export const irrCurrencyFormat = (price ) => {
  return price ? new Intl.NumberFormat("fa-IR").format(price) : null;
};

//pound currency format
export const gbpCurrencyFormat = (price) => {
  return price ? new Intl.NumberFormat("en-GB").format(price) : null;
};
