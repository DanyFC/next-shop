"use server";

import { prisma } from "@/lib/prisma";

export const getOrdersByUser = async (userId: string) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId },
      include: {
        AddressOrder: {
          select: {
            names: true,
            lastNames: true
          }
        }
      }
    })

    if (orders.length === 0) throw new Error(`No orders found for user!`)

    return {
      ok: true,
      orders
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}