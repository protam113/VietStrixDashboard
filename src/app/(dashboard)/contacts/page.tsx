'use client';

import type React from 'react';
import { useState } from 'react';
//UI components
import { Eye } from 'lucide-react';
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
import { ContactColumns } from '@/types/columns';
//Hooks
import { motion } from 'framer-motion';
import Container from '@/components/container/Container';
// import LoadingScreen from '@/components/Loading/LoadingScreen';
import { Skeleton } from '@/components/ui/skeleton';
import { ContactTableProps } from '@/types/componentsType';
import { ContactList } from '@/lib/data/contactLib';
import SelectStatus from '@/components/pages/Contact/selectStatus';
import { useUpdateStatus } from '@/hooks/Contact/useContact';
import { toast } from 'sonner';

const statusColors = {
  approved: 'text-green-600 bg-green-100',
  pending: 'text-yellow-600 bg-yellow-100',
  rejected: 'text-red-600 bg-red-100',
};

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  isLoading,
  isError,
  selectedContact,
  onSelectContact,
}) => {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const { mutate: updateStatus } = useUpdateStatus();

  // Hàm cập nhật trạng thái
  const handleStatusChange = (contactId: string, newStatus: string) => {
    if (!contactId) {
      toast.error('Invalid contact ID!');
      return;
    }

    updateStatus({ contactId, updateStatus: { status: newStatus } });
    toast.success(`Updated to ${newStatus}`);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {ContactColumns.map((col) => (
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
                colSpan={ContactColumns.length + 1}
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
                {ContactColumns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <motion.tr
                key={contact._id}
                className="border-b"
                initial={{ backgroundColor: 'rgba(243, 244, 246, 0)' }}
                animate={{
                  backgroundColor:
                    hoveredRow === contact._id
                      ? 'rgba(243, 244, 246, 0.5)'
                      : 'rgba(243, 244, 246, 0)',
                  y: hoveredRow === contact._id ? -2 : 0,
                }}
                transition={{ duration: 0.1 }}
                onMouseEnter={() => setHoveredRow(contact._id)}
                onMouseLeave={() => setHoveredRow(null)}
                style={{ willChange: 'transform', transform: 'translateZ(0)' }}
              >
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedContact.includes(contact._id)}
                    onChange={() => onSelectContact(contact._id)}
                  />
                </TableCell>
                {ContactColumns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    {col.key === '_id' ? (
                      <>
                        {index + 1}. {contact._id.substring(0, 8)}...
                      </>
                    ) : (
                      ''
                    )}

                    {col.key === 'number' ? index + 1 : ''}
                    {col.key === 'detail' ? (
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                        <span className="sr-only">Detail</span>
                      </Button>
                    ) : null}
                    {col.key === 'name' ? contact.name : ''}
                    {col.key === 'email' ? contact.email : ''}
                    {col.key === 'phone_number' ? contact.phone_number : ''}

                    {col.key === 'status' ? (
                      contact.status === 'pending' ? (
                        <Select
                          onValueChange={
                            (value) => handleStatusChange(contact._id, value) // Sửa lại từ contact.id thành contact._id
                          }
                        >
                          <SelectTrigger className="w-[150px] border rounded px-2 py-1 text-sm">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="approved">
                              ✅ Approved
                            </SelectItem>
                            <SelectItem value="rejected">
                              ❌ Rejected
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            statusColors[contact.status] ||
                            'text-gray-600 bg-gray-100'
                          }`}
                        >
                          {contact.status}
                        </span>
                      )
                    ) : null}
                  </TableCell>
                ))}
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={ContactColumns.length + 1}
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
  const [selectedStatus, setSelectedStatus] = useState<string>();
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedContact, setSelectedContact] = useState<string[]>([]);

  const { contacts, isLoading, isError, pagination } = ContactList(
    currentPage,
    {
      status: selectedStatus,
      limit: pageSize,
    },
    refreshKey
  );

  // const { mutate: createProduct } = useCreateProduct();

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.totalPages) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  const handleSelectContact = (id: string) => {
    setSelectedContact((prev) =>
      prev.includes(id)
        ? prev.filter((productId) => productId !== id)
        : [...prev, id]
    );
  };
  return (
    <>
      <Container>
        <Heading name="Contacts Page" desc="Manage your contacts here" />

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
              <span className="text-16 font-semibold">Status:</span>

              <SelectStatus
                selectedStatus={selectedStatus}
                onStatusChange={(value) => setSelectedStatus(value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-md border">
          <ContactTable
            contacts={contacts}
            isLoading={isLoading}
            isError={isError}
            selectedContact={selectedContact}
            onSelectContact={handleSelectContact}
          />
        </div>
        <CustomPagination
          currentPage={currentPage}
          totalPage={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </Container>
    </>
  );
}
