import { PropertyFormData, PropertyType, PROPERTY_TYPE_LABELS } from '../../../../lib/types/property'

interface Step1BasicProps {
  data: PropertyFormData
  onChange: (data: Partial<PropertyFormData>) => void
}

export function Step1Basic({ data, onChange }: Step1BasicProps) {
  const accommodationTypes: PropertyType[] = ['hotel', 'motel', 'pension', 'guesthouse', 'resort', 'villa']

  return (
    <div className="space-y-lg">
      <div>
        <h2 className="text-xl mb-xs" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          기본 정보를 입력해주세요
        </h2>
      </div>

      {/* 숙소명 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            숙소명 (한글) <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="text"
            value={data.name || ''}
            onChange={(e) => onChange({ name: e.target.value })}
            placeholder="예: 그랜드 호텔 서울"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            숙소명 (영문) <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="text"
            value={data.enName || ''}
            onChange={(e) => onChange({ enName: e.target.value })}
            placeholder="예: Grand Hotel Seoul"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>

      {/* 숙소 타입 & 별점 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            숙소 타입 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <select
            value={data.type || ''}
            onChange={(e) => onChange({ type: e.target.value as PropertyType })}
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <option value="">선택해주세요</option>
            {accommodationTypes.map(type => (
              <option key={type} value={type}>
                {PROPERTY_TYPE_LABELS[type]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            별점 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <select
            value={data.stars || ''}
            onChange={(e) => onChange({ stars: Number(e.target.value) })}
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          >
            <option value="">선택해주세요</option>
            {[1, 2, 3, 4, 5].map(star => (
              <option key={star} value={star}>
                {star}성급
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 주소 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          기본 주소 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <input
          type="text"
          value={data.address || ''}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="예: 서울시 강남구 테헤란로 123"
          className="w-full px-md py-sm text-base rounded"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* 상세 주소 */}
      <div>
        <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
          상세 주소 <span style={{ color: 'var(--primary)' }}>*</span>
        </label>
        <input
          type="text"
          value={data.addressDetail || ''}
          onChange={(e) => onChange({ addressDetail: e.target.value })}
          placeholder="예: 101동 202호"
          className="w-full px-md py-sm text-base rounded"
          style={{
            backgroundColor: 'var(--bg-primary)',
            border: 'var(--border)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)'
          }}
        />
      </div>

      {/* 도시, 국가코드, 우편번호 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            도시 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="text"
            value={data.city || ''}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="예: 서울"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            국가코드 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="text"
            value={data.countryCode || ''}
            onChange={(e) => onChange({ countryCode: e.target.value })}
            placeholder="예: KR"
            maxLength={2}
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            우편번호 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="text"
            value={data.zipCode || ''}
            onChange={(e) => onChange({ zipCode: e.target.value })}
            placeholder="예: 06234"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>

      {/* 위도, 경도 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            위도 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="number"
            step="0.000001"
            value={data.latitude || ''}
            onChange={(e) => onChange({ latitude: Number(e.target.value) })}
            placeholder="예: 37.5665"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            경도 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="number"
            step="0.000001"
            value={data.longitude || ''}
            onChange={(e) => onChange({ longitude: Number(e.target.value) })}
            placeholder="예: 126.9780"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>

      {/* 연락처 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md max-w-modal-md">
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            전화번호 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="02-1234-5678"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            이메일
          </label>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="info@hotel.com"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>

      {/* 체크인/아웃 시간 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            체크인 시간 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="time"
            value={data.checkIn || ''}
            onChange={(e) => onChange({ checkIn: e.target.value })}
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            체크아웃 시간 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="time"
            value={data.checkOut || ''}
            onChange={(e) => onChange({ checkOut: e.target.value })}
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>

      {/* 객실 수, 층 수 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            총 객실 수 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="number"
            min="1"
            value={data.roomCount || ''}
            onChange={(e) => onChange({ roomCount: Number(e.target.value) })}
            placeholder="예: 120"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
        <div>
          <label className="block mb-xs text-base" style={{ fontWeight: 'var(--font-medium)', color: 'var(--text-primary)' }}>
            총 층 수 <span style={{ color: 'var(--primary)' }}>*</span>
          </label>
          <input
            type="number"
            min="1"
            value={data.floorCount || ''}
            onChange={(e) => onChange({ floorCount: Number(e.target.value) })}
            placeholder="예: 10"
            className="w-full px-md py-sm text-base rounded"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: 'var(--border)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)'
            }}
          />
        </div>
      </div>
    </div>
  )
}