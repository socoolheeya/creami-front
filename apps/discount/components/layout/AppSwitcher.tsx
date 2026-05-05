'use client'

import { Grid3x3, Home, BarChart3, Tag, X } from 'lucide-react'
import { useState } from 'react'
import { APPS, CURRENT_APP } from '@/lib/constants'

const iconMap = {
  Home,
  BarChart3,
  Tag
}

export function AppSwitcher() {
  const [isOpen, setIsOpen] = useState(false)

  const handleAppClick = (url: string) => {
    window.location.href = url
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-primary)'
        }}
      >
        <Grid3x3 className="w-5 h-5" />
        <span className="font-medium">{CURRENT_APP.name}</span>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative p-6 rounded-lg max-w-md w-full mx-4"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl mb-6" style={{ fontWeight: 'var(--font-bold)' }}>
              앱 전환
            </h2>

            <div className="grid gap-3">
              {APPS.map((app) => {
                const Icon = iconMap[app.icon as keyof typeof iconMap]
                const isCurrent = app.id === CURRENT_APP.id

                return (
                  <button
                    key={app.id}
                    onClick={() => handleAppClick(app.url)}
                    className="flex items-center gap-4 p-4 rounded-lg transition-all text-left"
                    style={{
                      backgroundColor: isCurrent ? 'var(--primary)' : 'var(--bg-secondary)',
                      color: isCurrent ? '#ffffff' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      cursor: isCurrent ? 'default' : 'pointer',
                      opacity: isCurrent ? 0.9 : 1
                    }}
                    disabled={isCurrent}
                  >
                    <div
                      className="p-2 rounded-lg"
                      style={{
                        backgroundColor: isCurrent ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-tertiary)'
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-medium">{app.name}</div>
                      <div
                        className="text-sm"
                        style={{
                          color: isCurrent ? 'rgba(255, 255, 255, 0.8)' : 'var(--text-secondary)',
                          fontWeight: 'var(--font-light)'
                        }}
                      >
                        {app.url}
                      </div>
                    </div>
                    {isCurrent && (
                      <div className="ml-auto">
                        <span
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            fontWeight: 'var(--font-medium)'
                          }}
                        >
                          현재 앱
                        </span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}