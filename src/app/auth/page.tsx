"use client";

import { useState } from "react";

import { BannerForm, LoginForm, RegisterForm } from "@/components";
import clsx from "clsx";
import { IoArrowRedoSharp } from "react-icons/io5";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="bg-white rounded-3xl shadow-md relative overflow-hidden w-4/5 max-w-full py-10 flex justify-center flex-col sm:flex-row">
      <div className={clsx(
        "relative h-full transition-all ease-in-out right-0 w-full sm:w-1/2",
        { "z-0": isLogin },
        { "z-10": !isLogin }
      )}>
        <RegisterForm />
      </div>

      <div className={clsx(
        "absolute sm:relative h-full transition-all ease-in-out right-0 w-full sm:w-1/2",
        { "z-10": isLogin },
        { "z-0": !isLogin }
      )}>
        <LoginForm />
      </div>

      <BannerForm />

      <div
        className="absolute sm:hidden z-20 right-0 bottom-0 p-2 bg-[#2da0a8] rounded-tl-lg cursor-pointer"
        onClick={() => setIsLogin(!isLogin)}
      >
        <IoArrowRedoSharp size={32} color="#fff" />
      </div>
    </div>
  );
}