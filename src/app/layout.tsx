import { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s — Ihsan An-Nashir",
    default: "Ihsan An-Nashir — Software & AI Engineer",
  },
  description:
    "Software & AI Engineer based in Jakarta, Indonesia. Building RAG systems and LLM-powered platforms. Previously in frontend, full-stack, and core banking.",
  keywords:
    "Ihsan An-Nashir, Software Engineer, AI Engineer, RAG, LLM, Jakarta, Indonesia, Frontend, Full-stack",
  openGraph: {
    title: "Ihsan An-Nashir — Software & AI Engineer",
    description:
      "Software & AI Engineer based in Jakarta, Indonesia. Building RAG systems and LLM-powered platforms.",
    siteName: "Ihsan An-Nashir",
    type: "website",
    url: "https://ihsanannashir.dev",
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
        className={`${plusJakartaSans.variable} ${dmSerifDisplay.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <NavigationBar />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
