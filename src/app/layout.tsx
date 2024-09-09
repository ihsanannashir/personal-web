import clsx from "clsx";
import "./globals.css";

import { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";

import NavigationBar from "../components/navigation-bar";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "Ihsan An-Nashir • %s",
    default: "Ihsan An-Nashir's Portfolio",
  },
  description:
    "A Portfolio website of Ihsan An-Nashir, Web Developer based in Indonesia",
  openGraph: {
    title: "Ihsan An-Nashir's Portfolio",
    description:
      "A Portfolio website of Ihsan An-Nashir, Web Developer based in Indonesia",
    siteName: "Ihsan An-Nashir's Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={clsx(
          "relative min-h-screen bg-background font-sans antialiased max-w-4xl py-12 sm:py-24 px-6 mx-auto mt-10 sm:mt-0",
          fontSans.variable
        )}
      >
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
