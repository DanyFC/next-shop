"use client";

import Link from "next/link";
import { useState } from "react";

import { ProductImage } from '@/components';
import { Product } from "@/interfaces";

interface Props {
  product: Product;
}
const GridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          src={displayImage}
          alt={product.title}
          className="w-full object-contain rounded-md"
          width={500}
          height={500}

          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-700"
          href={`/product/${product.slug}`}
        >{product.title}</Link>

        <span className="font-bold">${product.price.toFixed(2)}</span>

      </div>
    </div>
  )
}
export default GridItem