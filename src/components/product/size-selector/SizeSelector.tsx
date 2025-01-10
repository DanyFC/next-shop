"use client";

import clsx from "clsx";
import { useState } from "react";

import { Size } from "@/interfaces";

interface Props {
  availableSizes: Size[];
  selectedSize: Size;
}

const SizeSelector = ({ availableSizes, selectedSize }: Props) => {
  const [currentSize, setCurrentSize] = useState(selectedSize)

  return (
    <div className="my-5">
      <h3 className="font-bold mb-2">Size</h3>

      <div className="flex">
        {
          availableSizes.map(size => (
            <button
              key={size}
              className={clsx(
                "mx-2 hover:underline text-xl",
                { "underline": size === currentSize }
              )}
              onClick={() => setCurrentSize(size)}
            >
              {size}
            </button>
          ))
        }
      </div>
    </div>
  )
}
export default SizeSelector