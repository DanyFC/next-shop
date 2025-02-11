"use server";

import { prisma } from "@/lib/prisma";

export const deleteAddress = async (userId: string) => {
  try {
    await prisma.address.delete({
      where: { userId }
    })
  } catch (error) {
    return {
      ok: false,
      message: 'Error deleting address'
    }
  }
}