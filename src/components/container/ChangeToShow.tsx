'use client';

import { VisibilityOption } from './VisibilitySelect';

export interface VisibilityChangeProps {
  label: string;
  value: VisibilityOption;

  onChange: (value: VisibilityChangeProps['value']) => void;
}

export const VisibilityChange = ({
  label,
  value,
  onChange,
}: VisibilityChangeProps) => {
  return (
    <button
      onClick={() => onChange(value)}
      className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-600 border border-blue-300 hover:bg-blue-600 hover:text-white transition-all"
    >
      {label}
    </button>
  );
};
