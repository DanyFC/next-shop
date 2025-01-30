"use client";

import clsx from 'clsx';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from "react";
import { IoInformationOutline, IoLogoFacebook, IoLogoGithub, IoLogoGoogle, IoLogoLinkedin } from "react-icons/io5";

import { login } from "@/actions/auth/login";
import { montserrat } from "@/config/fonts";


const LoginForm = () => {
  const [errorMessage, dispatch, isPending] = useActionState(login, undefined)

  const router = useRouter()

  useEffect(() => {
    if (errorMessage === 'success')
      router.replace('/')
  }, [errorMessage])

  return (
    <form
      className="bg-white flex items-center justify-center flex-col px-10 h-full"
      action={dispatch}
    >
      <h1 className={`text-xl font-bold ${montserrat.className}`}>Log In</h1>

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

      <span className={`text-sm text-gray-500 ${montserrat.className}`}>or use your email password</span>

      <input className="bg-[#eee] border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" name="email" type="email" placeholder="Email" />
      <input className="bg-[#eee] border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" name="password" type="password" placeholder="Password" />

      <button
        className={clsx(
          "bg-[#2da0a8] text-white text-sm py-3 px-11 border border-solid border-transparent rounded-lg font-bold tracking-normal uppercase mt-2 cursor-pointer",
          { "bg-gray-400": isPending }
        )}
        disabled={isPending}
      >Log In</button>
      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {errorMessage && errorMessage !== 'success' && (
          <div className="flex flex-row justify-center items-center">
            <IoInformationOutline size={25} className="text-red-500" />
            <p className="text-lg text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  )
}
export default LoginForm