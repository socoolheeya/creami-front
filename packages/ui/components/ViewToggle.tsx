import React from 'react'
import { LayoutGrid, List } from 'lucide-react'

export interface ViewToggleProps {
  view: 'grid' | 'table'
  onViewChange: (view: 'grid' | 'table') => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  const toggleView = () => {
    onViewChange(view === 'grid' ? 'table' : 'grid')
  }

  return (
    <button
      onClick={toggleView}
      className="relative inline-flex h-control-md w-view-toggle shrink-0 cursor-pointer items-center overflow-hidden rounded border border-border bg-bg-tertiary box-border"
      title={view === 'grid' ? '테이블 뷰로 전환' : '카드 뷰로 전환'}
    >
      {/* Sliding Background */}
      <div
        className={`absolute top-0 h-full w-1/2 transition-all duration-200 pointer-events-none bg-primary z-0 ${
          view === 'grid' ? 'left-0' : 'left-1/2'
        }`}
      />

      {/* Grid Icon */}
      <div
        className={`relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${
          view === 'grid' ? 'text-white' : 'text-text-secondary'
        }`}
      >
        <LayoutGrid className="w-md h-md" />
      </div>

      {/* Table Icon */}
      <div
        className={`relative flex-1 flex items-center justify-center transition-colors pointer-events-none z-10 ${
          view === 'table' ? 'text-white' : 'text-text-secondary'
        }`}
      >
        <List className="w-md h-md" />
      </div>
    </button>
  )
}
