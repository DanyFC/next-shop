//export const revalidate = 60

import { redirect } from "next/navigation";

import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Grid, Pagination, Title } from "@/components";

interface Props {
  searchParams: Promise<{
    page: string;
  }>
}

export default async function ShopPage({ searchParams }: Props) {
  const { page } = await searchParams

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page ? parseInt(page) : 1
  })

  if (products.length === 0) redirect('/')

  return (
    <div>
      <Title
        className="mb-2"
        subtitle="All the products"
        title="Shop"
      />

      <Grid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}