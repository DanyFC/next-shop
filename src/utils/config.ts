const {
  NEXT_PUBLIC_PAYPAL: paypalClientId,
  PAYPAL_SECRET: paypalSecret,
  PAYPAL_OAUTH_URL: oAuthUrl,
  PAYPAL_ORDERS_URL: orderDetailUrl,
  CLOUDINARY_URL: cloudinayUrl
} = process.env

export const envConfig = () => ({
  paypalClientId,
  paypalSecret,
  oAuthUrl,
  orderDetailUrl,
  cloudinayUrl
})