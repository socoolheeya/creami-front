import React from 'react'
import { LayoutGrid, List } from 'lucide-react'

export interface ViewToggleProps {
  view: 'grid' | 'table'
  onViewChange: (view: 'grid' | 'table') => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div
      className="relative flex items-center p-1"
      style={{
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius)',
        width: '80px',
        height: '40px'
      }}
    >
      {/* Sliding Background */}
      <div
        className="absolute top-1 transition-all duration-200"
        style={{
          left: view === 'grid' ? '4px' : 'calc(50% - 4px)',
          width: 'calc(50% - 4px)',
          height: 'calc(100% - 8px)',
          backgroundColor: 'var(--primary)',
          borderRadius: 'var(--radius)',
          zIndex: 0
        }}
      />

      {/* Grid Button */}
      <button
        onClick={() => onViewChange('grid')}
        className="relative flex-1 flex items-center justify-center transition-colors"
        style={{
          color: view === 'grid' ? '#ffffff' : 'var(--text-secondary)',
          zIndex: 1
        }}
        title="카드 뷰"
      >
        <LayoutGrid className="w-5 h-5" />
      </button>

      {/* Table Button */}
      <button
        onClick={() => onViewChange('table')}
        className="relative flex-1 flex items-center justify-center transition-colors"
        style={{
          color: view === 'table' ? '#ffffff' : 'var(--text-secondary)',
          zIndex: 1
        }}
        title="테이블 뷰"
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  )
}
