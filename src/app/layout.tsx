import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
// import Script from 'next/script';
// import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Toaster } from 'sonner';
import ReactQueryProvider from './ReactQueryProvider';
import { appInfo, metadata } from '@/constants/appInfos';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JMSFWG1T8D"
        ></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JMSFWG1T8D');
          `}
        </Script>
      </head> */}
      <head>
        <title>{metadata.title?.toString() || 'VietStrix User Area'}</title>
        <meta
          name="description"
          content={metadata.description?.toString() || 'Default description'}
        />
        <meta
          name="keywords"
          content={
            Array.isArray(metadata.keywords)
              ? metadata.keywords.join(', ')
              : metadata.keywords?.toString()
          }
        />

        {/* Favicon */}
        <link rel="icon" href={appInfo.logo} type="image/svg+xml" />
        <link rel="apple-touch-icon" href={appInfo.logo} />

        {/* Viewport for Mobile */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta name="theme-color" content={metadata.themeColor?.toString()} />

        {/* Open Graph Tags */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={metadata.openGraph?.title?.toString() || appInfo.title}
        />
        <meta
          property="og:description"
          content={
            metadata.openGraph?.description?.toString() || appInfo.description
          }
        />
        <meta
          property="og:image"
          content={`${appInfo.domain}${appInfo.ogImage}`}
        />
        <meta property="og:url" content={appInfo.domain} />
        <meta
          property="og:site_name"
          content={metadata.openGraph?.siteName?.toString() || appInfo.title}
        />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={metadata.twitter?.title?.toString() || appInfo.title}
        />
        <meta
          name="twitter:description"
          content={
            metadata.twitter?.description?.toString() || appInfo.description
          }
        />
        <meta
          name="twitter:image"
          content={`${appInfo.domain}${appInfo.ogImage}`}
        />
        <meta name="twitter:creator" content="@yourTwitterHandle" />

        {/* Canonical URL */}
        <link rel="canonical" href={appInfo.domain} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          {children}
          <Toaster position="top-right" richColors />{' '}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
