import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { defaultLocale, locales, type Locale } from '@creami/i18n'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || defaultLocale) as Locale
  const validLocale = locales.includes(locale) ? locale : defaultLocale
  const commonMessages = (await import(`@creami/i18n/messages/${validLocale}.json`)).default
  const appMessages = (await import(`../messages/${validLocale}.json`)).default

  return {
    locale: validLocale,
    messages: {
      ...commonMessages,
      ...appMessages,
      nav: {
        ...commonMessages.nav,
        ...appMessages.nav
      }
    }
  }
})
