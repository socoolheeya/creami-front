import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { MainLayout } from '@/components/layout/MainLayout'

export const metadata: Metadata = {
  title: 'Creami Invoice',
  description: 'Creami Invoice Dashboard'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <MainLayout>{children}</MainLayout>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
