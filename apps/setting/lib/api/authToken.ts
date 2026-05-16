export function readAuthToken(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  const cookieToken = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith('CREAMI_AUTH_TOKEN='))
    ?.split('=')
    .slice(1)
    .join('=')

  if (cookieToken) {
    return decodeURIComponent(cookieToken)
  }

  return window.localStorage.getItem('CREAMI_AUTH_TOKEN')
}

export function clearAuthSession() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem('CREAMI_AUTH_TOKEN')
  window.localStorage.removeItem('CREAMI_AUTH_MEMBER')
  document.cookie = 'CREAMI_AUTH_TOKEN=; path=/; max-age=0; SameSite=Lax'
}

export function redirectToLoginOnUnauthorized() {
  if (typeof window === 'undefined') {
    return
  }

  clearAuthSession()
  if (!window.location.pathname.startsWith('/login')) {
    window.location.replace('/login')
  }
}
