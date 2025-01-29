import { auth } from "@/auth/config";
import { Title } from "@/components";
import { redirect } from "next/navigation";

import { montserrat } from "@/config/fonts";

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) redirect('/auth')

  return (
    <div className="flex flex-col gap-2">
      <Title title="Profile" subtitle="User session data:" />
      <pre className={`${montserrat.className} antialiased text-xl font-semibold ml-4 sm:ml-0`}>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
}