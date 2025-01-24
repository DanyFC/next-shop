"use client";

import clsx from "clsx";

import { Size } from "@/interfaces";

interface Props {
  availableSizes: Size[];
  selectedSize: Size;

  onSizeChange: (size: string) => void;
}

const SizeSelector = ({ availableSizes, selectedSize, onSizeChange }: Props) => {

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
                { "underline": size === selectedSize }
              )}
              onClick={() => onSizeChange(size)}
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