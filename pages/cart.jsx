import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import { BsCartPlus } from "react-icons/bs";
import {IoBagCheckOutline} from "react-icons/io5"
import { Store } from "../utils/Store";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import axios from "axios";
import {formatCurrencry} from "../utils/formatCurrency"
import { toast } from "react-toastify";

const CartScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
    toast.success("Product updated in the cart");
  };
  return (
    <>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/product/${item.slug}`} legacyBehavior>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.name}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">
                      <select
                        className="border-1 bg-transparent w-15 cursor-pointer active:text-white py-4 px-6 m-2"
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-5 text-right">₦  {formatCurrencry(item.price)}</td>
                    <td className="p-5 text-center">
                      <button onClick={() => removeItemHandler(item)}>
                        <XCircleIcon className="h-5 w-5"></XCircleIcon>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl flex flex-col items-center flex-grow sticky top-10 md:top-36 max-w-[350px] mt-8 rtl:mr-auto ltr:ml-auto xl:rtl:ml-2 px-6 py-4 sm:p-4 xl:p-6 border-2 shadow-lg">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : ₦
                  {formatCurrencry(cartItems.reduce((a, c) => a + c.quantity * c.price, 0))}
                
                  <button
                  className="border-none bg-palette-primary/90 hover:bg-palette-primary/100 transition-colors duration-200 shadow-lg px-3 lg:px-8 py-4 text-palette-side flex items-center rounded-lg cursor-pointer  text-[12px] sm:text-base"
                  onClick={() => router.push("login?redirect=/shipping")}
                >
                  <IoBagCheckOutline
                    style={{ fontSize: "1.2rem", margin: "0 0.4rem" }}
                  />
                  Check Out
                </button>
                </div>
              </li>
              <li>
                {/* <button
                onClick={() => router.push('login?redirect=/shipping')}
                className="bg-palette-primary w-full py-4 rounded-lg text-palette-side text-xl shadow-lg"
              >
                <BsCartPlus style={{ fontSize: "1.2rem", margin: "0 0.4rem" }} />
                Check Out
              </button> */}
                
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
