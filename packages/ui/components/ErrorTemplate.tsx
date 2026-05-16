import type { ReactNode } from 'react'
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react'
import { Button } from './Button'
import { Card } from './Card'

export interface ErrorTemplateProps {
  title: ReactNode
  description?: ReactNode
  retryLabel?: ReactNode
  backLabel?: ReactNode
  onRetry?: () => void
  backHref?: string
  className?: string
}

export function ErrorTemplate({
  title,
  description,
  retryLabel,
  backLabel,
  onRetry,
  backHref,
  className = ''
}: ErrorTemplateProps) {
  return (
    <Card
      className={`flex flex-col items-center justify-center border-error p-2xl text-center ${className}`}
      hover={false}
    >
      <div className="mb-md flex h-control-lg w-control-lg items-center justify-center rounded bg-error-bg text-error">
        <AlertTriangle className="h-icon-lg w-icon-lg" aria-hidden="true" />
      </div>

      <h2 className="mb-xs text-lg font-bold text-text-primary">
        {title}
      </h2>

      {description && (
        <p className="mb-lg text-base font-light text-text-secondary">
          {description}
        </p>
      )}

      {(onRetry || backHref) && (
        <div className="flex flex-wrap justify-center gap-sm">
          {onRetry && (
            <Button type="button" onClick={onRetry}>
              <RefreshCw className="h-icon-md w-icon-md" aria-hidden="true" />
              {retryLabel}
            </Button>
          )}

          {backHref && (
            <a
              href={backHref}
              className="inline-flex h-control-md shrink-0 items-center justify-center gap-sm rounded bg-bg-secondary px-control-px-md text-base font-medium leading-none text-text-primary no-underline transition-colors hover:bg-bg-tertiary"
            >
              <ArrowLeft className="h-icon-md w-icon-md" aria-hidden="true" />
              {backLabel}
            </a>
          )}
        </div>
      )}
    </Card>
  )
}
