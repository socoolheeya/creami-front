import React from 'react'
import { Search } from 'lucide-react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showSearchIcon?: boolean
}

export function Input({
  showSearchIcon = false,
  className = '',
  style,
  ...props
}: InputProps) {
  const baseStyles = 'w-full px-3 py-2 text-sm rounded-lg'
  const defaultStyles = {
    backgroundColor: 'var(--bg-primary)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
    borderRadius: 'var(--radius)',
    ...style
  }

  if (showSearchIcon) {
    const SearchIcon = Search as React.ComponentType<{ className?: string; style?: React.CSSProperties }>

    return (
      <div className="relative w-full">
        <input
          className={`${baseStyles} pr-10 ${className}`}
          style={defaultStyles}
          {...props}
        />
        <SearchIcon
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
          style={{ color: 'var(--text-tertiary)' }}
        />
      </div>
    )
  }

  return (
    <input
      className={`${baseStyles} ${className}`}
      style={defaultStyles}
      {...props}
    />
  )
}
