import { Metadata } from "next";

import { Footer, Sidebar, TopMenu } from "@/components";

export const metadata: Metadata = {
  title: {
    template: '%s - Next | Shop',
    default: 'Next | Shop'
  },
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

      <Sidebar />

      <div className="px-0 sm:px-10">
        {children}
      </div>

      <Footer />
    </div>
  );
}