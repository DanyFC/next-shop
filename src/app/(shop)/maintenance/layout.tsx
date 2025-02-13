import { redirect } from "next/navigation";

import { auth } from "@/auth/config";

export default async function MaintenanceLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth()

  if (session?.user.role !== 'admin') redirect('/')

  return (
    <div>
      {children}
    </div>
  );
}