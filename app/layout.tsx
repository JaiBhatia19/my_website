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

export const metadata: Metadata = {
  title: {
    default: 'Jai Bhatia - Customer-facing technologist specializing in technical sales and applied AI',
    template: '%s | Jai Bhatia',
  },
  description: 'Customer-facing technologist specializing in technical sales and applied AI. Enterprise solutions, technical demos, and AI-enabled workflows.',
  keywords: [
    'Jai Bhatia',
    'Sales Engineer',
    'Technical Sales',
    'Applied AI',
    'Enterprise Solutions',
    'Technical Demos',
    'n8n',
    'LangChain',
  ],
  authors: [{ name: 'Jai Bhatia' }],
  creator: 'Jai Bhatia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaibhatia.dev',
    title: 'Jai Bhatia - Customer-facing technologist specializing in technical sales and applied AI',
    description: 'Customer-facing technologist specializing in technical sales and applied AI. Enterprise solutions, technical demos, and AI-enabled workflows.',
    siteName: 'Jai Bhatia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jai Bhatia - Customer-facing technologist specializing in technical sales and applied AI',
    description: 'Customer-facing technologist specializing in technical sales and applied AI. Enterprise solutions, technical demos, and AI-enabled workflows.',
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
  // Add google-site-verification meta when you have a code from Search Console
  // verification: { google: 'your-code-here' },
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
        <link rel="canonical" href="https://jaibhatia.dev" />
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
