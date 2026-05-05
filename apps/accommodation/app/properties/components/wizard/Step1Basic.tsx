import { AccommodationFormData, AccommodationType, ACCOMMODATION_TYPE_LABELS } from '@/lib/types/accommodation'

interface Step1BasicProps {
  data: AccommodationFormData
  onChange: (data: Partial<AccommodationFormData>) => void
}

export function Step1Basic({ data, onChange }: Step1BasicProps) {
  const accommodationTypes: AccommodationType[] = ['hotel', 'motel', 'pension', 'guesthouse']

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl mb-1" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          기본 정보를 입력해주세요
        </h2>
      </div>

      {/* 숙소명 */}
      <div className="max-w-md">
        <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          숙소명 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="예: 그랜드 호텔 서울"
          className="w-full px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* 숙소 타입 */}
      <div className="max-w-xs">
        <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          숙소 타입 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <select
          value={data.type || ''}
          onChange={(e) => onChange({ type: e.target.value as AccommodationType })}
          className="w-full px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <option value="">선택해주세요</option>
          {accommodationTypes.map(type => (
            <option key={type} value={type}>
              {ACCOMMODATION_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      {/* 주소 */}
      <div className="max-w-2xl">
        <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          주소 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <input
          type="text"
          value={data.address || ''}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="예: 서울시 강남구 테헤란로 123"
          className="w-full px-3 py-2 text-sm rounded-lg"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* 연락처 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md">
        <div>
          <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            전화번호 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="02-1234-5678"
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            이메일
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="info@hotel.com"
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>

      {/* 체크인/아웃 시간 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-md">
        <div>
          <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            체크인 시간 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="time"
            value={data.checkIn || ''}
            onChange={(e) => onChange({ checkIn: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-1.5 text-sm" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            체크아웃 시간 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="time"
            value={data.checkOut || ''}
            onChange={(e) => onChange({ checkOut: e.target.value })}
            className="w-full px-3 py-2 text-sm rounded-lg"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>
    </div>
  )
}