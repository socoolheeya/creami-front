'use client'

import { LayoutDashboard, Tag, Link2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: LayoutDashboard, label: '할인 대시보드', href: '/' },
  { icon: Tag, label: '할인 관리', href: '/discounts' },
  { icon: Link2, label: '할인-요금제 매핑', href: '/mappings' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()

  const getIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <SidebarComponent isCollapsed={isCollapsed}>
      <SidebarMenu>
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={getIsActive(item.href)}
            isCollapsed={isCollapsed}
          />
        ))}
      </SidebarMenu>
    </SidebarComponent>
  )
}
