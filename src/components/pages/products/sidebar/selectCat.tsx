'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';
import { CategoriesList } from '@/lib/data/categoriesLib';

const SelectCat = ({
  selectedCategories = [],
  onCategoryChange,
}: {
  selectedCategories?: string[];
  onCategoryChange: (categories: string[]) => void;
}) => {
  const {
    categories = [],
    isLoading,
    isError,
  } = CategoriesList(1, { page_size: 20 }, 0);
  const [selected, setSelected] = useState<string[]>(selectedCategories);

  const handleSelect = (value: string) => {
    if (!selected.includes(value)) {
      const newSelection = [...selected, value];
      setSelected(newSelection);
      onCategoryChange(newSelection);
    }
  };

  const handleRemove = (value: string) => {
    const newSelection = selected.filter((cat) => cat !== value);
    setSelected(newSelection);
    onCategoryChange(newSelection);
  };

  const handleClearAll = () => {
    setSelected([]);
    onCategoryChange([]);
  };

  if (isLoading) return <p>Loading categories...</p>;
  if (isError) return <p>Error loading categories</p>;

  return (
    <div className="flex flex-col gap-2">
      {/* Select */}
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 ? (
            categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.title}
              </SelectItem>
            ))
          ) : (
            <p className="text-gray-500 p-2">No categories available</p>
          )}
        </SelectContent>
      </Select>

      {/* Selected Categories */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {selected.map((catId) => {
            const category = categories.find((c) => c.id === catId);
            return (
              <div
                key={catId}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full flex items-center gap-2"
              >
                {category?.title || 'Unknown'}
                <button
                  onClick={() => handleRemove(catId)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            );
          })}
          <button
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-800 text-sm font-semibold"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default SelectCat;
