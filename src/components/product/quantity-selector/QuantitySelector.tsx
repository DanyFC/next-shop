"use client";

import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity?: number;
}

const QuantitySelector = ({ quantity = 1 }: Props) => {
  const [count, setCount] = useState(quantity)

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return
    setCount(prev => prev + value)
  }

  return (
    <div className="flex">
      <button
        onClick={() => onQuantityChange(-1)}
      ><IoRemoveCircleOutline size={30} /></button>

      <span className="w-20 mx-1 px-2 bg-gray-200 rounded text-center text-xl">{count}</span>

      <button
        onClick={() => onQuantityChange(1)}
      ><IoAddCircleOutline size={30} /></button>
    </div>
  )
}
export default QuantitySelector