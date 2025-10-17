import ProductDetailsPage from "@/components/ProductDetails";

export default function EditProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const ProductDetails: any = ProductDetailsPage;
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <ProductDetails slug={slug} />
    </div>
  );
}
