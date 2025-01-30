"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoLogoFacebook, IoLogoGithub, IoLogoGoogle, IoLogoLinkedin } from "react-icons/io5";
import { useRouter } from "next/navigation";

import { authenticate } from "@/actions/auth/login";
import { registerUser } from "@/actions/auth/register";
import { montserrat } from "@/config/fonts";

type FormInputs = {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>()

  const [errorMessage, setErrorMessage] = useState('')

  const router = useRouter()

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { email, name, password } = data

    const resp = await registerUser(name, email, password)

    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }

    await authenticate(email, password)

    router.replace('/')
  }

  return (
    <form className="bg-white flex items-center justify-center flex-col px-10 h-full" onSubmit={handleSubmit(onSubmit)}>
      <h1 className={`text-xl font-bold ${montserrat.className}`}>Create Account</h1>

      <div className="my-2 flex gap-8">
        <Link
          href="#"
          className="text-gray-600 text-sm no-underline mt-4 mb-3 "
        ><IoLogoGoogle size={32} color="#333" /></Link>
        <Link
          href="#"
          className="text-gray-600 text-sm no-underline mt-4 mb-3 "
        ><IoLogoFacebook size={32} color="#333" /></Link>
        <Link
          href="#"
          className="text-gray-600 text-sm no-underline mt-4 mb-3 "
        ><IoLogoGithub size={32} color="#333" /></Link>
        <Link
          href="#"
          className="text-gray-600 text-sm no-underline mt-4 mb-3 "
        ><IoLogoLinkedin size={32} color="#333" /></Link>
      </div>

      <span className={`text-sm text-gray-500 ${montserrat.className}`}>or use your email for registration</span>

      <input
        className={clsx(
          "bg-[#eee] border border-transparent my-2 py-3 px-4 text-sm rounded-lg w-full outline-none",
          { "border-solid border-red-500": !!errors.name }
        )}
        type="text"
        placeholder="Name"
        {...register('name', { required: true })}
      />
      <input
        className={clsx(
          "bg-[#eee] border border-transparent my-2 py-3 px-4 text-sm rounded-lg w-full outline-none",
          { "border-solid border-red-500": !!errors.email }
        )}
        type="email"
        placeholder="Email"
        {...register('email', {
          required: true,
          pattern: /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        })}
      />
      <input
        className={clsx(
          "bg-[#eee] border border-transparent my-2 py-3 px-4 text-sm rounded-lg w-full outline-none",
          { "border-solid border-red-500": !!errors.password }
        )}
        type="password"
        placeholder="Password"
        {...register('password', { required: true, minLength: 6 })}
      />

      {errorMessage && <span className="text-sm text-red-500 font-bold">{errorMessage}</span>}

      <button className="bg-[#2da0a8] text-white text-sm py-3 px-11 border border-solid border-transparent rounded-lg font-bold tracking-normal uppercase mt-2 cursor-pointer">Sign Up</button>

    </form>
  )
}
export default RegisterForm