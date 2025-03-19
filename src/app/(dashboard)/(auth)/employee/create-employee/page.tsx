'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

import BackButton from '@/components/button/BackButton';
import Container from '@/components/container/Container';
import Heading from '@/components/heading/Heading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateEmployeeItem } from '@/types/types';
import { toast } from 'sonner';
import { useCreateEmployee } from '@/hooks/Employee/useEmployee';
import { RoleList } from '@/lib/data/roleLib';

const Page = () => {
  const router = useRouter();

  const { mutate: createEmployee } = useCreateEmployee();
  const [employeeData, setEmployeeData] = useState<CreateEmployeeItem>({
    identity: '',
    username: '',
    name: '',
    email: '',
    dob: new Date(),
    position: '',
    role_id: '',
    is_active: true,
    password: '',
    contact: '',
    phone_number: '',
  });
  const { roles, isLoading, isError } = RoleList(
    1,
    {
      page_size: 10,
    },
    0
  );

  const [loading, setLoading] = useState(false);

  const handleCreateEmployee = async () => {
    console.log('Final Employee Data:', employeeData);
    setLoading(true);

    try {
      if (!employeeData.username.trim()) {
        toast.error('Username is required');
        setLoading(false);
        return;
      }

      if (!employeeData.role_id.trim()) {
        toast.error('Role ID is required');
        setLoading(false);
        return;
      }
      createEmployee({
        employees: [employeeData],
      });

      // Reset state
      setEmployeeData({
        identity: '',
        username: '',
        name: '',
        email: '',
        dob: new Date(),
        position: '',
        role_id: '',
        is_active: true,
        password: '',
        contact: '',
        phone_number: '',
      });
    } catch (error) {
      console.error(error);
      toast.error('Error creating employee.');
    } finally {
      setLoading(false);
      router.push('/employee');
    }
  };

  return (
    <Container>
      <BackButton />
      <div className="flex justify-between items-center">
        <Heading name="Create Employee" desc="Create a new employee" />
        <Button onClick={handleCreateEmployee} disabled={loading}>
          {loading ? 'Creating...' : 'Create Employee'}
        </Button>
      </div>
      <form className="flex flex-col space-y-4">
        {[
          { label: 'Identity', name: 'identity' },
          { label: 'Username', name: 'username' },
          { label: 'Name', name: 'name' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Position', name: 'position' },
          { label: 'Password', name: 'password', type: 'password' },
          { label: 'Contact', name: 'contact' },
          { label: 'Phone Number', name: 'phone_number' },
        ].map(({ label, name, type = 'text' }) => (
          <div
            key={name}
            className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4"
          >
            <Label className="text-right">{label}</Label>
            <Input
              type={type}
              name={name}
              value={employeeData[name as keyof CreateEmployeeItem] as string}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  [name]: e.target.value,
                }))
              }
              required
              placeholder={`Enter employee ${label.toLowerCase()}`}
            />
          </div>
        ))}

        {/* Date of Birth */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Date of Birth</Label>
          <Input
            type="date"
            name="dob"
            value={employeeData.dob.toISOString().split('T')[0]}
            onChange={(e) =>
              setEmployeeData((prevData) => ({
                ...prevData,
                dob: new Date(e.target.value),
              }))
            }
          />
        </div>

        {/* Role ID */}
        <div className="mt-4 grid grid-cols-[150px_1fr] items-center gap-4">
          <Label className="text-right">Role ID</Label>
          {isLoading ? (
            <p>Loading roles...</p>
          ) : isError ? (
            <p className="text-red-500">Failed to load roles</p>
          ) : (
            <select
              name="role_id"
              value={employeeData.role_id}
              onChange={(e) =>
                setEmployeeData((prevData) => ({
                  ...prevData,
                  role_id: e.target.value,
                }))
              }
            >
              <option value="">Select a role</option>
              {roles?.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </form>
    </Container>
  );
};

export default Page;
