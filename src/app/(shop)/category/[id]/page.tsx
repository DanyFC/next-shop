import { Grid, Title } from "@/components";
import { initialData } from "@/seed/seed";

interface Props {
  params: Promise<{
    id: string
  }>
}

const products = initialData.products

export default async function CategoryPage({ params }: Props) {
  const { id } = await params

  const productsByCat = products.filter(product => (product.gender === id))

  // if (id === 'kids') notFound()

  return (
    <div>
      <Title
        className="mb-2"
        subtitle={`All the products for ${id}s`}
        title={`${id.charAt(0).toUpperCase()}${id.slice(1)}s`}
      />
      <Grid products={productsByCat} />
    </div>
  );
}