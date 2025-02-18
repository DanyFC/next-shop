"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { deleteImage } from "@/utils/cloudinary";

export const deleteProductImage = async (id: number, url: string) => {
  try {
    if (!url.startsWith('http')) {
      throw new Error('Images from filesystem cant be deleted!')
    }

    const imageName = url.split('/').pop()?.split('.')[0]
    const { ok, message } = await deleteImage(imageName!)

    if (!ok) {
      return console.log("🔥 🔜 delete-product-image.ts 🔜 deleProductImage 🔜 message:", message)
    }

    const deletedImage = await prisma.productImage.delete({
      where: { id },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath('/maintenance/products')
    revalidatePath(`/maintenance/products/${deletedImage.product.slug}`)
    revalidatePath(`/product/${deletedImage.product.slug}`)

    return {
      ok: true
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error.message ?? `The image${id} cant be deleted!`
    }
  }
}