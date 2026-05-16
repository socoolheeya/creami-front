'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Block } from '@/lib/types/block'

interface InventoryCalendarProps {
  blocks: Block[]
  startDate: string
  endDate: string
  propertyName: string
}

interface DayInventory {
  date: Date
  totalRooms: number
  availableRooms: number
  bookedRooms: number
  blocks: Block[]
}

export function InventoryCalendar({ blocks, startDate, endDate, propertyName }: InventoryCalendarProps) {
  const t = useTranslations()
  const [currentMonth, setCurrentMonth] = useState(new Date(startDate))

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

  const getInventoryForDate = (date: Date): DayInventory => {
    // Filter blocks that cover this date
    const relevantBlocks = blocks.filter(block => {
      const blockStart = new Date(block.startDate)
      const blockEnd = new Date(block.endDate)
      return date >= blockStart && date <= blockEnd
    })

    const totalRooms = relevantBlocks.reduce((sum, block) => sum + block.totalRooms, 0)
    const bookedRooms = relevantBlocks.reduce((sum, block) => sum + block.bookedRooms, 0)
    const availableRooms = totalRooms - bookedRooms

    return {
      date,
      totalRooms,
      availableRooms,
      bookedRooms,
      blocks: relevantBlocks
    }
  }

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return '#ef4444' // Red
    if (percentage >= 70) return '#f59e0b' // Orange
    if (percentage >= 50) return '#eab308' // Yellow
    if (percentage >= 30) return '#22c55e' // Green
    return '#10b981' // Light green
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const firstDay = getFirstDayOfMonth(currentMonth)
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const rangeStart = new Date(startDate)
    const rangeEnd = new Date(endDate)

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="p-2" style={{ minHeight: '100px' }} />
      )
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateForDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      dateForDay.setHours(0, 0, 0, 0)

      const isInRange = dateForDay >= rangeStart && dateForDay <= rangeEnd
      const isToday = dateForDay.getTime() === today.getTime()
      const inventory = isInRange ? getInventoryForDate(dateForDay) : null
      const utilizationPercentage = inventory && inventory.totalRooms > 0
        ? Math.round((inventory.bookedRooms / inventory.totalRooms) * 100)
        : 0

      days.push(
        <div
          key={day}
          className="p-2 rounded-lg"
          style={{
            minHeight: '100px',
            backgroundColor: isInRange ? 'var(--bg-primary)' : 'var(--bg-secondary)',
            border: isToday ? '2px solid var(--primary)' : '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            opacity: isInRange ? 1 : 0.5
          }}
        >
          <div
            className="text-sm mb-2"
            style={{
              fontWeight: isToday ? 'var(--font-bold)' : 'var(--font-medium)',
              color: isToday ? 'var(--primary)' : 'var(--text-primary)'
            }}
          >
            {day}
          </div>

          {inventory && inventory.totalRooms > 0 && (
            <div className="space-y-1">
              {/* Utilization Bar */}
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{
                  backgroundColor: 'var(--bg-tertiary)'
                }}
              >
                <div
                  className="h-full transition-all"
                  style={{
                    width: `${utilizationPercentage}%`,
                    backgroundColor: getUtilizationColor(utilizationPercentage)
                  }}
                />
              </div>

              {/* Stats */}
              <div
                className="text-xs"
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-light)'
                }}
              >
                <div>{t('ari.inventories.calendar.total', { count: inventory.totalRooms })}</div>
                <div>{t('ari.inventories.calendar.booked', { count: inventory.bookedRooms })}</div>
                <div
                  style={{
                    color: getUtilizationColor(utilizationPercentage),
                    fontWeight: 'var(--font-bold)'
                  }}
                >
                  {t('ari.inventories.calendar.available', { count: inventory.availableRooms })}
                </div>
              </div>

              {/* Blocks count */}
              {inventory.blocks.length > 0 && (
                <div
                  className="text-xs mt-1 px-1 py-0.5 rounded"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-tertiary)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {t('ari.inventories.calendar.blocks', { count: inventory.blocks.length })}
                </div>
              )}
            </div>
          )}
        </div>
      )
    }

    return days
  }

  return (
    <div
      className="rounded-lg p-6"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border-color)'
      }}
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
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
          className="text-2xl"
          style={{
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)'
          }}
        >
          {t('ari.inventories.calendar.monthTitle', {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1
          })}
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

      {/* Property Info */}
      <div
        className="mb-4 text-sm"
        style={{
          color: 'var(--text-secondary)',
          fontWeight: 'var(--font-light)'
        }}
      >
        {propertyName} • {startDate} ~ {endDate}
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3">
        {[
          { label: t('ari.inventories.calendar.legend.low'), color: '#10b981' },
          { label: t('ari.inventories.calendar.legend.normal'), color: '#22c55e' },
          { label: t('ari.inventories.calendar.legend.warning'), color: '#eab308' },
          { label: t('ari.inventories.calendar.legend.busy'), color: '#f59e0b' },
          { label: t('ari.inventories.calendar.legend.full'), color: '#ef4444' }
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: color }}
            />
            <span
              className="text-xs"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {[
          t('ari.common.weekdays.sun'),
          t('ari.common.weekdays.mon'),
          t('ari.common.weekdays.tue'),
          t('ari.common.weekdays.wed'),
          t('ari.common.weekdays.thu'),
          t('ari.common.weekdays.fri'),
          t('ari.common.weekdays.sat')
        ].map((day, index) => (
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
      <div className="grid grid-cols-7 gap-2">
        {renderCalendar()}
      </div>
    </div>
  )
}
