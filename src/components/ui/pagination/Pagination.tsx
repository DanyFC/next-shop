"use client";

import clsx from 'clsx';
import Link from "next/link";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

import { generatePaginationNumbers } from "@/utils/generatePagNumbers";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
  totalPages: number;
}

const Pagination = ({ totalPages }: Props) => {

  const pathName = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page')
  let currentPage = isNaN(+pageString!) ? 1 : +pageString!

  if (currentPage < 1) currentPage = 1

  const pagination = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') return `${pathName}?${params.toString()}`

    if (+pageNumber <= 0) return `${pathName}`

    if (+pageNumber > totalPages) return `${pathName}?${params.toString()}`

    params.set('page', pageNumber.toString())
    return `${pathName}?${params.toString()}`
  }

  return (
    <div className="flex justify-center text-center mb-32 mt-5">
      <nav aria-label="Page navigation example">
        <ul className="flex list-style-none">
          <li className="page-item"><Link
            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={createPageUrl(currentPage - 1)}><IoChevronBackOutline size={30} /></Link></li>

          {pagination.map((page, index) => (
            <li
              key={page + '-' + index}
              className="page-item">
              <Link
                className={clsx(
                  "page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none",
                  { "bg-blue-700 text-white hover:text-white hover:bg-blue-800": page === currentPage }
                )}
                href={createPageUrl(page)}>{page}</Link>
            </li>
          ))}

          <li className="page-item"><Link
            className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
            href={createPageUrl(currentPage + 1)} ><IoChevronForwardOutline size={30} /></Link></li>
        </ul>
      </nav>
    </div>
  )
}
export default Pagination