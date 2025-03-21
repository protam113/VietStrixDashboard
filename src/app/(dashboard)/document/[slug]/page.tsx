'use client';

import Container from '@/components/container/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { DocumentDetail } from '@/lib/data/documentLib';
import { Separator } from '@radix-ui/react-separator';
import { Badge } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const Page = () => {
  const { slug } = useParams();
  const docSlug = Array.isArray(slug) ? slug[0] : slug || '';
  const { document, isLoading, isError } = DocumentDetail(docSlug, 0);

  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (isError || !document)
    return <p className="text-red-500">Category not found.</p>;

  return (
    <Container>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{document.title}</h1>
              <Badge className="ml-2 bg-green-50 text-green-700 border-green-200">
                Active
              </Badge>
            </div>
            <h2 className="text-xl font-medium">{document.content}</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 text-14">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <path d="M12 2H2v10h10V2z" />
              <path d="M12 2h10v10H12V2z" />
              <path d="M12 12H2v10h10V12z" />
              <path d="M12 12h10v10H12V12z" />
            </svg>
            <span>{document?.link}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
            <span>
              {format(new Date(document.createdAt), 'dd/MM/yyyy HH:mm', {
                locale: vi,
              })}
            </span>
          </div>
          {document.category && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
              <span className="font-medium text-gray-700">
                {document.category.name}
              </span>
            </div>
          )}

          {/* Hiển thị Subcategories */}
          {document.category?.subcategories?.length > 0 && (
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              <span className="text-gray-500 text-xs">
                {document.category.subcategories.join(', ')}
              </span>
            </div>
          )}
        </div>
        <Separator />
        <section>
          <h3 className="text-lg font-semibold mb-2">Detail</h3>
        </section>
        <section>
          <p>{document.description}</p>
        </section>
      </div>
    </Container>
  );
};

export default Page;
