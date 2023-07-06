export const changeNumbersFormatEnToFa = (number) =>
  number.toString().replace(/\d/g, (index) => "۰۱۲۳۴۵۶۷۸۹"[index]);
