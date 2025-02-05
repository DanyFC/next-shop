"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { placeOrder } from "@/actions/order/place-order";
import { Resume } from "@/components";
import { useAddressStore } from "@/store";
import { useCartStore } from "@/store/cart/cart-store";

const OrderDetail = () => {
  const [processingOrder, setProcessingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const address = useAddressStore((state) => state.address)
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const onPlacingOrder = async () => {
    setProcessingOrder(true)

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size
    }))

    const { remember, ...rest } = address

    const resp = await placeOrder(productsToOrder, rest)

    if (!resp.ok) {
      setErrorMessage(resp.message)
      setProcessingOrder(false)
      return
    }

    clearCart()
    router.replace(`/orders/${resp.order?.id}`)
  }

  useEffect(() => {
    if (cart.length === 0)
      router.replace('/')
  }, [])

  if (cart.length === 0) {
    return <div className="bg-white rounded-xl shadow-xl p-7 relative">
      <h1 className="text-2xl font-semibold">Cart is empty, redirecting...</h1>
    </div>
  }

  return (
    <div>
      <div className="bg-white rounded-xl shadow-xl p-7 relative">
        {errorMessage && (
          <div className="absolute mb-4 w-11/12 -right-4 -bottom-16 bg-red-600 rounded-lg p-3 shadow-lg">
            <span className="text-white font-bold">{errorMessage}</span>
          </div>
        )}

        <h2 className="text-2xl font-bold mb-2">Address direction</h2>

        <div className="mb-10">
          <p className="text-xl">{address.names} {address.lastNames}</p>
          <p>{address.address}</p>
          <p>{address.addressOptional}</p>
          <p>{address.city}, {address.country} </p>
          <p>{address.postalCode}</p>
          <p>{address.phone}</p>
          <p></p>
        </div>

        <div className="w-full h-0.5 rounded bg-gray-200 mb-8" />

        <Resume disabledBtn={true} />

        <div className="mt-5 mb-2 w-full">
          <p className="mb-5">
            {/* disclaimer */}
            <span className="text-xs">
              By clicking confirm order, you accept our <a href="#" className="underline text-blue-700">terms and conditions</a> and our <a href="#" className="underline text-blue-700">privacy policy</a>
            </span>
          </p>

          <button
            className={clsx(
              "flex w-full justify-center",
              { "btn-primary": !processingOrder },
              { "btn-secondary": processingOrder },
            )}
            onClick={onPlacingOrder}
            disabled={processingOrder}
          >Confirm order</button>
        </div>
      </div>
    </div>
  )
}
export default OrderDetail