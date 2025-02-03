"use server";

import { prisma } from "@/lib/prisma";

export const getAddress = async (userId: string) => {
  try {
    const address = await prisma.address.findUnique({
      where: { userId }
    })

    if (!address) return null

    const { countryId, lastNames, addressOptional, ...rest } = address

    return {
      ...rest,
      country: countryId || '',
      lastNames: lastNames || '',
      addressOptional: addressOptional || ''
    }
  } catch (error) {
    console.log("🔵 💢 getAddress 💢 error:", error)
    return {}
  }
}