import clsx from "clsx";
import "./globals.css";

import { Metadata } from "next";
import { Plus_Jakarta_Sans as FontSans } from "next/font/google";

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
          "min-h-screen bg-background font-sans antialiased max-w-3xl mx-auto py-12 sm:py-24 px-6",
          fontSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
