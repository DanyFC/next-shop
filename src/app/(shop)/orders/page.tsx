import clsx from 'clsx';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';

import { getOrdersByUser } from '@/actions/order/get-orders';
import { auth } from '@/auth/config';
import { Table, Title } from '@/components';

const headers = ['#ID', 'Full name', 'Status', 'Options']

export default async function OrdersPage() {
  const session = await auth()
  const { ok, orders, message } = await getOrdersByUser(session!.user.id)

  if (!session?.user) redirect('/auth')

  if (!ok) return (
    <div>
      <Title title="Orders" />
      <h1 className='text-2xl font-medium mt-4 mb-10'>{message}</h1>
    </div>
  )

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <Table headers={headers}>
          {
            orders!.map((order) => (
              <tr key={order.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id.split('-').at(-1)}</td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.AddressOrder?.names + ', ' + order.AddressOrder?.lastNames}
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
                    {order.isPaid ? 'Paid' : 'Not Paid'}
                  </span>
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
    </>
  );
}