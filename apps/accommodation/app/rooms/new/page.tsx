'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { RoomFormData } from '@/lib/types/room'
import { StepIndicator } from '../components/wizard/StepIndicator'
import { WizardNavigation } from '../components/wizard/WizardNavigation'
import { Step1Basic } from '../components/wizard/Step1Basic'
import { Step2Details } from '../components/wizard/Step2Details'
import { Step3Features } from '../components/wizard/Step3Features'
import { Step4Images } from '../components/wizard/Step4Images'

const STEPS = ['기본정보', '객실정보', '특징', '이미지']

function NewRoomPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedAccommodationId = searchParams?.get('accommodation') || undefined

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RoomFormData>({
    accommodationId: preselectedAccommodationId,
    sizeUnit: 'sqm',
    smokingAllowed: false,
    extraBedAvailable: false,
    amenities: [],
    accessibilityFeatures: [],
    bedConfiguration: [],
    images: []
  })

  const handleChange = (data: Partial<RoomFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!(formData.name && formData.type && formData.accommodationId)
      case 2:
        return !!(
          formData.size &&
          formData.size > 0 &&
          formData.floor !== undefined &&
          formData.bedConfiguration &&
          formData.bedConfiguration.length > 0 &&
          formData.standardOccupancy &&
          formData.standardOccupancy > 0 &&
          formData.maxOccupancy &&
          formData.maxOccupancy >= formData.standardOccupancy
        )
      case 3:
        return !!(formData.viewType && formData.smokingAllowed !== undefined)
      case 4:
        return true // 이미지는 선택사항
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    if (!canProceed()) return

    // TODO: API 호출로 데이터 저장
    console.log('객실 데이터:', formData)

    // 임시로 콘솔 출력 후 목록으로 이동
    alert('객실이 등록되었습니다!')
    router.push('/rooms')
  }

  return (
    <div className="min-h-screen p-6">
      <div
        className="max-w-4xl mx-auto p-8 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)'
        }}
      >
        {/* 헤더 */}
        <div className="mb-8">
          <h1
            className="text-2xl mb-2"
            style={{
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)'
            }}
          >
            신규 객실 등록
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            객실 정보를 단계별로 입력해주세요
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={STEPS.length}
          steps={STEPS}
        />

        {/* Form Content */}
        <div className="mb-8">
          {currentStep === 1 && (
            <Step1Basic
              formData={formData}
              onChange={handleChange}
              preselectedAccommodationId={preselectedAccommodationId}
            />
          )}
          {currentStep === 2 && (
            <Step2Details formData={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <Step3Features formData={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Step4Images formData={formData} onChange={handleChange} />
          )}
        </div>

        {/* Navigation */}
        <WizardNavigation
          currentStep={currentStep}
          totalSteps={STEPS.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canProceed={canProceed()}
        />
      </div>
    </div>
  )
}

export default function NewRoomPage() {
  return (
    <Suspense fallback={<div className="p-6">로딩 중...</div>}>
      <NewRoomPageContent />
    </Suspense>
  )
}