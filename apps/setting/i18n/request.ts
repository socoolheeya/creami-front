import { getRequestConfig } from 'next-intl/server'
import { cookies } from 'next/headers'
import { defaultLocale, locales, type Locale } from '@creami/i18n'
import enAppMessages from '../messages/en.json'
import jaAppMessages from '../messages/ja.json'
import koAppMessages from '../messages/ko.json'

const appMessagesByLocale = {
  en: enAppMessages,
  ja: jaAppMessages,
  ko: koAppMessages
} as const

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = (cookieStore.get('NEXT_LOCALE')?.value || defaultLocale) as Locale

  // Validate locale
  const validLocale = locales.includes(locale) ? locale : defaultLocale

  const commonMessages = (await import(`@creami/i18n/messages/${validLocale}.json`)).default
  const appMessages = appMessagesByLocale[validLocale]

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
