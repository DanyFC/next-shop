"use client";

import { Resume } from "@/components";
import { useAddressStore } from "@/store";

const OrderDetail = () => {
  const address = useAddressStore((state) => state.address)


  return (
    <div>
      <div className="bg-white rounded-xl shadow-xl p-7">
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
            className="flex btn-primary w-full justify-center"
          // href="/orders/123"
          >Confirm order</button>
        </div>
      </div>
    </div>
  )
}
export default OrderDetail