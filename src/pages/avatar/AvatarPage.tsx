import { useState } from 'preact/hooks'
import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { SizesSection, ShapesSection, GroupsSection, BadgesSection, PropsDocumentation } from './sections'

type DemoType = 'sizes' | 'shapes' | 'groups' | 'badges' | 'props' | 'documentation'

interface Tab {
  key: DemoType
  label: string
}

interface PageProps {
  path?: string
}

export function AvatarPage(_props: Readonly<PageProps>) {
  const [activeDemo, setActiveDemo] = useState<DemoType>('sizes')

  const tabs: Tab[] = [
    { key: 'sizes', label: 'Sizes' },
    { key: 'shapes', label: 'Shapes' },
    { key: 'groups', label: 'Avatar Groups' },
    { key: 'badges', label: 'Status Badges' },
    { key: 'props', label: 'Props' },
    { key: 'documentation', label: 'Documentation' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="👤 Avatar Component"
          description="User profile images with fallbacks, status indicators, and grouping options"
        />

        <DemoTabs
          tabs={tabs}
          activeTab={activeDemo}
          onTabChange={(tab) => setActiveDemo(tab as DemoType)}
        />

        <div className="mt-8">
          {activeDemo === 'sizes' && <SizesSection />}
          {activeDemo === 'shapes' && <ShapesSection />}
          {activeDemo === 'groups' && <GroupsSection />}
          {activeDemo === 'badges' && <BadgesSection />}
          {activeDemo === 'props' && <PropsDocumentation />}
          {activeDemo === 'documentation' && <DocumentationTab componentName="avatar" />}
        </div>
      </div>
    </div>
  )
}
