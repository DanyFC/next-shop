"use client";

import { useState } from "react";

import { Product, Size } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";
import QuantitySelector from "./quantity-selector/QuantitySelector";
import SizeSelector from "./size-selector/SizeSelector";

interface Props {
  product: Partial<Product>;
}

const PurchaseDetail = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [detail, setDetail] = useState<{ size: string | undefined, quantity: number, error: string | null }>({
    size: undefined,
    quantity: 1,
    error: null
  })

  const addToCart = () => {
    if (!detail.size) return setDetail(prev => ({ ...prev, error: 'Select a size!' }))

    addProductToCart({
      id: product.id!,
      image: product.images![0],
      price: product.price!,
      size: detail.size as Size,
      quantity: detail.quantity!,
      slug: product.slug!,
      title: product.title!
    })
    setDetail({
      size: undefined,
      quantity: 1,
      error: null
    })
  }

  return (
    <div className="flex flex-col mb-4 gap-5 justify-between">
      {detail.error && <span className="font-bold text-red-500 text-lg fade-in">{detail.error}</span>}
      <SizeSelector
        selectedSize={detail.size as Size}
        availableSizes={product.sizes!}
        onSizeChange={(size) => setDetail(prev => ({ ...prev, size }))}
      />

      <QuantitySelector
        quantity={detail.quantity}
        onQuantityChange={(quantity) => setDetail(prev => ({ ...prev, quantity }))}
      />

      <button
        className="btn-primary"
        onClick={addToCart}
      >Add to cart</button>

    </div>
  )
}
export default PurchaseDetail