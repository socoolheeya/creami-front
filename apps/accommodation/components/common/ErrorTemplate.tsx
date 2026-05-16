'use client'

import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { ErrorTemplate as UiErrorTemplate } from '@creami/ui'

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
    <UiErrorTemplate
      title={resolvedTitle}
      description={resolvedDescription}
      onRetry={onRetry}
      retryLabel={commonT('retry')}
      backHref={backHref}
      backLabel={backLabel ?? commonT('backToList')}
      className={className}
    />
  )
}
