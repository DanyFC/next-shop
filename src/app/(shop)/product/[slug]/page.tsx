export const revalidate = 604800 // 7 days

import { notFound } from "next/navigation";

import { getProductBySlug } from "@/actions/product/product-by-slug";
import { QuantitySelector, SizeSelector, SlideShow, SlideShowMobile, StockLabel } from "@/components";
import { montserrat } from "@/config/fonts";

interface Props {
  params: Promise<{
    slug: string;
  }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params

  const product = await getProductBySlug(slug)

  return {
    title: product?.title ?? 'Not found product',
    description: product?.description ?? 'Not found product',
    openGraph: {
      title: product?.title ?? 'Not found product',
      description: product?.description ?? 'Not found product',
      images: [`/products/${product?.images[1]}`]
    }
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="col-span-1 sm:col-span-2">
        <SlideShowMobile images={product.images} title={product.title} className="block sm:hidden" />

        <SlideShow images={product.images} title={product.title} className="hidden sm:block" />
      </div>

      <div className="col-span-1 px-5 ">
        <h1 className={`${montserrat.className} antialiased font-bold text-xl`}>{product.title}</h1>

        <p className="text-lg mb-4">${product.price.toFixed(2)}</p>

        <StockLabel slug={slug} />

        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        <QuantitySelector />

        <button className="btn-primary my-5">Add to cart</button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}