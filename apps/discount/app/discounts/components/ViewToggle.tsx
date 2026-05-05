'use client'

import { LayoutGrid, List } from 'lucide-react'

interface ViewToggleProps {
  view: 'grid' | 'table'
  onViewChange: (view: 'grid' | 'table') => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div
      className="flex rounded-lg overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)'
      }}
    >
      <button
        onClick={() => onViewChange('grid')}
        className="px-4 py-2 transition-colors"
        style={{
          backgroundColor: view === 'grid' ? 'var(--primary)' : 'transparent',
          color: view === 'grid' ? '#ffffff' : 'var(--text-primary)',
          fontWeight: 'var(--font-medium)'
        }}
        title="카드 보기"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('table')}
        className="px-4 py-2 transition-colors"
        style={{
          backgroundColor: view === 'table' ? 'var(--primary)' : 'transparent',
          color: view === 'table' ? '#ffffff' : 'var(--text-primary)',
          fontWeight: 'var(--font-medium)',
          borderLeft: '1px solid var(--border-color)'
        }}
        title="테이블 보기"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  )
}
