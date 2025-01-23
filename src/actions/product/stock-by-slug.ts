"use server";

import { prisma } from "@/lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findUnique({
      where: { slug },
      select: {
        inStock: true
      }
    })

    return stock?.inStock ?? 0
  } catch (error) {
    console.error("🔵 💢 file: stock-by-slug.ts:5 💢 getStockBySlug 💢 error:", error);
    throw new Error('Stock by slug cant be loaded.')
  }
}