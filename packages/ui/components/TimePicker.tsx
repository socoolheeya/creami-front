'use client'

import { Clock, X } from 'lucide-react'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button'

type TimePart = 'hour' | 'minute' | 'second'

export interface TimePickerProps {
  value: string
  onChange: (time: string) => void
  label?: string
  placeholder?: string
  align?: 'left' | 'right'
  size?: 'large' | 'medium' | 'small' | 'mini'
  disabled?: boolean
  clearable?: boolean
  includeSeconds?: boolean
  minuteStep?: number
  secondStep?: number
}

export interface TimeRangePickerProps {
  startValue: string
  endValue: string
  onStartChange: (time: string) => void
  onEndChange: (time: string) => void
  label?: string
  startPlaceholder?: string
  endPlaceholder?: string
  separator?: string
  align?: 'left' | 'right'
  size?: 'large' | 'medium' | 'small' | 'mini'
  disabled?: boolean
  clearable?: boolean
  includeSeconds?: boolean
  minuteStep?: number
  secondStep?: number
}

const padTimePart = (value: number) => String(value).padStart(2, '0')

const clampStep = (step: number | undefined) => {
  if (!step || step < 1) {
    return 1
  }

  return Math.min(step, 60)
}

const parseTime = (value: string, includeSeconds: boolean) => {
  const [hour = '00', minute = '00', second = '00'] = value.split(':')
  const parsedHour = Number(hour)
  const parsedMinute = Number(minute)
  const parsedSecond = Number(second)

  return {
    hour: Number.isInteger(parsedHour) ? Math.min(Math.max(parsedHour, 0), 23) : 0,
    minute: Number.isInteger(parsedMinute) ? Math.min(Math.max(parsedMinute, 0), 59) : 0,
    second: includeSeconds && Number.isInteger(parsedSecond)
      ? Math.min(Math.max(parsedSecond, 0), 59)
      : 0
  }
}

const formatTime = (
  time: { hour: number; minute: number; second: number },
  includeSeconds: boolean
) => {
  const base = `${padTimePart(time.hour)}:${padTimePart(time.minute)}`
  return includeSeconds ? `${base}:${padTimePart(time.second)}` : base
}

const createOptions = (max: number, step: number) => {
  const options: number[] = []

  for (let value = 0; value <= max; value += step) {
    options.push(value)
  }

  return options
}

const readCssLength = (name: string, fallbackPx: number) => {
  const rootStyle = getComputedStyle(document.documentElement)
  const rawValue = rootStyle.getPropertyValue(name).trim()
  const numericValue = Number.parseFloat(rawValue)

  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    return fallbackPx
  }

  if (rawValue.endsWith('rem')) {
    return numericValue * Number.parseFloat(rootStyle.fontSize)
  }

  return numericValue
}

export function TimePicker({
  value,
  onChange,
  label,
  placeholder = '시간 선택',
  align = 'left',
  size = 'medium',
  disabled = false,
  clearable = false,
  includeSeconds = true,
  minuteStep = 1,
  secondStep = 1
}: TimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [draftTime, setDraftTime] = useState(() => parseTime(value, includeSeconds))
  const [displayTime, setDisplayTime] = useState(value)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const popupRef = useRef<HTMLDivElement>(null)

  const normalizedMinuteStep = clampStep(minuteStep)
  const normalizedSecondStep = clampStep(secondStep)
  const minuteOptions = useMemo(
    () => createOptions(59, normalizedMinuteStep),
    [normalizedMinuteStep]
  )
  const secondOptions = useMemo(
    () => createOptions(59, normalizedSecondStep),
    [normalizedSecondStep]
  )

  useLayoutEffect(() => {
    if (isOpen) {
      setDraftTime(parseTime(value, includeSeconds))
    }
  }, [includeSeconds, isOpen, value])

  useEffect(() => {
    if (!isOpen) {
      setDisplayTime(value)
    }
  }, [isOpen, value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const isTriggerClick = containerRef.current?.contains(target)
      const isPopupClick = popupRef.current?.contains(target)

      if (!isTriggerClick && !isPopupClick) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const updatePopupPosition = () => {
      const trigger = containerRef.current?.getBoundingClientRect()

      if (!trigger) {
        return
      }

      const resolvedPopupWidth = readCssLength('--timepicker-width', 288)
      const viewportPadding = readCssLength('--spacing-sm', 8)
      const alignedLeft = align === 'right'
        ? trigger.right - resolvedPopupWidth
        : trigger.left
      const maxLeft = window.innerWidth - resolvedPopupWidth - viewportPadding

      setPopupPosition({
        top: trigger.bottom + viewportPadding,
        left: Math.max(viewportPadding, Math.min(alignedLeft, maxLeft)),
      })
    }

    updatePopupPosition()
    window.addEventListener('resize', updatePopupPosition)
    window.addEventListener('scroll', updatePopupPosition, true)

    return () => {
      window.removeEventListener('resize', updatePopupPosition)
      window.removeEventListener('scroll', updatePopupPosition, true)
    }
  }, [align, isOpen])

  useLayoutEffect(() => {
    if (!isOpen) {
      return
    }

    const animationFrame = window.requestAnimationFrame(() => {
      popupRef.current
        ?.querySelectorAll<HTMLElement>('[data-time-selected="true"]')
        .forEach((selectedOption) => {
          const optionsContainer = selectedOption.closest<HTMLElement>('[data-time-options="true"]')

          if (!optionsContainer) {
            return
          }

          optionsContainer.scrollTop =
            selectedOption.offsetTop -
            optionsContainer.clientHeight / 2 +
            selectedOption.clientHeight / 2
        })
    })

    return () => {
      window.cancelAnimationFrame(animationFrame)
    }
  }, [draftTime.hour, draftTime.minute, draftTime.second, isOpen])

  const sizeStyles = {
    large: 'h-control-lg px-control-px-lg',
    medium: 'h-control-md px-control-px-md',
    small: 'h-control-sm px-control-px-sm',
    mini: 'h-control-mini px-control-px-mini'
  }
  const applyTimeChange = (
    part: TimePart,
    nextValue: number
  ) => {
    const nextTime = {
      ...draftTime,
      [part]: nextValue
    }

    setDraftTime(nextTime)
    const formattedTime = formatTime(nextTime, includeSeconds)

    setDisplayTime(formattedTime)
    onChange(formattedTime)
  }

  const handleNow = () => {
    const now = new Date()
    const nextTime = {
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: includeSeconds ? now.getSeconds() : 0
    }

    setDraftTime(nextTime)
    const formattedTime = formatTime(nextTime, includeSeconds)

    setDisplayTime(formattedTime)
    onChange(formattedTime)
    setIsOpen(false)
  }

  const handleConfirm = () => {
    const formattedTime = formatTime(draftTime, includeSeconds)

    setDisplayTime(formattedTime)
    onChange(formattedTime)
    setIsOpen(false)
  }

  const handleClear = () => {
    setDisplayTime('')
    onChange('')
    setIsOpen(false)
  }

  const renderColumn = (labelText: string, part: TimePart, options: number[]) => (
    <div className="min-w-0 flex-1">
      <div className="px-xs pb-xs text-center text-base font-bold text-text-tertiary">
        {labelText}
      </div>
      <div
        data-time-options="true"
        className="overflow-y-auto"
        style={{ maxHeight: 'var(--timepicker-options-max-height)' }}
      >
        <div className="flex flex-col gap-xs">
          {options.map((option) => {
            const isSelected = draftTime[part] === option

            return (
              <button
                key={option}
                type="button"
                data-time-selected={isSelected ? 'true' : undefined}
                aria-current={isSelected ? 'time' : undefined}
                onClick={() => applyTimeChange(part, option)}
                className={`h-control-md rounded text-center text-base font-medium transition-colors ${
                  isSelected
                    ? 'bg-primary text-white'
                    : 'bg-transparent text-text-primary hover:bg-bg-secondary'
                }`}
              >
                {padTimePart(option)}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={containerRef}>
      {label && (
        <label className="mb-xs block text-base font-light text-text-tertiary">
          {label}
        </label>
      )}

      <div className="relative">
        <div
          className="relative"
        >
          <input
            readOnly
            tabIndex={-1}
            value={displayTime || ''}
            placeholder={placeholder}
            className={`pointer-events-none w-full rounded border border-border bg-bg-secondary pl-control-search pr-control-px-md text-base font-medium leading-none text-text-primary placeholder:text-text-tertiary ${sizeStyles[size]}`}
          />
          <Clock className="pointer-events-none absolute left-md top-1/2 h-md w-md -translate-y-1/2 text-text-tertiary" />
        </div>
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            if (!disabled) {
              setIsOpen((prev) => !prev)
            }
          }}
          className={`absolute inset-0 rounded bg-transparent text-left ${
            disabled ? 'cursor-not-allowed text-text-tertiary' : 'cursor-pointer'
          }`}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          aria-label={displayTime || placeholder}
        >
          <span className="sr-only">{displayTime || placeholder}</span>
        </button>

        {clearable && value && !disabled && (
          <button
            type="button"
            aria-label="시간 초기화"
            className="absolute right-md top-1/2 flex h-md w-md -translate-y-1/2 items-center justify-center rounded text-text-tertiary transition-colors hover:bg-bg-tertiary hover:text-text-primary"
            onClick={handleClear}
          >
            <X className="h-md w-md" />
          </button>
        )}

        {isOpen && createPortal(
          <div
            ref={popupRef}
            className="fixed overflow-hidden rounded border border-border bg-bg-primary shadow-lg"
            style={{
              top: popupPosition.top,
              left: popupPosition.left,
              width: 'var(--timepicker-width)',
              zIndex: 'var(--layer-popover, 1000)',
            }}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex gap-sm p-sm">
              {renderColumn('시', 'hour', createOptions(23, 1))}
              {renderColumn('분', 'minute', minuteOptions)}
              {includeSeconds && renderColumn('초', 'second', secondOptions)}
            </div>

            <div className="flex justify-end gap-sm border-t border-border p-sm">
              {clearable && (
                <Button type="button" variant="secondary" size="small" onClick={handleClear}>
                  초기화
                </Button>
              )}
              <Button type="button" variant="secondary" size="small" onClick={handleNow}>
                현재
              </Button>
              <Button type="button" size="small" onClick={handleConfirm}>
                확인
              </Button>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  )
}

export function TimeRangePicker({
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  label,
  startPlaceholder = '시작 시간',
  endPlaceholder = '종료 시간',
  separator = 'To',
  align = 'left',
  size = 'medium',
  disabled = false,
  clearable = false,
  includeSeconds = true,
  minuteStep = 1,
  secondStep = 1
}: TimeRangePickerProps) {
  return (
    <div>
      {label && (
        <label className="mb-xs block text-base font-light text-text-tertiary">
          {label}
        </label>
      )}

      <div className="flex items-center gap-md">
        <div className="min-w-0 flex-1">
          <TimePicker
            value={startValue}
            onChange={onStartChange}
            placeholder={startPlaceholder}
            align={align}
            size={size}
            disabled={disabled}
            clearable={clearable}
            includeSeconds={includeSeconds}
            minuteStep={minuteStep}
            secondStep={secondStep}
          />
        </div>

        <span className="shrink-0 text-base font-medium text-text-secondary">
          {separator}
        </span>

        <div className="min-w-0 flex-1">
          <TimePicker
            value={endValue}
            onChange={onEndChange}
            placeholder={endPlaceholder}
            align="right"
            size={size}
            disabled={disabled}
            clearable={clearable}
            includeSeconds={includeSeconds}
            minuteStep={minuteStep}
            secondStep={secondStep}
          />
        </div>
      </div>
    </div>
  )
}
