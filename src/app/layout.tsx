"use client";
import Footer from "../components/Footer";
import { NewNavbar } from "../components/NewNavbar";
import "./globals.css";
import { ThemeProvider } from "next-themes";

export default function RootLayout({ children }) {
  // if (typeof window !== "undefined") {
  //   // Perform localStorage action
  //   localStorage.theme = "light";
  // }

  return (
    <html lang="en">
      <body className="bg-white dark:bg-[#121212]">
        <ThemeProvider enableSystem={true} attribute="class">
          <NewNavbar />
          <main className="mx-auto max-w-3xl px-4 sm:px-6 md:max-w-5xl">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
