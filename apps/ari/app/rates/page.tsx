'use client'

import { DollarSign, Search, ChevronDown, ChevronUp, X, Building2, Bed, Package2 } from 'lucide-react'
import { useState } from 'react'
import { mockProperties } from '@/lib/data/mock-properties'
import { mockRoomTypes } from '@/lib/data/mock-rooms'
import { mockPackages } from '@/lib/data/mock-packages'
import { DatePicker } from '@/components/ui/DatePicker'
import { RateGrid } from './components/RateGrid'

type CriteriaType = 'package' | 'room'

export default function RatesPage() {

  // Search condition state
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('')
  const [criteriaType, setCriteriaType] = useState<CriteriaType>('package')
  const [selectedPackageId, setSelectedPackageId] = useState<string>('')
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [showResults, setShowResults] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Room multi-select dropdown state
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false)
  const [tempSelectedRoomIds, setTempSelectedRoomIds] = useState<string[]>([])

  // Get available data based on property selection
  const availableRooms = selectedPropertyId
    ? mockRoomTypes.filter(room => room.propertyId === selectedPropertyId)
    : []

  const availablePackages = selectedPropertyId
    ? mockPackages.filter(pkg => pkg.propertyId === selectedPropertyId)
    : []

  // Get selected data for display
  const selectedRooms = mockRoomTypes.filter(room => selectedRoomIds.includes(room.id))
  const selectedPackage = mockPackages.find(pkg => pkg.id === selectedPackageId)
  const selectedProperty = mockProperties.find(p => p.id === selectedPropertyId)

  // Handlers
  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setSelectedPackageId('')
    setSelectedRoomIds([])
  }

  const handleCriteriaTypeChange = (type: CriteriaType) => {
    setCriteriaType(type)
    setSelectedPackageId('')
    setSelectedRoomIds([])
  }

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId)
  }

  const handleRoomSelect = (roomId: string) => {
    if (!selectedRoomIds.includes(roomId)) {
      setSelectedRoomIds([...selectedRoomIds, roomId])
    }
  }

  const handleRoomRemove = (roomId: string) => {
    setSelectedRoomIds(selectedRoomIds.filter(id => id !== roomId))
  }

  // Room multi-select dropdown handlers
  const handleOpenRoomDropdown = () => {
    setTempSelectedRoomIds([...selectedRoomIds])
    setRoomDropdownOpen(true)
  }

  const handleToggleRoomInDropdown = (roomId: string) => {
    if (tempSelectedRoomIds.includes(roomId)) {
      setTempSelectedRoomIds(tempSelectedRoomIds.filter(id => id !== roomId))
    } else {
      setTempSelectedRoomIds([...tempSelectedRoomIds, roomId])
    }
  }

  const handleApplyRoomSelection = () => {
    setSelectedRoomIds([...tempSelectedRoomIds])
    setRoomDropdownOpen(false)
  }

  const handleCancelRoomSelection = () => {
    setRoomDropdownOpen(false)
  }

  const handleSelectAllRooms = () => {
    setTempSelectedRoomIds(availableRooms.map(room => room.id))
  }

  const handleDeselectAllRooms = () => {
    setTempSelectedRoomIds([])
  }

  // Quick date range selection
  const handleQuickDateSelect = (days: number) => {
    const today = new Date()
    const end = new Date()
    end.setDate(today.getDate() + days)

    setStartDate(today.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  const handleSearch = () => {
    const isPackageBased = criteriaType === 'package' && selectedPackageId && selectedRoomIds.length > 0
    const isRoomBased = criteriaType === 'room' && selectedRoomIds.length > 0 && selectedPackageId

    if (selectedPropertyId && (isPackageBased || isRoomBased) && startDate && endDate) {
      setShowResults(true)
      setIsCollapsed(true)
    }
  }

  const handleReset = () => {
    setSelectedPropertyId('')
    setSelectedPackageId('')
    setSelectedRoomIds([])
    setStartDate('')
    setEndDate('')
    setShowResults(false)
    setIsCollapsed(false)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <DollarSign className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            요금 관리
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
              <div
                className="flex items-center gap-3 text-sm flex-wrap"
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-light)'
                }}
              >
                {/* Property */}
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" style={{ color: '#3b82f6' }} />
                  <span style={{ fontWeight: 'var(--font-medium)' }}>{selectedProperty.name}</span>
                </div>

                {/* Package */}
                {selectedPackage && (
                  <div className="flex items-center gap-1.5">
                    <Package2 className="w-4 h-4" style={{ color: '#8b5cf6' }} />
                    <span>{selectedPackage.name}</span>
                  </div>
                )}

                {/* Rooms */}
                {selectedRooms.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" style={{ color: '#10b981' }} />
                    <span>{selectedRooms.map(r => r.name).join(', ')}</span>
                  </div>
                )}

                {/* Date Range */}
                {startDate && endDate && (
                  <div className="flex items-center gap-1.5">
                    <span>📅</span>
                    <span>{startDate} ~ {endDate}</span>
                  </div>
                )}
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

            {/* Criteria Type Selection */}
            {selectedPropertyId && (
              <div className="mb-4">
                <label
                  className="block text-sm mb-2"
                  style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                >
                  조회 기준
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleCriteriaTypeChange('package')}
                    className="flex-1 px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: criteriaType === 'package' ? 'var(--primary)' : 'var(--bg-tertiary)',
                      color: criteriaType === 'package' ? '#ffffff' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 'var(--font-medium)',
                      border: criteriaType === 'package' ? 'none' : '1px solid var(--border-color)'
                    }}
                  >
                    패키지 기준
                  </button>
                  <button
                    onClick={() => handleCriteriaTypeChange('room')}
                    className="flex-1 px-4 py-2 rounded-lg transition-colors"
                    style={{
                      backgroundColor: criteriaType === 'room' ? 'var(--primary)' : 'var(--bg-tertiary)',
                      color: criteriaType === 'room' ? '#ffffff' : 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 'var(--font-medium)',
                      border: criteriaType === 'room' ? 'none' : '1px solid var(--border-color)'
                    }}
                  >
                    객실 기준
                  </button>
                </div>
              </div>
            )}

            {/* Package-based Selection */}
            {selectedPropertyId && criteriaType === 'package' && (
              <>
                {/* Package Selection */}
                <div className="mb-4">
                  <label
                    className="block text-sm mb-2"
                    style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                  >
                    패키지 선택
                  </label>
                  <select
                    value={selectedPackageId}
                    onChange={(e) => handlePackageSelect(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-primary)',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    <option value="">패키지를 선택하세요</option>
                    {availablePackages.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.name} ({pkg.code})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Room Multi-Select */}
                {selectedPackageId && (
                  <div className="mb-4">
                    <label
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                    >
                      객실 타입 선택
                    </label>

                    {/* Custom Multi-Select Dropdown */}
                    <div className="relative">
                      <button
                        onClick={handleOpenRoomDropdown}
                        className="w-full px-4 py-2 rounded-lg flex items-center justify-between mb-3"
                        style={{
                          backgroundColor: 'var(--bg-secondary)',
                          border: '1px solid var(--border-color)',
                          color: 'var(--text-primary)',
                          borderRadius: 'var(--radius-sm)',
                          fontWeight: 'var(--font-medium)',
                          textAlign: 'left'
                        }}
                      >
                        <span style={{ color: selectedRoomIds.length > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                          {selectedRoomIds.length > 0
                            ? `${selectedRoomIds.length}개 객실 선택됨`
                            : '객실 타입을 선택하세요'}
                        </span>
                        <ChevronDown className="w-5 h-5" />
                      </button>

                      {/* Dropdown Panel */}
                      {roomDropdownOpen && (
                        <div
                          className="absolute z-50 w-full mt-1 rounded-lg shadow-lg"
                          style={{
                            backgroundColor: 'var(--bg-primary)',
                            border: '1px solid var(--border-color)',
                            borderRadius: 'var(--radius)',
                            maxHeight: '320px',
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          {/* Header with Select All/Deselect All */}
                          <div
                            className="flex items-center justify-between px-4 py-3"
                            style={{
                              borderBottom: '1px solid var(--border-color)',
                              backgroundColor: 'var(--bg-secondary)'
                            }}
                          >
                            <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                              {tempSelectedRoomIds.length}/{availableRooms.length} 선택됨
                            </span>
                            <div className="flex gap-2">
                              <button
                                onClick={handleSelectAllRooms}
                                className="text-xs px-2 py-1 rounded"
                                style={{
                                  color: 'var(--primary)',
                                  fontWeight: 'var(--font-medium)'
                                }}
                              >
                                전체선택
                              </button>
                              <button
                                onClick={handleDeselectAllRooms}
                                className="text-xs px-2 py-1 rounded"
                                style={{
                                  color: 'var(--text-secondary)',
                                  fontWeight: 'var(--font-medium)'
                                }}
                              >
                                선택해제
                              </button>
                            </div>
                          </div>

                          {/* Room List with Checkboxes */}
                          <div
                            style={{
                              overflowY: 'auto',
                              flex: 1
                            }}
                          >
                            {availableRooms.map((room) => (
                              <label
                                key={room.id}
                                className="flex items-center px-4 py-3 cursor-pointer hover:bg-opacity-50"
                                style={{
                                  borderBottom: '1px solid var(--border-color)'
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = 'transparent'
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={tempSelectedRoomIds.includes(room.id)}
                                  onChange={() => handleToggleRoomInDropdown(room.id)}
                                  className="mr-3"
                                  style={{
                                    width: '18px',
                                    height: '18px',
                                    cursor: 'pointer',
                                    accentColor: 'var(--primary)'
                                  }}
                                />
                                <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                                  {room.name} <span style={{ color: 'var(--text-secondary)' }}>({room.code})</span>
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Footer with Apply/Cancel Buttons */}
                          <div
                            className="flex gap-2 px-4 py-3"
                            style={{
                              borderTop: '1px solid var(--border-color)',
                              backgroundColor: 'var(--bg-secondary)'
                            }}
                          >
                            <button
                              onClick={handleCancelRoomSelection}
                              className="flex-1 px-4 py-2 rounded-lg"
                              style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 'var(--font-medium)',
                                border: '1px solid var(--border-color)'
                              }}
                            >
                              취소
                            </button>
                            <button
                              onClick={handleApplyRoomSelection}
                              className="flex-1 px-4 py-2 rounded-lg"
                              style={{
                                backgroundColor: 'var(--primary)',
                                color: '#ffffff',
                                borderRadius: 'var(--radius-sm)',
                                fontWeight: 'var(--font-medium)'
                              }}
                            >
                              적용 ({tempSelectedRoomIds.length}개)
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

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
              </>
            )}

            {/* Room-based Selection */}
            {selectedPropertyId && criteriaType === 'room' && (
              <>
                {/* Room Multi-Select */}
                <div className="mb-4">
                  <label
                    className="block text-sm mb-2"
                    style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                  >
                    객실 타입 선택
                  </label>

                  {/* Custom Multi-Select Dropdown */}
                  <div className="relative">
                    <button
                      onClick={handleOpenRoomDropdown}
                      className="w-full px-4 py-2 rounded-lg flex items-center justify-between mb-3"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 'var(--font-medium)',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ color: selectedRoomIds.length > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
                        {selectedRoomIds.length > 0
                          ? `${selectedRoomIds.length}개 객실 선택됨`
                          : '객실 타입을 선택하세요'}
                      </span>
                      <ChevronDown className="w-5 h-5" />
                    </button>

                    {/* Dropdown Panel */}
                    {roomDropdownOpen && (
                      <div
                        className="absolute z-50 w-full mt-1 rounded-lg shadow-lg"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          border: '1px solid var(--border-color)',
                          borderRadius: 'var(--radius)',
                          maxHeight: '320px',
                          overflow: 'hidden',
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {/* Header with Select All/Deselect All */}
                        <div
                          className="flex items-center justify-between px-4 py-3"
                          style={{
                            borderBottom: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-secondary)'
                          }}
                        >
                          <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                            {tempSelectedRoomIds.length}/{availableRooms.length} 선택됨
                          </span>
                          <div className="flex gap-2">
                            <button
                              onClick={handleSelectAllRooms}
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                color: 'var(--primary)',
                                fontWeight: 'var(--font-medium)'
                              }}
                            >
                              전체선택
                            </button>
                            <button
                              onClick={handleDeselectAllRooms}
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                color: 'var(--text-secondary)',
                                fontWeight: 'var(--font-medium)'
                              }}
                            >
                              선택해제
                            </button>
                          </div>
                        </div>

                        {/* Room List with Checkboxes */}
                        <div
                          style={{
                            overflowY: 'auto',
                            flex: 1
                          }}
                        >
                          {availableRooms.map((room) => (
                            <label
                              key={room.id}
                              className="flex items-center px-4 py-3 cursor-pointer hover:bg-opacity-50"
                              style={{
                                borderBottom: '1px solid var(--border-color)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent'
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={tempSelectedRoomIds.includes(room.id)}
                                onChange={() => handleToggleRoomInDropdown(room.id)}
                                className="mr-3"
                                style={{
                                  width: '18px',
                                  height: '18px',
                                  cursor: 'pointer',
                                  accentColor: 'var(--primary)'
                                }}
                              />
                              <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                                {room.name} <span style={{ color: 'var(--text-secondary)' }}>({room.code})</span>
                              </span>
                            </label>
                          ))}
                        </div>

                        {/* Footer with Apply/Cancel Buttons */}
                        <div
                          className="flex gap-2 px-4 py-3"
                          style={{
                            borderTop: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-secondary)'
                          }}
                        >
                          <button
                            onClick={handleCancelRoomSelection}
                            className="flex-1 px-4 py-2 rounded-lg"
                            style={{
                              backgroundColor: 'var(--bg-tertiary)',
                              color: 'var(--text-primary)',
                              borderRadius: 'var(--radius-sm)',
                              fontWeight: 'var(--font-medium)',
                              border: '1px solid var(--border-color)'
                            }}
                          >
                            취소
                          </button>
                          <button
                            onClick={handleApplyRoomSelection}
                            className="flex-1 px-4 py-2 rounded-lg"
                            style={{
                              backgroundColor: 'var(--primary)',
                              color: '#ffffff',
                              borderRadius: 'var(--radius-sm)',
                              fontWeight: 'var(--font-medium)'
                            }}
                          >
                            적용 ({tempSelectedRoomIds.length}개)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

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

                {/* Package Selection */}
                {selectedRoomIds.length > 0 && (
                  <div className="mb-4">
                    <label
                      className="block text-sm mb-2"
                      style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                    >
                      패키지 선택
                    </label>
                    <select
                      value={selectedPackageId}
                      onChange={(e) => handlePackageSelect(e.target.value)}
                      className="w-full px-4 py-2 rounded-lg"
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 'var(--font-medium)'
                      }}
                    >
                      <option value="">패키지를 선택하세요</option>
                      {availablePackages.map((pkg) => (
                        <option key={pkg.id} value={pkg.id}>
                          {pkg.name} ({pkg.code})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </>
            )}

            {/* Date Range Selection */}
            {selectedPropertyId && selectedPackageId && selectedRoomIds.length > 0 && (
              <>
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
                      { label: '60일', days: 60 },
                      { label: '90일', days: 90 },
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
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleSearch}
                disabled={
                  !selectedPropertyId ||
                  !selectedPackageId ||
                  selectedRoomIds.length === 0 ||
                  !startDate ||
                  !endDate
                }
                className="flex items-center gap-2 px-6 py-2 rounded-lg transition-colors"
                style={{
                  backgroundColor: (selectedPropertyId && selectedPackageId && selectedRoomIds.length > 0 && startDate && endDate) ? 'var(--primary)' : 'var(--bg-tertiary)',
                  color: (selectedPropertyId && selectedPackageId && selectedRoomIds.length > 0 && startDate && endDate) ? '#ffffff' : 'var(--text-tertiary)',
                  borderRadius: 'var(--radius-sm)',
                  fontWeight: 'var(--font-medium)',
                  cursor: (selectedPropertyId && selectedPackageId && selectedRoomIds.length > 0 && startDate && endDate) ? 'pointer' : 'not-allowed'
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

      {/* Rate Grid Results */}
      {!showResults ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <DollarSign className="w-16 h-16 mb-4" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            조회 조건을 선택하세요
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            숙소, 패키지/객실, 조건을 선택한 후 조회 버튼을 눌러주세요
          </p>
        </div>
      ) : (
        <RateGrid
          startDate={startDate}
          endDate={endDate}
          selectedRooms={selectedRooms}
          packageName={selectedPackage?.name || ''}
        />
      )}
    </div>
  )
}