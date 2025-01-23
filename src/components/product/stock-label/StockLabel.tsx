"use client";

import { getStockBySlug } from "@/actions/product/stock-by-slug";
import { montserrat } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(-1)

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
  }

  useEffect(() => {
    getStock()
  }, [])


  return (
    <h1 className={`${montserrat.className} antialiased font-bold text-xl mb-4`}>Stock: {
      stock < 0 ? "Loading..." : stock
    }</h1>
  )
}
export default StockLabel