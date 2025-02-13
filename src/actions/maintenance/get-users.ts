"use server";

import { auth } from "@/auth/config";
import { prisma } from "@/lib/prisma";

interface PaginationProps {
  page?: number;
  take?: number;
}

export const getUsersPaginated = async ({
  page = 1,
  take = 10,
}: PaginationProps) => {
  try {
    const session = await auth()

    if (session?.user.role !== 'admin') throw new Error('You are not an admin!')

    const users = await prisma.user.findMany({
      orderBy: {
        name: 'desc'
      },
      take,
      skip: (page - 1) * take,
      select: {
        email: true,
        id: true,
        name: true,
        role: true,
      }
    })
    if (users.length === 0) throw new Error('Users not found!')

    const totalUsers = await prisma.user.count()
    return {
      ok: true,
      users,
      totalPages: Math.ceil(totalUsers / take)
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}