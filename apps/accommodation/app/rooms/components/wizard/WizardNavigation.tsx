import { Check, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Button } from '@creami/ui'
import { useTranslations } from 'next-intl'

interface WizardNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  canProceed: boolean
  submitLabel?: string
  isSubmitting?: boolean
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  canProceed,
  submitLabel,
  isSubmitting = false
}: WizardNavigationProps) {
  const t = useTranslations('accommodation.rooms')
  const commonT = useTranslations('accommodation.common')
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps
  const finalSubmitLabel = submitLabel ?? t('steps.done')

  return (
    <div className="flex items-center justify-between border-t border-border pt-lg">
      <div>
        {!isFirstStep && (
          <Button variant="secondary" onClick={onPrevious}>
            <ChevronLeft className="h-icon-md w-icon-md" />
            {t('steps.previous')}
          </Button>
        )}
      </div>

      {isLastStep ? (
        <Button
          onClick={onSubmit}
          disabled={!canProceed || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-icon-md w-icon-md animate-spin" />
              {commonT('submittingCreate')}
            </>
          ) : (
            <>
              <Check className="h-icon-md w-icon-md" />
              {finalSubmitLabel}
            </>
          )}
        </Button>
      ) : (
        <Button onClick={onNext} disabled={!canProceed}>
          {t('steps.next')}
          <ChevronRight className="h-icon-md w-icon-md" />
        </Button>
      )}
    </div>
  )
}
