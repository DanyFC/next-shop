"use server";

import { Category, Type } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Category;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender = 'unisex' }: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1
  if (isNaN(Number(take))) take = 12

  const filter = gender === 'unisex' ? {} : { gender }

  try {
    const products = await prisma.product.findMany({
      where: filter,
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    })

    const typesDB = await prisma.category.findMany()
    const types: { [key: string]: string } = {}
    typesDB.forEach(type => {
      types[type.id] = type.name
    })

    const totalProducts = await prisma.product.count({where: filter})

    return {
      currentPage: page,
      totalPages: Math.ceil(totalProducts / take),
      products: products.map(product => {
        const { categoryId, ProductImage, ...rest } = product

        return {
          ...rest,
          images: ProductImage.map(image => image.url),
          type: types[categoryId] as Type
        }
      })
    }
  } catch (error) {
    console.error("🚀 ~ getPaginatedProductsWithImages ~ error:", error)
    throw new Error('Products cant be loaded.')
  }
}