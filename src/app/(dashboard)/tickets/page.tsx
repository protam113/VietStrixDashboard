import Heading from '@/components/heading/Heading';
import { Loader2 } from 'lucide-react';
import React from 'react';

const Page = () => {
  return (
    <main className="container mx-auto py-4 w-max-6xl">
      <Heading name="Tickets" />
      <div className="mt-10 flex flex-col items-center">
        <Loader2 className="w-12 h-12 animate-spin text-gray-500" />
        <h2 className="text-2xl font-semibold mt-4">
          This page is under development
        </h2>
        <p className="text-gray-600 mt-2 ">
          We are working hard to bring you an amazing experience. Please check
          back later!
        </p>
      </div>
    </main>
  );
};

export default Page;
