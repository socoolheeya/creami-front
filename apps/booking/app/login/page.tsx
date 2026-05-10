import { redirect } from 'next/navigation'

import { APPS } from '@/lib/constants'

export default function LoginPage() {
  const settingApp = APPS.find((app) => app.id === 'setting')

  redirect(settingApp ? `${settingApp.url}/login` : '/login')
}
