'use client';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination = ({
  currentPage,
  totalPage,
  onPageChange,
}: PaginationProps) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex justify-center items-center scroll mt-4">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>

          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                isActive={currentPage === page}
                onClick={() => onPageChange(page)}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPage))}
              aria-disabled={currentPage === totalPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
