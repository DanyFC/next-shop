"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { IoCartOutline } from "react-icons/io5";

import { useCartStore } from "@/store/cart/cart-store";

const CartBtn = () => {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <Link
      href="/cart"
    >
      <div className="relative">
        {(totalItems > 0 && !isLoading) && (<span
          className="absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2 fade-in"
        >{totalItems}</span>)}
        <IoCartOutline className="w-5 h-5" />
      </div>
    </Link>
  )
}
export default CartBtn