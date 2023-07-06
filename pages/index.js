import dynamic from "next/dynamic";
import React from "react";
import axios from "axios";
import { addToCartItem } from "../redux/cartSlice";
import db from "../utils/db";
import { useDispatch, useSelector } from "react-redux";
import Product from "../models/Product";
import { toast } from "react-toastify";
const Newest = dynamic(() => import("../components/newest/Newest"));

const Home = ({ products }) => {
  const dispatch = useDispatch();

  const addToCartHandler = async (product) => {
    dispatch(addToCartItem(product));
  };

  // const addToCartHandler = async (product) => {
  //   const existItem = cart.cartItems.find((x) => x.slug === product.slug);
  //   const quantity = existItem ? existItem.quantity + 1 : 1;
  //   const { data } = await axios.get(`/api/products/${product._id}`);

  //   if (data.countInStock < quantity) {
  //     return toast.error("Sorry. Product is out of stock");
  //   }
  //   dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

  //   toast.success("Product added to the cart");
  //   console.log('Product added to the cart')
  // };

  return (
    <div>
      <Newest
        products={products}
        key={products.slug}
        addToCartHandler={addToCartHandler}
      />
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}

// import Head from "next/head";
// import Header from "../components/Header";
// import ProductCover from "../components/ProductCover";
// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { listProducts } from "../store/actions/productAction";
// import { Spin, Alert } from "antd";

// export default function Home() {
//   const dispatch = useDispatch();
//   const productList = useSelector((state) => state.productList);
//   const { loading, error, products } = productList;
//   console.log(products);

//   function useWindowSize() {
//     const [windowSize, setWindowSize] = useState({
//       width: undefined,
//       height: undefined,
//     });

//     useEffect(() => {
//       // only execute all the code below in client side
//       if (typeof window !== "undefined") {
//         function handleResize() {
//           setWindowSize({
//             width: window.innerWidth,
//             height: window.innerHeight,
//           });
//         }
//         window.addEventListener("resize", handleResize);
//         handleResize();
//         return () => window.removeEventListener("resize", handleResize);
//       }
//     }, []);
//     return windowSize;
//   }

//   const size = useWindowSize();

//   useEffect(() => {
//     dispatch(listProducts());
//   }, [dispatch]);

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <Head>
//         <title>theBootStore</title>
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <div className="w-full p-4 px-4 lg:px-10">
//         <Header />
//       </div>

//       <div className="w-full my-8 px-10">
//         <h1 className="font-bold text-4xl uppercase mb-6 text-center">
//           Popular products
//         </h1>
//         <div className="flex flex-wrap justify-evenly">
//           {loading ? (
//             <Spin size="large" />
//           ) : error ? (
//             <Alert message="Error" type="error" showIcon />
//           ) : (
//             products?.map((e, index) => <ProductCover data={e} key={index} />)
//           )}
//         </div>
//       </div>

//       <div className="w-full my-8 px-4 lg:px-10">
//         {size.width > 768 ? (
//           <img src="/rcb.png" className=" w-full" />
//         ) : (
//           <img src="/rcb-mobile.png" className=" w-full" />
//         )}
//       </div>

//       <div className="w-full my-8 px-4 lg:px-10">
//         <h1 className="text-3xl uppercase font-bold mb-6 text-center">
//           RECOMMENDED FOR YOU
//         </h1>
//         <div className="flex flex-wrap justify-evenly">
//           {loading ? (
//             <Spin size="large" />
//           ) : error ? (
//             <Alert message="Error" type="error" showIcon />
//           ) : (
//             products?.map((e, index) => <ProductCover data={e} key={index} />)
//           )}
//         </div>
//       </div>

//       <div className="w-full my-8 px-4 lg:px-10 relative">
//         <video autoPlay loop muted className="w-full h-750  object-cover">
//           <source src="" />
//         </video>
//         <div className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex items-center justify-between w-9/12 flex-col-reverse xl:flex-row">
//           <div>
//             <h1 className="font-extrabold text-black text-4xl my-4">
//               SHOP THE BEST ITEM.
//             </h1>
//             <button className="bg-white font-extrabold text-black text-2xl  py-2 px-4 my-4">
//               SHOP NOW.
//             </button>
//           </div>
//           <div className="flex-col flex justify-center items-center">
//             <img src="/Logo_NIKE.svg" />
//             <h1 className="font-extrabold text-black text-4xl my-4">
//               JUST DO IT.
//             </h1>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export async function getServerSideProps() {
//   await db.connect();
//   const products = await Product.find().lean();
//   return {
//     props: {
//       products: products.map(db.convertDocToObj),
//     },
//   };
// }
