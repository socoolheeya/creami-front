'use client'

import { useState } from 'react'
import { PropertyFormData, CURRENCY_OPTIONS, ChargeType } from '../../../../lib/types/property'
import { DollarSign, Percent, Plus, Trash2 } from 'lucide-react'

interface Step4PolicyProps {
  data: PropertyFormData
  onChange: (data: Partial<PropertyFormData>) => void
}

function parseChargeValue(value: string): number {
  const parsedValue = Number(value)

  return Number.isFinite(parsedValue) ? parsedValue : 0
}

export function Step4Policy({ data, onChange }: Step4PolicyProps) {
  const billingPolicy = data.billingPolicy || {}
  const [commissionValueText, setCommissionValueText] = useState(() =>
    String(billingPolicy.commission?.value ?? '')
  )

  const handleCurrencyChange = (currency: string) => {
    onChange({
      billingPolicy: {
        ...billingPolicy,
        currency
      }
    })
  }

  const handleCommissionTypeChange = (type: ChargeType) => {
    onChange({
      billingPolicy: {
        ...billingPolicy,
        commission: {
          type,
          value: parseChargeValue(commissionValueText)
        }
      }
    })
  }

  const handleCommissionValueChange = (value: string) => {
    setCommissionValueText(value)

    onChange({
      billingPolicy: {
        ...billingPolicy,
        commission: {
          type: billingPolicy.commission?.type || 'percentage',
          value: parseChargeValue(value)
        }
      }
    })
  }

  const handleSurchargeToggle = () => {
    if (billingPolicy.surcharge) {
      const nextBillingPolicy = { ...billingPolicy }
      delete nextBillingPolicy.surcharge
      onChange({ billingPolicy: nextBillingPolicy })
    } else {
      onChange({
        billingPolicy: {
          ...billingPolicy,
          surcharge: { type: 'percentage', value: 0 }
        }
      })
    }
  }

  const handleSurchargeChange = (type: ChargeType, value: number) => {
    onChange({
      billingPolicy: {
        ...billingPolicy,
        surcharge: { type, value }
      }
    })
  }

  const handleTaxToggle = () => {
    if (billingPolicy.tax) {
      const nextBillingPolicy = { ...billingPolicy }
      delete nextBillingPolicy.tax
      onChange({ billingPolicy: nextBillingPolicy })
    } else {
      onChange({
        billingPolicy: {
          ...billingPolicy,
          tax: { type: 'percentage', value: 0 }
        }
      })
    }
  }

  const handleTaxChange = (type: ChargeType, value: number) => {
    onChange({
      billingPolicy: {
        ...billingPolicy,
        tax: { type, value }
      }
    })
  }

  return (
    <div className="space-y-md">
      <h2 className="text-xl mb-xs" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        요금 정책을 설정해주세요
      </h2>

      {/* 통화 선택 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          <DollarSign className="w-md h-md inline mr-sm" style={{ color: 'var(--primary)' }} />
          통화 단위 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <select
          value={billingPolicy.currency || ''}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="w-full px-md py-sm text-base rounded max-w-modal-md"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <option value="">선택해주세요</option>
          {CURRENCY_OPTIONS.map(currency => (
            <option key={currency.code} value={currency.code}>
              {currency.name}
            </option>
          ))}
        </select>
      </div>

      {/* 커미션 설정 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          커미션 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>

        {/* 타입 선택 */}
        <div className="flex gap-md mb-md">
          <button
            type="button"
            onClick={() => handleCommissionTypeChange('percentage')}
            className="flex-1 px-md py-sm text-base rounded transition-all flex items-center justify-center gap-sm"
            style={{
              backgroundColor: billingPolicy.commission?.type === 'percentage' ? 'var(--primary)' : 'var(--bg-tertiary)',
              color: billingPolicy.commission?.type === 'percentage' ? 'var(--text-on-primary)' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)',
              border: billingPolicy.commission?.type === 'percentage' ? 'var(--border-primary-strong)' : 'var(--border-transparent-strong)'
            }}
          >
            <Percent className="w-md h-md" />
            퍼센티지
          </button>
          <button
            type="button"
            onClick={() => handleCommissionTypeChange('fixed')}
            className="flex-1 px-md py-sm text-base rounded transition-all flex items-center justify-center gap-sm"
            style={{
              backgroundColor: billingPolicy.commission?.type === 'fixed' ? 'var(--primary)' : 'var(--bg-tertiary)',
              color: billingPolicy.commission?.type === 'fixed' ? 'var(--text-on-primary)' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)',
              border: billingPolicy.commission?.type === 'fixed' ? 'var(--border-primary-strong)' : 'var(--border-transparent-strong)'
            }}
          >
            <DollarSign className="w-md h-md" />
            고정금액
          </button>
        </div>

        {/* 값 입력 */}
        <div className="relative">
          <input
            type="text"
            inputMode="decimal"
            value={commissionValueText}
            onChange={(e) => handleCommissionValueChange(e.target.value)}
            placeholder="0"
            className="w-full px-md py-sm text-base pr-3xl rounded max-w-modal-md"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {billingPolicy.commission?.type === 'percentage' ? '%' : billingPolicy.currency || '원'}
          </span>
        </div>
      </div>

      {/* Surcharge (선택) */}
      <div
        className="p-md rounded"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <div className="flex items-center justify-between mb-xs">
          <label className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            추가요금 (Surcharge)
          </label>
          <button
            type="button"
            onClick={handleSurchargeToggle}
            className="px-md py-xs.5 rounded transition-colors flex items-center gap-sm"
            style={{
              backgroundColor: billingPolicy.surcharge ? 'var(--primary)' : 'var(--bg-primary)',
              color: billingPolicy.surcharge ? 'var(--text-on-primary)' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {billingPolicy.surcharge ? <Trash2 className="w-md h-md" /> : <Plus className="w-md h-md" />}
            {billingPolicy.surcharge ? '제거' : '추가'}
          </button>
        </div>

        {billingPolicy.surcharge && (
          <div className="space-y-md">
            <div className="flex gap-md">
              <button
                type="button"
                onClick={() => handleSurchargeChange('percentage', billingPolicy.surcharge!.value)}
                className="flex-1 px-md py-sm text-base rounded transition-all flex items-center justify-center gap-sm"
                style={{
                  backgroundColor: billingPolicy.surcharge.type === 'percentage' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.surcharge.type === 'percentage' ? 'var(--text-on-primary)' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-base)'
                }}
              >
                <Percent className="w-md h-md" />%
              </button>
              <button
                type="button"
                onClick={() => handleSurchargeChange('fixed', billingPolicy.surcharge!.value)}
                className="flex-1 px-md py-sm text-base rounded transition-all flex items-center justify-center gap-sm"
                style={{
                  backgroundColor: billingPolicy.surcharge.type === 'fixed' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.surcharge.type === 'fixed' ? 'var(--text-on-primary)' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-base)'
                }}
              >
                <DollarSign className="w-md h-md" />
                {billingPolicy.currency || '원'}
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                step={billingPolicy.surcharge.type === 'percentage' ? '0.01' : '1'}
                value={billingPolicy.surcharge.value}
                onChange={(e) => handleSurchargeChange(billingPolicy.surcharge!.type, parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-md py-sm text-base pr-3xl rounded max-w-modal-sm"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: 'var(--border)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {billingPolicy.surcharge.type === 'percentage' ? '%' : billingPolicy.currency || '원'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Tax (선택) */}
      <div
        className="p-md rounded"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <div className="flex items-center justify-between mb-xs">
          <label className="text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            세금 (Tax)
          </label>
          <button
            type="button"
            onClick={handleTaxToggle}
            className="px-md py-xs.5 rounded transition-colors flex items-center gap-sm"
            style={{
              backgroundColor: billingPolicy.tax ? 'var(--primary)' : 'var(--bg-primary)',
              color: billingPolicy.tax ? 'var(--text-on-primary)' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {billingPolicy.tax ? <Trash2 className="w-md h-md" /> : <Plus className="w-md h-md" />}
            {billingPolicy.tax ? '제거' : '추가'}
          </button>
        </div>

        {billingPolicy.tax && (
          <div className="space-y-md">
            <div className="flex gap-md">
              <button
                type="button"
                onClick={() => handleTaxChange('percentage', billingPolicy.tax!.value)}
                className="flex-1 px-md py-sm text-base rounded transition-all flex items-center justify-center gap-sm"
                style={{
                  backgroundColor: billingPolicy.tax.type === 'percentage' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.tax.type === 'percentage' ? 'var(--text-on-primary)' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-base)'
                }}
              >
                <Percent className="w-md h-md" />%
              </button>
              <button
                type="button"
                onClick={() => handleTaxChange('fixed', billingPolicy.tax!.value)}
                className="flex-1 px-md py-sm text-base rounded transition-all flex items-center justify-center gap-sm"
                style={{
                  backgroundColor: billingPolicy.tax.type === 'fixed' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.tax.type === 'fixed' ? 'var(--text-on-primary)' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--font-size-base)'
                }}
              >
                <DollarSign className="w-md h-md" />
                {billingPolicy.currency || '원'}
              </button>
            </div>
            <div className="relative">
              <input
                type="number"
                min="0"
                step={billingPolicy.tax.type === 'percentage' ? '0.01' : '1'}
                value={billingPolicy.tax.value}
                onChange={(e) => handleTaxChange(billingPolicy.tax!.type, parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-md py-sm text-base pr-3xl rounded max-w-modal-sm"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: 'var(--border)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                {billingPolicy.tax.type === 'percentage' ? '%' : billingPolicy.currency || '원'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 요약 */}
      {billingPolicy.currency && billingPolicy.commission && (
        <div
          className="p-md rounded"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: 'var(--border)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <p className="text-xs mb-xs" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
            💡 요금 정책 요약
          </p>
          <div className="space-y-xs text-xs" style={{ color: 'var(--text-primary)' }}>
            <p>
              • 통화: <span style={{ fontWeight: 'var(--font-bold)' }}>
                {CURRENCY_OPTIONS.find(c => c.code === billingPolicy.currency)?.name}
              </span>
            </p>
            <p>
              • 커미션: <span style={{ fontWeight: 'var(--font-bold)' }}>
                {billingPolicy.commission.type === 'percentage'
                  ? `${billingPolicy.commission.value}%`
                  : `${billingPolicy.commission.value} ${billingPolicy.currency}`
                }
              </span>
            </p>
            {billingPolicy.surcharge && (
              <p>
                • 추가요금: <span style={{ fontWeight: 'var(--font-bold)' }}>
                  {billingPolicy.surcharge.type === 'percentage'
                    ? `${billingPolicy.surcharge.value}%`
                    : `${billingPolicy.surcharge.value} ${billingPolicy.currency}`
                  }
                </span>
              </p>
            )}
            {billingPolicy.tax && (
              <p>
                • 세금: <span style={{ fontWeight: 'var(--font-bold)' }}>
                  {billingPolicy.tax.type === 'percentage'
                    ? `${billingPolicy.tax.value}%`
                    : `${billingPolicy.tax.value} ${billingPolicy.currency}`
                  }
                </span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
