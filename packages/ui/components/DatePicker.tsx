'use client'

import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from './Button'

export interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  label?: string
  placeholder?: string
  align?: 'left' | 'right'
  size?: 'large' | 'medium' | 'small' | 'mini'
  clearable?: boolean
}

function parseDateValue(value: string) {
  const [year, month, day] = value.split('-').map(Number)

  if (!year || !month || !day) {
    return null
  }

  return new Date(year, month - 1, day)
}

function formatDateValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function DatePicker({
  value,
  onChange,
  label,
  placeholder = '날짜 선택',
  align = 'left',
  size = 'medium',
  clearable = false
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [pickerView, setPickerView] = useState<'date' | 'month' | 'year'>('date')
  const [yearRangeStart, setYearRangeStart] = useState(() => {
    const year = new Date().getFullYear()
    return year - (year % 12)
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const selectedDate = value ? parseDateValue(value) : null

  useEffect(() => {
    if (isOpen) {
      const baseDate = selectedDate ?? new Date()
      setCurrentMonth(baseDate)
      setPickerView('date')
      setYearRangeStart(baseDate.getFullYear() - (baseDate.getFullYear() % 12))
    }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

  const formatDisplayDate = (dateStr: string) => {
    const date = parseDateValue(dateStr)
    if (!date) return dateStr

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onChange(formatDateValue(newDate))
    setIsOpen(false)
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    onChange(formatDateValue(today))
    setIsOpen(false)
  }

  const handleMonthSelect = (month: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), month, 1))
    setPickerView('date')
  }

  const handleYearSelect = (year: number) => {
    setCurrentMonth(new Date(year, currentMonth.getMonth(), 1))
    setPickerView('month')
  }

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selectedYear = selectedDate?.getFullYear()
  const selectedMonth = selectedDate?.getMonth()
  const sizeStyles = {
    large: 'h-control-lg px-control-px-lg',
    medium: 'h-control-md px-control-px-md',
    small: 'h-control-sm px-control-px-sm',
    mini: 'h-control-mini px-control-px-mini'
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label className="mb-xs block text-base font-light text-text-tertiary">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={`flex w-full items-center justify-between rounded border border-border bg-bg-secondary text-base font-medium leading-none text-text-primary ${sizeStyles[size]} ${clearable && value ? 'pr-control-search' : ''}`}
        >
          <span className={value ? 'text-text-primary' : 'text-text-tertiary'}>
            {value ? formatDisplayDate(value) : placeholder}
          </span>
          <Calendar className="h-md w-md text-text-tertiary" />
        </button>

        {clearable && value && (
          <button
            type="button"
            aria-label="날짜 초기화"
            className="absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
            onClick={(event) => {
              event.stopPropagation()
              onChange('')
              setIsOpen(false)
            }}
          >
            <X className="h-md w-md" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className={`absolute z-50 mt-sm w-datepicker overflow-hidden rounded border border-border bg-bg-primary shadow-md ${align === 'right' ? 'right-none' : 'left-none'}`}>
          <div className="flex items-center justify-between border-b border-border p-md">
            <Button
              type="button"
              onClick={() => {
                if (pickerView === 'year') {
                  setYearRangeStart(yearRangeStart - 12)
                  return
                }

                if (pickerView === 'month') {
                  setCurrentMonth(new Date(currentMonth.getFullYear() - 1, currentMonth.getMonth(), 1))
                  return
                }

                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
              }}
              variant="secondary"
              size="medium"
              iconOnly
              aria-label="이전"
            >
              <ChevronLeft className="h-md w-md" />
            </Button>

            {pickerView === 'date' && (
              <button
                type="button"
                onClick={() => setPickerView('month')}
                className="h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary"
              >
                {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
              </button>
            )}

            {pickerView === 'month' && (
              <button
                type="button"
                onClick={() => {
                  setYearRangeStart(currentMonth.getFullYear() - (currentMonth.getFullYear() % 12))
                  setPickerView('year')
                }}
                className="h-control-md rounded border-none bg-transparent px-control-px-md py-none text-lg font-bold leading-none text-text-primary transition-colors hover:bg-bg-secondary"
              >
                {currentMonth.getFullYear()}년
              </button>
            )}

            {pickerView === 'year' && (
              <div className="flex h-control-md items-center text-lg font-bold text-text-primary">
                {yearRangeStart}년 - {yearRangeStart + 11}년
              </div>
            )}

            <Button
              type="button"
              onClick={() => {
                if (pickerView === 'year') {
                  setYearRangeStart(yearRangeStart + 12)
                  return
                }

                if (pickerView === 'month') {
                  setCurrentMonth(new Date(currentMonth.getFullYear() + 1, currentMonth.getMonth(), 1))
                  return
                }

                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
              }}
              variant="secondary"
              size="medium"
              iconOnly
              aria-label="다음"
            >
              <ChevronRight className="h-md w-md" />
            </Button>
          </div>

          {pickerView === 'date' && (
            <>
              <div className="grid grid-cols-7 gap-xs p-md pb-sm">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
                  <div
                    key={day}
                    className={`p-sm text-center text-base font-bold ${
                      index === 0
                        ? 'text-error'
                        : index === 6
                          ? 'text-primary'
                          : 'text-text-secondary'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-xs p-md pt-none">
                {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                  <div key={`empty-${index}`} className="h-control-md" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1
                  const dateForDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                  dateForDay.setHours(0, 0, 0, 0)
                  const isSelected = selectedDate && dateForDay.getTime() === selectedDate.getTime()
                  const isToday = dateForDay.getTime() === today.getTime()

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDateSelect(day)}
                      className={`h-control-md rounded text-center text-base font-medium transition-colors ${
                        isSelected
                          ? 'bg-primary text-white'
                          : isToday
                            ? 'bg-bg-tertiary text-text-primary'
                            : 'bg-transparent text-text-primary hover:bg-bg-secondary'
                      }`}
                    >
                      {day}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {pickerView === 'month' && (
            <div className="grid grid-cols-4 gap-sm p-md">
              {Array.from({ length: 12 }).map((_, index) => {
                const isSelected = selectedYear === currentMonth.getFullYear() && selectedMonth === index

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleMonthSelect(index)}
                    className={`h-control-lg rounded text-base font-medium transition-colors ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-text-primary hover:bg-bg-secondary'
                    }`}
                  >
                    {index + 1}월
                  </button>
                )
              })}
            </div>
          )}

          {pickerView === 'year' && (
            <div className="grid grid-cols-4 gap-sm p-md">
              {Array.from({ length: 12 }).map((_, index) => {
                const year = yearRangeStart + index
                const isSelected = selectedYear === year

                return (
                  <button
                    key={year}
                    type="button"
                    onClick={() => handleYearSelect(year)}
                    className={`h-control-lg rounded text-base font-medium transition-colors ${
                      isSelected
                        ? 'bg-primary text-white'
                        : 'bg-transparent text-text-primary hover:bg-bg-secondary'
                    }`}
                  >
                    {year}
                  </button>
                )
              })}
            </div>
          )}

          <div className="flex justify-end border-t border-border p-md">
            {pickerView === 'date' ? (
              <Button type="button" onClick={handleToday}>
                오늘
              </Button>
            ) : (
              <Button type="button" variant="secondary" onClick={() => setPickerView('date')}>
                달력으로 돌아가기
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
