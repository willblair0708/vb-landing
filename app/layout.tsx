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

const abcOracle = localFont({
  src: [
    {
      path: '../public/fonts/ABCOracle-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/ABCOracle-BookItalic.woff2',
      weight: '350',
      style: 'normal',
    },
    {
      path: '../public/fonts/ABCOracle-BookItalic.woff2',
      weight: '350',
      style: 'italic',
    },
    {
      path: '../public/fonts/ABCOracle-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ABCOracle-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/ABCOracle-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/ABCOracle-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../public/fonts/ABCOracle-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/ABCOracle-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
  variable: '--font-abc-oracle',
  display: 'swap',
  preload: true,
});

const gtPantheon = localFont({
  src: '../public/fonts/GT-Pantheon-Text-Regular.woff2',
  variable: '--font-gt-pantheon',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://aaruaaru.com'),
  title: 'Aaru | Rethinking the Science of Prediction',
  description:
    'Aaru is revolutionizing prediction through multi-agent systems, offering unparalleled insights into future events and trends.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  robots: 'index, follow',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
  twitter: {
    card: 'summary_large_image',
    site: '@aaruhq',
    creator: '@aaruhq',
    images: [
      {
        url: '/assets/og.png',
        width: 1200,
        height: 630,
        alt: 'Aaru - Rethinking the Science of Prediction',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aaruaaru.com',
    siteName: 'Aaru',
    title: 'Aaru | Rethinking the Science of Prediction',
    description:
      'Aaru is revolutionizing prediction through multi-agent systems, offering unparalleled insights into future events and trends.',
    images: [
      {
        url: '/assets/og.png',
        width: 1200,
        height: 630,
        alt: 'Aaru - Rethinking the Science of Prediction',
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
    <html lang='en' className='scroll-smooth bg-[#000000]'>
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
          className={`${abcOracle.variable} ${geistMono.variable} ${gtPantheon.variable} bg-background-light text-primary antialiased`}
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
