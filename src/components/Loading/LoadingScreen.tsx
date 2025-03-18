import { Loader } from 'lucide-react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      <Loader className="animate-spin h-16 w-16 text-gray-700" />
    </div>
  );
};

export default LoadingScreen;
