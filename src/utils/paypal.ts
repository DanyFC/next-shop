"use server";

import { PaypalOrderDetailResponse } from "@/interfaces";
import { envConfig } from "./config";

export const getPaypalBearerToken = async (): Promise<string | null> => {
  const { oAuthUrl, paypalClientId, paypalSecret } = envConfig()

  const base64token = Buffer.from(
    `${paypalClientId}:${paypalSecret}`,
    "utf8"
  ).toString('base64')

  const headersList = {
    "Accept": "*/*",
    "Authorization": `Basic ${base64token}`,
    "Content-Type": "application/x-www-form-urlencoded",
    cache: 'no-cache'
  }

  const bodyContent = "grant_type=client_credentials"

  try {
    const response = await fetch(`${oAuthUrl}`, {
      method: "POST",
      body: bodyContent,
      headers: headersList
    })

    const data = await response.json()
    return data.access_token
  } catch (error) {
    return null
  }
}

export const verifyPaypalOrderDetail = async (transactionId: string, token: string): Promise<PaypalOrderDetailResponse | null> => {
  const { orderDetailUrl } = envConfig()

  const headersList = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  }

  try {
    const response = await fetch(`${orderDetailUrl}/${transactionId}`, {
      method: "GET",
      headers: headersList,
      cache: 'no-cache'
    })

    const data = await response.json()

    return data
  } catch (error) {
    return null
  }
}