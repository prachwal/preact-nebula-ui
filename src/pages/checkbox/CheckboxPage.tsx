import { BasicUsageSection, VariantsSection, InteractiveSection, AccessibilitySection } from './sections'

interface PageProps {
  path?: string
}

export function CheckboxPage(_props: PageProps) {
  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Checkbox Component
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Accessible checkbox inputs with support for controlled/uncontrolled modes, 
            indeterminate states, validation, and custom content. Perfect for forms, 
            settings, and selection interfaces.
          </p>
          
          {/* Key Features */}
          <div class="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Tri-State Support</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Built-in indeterminate state for "select all" scenarios
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">WCAG Compliant</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Full accessibility with keyboard navigation and screen reader support
              </p>
            </div>
            
            <div class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Form Integration</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Seamless integration with form libraries and validation
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div class="mb-12">
          <nav class="flex space-x-8 justify-center">
            <a 
              href="#basic-usage" 
              class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
            >
              Basic Usage
            </a>
            <a 
              href="#variants" 
              class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
            >
              Variants
            </a>
            <a 
              href="#interactive" 
              class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
            >
              Interactive
            </a>
            <a 
              href="#accessibility" 
              class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-medium transition-colors"
            >
              Accessibility
            </a>
          </nav>
        </div>

        {/* Content Sections */}
        <div class="space-y-16">
          <section id="basic-usage">
            <BasicUsageSection />
          </section>
          
          <section id="variants">
            <VariantsSection />
          </section>
          
          <section id="interactive">
            <InteractiveSection />
          </section>
          
          <section id="accessibility">
            <AccessibilitySection />
          </section>
        </div>

        {/* API Reference */}
        <div class="mt-16">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">API Reference</h2>
            
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead>
                  <tr class="border-b border-gray-200 dark:border-gray-600">
                    <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Prop</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Type</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Default</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">size</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">'sm' | 'md' | 'lg'</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">'md'</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Size of the checkbox</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">variant</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">'default' | 'outlined'</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">'default'</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Visual variant of the checkbox</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">label</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">-</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Label text for the checkbox</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">description</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">-</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Description text below the label</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">indeterminate</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">false</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Indeterminate state (tri-state)</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">error</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">boolean</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">false</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Error state</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">errorMessage</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">string</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">-</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Error message to display</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">labelPosition</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">'left' | 'right'</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">'right'</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Position of the label</td>
                  </tr>
                  <tr>
                    <td class="py-3 px-4 font-mono text-blue-600 dark:text-blue-400">children</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">ComponentChildren</td>
                    <td class="py-3 px-4 text-gray-600 dark:text-gray-400">-</td>
                    <td class="py-3 px-4 text-gray-900 dark:text-gray-100">Custom content instead of label</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div class="mt-6">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Inherits all HTML input attributes (checked, onChange, disabled, etc.)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
