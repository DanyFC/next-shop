import Link from "next/link";

import { CartItem, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  {...initialData.products[2], id: '123'},
  {...initialData.products[4], id: '123'},
  {...initialData.products[5], id: '123'},
]

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
              className="underline mb-5"
            >Edit cart</Link>

            {
              productsInCart.map(product => (<CartItem key={product.slug} product={product} quantity={3} disabledUi />))
            }
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-xl p-7">
              <h2 className="text-2xl font-bold mb-2">Address direction</h2>

              <div className="mb-10">
                <p className="text-xl">Username and last name</p>
                <p>Av. for find 1</p>
                <p>Av. for find 2</p>
                <p>+26 999-544-333</p>
              </div>

              <div className="w-full h-0.5 rounded bg-gray-200 mb-8" />

              <h2 className="text-2xl font-bold mb-2">Resume</h2>

              <div className="grid grid-cols-2">
                <span>Nro. Products</span>
                <span className="text-right">3 articles</span>

                <span>SubTotal</span>
                <span className="text-right">$100.00</span>

                <span>Taxes (15%)</span>
                <span className="text-right">$100.00</span>

                <span className="text-2xl font-semibold mt-5">Total</span>
                <span className="text-right font-semibold text-2xl mt-5">$100.00</span>
              </div>

              <div className="mt-5 mb-2 w-full">
                <p className="mb-5">
                  {/* disclaimer */}
                  <span className="text-xs">
                    By clicking confirm order, you accept our <a href="#" className="underline text-blue-700">terms and conditions</a> and our <a href="#" className="underline text-blue-700">privacy policy</a>
                  </span>
                </p>

                <Link
                  className="flex btn-primary justify-center"
                  href="/orders/123"
                >Confirm order</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}