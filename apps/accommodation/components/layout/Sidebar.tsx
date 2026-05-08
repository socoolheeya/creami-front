'use client'

import { Building2, DoorOpen, Receipt } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'

const menuItems = [
  { icon: Building2, label: '숙소 관리', href: '/properties' },
  { icon: DoorOpen, label: '객실 관리', href: '/rooms' },
  { icon: Receipt, label: '요금제 관리', href: '/rateplans' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 bottom-0 z-30"
      style={{
        top: 'var(--header-height)',
        width: isCollapsed ? 'var(--sidebar-collapsed)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--bg-primary)',
        borderRight: '1px solid var(--border-color)',
        transition: 'width 300ms ease-in-out'
      }}
    >
      <nav style={{ padding: 'var(--spacing-md)' }}>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname.startsWith(item.href)

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center overflow-hidden transition-colors"
                  style={{
                    gap: 'var(--spacing-sm)',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 'var(--font-medium)'
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} />
                  <span
                    className="whitespace-nowrap"
                    style={{
                      opacity: isCollapsed ? 0 : 1,
                      maxWidth: isCollapsed ? '0' : '200px',
                      transition: 'opacity 300ms, max-width 300ms'
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
