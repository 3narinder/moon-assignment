"use client";
import Loading from "@/components/custom/Loading";
import ProductCard from "@/components/custom/ProductCard";
import { Product } from "@/constants/Types";
import { fetchProducts } from "@/redux/productSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice"; // Ensure this import exists
import Image from "next/image";

const WomenSection = () => {
  const dispatch = useDispatch();
  const { womenProducts, loading, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  return (
    <section className="">
      {/* Hero */}
      {/* <div className="w-full h-[80vh] md:h-[60vh] relative overflow-hidden">
        <Image
          src="/images/women-hero.jpg"
          alt="men hero image"
          fill
          className="object-cover object-center"
        />
      </div> */}

      {/* Category Section */}
      <div className="mt-8">
        <h1 className="heading-7 font-bold text-center mb-6 uppercase tracking-wider">
          Categories
        </h1>

        <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-6 mb-24 justify-center">
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
              className="h-72 w-full max-w-[260px] flex flex-col items-center"
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
      <div className="flex flex-col lg:mx-32 mx-4 mt-8">
        <h1 className="heading-7 font-bold text-center mb-6 uppercase tracking-wider">
          Women's Clothing
        </h1>

        {loading && <Loading />}
        {error && <p className="text-red-500">Error: {error}</p>}

        <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 justify-center">
          {womenProducts?.slice(0, 8).map((product: Product) => (
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

export default WomenSection;
