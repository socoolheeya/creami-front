import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react'

interface WizardNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSubmit: () => void
  canProceed: boolean
  isSubmitting?: boolean
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  canProceed,
  isSubmitting = false
}: WizardNavigationProps) {
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  return (
    <div className="flex items-center justify-between pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
      {/* Previous Button */}
      {!isFirstStep && (
        <button
          onClick={onPrevious}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'var(--font-medium)'
          }}
        >
          <ChevronLeft className="w-5 h-5" />
          이전
        </button>
      )}

      {/* Spacer */}
      {isFirstStep && <div />}

      {/* Next/Submit Button */}
      {isLastStep ? (
        <button
          onClick={onSubmit}
          disabled={!canProceed || isSubmitting}
          className="flex items-center gap-2 px-6 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: canProceed && !isSubmitting ? 'var(--primary)' : 'var(--bg-tertiary)',
            color: canProceed && !isSubmitting ? '#ffffff' : 'var(--text-tertiary)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'var(--font-bold)',
            cursor: canProceed && !isSubmitting ? 'pointer' : 'not-allowed',
            opacity: canProceed && !isSubmitting ? 1 : 0.5
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              등록 중...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              완료
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
          style={{
            backgroundColor: canProceed ? 'var(--primary)' : 'var(--bg-tertiary)',
            color: canProceed ? '#ffffff' : 'var(--text-tertiary)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 'var(--font-medium)',
            cursor: canProceed ? 'pointer' : 'not-allowed',
            opacity: canProceed ? 1 : 0.5
          }}
        >
          다음
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
