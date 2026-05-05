import { AccommodationFormData, CURRENCY_OPTIONS, ChargeType } from '@/lib/types/accommodation'
import { DollarSign, Percent, Plus, Trash2 } from 'lucide-react'

interface Step4PolicyProps {
  data: AccommodationFormData
  onChange: (data: Partial<AccommodationFormData>) => void
}

export function Step4Policy({ data, onChange }: Step4PolicyProps) {
  const billingPolicy = data.billingPolicy || {}

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
          value: billingPolicy.commission?.value || 0
        }
      }
    })
  }

  const handleCommissionValueChange = (value: number) => {
    onChange({
      billingPolicy: {
        ...billingPolicy,
        commission: {
          type: billingPolicy.commission?.type || 'percentage',
          value
        }
      }
    })
  }

  const handleSurchargeToggle = () => {
    if (billingPolicy.surcharge) {
      const { surcharge, ...rest } = billingPolicy
      onChange({ billingPolicy: rest })
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
      const { tax, ...rest } = billingPolicy
      onChange({ billingPolicy: rest })
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
    <div className="space-y-6">
      <h2 className="text-2xl mb-6" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
        요금 정책을 설정해주세요
      </h2>

      {/* 통화 선택 */}
      <div>
        <label className="block mb-2" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          <DollarSign className="w-5 h-5 inline mr-2" style={{ color: 'var(--primary)' }} />
          통화 단위 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <select
          value={billingPolicy.currency || ''}
          onChange={(e) => handleCurrencyChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
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
        <label className="block mb-3" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          커미션 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>

        {/* 타입 선택 */}
        <div className="flex gap-3 mb-3">
          <button
            type="button"
            onClick={() => handleCommissionTypeChange('percentage')}
            className="flex-1 px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: billingPolicy.commission?.type === 'percentage' ? 'var(--primary)' : 'var(--bg-tertiary)',
              color: billingPolicy.commission?.type === 'percentage' ? '#ffffff' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)',
              border: billingPolicy.commission?.type === 'percentage' ? '2px solid var(--primary)' : '2px solid transparent'
            }}
          >
            <Percent className="w-5 h-5" />
            퍼센티지
          </button>
          <button
            type="button"
            onClick={() => handleCommissionTypeChange('fixed')}
            className="flex-1 px-4 py-3 rounded-lg transition-all flex items-center justify-center gap-2"
            style={{
              backgroundColor: billingPolicy.commission?.type === 'fixed' ? 'var(--primary)' : 'var(--bg-tertiary)',
              color: billingPolicy.commission?.type === 'fixed' ? '#ffffff' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)',
              border: billingPolicy.commission?.type === 'fixed' ? '2px solid var(--primary)' : '2px solid transparent'
            }}
          >
            <DollarSign className="w-5 h-5" />
            고정금액
          </button>
        </div>

        {/* 값 입력 */}
        <div className="relative">
          <input
            type="number"
            min="0"
            step={billingPolicy.commission?.type === 'percentage' ? '0.01' : '1'}
            value={billingPolicy.commission?.value || 0}
            onChange={(e) => handleCommissionValueChange(parseFloat(e.target.value) || 0)}
            placeholder="0"
            className="w-full px-4 py-3 pr-12 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
          <span
            className="absolute right-4 top-1/2 -translate-y-1/2"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {billingPolicy.commission?.type === 'percentage' ? '%' : billingPolicy.currency || '원'}
          </span>
        </div>
      </div>

      {/* Surcharge (선택) */}
      <div
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <label style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            추가요금 (Surcharge)
          </label>
          <button
            type="button"
            onClick={handleSurchargeToggle}
            className="px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            style={{
              backgroundColor: billingPolicy.surcharge ? 'var(--primary)' : 'var(--bg-primary)',
              color: billingPolicy.surcharge ? '#ffffff' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {billingPolicy.surcharge ? <Trash2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {billingPolicy.surcharge ? '제거' : '추가'}
          </button>
        </div>

        {billingPolicy.surcharge && (
          <div className="space-y-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSurchargeChange('percentage', billingPolicy.surcharge!.value)}
                className="flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: billingPolicy.surcharge.type === 'percentage' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.surcharge.type === 'percentage' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem'
                }}
              >
                <Percent className="w-4 h-4" />%
              </button>
              <button
                type="button"
                onClick={() => handleSurchargeChange('fixed', billingPolicy.surcharge!.value)}
                className="flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: billingPolicy.surcharge.type === 'fixed' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.surcharge.type === 'fixed' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem'
                }}
              >
                <DollarSign className="w-4 h-4" />
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
                className="w-full px-4 py-2 pr-12 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
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
        className="p-4 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-sm)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <label style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            세금 (Tax)
          </label>
          <button
            type="button"
            onClick={handleTaxToggle}
            className="px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2"
            style={{
              backgroundColor: billingPolicy.tax ? 'var(--primary)' : 'var(--bg-primary)',
              color: billingPolicy.tax ? '#ffffff' : 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            {billingPolicy.tax ? <Trash2 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {billingPolicy.tax ? '제거' : '추가'}
          </button>
        </div>

        {billingPolicy.tax && (
          <div className="space-y-3">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleTaxChange('percentage', billingPolicy.tax!.value)}
                className="flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: billingPolicy.tax.type === 'percentage' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.tax.type === 'percentage' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem'
                }}
              >
                <Percent className="w-4 h-4" />%
              </button>
              <button
                type="button"
                onClick={() => handleTaxChange('fixed', billingPolicy.tax!.value)}
                className="flex-1 px-3 py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: billingPolicy.tax.type === 'fixed' ? 'var(--primary)' : 'var(--bg-primary)',
                  color: billingPolicy.tax.type === 'fixed' ? '#ffffff' : 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.875rem'
                }}
              >
                <DollarSign className="w-4 h-4" />
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
                className="w-full px-4 py-2 pr-12 rounded-lg"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  color: 'var(--text-primary)',
                  borderRadius: 'var(--radius-sm)'
                }}
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm"
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
          className="p-4 rounded-lg"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-medium)' }}>
            💡 요금 정책 요약
          </p>
          <div className="space-y-1 text-sm" style={{ color: 'var(--text-primary)' }}>
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
