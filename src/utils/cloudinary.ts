import { v2 as cloudinary } from 'cloudinary';
import { envConfig } from './config';

const { cloudinayUrl } = envConfig()

cloudinary.config(cloudinayUrl ?? '')

export const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      const buffer = await image.arrayBuffer()
      const base64Image = Buffer.from(buffer).toString('base64')

      return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
        .then(res => res.secure_url)
    })

    const uploadedImages = await Promise.all(uploadPromises)

    return {
      ok: true,
      data: uploadedImages
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error uploading images!',
    }
  }
}

export const deleteImage = async (imageName: string) => {
  try {
    await cloudinary.uploader.destroy(imageName)

    return {
      ok: true,
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error deleting image!',
    }
  }
}