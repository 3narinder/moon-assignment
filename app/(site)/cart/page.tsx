"use client";

import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  CartItem,
} from "@/redux/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, cartCount } = useSelector((state) => state.cart);

  return (
    <section className="lg:mx-40 py-8">
      {items.length > 0 && (
        <h1 className="text-display-5 font-bold mb-6 uppercase tracking-wide">
          Cart ({cartCount}) Items
        </h1>
      )}

      {items.length === 0 ? (
        <p className="heading-6 text-neutral-6 font-semibold uppercase text-center mt-20">
          Your cart is empty.
        </p>
      ) : (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className=" px-4 py-3 text-left">Product</th>
              <th className=" px-4 py-3 text-left">Image</th>
              <th className=" px-4 py-3 text-center">Price</th>
              <th className=" px-4 py-3 text-center">Quantity</th>
              <th className=" px-4 py-3 text-center">Total</th>
              <th className=" px-4 py-3 text-center">Remove</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item: CartItem) => (
              <tr key={item.id} className="text-center">
                {/* Product Name */}
                <td className=" px-4 py-3 text-left">{item.title}</td>

                {/* Product Image */}
                <td className=" px-4 py-3 flex justify-center">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />
                </td>

                {/* Price */}
                <td className=" px-4 py-3">${item.price}</td>

                {/* Quantity Controls */}
                <td className=" px-4 py-3">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      className={`px-3 py-1 border rounded ${
                        item.quantity === 1
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-gray-200 cursor-pointer"
                      }`}
                      onClick={() =>
                        item.quantity > 1 && dispatch(decreaseQuantity(item.id))
                      }
                    >
                      -
                    </button>

                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      className="px-3 py-1 border rounded hover:bg-gray-200 cursor-pointer"
                      onClick={() => dispatch(increaseQuantity(item.id))}
                    >
                      +
                    </button>
                  </div>
                </td>

                {/* Total Price */}
                <td className=" px-4 py-3">${item.price * item.quantity}</td>

                {/* Remove Button */}
                <td className=" px-4 py-3">
                  <button
                    className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className=""></div>
    </section>
  );
};

export default Cart;
