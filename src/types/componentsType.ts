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
