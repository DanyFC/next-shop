"use server";

import { auth } from "@/auth/config";
import { prisma } from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  text?: string;
}

export const getAllOrdersPaginated = async ({
  page = 1,
  take = 10,
  text = ''
}: PaginationOptions) => {
  try {
    const session = await auth()

    if (session?.user.role !== 'admin') {
      return {
        ok: false,
        message: 'You are not authorized to access this route',
      }
    }

    const orders = await prisma.order.findMany({
      where: (text ? {
        OR: [
          { id: { contains: text } }
        ]
      } : {}),
      orderBy: {
        createdAt: 'desc'
      },
      take,
      skip: (page - 1) * take,
      include: {
        AddressOrder: {
          select: {
            names: true,
            lastNames: true
          }
        }
      }
    })

    if (orders.length === 0) throw new Error('Orders not Found!')

    const totalOrders = await prisma.order.count()

    return {
      ok: true,
      orders,
      totalPages: Math.ceil(totalOrders / take),
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}