import React from 'react'

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  size?: 'large' | 'medium' | 'small' | 'mini'
  children: React.ReactNode
}

export function Select({
  size = 'medium',
  className = '',
  children,
  ...props
}: SelectProps) {
  const sizeStyles = {
    large: 'h-control-lg px-control-px-lg text-base leading-none',
    medium: 'h-control-md px-control-px-md text-base leading-none',
    small: 'h-control-sm px-control-px-sm text-base leading-none',
    mini: 'h-control-mini px-control-px-mini text-base leading-none'
  }

  const baseStyles = `w-full ${sizeStyles[size]} rounded border border-border bg-bg-secondary text-text-primary box-border font-medium`

  return (
    <select
      className={`${baseStyles} ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
