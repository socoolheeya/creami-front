import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getLocale } from 'next-intl/server'
import { cookies } from 'next/headers'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AppLayout } from '@/components/layout/AppLayout'

export const metadata: Metadata = {
  title: 'Creami Setting',
  description: 'Creami Setting Dashboard'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  const messages = await getMessages()
  const cookieStore = await cookies()
  const themeCookie = cookieStore.get('CREAMI_THEME')?.value
  const theme = themeCookie === 'light' ? 'light' : 'dark'

  return (
    <html lang={locale} data-theme={theme} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <AppLayout>{children}</AppLayout>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
