'use client';

import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { CategoryDetail } from '@/lib/data/categoriesLib';

const Page = () => {
  const { slug } = useParams();
  const categorySlug = Array.isArray(slug) ? slug[0] : slug || '';

  const { category, isLoading, isError } = CategoryDetail(categorySlug, 0);
  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (isError || !category)
    return <p className="text-red-500">Category not found.</p>;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold">{category.title}</h1>
      <p className="text-gray-600">{category.slug}</p>
    </div>
  );
};

export default Page;
