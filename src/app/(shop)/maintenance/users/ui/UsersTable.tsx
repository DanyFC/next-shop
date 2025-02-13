import { Table } from "@/components";
import { User } from "@/interfaces";
import UserRoleSelect from "./UserRoleSelect";

interface Props {
  users: User[]
}

const headers = ['#ID', 'name', 'Email', 'Role']

const UsersTable = ({ users = [] }: Props) => {

  return (
    <Table headers={headers}>
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
    </Table>
  )
}
export default UsersTable