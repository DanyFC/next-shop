"use server";

import { prisma } from "@/lib/prisma";

export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId
      }
    })

    return {
      ok: true
    }
  } catch (error) {
    console.log("🔥 🔜 update-order.ts 🔜 setTransactionId 🔜 error:", error)
    return {
      ok: false,
      message: 'The order cant be updated!'
    }
  }
}