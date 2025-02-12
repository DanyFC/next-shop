"use client";

import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from '.pnpm/@paypal+paypal-js@8.2.0/node_modules/@paypal/paypal-js';
import { PayPalButtons, PayPalScriptProvider, usePayPalScriptReducer } from "@paypal/react-paypal-js";

import { paypalCheckPayment } from '@/actions/payments/paypal-payment';
import { setTransactionId } from "@/actions/payments/set-transaction.id";

interface Props {
  orderId: string;
  amount: number;
}

const PaypalButton = ({ amount, orderId }: Props) => {
  const roundedAmount = Math.round(amount * 100) / 100

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            currency_code: 'USD',
            value: roundedAmount.toString(),
          }
        }
      ]
    })

    const { ok } = await setTransactionId(orderId, transactionId)

    if (!ok) throw new Error('Error setting transaction id!')

    return transactionId
  }

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture()
    if (!details) return

    await paypalCheckPayment(details.id ?? '')
  }

  const ButtonWrapper = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    return (
      <>
        {isPending ? (
          <div className="animate-pulse mb-10">
            <div className="h-12 bg-gray-400 rounded" />
            <div className="h-12 bg-gray-400 rounded mt-2" />
          </div>
        ) : (
          <PayPalButtons
            style={{ "layout": "vertical" }}
            disabled={false}
            createOrder={createOrder}
            onApprove={onApprove}
          />
        )}
      </>
    )
  }

  return (
    <div className='relative z-0'>
      <PayPalScriptProvider options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL ?? '',
        intent: 'capture',
        currency: 'USD',
      }}>
        <ButtonWrapper />
      </PayPalScriptProvider>
    </div>
  )
}
export default PaypalButton