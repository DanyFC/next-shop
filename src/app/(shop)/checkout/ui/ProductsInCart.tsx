"use client";

import { CartItem } from "@/components";
import { useCartStore } from "@/store/cart/cart-store";

const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart)

  return (
    <>
      {
        productsInCart.map(product => (
          <CartItem
            key={product.slug + '' + product.size}
            product={product}
            quantity={product.quantity}
            disabledUi />
        ))
      }
    </>
  )
}
export default ProductsInCart