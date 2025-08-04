import { useState } from 'preact/hooks'
import { Radio, RadioGroup } from '../../../../nebula/components/Radio'

export function InteractiveSection() {
  const [surveyData, setSurveyData] = useState({
    experience: '',
    satisfaction: '',
    recommendation: '',
    frequency: ''
  })

  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSurveyChange = (field: string) => (value: string) => {
    setSurveyData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 3000)
  }

  const isFormComplete = Object.values(surveyData).every(value => value !== '')

  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Interactive Examples</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Real-world examples demonstrating radio buttons in interactive forms and surveys.
        </p>

        <div class="space-y-12">
          {/* Survey Form */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Customer Satisfaction Survey</h3>
            <p class="text-gray-600 dark:text-gray-300">
              A complete survey form using radio groups for multiple choice questions.
            </p>

            <div class="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg">
              <form onSubmit={handleSubmit}>
                <div class="space-y-8">
                  {/* Experience Level */}
                  <RadioGroup
                    name="experience"
                    label="How would you rate your overall experience?"
                    description="Please select the option that best describes your experience"
                    value={surveyData.experience}
                    onChange={handleSurveyChange('experience')}
                    spacing="md"
                  >
                    <Radio value="excellent" label="Excellent" description="Exceeded expectations" />
                    <Radio value="good" label="Good" description="Met expectations" />
                    <Radio value="fair" label="Fair" description="Somewhat below expectations" />
                    <Radio value="poor" label="Poor" description="Well below expectations" />
                  </RadioGroup>

                  {/* Satisfaction */}
                  <RadioGroup
                    name="satisfaction"
                    label="How satisfied are you with our service?"
                    value={surveyData.satisfaction}
                    onChange={handleSurveyChange('satisfaction')}
                    orientation="horizontal"
                    spacing="lg"
                  >
                    <Radio value="very-satisfied" label="Very Satisfied" />
                    <Radio value="satisfied" label="Satisfied" />
                    <Radio value="neutral" label="Neutral" />
                    <Radio value="dissatisfied" label="Dissatisfied" />
                    <Radio value="very-dissatisfied" label="Very Dissatisfied" />
                  </RadioGroup>

                  {/* Recommendation */}
                  <RadioGroup
                    name="recommendation"
                    label="Would you recommend us to others?"
                    value={surveyData.recommendation}
                    onChange={handleSurveyChange('recommendation')}
                    size="lg"
                  >
                    <Radio value="definitely">
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 mt-1">
                          <div class="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900 dark:text-white">Definitely Yes</p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">I would actively recommend you</p>
                        </div>
                      </div>
                    </Radio>
                    
                    <Radio value="probably">
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 mt-1">
                          <div class="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900 dark:text-white">Probably Yes</p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">I would likely recommend you</p>
                        </div>
                      </div>
                    </Radio>
                    
                    <Radio value="maybe">
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 mt-1">
                          <div class="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-yellow-600 dark:text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900 dark:text-white">Not Sure</p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">I'm undecided at this time</p>
                        </div>
                      </div>
                    </Radio>
                    
                    <Radio value="probably-not">
                      <div class="flex items-start space-x-3">
                        <div class="flex-shrink-0 mt-1">
                          <div class="w-6 h-6 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <p class="font-medium text-gray-900 dark:text-white">Probably Not</p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">I would not recommend you</p>
                        </div>
                      </div>
                    </Radio>
                  </RadioGroup>

                  {/* Frequency */}
                  <RadioGroup
                    name="frequency"
                    label="How often do you use our service?"
                    value={surveyData.frequency}
                    onChange={handleSurveyChange('frequency')}
                    variant="outlined"
                  >
                    <Radio value="daily" label="Daily" description="Every day" />
                    <Radio value="weekly" label="Weekly" description="Once or more per week" />
                    <Radio value="monthly" label="Monthly" description="Once or more per month" />
                    <Radio value="rarely" label="Rarely" description="Less than once per month" />
                    <Radio value="first-time" label="First Time" description="This is my first time" />
                  </RadioGroup>

                  {/* Form Status */}
                  <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
                    <div class="flex items-center justify-between">
                      <div class="flex-1">
                        <h4 class="text-lg font-medium text-gray-900 dark:text-white">Form Progress</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">
                          {Object.values(surveyData).filter(v => v).length} of 4 questions completed
                        </p>
                        <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                          <div 
                            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(Object.values(surveyData).filter(v => v).length / 4) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div class="ml-6">
                        <button
                          type="submit"
                          disabled={!isFormComplete}
                          class={`px-6 py-3 rounded-lg font-medium transition-colors ${
                            isFormComplete
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Submit Survey
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Success Message */}
                  {formSubmitted && (
                    <div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div class="flex">
                        <svg class="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        <div>
                          <h3 class="text-sm font-medium text-green-800 dark:text-green-200">Survey Submitted Successfully!</h3>
                          <p class="text-sm text-green-700 dark:text-green-300 mt-1">Thank you for your feedback.</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Current Selection Display */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Current Survey Data</h3>
            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <pre class="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap overflow-x-auto">
                {JSON.stringify(surveyData, null, 2)}
              </pre>
            </div>
          </div>

          {/* Dynamic Form Example */}
          <div class="space-y-6">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">Dynamic Form Validation</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Form with conditional validation and error states.
            </p>

            <div class="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <RadioGroup
                name="subscription-type"
                label="Choose your subscription plan"
                description="Select the plan that best fits your needs"
                error={!surveyData.experience && formSubmitted}
                errorMessage={!surveyData.experience && formSubmitted ? "Please select a subscription plan" : undefined}
              >
                <Radio value="free" label="Free Plan" description="Basic features with limited usage" />
                <Radio value="starter" label="Starter Plan" description="$9/month - Enhanced features" />
                <Radio value="professional" label="Professional Plan" description="$29/month - Advanced features" />
                <Radio value="enterprise" label="Enterprise Plan" description="$99/month - Full feature set" />
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
