'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//UI components
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';

//Components
import Heading from '@/components/heading/Heading';
import { RefreshButton } from '@/components/button/RefreshButton';
import { CustomPagination } from '@/components/design/pagination';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
//Data
import { CategoriesList } from '@/lib/data/categoriesLib';
//Types
import { CategoryColumns } from '@/types/columns';
//Hooks
import {
  useCreateCategory,
  useDeleteCategory,
} from '@/hooks/Category/useCategory';
import { toast } from 'sonner';
import ConfirmDialog from '@/components/design/Dialog';

export default function CategoryManager() {
  const router = useRouter();

  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { categories, isLoading, isError, pagination } = CategoriesList(
    currentPage,
    {
      page_size: pageSize,
    },
    refreshKey
  );

  const { mutate: createCategory } = useCreateCategory();
  const { mutate: deleteCategory } = useDeleteCategory();

  const handleDeleteClick = (id: string) => {
    setSelectedCategories([id]);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCategories.length > 0) {
      deleteCategory({ ids: selectedCategories });
      setSelectedCategories([]);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const [title, setTitle] = useState<string>('');

  const handleCreateCategory = () => {
    if (!title) {
      toast.error('Please fill in all information!');
      return;
    }
    createCategory({ title, parent_id: null });
    setRefreshKey((prev) => prev + 1);
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  // State for the form
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  const handleSelectCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id)
        ? prev.filter((categoryId) => categoryId !== id)
        : [...prev, id]
    );
  };
  return (
    <>
      <div className="container mx-auto py-10 w-max-6xl">
        <Heading name="Categories Page" desc="Manage your categories here" />

        <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <RefreshButton onClick={handleRefresh} />
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Show:</span>
              <Select
                onValueChange={handlePageSizeChange}
                defaultValue={String(pageSize)}
              >
                <SelectTrigger className="w-[80px]">
                  <SelectValue placeholder={pageSize} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className=" col flex-col-2 md:flex gap-2">
            <Button
              className="bg-red-500 text-white"
              onClick={handleDeleteConfirm}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete List
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Category
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new category.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateCategory}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        className="col-span-3"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Create</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="rounded-md border">
          {isLoading ? (
            <Progress value={33} />
          ) : isError ? (
            <p>Error loading roles</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedRoles(
                          e.target.checked ? categories.map((r) => r.id) : []
                        )
                      }
                      checked={selectedRoles.length === categories.length}
                    />
                  </TableHead>
                  {CategoryColumns.map((col) => (
                    <TableHead key={col.key} className={col.className}>
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => handleSelectCategory(category.id)}
                        />
                      </TableCell>
                      {CategoryColumns.map((col) => {
                        return (
                          <TableCell key={col.key} className={col.className}>
                            {col.key === 'id'
                              ? category.id.substring(0, 8) + '...'
                              : ''}
                            {col.key === 'detail' ? (
                              <div className="justify-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    router.push(`/categories/${category.slug}`)
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Detail</span>
                                </Button>
                              </div>
                            ) : null}
                            {col.key === 'title' ? category.title : ''}
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
                                  onClick={() => handleDeleteClick(category.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            ) : null}
                          </TableCell>
                        );
                      })}
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
          )}
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </div>
      {/* Edit role */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the selected category."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
