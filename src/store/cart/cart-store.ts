import { create } from "zustand";

import { CartProduct } from "@/interfaces";
import { persist } from "zustand/middleware";


interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  // updateProductToCart: ()=>void;
  // deleteProductToCart: ()=>void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      addProductToCart: (product) => {
        const { cart } = get()

        const productInCart = cart.some(
          (item) => (item.id === product.id && item.size === product.size)
        )
        if (!productInCart) return set({ cart: [...cart, product] })

        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity: (item.quantity + product.quantity) }

          return item
        })
        set({ cart: updatedCartProducts })
      }

    })
    , {
      name: 'shopping-cart'
    }
  )


)