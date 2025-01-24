import Link from "next/link";

import { montserrat } from "@/config/fonts";
import { IoSearchOutline } from "react-icons/io5";

import CartBtn from "./CartBtn";
import MenuBtn from "./MenuBtn";

const TopMenu = () => {

  return (
    <nav className="flex px-5 justify-between items-center w-full">
      <div>
        <Link href="/">
          <span className={`${montserrat.className} antialiased font-bold `}>Next</span>
          <span> | Shop</span>
        </Link>
      </div>

      <div className="hidden sm:block">
        <Link
          className="m-w p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/men"
        >Mens</Link>

        <Link
          className="m-w p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/women"
        >Womens</Link>

        <Link
          className="m-w p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/kid"
        >Kids</Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/search"
        ><IoSearchOutline className="w-5 h-5" /></Link>

        <CartBtn />

        <MenuBtn />
      </div>
    </nav>
  )
}
export default TopMenu