'use client';

import Heading from '@/components/heading/Heading';
import { DocsCategoriesList } from '@/lib/data/docsCategoriesLib';
import { Loader2 } from 'lucide-react';
import React from 'react';

const Page = () => {
  const { categories, isLoading, isError } = DocsCategoriesList(
    1,
    { page_size: 10 },
    0
  );

  return (
    <main className="container mx-auto py-4 w-max-6xl">
      <Heading name="Document" />

      <div className="mt-10">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-12 h-12 animate-spin text-gray-500" />
            <h2 className="text-2xl font-semibold mt-4">
              Loading categories...
            </h2>
          </div>
        ) : isError ? (
          <p className="text-red-500 text-center">Failed to load categories.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-4">
            {categories.map(
              (category: {
                _id: string;
                name: string;
                subcategories: string[];
              }) => (
                <li
                  key={category._id}
                  className="text-lg font-medium text-gray-800"
                >
                  {category.name}
                  {category.subcategories.length > 0 && (
                    <ul className="list-circle pl-5 mt-1 space-y-1 text-gray-600">
                      {category.subcategories.map((sub, index) => (
                        <li key={index} className="text-base">
                          {sub}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              )
            )}
          </ul>
        )}
      </div>
    </main>
  );
};

export default Page;
