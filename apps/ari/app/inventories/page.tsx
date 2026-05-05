'use client'

import { Package, Search, ChevronDown, ChevronUp, X, Calendar, Grid3x3, Building2, DoorOpen } from 'lucide-react'
import { useState } from 'react'
import { mockProperties } from '@/lib/data/mock-properties'
import { mockRoomTypes } from '@/lib/data/mock-rooms'
import { mockBlocks } from '@/lib/data/mock-blocks'
import { DatePicker } from '@/components/ui/DatePicker'
import { InventoryCalendar } from './components/InventoryCalendar'
import { InventoryGrid } from './components/InventoryGrid'

type ViewType = 'calendar' | 'grid'

export default function InventoriesPage() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('')
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showResults, setShowResults] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [viewType, setViewType] = useState<ViewType>('grid')

  // Get available room types for selected property
  const availableRooms = selectedPropertyId
    ? mockRoomTypes.filter(room => room.propertyId === selectedPropertyId)
    : []

  // Get selected room names
  const selectedRooms = mockRoomTypes.filter(room => selectedRoomIds.includes(room.id))

  // Quick date range selection
  const handleQuickDateSelect = (days: number) => {
    const today = new Date()
    const end = new Date()
    end.setDate(today.getDate() + days)

    setStartDate(today.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setSelectedRoomIds([]) // Reset room selection when property changes
  }

  const handleRoomSelect = (roomId: string) => {
    if (!selectedRoomIds.includes(roomId)) {
      setSelectedRoomIds([...selectedRoomIds, roomId])
    }
  }

  const handleRoomRemove = (roomId: string) => {
    setSelectedRoomIds(selectedRoomIds.filter(id => id !== roomId))
  }

  const handleSearch = () => {
    if (selectedPropertyId && selectedRoomIds.length > 0 && startDate && endDate) {
      setShowResults(true)
      setIsCollapsed(true)
    }
  }

  const handleReset = () => {
    setSelectedPropertyId('')
    setSelectedRoomIds([])
    setStartDate('')
    setEndDate('')
    setShowResults(false)
    setIsCollapsed(false)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  // Filter blocks based on selected criteria
  const filteredBlocks = showResults
    ? mockBlocks.filter(block => {
        // In real implementation, filter by property and date range
        return true
      })
    : []

  const selectedProperty = mockProperties.find(p => p.id === selectedPropertyId)

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <h1 className="text-3xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            재고 관리
          </h1>
        </div>
      </div>

      {/* Selection Panel */}
      <div
        className="rounded-lg mb-6"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Panel Header */}
        <div
          className="flex items-center justify-between p-4 cursor-pointer"
          onClick={toggleCollapse}
          style={{
            borderBottom: isCollapsed ? 'none' : '1px solid var(--border-color)'
          }}
        >
          <div className="flex-1">
            <h2 className="text-xl mb-1" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              조회 조건
            </h2>
            {showResults && selectedProperty && isCollapsed && (
              <div className="text-sm flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--primary)' }}>
                    {selectedProperty.name}
                  </span>
                </div>
                {selectedRooms.length > 0 && (
                  <div className="flex items-center gap-2">
                    <DoorOpen className="w-4 h-4" style={{ color: '#4ade80' }} />
                    <span style={{ color: '#4ade80', fontWeight: 'var(--font-medium)' }}>
                      {selectedRooms.map(r => r.name).join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                    {startDate} ~ {endDate}
                  </span>
                </div>
              </div>
            )}
          </div>
          <button
            className="p-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)'
            }}
          >
            {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
          </button>
        </div>

        {/* Panel Content */}
        {!isCollapsed && (
          <div className="p-6 pt-4">
            {/* Property Selection */}
            <div className="mb-4">
              <label
                className="block text-sm mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                숙소 선택
              </label>
              <select
                value={selectedPropertyId}
                onChange={(e) => handlePropertyChange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)'
                }}
              >
                <option value="">숙소를 선택하세요</option>
                {mockProperties.map((property) => (
                  <option key={property.id} value={property.id}>
                    {property.name} ({property.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Room Type Selection */}
            {selectedPropertyId && (
              <div className="mb-4">
                <label
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                >
                  객실 타입 선택
                </label>

                {/* Room Selector */}
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      handleRoomSelect(e.target.value)
                      e.target.value = '' // Reset select
                    }
                  }}
                  className="w-full px-4 py-2 rounded-lg mb-3"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  <option value="">객실 타입을 선택하세요</option>
                  {availableRooms
                    .filter(room => !selectedRoomIds.includes(room.id))
                    .map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} ({room.code}) - 최대 {room.capacity}인
                      </option>
                    ))}
                </select>

                {/* Selected Room Tags */}
                {selectedRooms.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedRooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: '#ffffff',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 'var(--font-medium)'
                        }}
                      >
                        <span className="text-sm">{room.name}</span>
                        <button
                          onClick={() => handleRoomRemove(room.id)}
                          className="hover:opacity-80 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedRooms.length === 0 && (
                  <div
                    className="text-sm text-center py-3 rounded-lg"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-tertiary)',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    선택된 객실이 없습니다
                  </div>
                )}
              </div>
            )}

            {/* Date Range Selection */}
            <div className="mb-4">
              <label
                className="block text-sm mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                기간 선택
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DatePicker
                  label="시작일"
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="시작일 선택"
                />
                <DatePicker
                  label="종료일"
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="종료일 선택"
                />
              </div>
            </div>

            {/* Quick Date Range Buttons */}
            <div className="mb-6">
              <label
                className="block text-sm mb-2"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                빠른 기간 선택
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: '30일', days: 30 },
                  { label: '90일', days: 90 },
                  { label: '180일', days: 180 },
                  { label: '365일', days: 365 }
                ].map(({ label, days }) => (
                  <button
                    key={days}
                    onClick={() => handleQuickDateSelect(days)}
                    className="px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 'var(--font-medium)',
                      border: '1px solid var(--border-color)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--primary)'
                      e.currentTarget.style.color = '#ffffff'
                      e.currentTarget.style.borderColor = 'var(--primary)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                      e.currentTarget.style.color = 'var(--text-primary)'
                      e.currentTarget.style.borderColor = 'var(--border-color)'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                disabled={!selectedPropertyId || selectedRoomIds.length === 0 || !startDate || !endDate}
                className="flex items-center gap-2 px-6 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: (selectedPropertyId && selectedRoomIds.length > 0 && startDate && endDate) ? 'var(--primary)' : 'var(--bg-tertiary)',
                  color: (selectedPropertyId && selectedRoomIds.length > 0 && startDate && endDate) ? '#ffffff' : 'var(--text-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)',
                  cursor: (selectedPropertyId && selectedRoomIds.length > 0 && startDate && endDate) ? 'pointer' : 'not-allowed'
                }}
              >
                <Search className="w-5 h-5" />
                조회
              </button>

              {showResults && (
                <button
                  onClick={handleReset}
                  className="px-6 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 'var(--font-medium)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  초기화
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* View Type Toggle */}
      {showResults && selectedProperty && (
        <div className="mb-4 flex justify-end">
          <div
            className="relative flex items-center p-1"
            style={{
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: 'var(--radius-sm)',
              width: '120px',
              height: '40px'
            }}
          >
            <div
              className="absolute top-1 transition-all duration-200"
              style={{
                left: viewType === 'grid' ? '4px' : 'calc(50% - 4px)',
                width: 'calc(50% - 4px)',
                height: 'calc(100% - 8px)',
                backgroundColor: 'var(--primary)',
                borderRadius: 'var(--radius-sm)',
                zIndex: 0
              }}
            />
            <button
              onClick={() => setViewType('grid')}
              className="relative flex-1 flex items-center justify-center transition-colors"
              style={{
                color: viewType === 'grid' ? '#ffffff' : 'var(--text-secondary)',
                zIndex: 1
              }}
              title="그리드 뷰"
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewType('calendar')}
              className="relative flex-1 flex items-center justify-center transition-colors"
              style={{
                color: viewType === 'calendar' ? '#ffffff' : 'var(--text-secondary)',
                zIndex: 1
              }}
              title="캘린더 뷰"
            >
              <Calendar className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Results Section */}
      {showResults && selectedProperty && (
        <>
          {viewType === 'grid' ? (
            <InventoryGrid
              startDate={startDate}
              endDate={endDate}
              selectedRooms={selectedRooms}
            />
          ) : (
            <InventoryCalendar
              blocks={filteredBlocks}
              startDate={startDate}
              endDate={endDate}
              propertyName={selectedProperty.name}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!showResults && (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Package className="w-16 h-16 mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            조회 조건을 선택하세요
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            숙소, 객실, 기간을 선택한 후 조회 버튼을 눌러주세요
          </p>
        </div>
      )}
    </div>
  )
}