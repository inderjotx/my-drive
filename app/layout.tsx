import type { Metadata } from 'next'
import './globals.css'

import { ThemeProvider } from "@/components/providers/ThemeProvider"
import { ReactNode } from 'react'
import FileTree from '@/components/FileTree'
import { ClientProvider } from '@/components/providers/ProviderClient'
import { Navbar } from '@/components/navbar'

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            {/* <FileTree /> */}
          </ThemeProvider>
          <ClientProvider />
        </body>
      </html>
    </>
  )
}

