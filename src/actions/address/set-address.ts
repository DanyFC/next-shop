"use server";

import type { Address } from "@/interfaces";
import { prisma } from "@/lib/prisma";

export const setAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplace(address, userId)

    return {
      ok: true,
      address: newAddress
    }
  } catch (error) {
    console.log("🔵 💢 setAddress 💢 error:", error)
    return {
      ok: false,
      error: 'Ops Something goes wrong!!!'
    }
  }
}

const createOrReplace = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.address.findUnique({
      where: {
        userId,
      },
    })

    const addressToSave = {
      userId,
      names: address.names,
      lastNames: address.lastNames,
      address: address.address,
      addressOptional: address.addressOptional,
      postalCode: address.postalCode,
      city: address.city,
      phone: address.phone,
      countryId: address.country,
    }

    if (!storedAddress) {
      const newAddress = await prisma.address.create({
        data: addressToSave,
      })

      return newAddress
    }

    const updatedAddress = await prisma.address.update({
      where: { userId },
      data: addressToSave,
    })

    return updatedAddress
  } catch (error) {
    console.log("🔵 💢 createOrReplace 💢 error:", error)
    throw new Error('Address cant be saved!')
  }
}