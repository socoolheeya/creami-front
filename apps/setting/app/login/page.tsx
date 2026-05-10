'use client'

import { FormEvent } from 'react'
import { Button, Input } from '@creami/ui'
import { LogIn, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const socialProviders = [
  {
    id: 'naver',
    labelKey: 'setting.login.naver',
    iconSrc: '/social/naver.svg',
    background: 'var(--social-naver-bg)',
    color: 'var(--social-naver-text)',
    border: 'var(--social-naver-border)'
  },
  {
    id: 'kakao',
    labelKey: 'setting.login.kakao',
    iconSrc: '/social/kakao.svg',
    background: 'var(--social-kakao-bg)',
    color: 'var(--social-kakao-text)',
    border: 'var(--social-kakao-border)'
  },
  {
    id: 'google',
    labelKey: 'setting.login.google',
    iconSrc: '/social/google.svg',
    background: 'var(--social-google-bg)',
    color: 'var(--social-google-text)',
    border: 'var(--social-google-border)'
  }
]

export default function LoginPage() {
  const t = useTranslations()
  const router = useRouter()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    router.push('/users')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg-secondary p-lg">
      <section
        className="w-full rounded border border-border bg-bg-primary p-lg shadow-md"
        style={{ maxWidth: 'var(--modal-width-sm)' }}
      >
        <div className="mb-lg text-center">
          <div className="mb-md inline-flex h-control-lg w-control-lg items-center justify-center rounded bg-primary text-white">
            <LogIn className="h-icon-lg w-icon-lg" />
          </div>
          <h1 className="text-2xl font-bold text-text-primary">
            {t('setting.login.title')}
          </h1>
        </div>

        <form className="grid gap-md" onSubmit={handleSubmit}>
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.login.email')}
            <Input
              type="email"
              required
              placeholder={t('setting.login.emailPlaceholder')}
            />
          </label>

          <Button type="submit" fullWidth>
            <Mail className="h-icon-md w-icon-md" />
            {t('setting.login.emailLogin')}
          </Button>
        </form>

        <div className="my-lg flex items-center gap-md">
          <span className="flex-1 border-t border-border" />
          <span className="text-base font-light text-text-tertiary">
            {t('setting.login.or')}
          </span>
          <span className="flex-1 border-t border-border" />
        </div>

        <div className="grid gap-sm">
          {socialProviders.map((provider) => (
            <Button
              key={provider.id}
              type="button"
              variant="ghost"
              fullWidth
              onClick={() => router.push('/users')}
              style={{
                backgroundColor: provider.background,
                border: `1px solid ${provider.border}`,
                color: provider.color
              }}
            >
              <img
                src={provider.iconSrc}
                alt=""
                className="h-icon-md w-icon-md shrink-0 rounded"
                aria-hidden="true"
              />
              {t(provider.labelKey)}
            </Button>
          ))}
        </div>
      </section>
    </main>
  )
}
