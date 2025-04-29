'use client';

import { Filters } from '@/types/types';
import { logDebug } from '../logger';
import { useContactList } from '@/hooks/Contact/useContact';

// ContactList.ts
export const ContactList = (
  currentPage: number,
  filters: Filters,
  refreshKey: number
) => {
  const { data, isLoading, isError } = useContactList(
    currentPage,
    filters,
    refreshKey
  );

  const pagination = data?.pagination ?? { current_page: 1, total_page: 1 };

  const contacts = data?.results ?? [];
  logDebug('🐞 Data:', contacts);
  return {
    contacts,
    isLoading,
    isError,
    pagination,
  };
};
