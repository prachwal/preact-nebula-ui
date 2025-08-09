import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  VariantsSection,
  SizesSection,
  StatesSection,
  IconsSection,
  CombinationsSection,
  PropsDocumentation
} from './sections'

type DemoType = 'variants' | 'sizes' | 'states' | 'icons' | 'combinations' | 'props' | 'documentation'

interface PageProps {
  readonly path?: string
}

export function ButtonPage(_props: PageProps) {
  const tabConfig = PathTabPageConfigs.withDocumentation('/button', [
    { key: 'variants', label: 'Variants' },
    { key: 'sizes', label: 'Sizes' },
    { key: 'states', label: 'States' },
    { key: 'icons', label: 'Icons' },
    { key: 'combinations', label: 'Combinations' }
  ])

  const { activeTab, setActiveTab, tabs } = usePathTabPage(tabConfig)
  const activeDemo = activeTab as DemoType

  const handleButtonClick = () => {
    console.log('Button clicked!')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title=" Button Component"
          description="Interactive button component with variants, sizes, states, and icons"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <div className="mt-8">
          {activeDemo === 'variants' && <VariantsSection onButtonClick={handleButtonClick} />}
          {activeDemo === 'sizes' && <SizesSection onButtonClick={handleButtonClick} />}
          {activeDemo === 'states' && <StatesSection onButtonClick={handleButtonClick} />}
          {activeDemo === 'icons' && <IconsSection onButtonClick={handleButtonClick} />}
          {activeDemo === 'combinations' && <CombinationsSection onButtonClick={handleButtonClick} />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="button" />}
        </div>
      </div>
    </div>
  )
}

export default ButtonPage
