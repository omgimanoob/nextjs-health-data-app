import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-table/dist/bootstrap-table.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import BootstrapClient from "@/components/BootstrapClient"; // client only
import SearchNavbar from "../components/SearchNavbar";
import { fetchUserList } from "@/utils/api";
import { User } from "@/lib/definitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Data App",
  description: "Health Monitoring Powered by Vitalz",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const users: User[] = await fetchUserList();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchNavbar users={users} placeholder="Select / find a user" />
        <main>
          <div className="container mt-4 py-5">{children}</div>
        </main>
        <BootstrapClient />
        
      </body>
    </html>
  );
}
