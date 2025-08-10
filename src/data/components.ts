export interface Component {
  name: string
  path: string
  description: string
  milestone: string
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  version?: string
  testCoverage?: number
}

export const components: Component[] = [
  // Milestone 1: Forms Foundation
  {
    name: 'Input',
    path: '/input',
    description: 'Text input field with validation and icons',
    milestone: 'Milestone 1: Forms Foundation',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Textarea',
    path: '/textarea',
    description: 'Multi-line text input with auto-resize',
    milestone: 'Milestone 1: Forms Foundation',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Label',
    path: '/label',
    description: 'Form labels with required indicators',
    milestone: 'Milestone 1: Forms Foundation',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'FieldError',
    path: '/field-error',
    description: 'Error message display for forms',
    milestone: 'Milestone 1: Forms Foundation',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },

  // Milestone 2: Layout System
  {
    name: 'Card',
    path: '/card',
    description: 'Content container with header, body, and footer',
    milestone: 'Milestone 2: Layout System',
    category: 'Layout',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Container',
    path: '/container',
    description: 'Responsive layout wrapper with max-width constraints',
    milestone: 'Milestone 2: Layout System',
    category: 'Layout',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Stack',
    path: '/stack',
    description: 'Vertical/horizontal layout with spacing control',
    milestone: 'Milestone 2: Layout System',
    category: 'Layout',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Divider',
    path: '/divider',
    description: 'Visual separator with text support',
    milestone: 'Milestone 2: Layout System',
    category: 'Layout',
    status: 'completed',
    testCoverage: 100
  },

  // Milestone 3: User Feedback
  {
    name: 'Alert',
    path: '/alert',
    description: 'Contextual feedback messages with dismissible functionality',
    milestone: 'Milestone 3: User Feedback',
    category: 'Feedback',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Badge',
    path: '/badge',
    description: 'Small status indicators and count displays',
    milestone: 'Milestone 3: User Feedback',
    category: 'Feedback',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Progress',
    path: '/progress',
    description: 'Linear and circular progress indicators',
    milestone: 'Milestone 3: User Feedback',
    category: 'Feedback',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Skeleton',
    path: '/skeleton',
    description: 'Loading placeholders that maintain layout structure',
    milestone: 'Milestone 3: User Feedback',
    category: 'Feedback',
    status: 'completed',
    testCoverage: 100
  },

  // Milestone 4: Advanced Form Controls
  {
    name: 'Checkbox',
    path: '/checkbox',
    description: 'Tri-state checkboxes with validation and accessibility features',
    milestone: 'Milestone 4: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Radio',
    path: '/radio',
    description: 'Radio buttons with group management and keyboard navigation',
    milestone: 'Milestone 4: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Switch',
    path: '/switch',
    description: 'Toggle switches with smooth animations and custom icons',
    milestone: 'Milestone 4: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Select',
    path: '/select',
    description: 'Dropdown selection with search and multi-select capabilities',
    milestone: 'Milestone 4: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    testCoverage: 100
  },

  // Milestone 5: Navigation & Data
  {
    name: 'Breadcrumb',
    path: '/breadcrumb',
    description: 'Hierarchical navigation with responsive collapse and custom separators',
    milestone: 'Milestone 5: Navigation & Data',
    category: 'Navigation',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Pagination',
    path: '/pagination',
    description: 'Page navigation with jump controls and responsive design',
    milestone: 'Milestone 5: Navigation & Data',
    category: 'Navigation',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Table',
    path: '/table',
    description: 'Data table with sorting, selection, and responsive design',
    milestone: 'Milestone 5: Navigation & Data',
    category: 'Data Display',
    status: 'completed',
    testCoverage: 100
  },

  // Milestone 6: Advanced Interactions
  {
    name: 'Modal',
    path: '/modal',
    description: 'Modal dialog with portal rendering, focus management, and accessibility',
    milestone: 'Milestone 6: Advanced Interactions',
    category: 'Overlay',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Tooltip',
    path: '/tooltip',
    description: 'Contextual information display with intelligent positioning and rich content',
    milestone: 'Milestone 6: Advanced Interactions',
    category: 'Overlay',
    status: 'completed',
    testCoverage: 95
  },
  {
    name: 'Drawer',
    path: '/drawer',
    description: 'Sliding panel component with positions, sizes, and focus management',
    milestone: 'Milestone 6: Advanced Interactions',
    category: 'Overlay',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Popover',
    path: '/popover',
    description: 'Contextual overlays with intelligent positioning and rich content support',
    milestone: 'Milestone 6: Advanced Interactions',
    category: 'Overlay',
    status: 'completed',
    testCoverage: 75
  },
  {
    name: 'Toast',
    path: '/toast',
    description: 'Notification system with auto-dismiss, positioning, and rich content support',
    milestone: 'Milestone 6: Advanced Interactions',
    category: 'Feedback',
    status: 'completed',
    testCoverage: 100
  },

  // Core Components
  {
    name: 'Button',
    path: '/button',
    description: 'Interactive button component with variants, sizes, and states',
    milestone: 'Core Components',
    category: 'General',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Spinner',
    path: '/spinner',
    description: 'Loading indicator with customizable sizes and colors',
    milestone: 'Core Components',
    category: 'Feedback',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Avatar',
    path: '/avatar',
    description: 'User profile picture with fallbacks and status indicators',
    milestone: 'Advanced Interactions',
    category: 'Data Display',
    status: 'completed',
    testCoverage: 100
  },
  {
    name: 'Tabs',
    path: '/tabs',
    description: 'Tab navigation with horizontal/vertical layouts and keyboard support',
    milestone: 'Advanced Interactions',
    category: 'Navigation',
    status: 'completed',
    testCoverage: 100
  },

  // Milestone 7: Advanced Form Controls
  {
    name: 'Slider',
    path: '/slider',
    description: 'Range input with single/dual handles, step marks, and tooltips',
    milestone: 'Milestone 7: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 100
  },
  {
    name: 'Rating',
    path: '/rating',
    description: 'Star rating component with half-star support, custom icons, and read-only mode',
    milestone: 'Milestone 7: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 99
  },
  {
    name: 'DatePicker',
    path: '/datepicker',
    description: 'Date selection with calendar interface, range support, and localization',
    milestone: 'Milestone 7: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 100
  },
  {
    name: 'TimePicker',
    path: '/timepicker',
    description: 'Time selection with hour/minute/second precision and 12/24h format',
    milestone: 'Milestone 7: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 85
  },
  {
    name: 'Autocomplete',
    path: '/autocomplete',
    description: 'Enhanced input with search suggestions, async loading, and multi-select',
    milestone: 'Milestone 7: Advanced Form Controls',
    category: 'Forms',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 93
  },

  // Milestone 8: Data Display & Navigation (In Progress)
  {
    name: 'TreeView',
    path: '/treeview',
    description: 'Hierarchical data display with expand/collapse, selection, and search',
    milestone: 'Milestone 8: Data Display & Navigation',
    category: 'Data Display',
    status: 'completed',
    version: '0.8.0',
    testCoverage: 95
  },
  {
    name: 'Transfer',
    path: '/transfer',
    description: 'Dual-list component for selecting and moving items between lists',
    milestone: 'Milestone 8: Data Display & Navigation',
    category: 'Data Display',
    status: 'completed',
    version: '0.8.0',
    testCoverage: 95
  },
  {
    name: 'Steps',
    path: '/steps',
    description: 'Step-by-step navigation component for multi-step processes',
    milestone: 'Milestone 8: Data Display & Navigation',
    category: 'Navigation',
    status: 'completed',
    version: '0.8.0',
    testCoverage: 95
  },
  {
    name: 'Tags',
    path: '/tags',
    description: 'Dynamic tag management with creation, editing, and deletion',
    milestone: 'Milestone 8: Data Display & Navigation',
    category: 'Data Display',
    status: 'completed',
    version: '0.8.0',
    testCoverage: 95
  },
  {
    name: 'Collapse',
    path: '/collapse',
    description: 'Collapsible content areas with smooth animations and accordion mode',
    milestone: 'Milestone 8: Data Display & Navigation',
    category: 'Layout',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 95
  },

  // Milestone 9: Specialized Components
  {
    name: 'Image',
    path: '/image',
    description: 'Advanced image component with lazy loading, zoom functionality, progressive enhancement, and error handling',
    milestone: 'Milestone 9: Specialized Components',
    category: 'Data Display',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 95
  },
  {
    name: 'Carousel',
    path: '/carousel',
    description: 'Image and content carousel with navigation, auto-play, thumbnails, and touch/swipe support',
    milestone: 'Milestone 9: Specialized Components',
    category: 'Data Display',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 85
  },
  {
    name: 'Upload',
    path: '/upload',
    description: 'File upload with drag & drop, progress tracking, multiple file support, and preview generation',
    milestone: 'Milestone 9: Specialized Components',
    category: 'Forms',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 85
  },
  {
    name: 'Affix',
    path: '/affix',
    description: 'Position element to stick to viewport during scroll with offset and target support',
    milestone: 'Milestone 9: Specialized Components',
    category: 'Layout',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 95
  },

  // Milestone 10: Advanced Layout & System Components
  {
    name: 'ConfigProvider',
    path: '/config-provider',
    description: 'Global configuration provider for theme management, internationalization, and component defaults',
    milestone: 'Milestone 10: Advanced Layout & System',
    category: 'System',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 95
  },
  {
    name: 'Empty',
    path: '/empty',
    description: 'Empty state component with semantic variants and customizable illustrations',
    milestone: 'Milestone 10: Advanced Layout & System',
    category: 'Data Display',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 95
  },
  {
    name: 'BackTop',
    path: '/backtop',
    description: 'Back to top button with smooth scrolling and visibility threshold',
    milestone: 'Milestone 10: Advanced Layout & System',
    category: 'Navigation',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 95
  },
  {
    name: 'Anchor',
    path: '/anchor',
    description: 'Page anchor navigation with smooth scrolling and active link highlighting',
    milestone: 'Milestone 10: Advanced Layout & System',
    category: 'Navigation',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 95
  },
  {
    name: 'Grid',
    path: '/grid',
    description: 'Advanced grid system with responsive breakpoints, gutters, and auto-layout',
    milestone: 'Milestone 10: Advanced Layout & System',
    category: 'Layout',
    status: 'completed',
    version: '0.1.0',
    testCoverage: 15
  },

  // Milestone 12: Component Reliability & Enhancement
  {
    name: 'Icon',
    path: '/icon',
    description: 'Flexible SVG icon system with 50+ built-in icons, custom SVG support, and animations',
    milestone: 'Milestone 12: Component Reliability & Enhancement',
    category: 'Display',
    status: 'completed',
    version: '1.0.0',
    testCoverage: 100
  }
]

export const getComponentStats = () => {
  const total = components.length
  const completed = components.filter(c => c.status === 'completed').length
  const inProgress = components.filter(c => c.status === 'in-progress').length
  const planned = components.filter(c => c.status === 'planned').length
  const completionPercentage = Math.round((completed / total) * 100)
  const averageCoverage = Math.round(
    components.reduce((sum, c) => sum + (c.testCoverage || 0), 0) / total
  )

  return {
    total,
    completed,
    inProgress,
    planned,
    completionPercentage,
    averageCoverage
  }
}

export const getComponentsByMilestone = () => {
  const groups = components.reduce((acc, component) => {
    const milestone = component.milestone
    if (!acc[milestone]) acc[milestone] = []
    acc[milestone].push(component)
    return acc
  }, {} as Record<string, Component[]>)

  return Object.entries(groups).map(([milestone, comps]) => ({
    title: milestone,
    components: comps.sort((a, b) => a.name.localeCompare(b.name))
  }))
}

export const getComponentsByCategory = () => {
  const groups = components.reduce((acc, component) => {
    const category = component.category
    if (!acc[category]) acc[category] = []
    acc[category].push(component)
    return acc
  }, {} as Record<string, Component[]>)

  return Object.entries(groups).map(([category, comps]) => ({
    title: category,
    components: comps.sort((a, b) => a.name.localeCompare(b.name))
  }))
}

export const getAllComponentsAlphabetically = () => {
  return [{
    title: 'All Components',
    components: [...components].sort((a, b) => a.name.localeCompare(b.name))
  }]
}

export const filterComponents = (searchTerm: string): Component[] => {
  if (!searchTerm.trim()) return components

  const term = searchTerm.toLowerCase().trim()
  return components.filter(component =>
    component.name.toLowerCase().includes(term) ||
    component.description.toLowerCase().includes(term) ||
    component.category.toLowerCase().includes(term) ||
    component.milestone.toLowerCase().includes(term)
  )
}

export const getFilteredComponentsByMilestone = (searchTerm: string) => {
  const filteredComponents = filterComponents(searchTerm)
  const groups = filteredComponents.reduce((acc, component) => {
    const milestone = component.milestone
    if (!acc[milestone]) acc[milestone] = []
    acc[milestone].push(component)
    return acc
  }, {} as Record<string, Component[]>)

  return Object.entries(groups).map(([milestone, comps]) => ({
    title: milestone,
    components: comps.sort((a, b) => a.name.localeCompare(b.name))
  }))
}

export const getFilteredComponentsByCategory = (searchTerm: string) => {
  const filteredComponents = filterComponents(searchTerm)
  const groups = filteredComponents.reduce((acc, component) => {
    const category = component.category
    if (!acc[category]) acc[category] = []
    acc[category].push(component)
    return acc
  }, {} as Record<string, Component[]>)

  return Object.entries(groups).map(([category, comps]) => ({
    title: category,
    components: comps.sort((a, b) => a.name.localeCompare(b.name))
  }))
}

export const getFilteredComponentsAlphabetically = (searchTerm: string) => {
  const filteredComponents = filterComponents(searchTerm)
  return [{
    title: 'All Components',
    components: filteredComponents.sort((a, b) => a.name.localeCompare(b.name))
  }]
}
