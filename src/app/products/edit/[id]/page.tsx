import EditProductForm from "@/components/EditProductForm";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <EditProductForm id={id} />
    </div>
  );
}
