import { create } from "zustand";

import { persist } from "zustand/middleware";

import { CartProduct } from "@/interfaces";

interface SummaryCart {
  totalProducts: number;
  subTotalCost: number;
  totalCost: number;
}

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryCart: () => SummaryCart;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  deleteProductToCart: (product: CartProduct,) => void;
  clearCart: () =>void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get()

        return cart.reduce((acc, current) => acc + current.quantity, 0)
      },

      getSummaryCart: () => {
        const { cart } = get()

        const totalProducts = cart.reduce((acc, current) => acc + current.quantity, 0)
        const subTotalCost = cart.reduce((acc, current) => acc + (current.price * current.quantity), 0)
        const totalCost = subTotalCost + (0.15 * subTotalCost)

        return { totalProducts, subTotalCost, totalCost }
      },

      addProductToCart: (product) => {
        const { cart } = get()

        const productInCart = cart.some(
          (item) => (item.id === product.id && item.size === product.size)
        )
        if (!productInCart) return set({ cart: [...cart, product] })

        const updatedCartProducts = cart.map(
          (item) => {
            if (item.id === product.id && item.size === product.size)
              return { ...item, quantity: (item.quantity + product.quantity) }

            return item
          }
        )

        set({ cart: updatedCartProducts })
      },

      updateProductQuantity: (product, quantity) => {
        const { cart } = get()
        const updatedCartProducts = cart.map(
          (productInCart) => {
            if (productInCart.id === product.id && productInCart.size === product.size)
              return { ...productInCart, quantity: quantity }

            return productInCart
          }
        )

        set({ cart: updatedCartProducts })
      },

      deleteProductToCart: (product) => {
        const { cart } = get()
        const updatedCartProducts = cart.filter(
          (productInCart) => productInCart.id !== product.id || productInCart.size !== product.size
        )

        set({ cart: updatedCartProducts })
      },

      clearCart: () =>{
        set({ cart: [] })
      }
    })
    , {
      name: 'shopping-cart'
    }
  )


)