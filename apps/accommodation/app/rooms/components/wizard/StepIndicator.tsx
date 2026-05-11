import { Check } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  const commonT = useTranslations('accommodation.common')

  return (
    <div className="mb-lg">
      <div className="grid grid-cols-2 gap-sm md:grid-cols-3 lg:grid-cols-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep
          const stateClass =
            isActive || isCompleted
              ? 'border-primary bg-primary text-white'
              : 'border-border bg-bg-secondary text-text-tertiary'

          return (
            <div
              key={stepNumber}
              className={`flex items-center gap-sm rounded border p-sm ${stateClass}`}
            >
              <span className="flex h-control-sm w-control-sm shrink-0 items-center justify-center rounded bg-bg-primary text-base font-bold text-primary">
                {isCompleted ? <Check className="h-icon-md w-icon-md" /> : stepNumber}
              </span>
              <span className="text-base font-medium">
                {step}
              </span>
            </div>
          )
        })}
      </div>
      <div className="mt-md text-center text-base font-light text-text-secondary">
        {commonT('stepProgress', { current: currentStep, total: totalSteps })}
      </div>
    </div>
  )
}
