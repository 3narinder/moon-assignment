"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/productSlice";
import { addToCart } from "@/redux/cartSlice";
import ProductCard from "@/components/custom/ProductCard";
import { Product } from "@/constants/Types";
import Loading from "@/components/custom/Loading";

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
      <h1 className="heading-7 font-bold text-center mb-6 uppercase tracking-wider">
        Best Sellers
      </h1>

      {loading && <Loading />}

      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6">
        {products?.map((product: Product) => (
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
