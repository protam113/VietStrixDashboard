'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
//UI components
import { Pencil, Plus, Trash2, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
//Types
import { ProductColumns } from '@/types/columns';
//Hooks

import ConfirmDialog from '@/components/design/Dialog';
import { ProductList } from '@/lib/data/productLib';
import { useDeleteProduct } from '@/hooks/Product/useProduct';
import Container from '@/components/container/Container';
export default function ProductManager() {
  const router = useRouter();

  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const { products, isLoading, isError, pagination } = ProductList(
    currentPage,
    {
      page_size: pageSize,
    },
    refreshKey
  );

  // const { mutate: createProduct } = useCreateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();

  const handleDeleteClick = (id: string) => {
    setSelectedProducts([id]);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedProducts.length > 0) {
      deleteProduct({ ids: selectedProducts });
      setSelectedProducts([]);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  const handleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };
  return (
    <>
      <Container>
        <Heading name="Products Page" desc="Manage your products here" />

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
            <Button
              className="bg-blue-500 text-white"
              onClick={() => router.push('/products/create-product')}
            >
              <Plus className="mr-2 h-4 w-4" /> Create Products
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          {isLoading ? (
            <Progress value={33} />
          ) : isError ? (
            <p>Error loading roles</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  {ProductColumns.map((col) => (
                    <TableHead key={col.key} className={col.className}>
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {products && products.length > 0 ? (
                  products.map((product, index) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                        />
                      </TableCell>
                      {ProductColumns.map((col) => {
                        return (
                          <TableCell key={col.key} className={col.className}>
                            {col.key === 'id'
                              ? product.id.substring(0, 8) + '...'
                              : ''}
                            {col.key === 'number' ? index + 1 : ''}{' '}
                            {col.key === 'detail' ? (
                              <div className="justify-center">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    router.push(`/products/${product.slug}`)
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                  <span className="sr-only">Detail</span>
                                </Button>
                              </div>
                            ) : null}
                            {col.key === 'title' ? product.title : ''}
                            {col.key === 'price' ? product.price : ''}
                            {col.key === 'categories'
                              ? product.categories
                                  ?.map((category) => category.title)
                                  .join(', ') || ''
                              : ''}
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
                                  onClick={() => handleDeleteClick(product.id)}
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
                      colSpan={ProductColumns.length + 1}
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
      </Container>
      {/* Edit role */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the selected product."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
