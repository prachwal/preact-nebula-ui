import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'

// Import sections
import { BasicUsageSection } from './sections/BasicUsageSection'
import { SizesSection } from './sections/SizesSection'
import { MultipleSelectionSection } from './sections/MultipleSelectionSection'
import { AsyncSearchSection } from './sections/AsyncSearchSection'
import { CreateOptionsSection } from './sections/CreateOptionsSection'
import { CustomRenderingSection } from './sections/CustomRenderingSection'
import { StatesSection } from './sections/StatesSection'
import { PropsDocumentation } from './sections/PropsDocumentation'

const tabs = [
  { key: 'basic', label: 'Basic Usage' },
  { key: 'sizes', label: 'Sizes' },
  { key: 'multiple', label: 'Multiple Selection' },
  { key: 'async', label: 'Async Search' },
  { key: 'create', label: 'Create Options' },
  { key: 'custom', label: 'Custom Rendering' },
  { key: 'states', label: 'States' },
  { key: 'props', label: 'Props' }
]

interface PageProps {
  path?: string
}

export function AutocompletePage(_props: PageProps) {
  const [activeTab, setActiveTab] = useState('basic')

  const renderContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'multiple':
        return <MultipleSelectionSection />
      case 'async':
        return <AsyncSearchSection />
      case 'create':
        return <CreateOptionsSection />
      case 'custom':
        return <CustomRenderingSection />
      case 'states':
        return <StatesSection />
      case 'props':
        return <PropsDocumentation />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Autocomplete"
        description="Enhanced input with search suggestions, async loading, and multi-select capabilities. Perfect for forms that need intelligent search functionality."
      />
      
      <DemoTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <div className="space-y-8">
        {renderContent()}
      </div>
    </div>
  )
}
