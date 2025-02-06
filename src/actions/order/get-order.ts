"use server";

import { auth } from "@/auth/config";
import { prisma } from "@/lib/prisma";

export const getOrderById = async (orderId: string) => {
  try {
    const session = await auth()

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        AddressOrder: true,
        ProductOrder: {
          select: {
            price: true,
            quantity: true,
            size: true,

            product: {
              select: {
                title: true,
                slug: true,
                id: true,

                ProductImage: {
                  select: {
                    url: true,
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })

    if (!order) throw new Error(`The order with id: ${orderId} don't exists!`)

    if (session?.user.role === 'user') {
      if (session.user.id !== order.userId)
        throw new Error('You are not the owner of this order!')
    }

    const { AddressOrder, ProductOrder, ...rest } = order

    const products = ProductOrder.map(({ product, ...restProduct }) => {
      return {
        ...product,
        ...restProduct,
        image: product.ProductImage[0].url
      }
    })

    return {
      ok: true,
      order: rest,
      address: AddressOrder,
      products
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}