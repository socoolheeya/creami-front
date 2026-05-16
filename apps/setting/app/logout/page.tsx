'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '../../lib/api/iam'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    const completeLogout = async () => {
      try {
        await logout()
      } catch {
        // Client-side token removal is authoritative for the local stateless session.
      } finally {
        window.localStorage.removeItem('CREAMI_AUTH_TOKEN')
        window.localStorage.removeItem('CREAMI_AUTH_MEMBER')
        document.cookie = 'CREAMI_AUTH_TOKEN=; path=/; max-age=0; SameSite=Lax'
        router.replace('/login')
      }
    }

    completeLogout()
  }, [router])

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-secondary p-lg">
      <p className="text-base font-medium text-text-secondary">로그아웃 중입니다.</p>
    </main>
  )
}
