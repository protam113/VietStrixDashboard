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
import NoResultsFound from '@/components/design/NoResultsFound';
//Types
import { ProductColumns } from '@/types/columns';
//Hooks
import { motion } from 'framer-motion';
import ConfirmDialog from '@/components/design/Dialog';
import { ProductList } from '@/lib/data/productLib';
import { useDeleteProduct } from '@/hooks/Product/useProduct';
import Container from '@/components/container/Container';
// import LoadingScreen from '@/components/Loading/LoadingScreen';
import SelectCat from '@/components/pages/products/sidebar/selectCat';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductTableProps } from '@/types/componentsType';

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isLoading,
  isError,
  selectedProducts,
  onSelectProduct,
  onDeleteClick,
}) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  return (
    <div className="rounded-md border">
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
          {isError ? (
            <TableRow>
              <TableCell
                colSpan={ProductColumns.length + 1}
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
                {ProductColumns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <motion.tr
                key={product.id}
                className="border-b"
                initial={{ backgroundColor: 'rgba(243, 244, 246, 0)' }}
                animate={{
                  backgroundColor:
                    hoveredRow === product.id
                      ? 'rgba(243, 244, 246, 0.5)'
                      : 'rgba(243, 244, 246, 0)',
                  y: hoveredRow === product.id ? -2 : 0,
                }}
                transition={{ duration: 0.1 }}
                onMouseEnter={() => setHoveredRow(product.id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{
                  willChange: 'transform',
                  transform: 'translateZ(0)',
                }}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => onSelectProduct(product.id)}
                  />
                </TableCell>
                {ProductColumns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.key === 'id' ? product.id.substring(0, 8) + '...' : ''}
                    {col.key === 'number' ? index + 1 : ''}
                    {col.key === 'detail' ? (
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Detail</span>
                      </Button>
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
                          onClick={() => onDeleteClick(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    ) : null}
                  </TableCell>
                ))}
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={ProductColumns.length + 1}
                className="text-center"
              >
                <NoResultsFound />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default function ProductManager() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  const { products, isLoading, isError, pagination } = ProductList(
    currentPage,
    {
      page_size: pageSize,
      category_ids: selectedCategory,
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
            <div className="flex items-center gap-4">
              <span className="text-16 font-semibold">Category:</span>

              <SelectCat
                selectedCategories={selectedCategory}
                onCategoryChange={(value) => setSelectedCategory(value)}
              />
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
          <ProductTable
            products={products}
            isLoading={isLoading}
            isError={isError}
            selectedProducts={selectedProducts}
            onSelectProduct={handleSelectProduct}
            onDeleteClick={handleDeleteClick}
          />
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
