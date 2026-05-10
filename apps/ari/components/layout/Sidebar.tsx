'use client'

import { LayoutDashboard, DollarSign, Package } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: LayoutDashboard, labelKey: 'nav.dashboard', href: '/' },
  { icon: DollarSign, labelKey: 'nav.rates', href: '/rates' },
  { icon: Package, labelKey: 'nav.inventories', href: '/inventories' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()
  const t = useTranslations()

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
            label={t(item.labelKey)}
            href={item.href}
            isActive={getIsActive(item.href)}
            isCollapsed={isCollapsed}
          />
        ))}
      </SidebarMenu>
    </SidebarComponent>
  )
}
