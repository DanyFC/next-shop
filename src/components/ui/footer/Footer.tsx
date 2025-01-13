import { montserrat } from "@/config/fonts";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
      <span className={`${montserrat.className} antialiased font-bold`}>Next </span>

      <span>| Shop</span>

      <span> © {new Date().getFullYear()}</span>
      </Link>

      <Link 
      className="mx-3"
      href="/"
      >Privacy & Legal</Link>
    </div>
  )
}
export default Footer