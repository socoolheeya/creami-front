'use client'

import { use, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { mockRooms } from '@/lib/data/mock-rooms'
import { RoomFormData } from '@/lib/types/room'
import { StepIndicator } from '../../components/wizard/StepIndicator'
import { WizardNavigation } from '../../components/wizard/WizardNavigation'
import { Step1Basic } from '../../components/wizard/Step1Basic'
import { Step2Details } from '../../components/wizard/Step2Details'
import { Step3Occupancy } from '../../components/wizard/Step3Occupancy'
import { Step4Description } from '../../components/wizard/Step4Description'
import { Step5Features } from '../../components/wizard/Step5Features'
import { Step6Images } from '../../components/wizard/Step6Images'

const STEPS = ['기본정보', '객실정보', '인원정보', '객실설명', '특징', '이미지']

export default function RoomEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const room = mockRooms.find(r => r.id === id)

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<RoomFormData>(() => {
    if (!room) return {
      sizeUnit: 'sqm',
      smokingAllowed: false,
      extraBedAvailable: false,
      useMaxOccupancy: true,
      standardOccupancyAdult: 0,
      standardOccupancyChild: 0,
      useMinOccupancy: false,
      minChildAge: 0,
      maxChildAge: 17,
      amenities: [],
      accessibilityFeatures: [],
      bedConfiguration: [],
      images: []
    }

    // 기존 room 데이터를 formData로 변환
    return {
      accommodationId: room.accommodationId,
      name: room.name,
      enName: room.enName,
      type: room.type,
      floor: room.floor,
      size: room.size,
      sizeUnit: room.sizeUnit,

      // 새로운 인원 구조
      standardOccupancyAdult: room.standardOccupancyAdult,
      standardOccupancyChild: room.standardOccupancyChild,
      useMinOccupancy: room.useMinOccupancy,
      minOccupancyAdult: room.minOccupancyAdult,
      minOccupancyChild: room.minOccupancyChild,
      useMaxOccupancy: room.useMaxOccupancy,
      maxOccupancyAdult: room.maxOccupancyAdult,
      maxOccupancyChild: room.maxOccupancyChild,
      totalOccupancy: room.totalOccupancy,
      minChildAge: room.minChildAge,
      maxChildAge: room.maxChildAge,

      extraBedAvailable: room.extraBedAvailable,
      extraBedCount: room.extraBedCount,
      bedConfiguration: room.bedConfiguration,

      description: room.description,
      enDescription: room.enDescription,

      viewType: room.viewType,
      smokingAllowed: room.smokingAllowed,
      amenities: room.amenities,
      accessibilityFeatures: room.accessibilityFeatures,
      images: room.images,
      status: room.status
    }
  })

  if (!room) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h3 className="text-xl mb-2" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
          객실을 찾을 수 없습니다
        </h3>
        <Link href="/rooms">
          <button
            className="mt-4 px-4 py-2 rounded-lg"
            style={{
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            목록으로 돌아가기
          </button>
        </Link>
      </div>
    )
  }

  const handleChange = (data: Partial<RoomFormData>) => {
    setFormData(prev => ({ ...prev, ...data }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1: // 기본정보
        return !!(formData.name && formData.type && formData.viewType && formData.smokingAllowed !== undefined)
      case 2: // 객실정보
        return !!(
          formData.size &&
          formData.size > 0 &&
          formData.floor !== undefined &&
          formData.bedConfiguration &&
          formData.bedConfiguration.length > 0
        )
      case 3: // 인원정보
        return !!(
          formData.standardOccupancyAdult !== undefined &&
          formData.standardOccupancyChild !== undefined &&
          formData.useMaxOccupancy !== undefined &&
          (formData.useMaxOccupancy
            ? (formData.maxOccupancyAdult !== undefined && formData.maxOccupancyChild !== undefined)
            : formData.totalOccupancy !== undefined
          ) &&
          formData.minChildAge !== undefined &&
          formData.maxChildAge !== undefined
        )
      case 4: // 객실설명
        return true // 설명은 선택사항
      case 5: // 편의시설
        return true // 편의시설은 선택사항
      case 6: // 이미지
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

    // TODO: API 호출로 데이터 수정
    console.log('객실 수정 데이터:', formData)

    // 임시로 콘솔 출력 후 상세 화면으로 이동
    alert('객실이 수정되었습니다!')
    router.push(`/rooms/${id}`)
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/rooms/${id}`}>
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              borderRadius: 'var(--radius-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            <ArrowLeft className="w-4 h-4" />
            뒤로
          </button>
        </Link>

        <div className="flex items-center gap-3">
          <Edit className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          <h1 className="text-2xl" style={{ fontWeight: 'var(--font-bold)', color: 'var(--text-primary)' }}>
            객실 수정: {room.name}
          </h1>
        </div>
      </div>

      {/* Form Container */}
      <div
        className="p-8 rounded-lg"
        style={{
          backgroundColor: 'var(--bg-primary)',
          border: '1px solid var(--border-color)'
        }}
      >
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
              isEditMode={true}
            />
          )}
          {currentStep === 2 && (
            <Step2Details formData={formData} onChange={handleChange} />
          )}
          {currentStep === 3 && (
            <Step3Occupancy formData={formData} onChange={handleChange} />
          )}
          {currentStep === 4 && (
            <Step4Description formData={formData} onChange={handleChange} />
          )}
          {currentStep === 5 && (
            <Step5Features formData={formData} onChange={handleChange} />
          )}
          {currentStep === 6 && (
            <Step6Images formData={formData} onChange={handleChange} />
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
          submitLabel="수정 완료"
        />

        {/* Metadata */}
        <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs" style={{ color: 'var(--text-tertiary)' }}>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>생성일: {room.createdAt.toLocaleDateString('ko-KR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>수정일: {room.updatedAt.toLocaleDateString('ko-KR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>생성자: {room.createdBy}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>수정자: {room.updatedBy}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}