'use client'

import { Calendar, CalendarCheck } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSidebar } from './SidebarContext'

const menuItems = [
  { icon: Calendar, label: '예약 목록', href: '/bookings' },
  { icon: CalendarCheck, label: '예약하기', href: '/bookings/new' }
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
            // /bookings/new는 정확히 매치, /bookings는 /bookings/new를 제외한 나머지
            const isActive = item.href === '/bookings'
              ? pathname === '/bookings' || (pathname.startsWith('/bookings/') && !pathname.startsWith('/bookings/new'))
              : pathname.startsWith(item.href)

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
