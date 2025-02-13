"use client";

import { useState } from "react";

import { setUserRole } from "@/actions/maintenance/set-user-role";
import { User } from "@/interfaces";

interface Props {
  user: User;
}

const UserRoleSelect = ({ user }: Props) => {
  const [errorMessage, setErrorMessage] = useState<boolean>(false)

  const onChange = async (newRole: string) => {
    const { ok } = await setUserRole(user.id, newRole)

    if (!ok) {
      setErrorMessage(true)

      setTimeout(() => {
        setErrorMessage(false)
      }, 4000)
    }
  }

  return (
    <div className="relative">
      {errorMessage && (
        <div className="absolute bg-red-700 px-4 py-2 text-white font-medium rounded -top-[74px] left-8">
          <span>This operation cant be executed!</span>
        </div>
      )}

      <select
        value={user.role}
        onChange={e => onChange(e.target.value)}
        className="py-2 px-4 font-medium rounded-md w-full text-gray-900 bg-gray-100"
      >
        <option value="admin">Admin</option>
        <option value="user">User</option>
      </select>
    </div>
  )
}
export default UserRoleSelect