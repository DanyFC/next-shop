"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Product } from "@/interfaces";

interface Props {
  product: Product;
}
const GridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-contain rounded-md"
          width={500}
          height={500}

          onMouseEnter={()=>setDisplayImage(product.images[1])}
          onMouseLeave={()=>setDisplayImage(product.images[0])}
        />
      </Link>

      <div className="p-4 flex flex-col">
        <Link
          className="hover:text-blue-700"
          href={`/products/${product.slug}`}
        >{product.title}</Link>

        <span className="font-bold">${product.price.toFixed(2)}</span>

      </div>
    </div>
  )
}
export default GridItem