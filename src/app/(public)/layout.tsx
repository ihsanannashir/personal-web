import NavigationBar from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <main className="pt-10">{children}</main>
      <Footer />
    </>
  );
}
