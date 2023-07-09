import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Suspense } from "react";

import "./globals.css";
import Footer from "../components/Footer";
import { Navbar } from "../components/Navbar";
import Loading from "./loading";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Ihsan An-Nashir • %s",
    default: "Ihsan An-Nashir • Portfolio",
  },
  description:
    "A Portfolio website of Ihsan An-Nashir, Frontend Developer based in Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.className}>
      <body className="bg-white">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <Footer />
      </body>
    </html>
  );
}
