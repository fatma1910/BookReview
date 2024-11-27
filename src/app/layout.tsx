
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Dancing_Script} from "next/font/google"
import { Header } from "./_components/Header";

const DancingScript= Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
})

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TheBookClub",
  description: "A place to found and review book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${DancingScript.variable}`}
      >
        <Header/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
