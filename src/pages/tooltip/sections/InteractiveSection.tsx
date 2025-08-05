import { Tooltip } from '../../../../nebula/components'

export function InteractiveSection() {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Complex Examples
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Real-world examples with rich content and practical use cases.
        </p>
      </div>
      
      <div className="space-y-6">
        {/* User Info Tooltip */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">User Information</h3>
          <Tooltip 
            content={
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    JD
                  </div>
                  <div>
                    <div className="font-semibold">John Doe</div>
                    <div className="text-xs opacity-75">Senior Developer</div>
                  </div>
                </div>
                <div className="text-sm">
                  <div>📧 john.doe@company.com</div>
                  <div>📱 +1 (555) 123-4567</div>
                  <div>🏢 Engineering Team</div>
                </div>
              </div>
            }
            size="lg"
            maxWidth="280px"
          >
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                JD
              </div>
              <span className="text-gray-900 dark:text-white">John Doe</span>
            </button>
          </Tooltip>
        </div>

        {/* Help Tooltip */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Help & Documentation</h3>
          <div className="flex items-center space-x-2">
            <label className="text-gray-900 dark:text-white">API Key</label>
            <Tooltip 
              content={
                <div className="space-y-2">
                  <div className="font-semibold">About API Keys</div>
                  <div className="text-sm space-y-1">
                    <p>API keys are used to authenticate requests to our API.</p>
                    <p><strong>Keep your key secure:</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>Don't share it publicly</li>
                      <li>Rotate keys regularly</li>
                      <li>Use environment variables</li>
                    </ul>
                  </div>
                </div>
              }
              trigger="click"
              size="lg"
              maxWidth="320px"
            >
              <button className="w-4 h-4 rounded-full bg-gray-400 dark:bg-gray-600 text-white text-xs flex items-center justify-center hover:bg-gray-500 dark:hover:bg-gray-500 transition-colors">
                ?
              </button>
            </Tooltip>
            <input 
              type="password" 
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your API key"
            />
          </div>
        </div>

        {/* Status Tooltip */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Status Indicators</h3>
          <div className="flex items-center space-x-4">
            <Tooltip 
              content="All systems operational"
              colorScheme="success"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white">Online</span>
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Experiencing high latency. Average response time: 2.3s"
              colorScheme="warning"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white">Degraded</span>
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Service unavailable. Last seen: 5 minutes ago"
              colorScheme="error"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-900 dark:text-white">Offline</span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>
  )
}
