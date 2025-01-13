import Image from "next/image";

import { QuantitySelector } from "@/components";
import { Product } from "@/interfaces";
import { IoTrashOutline } from "react-icons/io5";

interface Props {
  product: Product;
}

const CartItem = ({ product }: Props) => {
  return (
    <div className="flex justify-between mb-5 pb-4 border-b-gray-300 border-b-2">
      <div className="flex">
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          width={100}
          height={100}
          className="mr-5 rounded shadow-sm"
          style={{
            width: 'auto',
            height: '100%'
          }}
        />

        <div className="flex flex-col gap-1">
          <p className="text-lg">{product.title}</p>

          <p className="font-bold">$ {product.price.toFixed(2)}</p>

          <QuantitySelector quantity={2} />
        </div>
      </div>

      <button className="">
        <IoTrashOutline size={35} color="#ad0000" />
      </button>
    </div>
  )
}
export default CartItem