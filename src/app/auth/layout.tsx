import { redirect } from "next/navigation";

import { auth } from "@/auth/config";

export default async function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth()
  if (session?.user) redirect('/')

  return (
    <div className="bg-[#c9d6ff] bg-gradient-to-r from-[#e2e2e2] to-[#c9d6ff] flex items-center justify-center flex-col min-h-screen">
      {children}
    </div>
  );
}