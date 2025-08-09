import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'

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

export function UploadPage(_props: Readonly<UploadPageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/upload', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'dragdrop', label: 'Drag & Drop' },
      { key: 'validation', label: 'Validation' },
      { key: 'progress', label: 'Progress' },
      { key: 'multiple', label: 'Multiple Files' }
    ])
  )

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
      case 'documentation':
        return <DocumentationTab componentName="upload" />
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
