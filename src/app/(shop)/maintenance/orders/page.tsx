import clsx from "clsx";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline, IoMailOpenOutline } from "react-icons/io5";

import { getAllOrdersPaginated } from "@/actions/maintenance/get-orders";
import { auth } from "@/auth/config";
import { Pagination, Table, Title } from "@/components";

interface Props {
  searchParams: Promise<{
    page?: string;
  }>
}

const headers = ['#ID', 'Full names', 'Created at', 'Status', 'Shipping status', 'Options']

export default async function OrdersMaintenancePage({ searchParams }: Props) {
  const { page } = await searchParams

  const session = await auth()
  const {
    ok,
    orders = [],
    totalPages = 1,
    message = 'Oops something goes wrong!'
  } = await getAllOrdersPaginated({
    page: page ? parseInt(page) : 1,
    take: 10,
    text: ''
  })

  if (!session?.user) redirect('/auth')

  if (!ok) return (
    <div>
      <Title title="All orders" />
      <h1 className='text-2xl font-medium mt-4 mb-10'>{message}</h1>
    </div>
  )

  return (
    <>
      <Title title="All orders" />

      <div className="mb-10">
        <Table headers={headers}>
          {
            orders.map((order) => (
              <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-').at(-1)}</td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.AddressOrder?.names + ', ' + order.AddressOrder?.lastNames}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.createdAt.toISOString().split('T')[0]}
                </td>

                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <IoCardOutline
                    className={clsx(
                      { "text-green-800": order.isPaid },
                      { "text-red-800": !order.isPaid },
                    )}
                  />

                  <span className={clsx(
                    'mx-2',
                    { "text-green-800": order.isPaid },
                    { "text-red-800": !order.isPaid },
                  )}
                  >
                    {order.isPaid ? `Paid - ${order.paidAt?.toISOString().split('T')[0]}` : 'Not Paid'}
                  </span>
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4">
                  <div className="flex items-center">
                    <IoMailOpenOutline
                      className={clsx(
                        { "text-green-800": order.isSend },
                        { "text-red-800": !order.isSend },
                      )}
                    />

                    <span className={clsx(
                      'mx-2',
                      { "text-green-800": order.isSend },
                      { "text-red-800": !order.isSend },
                    )}
                    >
                      {order.isSend ? `Sent - ${order.paidAt?.toISOString().split('T')[0]}` : 'Not Sent'}
                    </span>
                  </div>
                </td>

                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    See order
                  </Link>
                </td>
              </tr>
            ))
          }
        </Table>
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}