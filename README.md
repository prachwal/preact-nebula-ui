# 🌟 Nebula UI

Modern, accessible, and customizable component library built with **Preact** and **Tailwind CSS**.

[![NPM Version](https://img.shields.io/npm/v/@prp/nebula-ui)](https://www.npmjs.com/package/@prp/nebula-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)](https://www.typescriptlang.org/)
[![Preact](https://img.shields.io/badge/Preact-10.26+-purple)](https://preactjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-cyan)](https://tailwindcss.com/)

## ✨ Features

- 🚀 **Built for Preact** - Optimized for Preact with full TypeScript support
- 🎨 **Tailwind CSS** - Utility-first styling with customization
- 📦 **Tree-shakable** - Import only what you need
- ♿ **Accessible** - WCAG compliant components
- 🔧 **Customizable** - Easy to theme and extend
- 📱 **Responsive** - Mobile-first design approach
- 🧪 **Well-tested** - 100% test coverage, 485+ tests passing, 26 components

## 📦 Installation

```bash
npm install @prp/nebula-ui
```

Make sure you have the required peer dependencies:

```bash
npm install preact
```

## 🚀 Quick Start

### 1. Import Styles

Add the Nebula UI styles to your main CSS file:

```css
@import '@prp/nebula-ui/styles';
```

Or import in your JavaScript/TypeScript entry file:

```javascript
import '@prp/nebula-ui/styles'
```

### 2. Use Components

```tsx
import { Button } from '@prp/nebula-ui'

function App() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Hello Nebula UI!
      </Button>
    </div>
  )
}
```


## 🧩 Components

Nebula UI provides a growing set of accessible, customizable, and well-tested components:

### 🎛️ Form Controls
- **Button** – Variants, sizes, icons, loading, fullWidth
- **Input** – All variants, accessibility, required states
- **Label** – Accessibility, required/disabled states
- **Textarea** – Auto-resize, char count, variants, dark mode
- **FieldError** – Accessible error messages
- **Checkbox** – Tri-state, validation, custom content, accessibility
- **Radio** – Single selection, groups, validation, accessibility
- **Switch** – Toggle controls, animations, sizes, icons
- **Select** – Dropdown with search, multi-select, keyboard navigation

### 🏗️ Layout System
- **Card** – Composable, variants, header/body/footer
- **Container** – Responsive, max-width, padding controls
- **Stack** – Vertical/horizontal, spacing, alignment
- **Divider** – Horizontal/vertical, text, style variants

### 📢 Feedback Components
- **Alert** – Info/success/warning/error, dismissible, actions
- **Badge** – Status indicators, dot mode, overflow handling
- **Progress** – Linear/circular, indeterminate, labels
- **Skeleton** – Loading placeholders, shapes, animations

### 🎨 Display Components
- **Spinner** – Size, color, accessibility
- **Avatar** – Images, initials, groups, badges

### 🧭 Navigation
- **Breadcrumb** – Hierarchical navigation, responsive collapse, custom separators
- **Pagination** – Page navigation, sizes, quick jump, accessibility
- **Table** – Data tables with sorting, selection, responsive design
- **Tabs** – Horizontal/vertical, variants, keyboard navigation

All components are fully typed, accessible (WCAG 2.1 AA), and covered by comprehensive tests (485+ test cases).

## 🎨 Customization

Nebula UI uses Tailwind CSS classes. You can customize the appearance by:

1. **Extending Tailwind Config** - Add custom colors, spacing, etc.
2. **Custom CSS Classes** - Override default styles with your own classes
3. **CSS Variables** - Modify component tokens (coming soon)

## 🧪 Development

### Setup

```bash
git clone https://github.com/PRachwal/preact-nebula-ui.git
cd preact-nebula-ui
npm install
```

### Scripts

```bash
# Start development server
npm run dev

# Build the library
npm run build:lib

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint code
npm run lint

# Build and publish (dry run)
npm run publish:dry

# Publish to NPM
npm run publish:npm
```

### Windows PowerShell Scripts

For Windows users, use the PowerShell scripts in the `scripts/` folder:

```powershell
# Build the library
.\scripts\build.ps1

# Publish (dry run)
.\scripts\publish.ps1 -DryRun

# Publish to NPM
.\scripts\publish.ps1
```

### Component Development Guide

When creating a new component, follow this standardized structure based on our `Checkbox` component example:

#### 📁 Component Library Structure (`nebula/components/ComponentName/`)

```
ComponentName/
├── ComponentName.tsx      # Main component implementation
├── ComponentName.types.ts # TypeScript interfaces and types
├── ComponentName.test.tsx # Unit tests with comprehensive coverage
└── index.ts              # Export barrel file
```

**Example component files:**

1. **`ComponentName.tsx`** - Main component with:
   - `forwardRef` implementation for ref forwarding
   - Comprehensive styling system with variants, sizes, states
   - Full accessibility support (ARIA attributes, keyboard navigation)
   - Dark mode support
   - Error handling and validation states

2. **`ComponentName.types.ts`** - Type definitions:
   ```tsx
   export interface ComponentNameProps extends HTMLAttributes<HTMLElement> {
     variant?: 'default' | 'outlined'
     size?: 'sm' | 'md' | 'lg'
     disabled?: boolean
     error?: boolean
     // ... other component-specific props
   }
   ```

3. **`ComponentName.test.tsx`** - Comprehensive tests covering:
   - Basic rendering and props
   - All variants and sizes
   - Accessibility features
   - User interactions
   - Error states
   - Edge cases

4. **`index.ts`** - Clean exports:
   ```tsx
   export { ComponentName } from './ComponentName'
   export type { ComponentNameProps } from './ComponentName.types'
   ```

#### 📁 Documentation Pages Structure (`src/pages/componentname/`)

```
componentname/
├── ComponentNamePage.tsx  # Main page component
├── index.ts              # Page exports
└── sections/             # Interactive examples and docs
    ├── BasicUsageSection.tsx    # Basic usage examples
    ├── VariantsSection.tsx      # All variants showcase
    ├── InteractiveSection.tsx   # Interactive playground
    ├── AccessibilitySection.tsx # Accessibility features demo
    └── index.ts                # Section exports
```

**Page structure guidelines:**

1. **`ComponentNamePage.tsx`** - Main documentation page with:
   - Component overview and description
   - Navigation tabs for different sections
   - Imports from `./sections`

2. **`sections/`** - Individual documentation sections:
   - **BasicUsageSection** - Simple usage examples with code
   - **VariantsSection** - All visual variants and sizes
   - **InteractiveSection** - Live playground with controls
   - **AccessibilitySection** - Accessibility features demonstration

#### 🔗 Integration Steps

1. **Add to main exports** in `nebula/components/index.ts`:
   ```tsx
   export { ComponentName } from './ComponentName'
   export type { ComponentNameProps } from './ComponentName/ComponentName.types'
   ```

2. **Add page route** in `src/app.tsx`:
   ```tsx
   // Import
   import { ComponentNamePage } from './pages/componentname'
   
   // Add route
   <ComponentNamePage path="/componentname" />
   ```

3. **Add to documentation** in relevant milestone docs
4. **Update test data** in `src/data/testResults.ts`:
   ```tsx
   // Add component to componentTestData array
   { componentName: 'ComponentName', testCount: XX, coverage: 100, status: 'passing', lastUpdated: '2025-08-04' }
   
   // Update mockTestResults.totalTests with new count
   totalTests: XXX, // Add your component's test count to total
   ```
5. **Update component status** in `src/data/components.ts`:
   ```tsx
   // Change component status from 'planned' to 'completed' and update coverage
   { 
     name: 'ComponentName',
     status: 'completed',
     testCoverage: 100
   }
   ```
6. **Update component count** in README.md and milestone status

This structure ensures consistency, maintainability, and comprehensive documentation across all components.

## 📋 Roadmap

## 📋 Roadmap

- [x] [Milestone 1: Forms Foundation](docs/milestone-1/) (Input, Label, Textarea, FieldError, Button) – **Done**
- [x] [Milestone 2: Layout System](docs/milestone-2/) (Card, Container, Stack, Divider) – **Done**  
- [x] [Milestone 3: Feedback Components](docs/milestone-3/) (Alert, Badge, Progress, Skeleton) – **Done**
- [x] [Milestone 4: Advanced Form Controls](docs/milestone-4/) (Checkbox, Radio, Switch, Select) – **COMPLETED**
- [x] [Milestone 5: Navigation & Data](docs/milestone-5/) (Breadcrumb, Pagination, Table) – **COMPLETED**
- [ ] [Milestone 6: Advanced Interactions](docs/milestone-6/) (Modal, Tooltip, Drawer, Popover) – **PLANNED**
- [ ] Storybook documentation
- [ ] Theme customization system
- [ ] CI/CD pipeline
- [ ] More comprehensive edge-case testing
## 📚 Documentation Structure

Nebula UI uses a comprehensive milestone-based documentation system. For complete documentation including project status, implementation plans, and detailed component guides, visit:

**[📚 Unified Documentation Index](docs/README.md)**

Each major milestone has its own folder in `docs/`, containing:

- `README.md` – Milestone overview, goals, and delivered components
- `IMPLEMENTATION_CHECKLIST.md` – Detailed implementation checklist for each component
- `TECHNICAL_OVERVIEW.md` – Technical architecture, design decisions, and patterns

**Milestone documentation folders:**

- [Milestone 1: Forms Foundation](docs/milestone-1/)
- [Milestone 2: Layout System](docs/milestone-2/)
- [Milestone 3: Feedback Components](docs/milestone-3/)
- [Milestone 4: Advanced Form Controls](docs/milestone-4/)
- [Milestone 5: Navigation & Data](docs/milestone-5/)
- [Milestone 6: Advanced Interactions](docs/milestone-6/) (Planned)

For global project plans, status, and size standardization, see:

- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md)
- [Milestone Implementation Plan](docs/MILESTONE_IMPLEMENTATION_PLAN.md)
- [Project Status](docs/PROJECT_STATUS.md)
- [Size Standardization Checklist](docs/SIZE_STANDARDIZATION_CHECKLIST.md)
- [ ] Milestone 6: Advanced Interactions (Modal, Tooltip, Popover)
- [ ] Storybook documentation
- [ ] Theme customization system
- [ ] CI/CD pipeline
- [ ] More comprehensive edge-case testing


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 📄 License

MIT © [PRachwal](https://github.com/PRachwal)


## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@prp/nebula-ui)
- [GitHub Repository](https://github.com/PRachwal/preact-nebula-ui)
- [Issues](https://github.com/PRachwal/preact-nebula-ui/issues)

---

Made with ❤️ using Preact and Tailwind CSS
