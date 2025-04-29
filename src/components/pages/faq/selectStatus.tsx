'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';

const status = [
  { id: 'all', label: 'All' },
  { id: 'main', label: 'Main' },
  { id: 'show', label: 'Show' },
  { id: 'hide', label: 'Hide' },
];

const SelectFaqStatus = ({
  selectedStatus = 'all',
  onStatusChange,
}: {
  selectedStatus?: string;
  onStatusChange: (status: string) => void;
}) => {
  const [selected, setSelected] = useState<string>(selectedStatus);

  const handleSelect = (value: string) => {
    setSelected(value);
    onStatusChange(value);
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Select */}
      <Select onValueChange={handleSelect} value={selected}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {status.map((status) => (
            <SelectItem key={status.id} value={status.id}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectFaqStatus;
