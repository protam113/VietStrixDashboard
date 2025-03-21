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

  const pagination = data?.pagination ?? { currentPage: 1, totalPages: 1 };

  const contacts = data?.data ?? [];
  logDebug('🐞 Data:', contacts);
  return {
    contacts,
    isLoading,
    isError,
    pagination,
  };
};
