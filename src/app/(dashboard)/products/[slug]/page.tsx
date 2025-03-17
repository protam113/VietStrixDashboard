'use client';

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductDetail } from '@/lib/data/productLib';
import Heading from '@/components/heading/Heading';
import BackButton from '@/components/button/BackButton';
import Container from '@/components/container/Container';

const Page = () => {
  const { slug } = useParams();
  const productSlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { product, isLoading, isError } = ProductDetail(productSlug, 0);
  console.log(product);
  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (isError || !product)
    return <p className="text-red-500">Category not found.</p>;

  return (
    <Container>
      <BackButton />
      <Heading name="Product Page" desc="Manage your products here" />

      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.slug}</p>
    </Container>
  );
};

export default Page;
