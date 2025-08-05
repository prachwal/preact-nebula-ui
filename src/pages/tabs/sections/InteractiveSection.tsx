import { useState } from 'preact/hooks'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '../../../../nebula/components'

export function InteractiveSection() {
  const [verticalValue, setVerticalValue] = useState('profile')

  return (
    <div className="space-y-12">
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
    </div>
  )
}
