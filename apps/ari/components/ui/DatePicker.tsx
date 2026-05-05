'use client'

import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

interface DatePickerProps {
  value: string
  onChange: (date: string) => void
  label?: string
  placeholder?: string
}

export function DatePicker({ value, onChange, label, placeholder = '날짜 선택' }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedDate = value ? new Date(value) : null

  // Close calendar when clicking outside
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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    return new Date(year, month, 1).getDay()
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    onChange(formatDate(newDate))
    setIsOpen(false)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentMonth(today)
    onChange(formatDate(today))
    setIsOpen(false)
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2" />
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateForDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      dateForDay.setHours(0, 0, 0, 0)
      const isSelected = selectedDate &&
        dateForDay.getTime() === selectedDate.getTime()
      const isToday = dateForDay.getTime() === today.getTime()

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className="p-2 rounded-lg text-center transition-colors"
          style={{
            backgroundColor: isSelected ? 'var(--primary)' : isToday ? 'var(--bg-tertiary)' : 'transparent',
            color: isSelected ? '#ffffff' : 'var(--text-primary)',
            fontWeight: isSelected || isToday ? 'var(--font-bold)' : 'var(--font-medium)',
            borderRadius: 'var(--radius-sm)'
          }}
          onMouseEnter={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
            }
          }}
          onMouseLeave={(e) => {
            if (!isSelected) {
              e.currentTarget.style.backgroundColor = isToday ? 'var(--bg-tertiary)' : 'transparent'
            }
          }}
        >
          {day}
        </button>
      )
    }

    return days
  }

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label
          className="block text-xs mb-1"
          style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}
        >
          {label}
        </label>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 rounded-lg flex items-center justify-between"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          color: value ? 'var(--text-primary)' : 'var(--text-tertiary)',
          borderRadius: 'var(--radius-sm)',
          fontWeight: 'var(--font-medium)',
          textAlign: 'left'
        }}
      >
        <span>{value ? formatDisplayDate(value) : placeholder}</span>
        <Calendar className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 mt-2 rounded-lg shadow-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius)',
            boxShadow: 'var(--shadow-md)',
            minWidth: '320px'
          }}
        >
          {/* Calendar Header */}
          <div
            className="flex items-center justify-between p-4"
            style={{
              borderBottom: '1px solid var(--border-color)'
            }}
          >
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div
              className="text-lg"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
            </div>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 p-4 pb-2">
            {['일', '월', '화', '수', '목', '금', '토'].map((day, index) => (
              <div
                key={day}
                className="text-center text-sm p-2"
                style={{
                  color: index === 0 ? '#ef4444' : index === 6 ? '#3b82f6' : 'var(--text-secondary)',
                  fontWeight: 'var(--font-bold)'
                }}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 p-4 pt-0">
            {renderCalendar()}
          </div>

          {/* Footer */}
          <div
            className="p-4 flex justify-end"
            style={{
              borderTop: '1px solid var(--border-color)'
            }}
          >
            <button
              onClick={handleToday}
              className="px-4 py-2 rounded-lg transition-colors"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              오늘
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
