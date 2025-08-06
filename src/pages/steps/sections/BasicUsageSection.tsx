import { useState } from 'preact/hooks'
import { Steps } from '../../../../nebula/components/Steps'
import type { StepItem } from '../../../../nebula/components/Steps'

export function BasicUsageSection() {
  const [currentStep, setCurrentStep] = useState(0)

  const basicSteps: StepItem[] = [
    {
      key: 'step1',
      title: 'Login',
      description: 'Enter your credentials to access the system.',
    },
    {
      key: 'step2', 
      title: 'Verification',
      description: 'Verify your identity through email or SMS.',
    },
    {
      key: 'step3',
      title: 'Payment',
      description: 'Complete your payment information.',
    },
    {
      key: 'step4',
      title: 'Done',
      description: 'Your account has been successfully created.',
    },
  ]

  const nextStep = () => {
    if (currentStep < basicSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Basic Usage</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A simple steps component to guide users through a multi-step process.
        </p>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <Steps
            steps={basicSteps}
            current={currentStep}
            onChange={handleStepChange}
          />

          <div className="mt-8 flex gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === basicSteps.length - 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
            >
              Next
            </button>
          </div>

          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Current Step: {currentStep + 1} - {basicSteps[currentStep]?.title}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Code Example</h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code>{`import { Steps } from '@/components/Steps'

const steps = [
  { key: 'step1', title: 'Login', description: 'Enter your credentials...' },
  { key: 'step2', title: 'Verification', description: 'Verify your identity...' },
  { key: 'step3', title: 'Payment', description: 'Complete payment...' },
  { key: 'step4', title: 'Done', description: 'Account created!' }
]

function MySteps() {
  const [current, setCurrent] = useState(0)

  return (
    <Steps
      steps={steps}
      current={current}
      onChange={setCurrent}
    />
  )
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
