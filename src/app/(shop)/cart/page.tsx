import Link from "next/link";

import { ProductsInCart, Resume, Title } from "@/components";

export default function CartPage() {

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title="Shopping cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add more items</span>

            <Link
              href="/"
              className="underline mb-5 text-blue-700"
            >Continue shopping</Link>

            <ProductsInCart />
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-xl p-7">
              <Resume />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}