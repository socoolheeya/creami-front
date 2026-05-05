'use client'

import { LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'

const menuItems = [
  { icon: LayoutDashboard, label: '대시보드', href: '/dashboard' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-16 bottom-0 z-30 transition-all duration-300"
      style={{
        width: isCollapsed ? '80px' : '288px',
        backgroundColor: 'var(--bg-primary)',
        borderRight: '1px solid var(--border-color)'
      }}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors overflow-hidden"
                  style={{
                    backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                    color: isActive ? '#ffffff' : 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span
                    className="whitespace-nowrap transition-all duration-300"
                    style={{
                      fontWeight: 'var(--font-medium)',
                      opacity: isCollapsed ? 0 : 1,
                      maxWidth: isCollapsed ? '0' : '200px'
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
