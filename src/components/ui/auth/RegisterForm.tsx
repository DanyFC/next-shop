import Link from "next/link";
import { IoLogoFacebook, IoLogoGithub, IoLogoGoogle, IoLogoLinkedin } from "react-icons/io5";

import { montserrat } from "@/config/fonts";

const RegisterForm = () => {
  return (
    <form className="bg-white flex items-center justify-center flex-col px-10 h-full">
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

      <input className="bg-[#eee] border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" type="text" placeholder="Name" />
      <input className="bg-[#eee] border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" type="email" placeholder="Email" />
      <input className="bg-[#eee] border-none my-2 py-3 px-4 text-sm rounded-lg w-full outline-none" type="password" placeholder="Password" />

      <button className="bg-[#2da0a8] text-white text-sm py-3 px-11 border border-solid border-transparent rounded-lg font-bold tracking-normal uppercase mt-2 cursor-pointer">Sign Up</button>
    </form>
  )
}
export default RegisterForm