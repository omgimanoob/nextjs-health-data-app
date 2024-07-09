//app\layout.tsx
import type { Metadata } from "next";

import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Inter } from "next/font/google";
import BootstrapClient from "@/components/BootstrapClient.js"; //client only
import Navbar from "../components/Navbar";
import SearchNavbar from "../components/SearchNavbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health Data App",
  description: "Health Monitoring Powered by Vitalz",
};

const users = [
  {
    UserName: "Lew hon Kean",
    UserID: "E2:90:00:00:07:22",
    DeviceCompany: "SBRing",
  },
  {
    UserName: "Ming Teck Lim",
    UserID: "121166543",
    DeviceCompany: "JCRing",
  },
];

const userAnalysisData =  [
  {
  "HRVDate": "2024-06-20",
  "VitalzScore": "56.75675675675675675700",
  "ScoreType": "MildStress",
  "StressorIndex": "40"
  },
  {
  "HRVDate": "2024-06-19",
  "VitalzScore": "45.94594594594594594600",
  "ScoreType": "MildStress",
  "StressorIndex": "18"
  },
  {
  "HRVDate": "2024-06-18",
  "VitalzScore": "56.75675675675675675700",
  "ScoreType": "MildStress",
  "StressorIndex": "59"
  }
];

const userSleepMarker = [
  {
  "HRVDate": "2024-05-05",
  "SleepOnset": "2024-05-04T16:36:01.000Z",
  "WakeUpTime": "2024-05-04T23:26:04.000Z",
  "Awake": "20",
  "Light": "52",
  "Deep": "27"
  },
  {
  "HRVDate": "2024-05-18",
  "SleepOnset": "2024-05-17T15:59:01.000Z",
  "WakeUpTime": "2024-05-17T22:57:59.000Z",
  "Awake": "20",
  "Light": "53",
  "Deep": "26"
  }
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchNavbar users={users} placeholder="Select / find a user" />
        {children}
      </body>
      <BootstrapClient />
    </html>
  );
}
