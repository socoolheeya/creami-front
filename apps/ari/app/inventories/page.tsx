'use client'

import { Package, Search, ChevronDown, ChevronUp, X, Calendar, Building2, DoorOpen } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { mockProperties } from '@/lib/data/mock-properties'
import { mockRoomTypes } from '@/lib/data/mock-rooms'
import { mockBlocks } from '@/lib/data/mock-blocks'
import { InventoryCalendar } from './components/InventoryCalendar'
import { InventoryGrid } from './components/InventoryGrid'
import { Button, DatePicker, Input, SearchableSelect, ViewToggle } from '@creami/ui'

type ViewType = 'calendar' | 'grid'

export default function InventoriesPage() {
  const t = useTranslations()
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [selectedQuickRange, setSelectedQuickRange] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [viewType, setViewType] = useState<ViewType>('grid')

  // Filter properties by search query (ID or name)
  const filteredProperties = searchQuery
    ? mockProperties.filter(p =>
        p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockProperties

  // Get available room types for selected property
  const availableRooms = selectedPropertyId
    ? mockRoomTypes.filter(room => room.propertyId === selectedPropertyId)
    : []

  const roomOptions = availableRooms
    .filter(room => !selectedRoomIds.includes(room.id))
    .map((room) => ({
      value: room.id,
      label: `${room.id} / ${room.name}`,
      searchText: `${room.id} ${room.name} ${room.code}`
    }))

  // Get selected room names
  const selectedRooms = mockRoomTypes.filter(room => selectedRoomIds.includes(room.id))

  // Quick date range selection
  const handleQuickDateSelect = (days: number) => {
    const today = new Date()
    const end = new Date()
    end.setDate(today.getDate() + days)

    setStartDate(today.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
    setSelectedQuickRange(days)
  }

  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setSelectedRoomIds([]) // Reset room selection when property changes
    // Update search query with selected property name
    const property = mockProperties.find(p => p.id === propertyId)
    if (property) {
      setSearchQuery(property.name)
    }
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
    setSearchQuery('')
    setSelectedRoomIds([])
    setStartDate('')
    setEndDate('')
    setSelectedQuickRange(null)
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
    <div className="flex flex-col gap-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <Package className="h-lg w-lg" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {t('ari.inventories.title')}
          </h1>
        </div>
      </div>

      {/* Selection Panel */}
      <div
        className="rounded"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* Panel Header */}
        <div
          className="flex cursor-pointer items-center justify-between p-lg"
          onClick={toggleCollapse}
          style={{
            borderBottom: isCollapsed ? 'none' : '1px solid var(--border-color)'
          }}
        >
          <div className="flex-1">
            <h2 className="mb-xs text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
              {t('ari.common.searchConditions')}
            </h2>
            {showResults && selectedProperty && isCollapsed && (
              <div className="flex flex-wrap items-center gap-md text-base">
                <div className="flex items-center gap-sm">
                  <Building2 className="h-md w-md" style={{ color: 'var(--primary)' }} />
                  <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--primary)' }}>
                    {selectedProperty.name}
                  </span>
                </div>
                {selectedRooms.length > 0 && (
                  <div className="flex items-center gap-sm">
                    <DoorOpen className="h-md w-md" style={{ color: '#4ade80' }} />
                    <span style={{ color: '#4ade80', fontWeight: 'var(--font-medium)' }}>
                      {selectedRooms.map(r => r.name).join(', ')}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-sm">
                  <Calendar className="h-md w-md" style={{ color: 'var(--text-secondary)' }} />
                  <span style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
                    {startDate} ~ {endDate}
                  </span>
                </div>
              </div>
            )}
          </div>
          <Button variant="secondary" size="sm" iconOnly>
            {isCollapsed ? <ChevronDown className="h-lg w-lg" /> : <ChevronUp className="h-lg w-lg" />}
          </Button>
        </div>

        {/* Panel Content */}
        {!isCollapsed && (
          <div className="flex flex-col gap-lg p-lg pt-md">
            {/* Property Search */}
            <div>
              <label
                className="mb-sm block text-base"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                {t('ari.inventories.propertySearch')}
              </label>

              {/* Search Input */}
              <div className="relative">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('ari.inventories.propertySearchPlaceholder')}
                  showSearchIcon
                />
              </div>

              {searchQuery && filteredProperties.length === 0 && (
                <div className="mt-sm text-base" style={{ color: 'var(--text-tertiary)' }}>
                  {t('ari.common.noSearchResults')}
                </div>
              )}

              {searchQuery && filteredProperties.length > 0 && (
                <div
                  className="mt-sm overflow-hidden rounded"
                  style={{
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    maxHeight: '200px',
                    overflowY: 'auto'
                  }}
                >
                  {filteredProperties.map((property) => (
                    <div
                      key={property.id}
                      onClick={() => handlePropertyChange(property.id)}
                      className="cursor-pointer px-md py-sm transition-colors"
                      style={{
                        backgroundColor: selectedPropertyId === property.id ? 'var(--primary-bg)' : 'transparent',
                        borderLeft: selectedPropertyId === property.id ? '3px solid var(--primary)' : '3px solid transparent',
                        borderBottom: '1px solid var(--border-color)'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedPropertyId !== property.id) {
                          e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedPropertyId !== property.id) {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }
                      }}
                    >
                      <div style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                        {property.id} / {property.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Room Type Selection */}
            {selectedPropertyId && (
              <div className="flex flex-col gap-sm">
                <label
                  className="block text-base"
                  style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                >
                  {t('ari.inventories.roomSelect')}
                </label>

                {/* Room Selector */}
                <SearchableSelect
                  value=""
                  onChange={handleRoomSelect}
                  options={roomOptions}
                  placeholder={t('ari.inventories.roomPlaceholder')}
                  searchPlaceholder={t('ari.inventories.roomSearchPlaceholder')}
                />

                {/* Selected Room Tags */}
                {selectedRooms.length > 0 && (
                  <div className="flex flex-wrap gap-sm">
                    {selectedRooms.map((room) => (
                      <div
                        key={room.id}
                        className="flex items-center gap-sm rounded px-sm py-xs text-base"
                        style={{
                          backgroundColor: 'var(--primary)',
                          color: '#ffffff',
                          borderRadius: 'var(--radius)'
                        }}
                      >
                        <span>{room.name}</span>
                        <Button
                          onClick={() => handleRoomRemove(room.id)}
                          variant="tertiary"
                          size="mini"
                          iconOnly
                          className="bg-transparent"
                        >
                          <X className="h-md w-md" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                {selectedRooms.length === 0 && (
                  <div
                    className="rounded py-sm text-center text-base"
                    style={{
                      backgroundColor: 'var(--bg-secondary)',
                      color: 'var(--text-tertiary)',
                      borderRadius: 'var(--radius)'
                    }}
                  >
                    {t('ari.inventories.noSelectedRooms')}
                  </div>
                )}
              </div>
            )}

            {/* Date Range Selection */}
            <div>
              <label
                className="mb-sm block text-base"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                {t('ari.common.selectPeriod')}
              </label>
              <div className="grid grid-cols-1 gap-md md:grid-cols-2">
                <DatePicker
                  label={t('ari.common.startDate')}
                  value={startDate}
                  onChange={setStartDate}
                  placeholder={t('ari.common.selectStartDate')}
                />
                <DatePicker
                  label={t('ari.common.endDate')}
                  value={endDate}
                  onChange={setEndDate}
                  placeholder={t('ari.common.selectEndDate')}
                  align="right"
                />
              </div>
            </div>

            {/* Quick Date Range Buttons */}
            <div>
              <label
                className="mb-sm block text-base"
                style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
              >
                {t('ari.common.quickPeriod')}
              </label>
              <div className="flex flex-wrap gap-sm">
                {[
                  { label: t('ari.common.days', { count: 30 }), days: 30 },
                  { label: t('ari.common.days', { count: 90 }), days: 90 },
                  { label: t('ari.common.days', { count: 180 }), days: 180 },
                  { label: t('ari.common.days', { count: 365 }), days: 365 }
                ].map(({ label, days }) => (
                  <Button
                    key={days}
                    onClick={() => handleQuickDateSelect(days)}
                    variant={selectedQuickRange === days ? 'primary' : 'tertiary'}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-md pt-sm">
              <Button
                onClick={handleSearch}
                disabled={!selectedPropertyId || selectedRoomIds.length === 0 || !startDate || !endDate}
                variant="primary"
              >
                <Search className="w-lg h-lg" />
                {t('ari.common.search')}
              </Button>

              {showResults && (
                <Button
                  onClick={handleReset}
                  variant="secondary"
                >
                  {t('ari.common.reset')}
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* View Type Toggle */}
      {showResults && selectedProperty && (
        <div className="flex justify-end">
          <ViewToggle
            view={viewType === 'grid' ? 'grid' : 'table'}
            onViewChange={(view) => setViewType(view === 'grid' ? 'grid' : 'calendar')}
          />
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
          className="flex flex-col items-center justify-center gap-sm rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <Package className="h-3xl w-3xl" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {t('ari.common.selectConditions')}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            {t('ari.inventories.emptyDescription')}
          </p>
        </div>
      )}
    </div>
  )
}
