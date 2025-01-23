import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

import { CartItem, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  {...initialData.products[5], id: '123'},
  {...initialData.products[6], id: '123'},
  {...initialData.products[7], id: '123'},
]

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title="Shopping cart" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Add {productsInCart.length > 0 ? 'more ' : ''}items</span>

            <Link
              href="/"
              className="underline mb-5 text-blue-700"
            >Continue shopping</Link>


            {
              productsInCart.map(product => (<CartItem key={product.slug} product={product} />))
            }

            {
              !productsInCart.length && (
                <div className="flex flex-col w-full items-center justify-center py-4">
                  <IoCartOutline size={100} color="#4d4d4d" />

                  <p>The cart is empty</p>
                </div>
              )
            }
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-xl p-7">
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
                <Link
                  className="flex btn-primary justify-center"
                  href="/checkout/address"
                >Checkout</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}