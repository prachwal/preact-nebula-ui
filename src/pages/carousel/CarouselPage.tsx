import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'

// Import sections
import {
  BasicUsageSection,
  SizesSection,
  AutoplaySection,
  InfiniteSection,
  NavigationSection,
  MultipleSlideSection,
  PropsDocumentationSection
} from './sections'

interface CarouselPageProps {
  path?: string
}

export function CarouselPage(_props: CarouselPageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { key: 'basic', id: 'basic', label: 'Basic Usage' },
    { key: 'sizes', id: 'sizes', label: 'Sizes' },
    { key: 'autoplay', id: 'autoplay', label: 'Autoplay' },
    { key: 'infinite', id: 'infinite', label: 'Infinite Loop' },
    { key: 'navigation', id: 'navigation', label: 'Navigation' },
    { key: 'multiple', id: 'multiple', label: 'Multiple Slides' },
    { key: 'props', id: 'props', label: 'Props' }
  ]

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'autoplay':
        return <AutoplaySection />
      case 'infinite':
        return <InfiniteSection />
      case 'navigation':
        return <NavigationSection />
      case 'multiple':
        return <MultipleSlideSection />
      case 'props':
        return <PropsDocumentationSection />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader
        title="Carousel"
        description="A responsive carousel component for displaying slides with navigation controls, autoplay, and touch support."
      />
      
      <DemoTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="mt-8">
        {renderSection()}
      </div>
    </div>
  )
}
