import React from 'react'
import { AlertTriangle, CheckCircle2, Info, XCircle } from 'lucide-react'

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error'
  title?: string
  children: React.ReactNode
  className?: string
}

const iconMap = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle
}

const colorMap = {
  info: 'var(--primary)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--error)'
}

const backgroundMap = {
  info: 'var(--primary-bg)',
  success: 'var(--success-bg)',
  warning: 'var(--warning-bg)',
  error: 'var(--error-bg)'
}

export function Alert({
  variant = 'info',
  title,
  children,
  className = ''
}: AlertProps) {
  const Icon = iconMap[variant]

  return (
    <div
      className={`flex items-start gap-sm rounded p-md text-base ${className}`}
      style={{
        backgroundColor: backgroundMap[variant],
        border: 'var(--border)',
        borderColor: colorMap[variant],
        borderRadius: 'var(--radius)',
        color: 'var(--text-primary)'
      }}
    >
      <Icon
        className="h-icon-md w-icon-md shrink-0"
        style={{ color: colorMap[variant] }}
      />
      <div className="flex flex-col gap-xs">
        {title && (
          <div style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}>
            {title}
          </div>
        )}
        <div style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
