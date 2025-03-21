'use client';

import React from 'react';
import Link from 'next/link';
import { DocsCategoriesList } from '@/lib/data/docsCategoriesLib';
import { DocumentList } from '@/lib/data/documentLib';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { categories, isLoading, isError } = DocsCategoriesList(
    1,
    { limit: 20 },
    0
  );
  const {
    docs,
    isLoading: docLoading,
    isError: docError,
  } = DocumentList(1, { limit: 100 }, 0);

  const groupedDocs = docs?.reduce(
    (acc, doc) => {
      const categoryId = doc.category?._id;
      if (!categoryId) return acc;

      if (!acc[categoryId]) acc[categoryId] = [];
      acc[categoryId].push(doc);
      return acc;
    },
    {} as Record<string, any[]>
  );

  return (
    <div className="flex min-h-screen mt-4">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 bg-white p-4 mt-4">
        <div className="mb-6">
          {/* Category Name */}
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-8 bg-blue-600 mt-1"></span>
            <h3 className="text-sm font-bold text-blue-600">Overview</h3>
          </div>

          {/* Danh sách bài viết (hiển thị luôn) */}
          <nav>
            <Link
              href="/document"
              className="block py-1 text-sm font-medium ml-4 text-gray-600 hover:text-blue-600"
            >
              Introduce
            </Link>
          </nav>
        </div>
        {isLoading && (
          <p className="text-gray-400 text-sm">Loading categories...</p>
        )}
        {isError && (
          <p className="text-red-500 text-sm">Error loading categories</p>
        )}

        {categories?.map((category) => (
          <div key={category._id} className="mb-6">
            {/* Category Name */}
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-8 bg-blue-600 mt-1"></span>
              <h3 className="text-sm font-bold text-blue-600">
                {category.name || 'Unnamed Category'}
              </h3>
            </div>

            {/* Subcategories */}
            {category.subcategories?.length ? (
              <p className="text-xs text-gray-400">
                {category.subcategories.join(', ')}
              </p>
            ) : null}

            {/* Danh sách bài viết (hiển thị luôn) */}
            <nav className="space-y-1 ml-4 mt-2">
              {docLoading ? (
                <p className="text-gray-400 text-xs">Loading articles...</p>
              ) : docError ? (
                <p className="text-red-500 text-xs">Error loading articles</p>
              ) : groupedDocs?.[category._id]?.length ? (
                groupedDocs[category._id].map((doc) => (
                  <Link
                    key={doc._id}
                    href={`/document/${doc.slug}`}
                    className="block py-1 text-sm font-medium text-gray-600 hover:text-blue-600"
                  >
                    {doc.title}
                  </Link>
                ))
              ) : (
                <p className="text-xs text-gray-400">No articles available</p>
              )}
            </nav>
          </div>
        ))}
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
