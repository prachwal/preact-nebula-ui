import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Button } from '@/components'
import { FormsShowcase } from './examples/FormsShowcase'
import { LayoutShowcase } from './LayoutShowcase'

export function App() {
  const [activeDemo, setActiveDemo] = useState<'buttons' | 'forms' | 'layout'>('forms')

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav class="bg-white shadow-sm border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo */}
            <div class="flex items-center gap-4">
              <div class="flex items-center gap-2">
                <img src={viteLogo} class="h-8 w-8" alt="Vite logo" />
                <img src={preactLogo} class="h-8 w-8" alt="Preact logo" />
              </div>
              <h1 class="text-xl font-bold text-gray-900">Nebula UI</h1>
            </div>
            
            {/* Navigation Tabs */}
            <div class="flex space-x-4">
              <button
                onClick={() => setActiveDemo('forms')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === 'forms'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Forms Foundation
              </button>
              <button
                onClick={() => setActiveDemo('layout')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === 'layout'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Layout System
              </button>
              <button
                onClick={() => setActiveDemo('buttons')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeDemo === 'buttons'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Buttons
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main class="py-8">
        {activeDemo === 'forms' && <FormsShowcase />}
        
        {activeDemo === 'layout' && (
          <div class="max-w-7xl mx-auto px-8">
            <LayoutShowcase />
          </div>
        )}
        
        {activeDemo === 'buttons' && (
          <div class="max-w-4xl mx-auto px-8">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-gray-900 mb-4">
                🎨 Button Showcase
              </h1>
              <p class="text-xl text-gray-600">
                Comprehensive button component demonstration
              </p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-8">
              <h2 class="text-2xl font-semibold text-gray-900 mb-6">Button Variants</h2>
              
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <h3 class="text-xl font-semibold text-gray-900 mb-4">Sizes</h3>
              <div class="flex flex-wrap gap-4 mb-8">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>

              <h3 class="text-xl font-semibold text-gray-900 mb-4">States</h3>
              <div class="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
