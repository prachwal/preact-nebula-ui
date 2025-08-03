import { useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Button } from '@/components'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="app-container">
      <div class="flex justify-center items-center gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" class="block">
          <img src={viteLogo} class="logo hover:animate-spin" alt="Vite logo" />
        </a>
        <a href="https://preactjs.com" target="_blank" class="block">
          <img src={preactLogo} class="logo preact hover:animate-pulse" alt="Preact logo" />
        </a>
      </div>
      
      <h1 class="hero-title">Nebula UI Components</h1>
      
      <div class="card max-w-md mx-auto mb-8">
        <div class="space-y-4 mb-6">
          <h2 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Button Examples</h2>
          
          <div class="grid grid-cols-2 gap-3">
            <Button variant="primary" size="sm">Primary SM</Button>
            <Button variant="secondary" size="sm">Secondary SM</Button>
            <Button variant="outline" size="md">Outline MD</Button>
            <Button variant="ghost" size="md">Ghost MD</Button>
          </div>
          
          <div class="space-y-3">
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </Button>
            
            <Button variant="destructive" fullWidth loading>
              Loading Button
            </Button>
            
            <Button 
              variant="outline" 
              fullWidth
              leftIcon="🚀"
              rightIcon="✨"
            >
              With Icons
            </Button>
          </div>
        </div>
        
        <p class="text-gray-600 dark:text-gray-300 text-sm">
          Edit <code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">nebula/components/Button</code> to customize
        </p>
      </div>
      
      <div class="space-y-4 max-w-2xl mx-auto">
        <p class="text-lg">
          🎉 <strong>Nebula UI</strong> - A modern component library built with{' '}
          <a
            href="https://preactjs.com"
            target="_blank"
            class="feature-link"
          >
            Preact
          </a>
          {' '} and{' '}
          <a
            href="https://tailwindcss.com" 
            target="_blank"
            class="feature-link"
          >
            Tailwind CSS
          </a>
        </p>
        <p class="read-the-docs">
          Ready for NPM deployment and production use
        </p>
      </div>
    </div>
  )
}
