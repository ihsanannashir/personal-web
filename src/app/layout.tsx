"use client";
import Footer from "../components/Footer";
import { NewNavbar } from "../components/NewNavbar";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <NewNavbar />
        <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
