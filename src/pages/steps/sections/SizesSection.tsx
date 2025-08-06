import { useState } from 'preact/hooks'
import { Steps } from '../../../../nebula/components/Steps'
import type { StepItem } from '../../../../nebula/components/Steps'

export function SizesSection() {
  const [currentSmall, setCurrentSmall] = useState(0)
  const [currentDefault, setCurrentDefault] = useState(1)

  const steps: StepItem[] = [
    { key: 'step1', title: 'First Step', description: 'This is the first step' },
    { key: 'step2', title: 'Second Step', description: 'This is the second step' },
    { key: 'step3', title: 'Third Step', description: 'This is the third step' },
    { key: 'step4', title: 'Final Step', description: 'This is the final step' }
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Size Variants</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Steps components are available in different sizes to fit various design contexts.
        </p>
      </div>

      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Small Size</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <Steps
              steps={steps}
              current={currentSmall}
              size="small"
              onChange={setCurrentSmall}
            />
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setCurrentSmall(Math.max(0, currentSmall - 1))}
                disabled={currentSmall === 0}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentSmall(Math.min(steps.length - 1, currentSmall + 1))}
                disabled={currentSmall === steps.length - 1}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Default Size</h3>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <Steps
              steps={steps}
              current={currentDefault}
              onChange={setCurrentDefault}
            />
            
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setCurrentDefault(Math.max(0, currentDefault - 1))}
                disabled={currentDefault === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentDefault(Math.min(steps.length - 1, currentDefault + 1))}
                disabled={currentDefault === steps.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Code Examples</h3>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-sm text-gray-100">
            <code>{`// Small size steps
<Steps
  steps={steps}
  current={current}
  size="small"
  onChange={setCurrent}
/>

// Default size steps (default)
<Steps
  steps={steps}
  current={current}
  onChange={setCurrent}
/>`}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
