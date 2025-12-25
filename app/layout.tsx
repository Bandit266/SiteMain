import type { Metadata } from 'next'
import './globals.css'
import Navigation from '@/components/Navigation'
import GridBackground from '@/components/GridBackground'
import PageTransition from '@/components/PageTransition'

export const metadata: Metadata = {
  title: 'Game Dev Portfolio',
  description: 'A sci-fi themed game development portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PageTransition />
        <GridBackground />
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  )
}
