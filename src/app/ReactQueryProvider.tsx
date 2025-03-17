'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/config/react-query.config';

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {isDev && <ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
