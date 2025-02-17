import { redirect } from "next/navigation";

import { getCategories } from "@/actions/maintenance/get_categories";
import { getProductBySlug } from "@/actions/product/product-by-slug";
import { Title } from "@/components";
import { Product } from "@/interfaces";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params

  const [product, { categories }] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ])

  if (!product && slug !== 'new') redirect('/maintenance/products')

  return (
    <>
      <Title title={slug === 'new' ? 'New Product' : 'Update product'} />

      <ProductForm product={{ ...product, type: product?.categoryId } as Product} categories={categories} />
    </>
  );
}