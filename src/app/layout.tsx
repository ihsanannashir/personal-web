import { Metadata } from "next";
import Footer from "../components/Footer";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "../components/Navbar";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ihsan An-Nashir • Portfolio",
  description:
    "A Portfolio website of Ihsan An-Nashir, Software Engineer based in Indonesia",
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
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
