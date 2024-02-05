import type { Metadata } from 'next'
import './globals.css'

import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ReactNode } from 'react'
import { ClientProvider } from '@/components/providers/ProviderClient'
import { Navbar } from '@/components/navbar'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { VideoProvider } from '@/components/providers/ShowVideo'

export const metadata: Metadata = {
  title: 'Free-Drive',
  description: 'Drive Fee for All',
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <Navbar />
          <SessionProvider >
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </SessionProvider>
          <ClientProvider />
          <VideoProvider />
        </body>
      </html>
    </>
  )
}

