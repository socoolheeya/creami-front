'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Button, Card } from '@creami/ui'

type ErrorTemplateProps = {
  title?: ReactNode
  description?: ReactNode
  onRetry?: () => void
  backHref?: string
  backLabel?: ReactNode
  className?: string
}

export function ErrorTemplate({
  title,
  description,
  onRetry,
  backHref,
  backLabel,
  className = ''
}: ErrorTemplateProps) {
  const commonT = useTranslations('accommodation.common')
  const resolvedTitle = title ?? commonT('errorTitle')
  const resolvedDescription = description ?? commonT('errorDescription')

  return (
    <Card
      className={`flex flex-col items-center justify-center border-error p-2xl text-center ${className}`}
      hover={false}
    >
      <div className="mb-md flex h-control-lg w-control-lg items-center justify-center rounded bg-error-bg text-error">
        <AlertTriangle className="h-icon-lg w-icon-lg" aria-hidden="true" />
      </div>

      <h2 className="mb-xs text-lg font-bold text-text-primary">
        {resolvedTitle}
      </h2>

      <p className="mb-lg text-base font-light text-text-secondary">
        {resolvedDescription}
      </p>

      {(onRetry || backHref) && (
        <div className="flex flex-wrap justify-center gap-sm">
          {onRetry && (
            <Button type="button" onClick={onRetry}>
              <RefreshCw className="h-icon-md w-icon-md" aria-hidden="true" />
              {commonT('retry')}
            </Button>
          )}

          {backHref && (
            <Link href={backHref}>
              <Button type="button" variant="secondary">
                <ArrowLeft className="h-icon-md w-icon-md" aria-hidden="true" />
                {backLabel ?? commonT('backToList')}
              </Button>
            </Link>
          )}
        </div>
      )}
    </Card>
  )
}
