import Link from "next/link";
import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { auth } from "@/auth/config";
import { Pagination, ProductImage, Table, Title } from "@/components";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

const headers = ['Image', 'Name', 'Price', 'Gender', 'Stock', 'Sizes', 'Options']

export default async function ProductsMaintenancePage({ searchParams }: Props) {
  const { page } = await searchParams
  const session = await auth()

  if (!session?.user) redirect('/auth')

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page ? parseInt(page) : 1,
    take: 10
  })

  return (
    <>
      <Title title="All products" subtitle="Products maintenance page." />

      <div className="flex justify-end mb-5">
        <Link
          href={'/maintenance/product/new'}
          className="btn-primary"
        >New product</Link>
      </div>

      <div className="mb-10">
        <Table headers={headers}>
          {
            products.map((product) => (
              <tr key={product.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.images[0]}
                      alt={product.title}
                      height={80}
                      width={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>

                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                  {product.title}
                </td>

                <td className="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  ${product.price.toFixed(2)}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>

                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>

                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(', ')}
                </td>

                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/maintenance/products/${product.slug}`}
                    className="btn-secondary"
                  >
                    Update
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