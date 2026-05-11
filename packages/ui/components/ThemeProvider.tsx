'use client'

import { ReactNode, useEffect } from 'react'

export type CreamiTheme = 'dark' | 'light'

const THEME_COOKIE_NAME = 'CREAMI_THEME'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365
const COOKIE_OPTIONS = `path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`

function isCreamiTheme(value: string | null | undefined): value is CreamiTheme {
  return value === 'dark' || value === 'light'
}

function readThemeCookie() {
  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${THEME_COOKIE_NAME}=`))
    ?.split('=')[1] ?? null
}

function getSharedCookieDomain() {
  const hostname = window.location.hostname

  if (
    hostname === 'localhost' ||
    hostname.endsWith('.localhost') ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)
  ) {
    return undefined
  }

  const parts = hostname.split('.')

  return parts.length > 2 ? `.${parts.slice(-2).join('.')}` : undefined
}

export function writeThemeCookie(theme: CreamiTheme) {
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; ${COOKIE_OPTIONS}`

  const sharedDomain = getSharedCookieDomain()

  if (sharedDomain) {
    document.cookie = `${THEME_COOKIE_NAME}=${theme}; ${COOKIE_OPTIONS}; domain=${sharedDomain}`
  }

  document.documentElement.setAttribute('data-theme', theme)
  window.dispatchEvent(new CustomEvent('creami-theme-change', { detail: theme }))
}

function ThemeCookieBootstrap() {
  useEffect(() => {
    const cookieTheme = readThemeCookie()
    const nextTheme = isCreamiTheme(cookieTheme) ? cookieTheme : 'dark'

    if (isCreamiTheme(cookieTheme)) {
      document.documentElement.setAttribute('data-theme', nextTheme)
    } else {
      writeThemeCookie(nextTheme)
    }
  }, [])

  return null
}

export function CreamiThemeProvider({ children }: { children: ReactNode }) {
  const themeBootstrapScript = `
    (function () {
      try {
        var cookieOptions = '${COOKIE_OPTIONS}';
        function getSharedCookieDomain() {
          var hostname = window.location.hostname;
          if (
            hostname === 'localhost' ||
            hostname.slice(-10) === '.localhost' ||
            /^\\d{1,3}(\\.\\d{1,3}){3}$/.test(hostname)
          ) {
            return null;
          }
          var parts = hostname.split('.');
          return parts.length > 2 ? '.' + parts.slice(-2).join('.') : null;
        }
        var themeCookie = document.cookie
          .split('; ')
          .find(function (cookie) { return cookie.indexOf('${THEME_COOKIE_NAME}=') === 0; });
        var theme = themeCookie ? themeCookie.split('=')[1] : null;
        if (theme !== 'dark' && theme !== 'light') {
          theme = 'dark';
        }
        document.cookie = '${THEME_COOKIE_NAME}=' + theme + '; ' + cookieOptions;
        var sharedDomain = getSharedCookieDomain();
        if (sharedDomain) {
          document.cookie = '${THEME_COOKIE_NAME}=' + theme + '; ' + cookieOptions + '; domain=' + sharedDomain;
        }
        document.documentElement.setAttribute('data-theme', theme);
      } catch (error) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    })();
  `

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      <ThemeCookieBootstrap />
      {children}
    </>
  )
}
