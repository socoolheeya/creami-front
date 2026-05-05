'use client'

import { Calendar, Plus, LayoutGrid, List } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { mockBlocks } from '@/lib/data/mock-blocks'
import { BlockCard } from './components/BlockCard'
import { BlockTable } from './components/BlockTable'

type ViewMode = 'grid' | 'table'

export default function BlocksPage() {
  const blocks = mockBlocks
  const [viewMode, setViewMode] = useState<ViewMode>('grid')

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <h1 className="text-3xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            블럭 관리
          </h1>
        </div>

        <Link href="/blocks/new">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <Plus className="w-5 h-5" />
            신규 등록
          </button>
        </Link>
      </div>

      {/* Search and View Toggle */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="블럭 코드 또는 이름으로 검색..."
          className="flex-1 px-4 py-2 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />

        {/* View Toggle Switch */}
        <div
          className="relative flex items-center p-1"
          style={{
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-sm)',
            width: '80px',
            height: '40px'
          }}
        >
          {/* Sliding Background */}
          <div
            className="absolute top-1 transition-all duration-200"
            style={{
              left: viewMode === 'grid' ? '4px' : 'calc(50% - 4px)',
              width: 'calc(50% - 4px)',
              height: 'calc(100% - 8px)',
              backgroundColor: 'var(--primary)',
              borderRadius: 'var(--radius-sm)',
              zIndex: 0
            }}
          />

          {/* Grid Button */}
          <button
            onClick={() => setViewMode('grid')}
            className="relative flex-1 flex items-center justify-center transition-colors"
            style={{
              color: viewMode === 'grid' ? '#ffffff' : 'var(--text-secondary)',
              zIndex: 1
            }}
            title="카드 뷰"
          >
            <LayoutGrid className="w-5 h-5" />
          </button>

          {/* Table Button */}
          <button
            onClick={() => setViewMode('table')}
            className="relative flex-1 flex items-center justify-center transition-colors"
            style={{
              color: viewMode === 'table' ? '#ffffff' : 'var(--text-secondary)',
              zIndex: 1
            }}
            title="테이블 뷰"
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Block List */}
      {blocks.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Calendar className="w-16 h-16 mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            등록된 블럭이 없습니다
          </h3>
          <p className="mb-6" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            첫 번째 블럭을 등록해보세요
          </p>
          <Link href="/blocks/new">
            <button
              className="flex items-center gap-2 px-4 py-2 rounded-lg"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <Plus className="w-5 h-5" />
              블럭 등록하기
            </button>
          </Link>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blocks.map((block) => (
            <BlockCard key={block.id} block={block} />
          ))}
        </div>
      ) : (
        <BlockTable blocks={blocks} />
      )}
    </div>
  )
}