import { useState } from 'preact/hooks'
import { FieldErrorPage } from './pages/field-error'
import Router, { route } from 'preact-router'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Button } from '@/components'
import { Avatar, AvatarGroup } from '@/components'
import { FormsShowcase } from './examples/FormsShowcase'
import { LayoutShowcase } from './LayoutShowcase'
import { useSimpleTheme } from '../nebula'
import { Layout } from './components/layout/Layout'

// Import pages
import { HomePage } from './pages/home'
import { ButtonPage } from './pages/button'
import { ContainerPage } from './pages/container'
import { DividerPage } from './pages/divider'
import { SpinnerPage } from './pages/spinner'
import { InputPage } from './pages/input'
import { TextareaPage } from './pages/textarea'
import { LabelPage } from './pages/label'
import { CardPage } from './pages/card'
import { StackPage } from './pages/stack'
import { AvatarPage } from './pages/avatar'
import { AlertPage } from './pages/alert'
import { BadgePage } from './pages/badge'
import { ProgressPage } from './pages/progress'
import { SkeletonPage } from './pages/skeleton'
import { CheckboxPage } from './pages/checkbox'
import { RadioPage } from './pages/RadioPage'
import { SwitchPage } from './pages/SwitchPage'
import { SelectPage } from './pages/select'
import { BreadcrumbPage } from './pages/breadcrumb'
import { PaginationPage } from './pages/pagination'
import { TablePage } from './pages/table'
import { TabsPage } from './pages/tabs'
import { ModalPage } from './pages/modal/ModalPage'
import { TooltipPage } from './pages/tooltip'
import { DrawerPage } from './pages/drawer/DrawerPage'
import { PopoverPage } from './pages/popover/PopoverPage'
import { ToastPage } from './pages/toast/ToastPage'
import { SliderPage } from './pages/slider'
import { RatingPage } from './pages/rating/RatingPage'
import { DatePickerPage } from './pages/datepicker/DatePickerPage'
import { TimePickerPage } from './pages/timepicker/TimePickerPage'
import { AutocompletePage } from './pages/autocomplete'
import { TreeViewPage } from './pages/treeview'
import { TransferPage } from './pages/transfer'
import { StepsPage } from './pages/steps'
import { TagsPage } from './pages/tags'
import { CollapsePage } from './pages/collapse'
import { ImagePage } from './pages/image'
import { CarouselPage } from './pages/carousel'
import { UploadPage } from './pages/UploadPage'
import { AffixPage } from './pages/affix'
import { ConfigProviderPage } from './pages/config-provider'
import { EmptyPage } from './pages/empty'
import { BackTopPage } from './pages/backtop'
import { AnchorPage } from './pages/anchor'
import { GridPage } from './pages/grid'
import { FullCoveragePage } from './pages/home' // Import FullCoveragePage

function ThemeToggle() {
  const { theme, toggleTheme } = useSimpleTheme()
  
  return (
    <button
      onClick={toggleTheme}
      class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  )
}

function LegacyShowcase(_props: { path?: string }) {
  const [activeDemo, setActiveDemo] = useState<'buttons' | 'forms' | 'layout' | 'avatars'>('forms')

  return (
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation */}
      <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            {/* Logo */}
            <div class="flex items-center gap-4">
              <button 
                onClick={() => route('/')}
                class="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <img src={viteLogo} class="h-8 w-8" alt="Vite logo" />
                <img src={preactLogo} class="h-8 w-8" alt="Preact logo" />
                <h1 class="text-xl font-bold text-gray-900 dark:text-white">Nebula UI</h1>
              </button>
            </div>
            
            {/* Navigation Tabs */}
            <div class="flex items-center space-x-4">
              <div class="flex space-x-4">
                <button
                  onClick={() => setActiveDemo('forms')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeDemo === 'forms'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Forms Foundation
                </button>
                <button
                  onClick={() => setActiveDemo('layout')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeDemo === 'layout'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Layout System
                </button>
                <button
                  onClick={() => setActiveDemo('buttons')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeDemo === 'buttons'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Buttons
                </button>
                <button
                  onClick={() => setActiveDemo('avatars')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeDemo === 'avatars'
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Avatars
                </button>
              </div>
              <ThemeToggle />
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
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                🎨 Button Showcase
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300">
                Comprehensive button component demonstration
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Button Variants</h2>
              
              <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>

              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Sizes</h3>
              <div class="flex flex-wrap gap-4 mb-8">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>

              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">States</h3>
              <div class="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
                <Button loading>Loading</Button>
                <Button fullWidth>Full Width</Button>
              </div>
            </div>
          </div>
        )}
        
        {activeDemo === 'avatars' && (
          <div class="max-w-4xl mx-auto px-8">
            <div class="text-center mb-8">
              <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                👤 Avatar Showcase
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-300">
                User profile components with status and grouping
              </p>
            </div>

            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Avatar Sizes</h2>
              
              <div class="flex items-center gap-4 mb-8">
                <Avatar size="xs" name="John Doe" />
                <Avatar size="sm" name="Jane Smith" />
                <Avatar size="md" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User" />
                <Avatar size="lg" src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" alt="User" />
                <Avatar size="xl" name="Alex Johnson" />
                <Avatar size="2xl" name="Sarah Wilson" />
              </div>

              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Avatar Groups</h3>
              <div class="space-y-4">
                <AvatarGroup>
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User 1" />
                  <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" alt="User 2" />
                  <Avatar name="Alex Johnson" />
                  <Avatar name="Sarah Wilson" />
                </AvatarGroup>
                
                <AvatarGroup max={3}>
                  <Avatar src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" alt="User 1" />
                  <Avatar src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=150&h=150&fit=crop&crop=face" alt="User 2" />
                  <Avatar name="Alex Johnson" />
                  <Avatar name="Sarah Wilson" />
                  <Avatar name="Mike Brown" />
                  <Avatar name="Emma Davis" />
                </AvatarGroup>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

function AppContent() {
  return (
    <Layout>
      <Router>
        <HomePage path="/" />
        <FullCoveragePage path="/coverage" />
        <ButtonPage path="/button" />
        <ContainerPage path="/container" />
        <DividerPage path="/divider" />
        <SpinnerPage path="/spinner" />
        <InputPage path="/input" />
        <TextareaPage path="/textarea" />
        <LabelPage path="/label" />
        <FieldErrorPage path="/field-error" />
        <CardPage path="/card" />
        <StackPage path="/stack" />
        <AvatarPage path="/avatar" />
        <AlertPage path="/alert" />
        <BadgePage path="/badge" />
        <ProgressPage path="/progress" />
        <SkeletonPage path="/skeleton" />
        <CheckboxPage path="/checkbox" />
        <RadioPage path="/radio" />
        <SwitchPage path="/switch" />
        <SelectPage path="/select" />
        <BreadcrumbPage path="/breadcrumb" />
        <PaginationPage path="/pagination" />
        <TablePage path="/table" />
        <TabsPage path="/tabs" />
        <ModalPage path="/modal" />
        <TooltipPage path="/tooltip" />
        <DrawerPage path="/drawer" />
        <PopoverPage path="/popover" />
        <ToastPage path="/toast" />
        <SliderPage path="/slider" />
        <RatingPage path="/rating" />
        <DatePickerPage path="/datepicker" />
        <TimePickerPage path="/timepicker" />
        <AutocompletePage path="/autocomplete" />
        <TreeViewPage path="/treeview" />
        <TransferPage path="/transfer" />
        <StepsPage path="/steps" />
        <TagsPage path="/tags" />
        <CollapsePage path="/collapse" />
        <ImagePage path="/image" />
        <CarouselPage path="/carousel" />
        <UploadPage path="/upload" />
        <AffixPage path="/affix" />
        <ConfigProviderPage path="/config-provider" />
        <EmptyPage path="/empty" />
        <BackTopPage path="/backtop" />
        <AnchorPage path="/anchor" />
        <GridPage path="/grid" />
        <LegacyShowcase path="/legacy" />
      </Router>
    </Layout>
  )
}

export function App() {
  return <AppContent />
}
