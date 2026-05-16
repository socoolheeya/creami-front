'use client'

import { CreditCard, FileSliders, Handshake, KeyRound, ShieldCheck, UserCog, Users, UsersRound } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Sidebar as SidebarComponent, SidebarMenu, SidebarMenuItem, useSidebar } from '@creami/ui'

const menuItems = [
  { icon: UserCog, labelKey: 'nav.profile', href: '/profile' },
  { icon: Users, labelKey: 'nav.users', href: '/users' },
  { icon: UsersRound, labelKey: 'nav.userGroups', href: '/user-groups' },
  { icon: Handshake, labelKey: 'nav.suppliers', href: '/suppliers' },
  { icon: KeyRound, labelKey: 'nav.apiKeys', href: '/suppliers/api-keys' },
  { icon: ShieldCheck, labelKey: 'nav.permissions', href: '/permissions' },
  { icon: FileSliders, labelKey: 'nav.policies', href: '/permissions/policies' },
  { icon: CreditCard, labelKey: 'nav.subscriptions', href: '/subscriptions' }
]

export function Sidebar() {
  const { isCollapsed } = useSidebar()
  const resolvedPathname = usePathname()
  const t = useTranslations()

  const getIsActive = (href: string) => {
    if (href === '/permissions' || href === '/suppliers') {
      return resolvedPathname === href
    }

    return resolvedPathname.startsWith(href)
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
