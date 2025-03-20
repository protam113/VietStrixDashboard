import type { Metadata } from 'next';

export const appInfo = {
  logo: '/nomal.svg',
  title: 'VietStrix Dashboard',
  description: 'Welcome to VietStrix Admin Area',
  domain: 'https://dashoard.vietstrix.com',
  ogImage: '/Logo.svg',
  themeColor: '#ffffff',
  keywords: ['dashboard', 'vietstrix', 'vietstrix dashboard'],
}; // Đã loại bỏ "as const" ở đây

// Đảm bảo các giá trị không null/undefined
export const metadata: Metadata = {
  title: appInfo.title,
  description: appInfo.description,
  keywords: appInfo.keywords,
  applicationName: appInfo.title,
  generator: 'Next.js',

  icons: {
    icon: appInfo.logo,
    apple: appInfo.logo,
    shortcut: appInfo.logo,
  },
  themeColor: appInfo.themeColor,

  openGraph: {
    type: 'website',
    title: appInfo.title,
    description: appInfo.description,
    siteName: appInfo.title,
    url: appInfo.domain,
    images: [
      {
        url: `${appInfo.domain}${appInfo.ogImage}`,
        width: 1200,
        height: 630,
        alt: appInfo.title,
      },
    ],
    locale: 'vi_VN',
  },

  twitter: {
    card: 'summary_large_image',
    title: appInfo.title,
    description: appInfo.description,
    images: [`${appInfo.domain}${appInfo.ogImage}`],
    creator: '@vietstrix',
    site: '@vietstrix',
  },

  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },

  alternates: {
    canonical: appInfo.domain,
    languages: {
      'en-US': `${appInfo.domain}/en`,
      'vi-VN': `${appInfo.domain}`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'verification_token',
    yandex: 'verification_token',
  },

  category: 'web development',
  creator: 'VietStrix Team',
  publisher: 'VietStrix',
};

// Function to generate metadata for child pages
export function PageMetadata(
  pageTitle: string,
  pageDescription?: string
): Metadata {
  return {
    ...metadata,
    title: `${pageTitle} | ${appInfo.title}`,
    description: pageDescription || metadata.description,
    openGraph: {
      ...metadata.openGraph,
      title: `${pageTitle} | ${appInfo.title}`,
      description: pageDescription || (metadata.description as string),
    },
    twitter: {
      ...metadata.twitter,
      title: `${pageTitle} | ${appInfo.title}`,
      description: pageDescription || (metadata.description as string),
    },
  };
}
