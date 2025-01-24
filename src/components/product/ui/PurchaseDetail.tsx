"use client";

import { useState } from "react";

import { Product, Size } from "@/interfaces";
import QuantitySelector from "./quantity-selector/QuantitySelector";
import SizeSelector from "./size-selector/SizeSelector";

interface Props {
  product: Partial<Product>;
}

const PurchaseDetail = ({ product }: Props) => {
  const [detail, setDetail] = useState<{ size: string | undefined, quantity: number }>({
    size: undefined,
    quantity: 1
  })

  return (
    <>
      <SizeSelector
        selectedSize={detail.size as Size}
        availableSizes={product.sizes!}
        onSizeChange={(size) => setDetail(prev => ({ ...prev, size }))}
      />

      <QuantitySelector
        quantity={detail.quantity}
        onQuantityChange={(quantity) => setDetail(prev => ({ ...prev, quantity }))}
      />
    </>
  )
}
export default PurchaseDetail