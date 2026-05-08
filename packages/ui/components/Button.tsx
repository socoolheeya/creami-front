import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const baseStyles = 'flex items-center gap-2 rounded-lg transition-colors'

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const variantStyles = {
    primary: disabled
      ? 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed'
      : 'bg-[var(--primary)] text-white hover:opacity-90',
    secondary: disabled
      ? 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] cursor-not-allowed border border-[var(--border-color)]'
      : 'bg-[var(--bg-secondary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:bg-[var(--bg-tertiary)]',
    tertiary: disabled
      ? 'bg-transparent text-[var(--text-tertiary)] cursor-not-allowed'
      : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]'
  }

  const combinedStyles = {
    borderRadius: 'var(--radius)',
    ...style
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      style={combinedStyles}
      {...props}
    >
      {children}
    </button>
  )
}
