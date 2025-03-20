'use client';

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryDetail } from '@/lib/data/categoriesLib';
import Container from '@/components/container/Container';
import BackButton from '@/components/button/BackButton';

const Page = () => {
  const { slug } = useParams();
  const categorySlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { category, isLoading, isError } = CategoryDetail(categorySlug, 0);
  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (isError || !category)
    return <p className="text-red-500">Category not found.</p>;

  return (
    <Container>
      <BackButton />
      <main className="mt-8">
        <h1 className="text-2xl font-bold">{category.title}</h1>
        <p className="text-gray-600">{category.slug}</p>
      </main>
    </Container>
  );
};

export default Page;
