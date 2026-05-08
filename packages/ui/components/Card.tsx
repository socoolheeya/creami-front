import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
  hover?: boolean
}

export function Card({
  children,
  className = '',
  style,
  onClick,
  hover = true
}: CardProps) {
  const baseStyles = 'rounded-lg overflow-hidden'
  const hoverStyles = hover ? 'transition-all hover:shadow-lg cursor-pointer' : ''
  const defaultStyles = {
    backgroundColor: 'var(--bg-primary)',
    borderRadius: 'var(--radius)',
    boxShadow: 'var(--shadow)',
    border: '1px solid var(--border-color)',
    ...style
  }

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      style={defaultStyles}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
