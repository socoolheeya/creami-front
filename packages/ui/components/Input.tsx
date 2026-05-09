import React from 'react'
import { Search } from 'lucide-react'

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'large' | 'medium' | 'small' | 'mini'
  showSearchIcon?: boolean
}

export function Input({
  size = 'medium',
  showSearchIcon = false,
  className = '',
  ...props
}: InputProps) {
  const sizeStyles = {
    large: 'h-control-lg px-control-px-lg text-base leading-none',
    medium: 'h-control-md px-control-px-md text-base leading-none',
    small: 'h-control-sm px-control-px-sm text-base leading-none',
    mini: 'h-control-mini px-control-px-mini text-base leading-none'
  }

  const baseStyles = `w-full ${sizeStyles[size]} rounded border border-border bg-bg-primary text-text-primary box-border font-medium`

  if (showSearchIcon) {
    return (
      <div className="relative w-full">
        <input
          className={`${baseStyles} pr-control-search ${className}`}
          {...props}
        />
        <Search className="absolute right-md top-1/2 h-icon-md w-icon-md -translate-y-1/2 transform pointer-events-none text-text-tertiary" />
      </div>
    )
  }

  return (
    <input
      className={`${baseStyles} ${className}`}
      {...props}
    />
  )
}
