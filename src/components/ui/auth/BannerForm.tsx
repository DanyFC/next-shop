"use client";

import clsx from "clsx";
import { useState } from "react";

import { montserrat } from "@/config/fonts";

const BannerForm = () => {
  const [isLogin, setIsLogin] = useState(true)

  const onChange = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className={clsx(
      "hidden sm:block absolute top-0 right-0 w-1/2 h-full overflow-hidden transition-all duration-500 z-50",
      { "rounded-tl-[150px] rounded-bl-[100px]": !isLogin },
      { "-translate-x-full rounded-tr-[100px] rounded-br-[150px]": isLogin },

    )}>
      <div className="bg-[#2da0a8] h-full bg-gradient-to-r from-[#5c6bc0] to-[#2da0a8]">
        <div className="absolute h-full flex items-center justify-center flex-col px-8 text-center top-0 transition-all ease-in-out text-white">
          <h1
            className={`${montserrat.className} font-bold text-5xl`}
          >{isLogin ? 'Welcome Back!' : 'Hello, Friend!'}</h1>

          <p
            className={`${montserrat.className} text-lg leading-5 tracking-normal mt-5 mb-4`}
          >{isLogin ? 'Enter your personal credentials to use all of site features' : 'Register with your personal details to use all of site features.'}</p>

          <p className={`${montserrat.className} text-xl font-bold leading-5 tracking-normal mb-4`}
          >or</p>

          <button
            className="border border-solid border-white py-3 px-11 rounded-lg uppercase font-bold"
            onClick={onChange}
          >{!isLogin ? 'Log In' : 'Sign Up'}</button>
        </div>
      </div>
    </div>
  )
}
export default BannerForm