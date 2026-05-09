'use client'

import { Calendar, CalendarCheck } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: Calendar, label: '예약 목록', href: '/bookings' },
  { icon: CalendarCheck, label: '예약하기', href: '/bookings/new' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()

  const getIsActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }

    if (href === '/bookings') {
      return pathname === href || (pathname.startsWith('/bookings/') && !pathname.startsWith('/bookings/new'))
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
