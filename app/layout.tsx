//app\layout.tsx
import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import BootstrapClient from "@/components/BootstrapClient.js"; //client only
import SearchNavbar from "../components/SearchNavbar";
import { fetchUserList } from "@/utils/api";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Data App",
  description: "Health Monitoring Powered by Vitalz",
};



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const users = await fetchUserList();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchNavbar users={users} placeholder="Select / find a user" />
        <main>
          <div className="container mt-4 pt-5">{children}</div>
        </main>
      </body>
      <BootstrapClient />
    </html>
  );
}
