import React from 'react'

export interface TableProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export interface TableHeaderProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}

export interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

export interface TableRowProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  style?: React.CSSProperties
  isSelected?: boolean
}

export interface TableCellProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  align?: 'left' | 'center' | 'right'
}

export interface TableHeadProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  align?: 'left' | 'center' | 'right'
}

export function Table({ children, className = '', style }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`w-full ${className}`}
        style={{
          borderCollapse: 'separate',
          borderSpacing: 0,
          ...style
        }}
      >
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = '', style }: TableHeaderProps) {
  return (
    <thead
      className={className}
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        borderBottom: '2px solid var(--border-color)',
        ...style
      }}
    >
      {children}
    </thead>
  )
}

export function TableBody({ children, className = '' }: TableBodyProps) {
  return <tbody className={className}>{children}</tbody>
}

export function TableRow({
  children,
  onClick,
  className = '',
  style,
  isSelected = false
}: TableRowProps) {
  const baseStyles = {
    backgroundColor: isSelected ? 'var(--primary-bg)' : 'var(--bg-primary)',
    borderLeft: isSelected ? '3px solid var(--primary)' : '3px solid transparent',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'all 0.2s',
    ...style
  }

  return (
    <tr
      className={className}
      style={baseStyles}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (onClick && !isSelected) {
          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
        }
      }}
      onMouseLeave={(e) => {
        if (onClick && !isSelected) {
          e.currentTarget.style.backgroundColor = 'var(--bg-primary)'
        }
      }}
    >
      {children}
    </tr>
  )
}

export function TableCell({
  children,
  className = '',
  style,
  align = 'left'
}: TableCellProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'

  return (
    <td
      className={`px-3 py-3 text-sm ${alignClass} ${className}`}
      style={{
        color: 'var(--text-primary)',
        borderBottom: '1px solid var(--border-color)',
        ...style
      }}
    >
      {children}
    </td>
  )
}

export function TableHead({
  children,
  className = '',
  style,
  align = 'left'
}: TableHeadProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'

  return (
    <th
      className={`px-3 py-3 text-sm ${alignClass} ${className}`}
      style={{
        fontWeight: 'var(--font-bold)',
        color: 'var(--text-primary)',
        ...style
      }}
    >
      {children}
    </th>
  )
}
