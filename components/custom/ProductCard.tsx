"use client";
import Image from "next/image";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Product } from "@/constants/Types";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = cartItems.some((item: Product) => item.id === product.id);

  return (
    <div key={product?.id} className="flex flex-col w-64 h-96 p-4 bg-white">
      <div className="w-[200px] h-[250px] relative">
        <Image
          src={product?.image}
          alt={product?.title}
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
        />
      </div>

      <div className="flex flex-col mt-4 uppercase">
        <p className="text-display-2 text-warm-black font-semibold">
          {product?.title.length > 20
            ? `${product?.title.substring(0, 20)}...`
            : product?.title}
        </p>
        <p className="text-display-2 text-warm-black font-semibold">
          ${product?.price}
        </p>
      </div>

      <p className="text-display-1 text-neutral-6 mt-2 mb-6">
        {product?.description.length > 100
          ? `${product.description.substring(0, 100)}...`
          : product?.description}
      </p>

      {isInCart ? (
        <Button
          text="IN THE CART"
          onClick={onClick}
          disabled={isInCart}
          variant="disabled"
        />
      ) : (
        <Button text="ADD TO CART" onClick={onClick} disabled={isInCart} icon />
      )}
    </div>
  );
};

export default ProductCard;
