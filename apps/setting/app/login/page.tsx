'use client'

import { FormEvent, useState } from 'react'
import Image from 'next/image'
import { Alert, Button, Input, notifySaveError, notifySaveSuccess } from '@creami/ui'
import { Lock, LogIn, Mail } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { getDisplayApiErrorMessage } from '../../lib/api/errors'
import { login } from '../../lib/api/iam'

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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setErrorMessage(null)

    try {
      const response = await login(email, password)
      window.localStorage.setItem('CREAMI_AUTH_TOKEN', response.accessToken)
      window.localStorage.setItem('CREAMI_AUTH_MEMBER', JSON.stringify(response.member))
      document.cookie = `CREAMI_AUTH_TOKEN=${response.accessToken}; path=/; max-age=28800; SameSite=Lax`
      notifySaveSuccess(t('setting.login.success'))
      router.push('/users')
    } catch (error) {
      const nextErrorMessage = getDisplayApiErrorMessage(error, t('setting.login.failed'))
      setErrorMessage(nextErrorMessage)
      notifySaveError(nextErrorMessage)
    } finally {
      setIsSubmitting(false)
    }
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

        {errorMessage && (
          <Alert className="mb-md" variant="error">
            {errorMessage}
          </Alert>
        )}

        <form className="grid gap-md" onSubmit={handleSubmit}>
          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.login.email')}
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              placeholder={t('setting.login.emailPlaceholder')}
              autoComplete="username"
              disabled={isSubmitting}
            />
          </label>

          <label className="grid gap-sm text-base font-medium text-text-primary">
            {t('setting.login.password')}
            <Input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              placeholder={t('setting.login.passwordPlaceholder')}
              autoComplete="current-password"
              disabled={isSubmitting}
            />
          </label>

          <Button type="submit" fullWidth disabled={isSubmitting}>
            <Mail className="h-icon-md w-icon-md" />
            {isSubmitting ? t('setting.login.loggingIn') : t('setting.login.emailLogin')}
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
              disabled
              style={{
                backgroundColor: provider.background,
                border: `1px solid ${provider.border}`,
                color: provider.color
              }}
            >
              <Image
                src={provider.iconSrc}
                alt=""
                width={16}
                height={16}
                className="h-icon-md w-icon-md shrink-0 rounded"
                aria-hidden="true"
              />
              {t(provider.labelKey)}
            </Button>
          ))}
        </div>

        <p className="mt-lg flex items-center justify-center gap-xs text-base font-light text-text-tertiary">
          <Lock className="h-icon-md w-icon-md" />
          {t('setting.login.localAccountGuide')}
        </p>
      </section>
    </main>
  )
}
