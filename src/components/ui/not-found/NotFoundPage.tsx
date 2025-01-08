import { montserrat } from "@/config/fonts"
import Image from "next/image"
import Link from "next/link"

const NotFoundPage = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${montserrat.className} antialiased text-9xl`}>404</h2>

        <p className="font-semibold text-xl">Woops something goes wrong!!</p>

        <p className="font-light">You can go back to
          <Link
            className="font-normal text-blue-700 hover:underline transition-all"
            href="/"
          > home</Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={500}
          height={500}
        />
      </div>
    </div>
  )
}
export default NotFoundPage