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
import { Progress } from '@/components/ui/progress';
import { RefreshButton } from '@/components/button/RefreshButton';
import { RoleList } from '@/lib/data/roleLib';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Inbox, AlertCircle, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/useDebounce';
import PushButton from '@/components/button/PushButton';
import { CustomPagination } from '@/components/design/pagination';

const Page = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string>('');
  const debouncedName = useDebounce(selectedName, 1000);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    roles,
    isLoading: roleLoading,
    isError: roleError,
  } = RoleList(
    1,
    {
      page_size: 10,
    },
    refreshKey
  );

  const { employees, isLoading, isError, pagination } = EmployeeList(
    currentPage,
    {
      page_size: 20,
      ...(selectedRole ? { role_title: [selectedRole] } : {}),
      ...(selectedName ? { name: debouncedName } : {}),
    },
    refreshKey
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="container mx-auto py-10 w-max-6xl">
      <div className="flex justify-between items-center w-full">
        <div className="flex-1">
          <Heading name="Employee Page" />
        </div>
        <div className="flex-1 flex justify-end">
          <PushButton
            href="/employee/create-employee"
            label="Create Employee"
          />
        </div>
      </div>

      <div className="md:flex col flex-col-2 md:flex-row justify-between items-center mb-6">
        <RefreshButton onClick={handleRefresh} />
        <div className="flex items-center gap-2">
          <div className="relative w-2/3">
            <Input
              type="text"
              placeholder="Enter employee name..."
              value={selectedName}
              onChange={(e) => setSelectedName(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="w-1/3">
            {roleLoading ? (
              <Progress value={33} />
            ) : roleError ? (
              <p>Error loading roles</p>
            ) : (
              <Select
                onValueChange={(value) =>
                  setSelectedRole(value === 'all' ? null : value)
                }
                value={selectedRole || 'all'}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Roles" />
                </SelectTrigger>
                <SelectContent>
                  {roles?.length > 0 ? (
                    <>
                      <SelectItem value="all">All Roles</SelectItem>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.title}>
                          {role.title}
                        </SelectItem>
                      ))}
                    </>
                  ) : (
                    <div className="flex items-center gap-2 p-2 text-gray-500">
                      <Inbox className="h-5 w-5" />
                      <span>No roles available</span>
                    </div>
                  )}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
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
                  No employees found for this role.
                </TableCell>
              </TableRow>
            ) : employees && employees.length > 0 ? (
              employees.map((employee) => {
                const isProtectedRole = ['admin'].includes(
                  employee.role.title.toLowerCase()
                );

                return (
                  <TableRow key={employee.id}>
                    {EmployeeColumns.map((col) => (
                      <TableCell key={col.key} className={col.className}>
                        {col.key === 'id' &&
                          employee.id.substring(0, 8) + '...'}
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

                    {/* Ẩn icon xóa nếu là admin */}
                    {!isProtectedRole && (
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
                    )}
                  </TableRow>
                );
              })
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
      <CustomPagination
        currentPage={currentPage}
        totalPage={pagination.total_page}
        onPageChange={handlePageChange}
      />
    </main>
  );
};

export default Page;
