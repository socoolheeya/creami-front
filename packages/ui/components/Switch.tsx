'use client'

import type { CSSProperties, ReactNode } from 'react'

export interface SwitchProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  label?: ReactNode
  description?: ReactNode
  disabled?: boolean
  variant?: 'primary' | 'success'
  size?: 'medium' | 'small'
  labelPosition?: 'left' | 'right'
  className?: string
  id?: string
  name?: string
  ariaLabel?: string
}

const switchSizeStyles = {
  medium: {
    track: {
      width: 'calc(var(--control-height-lg) + var(--spacing-lg))',
      height: 'var(--control-height-sm)',
      padding: 'var(--spacing-xs)',
      borderRadius: 'calc(var(--control-height-sm) * 2)'
    },
    thumb: {
      width: 'calc(var(--control-height-sm) - var(--spacing-xs) - var(--spacing-xs))',
      height: 'calc(var(--control-height-sm) - var(--spacing-xs) - var(--spacing-xs))',
      borderRadius: 'calc(var(--control-height-sm) * 2)'
    },
    checkedTransform: 'translateX(calc(var(--control-height-lg) + var(--spacing-lg) - var(--control-height-sm)))'
  },
  small: {
    track: {
      width: 'calc(var(--control-height-md) + var(--spacing-md))',
      height: 'var(--control-height-mini)',
      padding: 'var(--spacing-xs)',
      borderRadius: 'calc(var(--control-height-mini) * 2)'
    },
    thumb: {
      width: 'calc(var(--control-height-mini) - var(--spacing-xs) - var(--spacing-xs))',
      height: 'calc(var(--control-height-mini) - var(--spacing-xs) - var(--spacing-xs))',
      borderRadius: 'calc(var(--control-height-mini) * 2)'
    },
    checkedTransform: 'translateX(calc(var(--control-height-md) + var(--spacing-md) - var(--control-height-mini)))'
  }
}

const checkedTrackStyles = {
  primary: 'bg-primary',
  success: 'bg-success'
}

export function Switch({
  checked,
  onCheckedChange,
  label,
  description,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  labelPosition = 'right',
  className = '',
  id,
  name,
  ariaLabel
}: SwitchProps) {
  const sizeStyle = switchSizeStyles[size]

  const toggle = () => {
    if (!disabled) {
      onCheckedChange(!checked)
    }
  }

  const switchControl = (
    <button
      id={id}
      name={name}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={toggle}
      className={`inline-flex shrink-0 items-center border-none transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${
        checked ? checkedTrackStyles[variant] : 'bg-bg-tertiary'
      } ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      style={sizeStyle.track as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="block bg-white shadow-sm transition-transform duration-200 ease-in-out"
        style={{
          ...sizeStyle.thumb,
          transform: checked ? sizeStyle.checkedTransform : 'translateX(0)'
        }}
      />
    </button>
  )

  if (!label && !description) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        {switchControl}
      </span>
    )
  }

  return (
    <label
      className={`inline-flex items-center gap-sm text-base font-medium text-text-primary ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      } ${className}`}
    >
      {labelPosition === 'left' && (
        <span className="flex min-w-0 flex-col">
          {label && <span className="text-base font-medium text-text-primary">{label}</span>}
          {description && (
            <span className="text-base font-light text-text-tertiary">{description}</span>
          )}
        </span>
      )}

      {switchControl}

      {labelPosition === 'right' && (
        <span className="flex min-w-0 flex-col">
          {label && <span className="text-base font-medium text-text-primary">{label}</span>}
          {description && (
            <span className="text-base font-light text-text-tertiary">{description}</span>
          )}
        </span>
      )}
    </label>
  )
}
