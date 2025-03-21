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
import { AiFillDelete } from "react-icons/ai";
import InputField from "@/components/custom/InputField";
import Button from "@/components/custom/Button";

const Cart = () => {
  const dispatch = useDispatch();
  const { items, cartCount } = useSelector((state) => state.cart);

  return (
    <section className="lg:mx-40 mx-6 py-8">
      {items.length > 0 && (
        <h1 className="text-display-5 font-bold md:mb-6 uppercase tracking-wide">
          Cart ({cartCount}) Items
        </h1>
      )}

      {items.length === 0 ? (
        <p className="heading-6 text-neutral-6 font-semibold uppercase text-center mt-20">
          Your cart is empty
        </p>
      ) : (
        <>
          <div className="w-full overflow-x-auto md:flex hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-warm-black text-neutral-2">
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
                    <td className="px-4 py-3 text-left text-display-2 font-semibold text-neutral-6">
                      {item.title}
                    </td>

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
                    <td className="px-4 py-3 text-neutral-7 text-display-2 font-semibold">
                      ${item.price}
                    </td>

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
                            item.quantity > 1 &&
                            dispatch(decreaseQuantity(item.id))
                          }
                        >
                          -
                        </button>

                        <span className="text-lg text-display-2">
                          {item.quantity}
                        </span>

                        <button
                          className="px-3 py-1 border rounded hover:bg-neutral-3 cursor-pointer"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                        >
                          +
                        </button>
                      </div>
                    </td>

                    {/* Total Price */}
                    <td className="px-4 py-3 text-neutral-7 text-display-2 font-semibold">
                      ${item.price * item.quantity}
                    </td>

                    {/* Remove Button */}
                    <td className=" px-4 py-3">
                      <button onClick={() => dispatch(removeFromCart(item.id))}>
                        <AiFillDelete className="text-red-400 font-bold text-lg hover:text-red-600 cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden mb-8">
            {items.map((item: CartItem) => (
              <div key={item?.id} className="border-b border-warm-black py-6">
                <button onClick={() => dispatch(removeFromCart(item.id))}>
                  <AiFillDelete className="text-red-400 font-bold text-lg hover:text-red-600 cursor-pointer mb-2" />
                </button>

                <div className="flex items-center gap-6 mb-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                  />

                  <div className="text-display-2 text-neutral-8">
                    {item.title}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div>Price</div>

                    <div className="text-display-2 font-semibold text-neutral-8">
                      ${item?.price}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>Quantity</div>

                    <div className="flex items-center justify-center gap-3">
                      <button
                        className={`px-3 py-1 border rounded ${
                          item.quantity === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-200 cursor-pointer"
                        }`}
                        onClick={() =>
                          item.quantity > 1 &&
                          dispatch(decreaseQuantity(item.id))
                        }
                      >
                        -
                      </button>

                      <span className="text-lg text-display-2">
                        {item.quantity}
                      </span>

                      <button
                        className="px-3 py-1 border rounded hover:bg-neutral-3 cursor-pointer"
                        onClick={() => dispatch(increaseQuantity(item.id))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>Subtotal</div>

                    <div className="text-display-2 font-semibold text-neutral-8">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {items?.length > 0 && (
        <div className="flex md:flex-row flex-col lg:items-center md:justify-between md:gap-0 gap-4 mb-12 ">
          <div className="flex md:flex-row flex-col items-center gap-4">
            <InputField placeholder="Coupon Code" />

            <div className="w-full md:w-auto md:px-4 py-[11] inline-flex items-center justify-center gap-2 cursor-pointer text-display-2 tracking-wide font-semibold bg-neutral-8 text-neutral-2 whitespace-nowrap">
              Apply Coupon
            </div>
          </div>

          <div className="md:w-64 py-[11] inline-flex items-center justify-center gap-2 cursor-pointer text-display-2 tracking-wide font-semibold bg-neutral-8 text-neutral-2 whitespace-nowrap">
            Update Cart
          </div>
        </div>
      )}

      {/* Cart Total */}
      {items.length > 0 && (
        <div className="w-full flex items-center justify-end">
          <div className="lg:w-1/3 md:w-2/5 w-full p-6 bg-warm-black text-neutral-2 shadow-lg h-fit self-end">
            <h2 className="text-display-4 font-bold mb-4">Cart Total</h2>
            <div className="flex justify-between text-lg">
              <span className="font-semibold text-display-2">Subtotal:</span>
              <span className="font-semibold text-display-2">
                $
                {items
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
