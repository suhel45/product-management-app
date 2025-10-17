import Navbar from "@/components/Navbar";

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="p-6">{children}</div>
    </>
  );
}
