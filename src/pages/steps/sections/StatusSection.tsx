import { useState } from 'preact/hooks'
import { Steps } from '../../../../nebula/components/Steps'
import type { StepItem } from '../../../../nebula/components/Steps'

export function StatusSection() {
  const [processStep, setProcessStep] = useState(1)
  const [errorStep, setErrorStep] = useState(2)

  const processSteps: StepItem[] = [
    { key: 'step1', title: 'Start', description: 'Begin the process', status: 'finish' },
    { key: 'step2', title: 'Processing', description: 'Currently processing', status: 'process' },
    { key: 'step3', title: 'Review', description: 'Review and confirm', status: 'wait' },
    { key: 'step4', title: 'Complete', description: 'Process completed', status: 'wait' }
  ]

  const errorSteps: StepItem[] = [
    { key: 'step1', title: 'Login', description: 'User authentication', status: 'finish' },
    { key: 'step2', title: 'Verification', description: 'Identity verification', status: 'finish' },
    { key: 'step3', title: 'Payment', description: 'Payment processing failed', status: 'error' },
    { key: 'step4', title: 'Confirmation', description: 'Order confirmation', status: 'wait' }
  ]

  const progressDotSteps: StepItem[] = [
    { key: 'step1', title: 'Account Created', description: 'Your account has been created' },
    { key: 'step2', title: 'Email Verified', description: 'Email verification completed' },
    { key: 'step3', title: 'Profile Setup', description: 'Complete your profile' },
    { key: 'step4', title: 'Ready to Use', description: 'Your account is ready' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Status & Variants</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Steps support different status indicators and visual variants to communicate process state.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Processing Status</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <Steps
              steps={processSteps}
              current={processStep}
              status="process"
              onChange={setProcessStep}
            />
            
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Step 2 is currently being processed. The status will automatically update upon completion.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Error Status</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <Steps
              steps={errorSteps}
              current={errorStep}
              status="error"
              onChange={setErrorStep}
            />
            
            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md">
              <p className="text-sm text-red-700 dark:text-red-300">
                Payment processing failed. Please check your payment method and try again.
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progress Dots</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <Steps
              steps={progressDotSteps}
              current={1}
              progressDot={true}
            />
            
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Progress dots provide a more minimal visual style while maintaining clear progress indication.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Code Examples</h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code>{`// Steps with processing status
<Steps
  steps={steps}
  current={current}
  status="process"
  onChange={setCurrent}
/>

// Steps with error status
<Steps
  steps={errorSteps}
  current={current}
  status="error" 
  onChange={setCurrent}
/>

// Steps with progress dots
<Steps
  steps={steps}
  current={current}
  progressDot={true}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
