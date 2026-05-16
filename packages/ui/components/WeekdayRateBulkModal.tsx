import React from 'react'
import { Save } from 'lucide-react'
import { Alert } from './Alert'
import { Button } from './Button'
import { DatePicker } from './DatePicker'

export type WeekdayRateValues = Record<number, string>

export interface WeekdayRatePreviewCell {
  day: number
  label: string
  inputAmount: number
  sellRate: number
  netRate: number
  commissionAmount: number
}

export interface WeekdayRatePreviewRow {
  id: string
  name: string
  cells: WeekdayRatePreviewCell[]
}

export interface WeekdayRateTargetOption {
  id: string
  name: string
}

export interface WeekdayRateBulkModalProps {
  isOpen: boolean
  title?: string
  startDate: string
  endDate: string
  values: WeekdayRateValues
  targetLabel: string
  rateTypeLabel?: string
  commissionLabel?: string
  previewRows?: WeekdayRatePreviewRow[]
  targetOptions?: WeekdayRateTargetOption[]
  selectedTargetIds?: string[]
  activeWeekdays?: number[]
  warningMessage?: string
  disabled?: boolean
  onTargetToggle?: (id: string) => void
  onWeekdayToggle?: (day: number) => void
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
  onValueChange: (day: number, value: string) => void
  onSubmit: () => void
  onClose: () => void
}

const weekdays = [
  { day: 1, label: '월' },
  { day: 2, label: '화' },
  { day: 3, label: '수' },
  { day: 4, label: '목' },
  { day: 5, label: '금' },
  { day: 6, label: '토' },
  { day: 0, label: '일' }
]

export function WeekdayRateBulkModal({
  isOpen,
  title = '요일별 요금 일괄 수정',
  startDate,
  endDate,
  values,
  targetLabel,
  rateTypeLabel,
  commissionLabel,
  previewRows = [],
  targetOptions = [],
  selectedTargetIds = [],
  activeWeekdays = [0, 1, 2, 3, 4, 5, 6],
  warningMessage,
  disabled = false,
  onTargetToggle,
  onWeekdayToggle,
  onStartDateChange,
  onEndDateChange,
  onValueChange,
  onSubmit,
  onClose
}: WeekdayRateBulkModalProps) {
  if (!isOpen) return null

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR').format(amount)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-lg"
      style={{ backgroundColor: 'var(--overlay-bg)' }}
      onClick={onClose}
    >
      <div
        className="w-full overflow-y-auto rounded p-lg"
        style={{
          width: 'var(--modal-width-lg)',
          maxWidth: '100%',
          maxHeight: 'var(--modal-max-height)',
          backgroundColor: 'var(--bg-primary)',
          border: 'var(--border)',
          borderRadius: 'var(--radius)',
          boxShadow: 'var(--shadow-md)'
        }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-lg flex items-center justify-between gap-md">
          <h3
            className="m-none text-2xl"
            style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)' }}
          >
            {title}
          </h3>
          <div className="flex shrink-0 gap-md">
            <Button
              type="button"
              disabled={disabled}
              onClick={onSubmit}
              className="w-modal-action"
            >
              <Save className="h-icon-md w-icon-md" />
              적용
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="w-modal-action"
            >
              취소
            </Button>
          </div>
        </div>

        {warningMessage && (
          <Alert variant="warning" title="확인 필요" className="mb-lg">
            {warningMessage}
          </Alert>
        )}

        {targetOptions.length > 0 && (
          <div className="mb-lg">
            <label
              className="mb-sm block text-base"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
            >
              일괄 수정 대상
            </label>
            <div className="flex flex-wrap gap-sm">
              {targetOptions.map((target) => {
                const selected = selectedTargetIds.includes(target.id)

                return (
                  <button
                    key={target.id}
                    type="button"
                    onClick={() => onTargetToggle?.(target.id)}
                    className="flex h-control-md items-center rounded border-none px-control-px-md py-none text-base leading-none transition-colors"
                    style={{
                      backgroundColor: selected ? 'var(--primary)' : 'var(--bg-secondary)',
                      borderRadius: 'var(--radius)',
                      color: selected ? 'var(--text-on-primary)' : 'var(--text-primary)',
                      fontWeight: 'var(--font-medium)'
                    }}
                  >
                    {target.id} / {target.name}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        <div className="mb-lg">
          <label
            className="mb-sm block text-base"
            style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
          >
            기간 선택
          </label>
          <div className="grid grid-cols-2 gap-md">
            <DatePicker
              label="시작일"
              value={startDate}
              onChange={onStartDateChange}
              placeholder="시작일 선택"
            />
            <DatePicker
              label="종료일"
              value={endDate}
              onChange={onEndDateChange}
              placeholder="종료일 선택"
              align="right"
            />
          </div>
        </div>

        <div className="mb-lg">
          <label
            className="mb-sm block text-base"
            style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
          >
            요일별 요금
          </label>
          <div className="grid grid-cols-7 gap-sm">
            {weekdays.map(({ day, label }) => {
              const active = activeWeekdays.includes(day)

              return (
              <label key={day} className="block">
                <button
                  type="button"
                  onClick={() => onWeekdayToggle?.(day)}
                  className="mb-xs flex h-control-md w-full items-center justify-center rounded border-none text-base leading-none transition-colors"
                  style={{
                    backgroundColor: active ? 'var(--primary)' : 'var(--bg-secondary)',
                    borderRadius: 'var(--radius)',
                    color: active ? 'var(--text-on-primary)' : 'var(--text-tertiary)',
                    fontWeight: 'var(--font-bold)'
                  }}
                >
                  {label}
                </button>
                <input
                  type="number"
                  disabled={!active}
                  value={values[day] ?? ''}
                  onChange={(event) => onValueChange(day, event.target.value)}
                  placeholder="0"
                  className="h-control-md w-full rounded px-control-px-sm py-none text-center text-base leading-none"
                  style={{
                    backgroundColor: active ? 'var(--bg-secondary)' : 'var(--bg-tertiary)',
                    border: 'var(--border)',
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

        <div className="mb-lg">
          <div className="mb-sm flex items-center justify-between gap-md">
            <label
              className="block text-base"
              style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}
            >
              적용 미리보기
            </label>
            {(rateTypeLabel || commissionLabel) && (
              <div
                className="text-base"
                style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}
              >
                {rateTypeLabel}
                {rateTypeLabel && commissionLabel ? ' · ' : ''}
                {commissionLabel}
              </div>
            )}
          </div>

          <div
            className="overflow-x-auto rounded"
            style={{
              border: 'var(--border)',
              borderRadius: 'var(--radius)'
            }}
          >
            <table className="w-full border-separate border-spacing-0">
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                  <th
                    className="px-md py-sm text-left text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-bold)',
                      borderBottom: 'var(--border)'
                    }}
                  >
                    {targetLabel}
                  </th>
                  <th
                    className="px-md py-sm text-left text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-bold)',
                      borderBottom: 'var(--border)'
                    }}
                  >
                    요일
                  </th>
                  <th
                    className="px-md py-sm text-right text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-bold)',
                      borderBottom: 'var(--border)'
                    }}
                  >
                    입력금액
                  </th>
                  <th
                    className="px-md py-sm text-right text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-bold)',
                      borderBottom: 'var(--border)'
                    }}
                  >
                    판매가
                  </th>
                  <th
                    className="px-md py-sm text-right text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-bold)',
                      borderBottom: 'var(--border)'
                    }}
                  >
                    커미션
                  </th>
                  <th
                    className="px-md py-sm text-right text-base"
                    style={{
                      color: 'var(--text-primary)',
                      fontWeight: 'var(--font-bold)',
                      borderBottom: 'var(--border)'
                    }}
                  >
                    입금가
                  </th>
                </tr>
              </thead>
              <tbody>
                {previewRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-md py-lg text-center text-base"
                      style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--font-light)' }}
                    >
                      요일별 금액을 입력하면 계산 결과가 표시됩니다.
                    </td>
                  </tr>
                ) : (
                  previewRows.flatMap((row) =>
                    row.cells.map((cell, index) => (
                      <tr key={`${row.id}-${cell.day}`}>
                        <td
                          className="px-md py-sm text-base"
                          style={{
                            color: 'var(--text-primary)',
                            fontWeight: 'var(--font-medium)',
                            borderBottom: 'var(--border)'
                          }}
                        >
                          {index === 0 ? `${row.id} / ${row.name}` : ''}
                        </td>
                        <td
                          className="px-md py-sm text-base"
                          style={{
                            color: cell.day === 0 ? 'var(--error)' : cell.day === 6 ? 'var(--primary)' : 'var(--text-secondary)',
                            fontWeight: 'var(--font-bold)',
                            borderBottom: 'var(--border)'
                          }}
                        >
                          {cell.label}
                        </td>
                        <td className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-medium)', borderBottom: 'var(--border)' }}>
                          {formatCurrency(cell.inputAmount)}
                        </td>
                        <td className="px-md py-sm text-right text-base" style={{ color: 'var(--primary)', fontWeight: 'var(--font-bold)', borderBottom: 'var(--border)' }}>
                          {formatCurrency(cell.sellRate)}
                        </td>
                        <td className="px-md py-sm text-right text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)', borderBottom: 'var(--border)' }}>
                          {formatCurrency(cell.commissionAmount)}
                        </td>
                        <td className="px-md py-sm text-right text-base" style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-bold)', borderBottom: 'var(--border)' }}>
                          {formatCurrency(cell.netRate)}
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
  )
}
