import Link from "next/link";

import { montserrat } from "@/config/fonts";
import { IoCartOutline, IoSearchOutline } from "react-icons/io5";

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
          href="/category/mens"
        >Mens</Link>

        <Link
          className="m-w p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/womens"
        >Womens</Link>

        <Link
          className="m-w p-2 rounded-md transition-all hover:bg-gray-100"
          href="/category/kids"
        >Kids</Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/search"
        ><IoSearchOutline className="w-5 h-5" /></Link>

        <Link
          href="/cart"
        >
          <div className="relative">
            <span
             className="absolute text-xs rounded-full px-1 font-bold -top-2 bg-blue-700 text-white -right-2"
            >3</span>
            <IoCartOutline className="w-5 h-5" />
          </div>
        </Link>

        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >Menu</button>
      </div>
    </nav>
  )
}
export default TopMenu