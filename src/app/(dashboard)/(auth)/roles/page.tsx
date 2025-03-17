'use client';

import type React from 'react';
import { useState } from 'react';
//UI components
import { Pencil, Plus, Trash2 } from 'lucide-react';
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
import ConfirmDialog from '@/components/design/Dialog';
import { toast } from 'sonner';
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
import { RoleList } from '@/lib/data/roleLib';
//Types
import { RoleColumns } from '@/types/columns';
//Hooks
import { useCreateRole, useDeleteRole } from '@/hooks/Role/useRoles';
import EditRole from '@/components/pages/role/EditRole';

export default function RoleManager() {
  const [refreshKey, setRefreshKey] = useState(0); // State to refresh data
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { roles, isLoading, isError, pagination } = RoleList(
    currentPage,
    {
      page_size: pageSize,
    },
    refreshKey
  );

  const handlePageSizeChange = (value: string) => {
    const newSize = parseInt(value, 10);
    setPageSize(newSize);
    setCurrentPage(1); // Reset về trang đầu tiên khi đổi số lượng
  };

  // State for the form
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const { mutate: createRole } = useCreateRole();
  const { mutate: deleteRole } = useDeleteRole();

  const [title, setTitle] = useState<string>('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false); // For editing category
  const [editRole, setEditRole] = useState(null);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= pagination.total_page) {
      setCurrentPage(page);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
    setRefreshKey((prev) => prev + 1); // Refresh data manually
  };

  const handleCancelEditModal = () => {
    setIsEditModalVisible(false); // Hide the edit category modal
    setEditRole(null); // Reset editing category
  };

  const handleEdit = (editRole: any) => {
    if (!editRole.id) {
      console.error('Invalid category ID!');

      return;
    }
    setEditRole(editRole);
    setIsEditModalVisible(true);
  };

  const handleCreateRole = () => {
    if (!title) {
      toast.error('Please fill in all information!');
      return;
    }
    createRole({ title });
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedRoles([id]);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedRoles.length > 0) {
      deleteRole({ ids: selectedRoles });
      setSelectedRoles([]);
      setDeleteDialogOpen(false);
      setRefreshKey((prev) => prev + 1);
    }
  };

  const handleSelectRole = (id: string) => {
    setSelectedRoles((prev) =>
      prev.includes(id) ? prev.filter((roleId) => roleId !== id) : [...prev, id]
    );
  };
  return (
    <>
      <div className="container mx-auto py-10 w-max-6xl">
        <Heading name="Roles Page" />

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
              onClick={handleDeleteConfirm}
              className="bg-red-500 text-white"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete List
            </Button>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                  <DialogTitle>Create New Role</DialogTitle>
                  <DialogDescription>
                    Fill in the details for the new role.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleCreateRole}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="col-span-3"
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
                          e.target.checked ? roles.map((r) => r.id) : []
                        )
                      }
                      checked={selectedRoles.length === roles.length}
                    />
                  </TableHead>
                  {RoleColumns.map((col) => (
                    <TableHead key={col.key} className={col.className}>
                      {col.label}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles && roles.length > 0 ? (
                  roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedRoles.includes(role.id)}
                          onChange={() => handleSelectRole(role.id)}
                        />
                      </TableCell>
                      {RoleColumns.map((col) => {
                        const isProtectedRole = [
                          'admin',
                          'manager',
                          'employee',
                        ].includes(role.title.toLowerCase());

                        return (
                          <TableCell key={col.key} className={col.className}>
                            {col.key === 'id'
                              ? role.id.substring(0, 8) + '...'
                              : ''}
                            {col.key === 'title' ? role.title : ''}
                            {col.key === 'actions' && !isProtectedRole ? (
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() => handleEdit(role)}
                                >
                                  <Pencil className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="text-destructive"
                                  onClick={() => handleDeleteClick(role.id)}
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
                      colSpan={RoleColumns.length + 1}
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
        description="This action cannot be undone. This will permanently delete the selected role."
        onConfirm={handleDeleteConfirm}
      />
      {/* Delete Role */}
      <Dialog open={isEditModalVisible} onOpenChange={setIsEditModalVisible}>
        <DialogContent className="sm:max-w-[425px]">
          <EditRole role={editRole} onClose={handleCancelEditModal} />
        </DialogContent>
      </Dialog>
    </>
  );
}
