interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export default function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                i < currentStep
                  ? 'bg-emerald-600 text-white'
                  : i === currentStep
                  ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-600'
                  : 'bg-gray-100 text-gray-400'
              }`}
            >
              {i < currentStep ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < totalSteps - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 ${
                  i < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {labels.map((label, i) => (
          <span
            key={i}
            className={`text-xs ${
              i === currentStep ? 'text-emerald-700 font-medium' : 'text-gray-400'
            }`}
            style={{ width: `${100 / totalSteps}%`, textAlign: i === 0 ? 'left' : i === totalSteps - 1 ? 'right' : 'center' }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
