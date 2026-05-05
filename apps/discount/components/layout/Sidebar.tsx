'use client'

import { LayoutDashboard, Tag, Link2, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { icon: LayoutDashboard, label: '할인 대시보드', href: '/' },
  { icon: Tag, label: '할인 관리', href: '/discounts' },
  { icon: Link2, label: '할인-요금제 매핑', href: '/mappings' }
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-16 bottom-0 z-30 transition-all duration-300"
      style={{
        width: isCollapsed ? '64px' : '240px',
        backgroundColor: 'var(--bg-primary)',
        borderRight: '1px solid var(--border-color)'
      }}
    >
      <div className="flex flex-col h-full">
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span style={{ fontWeight: 'var(--font-medium)' }}>
                        {item.label}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-full px-3 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="ml-2" style={{ fontWeight: 'var(--font-medium)' }}>
                  접기
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
  )
}
