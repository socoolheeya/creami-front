'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Edit2, Copy, Save, X, CalendarRange } from 'lucide-react'
import { DatePicker } from '@/components/ui/DatePicker'

interface RoomRate {
  roomId: string
  roomName: string
  dates: Record<string, DayRate>
}

interface DayRate {
  date: string
  rate: number
  currency: string
}

interface RateGridProps {
  startDate: string
  endDate: string
  selectedRooms: { id: string; name: string }[]
  packageName: string
}

interface SelectedCell {
  roomId: string
  date: string
}

type ViewMode = 'week' | 'month' | 'all'

export function RateGrid({ startDate, endDate, selectedRooms, packageName }: RateGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('week')
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(startDate))
  const [rateData, setRateData] = useState<Record<string, RoomRate>>({})
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
  const [bulkRegisterValue, setBulkRegisterValue] = useState('')

  // Ref for auto-scroll
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const autoScrollIntervalRef = useRef<number | null>(null)

  // Initialize rate data
  useEffect(() => {
    const data: Record<string, RoomRate> = {}

    selectedRooms.forEach(room => {
      const dates: Record<string, DayRate> = {}
      const start = new Date(startDate)
      const end = new Date(endDate)

      for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0]
        dates[dateStr] = {
          date: dateStr,
          rate: 100000 + Math.floor(Math.random() * 50000), // Mock data
          currency: 'KRW'
        }
      }

      data[room.id] = {
        roomId: room.id,
        roomName: room.name,
        dates
      }
    })

    setRateData(data)
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
    if (viewMode === 'week') {
      newStart.setDate(newStart.getDate() - 7)
    } else {
      newStart.setMonth(newStart.getMonth() - 1)
    }
    if (newStart >= new Date(startDate)) {
      setCurrentWeekStart(newStart)
    }
  }

  const handleNextWeek = () => {
    const newStart = new Date(currentWeekStart)
    if (viewMode === 'week') {
      newStart.setDate(newStart.getDate() + 7)
    } else {
      newStart.setMonth(newStart.getMonth() + 1)
    }
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
    if (autoScrollIntervalRef.current) {
      cancelAnimationFrame(autoScrollIntervalRef.current)
      autoScrollIntervalRef.current = null
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const rect = container.getBoundingClientRect()
    const scrollThreshold = 100
    const scrollSpeed = 10

    const mouseX = e.clientX
    const distanceFromLeft = mouseX - rect.left
    const distanceFromRight = rect.right - mouseX

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
    } else if (distanceFromRight < scrollThreshold && distanceFromRight > 0) {
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
    } else {
      if (autoScrollIntervalRef.current) {
        cancelAnimationFrame(autoScrollIntervalRef.current)
        autoScrollIntervalRef.current = null
      }
    }
  }

  const handleCellDoubleClick = (roomId: string, date: string) => {
    setEditingCell({ roomId, date })
    const current = rateData[roomId]?.dates[date]
    setEditValue(current?.rate.toString() || '')
  }

  const handleSaveEdit = () => {
    if (editingCell) {
      const value = parseInt(editValue)
      if (!isNaN(value)) {
        setRateData(prev => ({
          ...prev,
          [editingCell.roomId]: {
            ...prev[editingCell.roomId],
            dates: {
              ...prev[editingCell.roomId].dates,
              [editingCell.date]: {
                ...prev[editingCell.roomId].dates[editingCell.date],
                rate: value
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
      setRateData(prev => {
        const updated = { ...prev }
        selectedCells.forEach(cell => {
          if (updated[cell.roomId]?.dates[cell.date]) {
            updated[cell.roomId] = {
              ...updated[cell.roomId],
              dates: {
                ...updated[cell.roomId].dates,
                [cell.date]: {
                  ...updated[cell.roomId].dates[cell.date],
                  rate: value
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
      const firstValue = rateData[firstCell.roomId]?.dates[firstCell.date]?.rate

      if (firstValue !== undefined) {
        setRateData(prev => {
          const updated = { ...prev }
          selectedCells.forEach(cell => {
            if (updated[cell.roomId]?.dates[cell.date]) {
              updated[cell.roomId] = {
                ...updated[cell.roomId],
                dates: {
                  ...updated[cell.roomId].dates,
                  [cell.date]: {
                    ...updated[cell.roomId].dates[cell.date],
                    rate: firstValue
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
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

  const calculateBulkRegisterCells = () => {
    if (!bulkRegisterStart || !bulkRegisterEnd) return 0

    let count = 0
    const start = new Date(bulkRegisterStart)
    const end = new Date(bulkRegisterEnd)

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (bulkRegisterWeekdays.includes(d.getDay())) {
        count++
      }
    }

    return count * selectedRooms.length
  }

  const handleBulkRegister = () => {
    const value = parseInt(bulkRegisterValue)
    if (isNaN(value) || !bulkRegisterStart || !bulkRegisterEnd) return

    setRateData(prev => {
      const updated = { ...prev }
      const start = new Date(bulkRegisterStart)
      const end = new Date(bulkRegisterEnd)

      selectedRooms.forEach(room => {
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0]
          if (bulkRegisterWeekdays.includes(d.getDay()) && updated[room.id]?.dates[dateStr]) {
            updated[room.id] = {
              ...updated[room.id],
              dates: {
                ...updated[room.id].dates,
                [dateStr]: {
                  ...updated[room.id].dates[dateStr],
                  rate: value
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
    setBulkRegisterValue('')
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
      className="rounded-lg"
      style={{
        backgroundColor: 'var(--bg-primary)',
        borderRadius: 'var(--radius)',
        boxShadow: 'var(--shadow)',
        border: '1px solid var(--border-color)'
      }}
    >
      {/* Toolbar */}
      <div
        className="p-4 space-y-3"
        style={{
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {/* Top Row: View Mode + Package Info + Bulk Register */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* View Mode Selector */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('week')}
                className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: viewMode === 'week' ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: viewMode === 'week' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                주간
              </button>
              <button
                onClick={() => setViewMode('month')}
                className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: viewMode === 'month' ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: viewMode === 'month' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                월간
              </button>
              <button
                onClick={() => setViewMode('all')}
                className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: viewMode === 'all' ? 'var(--primary)' : 'var(--bg-secondary)',
                  color: viewMode === 'all' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                전체
              </button>
            </div>

            {/* Package Info */}
            <div
              className="text-sm px-3 py-1.5 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {packageName}
            </div>
          </div>

          {/* Bulk Register Button */}
          <button
            onClick={() => setShowBulkRegister(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-bold)'
            }}
          >
            <CalendarRange className="w-5 h-5" />
            대량 등록
          </button>
        </div>

        {/* Bottom Row: Navigation + Selection Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {viewMode !== 'all' && (
              <>
                <button
                  onClick={handlePrevWeek}
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
                  className="p-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <ChevronRight className="w-5 h-5" />
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
            <div className="flex items-center gap-2">
              <span
                className="text-sm px-3 py-1 rounded"
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
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                <Edit2 className="w-4 h-4" />
                일괄 수정
              </button>

              <button
                onClick={handleCopyDown}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)',
                  border: '1px solid var(--border-color)'
                }}
              >
                <Copy className="w-4 h-4" />
                복사
              </button>

              <button
                onClick={() => setSelectedCells([])}
                className="p-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                <X className="w-4 h-4" />
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
                className="px-4 py-3 text-left sticky left-0 z-10"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRight: '1px solid var(--border-color)',
                  borderBottom: '1px solid var(--border-color)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  minWidth: '150px'
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
                    className="px-4 py-3 text-center"
                    style={{
                      borderBottom: '1px solid var(--border-color)',
                      fontWeight: 'var(--font-bold)',
                      color: dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : 'var(--text-primary)',
                      minWidth: '120px',
                      backgroundColor: isWeekend ? 'var(--bg-tertiary)' : 'var(--bg-secondary)'
                    }}
                  >
                    <div>{date.getDate()}일</div>
                    <div className="text-xs" style={{ fontWeight: 'var(--font-light)' }}>
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
                  className="px-4 py-3 sticky left-0 z-10"
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
                  const dayData = rateData[room.id]?.dates[dateStr]
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
                      className="px-3 py-2 cursor-pointer transition-all"
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
                          className="w-full px-2 py-1 text-center rounded"
                          style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '2px solid var(--primary)',
                            color: 'var(--text-primary)',
                            fontWeight: 'var(--font-bold)'
                          }}
                        />
                      ) : (
                        <div className="text-center">
                          {/* Rate Amount */}
                          <div
                            className="text-lg"
                            style={{
                              fontWeight: 'var(--font-bold)',
                              color: isSelected ? '#ffffff' : 'var(--primary)'
                            }}
                          >
                            ₩{formatCurrency(dayData.rate)}
                          </div>

                          {/* Currency */}
                          <div
                            className="text-xs"
                            style={{
                              color: isSelected ? '#ffffff' : 'var(--text-tertiary)',
                              fontWeight: 'var(--font-light)'
                            }}
                          >
                            {dayData.currency}
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
            className="rounded-lg p-6 w-96"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-xl mb-4"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              일괄 수정
            </h3>

            <p
              className="text-sm mb-4"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)'
              }}
            >
              선택된 {selectedCells.length}개 셀의 요금을 일괄 변경합니다.
            </p>

            <label
              className="block text-sm mb-2"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              요금 (KRW)
            </label>
            <input
              type="number"
              value={bulkEditValue}
              onChange={(e) => setBulkEditValue(e.target.value)}
              placeholder="숫자 입력"
              className="w-full px-4 py-2 rounded-lg mb-4"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 'var(--font-medium)'
              }}
            />

            <div className="flex gap-3">
              <button
                onClick={handleBulkEdit}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                <Save className="w-4 h-4" />
                저장
              </button>
              <button
                onClick={() => {
                  setShowBulkEdit(false)
                  setBulkEditValue('')
                }}
                className="flex-1 px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
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
            className="rounded-lg p-6 w-[600px] max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: 'var(--radius)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border-color)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              className="text-2xl mb-6"
              style={{
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)'
              }}
            >
              요금 대량 등록
            </h3>

            {/* Date Range */}
            <div className="mb-6">
              <label
                className="block text-sm mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                기간 선택
              </label>
              <div className="grid grid-cols-2 gap-4">
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
                />
              </div>
            </div>

            {/* Weekday Filter */}
            <div className="mb-6">
              <label
                className="block text-sm mb-3"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                요일 선택
              </label>

              {/* Quick Selection */}
              <div className="flex gap-2 mb-3">
                <button
                  onClick={selectAllWeekdays}
                  className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  전체
                </button>
                <button
                  onClick={selectWeekdaysOnly}
                  className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  평일만
                </button>
                <button
                  onClick={selectWeekendsOnly}
                  className="px-3 py-1.5 rounded-lg text-sm transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  주말만
                </button>
              </div>

              {/* Weekday Checkboxes */}
              <div className="flex flex-wrap gap-2">
                {[
                  { day: 0, label: '일', color: '#ef4444' },
                  { day: 1, label: '월', color: 'var(--text-primary)' },
                  { day: 2, label: '화', color: 'var(--text-primary)' },
                  { day: 3, label: '수', color: 'var(--text-primary)' },
                  { day: 4, label: '목', color: 'var(--text-primary)' },
                  { day: 5, label: '금', color: 'var(--text-primary)' },
                  { day: 6, label: '토', color: '#3b82f6' }
                ].map(({ day, label, color }) => (
                  <button
                    key={day}
                    onClick={() => toggleWeekday(day)}
                    className="flex items-center justify-center w-12 h-12 rounded-lg transition-all"
                    style={{
                      backgroundColor: bulkRegisterWeekdays.includes(day) ? 'var(--primary)' : 'var(--bg-secondary)',
                      color: bulkRegisterWeekdays.includes(day) ? '#ffffff' : color,
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 'var(--font-bold)',
                      border: bulkRegisterWeekdays.includes(day) ? '2px solid var(--primary)' : '1px solid var(--border-color)'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Room Types Info */}
            <div className="mb-6">
              <label
                className="block text-sm mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                적용 객실 ({selectedRooms.length}개)
              </label>
              <div
                className="p-3 rounded-lg text-sm"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-primary)',
                  fontWeight: 'var(--font-light)'
                }}
              >
                {selectedRooms.map(r => r.name).join(', ')}
              </div>
            </div>

            {/* Rate Input */}
            <div className="mb-6">
              <label
                className="block text-sm mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                요금 (KRW)
              </label>
              <input
                type="number"
                value={bulkRegisterValue}
                onChange={(e) => setBulkRegisterValue(e.target.value)}
                placeholder="숫자 입력"
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              />
            </div>

            {/* Preview */}
            <div
              className="mb-6 p-4 rounded-lg"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div
                className="text-sm mb-1"
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                적용 미리보기
              </div>
              <div
                className="text-2xl"
                style={{
                  color: 'var(--primary)',
                  fontWeight: 'var(--font-bold)'
                }}
              >
                {calculateBulkRegisterCells()}개 셀
              </div>
              <div
                className="text-xs mt-1"
                style={{
                  color: 'var(--text-tertiary)',
                  fontWeight: 'var(--font-light)'
                }}
              >
                {selectedRooms.length}개 객실 × 선택된 날짜
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleBulkRegister}
                disabled={!bulkRegisterStart || !bulkRegisterEnd || !bulkRegisterValue || bulkRegisterWeekdays.length === 0}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: (bulkRegisterStart && bulkRegisterEnd && bulkRegisterValue && bulkRegisterWeekdays.length > 0) ? 'var(--primary)' : 'var(--bg-tertiary)',
                  color: (bulkRegisterStart && bulkRegisterEnd && bulkRegisterValue && bulkRegisterWeekdays.length > 0) ? '#ffffff' : 'var(--text-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-bold)',
                  cursor: (bulkRegisterStart && bulkRegisterEnd && bulkRegisterValue && bulkRegisterWeekdays.length > 0) ? 'pointer' : 'not-allowed'
                }}
              >
                <Save className="w-5 h-5" />
                등록
              </button>
              <button
                onClick={() => {
                  setShowBulkRegister(false)
                  setBulkRegisterStart('')
                  setBulkRegisterEnd('')
                  setBulkRegisterWeekdays([0, 1, 2, 3, 4, 5, 6])
                  setBulkRegisterValue('')
                }}
                className="flex-1 px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
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

      {/* Legend */}
      <div
        className="p-4 flex flex-wrap gap-4"
        style={{
          borderTop: '1px solid var(--border-color)'
        }}
      >
        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 'var(--font-medium)' }}>사용법:</span>
          {' '}드래그로 범위 선택 • 더블클릭으로 개별 수정 • 대량 등록으로 빠른 입력
        </div>
      </div>
    </div>
  )
}
