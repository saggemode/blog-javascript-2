import React from "react";
import { useSelector } from "react-redux";

import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import Link from "next/link";

import SectionTitle from "../UI/SectionTitle";
import Card from "../UI/card/Card";

const Newest = ({ products, addToCartHandler }) => {
  const { width } = useWindowDimensions();
  let numProductToShow = width >= 1536 ? 12 : 8;

  return (
    <div className="mx-auto my-4 md:my-8 flex flex-col xl:max-w-[2130px] pl-5">
      <SectionTitle title={"newest"} />
      <div className="grid gap-4 md:gap-2 grid-cols-6 md:grid-cols-12 ">
        {/* {products
              .slice(0, numProductToShow)
              .map((product) => {
                return <Card key={product.name} product={product} />;
              })
          : null} */}

        {products?.slice(0, numProductToShow).map((product, slug) => {
          return (
            <Card
              key={slug}
              product={product}
              addToCartHandler={addToCartHandler}
            />
          );
        })}
      </div>

      <div className="text-center">
        <Link href="/newestProducts" legacyBehavior>
          <a className="inline-block py-3 px-8 md:px-12 mt-4 text-sm md:text-base bg-palette-primary text-palette-side rounded-xl shadow-lg">
            seeAllNewProducts
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Newest;
