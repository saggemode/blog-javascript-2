/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Drawer, Carousel, Select, Rate, message, Modal } from "antd";
import { toast } from "react-toastify";
import {
  ToolOutlined,
  HeartOutlined,
  HeartFilled,
  CarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {formatCurrencry} from "../utils/formatCurrency"

import ReviewCover from "./ReviewCover";
import { addToCart } from "../store/actions/cartAction";
import { addToWish } from "../store/actions/wishAction";
import CartModalCover from "./CartModalCover";
import { Store } from "../utils/Store";

const ProductDetail = ({ product }) => {
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

  const showLargeDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleAddToCart = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    //router.push("/cart");
  };

  const handleAddToWishlist = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    // if (data <=  0) {
    //   return toast.error("Sorry. Product is out of stock");
    // }
    dispatch({ type: "WISH_ADD_ITEM", payload: { ...product, quantity } });
  };

 
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center">
        <Row className="container hidden xl:flex">
          <Col span={16} className="p-4">
            <img
              src={product.image}
              className="object-cover h-900 w-full "
              alt="no img"
            />
            {/* <Row className="">
              <Col span={12}>
                <img src={product.image} className="object-cover h-500 w-full "alt="no img" />
              </Col>
              <Col span={12}>
                <img src={image2} className="object-cover h-500 w-full " alt="no img"/>
              </Col>
            </Row>
            <img src={image3} className="object-cover h-900 w-full " alt="no img" />
           */}
          </Col>

          <Col className="p-4" span={8}>
            <h1 className="font-bold text-4xl mb-4">{product.name}</h1>
            <p className="">Category: {product.category}</p>
            <p className="">Brand: {product.brand}</p>
            <div className="flex items-center">
              <h1 className="font-bold text-base mr-3">
              {product.starRating} of {product.numReviews} reviews
              </h1>
              <Rate
                disabled
                allowHalf
                defaultValue={product.starRating}
                className="my-2 text-white"
              />
            </div>
            <p className="">{product.description}</p>
       
          
            <div className="mt-2 mb-8">
              <h1 className="my-1 font-bold text-2xl ">(₦) {formatCurrencry(product.price)}</h1>
             
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? "In stock" : "Unavailable"}</div>
            </div>
            <hr className="text-gray-300" />
        
            <hr className="text-gray-300" />
            <div className="my-8">
              <div className="flex items-center justify-between my-8">
                <select
                  defaultValue="1"
                  size="large"
                  className="border-2 bg-transparent w-24 cursor-pointer active:text-white py-4 px-6 m-2"
                  onChange={(e) => setQty(e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                </select>

                {/* {cartItems.map((item, index) => (
                  <div key={index}>
                    <select
                      value={item.quantity}
                      onChange={(e) => updateCartHandler(item, e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                ))} */}
                <button
                  className="border-2 w-full cursor-pointer bg-black text-white py-4 px-6 m-2"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
                <button
                  className="border-2 cursor-pointer hover:border-black active:text-white py-4 px-6 m-2"
                  onClick={handleAddToWishlist}
                >
                  {/* {wish.filter((x) => x.id === _id).length > 0 ? (
                    <HeartFilled />
                  ) : (
                    <HeartOutlined />
                  )} */}
                </button>
              </div>

              <hr className="text-gray-300" />
              <h1 className="font-light my-8 text-red-700 text-sm flex items-center">
                <CarOutlined /> &nbsp; This item is Eligible for free delivery
              </h1>
              <hr className="text-gray-300" />
              <div className="my-8">
                <h1 className="font-bold text-xl uppercase">
                  Free Shipping and Returns
                </h1>
                <p className="my-2">
                  Free standard delivery on all orders and free return within 30
                  days of your order delivery date. Visit our Return Policy for
                  more information
                </p>
                <p className="my-2">
                  For any queries, please contact Customer Service at 8888888888
                  or via{" "}
                  <span className="font-bold">care@thebootstore.com</span>
                </p>
              </div>
              <div className="my-8">
                <h1 className="font-bold text-xl uppercase">
                  Reviews ({product.numReviews})
                </h1>
                <ReviewCover />
              </div>
            </div>
          </Col>
        </Row>

        <div className="xl:hidden w-full max-h-900">
          <Carousel autoplay className=" w-full">
            <img src={product.image} className="max-h-900 object-cover " />
            {/* <img src={image1} className="max-h-900 object-cover " />
            <img src={image2} className="max-h-900 object-cover " />
            <img src={image3} className="max-h-900 object-cover " />
           */}
          </Carousel>
        </div>

        <div className="container xl:hidden w-full">
          <h1 className="font-bold text-4xl my-4">{product.name}</h1>
          <hr />
          <p className="">{product.description}</p>
          <div className="flex items-center">
            <h1 className="font-bold text-base mr-3">({product.starRating})</h1>
            <Rate
              disabled
              allowHalf
              defaultValue={product.starRating}
              className="my-2 text-white"
            />
          </div>
          <div className="mt-2 mb-8">
            <h1 className="my-1 font-bold text-2xl text-red-700">
            {formatCurrencry(product.price)}
            </h1>
            {/* {salePrice === price ? (
              ""
            ) : (
              <h1 className="font-light line-through text-sm">${salePrice}</h1>
            )} */}
            <h1 className="font-light text-sm">(Prices include GST)</h1>
          </div>
          <hr className="text-gray-300" />
          <h1 className="font-light my-8 text-red-700 text-sm">
            Use code SAVE15 to get extra 15% off
          </h1>
          <hr className="text-gray-300" />
          <div className="my-8">
            <div className="w-full flex justify-between">
              <h1 className="font-bold">SIZE</h1>
              <h1
                className="font-bold flex items-center cursor-pointer"
                onClick={showLargeDrawer}
              >
                SIZE CHART <ToolOutlined />
              </h1>
            </div>

            <div className="flex items-start justify-between my-8">
              <select
                defaultValue="1"
                size="large"
                className="border-2 bg-transparent w-24 cursor-pointer active:text-white py-4 px-6 m-2"
                onChange={(e) => setQty(e.target.value)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
              </select>
              <button
                className="border-2 cursor-pointer hover:border-black active:text-white py-4 px-6 m-2"
                onClick={handleAddToWishlist}
              >
                {/* {wish.filter((x) => x.id === _id).length > 0 ? (
                  <HeartFilled />
                ) : (
                  <HeartOutlined />
                )} */}
              </button>
            </div>
            <button
              className="border-2 w-full cursor-pointer bg-black text-white py-4 px-6 mb-4"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>

            <hr className="text-gray-300" />
            <h1 className="font-light my-8 text-red-700 text-sm flex items-center">
              <CarOutlined /> &nbsp; This item is Eligible for free delivery
            </h1>
            <hr className="text-gray-300" />
            <div className="my-8">
              <h1 className="font-bold text-xl uppercase">
                Free Shipping and Returns
              </h1>
              <p className="my-2">
                Free standard delivery on all orders and free return within 30
                days of your order delivery date. Visit our Return Policy for
                more information
              </p>
              <p className="my-2">
                For any queries, please contact Customer Service at 8888888888
                or via <span className="font-bold">care@thebootstore.com</span>
              </p>
            </div>
            <div className="my-8">
              <h1 className="font-bold text-xl uppercase">
                Reviews ({product.numReviews})
              </h1>
              <ReviewCover />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
