import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { Footer } from '@/components/footer';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/navbar').then(mod => ({ default: mod.Navbar })), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/scroll-progress').then(mod => ({ default: mod.ScrollProgress })), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/custom-cursor').then(mod => ({ default: mod.CustomCursor })), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = 'https://jaibhatia.dev';
const defaultTitle = 'Jai Bhatia - Senior Solutions Engineer | Pre-Sales, FinTech, AI';
const defaultDescription = 'Senior Solutions Engineer with 2+ years driving pre-sales in FinTech and Insurance. MEDDIC discovery, demo engineering, POC scoping. Built U.S. pre-sales motion at AI-native SaaS startup.';

export const metadata: Metadata = {
  title: {
    default: defaultTitle,
    template: '%s | Jai Bhatia',
  },
  description: defaultDescription,
  keywords: [
    'Jai Bhatia',
    'Senior Solutions Engineer',
    'Solutions Engineer',
    'Pre-Sales',
    'Sales Engineer',
    'FinTech',
    'Insurance',
    'MEDDIC',
    'POC scoping',
    'Technical discovery',
    'Demo engineering',
    'AI',
    'LangChain',
    'n8n',
    'RAG',
    'Enterprise SaaS',
  ],
  authors: [{ name: 'Jai Bhatia' }],
  creator: 'Jai Bhatia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: 'Jai Bhatia',
  },
  twitter: {
    card: 'summary_large_image',
    title: defaultTitle,
    description: defaultDescription,
    creator: '@jaibhatia19',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="canonical" href={siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Jai Bhatia',
              jobTitle: 'Senior Solutions Engineer',
              description: defaultDescription,
              url: siteUrl,
              sameAs: [
                'https://www.linkedin.com/in/jaibhatia19/',
                'https://github.com/JaiBhatia19',
              ],
              knowsAbout: [
                'Pre-Sales',
                'Technical Discovery',
                'POC Scoping',
                'MEDDIC',
                'FinTech',
                'Insurance',
                'AI',
                'LangChain',
                'n8n',
                'RAG',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Watermelon Software Inc.',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased noise-texture">
        <ScrollProgress />
        <CustomCursor />
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
