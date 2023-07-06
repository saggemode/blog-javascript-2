import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Spin, Alert } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import db from "../../utils/db";
import { Store } from "../../utils/Store";
import Product from "../../models/Product";
import ProductDetail2 from '../../components/ProductDetail2';
// import {
//   Button,
//   CircularProgress,
//   Grid,
//   List,
//   ListItem,
//   Rating,
//   TextField,
// } from "@mui/material";
import { getError } from "../../utils/errors";
import Head from "next/head";

const ProductScreen = (props) => {
  //const { data: session } = useSession();
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // const submitHandler = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     await axios.post(`/api/products/${product._id}/reviews`, {
  //       rating,
  //       comment,
  //     });
  //     setLoading(false);
  //     toast.success("Review submitted successfully");
  //     fetchReviews();
  //   } catch (err) {
  //     setLoading(false);
  //     toast.error(getError(err));
  //   }
  // };

  // const fetchReviews = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/products/${product._id}/reviews`);
  //     setReviews(data);
  //   } catch (err) {
  //     toast.error(getError(err));
  //   }
  // };
  // useEffect(() => {
  //   fetchReviews();
  // }, []);

  if (!product) {
    return <h1 title="Produt Not Found">Produt Not Found</h1>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    router.push("/cart");
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Head>
        <title>{product?.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full min-h-screen flex justify-center items-center py-4">
       <ProductDetail2 product={product} />
       
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();
  //const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

export default ProductScreen;
