'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type VisibilityFaqOption = 'show' | 'hide' | 'main';

interface VisibilitySelectProps {
  value: VisibilityFaqOption;
  onChange: (value: VisibilityFaqOption) => void;
}

export const FaqSelectStatus = ({ value, onChange }: VisibilitySelectProps) => {
  const labelMap = {
    show: 'Show',
    hide: 'Hide',
    main: 'Main',
  };
  return (
    <Select
      value={value}
      onValueChange={(val) => onChange(val as VisibilityFaqOption)}
    >
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select visibility">
          {labelMap[value as VisibilityFaqOption]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="show">Show</SelectItem>
        <SelectItem value="hide">Hide</SelectItem>
        <SelectItem value="main">Main</SelectItem>
      </SelectContent>
    </Select>
  );
};
