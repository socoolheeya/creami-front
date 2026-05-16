'use client'

import { ChangeEvent, startTransition, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Building2, Camera, LockKeyhole, Mail, Moon, Phone, Save, Sun, UserCog } from 'lucide-react'
import { Button, Input, notifySaveSuccess, writeThemeCookie, type CreamiTheme } from '@creami/ui'
import { getCurrentAuthMember, type AuthMember } from '../../lib/api/iam'

type PasswordMessage = {
  type: 'success' | 'error'
  key: string
} | null

type ProfileState = {
  name: string
  role: string
  department: string
  organization: string
  employeeId: string
  email: string
  phone: string
  updatedAt: string
}

const defaultProfile: ProfileState = {
  name: '-',
  role: '-',
  department: 'IAM',
  organization: 'Creami',
  employeeId: '-',
  email: '',
  phone: '',
  updatedAt: '-'
}

function readStoredAuthMember(): AuthMember | null {
  if (typeof window === 'undefined') {
    return null
  }

  const storedMember = window.localStorage.getItem('CREAMI_AUTH_MEMBER')
  if (!storedMember) {
    return null
  }

  try {
    return JSON.parse(storedMember) as AuthMember
  } catch {
    window.localStorage.removeItem('CREAMI_AUTH_MEMBER')
    return null
  }
}

function toProfileState(member: AuthMember | null, updatedAt: string): ProfileState {
  if (!member) {
    return {
      ...defaultProfile,
      updatedAt
    }
  }

  return {
    name: member.name,
    role: member.status,
    department: 'IAM',
    organization: 'Creami',
    employeeId: member.memberId,
    email: member.email,
    phone: '',
    updatedAt
  }
}

function formatUpdatedAt(date: Date, locale: string) {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(date)
}

function isPasswordPolicyValid(password: string) {
  return password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password)
}

export default function ProfilePage() {
  const t = useTranslations()
  const locale = useLocale()
  const [profile, setProfile] = useState<ProfileState>(defaultProfile)
  const [email, setEmail] = useState(defaultProfile.email)
  const [phone, setPhone] = useState(defaultProfile.phone)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMessage, setPasswordMessage] = useState<PasswordMessage>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [updatedAt, setUpdatedAt] = useState(defaultProfile.updatedAt)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const storedMember = readStoredAuthMember()
    const nextUpdatedAt = formatUpdatedAt(new Date(), locale)

    startTransition(() => {
      setProfile(toProfileState(storedMember, nextUpdatedAt))
      setEmail(storedMember?.email ?? '')
      setUpdatedAt(nextUpdatedAt)
    })

    getCurrentAuthMember()
      .then((member) => {
        window.localStorage.setItem('CREAMI_AUTH_MEMBER', JSON.stringify(member))
        const refreshedUpdatedAt = formatUpdatedAt(new Date(), locale)
        setProfile(toProfileState(member, refreshedUpdatedAt))
        setEmail(member.email)
        setUpdatedAt(refreshedUpdatedAt)
      })
      .catch(() => {
        setProfile(toProfileState(storedMember, nextUpdatedAt))
      })
  }, [locale])

  useEffect(() => {
    return () => {
      if (avatarUrl) {
        URL.revokeObjectURL(avatarUrl)
      }
    }
  }, [avatarUrl])

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const nextAvatarUrl = URL.createObjectURL(file)

    if (avatarUrl) {
      URL.revokeObjectURL(avatarUrl)
    }

    setAvatarUrl(nextAvatarUrl)
    setUpdatedAt(formatUpdatedAt(new Date(), locale))
  }

  const handleSubmit = () => {
    const hasPasswordInput = currentPassword || newPassword || confirmPassword

    if (hasPasswordInput) {
      if (!currentPassword || !newPassword || !confirmPassword) {
        setPasswordMessage({ type: 'error', key: 'setting.profile.passwordRequired' })
        return
      }

      if (!isPasswordPolicyValid(newPassword)) {
        setPasswordMessage({ type: 'error', key: 'setting.profile.passwordPolicy' })
        return
      }

      if (currentPassword === newPassword) {
        setPasswordMessage({ type: 'error', key: 'setting.profile.passwordSameAsCurrent' })
        return
      }

      if (newPassword !== confirmPassword) {
        setPasswordMessage({ type: 'error', key: 'setting.profile.passwordMismatch' })
        return
      }

      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordMessage({ type: 'success', key: 'setting.profile.passwordUpdated' })
    } else {
      setPasswordMessage(null)
    }

    setUpdatedAt(formatUpdatedAt(new Date(), locale))
    notifySaveSuccess('수정이 완료되었습니다.')
  }

  const handleThemeChange = (nextTheme: CreamiTheme) => {
    writeThemeCookie(nextTheme)
  }

  return (
    <div>
      <div className="mb-lg flex flex-wrap items-start justify-between gap-md">
        <div>
          <div className="mb-sm flex items-center gap-md">
            <UserCog className="h-icon-lg w-icon-lg text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">
              {t('setting.profile.title')}
            </h1>
          </div>
          <p className="text-base font-light text-text-secondary">
            {t('setting.profile.description')}
          </p>
        </div>
      </div>

      <div className="grid gap-lg xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg flex items-start gap-lg">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-profile-avatar w-profile-avatar shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-bg-tertiary text-text-tertiary"
              aria-label={t('setting.profile.avatarAction')}
              title={t('setting.profile.avatarAction')}
            >
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={t('setting.profile.avatarAlt')}
                  fill
                  sizes="var(--profile-avatar-size)"
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserCog className="h-3xl w-3xl" />
              )}
              <span className="absolute bottom-sm right-sm flex h-control-md w-control-md items-center justify-center rounded bg-primary text-white">
                <Camera className="h-icon-md w-icon-md" />
              </span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            <div className="min-w-0">
              <p className="text-xl font-bold text-text-primary">
                {profile.name}
              </p>
              <p className="mt-xs text-base font-light text-text-secondary">
                {profile.role}
              </p>
              <p className="mt-md text-base font-light text-text-tertiary">
                {t('setting.profile.avatarHelp')}
              </p>
            </div>
          </div>

          <div className="rounded border border-border bg-bg-secondary p-md">
            <div className="flex items-center gap-sm text-base font-bold text-text-primary">
              <Building2 className="h-icon-md w-icon-md text-primary" />
              {t('setting.profile.organizationInfo')}
            </div>
            <dl className="mt-md grid gap-sm text-base">
              <div className="flex gap-md">
                <dt className="w-profile-label shrink-0 font-light text-text-tertiary">
                  {t('setting.profile.organization')}
                </dt>
                <dd className="font-medium text-text-primary">{profile.organization}</dd>
              </div>
              <div className="flex gap-md">
                <dt className="w-profile-label shrink-0 font-light text-text-tertiary">
                  {t('setting.profile.department')}
                </dt>
                <dd className="font-medium text-text-primary">{profile.department}</dd>
              </div>
              <div className="flex gap-md">
                <dt className="w-profile-label shrink-0 font-light text-text-tertiary">
                  {t('setting.profile.userId')}
                </dt>
                <dd className="font-medium text-text-primary">{profile.employeeId}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-lg rounded border border-border bg-bg-secondary p-md">
            <p className="mb-sm text-base font-bold text-text-primary">
              {t('setting.profile.displayMode')}
            </p>
            <div className="flex flex-wrap gap-sm">
              <button
                type="button"
                className="profile-theme-option profile-theme-option-dark"
                onClick={() => handleThemeChange('dark')}
              >
                <Moon className="h-icon-md w-icon-md" />
                {t('setting.profile.darkMode')}
              </button>
              <button
                type="button"
                className="profile-theme-option profile-theme-option-light"
                onClick={() => handleThemeChange('light')}
              >
                <Sun className="h-icon-md w-icon-md" />
                {t('setting.profile.lightMode')}
              </button>
            </div>
          </div>
        </section>

        <section className="rounded border border-border bg-bg-primary p-lg shadow">
          <div className="mb-lg">
            <h2 className="text-xl font-bold text-text-primary">
              {t('setting.profile.accountInfo')}
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              {t('setting.profile.accountDescription')}
            </p>
          </div>

          <form
            className="grid gap-lg"
            onSubmit={(event) => {
              event.preventDefault()
              handleSubmit()
            }}
          >
            <label className="grid gap-sm text-base font-medium text-text-primary">
              <span className="flex items-center gap-sm">
                <Mail className="h-icon-md w-icon-md text-text-tertiary" />
                {t('setting.profile.email')}
              </span>
              <Input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="grid gap-sm text-base font-medium text-text-primary">
              <span className="flex items-center gap-sm">
                <Phone className="h-icon-md w-icon-md text-text-tertiary" />
                {t('setting.profile.phone')}
              </span>
              <Input
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </label>

            <div className="rounded border border-border bg-bg-secondary p-md">
              <div className="mb-md flex items-center gap-sm text-base font-bold text-text-primary">
                <LockKeyhole className="h-icon-md w-icon-md text-primary" />
                {t('setting.profile.password')}
              </div>
              <div className="grid gap-md">
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.profile.currentPassword')}
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(event) => {
                      setCurrentPassword(event.target.value)
                      setPasswordMessage(null)
                    }}
                    autoComplete="current-password"
                  />
                </label>
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.profile.newPassword')}
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(event) => {
                      setNewPassword(event.target.value)
                      setPasswordMessage(null)
                    }}
                    autoComplete="new-password"
                  />
                </label>
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  {t('setting.profile.confirmPassword')}
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(event) => {
                      setConfirmPassword(event.target.value)
                      setPasswordMessage(null)
                    }}
                    autoComplete="new-password"
                  />
                </label>
                {passwordMessage && (
                  <p
                    className={`text-base font-light ${
                      passwordMessage.type === 'success' ? 'text-primary' : 'text-error'
                    }`}
                  >
                    {t(passwordMessage.key)}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-md border-t border-border pt-md">
              <p className="text-base font-light text-text-tertiary">
                {t('setting.profile.lastUpdated', { date: updatedAt })}
              </p>
              <Button type="submit">
                <Save className="h-icon-md w-icon-md" />
                {t('common.save')}
              </Button>
            </div>
          </form>
        </section>
      </div>
      <style jsx>{`
        .profile-theme-option {
          display: inline-flex;
          height: var(--control-height-md);
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          border: none;
          border-radius: var(--radius);
          padding: 0 var(--control-padding-x-md);
          font-size: var(--font-size-base);
          font-weight: var(--font-medium);
          line-height: 1;
          cursor: pointer;
          transition: background-color 0.2s, color 0.2s;
        }

        :global(html[data-theme='dark']) .profile-theme-option-dark,
        :global(html[data-theme='light']) .profile-theme-option-light {
          background: var(--primary);
          color: white;
        }

        :global(html[data-theme='dark']) .profile-theme-option-light,
        :global(html[data-theme='light']) .profile-theme-option-dark {
          background: var(--bg-secondary);
          color: var(--text-primary);
        }

        .profile-theme-option:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  )
}
