'use client';

import Container from '@/components/container/Container';
import React, { useState } from 'react';

import { FaQlist } from '@/lib/data/faqLib';
import Heading from '@/components/heading/Heading';
import { CustomPagination } from '@/components/design/pagination';
import { RefreshButton } from '@/components/button/RefreshButton';
import SelectFaqStatus from '@/components/pages/faq/selectStatus';
import { useDeleteFaq } from '@/hooks/faq/useFaQ';
import ConfirmDialog from '@/components/design/Dialog';
import PushButton from '@/components/button/PushButton';
import { FaqTable } from '@/components/pages/table/FaqTable';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

const Page = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<string>();
  const [pageSize, setPageSize] = useState(10);

  const params = {
    ...(selectedStatus !== 'all' && { status: selectedStatus }),
    limit: pageSize,
  };

  const { faqs, isLoading, isError, pagination } = FaQlist(
    currentPage,
    params,
    refreshKey
  );
  const { mutate: deleteFaq } = useDeleteFaq();

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1);
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handleDeleteClick = (id: string) => {
    setSelectedFaq(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedFaq) {
      deleteFaq(selectedFaq);
      setSelectedFaq(undefined);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  return (
    <>
      <Container>
        <div className="flex items-center justify-between mb-4">
          <Heading
            name="FAQ Management"
            desc="Manage your frequently asked questions"
          />
          <PushButton href="/faq/create_faq" label="Create FaQ" />
        </div>

        <div className="md:flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
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
              <span className="text-sm font-semibold">Status:</span>
              <SelectFaqStatus
                selectedStatus={selectedStatus}
                onStatusChange={(value) => setSelectedStatus(value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          <FaqTable
            faqs={faqs}
            isLoading={isLoading}
            isError={isError}
            onDelete={handleDeleteClick}
          />
        </div>

        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.total_page}
          onPageChange={handlePageChange}
        />
      </Container>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        question="Are you sure"
        description="This action cannot be undone. This will permanently delete the faq."
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Page;
