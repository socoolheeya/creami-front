import React from 'react'
import type { LucideProps } from 'lucide-react'

export interface SidebarProps {
  children: React.ReactNode
  isCollapsed?: boolean
  className?: string
  style?: React.CSSProperties
}

export interface SidebarMenuProps {
  children: React.ReactNode
}

export interface SidebarMenuItemProps {
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>
  label: string
  href?: string
  onClick?: () => void
  isActive?: boolean
  isCollapsed?: boolean
}

export function Sidebar({
  children,
  isCollapsed = false,
  className = '',
  style
}: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 bottom-0 z-30 ${className}`}
      style={{
        top: 'var(--header-height)',
        width: isCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-primary)',
        borderRight: '1px solid var(--border-color)',
        transition: 'width 300ms ease-in-out',
        ...style
      }}
    >
      {children}
    </aside>
  )
}

export function SidebarMenu({ children }: SidebarMenuProps) {
  return (
    <nav style={{ padding: 'var(--spacing-md)' }}>
      <ul
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-sm)',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}
      >
        {children}
      </ul>
    </nav>
  )
}

export function SidebarMenuItem({
  icon: Icon,
  label,
  href,
  onClick,
  isActive = false,
  isCollapsed = false
}: SidebarMenuItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const content = (
    <>
      <Icon style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} />
      <span
        className="whitespace-nowrap"
        style={{
          opacity: isCollapsed ? 0 : 1,
          maxWidth: isCollapsed ? '0' : '200px',
          transition: 'opacity 300ms, max-width 300ms'
        }}
      >
        {label}
      </span>
    </>
  )

  const itemStyle = {
    gap: 'var(--spacing-sm)',
    padding: 'var(--spacing-sm) var(--spacing-md)',
    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
    color: isActive ? '#ffffff' : 'var(--text-primary)',
    borderRadius: 'var(--radius)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-medium)',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    transition: 'colors 200ms'
  }

  return (
    <li>
      {href ? (
        <a
          href={href}
          className="flex items-center overflow-hidden transition-colors"
          style={itemStyle}
          title={isCollapsed ? label : undefined}
          onClick={handleClick}
        >
          {content}
        </a>
      ) : (
        <button
          className="flex items-center overflow-hidden transition-colors w-full"
          style={itemStyle}
          title={isCollapsed ? label : undefined}
          onClick={onClick}
        >
          {content}
        </button>
      )}
    </li>
  )
}
