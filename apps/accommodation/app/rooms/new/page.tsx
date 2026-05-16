'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { RoomFormData } from '@/lib/types/room'
import { useCreateRoom } from '@/hooks/useRooms'
import { StepIndicator } from '../components/wizard/StepIndicator'
import { WizardNavigation } from '../components/wizard/WizardNavigation'
import { Step1Basic } from '../components/wizard/Step1Basic'
import { Step2Details } from '../components/wizard/Step2Details'
import { Step3Occupancy } from '../components/wizard/Step3Occupancy'
import { Step4Description } from '../components/wizard/Step4Description'
import { Step5Features } from '../components/wizard/Step5Features'
import { Step6Images } from '../components/wizard/Step6Images'
import { notifySaveError, notifySaveSuccess } from '@creami/ui'

function NewRoomPageContent() {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const router = useRouter()
  const searchParams = useSearchParams()
  const preselectedAccommodationId = searchParams?.get('accommodation') || undefined
  const createRoom = useCreateRoom()
  const steps = [
    t('steps.basic'),
    t('steps.details'),
    t('steps.occupancy'),
    t('steps.description'),
    t('steps.features'),
    t('steps.images')
  ]

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
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
          formData.floor !== undefined
        )
      case 3:
        return !!(
          formData.bedConfiguration &&
          formData.bedConfiguration.length > 0 &&
          formData.standardOccupancy &&
          formData.standardOccupancy > 0 &&
          formData.maxOccupancy &&
          formData.maxOccupancy >= formData.standardOccupancy
        )
      case 4:
        return true
      case 5:
        return !!(formData.viewType && formData.smokingAllowed !== undefined)
      case 6:
        return true
      default:
        return false
    }
  }

  const handleNext = () => {
    if (canProceed() && currentStep < steps.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!canProceed() || isSubmitting) return

    setIsSubmitting(true)

    try {
      await createRoom.mutateAsync(formData)

      notifySaveSuccess(commonT('successSaved'))

      router.push('/rooms')
    } catch (error) {
      console.error('Failed to create room:', error)
      notifySaveError(commonT('saveFailed'))
    } finally {
      setIsSubmitting(false)
    }
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
        <div className="mb-8">
          <h1
            className="text-2xl mb-2"
            style={{
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)'
            }}
          >
            {t('newTitle')}
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            {t('newDescription')}
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
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
          totalSteps={steps.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
          canProceed={canProceed()}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}

export default function NewRoomPage() {
  const commonT = useTranslations('accommodation.common')

  return (
    <Suspense fallback={<div className="p-6">{commonT('loading')}</div>}>
      <NewRoomPageContent />
    </Suspense>
  )
}
