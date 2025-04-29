'use client';

import React, { useState } from 'react';
// UI Components
import { ChevronDown, ChevronRight, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import NoResultsFound from '@/components/design/NoResultsFound';
// Hooks & Utils
import { toast } from 'sonner';
import { useUpdateStatus } from '@/hooks/Contact/useContact';
import { formatSmartDate } from '@/utils/formatTimeAgo';
// Types
import { ContactColumns } from '@/types/columns';
import type { ContactTableProps } from '@/types/componentsType';

const statusColors = {
  approved: 'text-green-600 bg-green-100',
  pending: 'text-yellow-600 bg-yellow-100',
  rejected: 'text-red-600 bg-red-100',
};

export const ContactTable: React.FC<ContactTableProps> = ({
  contacts,
  isLoading,
  isError,
  onDelete,
}) => {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const { mutate: updateStatus } = useUpdateStatus();

  const handleStatusChange = (contactId: string, newStatus: string) => {
    if (!contactId) {
      toast.error('Invalid contact ID!');
      return;
    }
    updateStatus({ contactId, updateStatus: { status: newStatus } });
  };

  const toggleRowExpansion = (contactId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [contactId]: !prev[contactId],
    }));
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {ContactColumns.map((col) => (
              <TableHead key={col.key} className={col.className}>
                {col.label}
              </TableHead>
            ))}
            <TableHead>Action</TableHead>
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
                {ContactColumns.map((col) => (
                  <TableCell key={col.key} className={col.className}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
                <TableCell>
                  <Skeleton className="h-4 w-4 rounded" />
                </TableCell>
              </TableRow>
            ))
          ) : contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <React.Fragment key={contact._id}>
                <TableRow className="border-b transition-all duration-200">
                  {ContactColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.key === 'number' && index + 1}
                      {col.key === 'detail' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleRowExpansion(contact._id)}
                          className="h-8 w-8"
                        >
                          {expandedRows[contact._id] ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                      {col.key === 'name' && contact.name}
                      {col.key === 'email' && contact.email}
                      {col.key === 'phone_number' && contact.phone_number}
                      {col.key === 'service' && (contact.service?.name || '—')}
                      {col.key === 'status' &&
                        (contact.status === 'pending' ? (
                          <Select
                            onValueChange={(value) =>
                              handleStatusChange(contact._id, value)
                            }
                            defaultValue={contact.status}
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
                              statusColors[
                                contact.status as keyof typeof statusColors
                              ] || 'text-gray-600 bg-gray-100'
                            }`}
                          >
                            {contact.status === 'approved'
                              ? '✅ Approved'
                              : '❌ Rejected'}
                          </span>
                        ))}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onDelete(contact._id)}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      <Trash className="h-4 w-4 text-white" />
                    </Button>
                  </TableCell>
                </TableRow>

                {expandedRows[contact._id] && (
                  <TableRow className="bg-muted/50">
                    <TableCell
                      colSpan={ContactColumns.length + 1}
                      className="p-0"
                    >
                      <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Contact Details
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div>
                                <span className="font-medium">Name:</span>{' '}
                                {contact.name}
                              </div>
                              <div>
                                <span className="font-medium">Email:</span>{' '}
                                {contact.email}
                              </div>
                              <div>
                                <span className="font-medium">Phone:</span>{' '}
                                {contact.phone_number}
                              </div>
                              <div>
                                <span className="font-medium">Created:</span>{' '}
                                {formatSmartDate(contact.createdAt)}
                              </div>
                              <div>
                                <span className="font-medium">Updated:</span>{' '}
                                {formatSmartDate(contact.updatedAt)}
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-2">
                              Message
                            </h4>
                            <div className="p-3 bg-muted rounded-md text-sm">
                              {contact.message || (
                                <span className="text-muted-foreground italic">
                                  No message provided
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
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
