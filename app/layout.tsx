import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Bilal Yılmaz | İstanbul Dövme & Piercing Stüdyosu — Bilal Yılmaz ',
  description:
    'İstanbul Bağcılar\'de kişiye özel dövme, cover up, piercing ve realism çalışmaları. En üst düzey hijyen, usta işçilik ve özgün tasarımlarla Bilal Yılmaz.',
  keywords: ['İstanbul dövme', 'dövme stüdyosu', 'piercing', 'cover up', 'custom tattoo', 'Bağcılar', 'Bilal Yılmaz '],
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#070707',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" className="bg-[#070707]">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
