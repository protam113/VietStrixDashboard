'use client';

import React, { ReactNode } from 'react';
import Breadcrumb from '@/components/design/breadcrumb';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import Footer from './Footer';

interface DefaultLayoutProps {
  children: ReactNode; // Khai báo kiểu cho children
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    // Trong DefaultLayout.tsx
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <Breadcrumb />

        <main className="flex-1 ml-8 ">
          {/* <Breadcrumb /> */}
          <div>{children}</div>
        </main>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DefaultLayout;
