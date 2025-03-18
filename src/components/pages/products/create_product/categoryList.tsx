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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { categories, isLoading, isError } = CategoriesList(
    1,
    { page_size: 20 },
    0
  );

  const handleToggleCategory = (id: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((catId) => catId !== id)
        : [...prev, id];
      onSelectCategories(newSelection);
      return newSelection;
    });
  };

  if (isLoading) return <Skeleton className="w-full h-20" />;
  if (isError || !categories)
    return <p className="text-red-500">Category not found.</p>;

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
                onCheckedChange={() => handleToggleCategory(category.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryList;
