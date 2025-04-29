'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type VisibilityOption = 'show' | 'hide' | 'popular' | 'draft';

interface VisibilitySelectProps {
  value: VisibilityOption;
  onChange: (value: VisibilityOption) => void;
}

export const VisibilitySelect = ({
  value,
  onChange,
}: VisibilitySelectProps) => {
  const labelMap = {
    show: 'Show',
    hide: 'Hide',
    popular: 'Popular',
    draft: 'Draft',
  };
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as VisibilityOption)}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select visibility">
          {labelMap[value as VisibilityOption]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="show">Show</SelectItem>
        <SelectItem value="hide">Hide</SelectItem>
        <SelectItem value="popular">Popular</SelectItem>
      </SelectContent>
    </Select>
  );
};
