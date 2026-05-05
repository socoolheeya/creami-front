'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AccommodationFormData } from '@/lib/types/accommodation'
import { StepIndicator } from '../components/wizard/StepIndicator'
import { WizardNavigation } from '../components/wizard/WizardNavigation'
import { Step1Basic } from '../components/wizard/Step1Basic'
import { Step2Description } from '../components/wizard/Step2Description'
import { Step3Images } from '../components/wizard/Step3Images'
import { Step4Policy } from '../components/wizard/Step4Policy'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const STEPS = ['기본 정보', '상세 설명', '이미지', '요금 정책']
const STORAGE_KEY = 'accommodation-draft'

export default function NewAccommodationPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<AccommodationFormData>({
    name: '',
    type: undefined,
    address: '',
    phone: '',
    email: '',
    checkIn: '',
    checkOut: '',
    description: '',
    amenities: [],
    images: [],
    billingPolicy: {
      currency: '',
      commission: {
        type: 'percentage',
        value: 0
      }
    }
  })

  // 자동 저장: 폼 데이터 변경 시 localStorage에 저장
  useEffect(() => {
    if (formData.name || formData.description || (formData.images && formData.images.length > 0)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
    }
  }, [formData])

  // 초기 로드: localStorage에서 임시 저장 데이터 불러오기
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // 사용자에게 이어서 작성할지 물어볼 수 있음 (일단 자동 로드)
        setFormData(parsed)
      } catch (e) {
        console.error('Failed to parse saved data:', e)
      }
    }
  }, [])

  const handleDataChange = (data: Partial<AccommodationFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  // 각 단계별 유효성 검증
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.name?.trim() &&
          formData.type &&
          formData.address?.trim() &&
          formData.phone?.trim() &&
          formData.checkIn &&
          formData.checkOut
        )
      case 2:
        return !!(formData.description?.trim() && formData.amenities && formData.amenities.length > 0)
      case 3:
        return !!(formData.images && formData.images.length > 0)
      case 4:
        return !!(
          formData.billingPolicy?.currency &&
          formData.billingPolicy?.commission?.type &&
          formData.billingPolicy?.commission?.value !== undefined
        )
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length))
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = () => {
    if (!validateStep(currentStep)) return

    // TODO: API 호출하여 숙소 생성
    console.log('Submitting accommodation:', formData)

    // 임시 저장 데이터 삭제
    localStorage.removeItem(STORAGE_KEY)

    // 목록 페이지로 이동
    router.push('/properties')
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Basic data={formData} onChange={handleDataChange} />
      case 2:
        return <Step2Description data={formData} onChange={handleDataChange} />
      case 3:
        return <Step3Images data={formData} onChange={handleDataChange} />
      case 4:
        return <Step4Policy data={formData} onChange={handleDataChange} />
      default:
        return null
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <Link
          href="/properties"
          className="inline-flex items-center gap-2 mb-4 transition-colors"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span style={{ fontWeight: 'var(--font-medium)' }}>숙소 목록으로</span>
        </Link>
        <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          새 숙소 등록
        </h1>
        <p className="mt-2" style={{ color: 'var(--text-secondary)' }}>
          단계별로 숙소 정보를 입력해주세요. 작성 중인 내용은 자동으로 저장됩니다.
        </p>
      </div>

      {/* 위저드 카드 */}
      <div
        className="rounded-lg p-8 shadow-sm"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* 진행 표시기 */}
        <StepIndicator currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

        {/* 현재 단계 폼 */}
        <div className="my-8">{renderStep()}</div>

        {/* 네비게이션 */}
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canProceed={validateStep(currentStep)}
        />
      </div>

      {/* 임시 저장 안내 */}
      <div className="mt-4 text-center text-sm" style={{ color: 'var(--text-tertiary)' }}>
        💾 작성 중인 내용은 자동으로 저장되며, 나중에 이어서 작성할 수 있습니다
      </div>
    </div>
  )
}
