"use server";


import { prisma } from "@/lib/prisma";
import { getPaypalBearerToken, verifyPaypalOrderDetail } from "@/utils/paypal";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  try {
    const authToken = await getPaypalBearerToken()
    if (!authToken) throw new Error('No token found!')

    const paypalOrderDetail = await verifyPaypalOrderDetail(transactionId, authToken)
    if (!paypalOrderDetail) throw new Error('Order cant be found')

    const { status, purchase_units } = paypalOrderDetail
    const { invoice_id: orderId } = purchase_units[0]

    if (status !== 'COMPLETED') return { ok: false, message: 'The order is not paid!' }

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date()
      },
    })

    revalidatePath(`/orders/${orderId}`)

    return {
      ok: true,
      message: 'Payment is successful',
    }
  } catch (error: any) {
    console.log("🔥 🔜 paypal-payment.ts 🔜 paypalCheckPayment 🔜 error:", error?.message)

    return {
      ok: false,
      message: error.message,
    }
  }
}