"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

import { useCartStore } from "@/store/cart/cart-store";

interface Props {
  disabledBtn?: boolean
}

const Resume = ({ disabledBtn = false }: Props) => {
  const [isLoading, setIsLoading] = useState(true)
  const { subTotalCost, totalCost, totalProducts } = useCartStore(useShallow((state) => state.getSummaryCart()))

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <h2 className="text-2xl font-bold mb-2">Resume</h2>

      <div className="grid grid-cols-2">
        {
          isLoading
            ? <div>Loading...</div>
            : (
              <>
                <span>Nro. Products</span>
                <span className="text-right">{totalProducts === 1 ? '1 article' : `${totalProducts} articles`}</span>

                <span>SubTotal</span>
                <span className="text-right">${subTotalCost.toFixed(2)}</span>

                <span>Taxes (15%)</span>
                <span className="text-right">${(subTotalCost * 0.15).toFixed(2)}</span>

                <span className="text-2xl font-semibold mt-5">Total</span>
                <span className="text-right font-semibold text-2xl mt-5">${totalCost.toFixed(2)}</span>
              </>
            )
        }
      </div>

      {
        (!disabledBtn && totalProducts !== 0) && (
          <div className="mt-5 mb-2 w-full">
            <Link
              className="flex btn-primary justify-center"
              href="/checkout/address"
            >Checkout</Link>
          </div>
        )
      }
    </>
  )
}
export default Resume