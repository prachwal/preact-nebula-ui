import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'

// Import sections
import {
  BasicUsageSection,
  SizesSection,
  DragDropSection,
  ValidationSection,
  ProgressSection,
  MultipleFilesSection,
  PropsDocumentationSection
} from './sections'

interface UploadPageProps {
  path?: string
}

export function UploadPage(_props: UploadPageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const tabs = [
    { key: 'basic', id: 'basic', label: 'Basic Usage' },
    { key: 'sizes', id: 'sizes', label: 'Sizes' },
    { key: 'dragdrop', id: 'dragdrop', label: 'Drag & Drop' },
    { key: 'validation', id: 'validation', label: 'Validation' },
    { key: 'progress', id: 'progress', label: 'Progress' },
    { key: 'multiple', id: 'multiple', label: 'Multiple Files' },
    { key: 'props', id: 'props', label: 'Props' }
  ]

  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'dragdrop':
        return <DragDropSection />
      case 'validation':
        return <ValidationSection />
      case 'progress':
        return <ProgressSection />
      case 'multiple':
        return <MultipleFilesSection />
      case 'props':
        return <PropsDocumentationSection />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <PageHeader
        title="Upload"
        description="A comprehensive file upload component with drag-and-drop support, progress tracking, validation, and multiple file handling."
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
