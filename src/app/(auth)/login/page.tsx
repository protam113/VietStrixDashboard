'use client';

import { LoginForm } from '@/components/form/login-form';
import { GalleryVerticalEnd } from 'lucide-react';
import React from 'react';

const Page = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#013162] p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center gap-2 self-center font-medium text-white">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="text-2xl font-bold">VIETSTRIX.</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Page;
