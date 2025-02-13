"use server";

import { auth } from "@/auth/config";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const setUserRole = async (userId: string, role: string) => {
  try {
    const session = await auth()

    if (session?.user.role !== 'admin') throw new Error('You are not an admin!')

    const newRole = role === 'admin' ? 'admin' : 'user'

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })

    revalidatePath('/maintenance/users')

    return {
      ok: true,
      message: `User role updated to ${role} successfully`
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}