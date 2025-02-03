"use client";

import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { deleteAddress } from "@/actions/address/delete-address";
import { setAddress as setAddressDB } from '@/actions/address/set-address';
import { useAddressStore } from "@/store";
import { useSession } from "next-auth/react";
import { Address } from "@/interfaces";

interface Props{
  countries: {id:string, name:string}[],
  dbAddress?: Partial<Address> | null
}

type FormInputs = {
  names: string;
  lastNames: string;
  address: string;
  addressOptional: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  remember: boolean;
}

const AddressForm = ({countries, dbAddress = {}}:Props) => {
  const setAddress = useAddressStore((state) => state.setAddress)
  const address = useAddressStore((state) => state.address)

  const { handleSubmit, register, formState: { isValid }, reset } = useForm<FormInputs>({
    defaultValues: {
      ...dbAddress,
      remember: true
    }
  })

  const { data: session } = useSession()

  const onSubmit = (data: FormInputs) => {
    setAddress(data)

    if (data.remember) {
      const { remember, ...rest } = data

      setAddressDB(rest, session!.user.id)
    } else {
      deleteAddress(session!.user.id)
    }
  }

  useEffect(() => {
    if (address.names) {
      reset(address)
    }
  }, [address])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2">
      <div className="flex flex-col mb-2">
        <span>Names</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('names', { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Last Name</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('lastNames')}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('address', { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Address 2 (optional)</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('addressOptional')}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Postal code</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('postalCode', { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>City</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('city', { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2">
        <span>Country</span>
        <select
          className="p-2 border rounded-md bg-gray-200"
          {...register('country', { required: true })}
        >
          <option value="">[ Seleccione ]</option>

          {
            countries.map((country) => (
              <option key={country.id} value={country.id}>{country.name}</option>
            ))
          }
        </select>
      </div>

      <div className="flex flex-col mb-2">
        <span>Phone</span>
        <input
          type="text"
          className="p-2 border rounded-md bg-gray-200"
          {...register('phone', { required: true })}
        />
      </div>

      <div className="flex flex-col mb-2 sm:mt-1">

        <div className="inline-flex items-center mb-5">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
          >
            <input
              type="checkbox"
              className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-400 before:opacity-0 before:transition-opacity checked:border-blue-700 checked:bg-blue-700 checked:before:bg-blue-700 hover:before:opacity-10"
              id="checkbox"
              {...register('remember')}
            />
            <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </label>
          <span>
            Remember me!
          </span>
        </div>

        <button
          type="submit"
          className={clsx(
            "flex w-full sm:w-1/2 justify-center",
            { "btn-primary": isValid },
            { "btn-secondary": !isValid }
          )}
          disabled={!isValid}
        >
          Next
        </button>
      </div>
    </form>
  )
}
export default AddressForm