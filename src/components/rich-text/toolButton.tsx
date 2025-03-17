import clsx from 'clsx';
import { FC, ReactNode } from 'react';

interface ToolButtonProps {
  children: ReactNode;
  active?: boolean;
  onClick: () => void;
}

const ToolButton: FC<ToolButtonProps> = ({ children, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx('p-2', active ? 'bg-black text-white' : 'text-black')}
    >
      {children}
    </button>
  );
};

export default ToolButton;
