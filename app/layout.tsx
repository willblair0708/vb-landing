import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { ReactNode } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';

import CookieBanner from '@/app/components/CookieBanner';

import './globals.css';
import { CSPostHogProvider } from './providers';

const geistMono = localFont({
  src: '../public/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
});

const hoves = localFont({
  src: [
    { path: '../public/fonts/TTHoves/Regular.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Bold.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Demibold.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Light.ttf', style: 'normal' },
    { path: '../public/fonts/TTHoves/Medium.ttf', style: 'normal' },
  ],
  variable: '--font-hoves',
  display: 'swap',
});

const gtPantheon = localFont({
  src: '../public/fonts/GT-Pantheon-Text-Regular.woff2',
  variable: '--font-gt-pantheon',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aaruaaru.com'),
  title: 'Virtual Biology Corporation | AI-Powered Drug Discovery',
  description:
    'Virtual Biology Corporation is revolutionizing drug discovery through AI-powered virtual cell models, genomic language models, and cross-species analysis - reducing costs and accelerating development.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: 'index, follow',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  twitter: {
    card: 'summary_large_image',
    site: '@virtualbio',
    creator: '@virtualbio',
    images: [
      {
        url: '/assets/og.png',
        width: 1200,
        height: 630,
        alt: 'Virtual Biology Corporation - AI-Powered Drug Discovery',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://virtualbio.com',
    siteName: 'Virtual Biology Corporation',
    title: 'Virtual Biology Corporation | AI-Powered Drug Discovery',
    description:
      'Virtual Biology Corporation is revolutionizing drug discovery through AI-powered virtual cell models, genomic language models, and cross-species analysis - reducing costs and accelerating development.',
    images: [
      {
        url: '/assets/og.png',
        width: 1200,
        height: 630,
        alt: 'Virtual Biology Corporation - AI-Powered Drug Discovery',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth bg-[#000913]'>
      {/* GA Script with default denied consent */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
      />
      <Script
        id='google-analytics'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  // Default consent mode setup
                  gtag('consent', 'default', {
                    analytics_storage: 'denied'
                  });

                  gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
                `,
        }}
      />
      <CSPostHogProvider>
        <body
          className={`${hoves.variable} ${geistMono.variable} ${gtPantheon.variable} bg-gradient-to-b from-[#000913] to-[#001F3F] text-primary antialiased`}
        >
          <div className='flex min-h-screen flex-col'>
            <Toaster />
            <main className='flex-grow'>{children}</main>
          </div>
          <CookieBanner />
          <Analytics />
        </body>
      </CSPostHogProvider>
    </html>
  );
}
