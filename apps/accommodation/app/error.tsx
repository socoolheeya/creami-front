'use client'

import { useEffect } from 'react'
import { ErrorTemplate } from '@/components/common/ErrorTemplate'

export default function Error({
  error,
  unstable_retry
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="p-xl">
      <ErrorTemplate onRetry={unstable_retry} />
    </main>
  )
}
