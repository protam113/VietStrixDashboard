'use client';

import { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { CategoriesList } from '@/lib/data/categoriesLib';

const CategoryList = ({
  onSelectCategories,
}: {
  onSelectCategories: (selectedIds: string[]) => void;
}) => {
  const [selectedParent, setSelectedParent] = useState<string | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { categories, isLoading, isError } = CategoriesList(
    1,
    { parent_id: undefined, page_size: 20 },
    0
  );

  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (isError || !categories)
    return <p className="text-red-500">Category not found.</p>;

  const handleToggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      const updatedSelection = prev.includes(id)
        ? prev.filter((catId) => catId !== id)
        : [...prev, id];

      onSelectCategories(updatedSelection);
      return updatedSelection;
    });
  };

  return (
    <div className="flex gap-4">
      {/* Table Categories List */}
      <div className="w-1/2 border p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Categories List</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Select</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow
                key={category.id}
                onClick={() => setSelectedParent(category.id)}
                className="cursor-pointer hover:bg-gray-100"
              >
                <TableCell>{category.title}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleToggleCategory(category.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Table Subcategories List */}
      <div className="w-1/2 border p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-2">Categories List</h2>
        {selectedParent ? (
          <SubCategoryList
            parentId={selectedParent}
            onSelectCategories={handleToggleCategory}
            selectedCategories={selectedCategories}
          />
        ) : (
          <p className="text-gray-500">
            Select a parent category to view subcategories.
          </p>
        )}
      </div>
    </div>
  );
};

const SubCategoryList = ({
  parentId,
  onSelectCategories,
  selectedCategories,
}: {
  parentId: string;
  onSelectCategories: (id: string) => void;
  selectedCategories: string[];
}) => {
  const { categories, isLoading, isError } = CategoriesList(
    1,
    { parent_id: parentId, page_size: 20 },
    0
  );

  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (isError || !categories)
    return <p className="text-red-500">Subcategory not found.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Select</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.title}</TableCell>
            <TableCell>
              <Checkbox
                checked={selectedCategories.includes(category.id)}
                onCheckedChange={() => onSelectCategories(category.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryList;
