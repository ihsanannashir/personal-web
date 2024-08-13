import "./globals.css";

export const metadata = {
  title: "Ihsan An-Nashir's Portfolio",
  description: "Personal Portfolio Website of Ihsan An-Nashir.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
