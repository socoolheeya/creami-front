import React from 'react'
import type { LucideProps } from 'lucide-react'

export interface SidebarProps {
  children: React.ReactNode
  isCollapsed?: boolean
  className?: string
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
  depth?: 0 | 1
}

export function Sidebar({
  children,
  isCollapsed = false,
  className = ''
}: SidebarProps) {
  return (
    <aside
      className={`fixed left-0 bottom-0 z-30 top-[var(--header-height)] overflow-hidden bg-bg-primary border-r border-border transition-[width] duration-300 ease-in-out ${
        isCollapsed ? 'w-[var(--sidebar-collapsed)]' : 'w-[var(--sidebar-width)]'
      } ${className}`}
    >
      {children}
    </aside>
  )
}

export function SidebarMenu({ children }: SidebarMenuProps) {
  return (
    <nav className="h-full w-[var(--sidebar-width)] px-md py-lg overflow-y-auto overflow-x-hidden">
      <ul className="flex w-full flex-col gap-xs list-none m-0 p-0">
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
  isCollapsed = false,
  depth = 0
}: SidebarMenuItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`absolute left-0 top-0 h-full rounded transition-[width,background-color] duration-300 ${
          isCollapsed ? 'w-[calc(var(--sidebar-collapsed)-var(--spacing-lg))]' : 'w-full'
        } ${
          isActive ? 'bg-primary' : 'bg-transparent group-hover:bg-bg-tertiary'
        }`}
      />
      <div
        className={`absolute top-1/2 z-10 flex h-lg w-lg -translate-y-1/2 items-center justify-center ${
          depth === 1 && !isCollapsed ? 'left-lg' : 'left-md'
        }`}
      >
        <Icon className="w-lg h-lg shrink-0" />
      </div>
      <span
        className={`pointer-events-none absolute right-md top-1/2 z-10 min-w-0 -translate-y-1/2 truncate whitespace-nowrap ${
          depth === 1 && !isCollapsed
            ? 'left-[calc(var(--sidebar-collapsed)+var(--spacing-sm))]'
            : 'left-[calc(var(--sidebar-collapsed)-var(--spacing-md))]'
        }`}
      >
        {label}
      </span>
    </>
  )

  const listItemClasses = 'group w-full rounded'

  const itemClasses = `relative flex min-h-2xl w-full items-center bg-transparent text-lg font-medium no-underline transition-colors duration-200 focus-visible:outline focus-visible:outline-primary ${
    isActive
      ? 'text-white'
      : 'text-text-secondary group-hover:text-text-primary'
  }`

  return (
    <li className={listItemClasses}>
      {href ? (
        <a
          href={href}
          className={itemClasses}
          title={label}
          aria-current={isActive ? 'page' : undefined}
          onClick={handleClick}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          className={`${itemClasses} border-0 text-left cursor-pointer w-full`}
          title={label}
          aria-pressed={isActive}
          onClick={onClick}
        >
          {content}
        </button>
      )}
    </li>
  )
}
