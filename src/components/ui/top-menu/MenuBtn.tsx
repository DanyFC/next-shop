"use client";

import { useUIStore } from "@/store";

const MenuBtn = () => {
  const openSidebar = useUIStore(state => state.openSidebar)

  return (
    <button
      className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
      onClick={() => openSidebar()}
    >Menu</button>
  )
}
export default MenuBtn