'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Edit2, Copy, Save, X, CalendarRange } from 'lucide-react'
import { WeekdayRateBulkModal, type WeekdayRatePreviewRow, type WeekdayRateValues } from '@creami/ui'

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
  rowHeaderLabel?: string
  bulkTargetLabel?: string
  ratePlanPricing?: RatePlanPricingSetting
}

interface SelectedCell {
  roomId: string
  date: string
}

type ViewMode = 'week' | 'month' | 'all'
type RateType = 'net_rate' | 'sell_rate_no_commission' | 'commission_included' | 'net_and_sell'
type CommissionType = 'percentage' | 'fixed'

interface RatePlanPricingSetting {
  rateType: RateType
  commission: {
    type: CommissionType
    value: number
  }
}

const RATE_TYPE_LABELS: Record<RateType, string> = {
  net_rate: '입금가',
  sell_rate_no_commission: '판매가',
  commission_included: '커미션 포함가',
  net_and_sell: '입금가/판매가'
}

const WEEKDAY_LABELS: Record<number, string> = {
  0: '일',
  1: '월',
  2: '화',
  3: '수',
  4: '목',
  5: '금',
  6: '토'
}

export function RateGrid({
  startDate,
  endDate,
  selectedRooms,
  packageName,
  rowHeaderLabel = '객실 타입',
  bulkTargetLabel = '객실',
  ratePlanPricing = {
    rateType: 'commission_included',
    commission: {
      type: 'percentage',
      value: 10
    }
  }
}: RateGridProps) {
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
  const [bulkRegisterValues, setBulkRegisterValues] = useState<WeekdayRateValues>({})
  const [bulkRegisterTargetIds, setBulkRegisterTargetIds] = useState<string[]>([])
  const [bulkRegisterActiveWeekdays, setBulkRegisterActiveWeekdays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6])
  const [bulkRegisterWarning, setBulkRegisterWarning] = useState('')

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

  const getCommissionAmount = (sellRate: number) => {
    if (ratePlanPricing.commission.type === 'percentage') {
      return Math.round(sellRate * (ratePlanPricing.commission.value / 100))
    }

    return ratePlanPricing.commission.value
  }

  const calculateRateByType = (inputAmount: number) => {
    if (ratePlanPricing.rateType === 'net_rate') {
      if (ratePlanPricing.commission.type === 'percentage') {
        const sellRate = Math.round(inputAmount / (1 - ratePlanPricing.commission.value / 100))
        return {
          sellRate,
          netRate: inputAmount,
          commissionAmount: sellRate - inputAmount
        }
      }

      return {
        sellRate: inputAmount + ratePlanPricing.commission.value,
        netRate: inputAmount,
        commissionAmount: ratePlanPricing.commission.value
      }
    }

    if (ratePlanPricing.rateType === 'commission_included') {
      const commissionAmount = getCommissionAmount(inputAmount)
      return {
        sellRate: inputAmount,
        netRate: Math.max(inputAmount - commissionAmount, 0),
        commissionAmount
      }
    }

    return {
      sellRate: inputAmount,
      netRate: inputAmount,
      commissionAmount: 0
    }
  }

  const getRateTypeLabel = () => {
    return `Rate type: ${RATE_TYPE_LABELS[ratePlanPricing.rateType]}`
  }

  const getCommissionLabel = () => {
    const { commission } = ratePlanPricing
    return commission.type === 'percentage'
      ? `커미션 ${commission.value}%`
      : `커미션 ${formatCurrency(commission.value)}원`
  }

  const hasBulkRegisterValue = () => {
    return bulkRegisterActiveWeekdays.some((day) => {
      const value = bulkRegisterValues[day]
      return value?.trim() !== '' && !isNaN(parseInt(value ?? ''))
    })
  }

  const selectedBulkRegisterTargets = selectedRooms.filter(room => bulkRegisterTargetIds.includes(room.id))

  const isBulkRegisterDateOutOfRange = (nextStart = bulkRegisterStart, nextEnd = bulkRegisterEnd) => {
    if (!nextStart || !nextEnd) return false

    return nextStart < startDate || nextEnd > endDate || nextStart > nextEnd
  }

  const getDateRangeWarning = (nextStart = bulkRegisterStart, nextEnd = bulkRegisterEnd) => {
    if (!nextStart || !nextEnd) return ''

    if (nextStart > nextEnd) {
      return '시작일은 종료일보다 늦을 수 없습니다.'
    }

    if (nextStart < startDate || nextEnd > endDate) {
      return '조회날짜 범위 초과하였습니다.'
    }

    return ''
  }

  const handleOpenBulkRegister = () => {
    setBulkRegisterStart(startDate)
    setBulkRegisterEnd(endDate)
    setBulkRegisterTargetIds(selectedRooms.map(room => room.id))
    setBulkRegisterActiveWeekdays([0, 1, 2, 3, 4, 5, 6])
    setBulkRegisterWarning('')
    setShowBulkRegister(true)
  }

  const handleBulkRegisterStartChange = (value: string) => {
    setBulkRegisterStart(value)
    setBulkRegisterWarning(getDateRangeWarning(value, bulkRegisterEnd))
  }

  const handleBulkRegisterEndChange = (value: string) => {
    setBulkRegisterEnd(value)
    setBulkRegisterWarning(getDateRangeWarning(bulkRegisterStart, value))
  }

  const handleBulkRegisterTargetToggle = (targetId: string) => {
    setBulkRegisterTargetIds(prev =>
      prev.includes(targetId)
        ? prev.filter(id => id !== targetId)
        : [...prev, targetId]
    )
  }

  const handleBulkRegisterWeekdayToggle = (day: number) => {
    setBulkRegisterActiveWeekdays(prev =>
      prev.includes(day)
        ? prev.filter(activeDay => activeDay !== day)
        : [...prev, day].sort((a, b) => a - b)
    )
  }

  const handleBulkRegisterValueChange = (day: number, value: string) => {
    setBulkRegisterValues(prev => ({
      ...prev,
      [day]: value
    }))
  }

  const bulkRegisterPreviewRows = useMemo<WeekdayRatePreviewRow[]>(() => {
    const validCells = Object.entries(bulkRegisterValues)
      .map(([day, value]) => ({
        day: Number(day),
        value: parseInt(value)
      }))
      .filter(({ day, value }) => bulkRegisterActiveWeekdays.includes(day) && WEEKDAY_LABELS[day] && !isNaN(value))
      .sort((a, b) => {
        const order = [1, 2, 3, 4, 5, 6, 0]
        return order.indexOf(a.day) - order.indexOf(b.day)
      })

    if (validCells.length === 0) return []

    return selectedBulkRegisterTargets.map((room) => ({
      id: room.id,
      name: room.name,
      cells: validCells.map(({ day, value }) => ({
        day,
        label: WEEKDAY_LABELS[day],
        inputAmount: value,
        ...calculateRateByType(value)
      }))
    }))
  }, [bulkRegisterValues, bulkRegisterActiveWeekdays, selectedBulkRegisterTargets, ratePlanPricing])

  const handleBulkRegister = () => {
    const warning = getDateRangeWarning()

    if (warning) {
      setBulkRegisterWarning(warning)
      return
    }

    if (
      !bulkRegisterStart ||
      !bulkRegisterEnd ||
      !hasBulkRegisterValue() ||
      selectedBulkRegisterTargets.length === 0 ||
      bulkRegisterActiveWeekdays.length === 0
    ) {
      return
    }

    setRateData(prev => {
      const updated = { ...prev }
      const start = new Date(bulkRegisterStart)
      const end = new Date(bulkRegisterEnd)

      selectedBulkRegisterTargets.forEach(room => {
        for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
          const dateStr = d.toISOString().split('T')[0]
          const value = parseInt(bulkRegisterValues[d.getDay()] ?? '')

          if (bulkRegisterActiveWeekdays.includes(d.getDay()) && !isNaN(value) && updated[room.id]?.dates[dateStr]) {
            const calculated = calculateRateByType(value)

            updated[room.id] = {
              ...updated[room.id],
              dates: {
                ...updated[room.id].dates,
                [dateStr]: {
                  ...updated[room.id].dates[dateStr],
                  rate: calculated.sellRate
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
    setBulkRegisterValues({})
    setBulkRegisterTargetIds([])
    setBulkRegisterActiveWeekdays([0, 1, 2, 3, 4, 5, 6])
    setBulkRegisterWarning('')
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
        {/* Top Row: View Mode + Package Info + Bulk Register */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-md">
            {/* View Mode Selector */}
            <div
              className="flex items-center gap-xs rounded p-xs"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
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

            {/* Package Info */}
            <div
              className="flex h-control-md items-center px-control-px-md py-none text-base leading-none"
              style={{
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              {packageName}
            </div>
          </div>

          {/* Bulk Register Button */}
          <button
            onClick={handleOpenBulkRegister}
            className="flex items-center gap-sm px-control-px-lg py-sm rounded text-base leading-none transition-colors"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius)',
              fontWeight: 'var(--font-bold)'
            }}
          >
            <CalendarRange className="w-icon-md h-icon-md" />
            요일별 수정
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
                {rowHeaderLabel}
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
                      color: dayOfWeek === 0 ? '#ef4444' : dayOfWeek === 6 ? '#3b82f6' : 'var(--text-primary)',
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
                            className="text-base"
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
              선택된 {selectedCells.length}개 셀의 요금을 일괄 변경합니다.
            </p>

            <label
              className="block text-base mb-sm"
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
              className="w-full px-control-px-lg py-sm rounded mb-md text-base"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            />

            <div className="flex gap-md">
              <button
                onClick={handleBulkEdit}
                className="flex-1 flex items-center justify-center gap-sm px-control-px-lg py-sm rounded text-base leading-none"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: '#ffffff',
                  borderRadius: 'var(--radius)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                <Save className="w-md h-md" />
                저장
              </button>
              <button
                onClick={() => {
                  setShowBulkEdit(false)
                  setBulkEditValue('')
                }}
                className="flex-1 px-control-px-lg py-sm rounded text-base leading-none"
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

      <WeekdayRateBulkModal
        isOpen={showBulkRegister}
        title="요일별 요금 일괄 수정"
        startDate={bulkRegisterStart}
        endDate={bulkRegisterEnd}
        values={bulkRegisterValues}
        targetLabel={bulkTargetLabel}
        rateTypeLabel={getRateTypeLabel()}
        commissionLabel={getCommissionLabel()}
        previewRows={bulkRegisterPreviewRows}
        targetOptions={selectedRooms.map(room => ({ id: room.id, name: room.name }))}
        selectedTargetIds={bulkRegisterTargetIds}
        activeWeekdays={bulkRegisterActiveWeekdays}
        warningMessage={bulkRegisterWarning}
        disabled={
          !bulkRegisterStart ||
          !bulkRegisterEnd ||
          !hasBulkRegisterValue() ||
          selectedBulkRegisterTargets.length === 0 ||
          bulkRegisterActiveWeekdays.length === 0 ||
          isBulkRegisterDateOutOfRange()
        }
        onStartDateChange={handleBulkRegisterStartChange}
        onEndDateChange={handleBulkRegisterEndChange}
        onValueChange={handleBulkRegisterValueChange}
        onTargetToggle={handleBulkRegisterTargetToggle}
        onWeekdayToggle={handleBulkRegisterWeekdayToggle}
        onSubmit={handleBulkRegister}
        onClose={() => {
          setShowBulkRegister(false)
          setBulkRegisterStart('')
          setBulkRegisterEnd('')
          setBulkRegisterValues({})
          setBulkRegisterTargetIds([])
          setBulkRegisterActiveWeekdays([0, 1, 2, 3, 4, 5, 6])
          setBulkRegisterWarning('')
        }}
      />

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
