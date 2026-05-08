import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export function Select({
  className = '',
  style,
  children,
  ...props
}: SelectProps) {
  const baseStyles = 'w-full px-3 py-2 text-sm rounded-lg'
  const defaultStyles = {
    backgroundColor: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius)',
    ...style
  }

  return (
    <select
      className={`${baseStyles} ${className}`}
      style={defaultStyles}
      {...props}
    >
      {children}
    </select>
  )
}
