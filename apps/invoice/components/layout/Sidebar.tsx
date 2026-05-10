'use client'

import { FileText, ReceiptText } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: ReceiptText, labelKey: 'nav.invoiceDashboard', href: '/dashboard' },
  { icon: FileText, labelKey: 'nav.invoices', href: '/invoices' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const pathname = usePathname()
  const t = useTranslations()

  const getIsActive = (href: string) => pathname.startsWith(href)

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
