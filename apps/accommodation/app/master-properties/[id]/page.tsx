'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import type { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Building2,
  Hotel,
  MapPin,
  Save,
  Search,
  Star,
  Trash2
} from 'lucide-react'
import { Button, Card, Input, Select, TimeRangePicker, notifySaveError, notifySaveSuccess } from '@creami/ui'
import {
  useProperties,
  usePropertyMappings,
  useSavePropertyMappings
} from '@/hooks/useProperties'
import { useParentProperty, useSaveParentProperty } from '@/hooks/useParentProperties'
import { ErrorTemplate } from '@/components/common/ErrorTemplate'
import type { Property } from '@/lib/types/property'
import {
  getAddressDetail,
  getAddressText,
  getCountryCode,
  getCity,
  getLatitude,
  getLongitude,
  getParentPropertyId,
  getStatusLabel,
  getTypeLabel,
  parentPropertyStatusOptions,
  parentPropertyTypeOptions,
  type ParentPropertyDto,
  type ParentPropertyStatus,
  type ParentPropertyType
} from '@/lib/types/parent-property'

type MasterPropertyForm = {
  name: string
  enName: string
  status: ParentPropertyStatus
  type: ParentPropertyType
  stars: number
  address: string
  addressDetail: string
  city: string
  countryCode: string
  zipCode: string
  latitude: number
  longitude: number
  checkIn: string
  checkOut: string
  floorCount: number
  roomCount: number
  language: string
}

type MasterPropertyFormSetter = Dispatch<SetStateAction<MasterPropertyForm>>

type Coordinate = {
  latitude: number
  longitude: number
}

type GoogleMapMouseEvent = {
  latLng?: {
    lat: () => number
    lng: () => number
  }
}

type GoogleMapListener = {
  remove: () => void
}

type GoogleMapInstance = {
  addListener: (
    eventName: 'click',
    handler: (event: GoogleMapMouseEvent) => void
  ) => GoogleMapListener
}

type GoogleMarkerInstance = {
  setPosition: (position: { lat: number; lng: number }) => void
}

type GoogleMapsApi = {
  maps: {
    Map: new (
      element: HTMLElement,
      options: {
        center: { lat: number; lng: number }
        zoom: number
        mapTypeControl: boolean
        streetViewControl: boolean
        fullscreenControl: boolean
      }
    ) => GoogleMapInstance
    Marker: new (options: {
      position: { lat: number; lng: number }
      map: GoogleMapInstance
    }) => GoogleMarkerInstance
  }
}

declare global {
  interface Window {
    google?: GoogleMapsApi
    __creamiGoogleMapsLoading?: Promise<void>
  }
}

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
const starOptions = [1, 2, 3, 4, 5]

const defaultForm: MasterPropertyForm = {
  name: '',
  enName: '',
  status: 'DRAFT',
  type: 'HOTEL',
  stars: 0,
  address: '',
  addressDetail: '',
  city: '',
  countryCode: 'KR',
  zipCode: '',
  latitude: 37.5665,
  longitude: 126.978,
  checkIn: '15:00',
  checkOut: '11:00',
  floorCount: 0,
  roomCount: 0,
  language: ''
}

function loadGoogleMapsScript(apiKey: string) {
  if (window.google?.maps) {
    return Promise.resolve()
  }

  if (!window.__creamiGoogleMapsLoading) {
    window.__creamiGoogleMapsLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`
      script.async = true
      script.defer = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Google Maps script load failed'))
      document.head.appendChild(script)
    })
  }

  return window.__creamiGoogleMapsLoading
}

function GoogleMapPicker({
  latitude,
  longitude,
  onSelect
}: Coordinate & { onSelect: (coordinate: Coordinate) => void }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<GoogleMarkerInstance | null>(null)
  const [mapStatus, setMapStatus] = useState<'idle' | 'ready' | 'error'>(
    googleMapsApiKey ? 'idle' : 'error'
  )

  useEffect(() => {
    if (!googleMapsApiKey || !mapRef.current) {
      return
    }

    let listener: GoogleMapListener | null = null
    let isMounted = true

    loadGoogleMapsScript(googleMapsApiKey)
      .then(() => {
        if (!isMounted || !window.google?.maps || !mapRef.current) {
          return
        }

        const position = { lat: latitude, lng: longitude }
        const map = new window.google.maps.Map(mapRef.current, {
          center: position,
          zoom: 16,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false
        })
        const marker = new window.google.maps.Marker({ position, map })

        listener = map.addListener('click', (event) => {
          if (!event.latLng) {
            return
          }

          onSelect({
            latitude: Number(event.latLng.lat().toFixed(6)),
            longitude: Number(event.latLng.lng().toFixed(6))
          })
        })

        markerRef.current = marker
        setMapStatus('ready')
      })
      .catch(() => {
        if (isMounted) {
          setMapStatus('error')
        }
      })

    return () => {
      isMounted = false
      listener?.remove()
    }
  }, [latitude, longitude, onSelect])

  useEffect(() => {
    markerRef.current?.setPosition({ lat: latitude, lng: longitude })
  }, [latitude, longitude])

  if (!googleMapsApiKey) {
    return (
      <div className="flex h-modal-sm items-center justify-center rounded border border-border bg-bg-primary p-lg text-center text-base font-light text-text-tertiary">
        Google Maps API 키가 설정되지 않아 좌표는 직접 입력으로 관리합니다.
      </div>
    )
  }

  return (
    <div>
      <div ref={mapRef} className="h-modal-sm rounded border border-border bg-bg-primary" />
      {mapStatus !== 'ready' && (
        <div className="mt-sm rounded border border-border bg-bg-primary p-md text-center text-base font-light text-text-tertiary">
          {mapStatus === 'error' ? 'Google 지도를 불러올 수 없습니다.' : 'Google 지도를 불러오는 중입니다.'}
        </div>
      )}
    </div>
  )
}

function normalizeTime(value: string) {
  return value.length >= 5 ? value.slice(0, 5) : value
}

function createForm(property: ParentPropertyDto): MasterPropertyForm {
  return {
    name: property.name,
    enName: property.enName,
    status: property.status,
    type: property.type,
    stars: property.stars,
    address: getAddressText(property.address),
    addressDetail: getAddressDetail(property.address),
    city: getCity(property.address),
    countryCode: getCountryCode(property.address),
    zipCode: property.address.zipCode ?? '',
    latitude: getLatitude(property.position),
    longitude: getLongitude(property.position),
    checkIn: normalizeTime(property.checkIn),
    checkOut: normalizeTime(property.checkOut),
    floorCount: property.floorCount,
    roomCount: property.roomCount,
    language: property.language ?? ''
  }
}

function createSaveRequest(
  property: ParentPropertyDto,
  form: MasterPropertyForm
) {
  return {
    parentProperty: {
      ...property,
      name: form.name,
      enName: form.enName,
      type: form.type,
      stars: form.stars,
      status: form.status,
      checkIn: form.checkIn,
      checkOut: form.checkOut,
      address: {
        ...property.address,
        address: form.address,
        addressDetail: form.addressDetail,
        city: form.city,
        countryCode: form.countryCode,
        zipCode: form.zipCode
      },
      position: {
        ...property.position,
        latitude: form.latitude,
        longitude: form.longitude
      },
      language: form.language || null,
      roomCount: form.roomCount,
      floorCount: form.floorCount
    }
  }
}

export default function MasterPropertyDetailPage() {
  const params = useParams<{ id: string }>()
  const propertyId = params.id ?? ''
  const {
    data: property,
    isLoading
  } = useParentProperty(propertyId)
  const saveParentProperty = useSaveParentProperty()
  const savePropertyMappings = useSavePropertyMappings()
  const baseForm = useMemo(
    () => (property ? createForm(property) : defaultForm),
    [property]
  )
  const [formEdits, setFormEdits] = useState<Partial<MasterPropertyForm>>({})
  const form = useMemo(
    () => ({ ...baseForm, ...formEdits }),
    [baseForm, formEdits]
  )
  const setForm: MasterPropertyFormSetter = useCallback((value) => {
    setFormEdits((currentEdits) => {
      const currentForm = { ...baseForm, ...currentEdits }
      const nextForm = typeof value === 'function' ? value(currentForm) : value

      return nextForm
    })
  }, [baseForm])
  const [searchQuery, setSearchQuery] = useState('')
  const [mappingMessage, setMappingMessage] = useState('')

  const supplierSearchCondition = useMemo(() => {
    const normalizedQuery = searchQuery.trim()

    if (!normalizedQuery) {
      return undefined
    }

    return /^\d+$/.test(normalizedQuery)
      ? { propertyId: normalizedQuery }
      : { name: normalizedQuery }
  }, [searchQuery])
  const {
    data: searchedSupplierProperties = [],
    isLoading: isSupplierSearchLoading
  } = useProperties(supplierSearchCondition, searchQuery.trim().length > 0)
  const {
    data: currentMappedSupplierProperties = []
  } = usePropertyMappings(propertyId)
  const [mappedSupplierPropertyEdits, setMappedSupplierPropertyEdits] = useState<Property[] | null>(null)
  const mappedSupplierProperties = mappedSupplierPropertyEdits ?? currentMappedSupplierProperties
  const filteredSupplierProperties = useMemo(
    () =>
      searchedSupplierProperties.filter(
        (supplierProperty) =>
          !mappedSupplierProperties.some((mappedProperty) => mappedProperty.id === supplierProperty.id)
      ),
    [mappedSupplierProperties, searchedSupplierProperties]
  )

  const typeOptions = useMemo(
    () =>
      parentPropertyTypeOptions.includes(form.type)
        ? parentPropertyTypeOptions
        : [form.type, ...parentPropertyTypeOptions],
    [form.type]
  )
  const statusOptions = useMemo(
    () =>
      parentPropertyStatusOptions.includes(form.status)
        ? parentPropertyStatusOptions
        : [form.status, ...parentPropertyStatusOptions],
    [form.status]
  )

  const canSave =
    form.name.trim().length > 0 &&
    form.address.trim().length > 0 &&
    !saveParentProperty.isPending &&
    !savePropertyMappings.isPending

  const handleMapSelect = useCallback((coordinate: Coordinate) => {
    setForm((current) => ({
      ...current,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    }))
  }, [setForm])

  const handleSelectSupplierProperty = (supplierProperty: Property) => {
    const mappedParentPropertyId = supplierProperty.parentPropertyId

    if (mappedParentPropertyId && mappedParentPropertyId !== propertyId) {
      const mappedParentPropertyName = supplierProperty.parentPropertyName
        ? `(${supplierProperty.parentPropertyName})`
        : ''

      setMappingMessage(
        `이미 다른 대표숙소 ${mappedParentPropertyId}${mappedParentPropertyName}에 매핑되어 있어 등록할 수 없습니다.`
      )
      return
    }

    setMappedSupplierPropertyEdits((currentProperties) => {
      const nextProperties = currentProperties ?? mappedSupplierProperties

      return nextProperties.some((currentProperty) => currentProperty.id === supplierProperty.id)
        ? nextProperties
        : [...nextProperties, supplierProperty]
    })
    setMappingMessage('')
    setSearchQuery('')
  }

  const handleRemoveSupplierProperty = (supplierPropertyId: string) => {
    setMappedSupplierPropertyEdits((currentProperties) =>
      (currentProperties ?? mappedSupplierProperties).filter(
        (supplierProperty) => supplierProperty.id !== supplierPropertyId
      )
    )
    setMappingMessage('')
  }

  const handleSave = async () => {
    if (!property) {
      return
    }

    try {
      const savedProperty = await saveParentProperty.mutateAsync(
        createSaveRequest(property, form)
      )
      const savedPropertyId = getParentPropertyId(savedProperty) || propertyId
      const savedMappedProperties = await savePropertyMappings.mutateAsync({
        parentPropertyId: savedPropertyId,
        propertyIds: mappedSupplierProperties.map((supplierProperty) => supplierProperty.id)
      })

      setFormEdits(createForm(savedProperty))
      setMappedSupplierPropertyEdits(savedMappedProperties)
      notifySaveSuccess('저장이 완료되었습니다.')
    } catch {
      notifySaveError('저장에 실패했습니다.')
    }
  }

  if (isLoading) {
    return (
      <div>
        <Link
          href="/master-properties"
          className="mb-lg inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          대표숙소 목록으로
        </Link>
        <Card className="p-lg" hover={false}>
          <h1 className="text-xl font-bold text-text-primary">
            대표숙소를 조회하는 중입니다
          </h1>
        </Card>
      </div>
    )
  }

  if (!property) {
    return (
      <ErrorTemplate
        title="대표숙소를 찾을 수 없습니다"
        backHref="/master-properties"
        backLabel="대표숙소 목록으로"
      />
    )
  }

  return (
    <div>
      <div className="mb-lg">
        <Link
          href="/master-properties"
          className="mb-md inline-flex items-center gap-sm text-base font-medium text-text-secondary no-underline hover:text-primary"
        >
          <ArrowLeft className="h-icon-md w-icon-md" />
          대표숙소 목록으로
        </Link>
        <div className="mb-sm flex items-center gap-md">
          <Hotel className="h-icon-lg w-icon-lg text-primary" />
          <h1 className="text-2xl font-bold text-text-primary">
            {form.name} 상세
          </h1>
        </div>
        <p className="text-base font-light text-text-secondary">
          대표숙소 정보를 수정하고 공급사별 중복 숙소를 매핑합니다.
        </p>
      </div>

      <div className="mb-sm flex justify-end">
        <Button type="button" disabled={!canSave} onClick={handleSave}>
          <Save className="h-icon-md w-icon-md" />
          저장
        </Button>
      </div>

      <div className="grid gap-lg xl:grid-cols-2">
        <Card className="p-lg" hover={false}>
          <div className="mb-lg">
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <Building2 className="h-icon-md w-icon-md text-primary" />
              대표숙소 정보
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              대표 시설로 노출할 표준 숙소 정보를 관리합니다.
            </p>
          </div>

          <form className="grid gap-md" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-md md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                대표숙소 ID
                <Input value={getParentPropertyId(property)} readOnly />
              </label>
              <label className="grid gap-sm text-base font-medium text-text-primary">
                상태
                <Select
                  value={form.status}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      status: event.target.value as ParentPropertyStatus
                    }))
                  }
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {getStatusLabel(status)}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <div className="grid gap-md md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                대표숙소명
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </label>
              <label className="grid gap-sm text-base font-medium text-text-primary">
                영문명
                <Input
                  value={form.enName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, enName: event.target.value }))
                  }
                />
              </label>
            </div>

            <div className="grid gap-md md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                별점
                <div className="flex h-control-md items-center gap-xs rounded border border-border bg-bg-secondary px-control-px-md">
                  {starOptions.map((star) => {
                    const isSelected = star <= form.stars

                    return (
                      <button
                        key={star}
                        type="button"
                        aria-label={`${star}성`}
                        aria-pressed={isSelected}
                        onClick={() =>
                          setForm((current) => ({
                            ...current,
                            stars: current.stars === star ? 0 : star
                          }))
                        }
                        className="flex h-control-sm w-control-sm cursor-pointer items-center justify-center rounded border-none bg-transparent p-none text-text-tertiary transition-colors hover:bg-primary-bg hover:text-primary"
                      >
                        <Star
                          className={`h-icon-md w-icon-md ${
                            isSelected ? 'fill-primary text-primary' : ''
                          }`}
                        />
                      </button>
                    )
                  })}
                </div>
              </label>
              <label className="grid gap-sm text-base font-medium text-text-primary">
                타입
                <Select
                  value={form.type}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      type: event.target.value as ParentPropertyType
                    }))
                  }
                >
                  {typeOptions.map((type) => (
                    <option key={type} value={type}>
                      {getTypeLabel(type)}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <label className="grid gap-sm text-base font-medium text-text-primary">
              언어
              <Input
                value={form.language}
                onChange={(event) =>
                  setForm((current) => ({ ...current, language: event.target.value }))
                }
              />
            </label>

            <div className="grid gap-md rounded border border-border bg-bg-secondary p-md">
              <div className="flex items-center gap-sm text-base font-bold text-text-primary">
                <MapPin className="h-icon-md w-icon-md text-primary" />
                Location 정보
              </div>

              <div className="grid gap-md md:grid-cols-2">
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  도시
                  <Input
                    value={form.city}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, city: event.target.value }))
                    }
                  />
                </label>
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  국가 코드
                  <Input
                    value={form.countryCode}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, countryCode: event.target.value }))
                    }
                  />
                </label>
              </div>

              <div className="grid gap-md md:grid-cols-2">
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  주소
                  <Input
                    value={form.address}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, address: event.target.value }))
                    }
                  />
                </label>
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  상세주소
                  <Input
                    value={form.addressDetail}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, addressDetail: event.target.value }))
                    }
                  />
                </label>
              </div>

              <div className="grid gap-md md:grid-cols-2">
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  우편번호
                  <Input
                    value={form.zipCode}
                    onChange={(event) =>
                      setForm((current) => ({ ...current, zipCode: event.target.value }))
                    }
                  />
                </label>
                <div />
              </div>

              <div className="grid gap-md md:grid-cols-2">
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  Latitude
                  <Input
                    type="number"
                    step="0.000001"
                    value={form.latitude}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        latitude: Number(event.target.value)
                      }))
                    }
                  />
                </label>
                <label className="grid gap-sm text-base font-medium text-text-primary">
                  Longitude
                  <Input
                    type="number"
                    step="0.000001"
                    value={form.longitude}
                    onChange={(event) =>
                      setForm((current) => ({
                        ...current,
                        longitude: Number(event.target.value)
                      }))
                    }
                  />
                </label>
              </div>

              <GoogleMapPicker
                latitude={form.latitude}
                longitude={form.longitude}
                onSelect={handleMapSelect}
              />
            </div>

            <TimeRangePicker
              startValue={form.checkIn}
              endValue={form.checkOut}
              onStartChange={(time) =>
                setForm((current) => ({ ...current, checkIn: time }))
              }
              onEndChange={(time) =>
                setForm((current) => ({ ...current, checkOut: time }))
              }
              label="체크인 / 체크아웃"
              startPlaceholder="체크인"
              endPlaceholder="체크아웃"
              separator="/"
              includeSeconds={false}
              minuteStep={5}
            />

            <div className="grid gap-md md:grid-cols-2">
              <label className="grid gap-sm text-base font-medium text-text-primary">
                층수
                <Input
                  type="number"
                  min={0}
                  value={form.floorCount}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      floorCount: Number(event.target.value)
                    }))
                  }
                />
              </label>
              <label className="grid gap-sm text-base font-medium text-text-primary">
                객실수
                <Input
                  type="number"
                  min={0}
                  value={form.roomCount}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      roomCount: Number(event.target.value)
                    }))
                  }
                />
              </label>
            </div>

          </form>
        </Card>

        <Card className="p-lg" hover={false}>
          <div className="mb-lg">
            <h2 className="flex items-center gap-sm text-xl font-bold text-text-primary">
              <Hotel className="h-icon-md w-icon-md text-primary" />
              숙소 매핑
            </h2>
            <p className="mt-xs text-base font-light text-text-tertiary">
              공급사별 중복 숙소를 검색해 하나의 대표숙소에 연결합니다.
            </p>
          </div>

          <div className="mb-lg rounded border border-border bg-bg-secondary p-md">
            <div className="mb-md flex items-center gap-sm text-base font-bold text-text-primary">
              <Search className="h-icon-md w-icon-md text-primary" />
              공급사 숙소 검색
            </div>
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="공급사 숙소 ID 또는 숙소명으로 검색"
              showSearchIcon
            />

            {searchQuery.trim().length > 0 && (
              <div className="mt-md grid gap-xs">
                {filteredSupplierProperties.map((supplierProperty) => (
                  <button
                    key={supplierProperty.id}
                    type="button"
                    onClick={() => handleSelectSupplierProperty(supplierProperty)}
                    className="flex h-control-md w-full cursor-pointer items-center gap-md rounded border border-border bg-bg-primary px-control-px-md py-none text-left transition-colors hover:bg-bg-tertiary"
                  >
                    <span className="w-modal-action shrink-0 truncate text-base font-light text-text-tertiary">
                      {supplierProperty.id}
                    </span>
                    <span className="min-w-0 flex-1 truncate text-base font-bold text-text-primary">
                      {supplierProperty.name}
                    </span>
                    <span className="shrink-0 truncate text-base font-light text-text-secondary">
                      {supplierProperty.city || supplierProperty.address}
                    </span>
                    {supplierProperty.parentPropertyId && supplierProperty.parentPropertyId !== propertyId && (
                      <span className="shrink-0 rounded bg-bg-tertiary px-control-px-sm py-none text-base font-bold text-text-tertiary">
                        매핑됨
                      </span>
                    )}
                  </button>
                ))}

                {isSupplierSearchLoading && (
                  <div className="rounded border border-border bg-bg-primary p-md text-center text-base font-light text-text-tertiary">
                    검색 중입니다.
                  </div>
                )}

                {!isSupplierSearchLoading && filteredSupplierProperties.length === 0 && (
                  <div className="rounded border border-border bg-bg-primary p-md text-center text-base font-light text-text-tertiary">
                    검색 결과가 없습니다.
                  </div>
                )}
              </div>
            )}

            {mappingMessage && (
              <div className="mt-md rounded border border-primary bg-primary-bg p-md text-base font-bold text-primary">
                {mappingMessage}
              </div>
            )}
          </div>

          <div className="grid gap-sm">
            {mappedSupplierProperties.map((supplierProperty) => (
              <div
                key={supplierProperty.id}
                className="flex h-control-md items-center gap-md rounded border border-border bg-bg-secondary px-control-px-md py-none"
              >
                <span className="w-modal-action shrink-0 truncate text-base font-light text-text-tertiary">
                  {supplierProperty.id}
                </span>
                <span className="min-w-0 flex-1 truncate text-base font-bold text-text-primary">
                  {supplierProperty.name}
                </span>
                <span className="shrink-0 truncate text-base font-light text-text-secondary">
                  {supplierProperty.city || supplierProperty.address}
                </span>
                <Button
                  type="button"
                  variant="tertiary"
                  size="small"
                  iconOnly
                  aria-label={`${supplierProperty.name} 매핑 삭제`}
                  onClick={() => handleRemoveSupplierProperty(supplierProperty.id)}
                >
                  <Trash2 className="h-icon-md w-icon-md" />
                </Button>
              </div>
            ))}

            {mappedSupplierProperties.length === 0 && (
              <div className="rounded border border-border bg-bg-secondary p-md text-center text-base font-light text-text-tertiary">
                매핑된 공급사 숙소가 없습니다.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  )
}
