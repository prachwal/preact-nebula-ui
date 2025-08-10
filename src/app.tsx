import { useState } from 'preact/hooks';
import { Suspense, lazy } from 'preact/compat';
import Router, { route } from 'preact-router';
import preactLogo from './assets/preact.svg';
import viteLogo from '/vite.svg?url';
import './app.css';
import { Button, Avatar, AvatarGroup, Icon } from '@/components';
import { FormsShowcase } from './examples/FormsShowcase';
import { LayoutShowcase } from './LayoutShowcase';
import { useSimpleTheme } from '../nebula';
import { Layout } from './components/layout/Layout';

// Lazy loaded pages
const HomePage = lazy(() => import('./pages/home').then(m => ({ default: m.HomePage })));
const DocsPage = lazy(() => import('./pages/docs').then(m => ({ default: m.DocsPage })));
const FullCoveragePage = lazy(() => import('./pages/home').then(m => ({ default: m.FullCoveragePage })));
const ButtonPage = lazy(() => import('./pages/button').then(m => ({ default: m.ButtonPage })));
const ContainerPage = lazy(() => import('./pages/container').then(m => ({ default: m.ContainerPage })));
const DividerPage = lazy(() => import('./pages/divider').then(m => ({ default: m.DividerPage })));
const SpinnerPage = lazy(() => import('./pages/spinner').then(m => ({ default: m.SpinnerPage })));
const InputPage = lazy(() => import('./pages/input').then(m => ({ default: m.InputPage })));
const TextareaPage = lazy(() => import('./pages/textarea').then(m => ({ default: m.TextareaPage })));
const LabelPage = lazy(() => import('./pages/label').then(m => ({ default: m.LabelPage })));
const FieldErrorPage = lazy(() => import('./pages/field-error').then(m => ({ default: m.FieldErrorPage })));
const CardPage = lazy(() => import('./pages/card').then(m => ({ default: m.CardPage })));
const StackPage = lazy(() => import('./pages/stack').then(m => ({ default: m.StackPage })));
const AvatarPage = lazy(() => import('./pages/avatar').then(m => ({ default: m.AvatarPage })));
const AlertPage = lazy(() => import('./pages/alert').then(m => ({ default: m.AlertPage })));
const BadgePage = lazy(() => import('./pages/badge').then(m => ({ default: m.BadgePage })));
const ProgressPage = lazy(() => import('./pages/progress').then(m => ({ default: m.ProgressPage })));
const SkeletonPage = lazy(() => import('./pages/skeleton').then(m => ({ default: m.SkeletonPage })));
const CheckboxPage = lazy(() => import('./pages/checkbox').then(m => ({ default: m.CheckboxPage })));
const RadioPage = lazy(() => import('./pages/RadioPage').then(m => ({ default: m.RadioPage })));
const SwitchPage = lazy(() => import('./pages/SwitchPage').then(m => ({ default: m.SwitchPage })));
const SelectPage = lazy(() => import('./pages/select').then(m => ({ default: m.SelectPage })));
const BreadcrumbPage = lazy(() => import('./pages/breadcrumb').then(m => ({ default: m.BreadcrumbPage })));
const PaginationPage = lazy(() => import('./pages/pagination').then(m => ({ default: m.PaginationPage })));
const TablePage = lazy(() => import('./pages/table').then(m => ({ default: m.TablePage })));
const TabsPage = lazy(() => import('./pages/tabs').then(m => ({ default: m.TabsPage })));
const ModalPage = lazy(() => import('./pages/modal/ModalPage').then(m => ({ default: m.ModalPage })));
const TooltipPage = lazy(() => import('./pages/tooltip').then(m => ({ default: m.TooltipPage })));
const DrawerPage = lazy(() => import('./pages/drawer/DrawerPage').then(m => ({ default: m.DrawerPage })));
const PopoverPage = lazy(() => import('./pages/popover/PopoverPage').then(m => ({ default: m.PopoverPage })));
const ToastPage = lazy(() => import('./pages/toast/ToastPage').then(m => ({ default: m.ToastPage })));
const SliderPage = lazy(() => import('./pages/slider').then(m => ({ default: m.SliderPage })));
const RatingPage = lazy(() => import('./pages/rating/RatingPage').then(m => ({ default: m.RatingPage })));
const DatePickerPage = lazy(() => import('./pages/datepicker/DatePickerPage').then(m => ({ default: m.DatePickerPage })));
const TimePickerPage = lazy(() => import('./pages/timepicker/TimePickerPage').then(m => ({ default: m.TimePickerPage })));
const AutocompletePage = lazy(() => import('./pages/autocomplete').then(m => ({ default: m.AutocompletePage })));
const TreeViewPage = lazy(() => import('./pages/treeview').then(m => ({ default: m.TreeViewPage })));
const IconPage = lazy(() => import('./pages/icon').then(m => ({ default: m.IconPage })));
const TransferPage = lazy(() => import('./pages/transfer').then(m => ({ default: m.TransferPage })));
const StepsPage = lazy(() => import('./pages/steps').then(m => ({ default: m.StepsPage })));
const TagsPage = lazy(() => import('./pages/tags').then(m => ({ default: m.TagsPage })));
const CollapsePage = lazy(() => import('./pages/collapse').then(m => ({ default: m.CollapsePage })));
const ImagePage = lazy(() => import('./pages/image').then(m => ({ default: m.ImagePage })));
const CarouselPage = lazy(() => import('./pages/carousel').then(m => ({ default: m.CarouselPage })));
const UploadPage = lazy(() => import('./pages/UploadPage').then(m => ({ default: m.UploadPage })));
const AffixPage = lazy(() => import('./pages/affix').then(m => ({ default: m.AffixPage })));
const ConfigProviderPage = lazy(() => import('./pages/config-provider').then(m => ({ default: m.ConfigProviderPage })));
const EmptyPage = lazy(() => import('./pages/empty').then(m => ({ default: m.EmptyPage })));
const BackTopPage = lazy(() => import('./pages/backtop').then(m => ({ default: m.BackTopPage })));
const AnchorPage = lazy(() => import('./pages/anchor').then(m => ({ default: m.AnchorPage })));
const GridPage = lazy(() => import('./pages/grid').then(m => ({ default: m.GridPage })));


function ThemeToggle() {
  const { theme, toggleTheme } = useSimpleTheme()

  return (
    <button
      onClick={toggleTheme}
      class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Icon name="moon" size="sm" className="text-gray-600 dark:text-gray-300" />
      ) : (
        <Icon name="sun" size="sm" className="text-gray-600 dark:text-gray-300" />
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
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeDemo === 'forms'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  Forms Foundation
                </button>
                <button
                  onClick={() => setActiveDemo('layout')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeDemo === 'layout'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  Layout System
                </button>
                <button
                  onClick={() => setActiveDemo('buttons')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeDemo === 'buttons'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                >
                  Buttons
                </button>
                <button
                  onClick={() => setActiveDemo('avatars')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeDemo === 'avatars'
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
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  return (
    <Layout currentPath={currentPath}>
      <Suspense fallback={<div className="p-8 text-center text-gray-500 dark:text-gray-400">Ładowanie strony...</div>}>
        <Router onChange={(e) => setCurrentPath(e.url)}>
          <HomePage path="/" />
          <DocsPage path="/documentation/:category?/:file?" />
          <FullCoveragePage path="/coverage" />
          <ButtonPage path="/button/:tab?" />
          <ContainerPage path="/container/:tab?" />
          <DividerPage path="/divider/:tab?" />
          <SpinnerPage path="/spinner/:tab?" />
          <InputPage path="/input/:tab?" />
          <TextareaPage path="/textarea/:tab?" />
          <LabelPage path="/label/:tab?" />
          <FieldErrorPage path="/field-error/:tab?" />
          <CardPage path="/card/:tab?" />
          <StackPage path="/stack/:tab?" />
          <AvatarPage path="/avatar/:tab?" />
          <AlertPage path="/alert/:tab?" />
          <BadgePage path="/badge/:tab?" />
          <ProgressPage path="/progress/:tab?" />
          <SkeletonPage path="/skeleton/:tab?" />
          <CheckboxPage path="/checkbox/:tab?" />
          <RadioPage path="/radio/:tab?" />
          <SwitchPage path="/switch/:tab?" />
          <SelectPage path="/select/:tab?" />
          <BreadcrumbPage path="/breadcrumb/:tab?" />
          <PaginationPage path="/pagination/:tab?" />
          <TablePage path="/table/:tab?" />
          <TabsPage path="/tabs/:tab?" />
          <ModalPage path="/modal/:tab?" />
          <TooltipPage path="/tooltip/:tab?" />
          <DrawerPage path="/drawer/:tab?" />
          <PopoverPage path="/popover/:tab?" />
          <ToastPage path="/toast/:tab?" />
          <SliderPage path="/slider/:tab?" />
          <RatingPage path="/rating/:tab?" />
          <DatePickerPage path="/datepicker/:tab?" />
          <TimePickerPage path="/timepicker/:tab?" />
          <AutocompletePage path="/autocomplete/:tab?" />
          <TreeViewPage path="/treeview/:tab?" />
          <TransferPage path="/transfer/:tab?" />
          <StepsPage path="/steps/:tab?" />
          <TagsPage path="/tags/:tab?" />
          <CollapsePage path="/collapse/:tab?" />
          <IconPage path="/icon/:tab?" />
          <ImagePage path="/image/:tab?" />
          <CarouselPage path="/carousel/:tab?" />
          <UploadPage path="/upload/:tab?" />
          <AffixPage path="/affix/:tab?" />
          <ConfigProviderPage path="/config-provider/:tab?" />
          <EmptyPage path="/empty/:tab?" />
          <BackTopPage path="/backtop/:tab?" />
          <AnchorPage path="/anchor/:tab?" />
          <GridPage path="/grid/:tab?" />
          <LegacyShowcase path="/legacy" />
        </Router>
      </Suspense>
    </Layout>
  );
}

export function App() {
  return <AppContent />
}
