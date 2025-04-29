'use client';

import type React from 'react';
//UI components
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

//Data
//Types
import { CategoryColumns, CategoryTableProps } from '@/types/columns';
//Hooks

import { Skeleton } from '@/components/ui/skeleton';
import NoResultsFound from '@/components/design/NoResultsFound';
import {
  SelectCategoryStatus,
  VisibilityCategoryOption,
} from '../categryStatus';
import { useUpdateCategoryStatus } from '@/hooks/category/useCategory';
import { toast } from 'sonner';
import { useAuthStore } from '@/store/authStore';

export const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  isLoading,
  isError,
  onDelete,
}) => {
  const userInfo = useAuthStore((state) => state.userInfo);

  const { mutate: updateStatus } = useUpdateCategoryStatus();

  // Hàm cập nhật trạng thái
  const handleStatusChange = (postId: string, newStatus: string) => {
    if (!postId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateStatus({ postId, updateStatus: { status: newStatus } });
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {CategoryColumns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isError ? (
              <TableRow>
                <TableCell
                  colSpan={CategoryColumns.length + 1}
                  className="text-center"
                >
                  <NoResultsFound />
                </TableCell>
              </TableRow>
            ) : isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-4 rounded" />
                  </TableCell>
                  {CategoryColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : categories && categories.length > 0 ? (
              categories.map((category) => (
                <TableRow key={category._id}>
                  {CategoryColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.key === '_id'
                        ? category._id.substring(0, 8) + '...'
                        : ''}
                      {col.key === 'name' ? category.name : ''}
                      {col.key === 'status' ? (
                        userInfo?.role === 'admin' ? (
                          <SelectCategoryStatus
                            value={category.status as VisibilityCategoryOption}
                            onChange={(newStatus) =>
                              handleStatusChange(category._id, newStatus)
                            }
                          />
                        ) : (
                          category.status
                        )
                      ) : null}
                      {col.key === 'actions' ? (
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-destructive"
                            onClick={() => onDelete(category._id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={CategoryColumns.length + 1}
                  className="text-center text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};
