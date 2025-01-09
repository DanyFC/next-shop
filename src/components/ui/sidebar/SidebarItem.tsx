import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  className?: string;
  icon: ReactNode;
  path: string;
  title: string;
}

const SidebarItem = ({ className = '', icon, path, title }: Props) => {
  return (
    <Link
      className={`${className} flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all`}
      href={path}
    >
      {icon}
      <span className="ml-3 text-xl">{title}</span>
    </Link>
  )
}
export default SidebarItem