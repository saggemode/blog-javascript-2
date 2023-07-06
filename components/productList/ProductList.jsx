import React, { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import Breadcrumb from "../UI/Breadcrumb";
import SubmenuCategory from "./SubmenuCategory";
import Card from "../UI/card/Card";
import { useRouter } from "next/router";
import Sort from "./Sort";

import { Store } from "../../utils/Store";

const ProductList = ({ products }, prop) => {
  const { state, dispatch } = useContext(Store);
  const [selectedRadioBtn, setSelectedRadioBtn] = useState("all");
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to the cart");
  };
  const router = useRouter();

  let isInNewestProductsPage =
    router.pathname === "/newestProducts" ? true : false;

  function onChangeHandler() {
    setSelectedRadioBtn(currentTarget.id);
  }

  return (
    <div>
      <Breadcrumb />
      <SubmenuCategory />

      {/* <div className="grid md:grid-cols-4 md:gap-5">
        <select>
          <option>hello</option>
          <option>hello</option>
          <option>hello</option>
        </select>

        <select>
          <option>hello</option>
          <option>hello</option>
          <option>hello</option>
        </select>

        <select
          id="small"
          class="block w-full p-2 mb-6 text-sm white border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option selected>Choose a country</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>

        <div className="md:col-span-3">
          <div className="w-full xl:max-w-[2100px] mx-auto">
            <div className="grid gap-4 md:gap-4 grid-cols-6 md:grid-cols-12">
              {products
                ? products.map((product) => {
                    return (
                      <Card
                        key={product.slug.current}
                        product={product}
                        addToCartHandler={addToCartHandler}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div> */}
      

      {/* <div className="w-full xl:max-w-[2100px] mx-auto">
        <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12">
          {products
            ? products.map((product) => {
                return (
                  <Card
                    key={product.slug.current}
                    product={product}
                    addToCartHandler={addToCartHandler}
                  />
                );
              })
            : null}
        </div>

        <div>
          <Sort
            selectedBtn={selectedRadioBtn}
            onChangeSelectedBtn={onChangeHandler}
          />
          <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12">
            <h2>hello</h2>
            {sortedProductList.map((product) => {
              return <Card key={product.slug.current} product={product} />;
            })}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProductList;
