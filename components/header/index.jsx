import React from "react";
import dynamic from "next/dynamic";
//import Menu from "./menu";
import Logo from "./Logo";
import Settings from "./Settings";
import SearchBar from "./SearchBar";
import CartIcon from "../cart/CartIcon";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";

const UserBox = dynamic(() => import("./user"), {
  ssr: false,
});
// const Theme = dynamic(() => import("./theme/Theme"), {
//   ssr: false,
// });

const index = () => {
  return (
    <header className="md:fixed left-0 right-0 top-0 md:bg-palette-fill shadow-sm pt-4 z-[1000]">
      <div className="flex flex-col md:px-4 mb-2">
        <div className="flex items-center justify-between md:order-2 md:mt-2  relative">
          {/* <Menu /> */}
          <div className="md:hidden pl-5">
            <Logo />
          </div>

          <div className="pr-6">
            <Settings />
          </div>
          {/* 👈settings: md:hidden */}
          <div className="hidden md:flex md:items-center md:justify-between">
            {/* <Language /> */}
            {/* <Theme /> */}
          </div>
        </div>
        <hr className="md:hidden" />
        <div className="mb-2 mt-4 md:mt-0 flex  items-center md:order-1">
          <div className="hidden md:block">
            <Logo />
          </div>
          <div className="flex-grow pl-5">
            <SearchBar />
          </div>
          <div className="ltr:ml-2 rtl:mr-2 sm:ltr:ml-4 sm:rtl:mr-4 flex items-center justify-between pr-6 pl-4 ">
            <CartIcon />
            
            {/* <div className="relative">
              <Link href="/cart" legacyBehavior>
                <a className="relative flex items-center ltr:md:pl-6 rtl:md:pr-6 rtl:md:border-r-2 rtl:md:border-r-slate-300 ltr:md:border-l-2 ltr:md:border-l-slate-300 z-50">
                  <AiOutlineShoppingCart style={{ fontSize: "1.6rem" }} />
                  <span className="absolute -top-3 -right-[0.3rem] rtl:md:right-[1rem]  flex items-center justify-center w-5 h-5 rtl:pt-[0.1rem] rounded-full bg-palette-primary text-[0.75rem] leading-3 text-white shadow-lg">
                    14
                  </span>
                </a>
              </Link>
            </div> */}
            <UserBox />
          </div>
        </div>
      </div>
    </header>
  );
};

export default index;
