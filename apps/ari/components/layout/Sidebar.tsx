'use client'

import { LayoutDashboard, DollarSign, Package } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: LayoutDashboard, label: '대시보드', href: '/' },
  { icon: DollarSign, label: '요금 관리', href: '/rates' },
  { icon: Package, label: '재고 관리', href: '/inventories' }
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
