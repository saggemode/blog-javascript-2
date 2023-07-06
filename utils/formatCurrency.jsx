export default function formatCurrency(num) {
    return "$" + Number(num.toFixed(1)).toLocaleString() + " ";
  }


  const CURRENCRY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'NGN',
    style: 'currency',
  });
  
  export const formatCurrencry = (number) => {
    return CURRENCRY_FORMATTER.format(number);
  };