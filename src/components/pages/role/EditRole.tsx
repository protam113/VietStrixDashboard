'use client';
import React, { useState, useEffect } from 'react';
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useEditRole } from '@/hooks/Role/useRoles';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CreateRoleItem } from '@/types/types';

const EditRole: React.FC<{ role: any; onClose: () => void }> = ({
  role,
  onClose,
}) => {
  const [title, setTitle] = useState(role?.title || '');

  useEffect(() => {
    setTitle(role?.title || '');
  }, [role]);

  // 🔹 Kiểm tra role.id trước khi truyền vào useEditRole
  const { mutate } = useEditRole();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error('Please enter the role title!');
      return;
    }

    if (!role?.id) {
      toast.error('Invalid role ID!');
      return;
    }

    const editRole: CreateRoleItem = {
      title,
    };

    mutate({
      roleId: role.id,
      editRole,
    });
  };
  return (
    <div className="bg-white">
      <DialogHeader>
        <DialogTitle>Edit Role</DialogTitle>
        <DialogDescription>Update the role details below.</DialogDescription>
      </DialogHeader>
      <p>role.id: {role.id}</p>
      <form onSubmit={handleSubmit}>
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
          <Button type="submit">Update</Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default EditRole;
