'use client'

import { Building2, DoorOpen, Hotel, Receipt } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: Hotel, labelKey: 'nav.masterProperties', href: '/master-properties' },
  { icon: Building2, labelKey: 'nav.properties', href: '/properties' },
  { icon: DoorOpen, labelKey: 'nav.rooms', href: '/rooms' },
  { icon: Receipt, labelKey: 'nav.rateplans', href: '/rateplans' }
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
