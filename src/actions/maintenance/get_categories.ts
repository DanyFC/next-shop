"use server";

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy:{
        name: 'asc'
      }
    })

    return {
      ok: true,
      categories
    }
  } catch (error: any) {
    return {
      ok: false,
      categories: [],
      message: error?.message,
    }
  }
}