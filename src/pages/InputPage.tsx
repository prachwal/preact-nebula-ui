import { useState } from 'preact/hooks'
import { Input, Label, FieldError } from '@/components'
import { route } from 'preact-router'

interface PageProps {
  path?: string
}

export function InputPage(_props: PageProps) {
  const [activeDemo, setActiveDemo] = useState<'sizes' | 'variants' | 'icons' | 'states'>('sizes')

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
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Input Component</h1>
              <p class="text-gray-600 dark:text-gray-300 mt-2">
                Text input field with validation, icons, and multiple size variants
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div class="flex space-x-1 mt-6 bg-gray-100 dark:bg-gray-700 p-1 rounded-lg">
            {[
              { key: 'sizes', label: 'Sizes' },
              { key: 'variants', label: 'Variants' },
              { key: 'icons', label: 'With Icons' },
              { key: 'states', label: 'States' }
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

        {/* Sizes Demo */}
        {activeDemo === 'sizes' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Input Sizes</h2>
              <p class="text-gray-600 dark:text-gray-300 mb-8">
                Different sizes control padding and text size for various UI contexts.
              </p>
              
              <div class="space-y-6 max-w-md">
                {[
                  { size: 'sm' as const, description: 'Small - compact forms, tight layouts' },
                  { size: 'md' as const, description: 'Medium - default size, general use' },
                  { size: 'lg' as const, description: 'Large - prominent forms, hero sections' }
                ].map(({ size, description }) => (
                  <div key={size} class="space-y-2">
                    <Label>{size.toUpperCase()} Input</Label>
                    <Input 
                      size={size}
                      placeholder={`${size.toUpperCase()} input placeholder`}
                    />
                    <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Variants Demo */}
        {activeDemo === 'variants' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Input Variants</h2>
              
              <div class="space-y-6 max-w-md">
                {[
                  { variant: 'default' as const, label: 'Default', description: 'Standard input styling' },
                  { variant: 'error' as const, label: 'Error', description: 'Error state with red border' },
                  { variant: 'success' as const, label: 'Success', description: 'Success state with green border' }
                ].map(({ variant, label, description }) => (
                  <div key={variant} class="space-y-2">
                    <Label>{label} Input</Label>
                    <Input 
                      variant={variant}
                      placeholder={`${label} input example`}
                      value={variant === 'error' ? 'invalid@email' : variant === 'success' ? 'valid@email.com' : ''}
                    />
                    {variant === 'error' && <FieldError>Please enter a valid email address</FieldError>}
                    <p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Icons Demo */}
        {activeDemo === 'icons' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Inputs with Icons</h2>
              
              <div class="space-y-6 max-w-md">
                <div class="space-y-2">
                  <Label>Email with left icon</Label>
                  <Input 
                    type="email"
                    placeholder="Enter your email"
                    leftIcon={
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    }
                  />
                </div>

                <div class="space-y-2">
                  <Label>Search with right icon</Label>
                  <Input 
                    type="search"
                    placeholder="Search..."
                    rightIcon={
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    }
                  />
                </div>

                <div class="space-y-2">
                  <Label>Password with visibility toggle</Label>
                  <Input 
                    type="password"
                    placeholder="Enter password"
                    leftIcon={
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    }
                    rightIcon={
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* States Demo */}
        {activeDemo === 'states' && (
          <div class="space-y-8">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Input States</h2>
              
              <div class="space-y-6 max-w-md">
                <div class="space-y-2">
                  <Label>Normal State</Label>
                  <Input placeholder="Normal input" />
                </div>

                <div class="space-y-2">
                  <Label>Disabled State</Label>
                  <Input placeholder="Disabled input" disabled />
                </div>

                <div class="space-y-2">
                  <Label>Required Field</Label>
                  <Input placeholder="Required input" required />
                </div>

                <div class="space-y-2">
                  <Label>With Helper Text</Label>
                  <Input placeholder="Input with helper" helperText="This is helper text to guide the user" />
                </div>

                <div class="space-y-2">
                  <Label>Invalid State</Label>
                  <Input placeholder="Invalid input" isInvalid />
                  <FieldError>This field contains an error</FieldError>
                </div>

                <div class="space-y-2">
                  <Label>Valid State</Label>
                  <Input placeholder="Valid input" isValid value="valid@example.com" />
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
