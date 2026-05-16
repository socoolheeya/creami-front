import React from 'react'

export interface TableProps {
  children: React.ReactNode
  className?: string
  overflow?: 'auto' | 'visible'
}

export interface TableHeaderProps {
  children: React.ReactNode
  filterRow?: React.ReactNode
  filtersEnabled?: boolean
  className?: string
}

export interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  children: React.ReactNode
  isSelected?: boolean
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
  titleText?: string
}

export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
  titleText?: string
}

export interface TableFilterRowProps {
  children: React.ReactNode
  className?: string
}

export interface TableFilterCellProps extends React.ThHTMLAttributes<HTMLTableHeaderCellElement> {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  truncate?: boolean
  titleText?: string
}

export interface TableStateRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  colSpan: number
  children: React.ReactNode
  variant?: 'empty' | 'loading' | 'error'
  className?: string
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

export function TableHeader({
  children,
  filterRow,
  filtersEnabled = true,
  className = ''
}: TableHeaderProps) {
  return (
    <thead className={`bg-bg-tertiary border-b-2 border-border ${className}`}>
      {children}
      {filtersEnabled && filterRow}
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
  isSelected = false,
  ...props
}: TableRowProps) {
  const baseClasses = `transition-all ${
    isSelected ? 'bg-primary-bg border-l border-l-primary' : 'border-l border-l-transparent'
  } ${onClick ? 'cursor-pointer hover:bg-bg-secondary' : 'cursor-default'}`

  return (
    <tr className={`${baseClasses} ${className}`} onClick={onClick} {...props}>
      {children}
    </tr>
  )
}

export function TableCell({
  children,
  className = '',
  align = 'left',
  truncate = false,
  titleText,
  ...props
}: TableCellProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
  const truncateClass = truncate ? 'max-w-none truncate' : ''
  const resolvedTitle = titleText ?? (truncate && typeof children === 'string' ? children : undefined)

  return (
    <td
      className={`px-md py-xs text-base text-text-primary border-b border-border ${alignClass} ${truncateClass} ${className}`}
      title={resolvedTitle}
      {...props}
    >
      {children}
    </td>
  )
}

export function TableHead({
  children,
  className = '',
  align = 'left',
  truncate = false,
  titleText,
  ...props
}: TableHeadProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
  const truncateClass = truncate ? 'max-w-none truncate' : ''
  const resolvedTitle = titleText ?? (truncate && typeof children === 'string' ? children : undefined)

  return (
    <th
      className={`bg-bg-tertiary px-md py-xs text-base font-bold text-text-primary ${alignClass} ${truncateClass} ${className}`}
      title={resolvedTitle}
      {...props}
      style={{ ...props.style, backgroundColor: 'var(--bg-tertiary)' }}
    >
      {children}
    </th>
  )
}

export function TableFilterRow({
  children,
  className = ''
}: TableFilterRowProps) {
  return (
    <tr className={`bg-bg-primary ${className}`}>
      {children}
    </tr>
  )
}

export function TableFilterCell({
  children,
  className = '',
  align = 'left',
  truncate = false,
  titleText,
  ...props
}: TableFilterCellProps) {
  const alignClass = align === 'center' ? 'text-center' : align === 'right' ? 'text-right' : 'text-left'
  const truncateClass = truncate ? 'max-w-none truncate' : ''
  const resolvedTitle = titleText ?? (truncate && typeof children === 'string' ? children : undefined)

  return (
    <th
      className={`px-md py-xs text-base font-medium text-text-primary ${alignClass} ${truncateClass} ${className}`}
      title={resolvedTitle}
      {...props}
      style={{ ...props.style, backgroundColor: 'var(--bg-primary)' }}
    >
      {children}
    </th>
  )
}

export function TableStateRow({
  colSpan,
  children,
  variant = 'empty',
  className = '',
  ...props
}: TableStateRowProps) {
  const variantClass = variant === 'error' ? 'text-error' : 'text-text-secondary'

  return (
    <tr className={`bg-bg-primary ${className}`} {...props}>
      <td
        colSpan={colSpan}
        className={`border-b border-border px-md py-xl text-center text-base font-medium ${variantClass}`}
      >
        {children}
      </td>
    </tr>
  )
}
