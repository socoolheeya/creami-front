'use client'

import { Home, BarChart3, Tag, LayoutDashboard, Calendar, ChevronDown } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { APPS, CURRENT_APP } from '@/lib/constants'

const iconMap = {
  Home,
  LayoutDashboard,
  BarChart3,
  Tag,
  Calendar
}

export function AppSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const CurrentIcon = iconMap[CURRENT_APP.icon as keyof typeof iconMap]

  const handleAppClick = (url: string) => {
    window.location.href = url
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
        style={{
          backgroundColor: isOpen ? 'var(--bg-tertiary)' : 'transparent',
          color: 'var(--text-primary)'
        }}
      >
        <CurrentIcon
          className="w-5 h-5"
          style={{
            color: 'var(--primary)'
          }}
        />
        <span className="font-medium">{CURRENT_APP.name}</span>
        <ChevronDown
          className="w-4 h-4 transition-transform"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)'
          }}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 w-80 rounded-lg overflow-hidden shadow-lg z-50"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-md)',
            animation: 'slideDown 0.2s ease-out'
          }}
        >
          <div className="p-2">
            <div
              className="px-3 py-2 text-xs uppercase"
              style={{
                color: 'var(--text-tertiary)',
                fontWeight: 'var(--font-bold)',
                letterSpacing: '0.5px'
              }}
            >
              앱 전환
            </div>

            {APPS.map((app) => {
              const Icon = iconMap[app.icon as keyof typeof iconMap]
              const isCurrent = app.id === CURRENT_APP.id

              return (
                <button
                  key={app.id}
                  onClick={() => handleAppClick(app.url)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-left"
                  style={{
                    backgroundColor: isCurrent ? 'var(--primary)' : 'transparent',
                    color: isCurrent ? '#ffffff' : 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  onMouseEnter={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isCurrent) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <div
                    className="p-2 rounded"
                    style={{
                      backgroundColor: isCurrent ? 'rgba(255, 255, 255, 0.2)' : 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div style={{ fontWeight: 'var(--font-medium)' }}>
                      {app.name}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{
                        color: isCurrent ? 'rgba(255, 255, 255, 0.7)' : 'var(--text-secondary)',
                        fontWeight: 'var(--font-light)'
                      }}
                    >
                      {app.url.replace('http://', '')}
                    </div>
                  </div>
                  {isCurrent && (
                    <div
                      className="px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        fontWeight: 'var(--font-medium)'
                      }}
                    >
                      현재
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}