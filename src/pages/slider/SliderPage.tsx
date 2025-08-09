import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import {
  BasicUsageSection,
  SizesSection,
  RangeSection,
  MarksSection,
  OrientationSection,
  AdvancedSection,
  CustomThumbSection,
  PropsDocumentation
} from './sections'

interface PageProps {
  readonly path?: string
}

export function SliderPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/slider', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'range', label: 'Range' },
      { key: 'marks', label: 'Marks' },
      { key: 'orientation', label: 'Orientation' },
      { key: 'custom-thumb', label: 'Custom Thumb' },
      { key: 'advanced', label: 'Advanced' }
    ])
  )
  const renderSection = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicUsageSection />
      case 'sizes':
        return <SizesSection />
      case 'range':
        return <RangeSection />
      case 'marks':
        return <MarksSection />
      case 'orientation':
        return <OrientationSection />
      case 'custom-thumb':
        return <CustomThumbSection />
      case 'advanced':
        return <AdvancedSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="slider" />
      default:
        return <BasicUsageSection />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title="Slider"
        description="Interactive slider component for selecting numeric values or ranges. Supports single and dual handle modes, custom marks, and full accessibility."
      />

      <DemoTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={tabs}
      />

      <div className="mt-8">
        {renderSection()}
      </div>
    </div>
  )
}
