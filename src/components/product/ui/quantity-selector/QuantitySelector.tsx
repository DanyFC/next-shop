"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity?: number;

  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({ quantity = 1, onQuantityChange }: Props) => {


  const onChange = (value: number) => {
    if (quantity + value <= 0 || quantity + value > 10) return

    onQuantityChange(quantity + value)
  }

  return (
    <div className="flex">
      <button
        onClick={() => onChange(-1)}
      ><IoRemoveCircleOutline size={30} /></button>

      <span className="w-20 mx-1 px-2 bg-gray-200 rounded text-center text-xl">{quantity}</span>

      <button
        onClick={() => onChange(1)}
      ><IoAddCircleOutline size={30} /></button>
    </div>
  )
}
export default QuantitySelector