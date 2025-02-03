import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    names: string;
    lastNames: string;
    address: string;
    addressOptional: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    remember: boolean;
  },

  setAddress: (address: State['address']) => void
}

export const useAddressStore = create<State>()(
  persist(
    (set) => ({
      address: {
        names: '',
        lastNames: '',
        address: '',
        addressOptional: '',
        postalCode: '',
        city: '',
        country: '',
        phone: '',
        remember: false
      },

      setAddress: (address)=>{
        set({address})
      }

    }),
    {
      name: 'address-checkout',
    }
  )
)