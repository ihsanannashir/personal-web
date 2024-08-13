import "./globals.css";

import { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "Ihsan An-Nashir • %s",
    default: "Ihsan An-Nashir • Portfolio",
  },
  description:
    "A Portfolio website of Ihsan An-Nashir, Web Developer based in Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.className}>
      <body>{children}</body>
    </html>
  );
}
