import React from "react";
import { useExchangeRateGBPToIRR } from "../../hooks/useExchangeRateGBPToIRR";
import { calculateDiscountPercentage } from "../../utilities/calculateDiscountPercentage";
import { changeNumbersFormatEnToFa } from "../../utilities/changeNumbersFormatEnToFa";
import { gbpCurrencyFormat } from "../../utilities/currencyFormat";
import {formatCurrencry} from "../../utils/formatCurrency"
const ProductPrice = ({ price, discount, isLargeSize = false, isInSlider }) => {
  const discountPrice = discount
    ? calculateDiscountPercentage(price, discount)
    : 0;

  const irPrice = useExchangeRateGBPToIRR(price);
  const irDiscountPrice = useExchangeRateGBPToIRR(discountPrice);

  //style base on component position
  const textMainPriceSize = isLargeSize
    ? "text-xl md:text-3xl"
    : "text-md md:text-lg";
  const textDiscountPriceSize = isLargeSize
    ? "text-md md:text-xl"
    : "text-[12px] md:text-md";
   const justifyContent = isInSlider  ? "flex-start" : "";
  const flexDirection = isInSlider  ? "row" : "row-reverse";

  return (
    <div>
      <div
        className={`flex rtl:justify-end rtl:self-end ltr:self-start text-left mt-2 `}
        style={{ justifyContent }}
      >
        {discount ? (
          <div
            className="flex items-end flex-wrap "
            style={{ justifyContent }}
          >
            <span className="flex flex-col">
              <del
                className={`text-rose-800 dark:text-rose-200 md:text-sm ${textDiscountPriceSize}`}
              >
                <sup className="mr-1">₦</sup>
                {formatCurrencry(discountPrice)}
              </del>
              <ins
                className={`font-bold self-end no-underline mt-1 ${textMainPriceSize}`}
              >
                <sup className="mr-1">₦</sup>
                {formatCurrencry(price)}
              </ins>
            </span>
            <span
              className="text-green-800 dark:text-green-200 ml-1 text-[12px] inline-block"
              style={{ direction: "ltr" }}
            >{`(-%${discount})`}</span>
          </div>
        ) : (
          <div>
            {isInSlider ? <div className="h-[1.4rem]"></div> : null}{" "}
            {/* ☝slider cards (.slick-slide=>Slider component) are float and because of that, they don't accept height so, for making cards the same height, I have to do this hack*/}
            <div
              className={`flex items-center ${textMainPriceSize} font-bold no-underline row`}
               style={{ justifyContent }}
            >
              <sup className="mr-1 rtl:block">₦</sup>
              <span>{formatCurrencry(price)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPrice;
