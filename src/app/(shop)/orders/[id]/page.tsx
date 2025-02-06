import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

import { getOrderById } from "@/actions/order/get-order";
import { CartItem, Title } from "@/components";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function OrderPage({ params }: Props) {
  const { id } = await params
  const { ok, address, order, products } = await getOrderById(id)

  if (!ok) redirect('/')

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-10">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Order N°${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <div className={clsx(
              "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
              { "bg-red-500": !order?.isPaid },
              { "bg-green-700": order?.isPaid }
            )}>
              <IoCardOutline size={30} />

              <span className="mx-2 ">{!order?.isPaid ? 'The order is pending payment.' : 'The order is already paid.'}</span>
            </div>

            {products && (
              products.map(product => (<CartItem key={product.slug + '-' + product.size} product={product} quantity={3} disabledUi />))
            )}
          </div>

          <div>
            <div className="bg-white rounded-xl shadow-xl p-7">
              <h2 className="text-2xl font-bold mb-2">Address direction</h2>

              <div className="mb-10">
                <p className="text-xl">{address!.names} {address!.lastNames}</p>
                <p>{address!.address}</p>
                <p>{address!.addressOptional}</p>
                <p>{address!.city}, {address!.CountryId} </p>
                <p>{address!.postalCode}</p>
                <p>{address!.phone}</p>
              </div>

              <div className="w-full h-0.5 rounded bg-gray-200 mb-8" />

              <h2 className="text-2xl font-bold mb-2">Resume</h2>

              <div className="grid grid-cols-2">
                <span>Nro. Products</span>
                <span className="text-right">{order?.productsInOrder} articles</span>

                <span>SubTotal</span>
                <span className="text-right">${order?.subTotal.toFixed(2)}</span>

                <span>Taxes (15%)</span>
                <span className="text-right">${order?.tax.toFixed(2)}</span>

                <span className="text-2xl font-semibold mt-5">Total</span>
                <span className="text-right font-semibold text-2xl mt-5">${order?.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}