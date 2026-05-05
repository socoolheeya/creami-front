interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Steps */}
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all"
                  style={{
                    backgroundColor: isActive || isCompleted ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: isActive || isCompleted ? '#ffffff' : 'var(--text-tertiary)',
                    fontWeight: 'var(--font-bold)',
                    border: isActive ? '3px solid var(--primary)' : 'none',
                    boxShadow: isActive ? '0 0 0 4px rgba(250, 131, 131, 0.2)' : 'none'
                  }}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span
                  className="text-sm text-center"
                  style={{
                    color: isActive ? 'var(--primary)' : isCompleted ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)'
                  }}
                >
                  {step}
                </span>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-1 mx-4 mt-[-30px] transition-all"
                  style={{
                    backgroundColor: isCompleted ? 'var(--primary)' : 'var(--bg-tertiary)'
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Progress Text */}
      <div className="text-center" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
        {currentStep} / {totalSteps} 단계
      </div>
    </div>
  )
}