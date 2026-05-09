import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
}

export function Card({
  children,
  className = '',
  onClick,
  hover = true
}: CardProps) {
  const baseStyles = 'bg-bg-primary rounded border border-border shadow overflow-hidden'
  const hoverStyles = hover ? 'transition-all hover:shadow-lg cursor-pointer' : ''

  return (
    <div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
