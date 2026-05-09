'use client'

import { Building2, DoorOpen, Receipt } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: Building2, label: '숙소 관리', href: '/properties' },
  { icon: DoorOpen, label: '객실 관리', href: '/rooms' },
  { icon: Receipt, label: '요금제 관리', href: '/rateplans' }
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
