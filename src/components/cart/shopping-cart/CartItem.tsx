"use client";

import Image from "next/image";
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";

import { QuantitySelector } from '@/components';
import { CartProduct } from "@/interfaces";
import { useCartStore } from "@/store/cart/cart-store";

interface Props {
  disabledUi?: boolean;
  product: CartProduct;
  quantity?: number;
}

const CartItem = ({ disabledUi = false, product, quantity = 0 }: Props) => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity)
  const deleteProductToCart = useCartStore((state) => state.deleteProductToCart)

  return (
    <div className="flex justify-between mb-5 pb-4 border-b-gray-300 border-b-2">
      <div className="flex flex-row justify-start gap-4 w-full">
        <div className='flex w-3/12'>
          <Link href={`/product/${product.slug}`}>
            <Image
              src={`/products/${product.image}`}
              alt={product.title}
              width={100}
              height={100}
              className="mr-5 rounded shadow-sm"
              style={{
                width: '100px',
                height: '100%'
              }}
            />
          </Link>
        </div>

        <div className="flex flex-col w-9/12 justify-between">
          <Link href={`/product/${product.slug}`} className="text-lg">{product.title}</Link>



          {!disabledUi && (
            <p className='font-bold'>Size: {product.size}, Price: ${product.price.toFixed(2)}</p>
          )}

          {disabledUi && (
            <p>Size: <span className='font-bold'>{product.size}</span>, Price: <span className='font-bold'>${product.price.toFixed(2)}</span> X <span className='font-bold'>{quantity}</span></p>
          )}

          {disabledUi && (
            <p>Subtotal: <span className='font-bold'>${(quantity * product.price).toFixed(2)}</span></p>
          )}

          {!disabledUi && <QuantitySelector onQuantityChange={(value) => updateProductQuantity(product, value)} quantity={product.quantity} />}
        </div>
      </div>

      {!disabledUi && (
        <button onClick={() => deleteProductToCart(product)}>
          <IoTrashOutline size={35} color="#ad0000" />
        </button>
      )}
    </div>
  )
}
export default CartItem