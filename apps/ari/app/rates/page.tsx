'use client'

import { DollarSign, Search, ChevronDown, ChevronUp, X, Building2, Bed, Package2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { RateGrid } from './components/RateGrid'
import { Button, DatePicker, ErrorTemplate, Input, SearchableSelect, notification } from '@creami/ui'
import {
  fetchAriPackages,
  fetchAriProperties,
  fetchAriRates,
  fetchAriRooms,
  getDisplayApiErrorMessage,
  updateAriRates,
  type AriPackage,
  type AriProperty,
  type AriRoom,
  type RateRow
} from '@/lib/api/ari'

type CriteriaType = 'package' | 'room'

export default function RatesPage() {
  const t = useTranslations()

  // Search condition state
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('')
  const [criteriaType, setCriteriaType] = useState<CriteriaType>('package')
  const [selectedPackageId, setSelectedPackageId] = useState<string>('')
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([])
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([])
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [selectedQuickRange, setSelectedQuickRange] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Room multi-select dropdown state
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false)
  const [tempSelectedRoomIds, setTempSelectedRoomIds] = useState<string[]>([])
  const [roomSearchQuery, setRoomSearchQuery] = useState('')
  const [packageDropdownOpen, setPackageDropdownOpen] = useState(false)
  const [tempSelectedPackageIds, setTempSelectedPackageIds] = useState<string[]>([])
  const [packageSearchQuery, setPackageSearchQuery] = useState('')
  const [properties, setProperties] = useState<AriProperty[]>([])
  const [availableRooms, setAvailableRooms] = useState<AriRoom[]>([])
  const [availablePackages, setAvailablePackages] = useState<AriPackage[]>([])
  const [rateRows, setRateRows] = useState<RateRow[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoadingProperties, setIsLoadingProperties] = useState(true)
  const [isSearching, setIsSearching] = useState(false)

  const loadProperties = useCallback(async (isActive: () => boolean = () => true) => {
    try {
      setIsLoadingProperties(true)
      const nextProperties = await fetchAriProperties()
      if (isActive()) {
        setProperties(nextProperties)
      }
    } catch (error) {
      if (isActive()) {
        setErrorMessage(getDisplayApiErrorMessage(error, t('ari.rates.emptyDescription')))
      }
    } finally {
      if (isActive()) {
        setIsLoadingProperties(false)
      }
    }
  }, [t])

  const loadPropertyOptions = useCallback(async (isActive: () => boolean = () => true) => {
    if (!selectedPropertyId) {
      setAvailableRooms([])
      setAvailablePackages([])
      return
    }

    try {
      const [nextRooms, nextPackages] = await Promise.all([
        fetchAriRooms(selectedPropertyId),
        fetchAriPackages(selectedPropertyId)
      ])
      if (isActive()) {
        setAvailableRooms(nextRooms)
        setAvailablePackages(nextPackages)
      }
    } catch (error) {
      if (isActive()) {
        setErrorMessage(getDisplayApiErrorMessage(error, t('ari.rates.emptyDescription')))
      }
    }
  }, [selectedPropertyId, t])

  useEffect(() => {
    let active = true

    loadProperties(() => active)

    return () => {
      active = false
    }
  }, [loadProperties])

  useEffect(() => {
    let active = true

    loadPropertyOptions(() => active)

    return () => {
      active = false
    }
  }, [loadPropertyOptions])

  const propertyOptions = properties.map((property) => ({
    value: property.id,
    label: `${property.id} / ${property.name}`,
    searchText: `${property.id} ${property.name} ${property.code}`
  }))

  const packageOptions = availablePackages.map((pkg) => ({
    value: pkg.id,
    label: `${pkg.id} / ${pkg.name}`,
    searchText: `${pkg.id} ${pkg.name} ${pkg.code}`
  }))

  const roomOptions = availableRooms.map((room) => ({
    value: room.id,
    label: `${room.id} / ${room.name}`,
    searchText: `${room.id} ${room.name} ${room.code}`
  }))

  const filteredRooms = availableRooms.filter((room) => {
    const query = roomSearchQuery.trim().toLowerCase()

    if (!query) {
      return true
    }

    return `${room.id} ${room.name} ${room.code}`.toLowerCase().includes(query)
  })

  const filteredPackages = availablePackages.filter((pkg) => {
    const query = packageSearchQuery.trim().toLowerCase()

    if (!query) {
      return true
    }

    return `${pkg.id} ${pkg.name} ${pkg.code}`.toLowerCase().includes(query)
  })

  // Get selected data for display
  const selectedRooms = availableRooms.filter(room => selectedRoomIds.includes(room.id))
  const selectedPackage = availablePackages.find(pkg => pkg.id === selectedPackageId)
  const selectedPackages = availablePackages.filter(pkg => selectedPackageIds.includes(pkg.id))
  const selectedProperty = properties.find(p => p.id === selectedPropertyId)
  const resultRows = criteriaType === 'package'
    ? selectedRooms
    : selectedPackages.map((pkg) => ({ id: pkg.id, name: pkg.name }))
  const resultContextName = criteriaType === 'package'
    ? selectedPackage?.name || ''
    : selectedRooms[0]?.name || ''
  const activeRatePlanPricing = criteriaType === 'package'
    ? selectedPackage
    : selectedPackages[0]

  // Handlers
  const handlePropertyChange = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setSelectedPackageId('')
    setSelectedPackageIds([])
    setSelectedRoomIds([])
    setRoomSearchQuery('')
    setPackageSearchQuery('')
    setRateRows([])
    setShowResults(false)
    setIsCollapsed(false)
  }

  const handleCriteriaTypeChange = (type: CriteriaType) => {
    setCriteriaType(type)
    setSelectedPackageId('')
    setSelectedPackageIds([])
    setSelectedRoomIds([])
    setRoomSearchQuery('')
    setPackageSearchQuery('')
    setRateRows([])
    setShowResults(false)
    setIsCollapsed(false)
  }

  const handlePackageSelect = (packageId: string) => {
    setSelectedPackageId(packageId)
  }

  const handleRoomSelect = (roomId: string) => {
    if (!selectedRoomIds.includes(roomId)) {
      setSelectedRoomIds([...selectedRoomIds, roomId])
    }
  }

  const handleSingleRoomSelect = (roomId: string) => {
    setSelectedRoomIds(roomId ? [roomId] : [])
  }

  const handleRoomRemove = (roomId: string) => {
    setSelectedRoomIds(selectedRoomIds.filter(id => id !== roomId))
  }

  // Room multi-select dropdown handlers
  const handleOpenRoomDropdown = () => {
    if (!selectedPropertyId) {
      return
    }

    setTempSelectedRoomIds([...selectedRoomIds])
    setRoomSearchQuery('')
    setRoomDropdownOpen(true)
  }

  const handleOpenPackageDropdown = () => {
    if (!selectedPropertyId) {
      return
    }

    setTempSelectedPackageIds([...selectedPackageIds])
    setPackageSearchQuery('')
    setPackageDropdownOpen(true)
  }

  const handleToggleRoomInDropdown = (roomId: string) => {
    if (tempSelectedRoomIds.includes(roomId)) {
      setTempSelectedRoomIds(tempSelectedRoomIds.filter(id => id !== roomId))
    } else {
      setTempSelectedRoomIds([...tempSelectedRoomIds, roomId])
    }
  }

  const handleTogglePackageInDropdown = (packageId: string) => {
    if (tempSelectedPackageIds.includes(packageId)) {
      setTempSelectedPackageIds(tempSelectedPackageIds.filter(id => id !== packageId))
    } else {
      setTempSelectedPackageIds([...tempSelectedPackageIds, packageId])
    }
  }

  const handleApplyRoomSelection = () => {
    setSelectedRoomIds([...tempSelectedRoomIds])
    setRoomDropdownOpen(false)
  }

  const handleApplyPackageSelection = () => {
    setSelectedPackageIds([...tempSelectedPackageIds])
    setPackageDropdownOpen(false)
  }

  const handleCancelRoomSelection = () => {
    setRoomDropdownOpen(false)
  }

  const handleCancelPackageSelection = () => {
    setPackageDropdownOpen(false)
  }

  const handleSelectAllRooms = () => {
    setTempSelectedRoomIds(availableRooms.map(room => room.id))
  }

  const handleSelectAllPackages = () => {
    setTempSelectedPackageIds(availablePackages.map(pkg => pkg.id))
  }

  const handleDeselectAllRooms = () => {
    setTempSelectedRoomIds([])
  }

  const handleDeselectAllPackages = () => {
    setTempSelectedPackageIds([])
  }

  // Quick date range selection
  const handleQuickDateSelect = (days: number) => {
    const today = new Date()
    const end = new Date()
    end.setDate(today.getDate() + days)

    setStartDate(today.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
    setSelectedQuickRange(days)
  }

  const handleSearch = async () => {
    const isPackageBased = criteriaType === 'package' && selectedPackageId && selectedRoomIds.length > 0
    const isRoomBased = criteriaType === 'room' && selectedRoomIds.length === 1 && selectedPackageIds.length > 0

    if (selectedPropertyId && (isPackageBased || isRoomBased) && startDate && endDate) {
      try {
        setIsSearching(true)
        setErrorMessage('')
        const matrix = await fetchAriRates({
          propertyId: selectedPropertyId,
          criteriaType,
          packageId: criteriaType === 'package' ? selectedPackageId : undefined,
          roomId: criteriaType === 'room' ? selectedRoomIds[0] : undefined,
          roomIds: criteriaType === 'package' ? selectedRoomIds : undefined,
          packageIds: criteriaType === 'room' ? selectedPackageIds : undefined,
          startDate,
          endDate
        })
        setRateRows(matrix.rows)
        setShowResults(true)
        setIsCollapsed(true)
      } catch (error) {
        setErrorMessage(getDisplayApiErrorMessage(error, t('ari.rates.emptyDescription')))
      } finally {
        setIsSearching(false)
      }
    }
  }

  const handleRetry = () => {
    setErrorMessage('')

    if (!properties.length) {
      void loadProperties()
      return
    }

    if (selectedPropertyId && (!availableRooms.length || !availablePackages.length)) {
      void loadPropertyOptions()
      return
    }

    if (showResults) {
      void handleSearch()
    }
  }

  const handleSaveRateUpdates = async (updates: { rowId: string; date: string; rate: number }[]) => {
    try {
      await updateAriRates(
        selectedPropertyId,
        updates.map(update => ({
          roomId: criteriaType === 'package' ? update.rowId : selectedRoomIds[0],
          packageId: criteriaType === 'package' ? selectedPackageId : update.rowId,
          date: update.date,
          rate: update.rate
        }))
      )
    } catch (error) {
      notification.error({
        message: getDisplayApiErrorMessage(error, t('ari.rates.emptyDescription')),
        placement: 'top-right',
        direction: 'right'
      })
      throw error
    }
  }

  const handleReset = () => {
    setSelectedPropertyId('')
    setSelectedPackageId('')
    setSelectedPackageIds([])
    setSelectedRoomIds([])
    setStartDate('')
    setEndDate('')
    setSelectedQuickRange(null)
    setRoomSearchQuery('')
    setPackageSearchQuery('')
    setShowResults(false)
    setIsCollapsed(false)
    setRateRows([])
    setErrorMessage('')
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const roomSelector = (
    <div className="flex flex-col gap-sm">
      <label
        className="block text-base"
        style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
      >
        {t('ari.rates.roomSelect')}
      </label>

      <div className="relative">
        <Button
          onClick={handleOpenRoomDropdown}
          variant="secondary"
          disabled={!selectedPropertyId}
          className="w-full justify-between"
        >
          <span style={{ color: selectedRoomIds.length > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
            {selectedRoomIds.length > 0
              ? t('ari.rates.selectedRooms', { count: selectedRoomIds.length })
              : t('ari.rates.roomPlaceholder')}
          </span>
          <ChevronDown className="h-lg w-lg" />
        </Button>

        {roomDropdownOpen && (
          <div
            className="absolute z-50 mt-xs w-full rounded shadow-lg"
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
            <div
              className="flex items-center justify-between px-md py-sm"
              style={{
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                {t('ari.common.selectedOfTotal', { selected: tempSelectedRoomIds.length, total: availableRooms.length })}
              </span>
              <div className="flex gap-sm">
                <Button
                  onClick={handleSelectAllRooms}
                  variant="tertiary"
                  size="sm"
                  style={{ color: 'var(--primary)' }}
                >
                  {t('ari.common.selectAll')}
                </Button>
                <Button
                  onClick={handleDeselectAllRooms}
                  variant="tertiary"
                  size="sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('ari.common.deselectAll')}
                </Button>
              </div>
            </div>

            <div className="px-md py-sm" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <Input
                value={roomSearchQuery}
                onChange={(event) => setRoomSearchQuery(event.target.value)}
                placeholder={t('ari.rates.roomSearchPlaceholder')}
                showSearchIcon
              />
            </div>

            <div
              style={{
                overflowY: 'auto',
                flex: 1
              }}
            >
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <label
                    key={room.id}
                    className="flex cursor-pointer items-center px-md py-sm hover:bg-opacity-50"
                    style={{
                      borderBottom: '1px solid var(--border-color)'
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <Input
                      type="checkbox"
                      checked={tempSelectedRoomIds.includes(room.id)}
                      onChange={() => handleToggleRoomInDropdown(room.id)}
                      className="mr-sm"
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: 'var(--primary)'
                      }}
                    />
                    <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {room.id} / {room.name}
                    </span>
                  </label>
                ))
              ) : (
                <div className="rounded py-sm text-center text-base" style={{ color: 'var(--text-tertiary)' }}>
                  {t('ari.common.noSearchResults')}
                </div>
              )}
            </div>

            <div
              className="flex gap-sm px-md py-sm"
              style={{
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <Button
                onClick={handleCancelRoomSelection}
                variant="secondary"
                className="flex-1"
              >
                {t('ari.common.cancel')}
              </Button>
              <Button
                onClick={handleApplyRoomSelection}
                variant="primary"
                className="flex-1"
              >
                {t('ari.common.applyCount', { count: tempSelectedRoomIds.length })}
              </Button>
            </div>
          </div>
        )}
      </div>

      {selectedRooms.length > 0 && (
        <div className="flex flex-wrap gap-sm">
          {selectedRooms.map((room) => (
            <div
              key={room.id}
              className="flex items-center gap-sm rounded px-sm py-xs"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <span className="text-base">{room.name}</span>
              <Button
                onClick={() => handleRoomRemove(room.id)}
                variant="tertiary"
                size="sm"
                className="bg-transparent p-none transition-opacity hover:opacity-80"
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
          {t('ari.rates.noSelectedRooms')}
        </div>
      )}
    </div>
  )

  const packageSelector = (
    <div>
      <label
        className="mb-sm block text-base"
        style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
      >
        {t('ari.rates.packageSelect')}
      </label>
      <SearchableSelect
        value={selectedPackageId}
        onChange={handlePackageSelect}
        options={packageOptions}
        placeholder={t('ari.rates.packagePlaceholder')}
        searchPlaceholder={t('ari.rates.packageSearchPlaceholder')}
        disabled={!selectedPropertyId}
      />
    </div>
  )

  const singleRoomSelector = (
    <div>
      <label
        className="mb-sm block text-base"
        style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
      >
        {t('ari.rates.roomSelect')}
      </label>
      <SearchableSelect
        value={selectedRoomIds[0] || ''}
        onChange={handleSingleRoomSelect}
        options={roomOptions}
        placeholder={t('ari.rates.roomPlaceholder')}
        searchPlaceholder={t('ari.rates.roomSearchPlaceholder')}
        disabled={!selectedPropertyId}
      />
    </div>
  )

  const packageMultiSelector = (
    <div className="flex flex-col gap-sm">
      <label
        className="block text-base"
        style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
      >
        {t('ari.rates.packageSelect')}
      </label>

      <div className="relative">
        <Button
          onClick={handleOpenPackageDropdown}
          variant="secondary"
          disabled={!selectedPropertyId}
          className="w-full justify-between"
        >
          <span style={{ color: selectedPackageIds.length > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
            {selectedPackageIds.length > 0
              ? t('ari.rates.selectedPackages', { count: selectedPackageIds.length })
              : t('ari.rates.packagePlaceholder')}
          </span>
          <ChevronDown className="h-lg w-lg" />
        </Button>

        {packageDropdownOpen && (
          <div
            className="absolute z-50 mt-xs w-full rounded shadow-lg"
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
            <div
              className="flex items-center justify-between px-md py-sm"
              style={{
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                {t('ari.common.selectedOfTotal', { selected: tempSelectedPackageIds.length, total: availablePackages.length })}
              </span>
              <div className="flex gap-sm">
                <Button
                  onClick={handleSelectAllPackages}
                  variant="tertiary"
                  size="sm"
                  style={{ color: 'var(--primary)' }}
                >
                  {t('ari.common.selectAll')}
                </Button>
                <Button
                  onClick={handleDeselectAllPackages}
                  variant="tertiary"
                  size="sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {t('ari.common.deselectAll')}
                </Button>
              </div>
            </div>

            <div className="px-md py-sm" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <Input
                value={packageSearchQuery}
                onChange={(event) => setPackageSearchQuery(event.target.value)}
                placeholder={t('ari.rates.packageSearchPlaceholder')}
                showSearchIcon
              />
            </div>

            <div
              style={{
                overflowY: 'auto',
                flex: 1
              }}
            >
              {filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <label
                    key={pkg.id}
                    className="flex cursor-pointer items-center px-md py-sm hover:bg-opacity-50"
                    style={{
                      borderBottom: '1px solid var(--border-color)'
                    }}
                    onMouseEnter={(event) => {
                      event.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'
                    }}
                    onMouseLeave={(event) => {
                      event.currentTarget.style.backgroundColor = 'transparent'
                    }}
                  >
                    <Input
                      type="checkbox"
                      checked={tempSelectedPackageIds.includes(pkg.id)}
                      onChange={() => handleTogglePackageInDropdown(pkg.id)}
                      className="mr-sm"
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: 'var(--primary)'
                      }}
                    />
                    <span style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
                      {pkg.id} / {pkg.name}
                    </span>
                  </label>
                ))
              ) : (
                <div className="rounded py-sm text-center text-base" style={{ color: 'var(--text-tertiary)' }}>
                  {t('ari.common.noSearchResults')}
                </div>
              )}
            </div>

            <div
              className="flex gap-sm px-md py-sm"
              style={{
                borderTop: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)'
              }}
            >
              <Button
                onClick={handleCancelPackageSelection}
                variant="secondary"
                className="flex-1"
              >
                {t('ari.common.cancel')}
              </Button>
              <Button
                onClick={handleApplyPackageSelection}
                variant="primary"
                className="flex-1"
              >
                {t('ari.common.applyCount', { count: tempSelectedPackageIds.length })}
              </Button>
            </div>
          </div>
        )}
      </div>

      {selectedPackages.length > 0 && (
        <div className="flex flex-wrap gap-sm">
          {selectedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center gap-sm rounded px-sm py-xs"
              style={{
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                borderRadius: 'var(--radius)',
                fontWeight: 'var(--font-medium)'
              }}
            >
              <span className="text-base">{pkg.name}</span>
              <Button
                onClick={() => setSelectedPackageIds(selectedPackageIds.filter(id => id !== pkg.id))}
                variant="tertiary"
                size="sm"
                className="bg-transparent p-none transition-opacity hover:opacity-80"
              >
                <X className="h-md w-md" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {selectedPackages.length === 0 && (
        <div
          className="rounded py-sm text-center text-base"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-tertiary)',
            borderRadius: 'var(--radius)'
          }}
        >
          {t('ari.rates.noSelectedPackages')}
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-md">
          <DollarSign className="h-lg w-lg" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {t('ari.rates.title')}
          </h1>
        </div>
      </div>

      {errorMessage && (
        <ErrorTemplate
          title={t('ari.common.errorTitle')}
          description={errorMessage || t('ari.common.errorDescription')}
          retryLabel={t('ari.common.retry')}
          onRetry={handleRetry}
          className="items-start text-left"
        />
      )}

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
              <div
                className="flex flex-wrap items-center gap-md text-base"
                style={{
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-light)'
                }}
              >
                {/* Property */}
                <div className="flex items-center gap-xs">
                  <Building2 className="h-md w-md" style={{ color: '#3b82f6' }} />
                  <span style={{ fontWeight: 'var(--font-medium)' }}>{selectedProperty.name}</span>
                </div>

                {/* Package */}
                {criteriaType === 'package' && selectedPackage && (
                  <div className="flex items-center gap-xs">
                    <Package2 className="h-md w-md" style={{ color: '#8b5cf6' }} />
                    <span>{selectedPackage.name}</span>
                  </div>
                )}

                {criteriaType === 'room' && selectedPackages.length > 0 && (
                  <div className="flex items-center gap-xs">
                    <Package2 className="h-md w-md" style={{ color: '#8b5cf6' }} />
                    <span>{selectedPackages.map(pkg => pkg.name).join(', ')}</span>
                  </div>
                )}

                {/* Rooms */}
                {selectedRooms.length > 0 && (
                  <div className="flex items-center gap-xs">
                    <Bed className="h-md w-md" style={{ color: '#10b981' }} />
                    <span>{selectedRooms.map(r => r.name).join(', ')}</span>
                  </div>
                )}

                {/* Date Range */}
                {startDate && endDate && (
                  <div className="flex items-center gap-xs">
                    <span>📅</span>
                    <span>{startDate} ~ {endDate}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          <Button
            variant="secondary"
            size="sm"
            iconOnly
          >
            {isCollapsed ? <ChevronDown className="h-lg w-lg" /> : <ChevronUp className="h-lg w-lg" />}
          </Button>
        </div>

        {/* Panel Content */}
        {!isCollapsed && (
          <div className="flex flex-col gap-lg p-lg pt-md">
            {/* Criteria Type Selection */}
            <div className="flex flex-wrap items-end justify-between gap-md">
              <div>
                <label
                  className="mb-sm block text-base"
                  style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                >
                  {t('ari.rates.criteriaType')}
                </label>
                <div className="flex gap-sm">
                  <Button
                    onClick={() => handleCriteriaTypeChange('package')}
                    variant={criteriaType === 'package' ? 'primary' : 'tertiary'}
                    size="sm"
                  >
                    {t('ari.rates.packageCriteria')}
                  </Button>
                  <Button
                    onClick={() => handleCriteriaTypeChange('room')}
                    variant={criteriaType === 'room' ? 'primary' : 'tertiary'}
                    size="sm"
                  >
                    {t('ari.rates.roomCriteria')}
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-sm">
                {[
                  { label: t('ari.common.days', { count: 30 }), days: 30 },
                  { label: t('ari.common.days', { count: 60 }), days: 60 },
                  { label: t('ari.common.days', { count: 90 }), days: 90 },
                  { label: t('ari.common.days', { count: 365 }), days: 365 }
                ].map(({ label, days }) => (
                  <Button
                    key={days}
                    onClick={() => handleQuickDateSelect(days)}
                    variant={selectedQuickRange === days ? 'primary' : 'tertiary'}
                    size="sm"
                  >
                    {label}
                  </Button>
                ))}
                <Button
                  onClick={handleSearch}
                  disabled={
                    isSearching ||
                    !selectedPropertyId ||
                    (criteriaType === 'package' ? !selectedPackageId : selectedPackageIds.length === 0) ||
                    (criteriaType === 'package' ? selectedRoomIds.length === 0 : selectedRoomIds.length !== 1) ||
                    !startDate ||
                    !endDate
                  }
                  variant="primary"
                  size="sm"
                >
                  <Search className="h-md w-md" />
                  {isSearching ? '조회 중' : t('ari.common.search')}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-md lg:grid-cols-3">
              <div>
                <label
                  className="mb-sm block text-base"
                  style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
                >
                  {t('ari.rates.propertySelect')}
                </label>
                <SearchableSelect
                  value={selectedPropertyId}
                  onChange={handlePropertyChange}
                  options={propertyOptions}
                  placeholder={t('ari.rates.propertyPlaceholder')}
                  searchPlaceholder={t('ari.rates.propertySearchPlaceholder')}
                  disabled={isLoadingProperties}
                />
              </div>

              {criteriaType === 'package' ? (
                <>
                  {packageSelector}
                  {roomSelector}
                </>
              ) : (
                <>
                  {singleRoomSelector}
                  {packageMultiSelector}
                </>
              )}
            </div>

            {/* Date Range Selection */}
            {selectedPropertyId &&
              (criteriaType === 'package' ? selectedPackageId : selectedPackageIds.length > 0) &&
              (criteriaType === 'package' ? selectedRoomIds.length > 0 : selectedRoomIds.length === 1) && (
              <>
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
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-md pt-sm">
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

      {/* Rate Grid Results */}
      {!showResults ? (
        <div
          className="flex flex-col items-center justify-center gap-sm rounded py-3xl"
          style={{
            backgroundColor: 'var(--bg-primary)',
            borderRadius: 'var(--radius)',
            border: '2px dashed var(--border-color)'
          }}
        >
          <DollarSign className="h-3xl w-3xl" style={{ color: 'var(--text-tertiary)' }} />
          <h3 className="text-xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            {t('ari.common.selectConditions')}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
            {t('ari.rates.emptyDescription')}
          </p>
        </div>
      ) : (
        <RateGrid
          startDate={startDate}
          endDate={endDate}
          selectedRooms={resultRows}
          packageName={resultContextName}
          initialRows={rateRows}
          onSaveRates={handleSaveRateUpdates}
          rowHeaderLabel={criteriaType === 'package' ? t('ari.rates.rowHeaderRoomType') : t('ari.rates.rowHeaderPackage')}
          bulkTargetLabel={criteriaType === 'package' ? t('ari.rates.bulkTargetRoom') : t('ari.rates.bulkTargetPackage')}
          ratePlanPricing={activeRatePlanPricing}
        />
      )}
    </div>
  )
}
