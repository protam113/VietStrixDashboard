// react-query.config.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 phút trước khi query bị stale
      refetchOnWindowFocus: false, // Không fetch lại khi focus cửa sổ
      retry: 2, // Số lần retry nếu request thất bại
    },
    mutations: {
      retry: 2, // Retry tối đa 2 lần nếu mutation thất bại
    },
  },
});
