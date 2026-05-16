'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Edit2, Copy, Save, X, CalendarRange } from 'lucide-react'
import { DatePicker, notification } from '@creami/ui'
import { useLocale, useTranslations } from 'next-intl'
import type { InventoryRow } from '@/lib/api/ari'

interface RoomInventory {
  roomId: string
  roomName: string
  dates: Record<string, DayInventory>
}

interface DayInventory {
  date: string
  total: number
  available: number
  booked: number
}

interface InventoryGridProps {
  startDate: string
  endDate: string
  selectedRooms: { id: string; name: string }[]
  initialRows: InventoryRow[]
  onSaveInventories: (updates: { rowId: string; date: string; available: number }[]) => Promise<void>
}

interface SelectedCell {
  roomId: string
  date: string
}

type ViewMode = 'week' | 'month' | 'all'

const WEEKDAY_KEYS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'] as const

export function InventoryGrid({ startDate, endDate, selectedRooms, initialRows, onSaveInventories }: InventoryGridProps) {
  const t = useTranslations()
  const locale = useLocale()
  const [viewMode, setViewMode] = useState<ViewMode>('week')
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(startDate))
  const [inventoryData, setInventoryData] = useState<Record<string, RoomInventory>>({})
  const [selectedCells, setSelectedCells] = useState<SelectedCell[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState<SelectedCell | null>(null)
  const [editingCell, setEditingCell] = useState<SelectedCell | null>(null)
  const [editValue, setEditValue] = useState('')
  const [showBulkEdit, setShowBulkEdit] = useState(false)
  const [bulkEditValue, setBulkEditValue] = useState('')

  // Bulk registration state
  const [showBulkRegister, setShowBulkRegister] = useState(false)
  const [bulkRegisterStart, setBulkRegisterStart] = useState('')
  const [bulkRegisterEnd, setBulkRegisterEnd] = useState('')
  const [bulkRegisterWeekdays, setBulkRegisterWeekdays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6])
  const [bulkRegisterValues, setBulkRegisterValues] = useState<Record<number, string>>({})

  // Ref for auto-scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<number | null>(null)

  useEffect(() => {
    const data: Record<string, RoomInventory> = {}

    initialRows.forEach(row => {
      data[row.id] = {
        roomId: row.id,
        roomName: row.name,
        dates: row.dates
      }
    })

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInventoryData(data)
  }, [initialRows])

  const applyInventoryUpdates = async (updates: { rowId: string; date: string; available: number }[]) => {
    if (updates.length === 0) return

    await onSaveInventories(updates)

    setInventoryData(prev => {
      const updated = { ...prev }
      updates.forEach(update => {
        if (updated[update.rowId]?.dates[update.date]) {
          const total = updated[update.rowId].dates[update.date].total
          updated[update.rowId] = {
            ...updated[update.rowId],
            dates: {
              ...updated[update.rowId].dates,
              [update.date]: {
                ...updated[update.rowId].dates[update.date],
                available: update.available,
                booked: total - update.available
              }
            }
          }
        }
      })
      return updated
    })
  }

  // Generate dates based on view mode
  const getDatesForView = () => {
    const dates = []

    if (viewMode === 'week') {
      const start = new Date(currentWeekStart)
      for (let i = 0; i < 7; i++) {
        const date = new Date(start)
        date.setDate(start.getDate() + i)
        dates.push(date)
      }
    } else if (viewMode === 'month') {
      const start = new Date(currentWeekStart)
      start.setDate(1) // First day of month
      const endOfMonth = new Date(start.getFullYear(), start.getMonth() + 1, 0)
      for (let d = new Date(start); d <= endOfMonth; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d))
      }
    } else { // 'all'
      const start = new Date(startDate)
      const end = new Date(endDate)
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        dates.push(new Date(d))
      }
    }

    return dates
  }

  const handlePrevWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() - 7)
    if (newStart >= new Date(startDate)) {
      setCurrentWeekStart(newStart)
    }
  }

  const handleNextWeek = () => {
    const newStart = new Date(currentWeekStart)
    newStart.setDate(newStart.getDate() + 7)
    if (newStart <= new Date(endDate)) {
      setCurrentWeekStart(newStart)
    }
  }

  const handleMouseDown = (roomId: string, date: string) => {
    setIsDragging(true)
    setDragStart({ roomId, date })
    setSelectedCells([{ roomId, date }])
  }

  const handleMouseEnter = (roomId: string, date: string) => {
    if (isDragging && dragStart) {
      // Calculate selected range
      const selected: SelectedCell[] = []
      const rooms = selectedRooms.map(r => r.id)
      const roomStartIndex = rooms.indexOf(dragStart.roomId)
      const roomEndIndex = rooms.indexOf(roomId)
      const minRoomIndex = Math.min(roomStartIndex, roomEndIndex)
      const maxRoomIndex = Math.max(roomStartIndex, roomEndIndex)

      const dates = getDatesForView().map(d => d.toISOString().split('T')[0])
      const dateStartIndex = dates.indexOf(dragStart.date)
      const dateEndIndex = dates.indexOf(date)
      const minDateIndex = Math.min(dateStartIndex, dateEndIndex)
      const maxDateIndex = Math.max(dateStartIndex, dateEndIndex)

      for (let i = minRoomIndex; i <= maxRoomIndex; i++) {
        for (let j = minDateIndex; j <= maxDateIndex; j++) {
          if (rooms[i] && dates[j]) {
            selected.push({ roomId: rooms[i], date: dates[j] })
          }
        }
      }

      setSelectedCells(selected)
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    setDragStart(null)
    // Clear auto-scroll
    if (autoScrollIntervalRef.current) {
      cancelAnimationFrame(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const rect = container.getBoundingClientRect()
    const scrollThreshold = 100 // pixels from edge to trigger scroll
    const scrollSpeed = 10 // pixels per frame

    const mouseX = e.clientX
    const distanceFromLeft = mouseX - rect.left
    const distanceFromRight = rect.right - mouseX

    // Auto-scroll left
    if (distanceFromLeft < scrollThreshold && distanceFromLeft > 0) {
      const scroll = () => {
        if (container.scrollLeft > 0) {
          container.scrollLeft -= scrollSpeed
          autoScrollIntervalRef.current = requestAnimationFrame(scroll)
        }
      }
      if (!autoScrollIntervalRef.current) {
        autoScrollIntervalRef.current = requestAnimationFrame(scroll)
      }
    }
    // Auto-scroll right
    else if (distanceFromRight < scrollThreshold && distanceFromRight > 0) {
      const scroll = () => {
        const maxScroll = container.scrollWidth - container.clientWidth
        if (container.scrollLeft < maxScroll) {
          container.scrollLeft += scrollSpeed
          autoScrollIntervalRef.current = requestAnimationFrame(scroll)
        }
      }
      if (!autoScrollIntervalRef.current) {
        autoScrollIntervalRef.current = requestAnimationFrame(scroll)
      }
    }
    // Stop auto-scroll
    else {
      if (autoScrollIntervalRef.current) {
        cancelAnimationFrame(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
    }
  }

  const handleCellDoubleClick = (roomId: string, date: string) => {
    setEditingCell({ roomId, date })
    const current = inventoryData[roomId]?.dates[date]
    setEditValue(current?.available.toString() || '')
  }

  const handleSaveEdit = async () => {
    if (editingCell) {
      const value = parseInt(editValue)
      if (!isNaN(value)) {
        await applyInventoryUpdates([{ rowId: editingCell.roomId, date: editingCell.date, available: value }])
      }
    }
    setEditingCell(null)
    setEditValue('')
  }

  const handleBulkEdit = async () => {
    const value = parseInt(bulkEditValue)
    if (!isNaN(value) && selectedCells.length > 0) {
      await applyInventoryUpdates(selectedCells.map(cell => ({ rowId: cell.roomId, date: cell.date, available: value })))
      setShowBulkEdit(false)
      setBulkEditValue('')
      setSelectedCells([])
      notification.success({
        message: '저장이 완료되었습니다.',
        placement: 'top-right',
        direction: 'right'
      })
    }
  }

  const handleCopyDown = async () => {
    if (selectedCells.length > 0) {
      const firstCell = selectedCells[0]
      const firstValue = inventoryData[firstCell.roomId]?.dates[firstCell.date]?.available

      if (firstValue !== undefined) {
        await applyInventoryUpdates(selectedCells.map(cell => ({ rowId: cell.roomId, date: cell.date, available: firstValue })))
        setSelectedCells([])
      }
    }
  }

  const isCellSelected = (roomId: string, date: string) => {
    return selectedCells.some(cell => cell.roomId === roomId && cell.date === date)
  }

  const getUtilizationColor = (available: number, total: number) => {
    const percentage = ((total - available) / total) * 100
    if (percentage >= 90) return '#ef4444'
    if (percentage >= 70) return '#f59e0b'
    if (percentage >= 50) return '#eab308'
    if (percentage >= 30) return '#22c55e'
    return '#10b981'
  }

  const hasBulkRegisterValue = () => {
    return bulkRegisterWeekdays.some((day) => {
      const value = bulkRegisterValues[day]
      return value?.trim() !== '' && !isNaN(parseInt(value ?? ''))
    })
  }

  // Bulk registration handlers
  const toggleWeekday = (day: number) => {
    if (bulkRegisterWeekdays.includes(day)) {
      setBulkRegisterWeekdays(bulkRegisterWeekdays.filter(d => d !== day))
    } else {
      setBulkRegisterWeekdays([...bulkRegisterWeekdays, day].sort())
    }
  }

  const selectAllWeekdays = () => {
    setBulkRegisterWeekdays([0, 1, 2, 3, 4, 5, 6])
  }

  const selectWeekdaysOnly = () => {
    setBulkRegisterWeekdays([1, 2, 3, 4, 5])
  }

  const selectWeekendsOnly = () => {
    setBulkRegisterWeekdays([0, 6])
  }

  const handleBulkRegisterValueChange = (day: number, value: string) => {
    setBulkRegisterValues(prev => ({
      ...prev,
      [day]: value
    }))
  }

  const bulkRegisterPreviewRows = useMemo(() => {
    const validCells = Object.entries(bulkRegisterValues)
      .map(([day, value]) => ({
        day: Number(day),
        value: parseInt(value)
      }))
      .filter(({ day, value }) => bulkRegisterWeekdays.includes(day) && WEEKDAY_KEYS[day] && !isNaN(value))
      .sort((a, b) => {
        const order = [1, 2, 3, 4, 5, 6, 0]
        return order.indexOf(a.day) - order.indexOf(b.day)
      })

    if (validCells.length === 0) return []

    return selectedRooms.map(room => ({
      id: room.id,
      name: room.name,
      cells: validCells.map(({ day, value }) => ({
        day,
        label: t(`ari.common.weekdays.${WEEKDAY_KEYS[day]}`),
        available: value,
        total: 10,
        booked: Math.max(10 - value, 0)
      }))
    }))
  }, [bulkRegisterValues, bulkRegisterWeekdays, selectedRooms])

  const handleBulkRegister = async () => {
    if (!bulkRegisterStart || !bulkRegisterEnd || !hasBulkRegisterValue()) return

    const updates: { rowId: string; date: string; available: number }[] = []
    const start = new Date(bulkRegisterStart)
    const end = new Date(bulkRegisterEnd)

    selectedRooms.forEach(room => {
      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0]
        const value = parseInt(bulkRegisterValues[d.getDay()] ?? '')
        if (bulkRegisterWeekdays.includes(d.getDay()) && !isNaN(value) && inventoryData[room.id]?.dates[dateStr]) {
          updates.push({ rowId: room.id, date: dateStr, available: value })
        }
      }
    })

    await applyInventoryUpdates(updates)

    setShowBulkRegister(false)
    setBulkRegisterStart('')
    setBulkRegisterEnd('')
    setBulkRegisterWeekdays([0, 1, 2, 3, 4, 5, 6])
    setBulkRegisterValues({})
    notification.success({
      message: '저장이 완료되었습니다.',
      placement: 'top-right',
      direction: 'right'
    })
  }

  const viewDates = getDatesForView()

  // Handle global mouse up
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp()
      }
    }

    document.addEventListener('mouseup', handleGlobalMouseUp)
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp)
    }
  }, [isDragging])

  // Handle mouse move for auto-scroll
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        if (autoScrollIntervalRef.current) {
          cancelAnimationFrame(autoScrollIntervalRef.current)
          autoScrollIntervalRef.current = null
        }
      }
    }
  }, [isDragging])

  return (
    <div
      className="rounded"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border-color)'
      }}
    >
      {/* Toolbar */}
      <div
        className="p-md space-y-md"
        style={{
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {/* Top Row: View Mode + Bulk Register */}
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-xs rounded p-xs"
            style={{ backgroundColor: 'var(--bg-secondary)' }}
          >
            {/* View Mode Selector */}
            <button
              onClick={() => setViewMode('week')}
              className="flex h-control-md items-center justify-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors"
              style={{
                backgroundColor: viewMode === 'week' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'week' ? '#ffffff' : 'var(--text-primary)',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {t('ari.common.view.week')}
            </button>
            <button
              onClick={() => setViewMode('month')}
              className="flex h-control-md items-center justify-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors"
              style={{
                backgroundColor: viewMode === 'month' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'month' ? '#ffffff' : 'var(--text-primary)',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {t('ari.common.view.month')}
            </button>
            <button
              onClick={() => setViewMode('all')}
              className="flex h-control-md items-center justify-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors"
              style={{
                backgroundColor: viewMode === 'all' ? 'var(--primary)' : 'transparent',
                color: viewMode === 'all' ? '#ffffff' : 'var(--text-primary)',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {t('ari.common.view.all')}
            </button>
          </div>

          {/* Bulk Register Button */}
          <button
            onClick={() => setShowBulkRegister(true)}
            className="flex items-center gap-sm px-control-px-lg py-sm rounded text-base leading-none transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius)',
              fontWeight: 'var(--font-bold)'
            }}
          >
            <CalendarRange className="w-icon-md h-icon-md" />
            {t('ari.common.bulkRegister')}
          </button>
        </div>

        {/* Bottom Row: Navigation + Selection Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            {viewMode !== 'all' && (
              <>
                <button
                  onClick={handlePrevWeek}
                  className="p-sm rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <ChevronLeft className="w-icon-md h-icon-md" />
                </button>

                <div
                  className="text-lg"
                  style={{
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {viewMode === 'week' ? (
                    <>
                      {currentWeekStart.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                      {' - '}
                      {new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString(locale, { month: 'long', day: 'numeric' })}
                    </>
                  ) : (
                    <>
                      {currentWeekStart.toLocaleDateString(locale, { year: 'numeric', month: 'long' })}
                    </>
                  )}
                </div>

                <button
                  onClick={handleNextWeek}
                  className="p-sm rounded transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius)'
                  }}
                >
                  <ChevronRight className="w-icon-md h-icon-md" />
                </button>
              </>
            )}
            {viewMode === 'all' && (
              <div
                className="text-lg"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)'
                }}
              >
                {t('ari.common.fullPeriod', { startDate, endDate })}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {selectedCells.length > 0 && (
            <div className="flex items-center gap-sm">
            <span
              className="text-base px-control-px-md py-xs rounded leading-none"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {t('ari.common.selectedCount', { count: selectedCells.length })}
            </span>

            <button
              onClick={() => setShowBulkEdit(true)}
              className="flex items-center gap-sm px-control-px-lg py-sm rounded text-base leading-none transition-colors"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <Edit2 className="w-md h-md" />
              {t('ari.common.bulkEdit')}
            </button>

            <button
              onClick={handleCopyDown}
              className="flex items-center gap-sm px-control-px-lg py-sm rounded text-base leading-none transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)',
                border: '1px solid var(--border-color)'
              }}
            >
              <Copy className="w-md h-md" />
              {t('ari.common.copy')}
            </button>

            <button
              onClick={() => setSelectedCells([])}
              className="p-sm rounded transition-colors"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius)'
              }}
            >
              <X className="w-md h-md" />
            </button>
          </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div ref={scrollContainerRef} className="overflow-x-auto">
        <table className="w-full" style={{ userSelect: 'none' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
              <th
                className="px-md py-sm text-left sticky left-0 z-10"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRight: '1px solid var(--border-color)',
                  borderBottom: '1px solid var(--border-color)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  minWidth: 'var(--rate-row-header-width)'
                }}
              >
                {t('ari.inventories.grid.roomType')}
              </th>
              {viewDates.map((date) => {
                const dayOfWeek = date.getDay()
                const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

                return (
                  <th
                    key={date.toISOString()}
                    className="px-md py-sm text-center"
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      fontWeight: 'var(--font-bold)',
                      color: dayOfWeek === 0 ? 'var(--error)' : dayOfWeek === 6 ? 'var(--primary)' : 'var(--text-primary)',
                      minWidth: 'var(--rate-date-column-width)',
                      backgroundColor: isWeekend ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'
                    }}
                  >
                    <div>{t('ari.common.dateDay', { day: date.getDate() })}</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-light)' }}>
                      {t(`ari.common.weekdays.${WEEKDAY_KEYS[dayOfWeek]}`)}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {selectedRooms.map((room) => (
              <tr key={room.id}>
                <td
                  className="px-md py-sm sticky left-0 z-10"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    borderRight: '1px solid var(--border-color)',
                    borderBottom: '1px solid var(--border-color)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {room.name}
                </td>
                {viewDates.map((date) => {
                  const dateStr = date.toISOString().split('T')[0]
                  const dayData = inventoryData[room.id]?.dates[dateStr]
                  const isSelected = isCellSelected(room.id, dateStr)
                  const isEditing = editingCell?.roomId === room.id && editingCell?.date === dateStr
                  const dayOfWeek = date.getDay()
                  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

                  if (!dayData) return null

                  return (
                    <td
                      key={dateStr}
                      onMouseDown={() => handleMouseDown(room.id, dateStr)}
                      onMouseEnter={() => handleMouseEnter(room.id, dateStr)}
                      onDoubleClick={() => handleCellDoubleClick(room.id, dateStr)}
                      className="px-sm py-sm cursor-pointer transition-all"
                      style={{
                        borderBottom: '1px solid var(--border-color)',
                        backgroundColor: isSelected
                          ? 'var(--primary)'
                          : isWeekend
                          ? 'var(--bg-tertiary)'
                          : 'var(--bg-primary)',
                        opacity: isSelected ? 0.3 : 1
                      }}
                    >
                      {isEditing ? (
                        <input
                          type="number"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={handleSaveEdit}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveEdit()
                            if (e.key === 'Escape') setEditingCell(null)
                          }}
                          autoFocus
                          className="w-full px-sm py-xs text-center rounded"
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '2px solid var(--primary)',
                            color: 'var(--text-primary)',
                            fontWeight: 'var(--font-bold)'
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          {/* Utilization Bar */}
                          <div
                            className="h-xs rounded mb-xs"
                            style={{
                              backgroundColor: 'var(--bg-tertiary)'
                            }}
                          >
                            <div
                              className="h-full rounded"
                              style={{
                                width: `${((dayData.total - dayData.available) / dayData.total) * 100}%`,
                                backgroundColor: getUtilizationColor(dayData.available, dayData.total)
                              }}
                            />
                          </div>

                          {/* Available Count */}
                          <div
                            className="text-lg"
                            style={{
                              fontWeight: 'var(--font-bold)',
                              color: isSelected ? '#ffffff' : 'var(--text-primary)'
                            }}
                          >
                            {dayData.available}
                          </div>

                          {/* Total Count */}
                          <div
                            className="text-base"
                            style={{
                              color: isSelected ? '#ffffff' : 'var(--text-tertiary)',
                              fontWeight: 'var(--font-light)'
                            }}
                          >
                            / {dayData.total}
                          </div>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Edit Modal */}
      {showBulkEdit && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => setShowBulkEdit(false)}
        >
          <div
            className="rounded p-lg w-modal-sm"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-xl mb-md"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              {t('ari.common.bulkEdit')}
            </h3>

            <p
              className="text-base mb-md"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              {t('ari.inventories.grid.bulkEditDescription', { count: selectedCells.length })}
            </p>

            <label
              className="block text-base mb-sm"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {t('ari.inventories.grid.availableRooms')}
            </label>
            <input
              type="number"
              value={bulkEditValue}
              onChange={(e) => setBulkEditValue(e.target.value)}
              placeholder={t('ari.rates.grid.numberPlaceholder')}
              className="w-full h-control-md px-control-px-lg py-none rounded mb-md text-base leading-none"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            />

            <div className="flex justify-end gap-md">
              <button
                onClick={handleBulkEdit}
                className="flex h-control-md w-modal-action items-center justify-center gap-sm rounded border-none px-control-px-md py-none text-base leading-none"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                <Save className="w-icon-md h-icon-md" />
                {t('ari.common.save')}
              </button>
              <button
                onClick={() => {
                  setShowBulkEdit(false)
                  setBulkEditValue('')
                }}
                className="flex h-control-md w-modal-action items-center justify-center rounded px-control-px-md py-none text-base leading-none"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius)',
                  fontWeight: 'var(--font-medium)',
                  border: '1px solid var(--border-color)'
                }}
              >
                {t('ari.common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Register Modal */}
      {showBulkRegister && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          onClick={() => setShowBulkRegister(false)}
        >
          <div
            className="rounded p-lg w-modal-md overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)',
              maxHeight: 'var(--modal-max-height)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-lg flex items-center justify-between gap-md">
              <h3
                className="m-none text-2xl"
                style={{
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)'
                }}
              >
                {t('ari.inventories.grid.inventoryBulkRegister')}
              </h3>
              <div className="flex shrink-0 gap-md">
                <button
                  onClick={handleBulkRegister}
                  disabled={!bulkRegisterStart || !bulkRegisterEnd || !hasBulkRegisterValue() || bulkRegisterWeekdays.length === 0}
                  className="flex h-control-md w-modal-action items-center justify-center gap-sm rounded border-none px-control-px-md py-none text-base leading-none"
                  style={{
                    backgroundColor: (bulkRegisterStart && bulkRegisterEnd && hasBulkRegisterValue() && bulkRegisterWeekdays.length > 0) ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: (bulkRegisterStart && bulkRegisterEnd && hasBulkRegisterValue() && bulkRegisterWeekdays.length > 0) ? '#ffffff' : 'var(--text-tertiary)',
                    borderRadius: 'var(--radius)',
                    fontWeight: 'var(--font-bold)',
                    cursor: (bulkRegisterStart && bulkRegisterEnd && hasBulkRegisterValue() && bulkRegisterWeekdays.length > 0) ? 'pointer' : 'not-allowed'
                  }}
                >
                  <Save className="w-icon-md h-icon-md" />
                  {t('ari.inventories.grid.register')}
                </button>
                <button
                  onClick={() => {
                    setShowBulkRegister(false)
                    setBulkRegisterStart('')
                    setBulkRegisterEnd('')
                    setBulkRegisterWeekdays([0, 1, 2, 3, 4, 5, 6])
                    setBulkRegisterValues({})
                  }}
                  className="flex h-control-md w-modal-action items-center justify-center rounded px-control-px-md py-none text-base leading-none"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {t('ari.common.cancel')}
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-lg">
              <label
                className="block text-base mb-sm"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                {t('ari.common.selectPeriod')}
              </label>
              <div className="grid grid-cols-2 gap-md">
                <DatePicker
                  label={t('ari.common.startDate')}
                  value={bulkRegisterStart}
                  onChange={setBulkRegisterStart}
                  placeholder={t('ari.common.selectStartDate')}
                />
                <DatePicker
                  label={t('ari.common.endDate')}
                  value={bulkRegisterEnd}
                  onChange={setBulkRegisterEnd}
                  placeholder={t('ari.common.selectEndDate')}
                  align="right"
                />
              </div>
            </div>

            {/* Weekday Filter */}
            <div className="mb-lg">
              <label
                className="block text-base mb-md"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                {t('ari.inventories.grid.weekdaySelect')}
              </label>

              <div className="flex gap-sm mb-md">
                <button
                  onClick={selectAllWeekdays}
                  className="h-control-md rounded px-control-px-md py-none text-base leading-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {t('ari.common.view.all')}
                </button>
                <button
                  onClick={selectWeekdaysOnly}
                  className="h-control-md rounded px-control-px-md py-none text-base leading-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {t('ari.inventories.grid.weekdaysOnly')}
                </button>
                <button
                  onClick={selectWeekendsOnly}
                  className="h-control-md rounded px-control-px-md py-none text-base leading-none transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {t('ari.inventories.grid.weekendsOnly')}
                </button>
              </div>

              <div className="grid grid-cols-7 gap-sm">
                {[
                  { day: 0, label: t('ari.common.weekdays.sun'), color: 'var(--error)' },
                  { day: 1, label: t('ari.common.weekdays.mon'), color: 'var(--text-primary)' },
                  { day: 2, label: t('ari.common.weekdays.tue'), color: 'var(--text-primary)' },
                  { day: 3, label: t('ari.common.weekdays.wed'), color: 'var(--text-primary)' },
                  { day: 4, label: t('ari.common.weekdays.thu'), color: 'var(--text-primary)' },
                  { day: 5, label: t('ari.common.weekdays.fri'), color: 'var(--text-primary)' },
                  { day: 6, label: t('ari.common.weekdays.sat'), color: 'var(--primary)' }
                ].map(({ day, label, color }) => {
                  const active = bulkRegisterWeekdays.includes(day)

                  return (
                    <label key={day} className="block">
                      <button
                        type="button"
                        onClick={() => toggleWeekday(day)}
                        className="mb-xs flex h-control-md w-full items-center justify-center rounded border-none text-base leading-none transition-colors"
                        style={{
                          backgroundColor: active ? 'var(--primary)' : 'var(--bg-secondary)',
                          color: active ? '#ffffff' : color,
                          borderRadius: 'var(--radius)',
                          fontWeight: 'var(--font-bold)'
                        }}
                      >
                        {label}
                      </button>
                      <input
                        type="number"
                        disabled={!active}
                        value={bulkRegisterValues[day] ?? ''}
                        onChange={(event) => handleBulkRegisterValueChange(day, event.target.value)}
                        placeholder="0"
                        className="h-control-md w-full rounded px-control-px-sm py-none text-center text-base leading-none"
                        style={{
                          backgroundColor: active ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius)',
                          color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
                          cursor: active ? 'text' : 'not-allowed',
                          fontWeight: 'var(--font-medium)',
                          opacity: active ? 1 : 0.6
                        }}
                      />
                    </label>
                  )
                })}
              </div>
            </div>

            {/* Room Types Info */}
            <div className="mb-lg">
              <label
                className="block text-base mb-sm"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                {t('ari.inventories.grid.appliedRooms', { count: selectedRooms.length })}
              </label>
              <div
                className="p-sm rounded text-base"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius)',
                  color: 'var(--text-primary)',
                  fontWeight: 'var(--font-light)'
                }}
              >
                {selectedRooms.map(r => r.name).join(', ')}
              </div>
            </div>

            {/* Preview */}
            <div className="mb-none">
              <div className="mb-sm text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
                {t('ari.inventories.grid.preview')}
              </div>
              <div
                className="overflow-x-auto rounded"
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius)'
                }}
              >
                <table className="w-full border-separate border-spacing-0">
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                      <th className="px-md py-sm text-left text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        {t('ari.inventories.grid.room')}
                      </th>
                      <th className="px-md py-sm text-left text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        {t('ari.inventories.grid.weekday')}
                      </th>
                      <th className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        {t('ari.inventories.grid.inputInventory')}
                      </th>
                      <th className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        {t('ari.inventories.grid.totalInventory')}
                      </th>
                      <th className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        {t('ari.inventories.grid.booked')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkRegisterPreviewRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-md py-lg text-center text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                          {t('ari.inventories.grid.emptyPreview')}
                        </td>
                      </tr>
                    ) : (
                      bulkRegisterPreviewRows.flatMap((row) =>
                        row.cells.map((cell, index) => (
                          <tr key={`${row.id}-${cell.day}`}>
                            <td className="px-md py-sm text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)', borderBottom: '1px solid var(--border-color)' }}>
                              {index === 0 ? `${row.id} / ${row.name}` : ''}
                            </td>
                            <td className="px-md py-sm text-base" style={{ color: cell.day === 0 ? 'var(--error)' : cell.day === 6 ? 'var(--primary)' : 'var(--text-secondary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                              {cell.label}
                            </td>
                            <td className="px-md py-sm text-right text-base" style={{ color: 'var(--primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                              {cell.available}
                            </td>
                            <td className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)', borderBottom: '1px solid var(--border-color)' }}>
                              {cell.total}
                            </td>
                            <td className="px-md py-sm text-right text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)', borderBottom: '1px solid var(--border-color)' }}>
                              {cell.booked}
                            </td>
                          </tr>
                        ))
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className="p-md flex flex-wrap gap-md"
        style={{
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <div className="text-base" style={{ color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 'var(--font-medium)' }}>{t('ari.common.usage')}</span>
          {' '}{t('ari.common.gridHelp')}
        </div>
      </div>
    </div>
  )
}
