// components/BackButton.tsx
import React from 'react';
import { useRouter } from 'next/navigation';
import { ComponentsIcons } from '@/assets/icons';

const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back(); // Quay lại trang trước đó
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center space-x-2 p-2 bg-primary-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
    >
      <ComponentsIcons.ArrowLeft />
      <span>Quay lại</span>
    </button>
  );
};

export default BackButton;
