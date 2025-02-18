"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { Size } from "@/interfaces";
import { prisma } from "@/lib/prisma";
import { uploadImages } from "@/utils/cloudinary";
import { Gender } from "@prisma/client";

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

    if (!productParsed.success) throw new Error('Invalid data, verify the fields!')

    const product = productParsed.data
    product.slug = product.slug.toLocaleLowerCase().replace(/ /g, '-').trim()

    const { id, ...rest } = product
    const prismaTx = await prisma.$transaction(async (tx) => {
      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase())
      let productDB = null

      if (id) {
        productDB = await tx.product.update({
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
      } else {
        productDB = await tx.product.create({
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
      }

      if (!productDB) throw new Error('Error to save the product!')

      // INFO: upload images
      if (formData.getAll('images')) {
        const { ok, data } = await uploadImages(formData.getAll('images') as File[])
        if (!ok) {
          throw new Error('Error to upload images!')
        }

        await tx.productImage.createMany({
          data: data!.map((image) => ({
            url: image,
            productId: productDB.id
          }))
        })
      }

      return {
        product
      }
    })

    revalidatePath('/maintenance/products')
    revalidatePath(`/maintenance/products/${prismaTx.product.slug}`)
    revalidatePath(`/product/${prismaTx.product.slug}`)

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