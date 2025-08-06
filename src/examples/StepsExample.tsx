import { useState } from 'preact/hooks'
import { Steps, type StepItem } from '../../nebula/components/Steps'

export function StepsExample() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps: StepItem[] = [
    {
      key: 'step1',
      title: 'Login',
      description: 'This is a description for step 1.',
    },
    {
      key: 'step2',
      title: 'Verification',
      description: 'This is a description for step 2.',
    },
    {
      key: 'step3',
      title: 'Payment',
      description: 'This is a description for step 3.',
    },
    {
      key: 'step4',
      title: 'Done',
      description: 'This is a description for step 4.',
    },
  ]

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Steps Component Examples</h1>
      
      <div className="space-y-12">
        {/* Basic horizontal steps */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Basic Horizontal Steps</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Steps
              steps={steps}
              current={currentStep}
              onChange={handleStepChange}
            />
            
            <div className="mt-6 flex gap-4">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                disabled={currentStep === steps.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        {/* Vertical steps */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Vertical Steps</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Steps
              steps={steps}
              current={currentStep}
              direction="vertical"
              onChange={handleStepChange}
            />
          </div>
        </section>

        {/* Small size steps */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Small Size Steps</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Steps
              steps={steps}
              current={currentStep}
              size="small"
              onChange={handleStepChange}
            />
          </div>
        </section>

        {/* Steps with custom status */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Steps with Error Status</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Steps
              steps={[
                { ...steps[0], status: 'finish' },
                { ...steps[1], status: 'error' },
                { ...steps[2], status: 'wait' },
                { ...steps[3], status: 'wait' },
              ]}
              current={1}
              status="error"
              onChange={handleStepChange}
            />
          </div>
        </section>

        {/* Progress dot steps */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Progress Dot Steps</h2>
          <div className="bg-white p-6 rounded-lg border">
            <Steps
              steps={steps}
              current={currentStep}
              progressDot
              onChange={handleStepChange}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
