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
    <section className="mx-32 py-8">
      {/* Category Section */}
      <div className="flex items-center justify-center gap-16 mb-16 mx-48">
        <div className="h-72 w-56 flex flex-col items-center">
          <div className="h-64 w-52 flex justify-center items-center overflow-hidden">
            <Image
              src="/images/men.png"
              alt="Men's clothing"
              width={225}
              height={225}
              className="object-contain"
            />
          </div>
          <div className="text-display-3 font-semibold text-center mt-2 uppercase">
            Men's Clothing
          </div>
        </div>

        <div className="h-72 w-56 flex flex-col items-center">
          <div className="h-64 w-52 flex justify-center items-center overflow-hidden">
            <Image
              src="/images/women.jpg"
              alt="Men's clothing"
              width={225}
              height={225}
              className="object-cover"
            />
          </div>
          <div className="text-display-3 font-semibold text-center mt-2 uppercase">
            women's Clothing
          </div>
        </div>

        <div className="h-72 w-56 flex flex-col items-center">
          <div className="h-64 w-52 flex justify-center items-center overflow-hidden">
            <Image
              src="/images/kids.jpg"
              alt="Men's clothing"
              width={225}
              height={225}
              className="object-cover"
            />
          </div>
          <div className="text-display-3 font-semibold text-center mt-2 uppercase">
            kids's Clothing
          </div>
        </div>

        <div className="h-72 w-56 flex flex-col items-center">
          <div className="h-64 w-52 flex justify-center items-center overflow-hidden">
            <Image
              src="/images/accessories.png"
              alt="Accessories"
              width={225}
              height={225}
              className="object-contain"
            />
          </div>
          <div className="text-display-3 font-semibold text-center mt-2 uppercase">
            Accessories
          </div>
        </div>
      </div>

      <h1 className="heading-7 font-bold text-center mb-6 uppercase tracking-wider">
        Best Sellers
      </h1>

      {loading && <Loading />}

      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
        {products?.slice(0, 8).map((product: Product) => (
          <ProductCard
            product={product}
            key={product?.id}
            onClick={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </section>
  );
};

export default Home;
