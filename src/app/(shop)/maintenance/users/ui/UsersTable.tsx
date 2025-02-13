import { User } from "@/interfaces"
import UserRoleSelect from "./UserRoleSelect"

interface Props {
  users: User[]
}

const UsersTable = ({ users = [] }: Props) => {
  return (
    <table className="min-w-full">
      <thead className="bg-gray-200 border-b">
        <tr>
          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            #ID
          </th>

          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Name
          </th>

          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Email
          </th>

          <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user) => (
            <tr key={user.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.id}
              </td>

              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.name}
              </td>

              <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {user.email}
              </td>

              <td className="text-sm text-gray-900 font-light px-6 ">
                <UserRoleSelect user={user} />
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}
export default UsersTable