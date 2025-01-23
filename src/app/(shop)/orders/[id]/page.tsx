import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { CartItem, Title } from "@/components";
import { initialData } from "@/seed/seed";

const productsInCart = [
  {...initialData.products[2], id: '123'},
  {...initialData.products[4], id: '123'},
  {...initialData.products[5], id: '123'},
]

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params

  // TODO: verify the order by user

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order N°${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div className={clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
              { "bg-red-500": true },
              { "bg-green-700": false }
            )}>
              <IoCardOutline size={30} />

              <span className="mx-2 ">{true ? 'The order is pending payment.' : 'The order is already paid.'}</span>
            </div>

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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}