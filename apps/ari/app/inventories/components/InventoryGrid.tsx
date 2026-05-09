'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Edit2, Copy, Save, X, CalendarRange, Calendar as CalendarIcon } from 'lucide-react'
import { DatePicker } from '@creami/ui'

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
}

interface SelectedCell {
  roomId: string
  date: string
}

type ViewMode = 'week' | 'month' | 'all'

const WEEKDAY_LABELS: Record<number, string> = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토'
}

export function InventoryGrid({ startDate, endDate, selectedRooms }: InventoryGridProps) {
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

  // Initialize inventory data
  useEffect(() => {
    const data: Record<string, RoomInventory> = {}

    selectedRooms.forEach(room => {
      const dates: Record<string, DayInventory> = {}
      const start = new Date(startDate)
      const end = new Date(endDate)

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0]
        dates[dateStr] = {
          date: dateStr,
          total: 10, // Mock data
          available: Math.floor(Math.random() * 10),
          booked: 0
        }
        dates[dateStr].booked = dates[dateStr].total - dates[dateStr].available
      }

      data[room.id] = {
        roomId: room.id,
        roomName: room.name,
        dates
      }
    })

    setInventoryData(data)
  }, [selectedRooms, startDate, endDate])

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

  const handleSaveEdit = () => {
    if (editingCell) {
      const value = parseInt(editValue)
      if (!isNaN(value)) {
        setInventoryData(prev => ({
          ...prev,
          [editingCell.roomId]: {
            ...prev[editingCell.roomId],
            dates: {
              ...prev[editingCell.roomId].dates,
              [editingCell.date]: {
                ...prev[editingCell.roomId].dates[editingCell.date],
                available: value,
                booked: prev[editingCell.roomId].dates[editingCell.date].total - value
              }
            }
          }
        }))
      }
    }
    setEditingCell(null)
    setEditValue('')
  }

  const handleBulkEdit = () => {
    const value = parseInt(bulkEditValue)
    if (!isNaN(value) && selectedCells.length > 0) {
      setInventoryData(prev => {
        const updated = { ...prev }
        selectedCells.forEach(cell => {
          if (updated[cell.roomId]?.dates[cell.date]) {
            updated[cell.roomId] = {
              ...updated[cell.roomId],
              dates: {
                ...updated[cell.roomId].dates,
                [cell.date]: {
                  ...updated[cell.roomId].dates[cell.date],
                  available: value,
                  booked: updated[cell.roomId].dates[cell.date].total - value
                }
              }
            }
          }
        })
        return updated
      })
      setShowBulkEdit(false)
      setBulkEditValue('')
      setSelectedCells([])
    }
  }

  const handleCopyDown = () => {
    if (selectedCells.length > 0) {
      const firstCell = selectedCells[0]
      const firstValue = inventoryData[firstCell.roomId]?.dates[firstCell.date]?.available

      if (firstValue !== undefined) {
        setInventoryData(prev => {
          const updated = { ...prev }
          selectedCells.forEach(cell => {
            if (updated[cell.roomId]?.dates[cell.date]) {
              updated[cell.roomId] = {
                ...updated[cell.roomId],
                dates: {
                  ...updated[cell.roomId].dates,
                  [cell.date]: {
                    ...updated[cell.roomId].dates[cell.date],
                    available: firstValue,
                    booked: updated[cell.roomId].dates[cell.date].total - firstValue
                  }
                }
              }
            }
          })
          return updated
        })
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
      .filter(({ day, value }) => bulkRegisterWeekdays.includes(day) && WEEKDAY_LABELS[day] && !isNaN(value))
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
        label: WEEKDAY_LABELS[day],
        available: value,
        total: 10,
        booked: Math.max(10 - value, 0)
      }))
    }))
  }, [bulkRegisterValues, bulkRegisterWeekdays, selectedRooms])

  const handleBulkRegister = () => {
    if (!bulkRegisterStart || !bulkRegisterEnd || !hasBulkRegisterValue()) return

    setInventoryData(prev => {
      const updated = { ...prev }
      const start = new Date(bulkRegisterStart)
      const end = new Date(bulkRegisterEnd)

      selectedRooms.forEach(room => {
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0]
          const value = parseInt(bulkRegisterValues[d.getDay()] ?? '')
          if (bulkRegisterWeekdays.includes(d.getDay()) && !isNaN(value) && updated[room.id]?.dates[dateStr]) {
            updated[room.id] = {
              ...updated[room.id],
              dates: {
                ...updated[room.id].dates,
                [dateStr]: {
                  ...updated[room.id].dates[dateStr],
                  available: value,
                  booked: updated[room.id].dates[dateStr].total - value
                }
              }
            }
          }
        }
      })

      return updated
    })

    setShowBulkRegister(false)
    setBulkRegisterStart('')
    setBulkRegisterEnd('')
    setBulkRegisterWeekdays([0, 1, 2, 3, 4, 5, 6])
    setBulkRegisterValues({})
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
              주간
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
              월간
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
              전체
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
            대량 등록
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
                      {currentWeekStart.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                      {' - '}
                      {new Date(currentWeekStart.getTime() + 6 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                    </>
                  ) : (
                    <>
                      {currentWeekStart.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
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
                전체 기간: {startDate} ~ {endDate}
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
              {selectedCells.length}개 선택됨
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
              일괄 수정
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
              복사
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
                객실 타입
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
                    <div>{date.getDate()}일</div>
                    <div className="text-base" style={{ fontWeight: 'var(--font-light)' }}>
                      {['일', '월', '화', '수', '목', '금', '토'][dayOfWeek]}
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
              일괄 수정
            </h3>

            <p
              className="text-base mb-md"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              선택된 {selectedCells.length}개 셀의 가용 객실 수를 일괄 변경합니다.
            </p>

            <label
              className="block text-base mb-sm"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              가용 객실 수
            </label>
            <input
              type="number"
              value={bulkEditValue}
              onChange={(e) => setBulkEditValue(e.target.value)}
              placeholder="숫자 입력"
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
                저장
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
                취소
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
                재고 대량 등록
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
                  등록
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
                  취소
                </button>
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-lg">
              <label
                className="block text-base mb-sm"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                기간 선택
              </label>
              <div className="grid grid-cols-2 gap-md">
                <DatePicker
                  label="시작일"
                  value={bulkRegisterStart}
                  onChange={setBulkRegisterStart}
                  placeholder="시작일 선택"
                />
                <DatePicker
                  label="종료일"
                  value={bulkRegisterEnd}
                  onChange={setBulkRegisterEnd}
                  placeholder="종료일 선택"
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
                요일 선택
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
                  전체
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
                  평일만
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
                  주말만
                </button>
              </div>

              <div className="grid grid-cols-7 gap-sm">
                {[
                  { day: 0, label: '일', color: 'var(--error)' },
                  { day: 1, label: '월', color: 'var(--text-primary)' },
                  { day: 2, label: '화', color: 'var(--text-primary)' },
                  { day: 3, label: '수', color: 'var(--text-primary)' },
                  { day: 4, label: '목', color: 'var(--text-primary)' },
                  { day: 5, label: '금', color: 'var(--text-primary)' },
                  { day: 6, label: '토', color: 'var(--primary)' }
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
                적용 객실 ({selectedRooms.length}개)
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
                적용 미리보기
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
                        객실
                      </th>
                      <th className="px-md py-sm text-left text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        요일
                      </th>
                      <th className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        입력재고
                      </th>
                      <th className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        총재고
                      </th>
                      <th className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: '1px solid var(--border-color)' }}>
                        예약
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bulkRegisterPreviewRows.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-md py-lg text-center text-base" style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}>
                          요일별 재고를 입력하면 적용 결과가 표시됩니다.
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
          <span style={{ fontWeight: 'var(--font-medium)' }}>사용법:</span>
          {' '}드래그로 범위 선택 • 더블클릭으로 개별 수정 • 대량 등록으로 빠른 입력
        </div>
      </div>
    </div>
  )
}
