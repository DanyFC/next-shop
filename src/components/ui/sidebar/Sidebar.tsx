"use client";

import clsx from "clsx";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPersonAddOutline, IoPersonOutline, IoSearchOutline, IoTicketOutline, IoTicketSharp } from "react-icons/io5";

import { useUIStore } from "@/store";
import SidebarItem from "./SidebarItem";

const sidebarItems = [
  {
    title: 'Profile',
    icon: <IoPersonOutline size={30} />,
    path: '/profile'
  },
  {
    title: 'Orders',
    icon: <IoTicketOutline size={30} />,
    path: '/orders'
  }
]

const sidebarAdminItems = [
  {
    title: 'Products',
    icon: <IoPersonOutline size={30} />,
    path: '/products'
  },
  {
    title: 'Orders',
    icon: <IoTicketSharp size={30} />,
    path: '/'
  },
  {
    title: 'Users',
    icon: <IoPersonAddOutline size={30} />,
    path: '/'
  }
]

const Sidebar = () => {

  const isSidebarOpen = useUIStore(state => state.isSidebarOpen)
  const closeSidebar = useUIStore(state => state.closeSidebar)

  const [isLoading, setIsLoading] = useState(true)

  const { data: session } = useSession()
  const isAuthenticated = !!session?.user
  const isAdmin = (session?.user.role === 'admin')

  const onLogout = async () => {
    localStorage.clear()
    closeSidebar()
    await signOut()
  }

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <div className="">
      {
        isSidebarOpen && (
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
        )
      }

      {
        isSidebarOpen && (
          <div
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
            onClick={() => closeSidebar()}
          />
        )
      }

      <nav className={clsx(
        "fixed p-5 right-0 top-0 w-72 sm:w-96 h-screen bg-white z-20 shadow-2xl transform transition-all duration-300 overflow-y-scroll",
        { "translate-x-full": !isSidebarOpen }
      )}>
        <IoCloseOutline
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSidebar()}
          size={50}
        />

        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-700"
            type="text"
            placeholder="Search"
          />
        </div>

        {!isLoading && !isAuthenticated && (<SidebarItem
          icon={<IoLogInOutline size={30} />}
          path="/auth"
          title="Login"
        />)}

        {!isLoading && isAuthenticated && (sidebarItems.map((item) => (
          <SidebarItem key={item.title} {...item} />
        )))
        }


        {!isLoading && isAuthenticated && isAdmin && (
          <>
            <div className="w-full h-px bg-gray-200 my-10" />

            {sidebarAdminItems.map((item) => (
              <SidebarItem key={item.title} {...item} />
            ))}
          </>
        )}

        {
          !isLoading && isAuthenticated && (
            <>
              <div className="w-full h-px bg-gray-200 my-10" />

              <button className="flex w-full items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
                onClick={() => onLogout()}
              >
                <IoLogOutOutline size={30} />
                <span className="ml-3 text-xl">Log out</span>
              </button>
            </>
          )
        }
      </nav>

    </div>
  )
}
export default Sidebar