import { getUsersPaginated } from "@/actions/maintenance/get-users";
import { Pagination, Title } from "@/components";
import UsersTable from "./ui/UsersTable";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

export default async function UsersMaintenancePage({ searchParams }: Props) {
  const { page } = await searchParams
  const {
    ok,
    totalPages = 1,
    users = [],
    message = 'Ops something goes wrong!'
  } = await getUsersPaginated({
    page: page ? parseInt(page) : 1,
    take: 10
  })

  if (!ok) return (
    <div>
      <Title title="All users" subtitle="Users maintenance" />
      <h1 className='text-2xl font-medium mt-4 mb-10'>{message}</h1>
    </div>
  )

  return (
    <>
      <Title title="All Users" subtitle="Users maintenance" />

      <div className="mb-10">
        <UsersTable users={users} />
      </div>

      <Pagination totalPages={totalPages} />
    </>
  );
}