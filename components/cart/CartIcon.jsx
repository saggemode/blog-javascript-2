import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
//import { Store } from "../../utils/Store";
import { useSelector } from "react-redux";

const Basket = () => {
  //const cartTotalQuantity  = useSelector(state => state.cart.cartTotalQuantity);
  //const cartTotalQuantity = useSelector((state => state.cart.cartTotalQuantity));
  // const { state } = useContext(Store);
  // const { cart } = state;
  // const [cartItemsCount, setCartItemsCount] = useState(0);
  // useEffect(() => {
  //   setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  // }, [cart.cartItems]);

  return (
    <div className="relative">
      <Link href="/cart" legacyBehavior>
        <a className="relative flex items-center ltr:md:pl-6 rtl:md:pr-6 rtl:md:border-r-2 rtl:md:border-r-slate-300 ltr:md:border-l-2 ltr:md:border-l-slate-300 z-50">
          <AiOutlineShoppingCart style={{ fontSize: "1.6rem" }} />
          {/* <span className="absolute -top-3 -right-[0.3rem] rtl:md:right-[1rem]  flex items-center justify-center w-5 h-5 rtl:pt-[0.1rem] rounded-full bg-palette-primary text-[0.75rem] leading-3 text-white shadow-lg">
            {cartTotalQuantity}
          </span> */}
          {/* {cartItemsCount > 0 && (
            <span className="absolute -top-3 -right-[0.3rem] rtl:md:right-[1rem]  flex items-center justify-center w-5 h-5 rtl:pt-[0.1rem] rounded-full bg-palette-primary text-[0.75rem] leading-3 text-white shadow-lg">
              {cartItemsCount}
            </span>
          )} */}

          {/* {cartTotalQuantity > 0 && (
            <span className="absolute -top-3 -right-[0.3rem] rtl:md:right-[1rem]  flex items-center justify-center w-5 h-5 rtl:pt-[0.1rem] rounded-full bg-palette-primary text-[0.75rem] leading-3 text-white shadow-lg">
              {cartTotalQuantity}
            </span>
          )} */}
        </a>
      </Link>
    </div>
  );
};

export default Basket;
