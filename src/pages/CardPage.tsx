import { useState } from 'preact/hooks'
import { Card, Button, Input, Label } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function CardPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'basic' | 'variants' | 'structure' | 'examples'>('basic')

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div class="flex items-center justify-between">
            <div>
              <button 
                onClick={() => route('/')}
                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-2 inline-flex items-center"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back to Components
              </button>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Card Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Content container with header, body, and footer sections for organized layouts
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'basic', label: 'Basic Usage' },
              { key: 'variants', label: 'Card Variants' },
              { key: 'structure', label: 'Card Structure' },
              { key: 'examples', label: 'Real Examples' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveDemo(tab.key as any)}
                class={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === tab.key
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                    : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Basic Usage */}
        {activeDemo === 'basic' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Basic Card Usage</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Simple card containers for grouping related content with consistent styling.
              </p>

              <div class="space-y-8">
                {/* Simple Cards */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Simple Content Cards</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Simple Card
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300">
                          This is a basic card with simple content. Perfect for displaying basic information or content blocks.
                        </p>
                    </Card>

                    <Card>
                        <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                          <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          With Icon
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300">
                          Card with an icon element to provide visual context and improve user recognition.
                        </p>
                    </Card>

                    <Card>
                        <div class="flex items-center mb-4">
                          <div class="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                            <svg class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div class="ml-3">
                            <span class="text-sm font-medium text-green-800 dark:text-green-200 bg-green-100 dark:bg-green-900 px-2 py-1 rounded">
                              Success
                            </span>
                          </div>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Status Card
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300">
                          Card with status indicators and contextual information for system messages.
                        </p>
                    </Card>
                  </div>
                </div>

                {/* Cards with Actions */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Cards with Actions</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Product Feature
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                          Discover our latest features and improvements that make your workflow more efficient.
                        </p>
                        <Button size="sm">Learn More</Button>
                      </div>
                    </Card>

                    <Card>
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          Quick Settings
                        </h4>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">
                          Adjust your preferences and customize your experience with these quick settings.
                        </p>
                        <div class="flex gap-2">
                          <Button size="sm" variant="outline">Cancel</Button>
                          <Button size="sm">Save Changes</Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Clickable Cards */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Interactive Cards</h3>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Cards that act as clickable elements with hover effects
                  </p>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-blue-300 dark:hover:border-blue-600">
                      <div class="p-6 text-center">
                        <div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Analytics</h4>
                        <p class="text-gray-600 dark:text-gray-300 text-sm">View detailed reports</p>
                      </div>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-green-300 dark:hover:border-green-600">
                      <div class="p-6 text-center">
                        <div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                          </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Create New</h4>
                        <p class="text-gray-600 dark:text-gray-300 text-sm">Start a new project</p>
                      </div>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200 hover:border-orange-300 dark:hover:border-orange-600">
                      <div class="p-6 text-center">
                        <div class="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                          <svg class="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Settings</h4>
                        <p class="text-gray-600 dark:text-gray-300 text-sm">Configure options</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Variants Demo */}
        {activeDemo === 'variants' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Card Variants</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Different card styles for various use cases and visual hierarchy.
              </p>

              <div class="space-y-8">
                {/* Shadow Variants */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Shadow Variants</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="shadow-sm">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Small Shadow</h4>
                        <p class="text-gray-600 dark:text-gray-300">Subtle elevation for content that needs slight separation.</p>
                      </div>
                    </Card>

                    <Card className="shadow-md">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Medium Shadow</h4>
                        <p class="text-gray-600 dark:text-gray-300">Default elevation for most card content and components.</p>
                      </div>
                    </Card>

                    <Card className="shadow-lg">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Large Shadow</h4>
                        <p class="text-gray-600 dark:text-gray-300">Higher elevation for modals, popovers, and important content.</p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Border Variants */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Border Variants</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-2 border-blue-200 dark:border-blue-800">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Accent Border</h4>
                        <p class="text-gray-600 dark:text-gray-300">Card with colored border for emphasis or categorization.</p>
                      </div>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Side Accent</h4>
                        <p class="text-gray-600 dark:text-gray-300">Left border accent for status indicators or categories.</p>
                      </div>
                    </Card>

                    <Card className="border-dashed border-2 border-gray-300 dark:border-gray-600">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Dashed Border</h4>
                        <p class="text-gray-600 dark:text-gray-300">Dashed border style for upload areas or placeholders.</p>
                      </div>
                    </Card>

                    <Card className="border-0 bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                      <div class="bg-white dark:bg-gray-800 rounded-lg p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Gradient Border</h4>
                        <p class="text-gray-600 dark:text-gray-300">Gradient border effect for premium or highlighted content.</p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Background Variants */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Background Variants</h3>
                  
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Info Card</h4>
                        <p class="text-blue-800 dark:text-blue-200">Information or help content with blue theming.</p>
                      </div>
                    </Card>

                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">Success Card</h4>
                        <p class="text-green-800 dark:text-green-200">Success messages or positive status updates.</p>
                      </div>
                    </Card>

                    <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">Warning Card</h4>
                        <p class="text-yellow-800 dark:text-yellow-200">Warnings or caution messages for users.</p>
                      </div>
                    </Card>

                    <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">Error Card</h4>
                        <p class="text-red-800 dark:text-red-200">Error messages or critical alerts.</p>
                      </div>
                    </Card>

                    <Card className="bg-gray-50 dark:bg-gray-700">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Neutral Card</h4>
                        <p class="text-gray-600 dark:text-gray-300">Neutral content without specific semantic meaning.</p>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
                      <div class="p-6">
                        <h4 class="text-lg font-semibold mb-2">Gradient Card</h4>
                        <p class="text-purple-100">Eye-catching gradient backgrounds for featured content.</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Structure Demo */}
        {activeDemo === 'structure' && (
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
        )}

        {/* Examples Demo */}
        {activeDemo === 'examples' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Real-world Examples</h2>
              
              <div class="space-y-12">
                {/* User Profile Card */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">User Profile Card</h3>
                  <div class="max-w-sm">
                    <Card>
                      <div class="p-6 text-center">
                        <div class="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4"></div>
                        <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-1">Sarah Johnson</h4>
                        <p class="text-gray-600 dark:text-gray-300 mb-4">Product Designer</p>
                        <div class="flex justify-center space-x-4 mb-4">
                          <div class="text-center">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">124</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">Projects</div>
                          </div>
                          <div class="text-center">
                            <div class="text-2xl font-bold text-gray-900 dark:text-white">2.5k</div>
                            <div class="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                          </div>
                        </div>
                        <div class="flex space-x-2">
                          <Button size="sm" className="flex-1">Follow</Button>
                          <Button size="sm" variant="outline" className="flex-1">Message</Button>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Pricing Card */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Pricing Cards</h3>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { name: 'Basic', price: '$9', features: ['10 Projects', '5GB Storage', 'Email Support'] },
                      { name: 'Pro', price: '$29', features: ['Unlimited Projects', '100GB Storage', 'Priority Support', 'Advanced Analytics'], popular: true },
                      { name: 'Enterprise', price: '$99', features: ['Unlimited Everything', '1TB Storage', '24/7 Support', 'Custom Integrations'] }
                    ].map((plan, index) => (
                      <Card key={index} className={plan.popular ? 'border-blue-500 border-2' : ''}>
                        {plan.popular && (
                          <div class="bg-blue-500 text-white text-center py-2 text-sm font-medium rounded-t-lg">
                            Most Popular
                          </div>
                        )}
                        <div class="p-6">
                          <div class="text-center mb-6">
                            <h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h4>
                            <div class="text-4xl font-bold text-gray-900 dark:text-white">
                              {plan.price}
                              <span class="text-lg font-normal text-gray-500 dark:text-gray-400">/month</span>
                            </div>
                          </div>
                          <ul class="space-y-3 mb-6">
                            {plan.features.map((feature, i) => (
                              <li key={i} class="flex items-center text-gray-600 dark:text-gray-300">
                                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                              </li>
                            ))}
                          </ul>
                          <Button className="w-full" variant={plan.popular ? 'primary' : 'outline'}>
                            Choose Plan
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Dashboard Statistics</h3>
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { title: 'Total Users', value: '2,543', change: '+12%', color: 'blue' },
                      { title: 'Revenue', value: '$45,632', change: '+8%', color: 'green' },
                      { title: 'Orders', value: '1,234', change: '-3%', color: 'red' },
                      { title: 'Conversion', value: '3.2%', change: '+0.5%', color: 'purple' }
                    ].map((stat, index) => (
                      <Card key={index}>
                        <div class="p-6">
                          <div class="flex items-center justify-between">
                            <div>
                              <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{stat.title}</p>
                              <p class="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                            </div>
                            <div class={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {stat.change}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Form Card */}
                <div class="space-y-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">Contact Form Card</h3>
                  <div class="max-w-md">
                    <Card>
                      <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Get in Touch</h4>
                        <p class="text-sm text-gray-600 dark:text-gray-300">We'd love to hear from you</p>
                      </div>
                      <div class="p-6">
                        <div class="space-y-4">
                          <div>
                            <Label htmlFor="contact-name">Name</Label>
                            <Input id="contact-name" placeholder="Your name" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="contact-email">Email</Label>
                            <Input id="contact-email" type="email" placeholder="your@email.com" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="contact-message">Message</Label>
                            <textarea 
                              id="contact-message"
                              rows={4}
                              placeholder="Your message..."
                              class="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="px-6 py-4 bg-gray-50 dark:bg-gray-700 rounded-b-lg">
                        <Button className="w-full">Send Message</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
