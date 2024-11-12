import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ChefGPT 0.2',
  description: 'Web app to decide what meal to make with your ingredients, and tells you how to make it step by step with integrated AI.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  <head>
    <meta name="google-adsense-account" content="ca-pub-9022203058839959"></meta>
  </head>
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
