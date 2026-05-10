'use client'

import { Calendar, CalendarCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: Calendar, labelKey: 'nav.bookings', href: '/bookings' },
  { icon: CalendarCheck, labelKey: 'nav.newBooking', href: '/bookings/new' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()
  const t = useTranslations()

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
