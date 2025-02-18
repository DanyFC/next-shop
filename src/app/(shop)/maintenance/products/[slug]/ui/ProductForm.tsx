"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { createUpdateProduct } from "@/actions/maintenance/create-update-product";
import { deleteProductImage } from "@/actions/maintenance/delete-product-image";
import { ProductImage } from "@/components";
import { Category, Product } from "@/interfaces";
import { ProductImage as ProductImageInterface } from "@prisma/client";

interface Props {
  product: Product & {
    ProductImage?: ProductImageInterface[]
  };
  categories: {
    id: string;
    name: string;
  }[]
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  inStock: number;
  sizes: string[];
  tags: string;
  gender: Category;
  categoryId: string;

  images?: FileList;
}

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

export const ProductForm = ({ product, categories }: Props) => {

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { isValid },
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      title: product?.title || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price || 0,
      inStock: product?.inStock || 0,
      sizes: product?.sizes || [],
      tags: product?.tags?.join(', ') || "",
      gender: product?.gender || "men",
      categoryId: product?.type || "",

      images: undefined
    }
  })

  watch('sizes')

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true)
    const formData = new FormData()
    const { images, ...productToSave } = data

    if (product.id) {
      formData.append('id', product.id ?? null)
    }
    formData.append('title', productToSave.title)
    formData.append('slug', productToSave.slug)
    formData.append('description', productToSave.description)
    formData.append('price', productToSave.price.toString())
    formData.append('inStock', productToSave.inStock.toString())
    formData.append('sizes', productToSave.sizes.toString())
    formData.append('tags', productToSave.tags)
    formData.append('categoryId', productToSave.categoryId)
    formData.append('gender', productToSave.gender)
    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i])
      }
    }

    const { ok, message, product: savedProduct } = await createUpdateProduct(formData)
    if (!ok) return setErrorMessage(message)

    setIsLoading(false)
    router.replace(`/maintenance/products/${savedProduct?.slug}`)
  }

  const onSizeChange = (size: string) => {
    const sizes = new Set(getValues('sizes'))

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    sizes.has(size)
      ? sizes.delete(size)
      : sizes.add(size)

    setValue('sizes', Array.from(sizes))
  }

  return (
    <form className=" relative grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3" onSubmit={handleSubmit(onSubmit)}>

      {errorMessage && (
        <div className="absolute -bottom-14 left-0 bg-red-500 py-2 px-4 rounded">
          <span className="text-white font-bold text-lg">{errorMessage}</span>
        </div>
      )}

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Title</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('title', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Description</span>
          <textarea
            rows={5}
            className="p-2 border rounded-md bg-gray-200"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="flex flex-col mb-2">
          <span>Price</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('price', { required: true, valueAsNumber: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('tags', { required: true })}
          />
        </div>

        <div className="flex flex-col mb-2">
          <span>Gender</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('gender', { required: true })}
          >
            <option value="">[Select]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Category</span>
          <select
            className="p-2 border rounded-md bg-gray-200"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Select]</option>
            {
              categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))
            }
          </select>
        </div>

        <button
          className={clsx(
            "w-full",
            { "btn-primary": isValid && !isLoading },
            { "btn-secondary": !isValid || isLoading }
          )}
          disabled={!isValid && isLoading}
        >
          Save
        </button>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Stock</span>
          <input
            type="text"
            className="p-2 border rounded-md bg-gray-200"
            {...register('inStock', { required: true, valueAsNumber: true, min: 0 })}
          />
        </div>

        <div className="flex flex-col">
          <span>Sizes</span>

          <div className="flex flex-wrap">
            {
              sizes.map(size => (
                <div
                  key={size}
                  onClick={() => onSizeChange(size)}
                  className={clsx(
                    "flex items-center justify-center w-10 h-10 mr-2 border border-solid rounded-lg transition-all cursor-pointer",
                    { "bg-blue-700 text-white border-none": getValues('sizes').includes(size) }
                  )}
                >
                  <span>{size}</span>
                </div>
              ))
            }
          </div>

          <div className="flex flex-col mb-2">
            <span>Images</span>

            <input
              type="file"
              multiple
              className="p-2 border rounded-md bg-gray-200"
              accept="image/png, image/jpeg, image/avif"
              {...register('images')}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {
              product?.ProductImage?.map((image) => (
                <div key={image.id} className="relative">
                  <ProductImage
                    alt={product.title ?? ''}
                    src={image.url}
                    width={300}
                    height={300}
                    className="rounded shadow-md"
                  />

                  <button
                    type="button"
                    className="absolute bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 text-xl rounded shadow-md top-0 right-0"
                    onClick={() => deleteProductImage(image.id, image.url)}
                  >&#x2718;</button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </form>
  )
}