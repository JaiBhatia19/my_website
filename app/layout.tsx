import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import React from 'react';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Jai Bhatia - Sales Engineer & AI Solutions Architect',
    template: '%s | Jai Bhatia',
  },
  description: 'AI-powered solutions architect with expertise in test automation, data science, and technical sales. Building useful products for the enterprise.',
  keywords: [
    'Jai Bhatia',
    'Sales Engineer',
    'AI Solutions Architect',
    'Test Automation',
    'Data Science',
    'Technical Sales',
    'Machine Learning',
    'QA Automation',
  ],
  authors: [{ name: 'Jai Bhatia' }],
  creator: 'Jai Bhatia',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jaibhatia.dev',
    title: 'Jai Bhatia - Sales Engineer & AI Solutions Architect',
    description: 'AI-powered solutions architect with expertise in test automation, data science, and technical sales.',
    siteName: 'Jai Bhatia',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jai Bhatia - Sales Engineer & AI Solutions Architect',
    description: 'AI-powered solutions architect with expertise in test automation, data science, and technical sales.',
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
  verification: {
    google: 'your-google-verification-code',
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
        <link rel="canonical" href="https://jaibhatia.dev" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
