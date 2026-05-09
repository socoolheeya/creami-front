import React from 'react'

export interface TableProps {
  children: React.ReactNode
  className?: string
  overflow?: 'auto' | 'visible'
}

export interface TableHeaderProps {
  children: React.ReactNode
  className?: string
}

export interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

export interface TableRowProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  isSelected?: boolean
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

export function Table({ children, className = '', overflow = 'auto' }: TableProps) {
  const overflowClass = overflow === 'visible' ? 'overflow-visible' : 'overflow-x-auto'

  return (
    <div className={overflowClass}>
      <table className={`w-full border-separate border-spacing-0 ${className}`}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = '' }: TableHeaderProps) {
  return (
    <thead className={`bg-bg-tertiary border-b-2 border-border ${className}`}>
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
  isSelected = false
}: TableRowProps) {
  const baseClasses = `transition-all ${
    isSelected
      ? 'bg-primary-bg border-l border-l-primary'
      : 'bg-bg-primary border-l border-l-transparent'
  } ${onClick ? 'cursor-pointer hover:bg-bg-secondary' : 'cursor-default'}`

  return (
    <tr className={`${baseClasses} ${className}`} onClick={onClick}>
      {children}
    </tr>
  )
}

export function TableCell({
  children,
  className = '',
  align = 'left',
  ...props
}: TableCellProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'

  return (
    <td className={`px-md py-md text-base text-text-primary border-b border-border ${alignClass} ${className}`} {...props}>
      {children}
    </td>
  )
}

export function TableHead({
  children,
  className = '',
  align = 'left',
  ...props
}: TableHeadProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'

  return (
    <th className={`px-md py-md text-base font-bold text-text-primary ${alignClass} ${className}`} {...props}>
      {children}
    </th>
  )
}
