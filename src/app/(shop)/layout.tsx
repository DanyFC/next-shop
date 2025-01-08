import { Metadata } from "next";

import { TopMenu } from "@/components";

export const metadata: Metadata = {
  title: 'Next-Shop',
  description: 'Shop main page',
};

export default function ShopLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <TopMenu />

      <div className="px-0 sm:px-10">
      {children}
      </div>
    </div>
  );
}