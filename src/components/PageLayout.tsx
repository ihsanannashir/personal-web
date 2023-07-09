"use client";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="pt-20 md:pt-28">{children}</main>;
}
