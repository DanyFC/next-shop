"use client";

import { IoCartOutline } from "react-icons/io5";

import { useCartStore } from "@/store/cart/cart-store";
import CartItem from "./CartItem";

const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)

  return (
    <>
      {
        productsInCart.map(product => (<CartItem key={`${product.slug}-${product.size}`} product={product} />))
      }

      {
        !productsInCart.length && (
          <div className="flex flex-col w-full items-center justify-center py-4">
            <IoCartOutline size={100} color="#4d4d4d" />

            <p>The cart is empty</p>
          </div>
        )
      }
    </>
  )
}
export default ProductsInCart