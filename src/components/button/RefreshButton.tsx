import { Button } from '@/components/ui/button';
import { RefreshCcwDot } from 'lucide-react';

interface RefreshButtonProps {
  onClick: () => void;
  className?: string;
}

export const RefreshButton: React.FC<RefreshButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <Button
      onClick={onClick}
      className={`group ml-2 bg-[#013162] text-white hover:bg-[#024080] transition-all duration-300 ${className}`}
    >
      <RefreshCcwDot className="mr-2 transition-transform duration-300 group-hover:rotate-180" />
      Refresh
    </Button>
  );
};
