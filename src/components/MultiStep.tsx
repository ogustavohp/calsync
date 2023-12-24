import React from 'react'

interface MultiStepProps {
  steps: number
  currentStep: number
}

export default function MultiStep({ steps, currentStep }: MultiStepProps) {
  const stepsArray = Array.from({ length: steps }, (_, i) => i + 1)

  return (
    <div className="space-y-1">
      <span>
        Passo {currentStep} de {steps}
      </span>
      <div className="flex gap-2">
        {stepsArray.map((step, i) => (
          <span
            key={`${step}-${i}`}
            className={`h-1 flex-1 rounded-lg ${
              step <= currentStep ? 'bg-gray-100' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
