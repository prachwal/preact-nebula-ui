import { useState } from 'preact/hooks'
import { Collapse } from '../../../../nebula/components/Collapse'

export function NestedSection() {
  const [outerActive, setOuterActive] = useState<string | string[]>('1')
  const [innerActive, setInnerActive] = useState<string | string[]>('')

  return (
    <>
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nested Collapse</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Collapse components can be nested within each other to create hierarchical content structures.
          </p>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Multi-level Organization</h3>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
              <Collapse activeKey={outerActive} onChange={setOuterActive}>
                <Collapse.Panel key="1" header="📁 Documents">
                  <div className="p-2">
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      This section contains various document categories. Each category can be expanded to show its contents.
                    </p>
                    <Collapse activeKey={innerActive} onChange={setInnerActive}>
                      <Collapse.Panel key="1a" header="📄 Reports">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              • Annual Report 2023.pdf
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              • Quarterly Analysis Q4.pdf
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              • Market Research Summary.pdf
                            </div>
                          </div>
                        </div>
                      </Collapse.Panel>
                      <Collapse.Panel key="1b" header="📊 Presentations">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              • Product Launch Presentation.pptx
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              • Team Meeting Slides.pptx
                            </div>
                          </div>
                        </div>
                      </Collapse.Panel>
                      <Collapse.Panel key="1c" header="📋 Forms">
                        <div className="space-y-2">
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              • Employee Registration Form.pdf
                            </div>
                            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded">
                              • Expense Report Template.xlsx
                            </div>
                          </div>
                        </div>
                      </Collapse.Panel>
                    </Collapse>
                  </div>
                </Collapse.Panel>
                <Collapse.Panel key="2" header="🖼️ Media">
                  <p className="text-gray-600 dark:text-gray-300">
                    Media files including images, videos, and audio content organized by project and date.
                  </p>
                </Collapse.Panel>
                <Collapse.Panel key="3" header="⚙️ Settings">
                  <p className="text-gray-600 dark:text-gray-300">
                    Application settings and configuration files for different environments and deployments.
                  </p>
                </Collapse.Panel>
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
