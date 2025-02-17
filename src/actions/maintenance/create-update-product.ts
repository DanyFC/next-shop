"use server";

import { Size } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
  inStock: z.coerce.number().min(0).transform(val => Number(val)),
  sizes: z.coerce.string().transform(val => val.split(',')),
  tags: z.string(),
  categoryId: z.string().uuid(),
  gender: z.nativeEnum(Gender),
})

export const createUpdateProduct = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData)
    const productParsed = productSchema.safeParse(data)

    if (!productParsed.success) {
      console.log("🔥 🔜 create-update-product.ts 🔜 createUpdateProduct 🔜 productParsed:", productParsed.error)
      
      throw new Error('Invalid data!')
    }

    const product = productParsed.data
    product.slug = product.slug.toLocaleLowerCase().replace(/ /g, '-').trim()

    const { id, ...rest } = product
    const prismaTx = await prisma.$transaction(async (tx) => {
      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase())

      if (id) {
        const updatedProduct = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })

        revalidatePath(`/maintenance/products/${rest.slug}`)
        return {
          product: updatedProduct
        }
      }

      const savedProduct = await tx.product.create({
        data: {
          ...rest,
          sizes: {
            set: rest.sizes as Size[]
          },
          tags: {
            set: tagsArray
          }
        }
      })

      revalidatePath('/maintenance/products/new')
      return {
        product: savedProduct
      }
    })

    return {
      ok: true,
      product: prismaTx.product
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}