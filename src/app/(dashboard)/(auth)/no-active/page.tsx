'use client';
import Heading from '@/components/heading/Heading';
import { EmployeeList } from '@/lib/data/employeeLib';
import React, { useState } from 'react';
import { EmployeeColumns } from '@/types/columns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader, Trash2 } from 'lucide-react';
import { RefreshButton } from '@/components/button/RefreshButton';

import { AlertCircle } from 'lucide-react';
import Container from '@/components/container/Container';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data

  const { employees, isLoading, isError } = EmployeeList(
    1,
    { is_active: 'false' },
    refreshKey
  );

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  return (
    <Container>
      <Heading name="Employee Page" />
      <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
        <RefreshButton onClick={handleRefresh} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {EmployeeColumns.map((col) => (
                <TableHead key={col.key} className={col.className}>
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={EmployeeColumns.length + 1}
                  className="h-64"
                >
                  <div className="flex justify-center items-center h-full">
                    <Loader className="w-8 h-8 animate-spin text-blue-500" />
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={EmployeeColumns.length + 1}
                  className="text-center text-gray-500"
                >
                  <AlertCircle className="h-5 w-5 inline-block text-red-500" />{' '}
                  No employees found is not active.
                </TableCell>
              </TableRow>
            ) : employees && employees.length > 0 ? (
              employees.map((employee) => (
                <TableRow key={employee.id}>
                  {EmployeeColumns.map((col) => (
                    <TableCell key={col.key} className={col.className}>
                      {col.key === 'id' && employee.id.substring(0, 8) + '...'}
                      {col.key === 'username' && employee.username}
                      {col.key === 'name' && employee.name}
                      {col.key === 'email' && employee.email}
                      {col.key === 'dob' &&
                        (employee.dob instanceof Date
                          ? employee.dob.toLocaleDateString()
                          : employee.dob)}
                      {col.key === 'position' && employee.position}
                      {col.key === 'role' && employee.role.title}
                    </TableCell>
                  ))}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={EmployeeColumns.length + 1}
                  className="text-center text-gray-500"
                >
                  No employees found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
};

export default Page;
