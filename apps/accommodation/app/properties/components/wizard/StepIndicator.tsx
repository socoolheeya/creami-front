interface StepIndicatorProps {
  currentStep: number
  totalSteps: number
  steps: string[]
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="mb-lg">
      {/* Steps */}
      <div className="flex items-center justify-between mb-md">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className="w-xl h-xl rounded flex items-center justify-center mb-xs transition-all text-base"
                  style={{
                    backgroundColor: isActive || isCompleted ? 'var(--primary)' : 'var(--bg-tertiary)',
                    color: isActive || isCompleted ? 'var(--text-on-primary)' : 'var(--text-tertiary)',
                    fontWeight: 'var(--font-bold)',
                    border: isActive ? 'var(--border-primary-strong)' : 'none',
                    boxShadow: isActive ? 'var(--focus-ring)' : 'none'
                  }}
                >
                  {isCompleted ? '✓' : stepNumber}
                </div>
                <span
                  className="text-xs text-center"
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
                  className="flex-1 h-xs mx-md -mt-lg transition-all"
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
      <div className="text-center text-base" style={{ color: 'var(--text-secondary)', fontWeight: 'var(--font-light)' }}>
        {currentStep} / {totalSteps} 단계
      </div>
    </div>
  )
}