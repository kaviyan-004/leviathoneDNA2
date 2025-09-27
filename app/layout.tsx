import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Leviathan - AI-Powered eDNA Biodiversity Analysis',
  description: 'Discover the hidden diversity of marine ecosystems through advanced environmental DNA analysis. A comprehensive platform for researchers, policymakers, and conservationists.',
  keywords: 'eDNA, biodiversity, marine biology, AI, environmental DNA, conservation, SIH 2025',
  authors: [{ name: 'Leviathan Team' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Leviathan - AI-Powered eDNA Biodiversity Analysis',
    description: 'Discover the hidden diversity of marine ecosystems through advanced environmental DNA analysis.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                style: {
                  background: '#046A38',
                },
              },
              error: {
                style: {
                  background: '#FF671F',
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
