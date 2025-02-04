import Link from "next/link";

import { Title } from "@/components";
import OrderDetail from "./ui/OrderDetail";
import ProductsInCart from "./ui/ProductsInCart";

export default function CheckoutPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check order" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Verify your order</span>

            <Link
              href="/cart"
              className="underline mb-5 text-blue-700"
            >Edit cart</Link>

            <ProductsInCart />
          </div>

          <OrderDetail />
        </div>
      </div>
    </div>
  );
}