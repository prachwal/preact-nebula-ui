import { PageHeader } from '../../components/layout/PageHeader'
import { DemoTabs } from '../../components/layout/DemoTabs'
import { DocumentationTab } from '../../components/DocumentationTab'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
import { SizesSection, ShapesSection, GroupsSection, BadgesSection, PropsDocumentation } from './sections'

interface PageProps {
  path?: string
}

export function AvatarPage(_props: Readonly<PageProps>) {
  const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/avatar', [
      { key: 'sizes', label: 'Sizes' },
      { key: 'shapes', label: 'Shapes' },
      { key: 'groups', label: 'Avatar Groups' },
      { key: 'badges', label: 'Status Badges' }
    ])
  )

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <PageHeader
          title="👤 Avatar Component"
          description="User profile images with fallbacks, status indicators, and grouping options"
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
    </div>
  )

  function renderSection() {
    switch (activeTab) {
      case 'sizes':
        return <SizesSection />
      case 'shapes':
        return <ShapesSection />
      case 'groups':
        return <GroupsSection />
      case 'badges':
        return <BadgesSection />
      case 'props':
        return <PropsDocumentation />
      case 'documentation':
        return <DocumentationTab componentName="avatar" />
      default:
        return <SizesSection />
    }
  }
}
