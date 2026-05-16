'use client'

import { useEffect } from 'react'
import { ErrorTemplate } from '@/components/common/ErrorTemplate'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="p-xl">
      <ErrorTemplate onRetry={reset} />
    </main>
  )
}
