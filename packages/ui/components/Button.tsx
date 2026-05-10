import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost'
  size?: 'lg' | 'large' | 'normal' | 'md' | 'medium' | 'sm' | 'small' | 'mini'
  iconOnly?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'medium',
  iconOnly = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  const normalizedSize =
    size === 'lg' ? 'large' :
    size === 'normal' || size === 'md' ? 'medium' :
    size === 'sm' ? 'small' :
    size

  const baseStyles = 'inline-flex shrink-0 items-center justify-center gap-sm rounded transition-colors box-border m-none border-none text-base leading-none font-medium'

  const sizeStyles = {
    large: iconOnly ? 'h-control-lg w-control-lg p-none' : 'h-control-lg px-control-px-lg py-none',
    medium: iconOnly ? 'h-control-md w-control-md p-none' : 'h-control-md px-control-px-md py-none',
    small: iconOnly ? 'h-control-sm w-control-sm p-none' : 'h-control-sm px-control-px-sm py-none',
    mini: iconOnly ? 'h-control-mini w-control-mini p-none' : 'h-control-mini px-control-px-mini py-none'
  }

  const variantStyles = {
    primary: disabled
      ? 'cursor-not-allowed bg-primary text-white opacity-50'
      : 'cursor-pointer bg-primary text-white hover:opacity-90',
    secondary: disabled
      ? 'cursor-not-allowed bg-bg-tertiary text-text-tertiary'
      : 'cursor-pointer bg-bg-secondary text-text-primary hover:bg-bg-tertiary',
    tertiary: disabled
      ? 'cursor-not-allowed bg-bg-tertiary text-text-tertiary'
      : 'cursor-pointer bg-bg-tertiary text-text-primary hover:bg-bg-secondary',
    ghost: disabled
      ? 'cursor-not-allowed bg-transparent text-text-tertiary'
      : 'cursor-pointer bg-transparent text-text-primary hover:bg-bg-tertiary'
  }[variant]

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`${baseStyles} ${sizeStyles[normalizedSize]} ${variantStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
