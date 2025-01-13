import Link from "next/link";

import { CartItem, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  initialData.products[2],
  initialData.products[4],
  initialData.products[5],
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
              className="underline mb-5"
            >Continue shopping</Link>


            {
              productsInCart.map(product => (<CartItem key={product.slug} product={product} />))
            }
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-xl p-7">
              <h2 className="text-2xl mb-2">Resume</h2>

              <div className="grid grid-cols-2">
                <span>Nro. Products</span>
                <span className="text-right">3 articles</span>

                <span>SubTotal</span>
                <span className="text-right">$ 100.00</span>

                <span>Taxes (15%)</span>
                <span className="text-right">$ 100.00</span>

                <span className="text-2xl mt-5">Total</span>
                <span className="text-right text-2xl mt-5">$ 100.00</span>
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