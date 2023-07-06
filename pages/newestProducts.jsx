import React from "react";
import Product from "../models/Product";
import db from "../utils/db";
import ProductList from "../components/productList/ProductList";
const NewestProducts = ({ products }) => {
  return (
    <div className="flex flex-wrap">
      {/* <ProductList /> */}
      {products.length ? <ProductList products={products} /> : null}
    </div>
  );
};

export default NewestProducts;

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
