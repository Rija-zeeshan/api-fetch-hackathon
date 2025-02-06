import ProductDetail from '@/components/ProductDetail';
import { client } from '@/sanity/lib/client';

interface ProductPageProps {
  params: { id: string };  // Change type to { id: string } directly, no need for Promise
}

const Page = async ({ params }: ProductPageProps) => {
  const { id } = params; // No need to await params

  // Fetch product data
  const fetchProduct = async (id: string) => {
    try {
      const query = `*[ _type == "product" && _id == $id]{
        name,
        "id": _id,
        price,
        description,
        category,
        stockLevel,
        "image": image.asset._ref
      }[0]`;

      const product = await client.fetch(query, { id });
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  };

  const product = await fetchProduct(id); // Directly use id without awaiting

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-gray-700">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <ProductDetail product={product} key={product.id} />
      </div>
    </div>
  );
};

export default Page;
