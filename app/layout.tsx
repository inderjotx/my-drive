import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
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
      <html lang="en">
        <body>
          <SessionProvider >
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              <Navbar />
              {children}
              <ClientProvider />
              <VideoProvider />
            </ThemeProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  )
}

