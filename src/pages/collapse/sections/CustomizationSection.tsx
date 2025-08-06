import { useState } from 'preact/hooks'

export function CustomizationSection() {
  const [activeKey, setActiveKey] = useState<string>('1')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Customization</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Customize the appearance and behavior of collapse panels with different styles, icons, and interactions.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Custom Icons & Styling</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-2">
              {/* Panel with custom plus/minus icon */}
              <div className="border border-blue-200 dark:border-blue-600 rounded-lg shadow-sm">
                <button
                  onClick={() => setActiveKey(activeKey === '1' ? '' : '1')}
                  className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800/30 dark:hover:to-blue-700/30 transition-all rounded-t-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-blue-600 dark:text-blue-400 text-xl">💎</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Premium Features
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs rounded-full">Pro</span>
                    <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2 border-blue-500 ${
                      activeKey === '1' ? 'bg-blue-500' : 'bg-white dark:bg-gray-800'
                    }`}>
                      <span className={`text-sm font-bold ${
                        activeKey === '1' ? 'text-white' : 'text-blue-500'
                      }`}>
                        {activeKey === '1' ? '−' : '+'}
                      </span>
                    </div>
                  </div>
                </button>
                {activeKey === '1' && (
                  <div className="p-4 bg-white dark:bg-gray-800 border-t border-blue-200 dark:border-blue-600">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">Advanced Analytics</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">Priority Support</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">Custom Integrations</span>
                      </div>
                      <div className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-green-500 text-xl">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">Team Collaboration</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel with custom icon and extra content */}
              <div className="border border-green-200 dark:border-green-600 rounded-lg shadow-sm">
                <button
                  onClick={() => setActiveKey(activeKey === '2' ? '' : '2')}
                  className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 hover:from-green-100 hover:to-green-200 dark:hover:from-green-800/30 dark:hover:to-green-700/30 transition-all rounded-t-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-green-600 dark:text-green-400 text-xl">🎯</span>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        Goals & Objectives
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        Track your progress
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 text-xs rounded-full">
                      3 active
                    </span>
                    <svg
                      className={`w-5 h-5 text-green-600 dark:text-green-400 transform transition-transform ${
                        activeKey === '2' ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                {activeKey === '2' && (
                  <div className="p-4 bg-white dark:bg-gray-800 border-t border-green-200 dark:border-green-600">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">Complete project documentation</span>
                        </div>
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">80%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">Improve test coverage</span>
                        </div>
                        <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">45%</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                          <span className="text-gray-700 dark:text-gray-300">Launch beta version</span>
                        </div>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">0%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Panel with warning style */}
              <div className="border border-orange-200 dark:border-orange-600 rounded-lg shadow-sm">
                <button
                  onClick={() => setActiveKey(activeKey === '3' ? '' : '3')}
                  className="w-full flex items-center justify-between p-4 text-left bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 hover:from-orange-100 hover:to-orange-200 dark:hover:from-orange-800/30 dark:hover:to-orange-700/30 transition-all rounded-t-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-orange-600 dark:text-orange-400 text-xl">⚠️</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      Important Notice
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-orange-600 dark:text-orange-400 transform transition-transform ${
                      activeKey === '3' ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeKey === '3' && (
                  <div className="p-4 bg-white dark:bg-gray-800 border-t border-orange-200 dark:border-orange-600">
                    <div className="flex items-start space-x-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                      <svg className="w-5 h-5 text-orange-600 dark:text-orange-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-medium text-orange-900 dark:text-orange-200 mb-2">System Maintenance Scheduled</h4>
                        <p className="text-orange-800 dark:text-orange-300 text-sm">
                          Our services will be temporarily unavailable on Sunday, March 15th from 2:00 AM to 6:00 AM EST 
                          for scheduled maintenance. Please plan accordingly.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mt-4">
            <h4 className="font-medium mb-2">Usage:</h4>
            <pre className="text-sm overflow-x-auto">
              <code>{`<Collapse
  expandIcon={({ isActive }) => (
    <CustomIcon isActive={isActive} />
  )}
>
  <Collapse.Panel 
    key="1" 
    header={<CustomHeader />}
    extra={<Badge>Pro</Badge>}
  >
    <CustomContent />
  </Collapse.Panel>
</Collapse>`}</code>
            </pre>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Borderless & Ghost Styles</h3>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="space-y-4">
              {/* Borderless style */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Borderless Style</h4>
                <div className="space-y-1">
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg">
                    <button
                      onClick={() => setActiveKey(activeKey === 'borderless1' ? '' : 'borderless1')}
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">Simple Question 1</span>
                      <span className="text-gray-400">
                        {activeKey === 'borderless1' ? '−' : '+'}
                      </span>
                    </button>
                    {activeKey === 'borderless1' && (
                      <div className="px-3 pb-3 text-gray-600 dark:text-gray-300">
                        This is a clean, borderless collapse panel perfect for minimal designs.
                      </div>
                    )}
                  </div>
                  
                  <div className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-lg">
                    <button
                      onClick={() => setActiveKey(activeKey === 'borderless2' ? '' : 'borderless2')}
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <span className="font-medium text-gray-900 dark:text-white">Simple Question 2</span>
                      <span className="text-gray-400">
                        {activeKey === 'borderless2' ? '−' : '+'}
                      </span>
                    </button>
                    {activeKey === 'borderless2' && (
                      <div className="px-3 pb-3 text-gray-600 dark:text-gray-300">
                        Borderless panels work great in sidebars and content areas where you want a subtle approach.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ghost style */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Ghost Style</h4>
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="space-y-1">
                    <div className="hover:bg-white dark:hover:bg-gray-600 transition-colors rounded">
                      <button
                        onClick={() => setActiveKey(activeKey === 'ghost1' ? '' : 'ghost1')}
                        className="w-full flex items-center justify-between p-3 text-left"
                      >
                        <span className="font-medium text-gray-900 dark:text-white">Ghost Panel 1</span>
                        <span className="text-blue-500">
                          {activeKey === 'ghost1' ? '▼' : '▶'}
                        </span>
                      </button>
                      {activeKey === 'ghost1' && (
                        <div className="px-3 pb-3 text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-600 rounded mx-3">
                          Ghost style panels have subtle backgrounds that become more prominent on interaction.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
