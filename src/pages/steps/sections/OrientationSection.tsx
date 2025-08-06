import { useState } from 'preact/hooks'
import { Steps } from '../../../../nebula/components/Steps'
import type { StepItem } from '../../../../nebula/components/Steps'

export function OrientationSection() {
  const [horizontalCurrent, setHorizontalCurrent] = useState(1)
  const [verticalCurrent, setVerticalCurrent] = useState(2)

  const steps: StepItem[] = [
    { 
      key: 'step1', 
      title: 'Account Setup', 
      description: 'Create your account and verify email' 
    },
    { 
      key: 'step2', 
      title: 'Profile Information', 
      description: 'Fill in your personal details and preferences' 
    },
    { 
      key: 'step3', 
      title: 'Security Setup', 
      description: 'Configure two-factor authentication and security questions' 
    },
    { 
      key: 'step4', 
      title: 'Confirmation', 
      description: 'Review and confirm your account setup' 
    }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Orientation</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Steps can be displayed horizontally or vertically to fit different layout requirements.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Horizontal Steps (Default)</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <Steps
              steps={steps}
              current={horizontalCurrent}
              direction="horizontal"
              onChange={setHorizontalCurrent}
            />
            
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setHorizontalCurrent(Math.max(0, horizontalCurrent - 1))}
                disabled={horizontalCurrent === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setHorizontalCurrent(Math.min(steps.length - 1, horizontalCurrent + 1))}
                disabled={horizontalCurrent === steps.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vertical Steps</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="max-w-md">
              <Steps
                steps={steps}
                current={verticalCurrent}
                direction="vertical"
                onChange={setVerticalCurrent}
              />
              
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setVerticalCurrent(Math.max(0, verticalCurrent - 1))}
                  disabled={verticalCurrent === 0}
                  className="px-4 py-2 bg-gray-500 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => setVerticalCurrent(Math.min(steps.length - 1, verticalCurrent + 1))}
                  disabled={verticalCurrent === steps.length - 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50 hover:bg-blue-600 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Code Examples</h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code>{`// Horizontal steps (default)
<Steps
  steps={steps}
  current={current}
  direction="horizontal"
  onChange={setCurrent}
/>

// Vertical steps
<Steps
  steps={steps}
  current={current}
  direction="vertical"
  onChange={setCurrent}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
