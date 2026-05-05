'use client'

import { LayoutDashboard, DollarSign, Package, ChevronLeft, Home, BarChart3, Tag, Calendar } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AppSwitcher } from './AppSwitcher'
import { CURRENT_APP } from '@/lib/constants'

const menuItems = [
  { icon: LayoutDashboard, label: '대시보드', href: '/' },
  { icon: DollarSign, label: '요금 관리', href: '/rates' },
  { icon: Package, label: '재고 관리', href: '/inventories' }
]

const appIconMap = {
  Home,
  LayoutDashboard,
  BarChart3,
  Tag,
  Calendar
}

interface SidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
}

export function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const pathname = usePathname()
  const CurrentAppIcon = appIconMap[CURRENT_APP.icon as keyof typeof appIconMap]

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 z-30 transition-all duration-300"
      style={{
        width: isCollapsed ? '56px' : '240px',
        backgroundColor: 'var(--bg-primary)',
        borderRight: '1px solid var(--border-color)'
      }}
    >
      <div className="flex flex-col h-full">
        {/* App Switcher + Collapse Button */}
        <div
          className="flex items-center justify-between border-b"
          style={{
            borderColor: 'var(--border-color)',
            height: '64px',
            padding: isCollapsed ? '12px' : '12px 12px 12px 16px'
          }}
        >
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(false)}
              className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--primary)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
              }}
              title={CURRENT_APP.name}
            >
              <CurrentAppIcon className="w-6 h-6" />
            </button>
          ) : (
            <>
              <div className="flex-1 min-w-0">
                <AppSwitcher />
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="flex items-center justify-center w-8 h-8 ml-2 rounded-lg transition-colors flex-shrink-0"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                  e.currentTarget.style.color = 'var(--text-primary)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }}
                title="접기"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        <nav className={`flex-1 ${isCollapsed ? 'py-2' : 'p-4'}`}>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href} className={isCollapsed ? 'flex justify-center' : ''}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-lg transition-colors ${
                      isCollapsed
                        ? 'justify-center'
                        : 'gap-3 px-3 py-2'
                    }`}
                    style={{
                      backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                      color: isActive ? '#ffffff' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      ...(isCollapsed ? {
                        width: '40px',
                        height: '40px',
                        aspectRatio: '1'
                      } : {})
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent'
                      }
                    }}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{
                        color: isActive ? '#ffffff' : 'var(--text-primary)'
                      }}
                    />
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
      </div>
    </aside>
  )
}
