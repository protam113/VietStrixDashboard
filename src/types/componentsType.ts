import { useRouter } from 'next/navigation';

/**
 * ==========================
 * 📌 @HEADER
 * ==========================
 */

export interface HeaderProps {
  title: string;
  lassName?: string;
}

/**
 * ==========================
 * 📌 @PUSH BUTTON
 * ==========================
 */

export interface PushButtonProps {
  href: string;
  label: string;
}

/**
 * ==========================
 * 📌 @STATS CARDS
 * ==========================
 */

interface StatItem {
  name: string;
  count: number;
  icon: React.ReactNode;
}

/**
 * ==========================
 * 📌 @WELCOME BANNER
 * ==========================
 */

export interface StatsCardsProps {
  items: StatItem[];
}

/**
 * ==========================
 * 📌 @WELCOME BANNER
 * ==========================
 */

export interface WelcomeBannerProps {
  message?: string;
}

/**
 * ==========================
 * 📌 @props ProductTableProps
 * ==========================
 */

export interface ProductTableProps {
  products: any[];
  isLoading: boolean;
  isError: boolean;
  selectedProducts: string[];
  onSelectProduct: (id: string) => void;
  onDeleteClick: (id: string) => void;
}

/**
 * ==========================
 * 📌 @props ContactTableProps
 * ==========================
 */

export interface ContactTableProps {
  contacts: any[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}

/**
 * ==========================
 * 📌 @props CategoryTableProps
 * ==========================
 */

export interface CategoryTableProps {
  categories: any[];
  isLoading: boolean;
  isError: boolean;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectCategory: (id: string) => void;
  handleDeleteClick: (id: string) => void;
  router: ReturnType<typeof useRouter>; // ✅ Cách sửa đúng
}

/**
 * ==========================
 * 📌 @props FaqTableProps
 * ==========================
 */

export interface FaqTableProps {
  faqs: any[];
  isLoading: boolean;
  isError: boolean;
  onDelete: (id: string) => void;
}
