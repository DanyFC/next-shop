"use server";

import { auth } from "@/auth/config";
import { Address, Size } from "@/interfaces";
import { prisma } from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: string;
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {
  try {
    const session = await auth()
    const userId = session?.user.id

    if (!userId) return { ok: false, message: "Session don't exists!" }

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds.map((p) => p.productId) }
      }
    })

    const productsInOrder = productIds.reduce((acc, item) => acc + item.quantity, 0)

    const { subTotal, tax, total } = productIds.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.productId)

      if (!product) throw new Error(`The item ${item.productId} don't exist in database!`)

      acc.subTotal += product.price * item.quantity
      acc.tax += product.price * item.quantity * 0.15
      acc.total += product.price * item.quantity * 1.15

      return acc
    }, { subTotal: 0, tax: 0, total: 0 })

    const prismaTx = await prisma.$transaction(async (tx) => {

      const updatedProductsPromises = products.map((p) => {
        const productQuantity = productIds
          .filter((product) => product.productId === p.id)
          .reduce((acc, item) => acc + item.quantity, 0)

        if (productQuantity === 0) throw new Error(`The product ${p.title} don't have declared quantity!`)

        return tx.product.update({
          where: { id: p.id },
          data: {
            inStock: {
              decrement: productQuantity
            }
          },
        })
      })

      const updatedProducts = await Promise.all(updatedProductsPromises)

      updatedProducts.forEach((p) => {
        if (p.inStock < 0)
          throw new Error(`The product ${p.title} don't have enough stock to fulfill the order!`)
      })

      const order = await tx.order.create({
        data: {
          subTotal,
          tax,
          total,
          productsInOrder,
          isPaid: false,
          userId,

          ProductOrder: {
            createMany: {
              data: productIds.map(p => ({
                quantity: p.quantity,
                size: p.size as Size,
                productId: p.productId,
                price: products.find(product => product.id === p.productId)?.price ?? 0
              }))
            }
          }
        }
      })

      const { country, ...restAddress } = address

      const addressOrder = await tx.addressOrder.create({
        data: {
          ...restAddress,
          CountryId: country,
          orderId: order.id
        }
      })

      return {
        order,
        updatedProducts,
        addressOrder
      }

    })

    return { ok: true, message: "Order created successfully!", order: prismaTx.order }
  } catch (error: any) {

    return {
      status: false,
      message: error?.message,
    }
  }
}