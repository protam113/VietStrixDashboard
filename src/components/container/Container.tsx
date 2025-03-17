import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <main className="max-w-7xl mx-auto container py-4 px-4 sm:px-6 lg:px-8">
      {children}
    </main>
  );
}
