import { useState } from 'preact/hooks'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../../nebula/components'

interface PageProps {
  path?: string
}

export function TabsPage(_props: PageProps) {
  const [basicValue, setBasicValue] = useState('tab1')
  const [verticalValue, setVerticalValue] = useState('profile')
  const [variantValue, setVariantValue] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🗂️ Tabs Component
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Organize content into multiple panels with intuitive navigation. Supports horizontal and vertical orientations, multiple variants, and full keyboard accessibility.
          </p>
        </div>

        <div className="space-y-12">
          
          {/* Basic Usage */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Basic Usage
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Simple tabs with content panels.
              </p>
            </div>
            
            <div className="space-y-6">
              <Tabs value={basicValue} onChange={setBasicValue}>
                <TabList>
                  <Tab value="tab1">Overview</Tab>
                  <Tab value="tab2">Features</Tab>
                  <Tab value="tab3">Documentation</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel value="tab1">
                    <div className="p-4 text-gray-900 dark:text-gray-100">
                      <h3 className="text-lg font-semibold mb-2">Overview</h3>
                      <p>This is the overview content panel. Tabs help organize related content into separate views.</p>
                    </div>
                  </TabPanel>
                  <TabPanel value="tab2">
                    <div className="p-4 text-gray-900 dark:text-gray-100">
                      <h3 className="text-lg font-semibold mb-2">Features</h3>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Keyboard navigation support</li>
                        <li>Multiple visual variants</li>
                        <li>Horizontal and vertical orientations</li>
                        <li>Accessible by default</li>
                      </ul>
                    </div>
                  </TabPanel>
                  <TabPanel value="tab3">
                    <div className="p-4 text-gray-900 dark:text-gray-100">
                      <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                      <p>Check the props documentation below for all available configuration options.</p>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </section>

          {/* Variants */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Variants
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different visual styles for various use cases.
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Line Variant */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Line Variant (Default)</h3>
                <Tabs value={variantValue} onChange={setVariantValue} variant="line">
                  <TabList>
                    <Tab value="overview">Overview</Tab>
                    <Tab value="analytics">Analytics</Tab>
                    <Tab value="settings">Settings</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="overview">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Line variant with underline indicator.
                      </div>
                    </TabPanel>
                    <TabPanel value="analytics">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Analytics content with charts and metrics.
                      </div>
                    </TabPanel>
                    <TabPanel value="settings">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Settings and configuration options.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>

              {/* Enclosed Variant */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Enclosed Variant</h3>
                <Tabs defaultValue="tab1" variant="enclosed">
                  <TabList>
                    <Tab value="tab1">Dashboard</Tab>
                    <Tab value="tab2">Projects</Tab>
                    <Tab value="tab3">Team</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="tab1">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Enclosed variant with tab-like appearance.
                      </div>
                    </TabPanel>
                    <TabPanel value="tab2">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Project management interface.
                      </div>
                    </TabPanel>
                    <TabPanel value="tab3">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Team collaboration tools.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>

              {/* Soft Rounded Variant */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Soft Rounded Variant</h3>
                <Tabs defaultValue="home" variant="soft-rounded">
                  <TabList>
                    <Tab value="home">Home</Tab>
                    <Tab value="explore">Explore</Tab>
                    <Tab value="notifications">Notifications</Tab>
                    <Tab value="messages">Messages</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="home">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Soft rounded variant with subtle background.
                      </div>
                    </TabPanel>
                    <TabPanel value="explore">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Explore new content and discover trends.
                      </div>
                    </TabPanel>
                    <TabPanel value="notifications">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Recent notifications and updates.
                      </div>
                    </TabPanel>
                    <TabPanel value="messages">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Private messages and conversations.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Vertical Orientation */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Vertical Orientation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Tabs arranged vertically for sidebar-style navigation.
              </p>
            </div>
            
            <Tabs 
              value={verticalValue} 
              onChange={setVerticalValue} 
              orientation="vertical"
              className="flex gap-6"
            >
              <TabList className="min-w-[200px]">
                <Tab value="profile">Profile</Tab>
                <Tab value="account">Account</Tab>
                <Tab value="privacy">Privacy</Tab>
                <Tab value="security">Security</Tab>
                <Tab value="notifications">Notifications</Tab>
              </TabList>
              <TabPanels className="flex-1">
                <TabPanel value="profile">
                  <div className="p-4 text-gray-900 dark:text-gray-100">
                    <h3 className="text-lg font-semibold mb-3">Profile Settings</h3>
                    <p className="mb-4">Manage your personal information and public profile.</p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Display Name</label>
                        <input 
                          type="text" 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" 
                          placeholder="Your display name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Bio</label>
                        <textarea 
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700" 
                          rows={3}
                          placeholder="Tell us about yourself"
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="account">
                  <div className="p-4 text-gray-900 dark:text-gray-100">
                    <h3 className="text-lg font-semibold mb-3">Account Settings</h3>
                    <p>Manage your account preferences and settings.</p>
                  </div>
                </TabPanel>
                <TabPanel value="privacy">
                  <div className="p-4 text-gray-900 dark:text-gray-100">
                    <h3 className="text-lg font-semibold mb-3">Privacy Controls</h3>
                    <p>Control who can see your information and activity.</p>
                  </div>
                </TabPanel>
                <TabPanel value="security">
                  <div className="p-4 text-gray-900 dark:text-gray-100">
                    <h3 className="text-lg font-semibold mb-3">Security Settings</h3>
                    <p>Manage your password, two-factor authentication, and security preferences.</p>
                  </div>
                </TabPanel>
                <TabPanel value="notifications">
                  <div className="p-4 text-gray-900 dark:text-gray-100">
                    <h3 className="text-lg font-semibold mb-3">Notification Preferences</h3>
                    <p>Choose how and when you want to be notified.</p>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </section>

          {/* Sizes */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Sizes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different tab sizes for various contexts.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Small */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Small</h3>
                <Tabs defaultValue="tab1" size="sm">
                  <TabList>
                    <Tab value="tab1">Overview</Tab>
                    <Tab value="tab2">Details</Tab>
                    <Tab value="tab3">Settings</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="tab1">
                      <div className="p-3 text-sm text-gray-900 dark:text-gray-100">
                        Small size tabs for compact interfaces.
                      </div>
                    </TabPanel>
                    <TabPanel value="tab2">
                      <div className="p-3 text-sm text-gray-900 dark:text-gray-100">
                        Detailed information and specifications.
                      </div>
                    </TabPanel>
                    <TabPanel value="tab3">
                      <div className="p-3 text-sm text-gray-900 dark:text-gray-100">
                        Configuration and preferences.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>

              {/* Large */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Large</h3>
                <Tabs defaultValue="dashboard" size="lg">
                  <TabList>
                    <Tab value="dashboard">Dashboard</Tab>
                    <Tab value="analytics">Analytics</Tab>
                    <Tab value="reports">Reports</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="dashboard">
                      <div className="p-5 text-gray-900 dark:text-gray-100">
                        Large size tabs for prominent navigation areas.
                      </div>
                    </TabPanel>
                    <TabPanel value="analytics">
                      <div className="p-5 text-gray-900 dark:text-gray-100">
                        Analytics and performance metrics.
                      </div>
                    </TabPanel>
                    <TabPanel value="reports">
                      <div className="p-5 text-gray-900 dark:text-gray-100">
                        Generated reports and exports.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Color Schemes */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Color Schemes
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Different color themes to match your design system.
              </p>
            </div>
            
            <div className="space-y-6">
              {/* Primary */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Primary (Default)</h3>
                <Tabs defaultValue="home" colorScheme="primary">
                  <TabList>
                    <Tab value="home">Home</Tab>
                    <Tab value="about">About</Tab>
                    <Tab value="contact">Contact</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="home">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Primary color scheme with blue accent.
                      </div>
                    </TabPanel>
                    <TabPanel value="about">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        About our company and mission.
                      </div>
                    </TabPanel>
                    <TabPanel value="contact">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Get in touch with our team.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>

              {/* Success */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Success</h3>
                <Tabs defaultValue="success" colorScheme="success">
                  <TabList>
                    <Tab value="success">Success</Tab>
                    <Tab value="approved">Approved</Tab>
                    <Tab value="completed">Completed</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="success">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Success color scheme with green accent.
                      </div>
                    </TabPanel>
                    <TabPanel value="approved">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Approved items and requests.
                      </div>
                    </TabPanel>
                    <TabPanel value="completed">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Completed tasks and projects.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>

              {/* Warning */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Warning</h3>
                <Tabs defaultValue="pending" colorScheme="warning">
                  <TabList>
                    <Tab value="pending">Pending</Tab>
                    <Tab value="review">Review</Tab>
                    <Tab value="caution">Caution</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel value="pending">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Warning color scheme with orange accent.
                      </div>
                    </TabPanel>
                    <TabPanel value="review">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Items requiring review or attention.
                      </div>
                    </TabPanel>
                    <TabPanel value="caution">
                      <div className="p-4 text-gray-900 dark:text-gray-100">
                        Items requiring caution or careful handling.
                      </div>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Accessibility Features
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Built-in accessibility features and keyboard navigation.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-blue-900 dark:text-blue-100 mb-2">
                  ⌨️ Keyboard Navigation
                </h3>
                <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-sm">
                  <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Tab</kbd> - Move focus to next focusable element</li>
                  <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Shift + Tab</kbd> - Move focus to previous focusable element</li>
                  <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Arrow Left/Right</kbd> - Navigate between tabs (horizontal)</li>
                  <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Arrow Up/Down</kbd> - Navigate between tabs (vertical)</li>
                  <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Enter/Space</kbd> - Activate focused tab</li>
                  <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">Home</kbd> - Move to first tab</li>
                  <li><kbd className="px-2 py-1 bg-white dark:bg-gray-700 border rounded">End</kbd> - Move to last tab</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="text-lg font-medium text-green-900 dark:text-green-100 mb-2">
                  ♿ ARIA Support
                </h3>
                <ul className="text-green-800 dark:text-green-200 space-y-1 text-sm">
                  <li>• Proper ARIA roles and attributes</li>
                  <li>• Screen reader announcements</li>
                  <li>• Focus management</li>
                  <li>• Semantic HTML structure</li>
                  <li>• High contrast support</li>
                </ul>
              </div>

              <Tabs defaultValue="a11y" className="mt-6">
                <TabList>
                  <Tab value="a11y">Try Navigation</Tab>
                  <Tab value="focus">Focus Test</Tab>
                  <Tab value="screen">Screen Reader</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel value="a11y">
                    <div className="p-4 text-gray-900 dark:text-gray-100">
                      <p>Try navigating these tabs using only your keyboard. The component is fully accessible and supports all standard keyboard interactions.</p>
                    </div>
                  </TabPanel>
                  <TabPanel value="focus">
                    <div className="p-4 text-gray-900 dark:text-gray-100">
                      <p>Focus management ensures that screen readers and keyboard users can navigate efficiently through the interface.</p>
                    </div>
                  </TabPanel>
                  <TabPanel value="screen">
                    <div className="p-4 text-gray-900 dark:text-gray-100">
                      <p>Screen readers will announce tab selections and provide context about the current panel content.</p>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </section>

          {/* Props Documentation */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Props Documentation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Complete API reference for all Tabs components.
              </p>
            </div>
            
            <div className="space-y-8">
              {/* Tabs Props */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tabs Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">defaultValue</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">-</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Default selected tab (uncontrolled)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">value</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">-</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Selected tab value (controlled)</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">onChange</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">(value: string) =&gt; void</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">-</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Callback when tab selection changes</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">orientation</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'horizontal' | 'vertical'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'horizontal'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Tab list orientation</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">variant</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'line' | 'enclosed' | 'soft-rounded'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'line'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Visual style variant</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">size</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'sm' | 'md' | 'lg'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'md'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Size of the tabs</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">colorScheme</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'primary' | 'secondary' | 'success' | 'warning' | 'error'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">'primary'</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Color theme</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tab Props */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Tab Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">value</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Unique identifier for the tab</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">disabled</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">boolean</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">false</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Whether the tab is disabled</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* TabPanel Props */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">TabPanel Props</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-gray-700">
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Prop</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Type</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Default</th>
                        <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Description</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 font-mono">value</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">string</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">required</td>
                        <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">Corresponding tab value</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
