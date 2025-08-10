---
mode: ask
---

# 🚀 Nebula UI Component Creation Guide

This comprehensive guide provides step-by-step instructions for creating new components in the Nebula UI design system, following established patterns and maintaining consistency across the library.

## 📋 Prerequisites

- TypeScript knowledge
- Preact/React experience
- Tailwind CSS proficiency
- Testing Library familiarity
- Accessibility (WCAG 2.1 AA) understanding

## 🏗️ Component Architecture Overview

Each component follows a modular structure with these key files:

```
nebula/components/[ComponentName]/
├── index.ts                    # Public exports
├── [ComponentName].tsx         # Main component implementation
├── [ComponentName].types.ts    # TypeScript interfaces
├── [ComponentName].test.tsx    # Unit tests
└── __tests__/                  # Additional test files
    └── [ComponentName].a11y.test.tsx
```

## 🎯 Step-by-Step Implementation

### Step 1: Create Component Structure

1. **Create component directory**:
   ```bash
   mkdir nebula/components/[ComponentName]
   ```

2. **Define TypeScript interfaces** (`[ComponentName].types.ts`):
   ```typescript
   import { ComponentChild } from 'preact'

   export interface [ComponentName]Props {
     // Size variants (required pattern)
     size?: 'sm' | 'md' | 'lg'
     
     // Common props
     children?: ComponentChild
     className?: string
     disabled?: boolean
     
     // Component-specific props
     variant?: 'primary' | 'secondary' | 'outline'
     
     // Event handlers with proper typing
     onClick?: (event: Event) => void
     onChange?: (value: any) => void
     
     // Accessibility props (always include)
     'aria-label'?: string
     'aria-describedby'?: string
     role?: string
   }
   ```

3. **Implement main component** (`[ComponentName].tsx`):
   ```typescript
   import { forwardRef } from 'preact/compat'
   import { cn } from '../../utils/cn'
   import type { [ComponentName]Props } from './[ComponentName].types'

   export const [ComponentName] = forwardRef<HTMLElement, [ComponentName]Props>(
     ({
       size = 'md',
       variant = 'primary',
       disabled = false,
       className,
       children,
       ...props
     }, ref) => {
       // Define size classes (required pattern)
       const sizeClasses = {
         sm: 'text-sm px-2 py-1',
         md: 'text-base px-4 py-2', 
         lg: 'text-lg px-6 py-3'
       }

       // Define variant classes
       const variantClasses = {
         primary: 'bg-blue-600 text-white hover:bg-blue-700',
         secondary: 'bg-gray-600 text-white hover:bg-gray-700',
         outline: 'border border-gray-300 bg-transparent hover:bg-gray-50'
       }

       return (
         <div
           ref={ref}
           className={cn(
             // Base styles with dark mode
             'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500',
             'dark:focus:ring-blue-400',
             
             // Size and variant
             sizeClasses[size],
             variantClasses[variant],
             
             // Disabled state
             disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
             
             className
           )}
           aria-disabled={disabled}
           {...props}
         >
           {children}
         </div>
       )
     }
   )

   [ComponentName].displayName = '[ComponentName]'
   ```

4. **Create exports** (`index.ts`):
   ```typescript
   export { [ComponentName] } from './[ComponentName]'
   export type { [ComponentName]Props } from './[ComponentName].types'
   ```

5. **Add to main exports** (`nebula/components/index.ts`):
   ```typescript
   export * from './[ComponentName]'
   ```

### Step 2: Create Test Suite

1. **Unit tests** (`[ComponentName].test.tsx`):
   ```typescript
   import { describe, it, expect } from 'vitest'
   import { render, screen, fireEvent } from '@testing-library/preact'
   import { [ComponentName] } from './[ComponentName]'

   describe('[ComponentName]', () => {
     it('renders with default props', () => {
       render(<[ComponentName]>Test content</[ComponentName]>)
       expect(screen.getByText('Test content')).toBeInTheDocument()
     })

     it('applies size classes correctly', () => {
       const { container } = render(<[ComponentName] size="lg">Content</[ComponentName]>)
       expect(container.firstChild).toHaveClass('text-lg')
     })

     it('handles disabled state', () => {
       render(<[ComponentName] disabled>Content</[ComponentName]>)
       expect(screen.getByText('Content')).toHaveAttribute('aria-disabled', 'true')
     })

     it('supports dark mode classes', () => {
       const { container } = render(<[ComponentName]>Content</[ComponentName]>)
       expect(container.firstChild).toHaveClass('dark:focus:ring-blue-400')
     })
   })
   ```

2. **Accessibility tests** (`__tests__/[ComponentName].a11y.test.tsx`):
   ```typescript
   import { describe, it, expect } from 'vitest'
   import { render } from '@testing-library/preact'
   import { axe, toHaveNoViolations } from 'jest-axe'
   import { [ComponentName] } from '../[ComponentName]'

   expect.extend(toHaveNoViolations)

   describe('[ComponentName] Accessibility', () => {
     it('should not have accessibility violations', async () => {
       const { container } = render(<[ComponentName]>Test</[ComponentName]>)
       const results = await axe(container)
       expect(results).toHaveNoViolations()
     })
   })
   ```

### Step 3: Create Documentation Page

**IMPORTANT**: Use the modern page pattern with `usePathTabPage` hook for all new component pages.

1. **Create page structure**:
   ```bash
   mkdir src/pages/[component-name]
   mkdir src/pages/[component-name]/sections
   ```

2. **Main page** (`src/pages/[component-name]/[ComponentName]Page.tsx`):
   ```typescript
   import { PageHeader } from '../../components/layout/PageHeader'
   import { DemoTabs } from '../../components/layout/DemoTabs'
   import { DocumentationTab } from '../../components/DocumentationTab'
   import { usePathTabPage, PathTabPageConfigs } from '../../hooks'
   import {
     BasicUsageSection,
     SizesSection,
     VariantsSection,
     StatesSection,
     PropsDocumentation
   } from './sections'

   interface PageProps {
     readonly path?: string
   }

   export function [ComponentName]Page(_props: PageProps) {
     const { activeTab, setActiveTab, tabs } = usePathTabPage(
       PathTabPageConfigs.withDocumentation('/[component-name]', [
         { key: 'sizes', label: 'Sizes' },
         { key: 'variants', label: 'Variants' },
         { key: 'states', label: 'States' }
       ])
     )

     const renderSection = () => {
       switch (activeTab) {
         case 'basic':
           return <BasicUsageSection />
         case 'sizes':
           return <SizesSection />
         case 'variants':
           return <VariantsSection />
         case 'states':
           return <StatesSection />
         case 'props':
           return <PropsDocumentation />
         case 'documentation':
           return <DocumentationTab componentName="[component-name]" />
         default:
           return <BasicUsageSection />
       }
     }

     return (
       <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
           <PageHeader
             title="🔧 [ComponentName] Component"
             description="[Component description and use cases]"
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
   }
   ```

3. **Page metadata** (`src/pages/[component-name]/metadata.json`):
   ```json
   {
     "title": "[ComponentName] Component",
     "description": "Brief description of the component's purpose and functionality",
     "category": "Category (Forms/Display/Navigation/Feedback/etc.)",
     "version": "1.0.0",
     "status": "stable",
     "features": [
       "Feature 1",
       "Feature 2",
       "Feature 3"
     ],
     "dependencies": [],
     "related": [
       "RelatedComponent1",
       "RelatedComponent2"
     ]
   }
   ```

4. **Documentation README** (`src/pages/[component-name]/README.md`):
   ```markdown
   # [ComponentName] Component
   
   Brief description of the component and its primary use cases.
   
   ## Key Features
   
   ### 🎨 Feature Category 1
   - **Feature**: Description
   - **Another Feature**: Description
   
   ### 🔧 Feature Category 2  
   - **Flexibility**: Description
   - **Customization**: Description
   
   ## Use Cases
   
   ### Primary Use Case
   Description of when and how to use this component.
   
   ## Technical Implementation
   
   ### Performance
   - Performance considerations
   - Bundle impact
   - Optimization notes
   
   ### Browser Support
   List of supported browsers and versions.
   ```

5. **Demo sections** (`src/pages/[component-name]/sections/BasicUsageSection.tsx`):
   ```typescript
   import { [ComponentName] } from '../../../../nebula/components'

   export function BasicUsageSection() {
     return (
       <div className="space-y-8">
         <div>
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
             Basic Usage
           </h2>
           <p className="text-gray-600 dark:text-gray-300 mb-6">
             Basic implementation examples for [ComponentName] component.
           </p>
         </div>

         <div className="space-y-6">
           <div>
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
               Default Configuration
             </h3>
             <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
               <[ComponentName]>
                 Example content
               </[ComponentName]>
             </div>
           </div>
         </div>
       </div>
     )
   }
   ```

6. **Section exports** (`src/pages/[component-name]/sections/index.ts`):
   ```typescript
   export { BasicUsageSection } from './BasicUsageSection'
   export { SizesSection } from './SizesSection'
   export { VariantsSection } from './VariantsSection'
   export { StatesSection } from './StatesSection'
   export { PropsDocumentation } from './PropsDocumentation'
   ```

7. **Page exports** (`src/pages/[component-name]/index.ts`):
   ```typescript
   export { [ComponentName]Page } from './[ComponentName]Page'
   ```

## 🆕 Modern Page Pattern Guidelines

### Required Page Structure
All new component pages MUST follow this modern pattern:

1. **Use `usePathTabPage` hook** instead of manual state management
2. **Include Documentation tab** with `PathTabPageConfigs.withDocumentation()`
3. **Add metadata.json** for component information
4. **Create README.md** with comprehensive documentation
5. **Use `renderSection()` function** with switch statement for tab content

### Path Tab Configuration
```typescript
// For pages with documentation tab
const { activeTab, setActiveTab, tabs } = usePathTabPage(
  PathTabPageConfigs.withDocumentation('/component-name', [
    { key: 'sizes', label: 'Sizes' },
    { key: 'variants', label: 'Variants' },
    { key: 'advanced', label: 'Advanced' }
  ])
)

// For pages without documentation tab (legacy/special cases only)
const { activeTab, setActiveTab, tabs } = usePathTabPage(
  PathTabPageConfigs.standard('/component-name', [
    { key: 'basic', label: 'Basic Usage' },
    { key: 'sizes', label: 'Sizes' }
  ])
)
```

### Tab URL Integration
The modern pattern automatically handles URL-based tab switching:
- `/component/basic` - Shows basic usage
- `/component/sizes` - Shows sizes section  
- `/component/props` - Shows props documentation
- `/component/documentation` - Shows generated documentation

### Required Files Structure
```
src/pages/[component-name]/
├── [ComponentName]Page.tsx    # Main page with usePathTabPage hook
├── metadata.json              # Component metadata
├── README.md                  # Comprehensive documentation
├── index.ts                   # Page exports
└── sections/                  # Demo sections
    ├── BasicUsageSection.tsx
    ├── [Other]Section.tsx
    ├── PropsDocumentation.tsx
    └── index.ts
```
   ```typescript
   export { BasicUsageSection } from './BasicUsageSection'
   export { SizesSection } from './SizesSection'
   export { VariantsSection } from './VariantsSection'
   export { StatesSection } from './StatesSection'
   export { PropsDocumentation } from './PropsDocumentation'
   ```

5. **Page exports** (`src/pages/[component-name]/index.ts`):
   ```typescript
   export { [ComponentName]Page } from './[ComponentName]Page'
   ```

### Step 4: Update Data and Routing

1. **Add to components data** (`src/data/components.ts`):
   ```typescript
   {
     name: '[ComponentName]',
     path: '/[component-name]',
     description: '[Component description]',
     milestone: 'Milestone X: [Milestone Name]',
     category: '[Category]',
     status: 'completed',
     version: '1.0.0',
     testCoverage: 95
   }
   ```

2. **Create page index exports** (`src/pages/[component-name]/index.ts`):
   ```typescript
   export { [ComponentName]Page } from './[ComponentName]Page'
   ```

3. **Add import to app** (`src/app.tsx`):
   ```typescript
   import { [ComponentName]Page } from './pages/[component-name]'
   ```

4. **Add route to app** (`src/app.tsx`):
   ```typescript
   // In the Router component, add the route:
   <[ComponentName]Page path="/[component-name]" />
   ```

### Step 5: Integration Checklist

Before considering the component complete, ensure:

- [ ] **Component exports**: Added to `nebula/components/index.ts`
- [ ] **Page exports**: Created `src/pages/[component-name]/index.ts`
- [ ] **Data entry**: Updated `src/data/components.ts` with correct status
- [ ] **Import added**: Added import statement in `src/app.tsx`
- [ ] **Route configured**: Added route in Router component in `src/app.tsx`
- [ ] **Testing**: Component and page work correctly
- [ ] **Navigation**: Component appears in main navigation/component list
   ```

## 🎨 Design Guidelines

### Required Patterns
- **Size variants**: Always include `sm`, `md`, `lg` sizes
- **Dark mode**: Full dark mode support with `dark:` classes
- **Accessibility**: ARIA attributes, keyboard navigation, focus management
- **TypeScript**: Strict typing with proper interfaces
- **forwardRef**: For DOM element access
- **Responsive design**: Mobile-first approach

### Color System
```css
/* Primary colors */
blue-600, blue-700 (primary)
gray-600, gray-700 (secondary)
red-600, red-700 (destructive)
green-600, green-700 (success)
yellow-600, yellow-700 (warning)

/* Text colors */
text-gray-900 dark:text-white (primary text)
text-gray-600 dark:text-gray-300 (secondary text)
text-gray-500 dark:text-gray-400 (muted text)

/* Background colors */
bg-white dark:bg-gray-800 (cards/surfaces)
bg-gray-50 dark:bg-gray-900 (page backgrounds)
bg-gray-100 dark:bg-gray-700 (hover states)
```

## ✅ Quality Checklist

### Functionality
- [ ] Component renders correctly with all props
- [ ] All size variants work properly
- [ ] All variant styles are applied
- [ ] Disabled state functions correctly
- [ ] Event handlers work as expected

### Accessibility
- [ ] Proper ARIA attributes
- [ ] Keyboard navigation support
- [ ] Screen reader compatibility
- [ ] Focus management
- [ ] Color contrast compliance (4.5:1 minimum)

### Testing
- [ ] Unit tests cover all props and states
- [ ] Accessibility tests pass
- [ ] Edge cases are tested
- [ ] Error states are handled
- [ ] Performance tests for complex components

### Documentation
- [ ] All demo sections implemented
- [ ] Props documentation complete
- [ ] Usage examples provided
- [ ] Accessibility notes included
- [ ] Performance considerations documented

### Integration
- [ ] Added to main exports
- [ ] Route configured in app.tsx
- [ ] Component data updated
- [ ] Milestone documentation updated

## 🚀 Advanced Patterns

### Compound Components
```typescript
const Accordion = AccordionComponent as typeof AccordionComponent & {
  Panel: typeof AccordionPanel
}
Accordion.Panel = AccordionPanel
```

### Controlled/Uncontrolled
```typescript
interface ComponentProps {
  value?: string           // Controlled
  defaultValue?: string    // Uncontrolled
  onChange?: (value: string) => void
}
```

### Custom Hooks
```typescript
export function useComponent(options: ComponentOptions) {
  // Complex logic extraction
  return { state, actions, handlers }
}
```

This guide ensures consistency, quality, and maintainability across all Nebula UI components.