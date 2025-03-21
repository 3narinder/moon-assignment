"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import { addToCart } from "@/redux/cartSlice";
import ProductCard from "@/components/custom/ProductCard";
import { Product } from "@/constants/Types";
import Loading from "@/components/custom/Loading";
import Image from "next/image";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="">
      {/* Category Section */}
      <div className="mt-8 lg:mx-32 mx-4">
        <h1 className="heading-7 font-bold text-center mb-6 uppercase tracking-wider">
          Categories
        </h1>

        <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-6 mb-24">
          {[
            {
              src: "/images/men.png",
              alt: "Men's clothing",
              label: "Men's Clothing",
            },
            {
              src: "/images/women.jpg",
              alt: "Women's clothing",
              label: "Women's Clothing",
            },
            {
              src: "/images/kids.jpg",
              alt: "Kids' clothing",
              label: "Kids' Clothing",
            },
            {
              src: "/images/accessories.png",
              alt: "Accessories",
              label: "Accessories",
            },
          ].map(({ src, alt, label }) => (
            <div
              key={label}
              className="h-72 w-full max-w-[260px] flex flex-col items-center lg:ml-0 md:ml-16"
            >
              <div className="h-64 w-52 flex justify-center items-center overflow-hidden">
                <Image
                  src={src}
                  alt={alt}
                  width={225}
                  height={225}
                  className="object-cover"
                />
              </div>
              <div className="text-display-3 font-semibold text-center mt-2 uppercase">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <div className="flex flex-col lg:mx-32 mx-4">
        <h1 className="heading-7 font-bold text-center mb-6 uppercase tracking-wider">
          Best Sellers
        </h1>

        {loading && <Loading />}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 justify-center lg:ml-0 ml-16">
          {products?.slice(0, 8).map((product: Product) => (
            <ProductCard
              product={product}
              key={product?.id}
              onClick={() => handleAddToCart(product)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
