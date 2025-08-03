import { Card, Button } from '@/components';

export function StructureSection() {
  return (
    <div class="space-y-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Card Structure</h2>
        <p class="text-gray-600 dark:text-gray-300 mb-8">
          Organized card layouts with header, body, and footer sections.
        </p>

        <div class="space-y-8">
          {/* Basic Structure */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">Header, Body, Footer Structure</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                {/* Header */}
                <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div class="flex items-center justify-between">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Card Title</h4>
                    <button class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                {/* Body */}
                <div class="p-6">
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    This is the main content area of the card. It can contain any type of content including text, images, forms, and other components.
                  </p>
                  <div class="space-y-2">
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Created 2 hours ago
                    </div>
                    <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      By John Doe
                    </div>
                  </div>
                </div>
                
                {/* Footer */}
                <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600 rounded-b-lg">
                  <div class="flex justify-between items-center">
                    <div class="flex space-x-2">
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline">Share</Button>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </Card>

              <Card>
                {/* Header with Image */}
                <div class="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg flex items-center justify-center">
                  <div class="text-center text-white">
                    <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h4 class="text-xl font-semibold">Media Card</h4>
                  </div>
                </div>
                
                {/* Body */}
                <div class="p-6">
                  <h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Featured Content
                  </h5>
                  <p class="text-gray-600 dark:text-gray-300 mb-4">
                    Cards can include media elements like images, videos, or illustrations in the header area.
                  </p>
                  <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded">
                      Featured
                    </span>
                    <span>•</span>
                    <span>5 min read</span>
                  </div>
                </div>
                
                {/* Footer */}
                <div class="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <button class="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        24
                      </button>
                      <button class="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                        <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        12
                      </button>
                    </div>
                    <button class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* List Cards */}
          <div class="space-y-4">
            <h3 class="text-lg font-medium text-gray-900 dark:text-white">List-style Cards</h3>
            
            <div class="space-y-4">
              <Card>
                <div class="p-6">
                  <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h4>
                  <div class="space-y-4">
                    {[
                      { action: 'Created new project', time: '2 minutes ago', user: 'John Doe', icon: 'plus' },
                      { action: 'Updated documentation', time: '1 hour ago', user: 'Jane Smith', icon: 'edit' },
                      { action: 'Deployed to production', time: '3 hours ago', user: 'Mike Johnson', icon: 'upload' }
                    ].map((item, index) => (
                      <div key={index} class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                        <div class="flex-shrink-0">
                          <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <svg class="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                            </svg>
                          </div>
                        </div>
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 dark:text-white">{item.action}</p>
                          <p class="text-sm text-gray-500 dark:text-gray-400">{item.user} • {item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
