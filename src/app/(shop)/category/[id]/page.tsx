import { getPaginatedProductsWithImages } from "@/actions/product/product-pagination";
import { Grid, Pagination, Title } from "@/components";
import { Category } from "@/interfaces";

interface Props {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { id } = await params
  const { page } = await searchParams

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page: page ? parseInt(page) : 1,
    gender: id as Category,
  })
  
  // if (id === 'kids') notFound()

  return (
    <div>
      <Title
        className="mb-2"
        subtitle={`All the products for ${id}s`}
        title={`${id.charAt(0).toUpperCase()}${id.slice(1)}s`}
      />

      <Grid products={products} />

      <Pagination totalPages={totalPages} />
    </div>
  );
}