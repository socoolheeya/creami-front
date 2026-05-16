import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Input } from './Input'

export interface SearchableSelectOption {
  value: string
  label: string
  description?: string
  searchText?: string
}

export interface SearchableSelectProps {
  value: string
  options: SearchableSelectOption[]
  onChange: (value: string) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  disabled?: boolean
  className?: string
}

export function SearchableSelect({
  value,
  options,
  onChange,
  placeholder = '선택하세요',
  searchPlaceholder = '검색어를 입력하세요',
  emptyText = '검색 결과가 없습니다',
  disabled = false,
  className = ''
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    if (!normalizedQuery) {
      return options
    }

    return options.filter((option) => {
      const target = `${option.label} ${option.description ?? ''} ${option.searchText ?? ''}`.toLowerCase()
      return target.includes(normalizedQuery)
    })
  }, [options, query])

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const handleSelect = (nextValue: string) => {
    onChange(nextValue)
    setQuery('')
    setOpen(false)
  }

  return (
    <div ref={rootRef} className={`relative w-full ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) {
            setOpen((current) => !current)
          }
        }}
        className="flex h-control-md w-full items-center justify-between gap-sm rounded border border-border bg-bg-secondary px-control-px-md text-base leading-none text-text-primary font-medium"
      >
        <span className={selectedOption ? 'text-text-primary' : 'text-text-tertiary'}>
          {selectedOption?.label ?? placeholder}
        </span>
        <ChevronDown className="h-md w-md shrink-0 text-text-secondary" />
      </button>

      {open && (
        <div
          className="absolute z-50 mt-xs flex w-full flex-col gap-sm rounded border border-border bg-bg-primary p-sm shadow-lg"
          style={{ maxHeight: 'var(--policy-list-height)' }}
        >
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={searchPlaceholder}
            showSearchIcon
            autoFocus
          />

          <div className="overflow-y-auto" style={{ maxHeight: 'var(--results-list-height)' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className="flex w-full flex-col gap-xs rounded px-sm py-sm text-left transition-colors hover:bg-bg-secondary"
                  style={{
                    backgroundColor: option.value === value ? 'var(--primary-bg)' : undefined
                  }}
                >
                  <span className="text-base font-medium text-text-primary">{option.label}</span>
                  {option.description && (
                    <span className="text-base font-light text-text-tertiary">{option.description}</span>
                  )}
                </button>
              ))
            ) : (
              <div className="rounded py-sm text-center text-base font-light text-text-tertiary">
                {emptyText}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
