'use client'

import { LayoutDashboard, Tag, Link2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: LayoutDashboard, labelKey: 'nav.discountDashboard', href: '/' },
  { icon: Tag, labelKey: 'nav.discounts', href: '/discounts' },
  { icon: Link2, labelKey: 'nav.discountMappings', href: '/mappings' }
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
