# 📝 Changelog

All notable changes to Preact Nebula UI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-07

### 🎉 Initial Release

This is the first stable release of Preact Nebula UI, featuring a complete component library with 40+ production-ready components.

### ✨ Added

#### Foundation Components
- **Typography** - Text display with semantic styling
- **Container** - Layout container with responsive design
- **Stack** - Flexible layout component for arranging children
- **Grid** - CSS Grid-based layout system
- **Divider** - Visual separator with customizable styles
- **Image** - Enhanced image component with loading states
- **Portal** - Render components outside normal DOM hierarchy
- **ConfigProvider** - Global configuration and theme provider

#### Form Components
- **Input** - Text input with validation and states
- **Textarea** - Multi-line text input with auto-resize
- **Label** - Form labels with accessibility support
- **FieldError** - Error message display for forms
- **Checkbox** - Checkbox input with indeterminate state
- **Radio** - Radio button input with grouping
- **Select** - Dropdown selection with search and multi-select
- **Switch** - Toggle switch with custom styling

#### Feedback Components
- **Alert** - Alert messages with various severity levels
- **Toast** - Toast notifications with positioning
- **Modal** - Modal dialogs with accessibility
- **Spinner** - Loading spinners with various styles
- **Progress** - Progress indicators (linear and circular)
- **Empty** - Empty state placeholder

#### Navigation Components
- **Button** - Buttons with various styles and states
- **Navigation** - Navigation menus with dropdown support
- **Breadcrumb** - Breadcrumb navigation trail
- **Pagination** - Data pagination with customizable options
- **Anchor** - Enhanced anchor links with smooth scrolling
- **BackTop** - Back to top button with smooth scrolling
- **Steps** - Step-by-step process indicator

#### Data Display Components
- **Table** - Data tables with sorting, filtering, and pagination
- **Card** - Content cards with various layouts
- **Badge** - Status badges and labels
- **Avatar** - User avatars with fallback options
- **Tooltip** - Contextual tooltips with positioning
- **Popover** - Popover content with trigger options
- **Collapse** - Collapsible content panels
- **Tabs** - Tabbed content with keyboard navigation

#### Advanced Components
- **DatePicker** - Date selection with calendar interface
- **TimePicker** - Time selection component
- **Autocomplete** - Search input with suggestions
- **Upload** - File upload with drag & drop
- **Transfer** - Data transfer between lists

#### Utility Components
- **Rating** - Star rating component with half-star support
- **Slider** - Range slider with marks and tooltips
- **Skeleton** - Loading skeleton placeholders
- **Affix** - Sticky positioning component
- **Carousel** - Image/content carousel with navigation
- **Drawer** - Slide-out drawer panels
- **Tags** - Tag input and display component
- **TreeView** - Hierarchical tree data display

### 🎨 Design System Features

- **Complete Theme System** - Light and dark mode support
- **Responsive Design** - Mobile-first responsive components
- **Accessibility First** - WCAG 2.1 AA compliance
- **TypeScript Support** - Full type safety and IntelliSense
- **Tailwind CSS** - Utility-first styling approach
- **Custom Properties** - CSS custom properties for theming

### 🚀 Developer Experience

- **Tree Shaking** - Import only components you need
- **TypeScript** - Complete type definitions
- **ESLint & Prettier** - Code quality and formatting
- **Comprehensive Tests** - 1430+ tests with 100% pass rate
- **Documentation** - Complete component documentation
- **Storybook** - Interactive component playground

### 🧪 Testing & Quality

- **1430 Tests** - Comprehensive test suite
- **100% Pass Rate** - All tests passing consistently
- **Unit Tests** - Component behavior validation
- **Integration Tests** - Component interaction testing
- **Accessibility Tests** - Screen reader and keyboard testing
- **Visual Tests** - Theme and responsive testing

### 📚 Documentation

- **Component Docs** - Complete API documentation
- **Usage Examples** - Real-world usage patterns
- **Best Practices** - Implementation guidelines
- **Migration Guides** - Integration instructions
- **Accessibility Guide** - WCAG compliance documentation

### ⚡ Performance

- **Optimized Bundles** - Tree-shakable components
- **Fast Rendering** - <50ms initial render times
- **Memory Efficient** - Minimal memory footprint
- **Smooth Animations** - 60fps animations
- **Large Dataset Support** - Optimized for 1000+ items

### 🔧 Technical Features

- **Preact/React Compatible** - Works with both frameworks
- **ES Modules** - Modern module system
- **CommonJS** - Legacy compatibility
- **CSS-in-JS** - Optional CSS-in-JS support
- **Server-Side Rendering** - SSR compatible
- **Progressive Enhancement** - Works without JavaScript

### 📦 Distribution

- **NPM Package** - Available on NPM registry
- **CDN Support** - Available via CDN
- **Multiple Formats** - ES modules, CommonJS, UMD
- **Type Definitions** - Complete TypeScript definitions
- **Source Maps** - Debug-friendly source maps

## Migration Guide

### From Other Libraries

#### From Ant Design
- **Button** → Direct replacement with similar API
- **Input** → Enhanced with better validation
- **Table** → Improved performance and accessibility
- **DatePicker** → More flexible and accessible
- **Modal** → Better accessibility and focus management

#### From Material-UI
- **Typography** → Semantic text components
- **Grid** → CSS Grid-based system
- **Card** → Flexible content containers
- **Avatar** → Enhanced fallback handling
- **Tooltip** → Better positioning and accessibility

#### From Chakra UI
- **Stack** → Similar layout approach
- **Button** → Comparable styling options
- **Input** → Enhanced validation states
- **Toast** → Improved positioning system
- **Modal** → Better accessibility features

### Breaking Changes

None - this is the initial release.

### Upgrading

Since this is the initial release, there are no upgrade steps needed.

## Installation

```bash
npm install preact-nebula-ui
# or
yarn add preact-nebula-ui
# or
pnpm add preact-nebula-ui
```

## Quick Start

```tsx
import { Button, Input, Card } from 'preact-nebula-ui';
import 'preact-nebula-ui/styles';

function App() {
  return (
    <Card>
      <Input placeholder="Enter your name" />
      <Button variant="primary">Submit</Button>
    </Card>
  );
}
```

## Browser Support

- **Chrome** ≥ 90
- **Firefox** ≥ 88
- **Safari** ≥ 14
- **Edge** ≥ 90

## Node.js Support

- **Node.js** ≥ 16.0.0

## Framework Compatibility

- **React** ≥ 16.8.0
- **Preact** ≥ 10.0.0
- **Next.js** ≥ 12.0.0
- **Vite** ≥ 3.0.0

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## Support

- **Documentation**: [Component Documentation](docs/)
- **Issues**: [GitHub Issues](https://github.com/PRachwal/preact-nebula-ui/issues)
- **Discussions**: [GitHub Discussions](https://github.com/PRachwal/preact-nebula-ui/discussions)

---

**Thank you for using Preact Nebula UI!** 🚀

This changelog will be updated with each release to document new features, bug fixes, and breaking changes.
