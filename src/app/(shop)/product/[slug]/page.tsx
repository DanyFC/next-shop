import { notFound } from "next/navigation";

import { QuantitySelector, SizeSelector, SlideShow, SlideShowMobile } from "@/components";
import { montserrat } from "@/config/fonts";
import { initialData } from "@/seed/seed";

interface Props {
  params: Promise<{
    slug: string;
  }>
}
export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = initialData.products.find(product => product.slug === slug)

  if (!product) notFound()

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 sm:grid-cols-3 gap-3">
      <div className="col-span-1 sm:col-span-2">
        <SlideShowMobile images={product.images} title={product.title} className="block sm:hidden" />

        <SlideShow images={product.images} title={product.title} className="hidden sm:block"/>
      </div>

      <div className="col-span-1 px-5 ">
        <h1 className={`${montserrat.className} antialiased font-bold text-xl`}>{product.title}</h1>

        <p className="text-lg mb-5">${product.price.toFixed(2)}</p>

        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        <QuantitySelector />

        <button className="btn-primary my-5">Add to cart</button>

        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}