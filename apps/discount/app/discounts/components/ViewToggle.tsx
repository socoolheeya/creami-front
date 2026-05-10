'use client'

import { LayoutGrid, List } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface ViewToggleProps {
  view: 'grid' | 'table'
  onViewChange: (view: 'grid' | 'table') => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const t = useTranslations()

  return (
    <div
      className="flex rounded overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)'
      }}
    >
      <button
        onClick={() => onViewChange('grid')}
        className="h-control-md px-control-px-md transition-colors"
        style={{
          backgroundColor: view === 'grid' ? 'var(--primary)' : 'transparent',
          color: view === 'grid' ? 'var(--text-on-primary)' : 'var(--text-primary)',
          fontWeight: 'var(--font-medium)'
        }}
        title={t('discount.common.viewCard')}
      >
        <LayoutGrid className="h-icon-md w-icon-md" />
      </button>
      <button
        onClick={() => onViewChange('table')}
        className="h-control-md px-control-px-md transition-colors"
        style={{
          backgroundColor: view === 'table' ? 'var(--primary)' : 'transparent',
          color: view === 'table' ? 'var(--text-on-primary)' : 'var(--text-primary)',
          fontWeight: 'var(--font-medium)',
          borderLeft: '1px solid var(--border-color)'
        }}
        title={t('discount.common.viewTable')}
      >
        <List className="h-icon-md w-icon-md" />
      </button>
    </div>
  )
}
