import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/Components/Shared/Header";
import { SessionProvider } from "next-auth/react";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
//   display: "swap"
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
//   display: "swap"
// });

export const metadata: Metadata = {
  title: 'Evently',
  description: 'Evently is a platform for event management.',
  icons: {
    icon: '/assets/images/logo.svg'
  }
};
// className={`${geistSans.variable} ${geistMono.variable} antialiased`}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
