# PageLayout Component Documentation

## Overview
The **PageLayout** component provides a standardized page structure for the Nebula UI library. It offers consistent layout, navigation, and content organization across different page types, including support for back navigation, page headers, and section organization.

## Features
- **Multiple Page Types**: Support for home, component-demo, and documentation layouts
- **Header Section**: Configurable title, description, and back navigation
- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dark Mode Support**: Full compatibility with dark/light theme switching
- **Navigation Integration**: Built-in back navigation with Preact Router
- **Section Component**: Complementary component for organizing page content
- **Container Integration**: Uses Container component for consistent width management
- **Typography Integration**: Leverages Heading and Text components

## Basic Usage

### Simple Page Layout
```tsx
import { PageLayout } from '@nebula-ui/components'

function MyPage() {
  return (
    <PageLayout 
      title="My Page Title"
      description="This is a description of my page content."
    >
      <div>Page content goes here</div>
    </PageLayout>
  )
}
```

### Component Demo Layout
```tsx
import { PageLayout, Section } from '@nebula-ui/components'

function ComponentDemo() {
  return (
    <PageLayout 
      type="component-demo"
      title="Button Component"
      description="Interactive buttons with various styles and states."
      showBack={true}
      backUrl="/components"
      backLabel="Back to Components"
    >
      <Section title="Basic Buttons" description="Standard button variations">
        {/* Button examples */}
      </Section>
      
      <Section title="Button Sizes" description="Different button sizes">
        {/* Size examples */}
      </Section>
    </PageLayout>
  )
}
```

## Advanced Examples

### Home Page Layout
```tsx
import { PageLayout, Section } from '@nebula-ui/components'

function HomePage() {
  return (
    <PageLayout 
      type="home"
      showBack={false}
      className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900"
    >
      <Section title="Welcome to Nebula UI">
        <p>A comprehensive component library for Preact applications.</p>
      </Section>
      
      <Section title="Getting Started" description="Begin your journey with these components">
        {/* Getting started content */}
      </Section>
    </PageLayout>
  )
}
```

### Documentation Layout
```tsx
import { PageLayout, Section } from '@nebula-ui/components'

function DocumentationPage() {
  return (
    <PageLayout 
      type="documentation"
      title="API Reference"
      description="Complete documentation for all component props and methods."
      backUrl="/docs"
      backLabel="Back to Documentation"
    >
      <Section title="Props" description="Available component properties">
        {/* Props documentation */}
      </Section>
      
      <Section title="Methods" description="Available component methods">
        {/* Methods documentation */}
      </Section>
      
      <Section title="Examples" description="Usage examples">
        {/* Code examples */}
      </Section>
    </PageLayout>
  )
}
```

### Custom Navigation
```tsx
import { PageLayout } from '@nebula-ui/components'

function CustomPage() {
  return (
    <PageLayout 
      title="Settings"
      description="Manage your application settings"
      showBack={true}
      backUrl="/dashboard"
      backLabel="← Back to Dashboard"
      className="bg-white dark:bg-gray-800"
    >
      {/* Settings content */}
    </PageLayout>
  )
}
```

### Section Variations
```tsx
import { PageLayout, Section } from '@nebula-ui/components'

function SectionExamples() {
  return (
    <PageLayout title="Section Examples">
      {/* Section with title only */}
      <Section title="Basic Section">
        <p>Simple section content</p>
      </Section>
      
      {/* Section with description */}
      <Section 
        title="Detailed Section" 
        description="This section includes both title and description"
      >
        <p>More complex content here</p>
      </Section>
      
      {/* Section without header */}
      <Section>
        <p>Content-only section without header</p>
      </Section>
    </PageLayout>
  )
}
```

## PageLayout Props API

| Prop          | Type                                            | Default                | Description                            |
| ------------- | ----------------------------------------------- | ---------------------- | -------------------------------------- |
| `type`        | `'home' \| 'component-demo' \| 'documentation'` | `'component-demo'`     | Type of page layout                    |
| `title`       | `string`                                        | `undefined`            | Page title displayed in header         |
| `description` | `string`                                        | `undefined`            | Page description displayed below title |
| `showBack`    | `boolean`                                       | `true`                 | Whether to show back navigation button |
| `backUrl`     | `string`                                        | `'/'`                  | URL for back navigation                |
| `backLabel`   | `string`                                        | `'Back to Components'` | Label for back navigation button       |
| `children`    | `ComponentChildren`                             | Required               | Page content                           |
| `className`   | `string`                                        | `undefined`            | Additional CSS classes                 |
| `data-testid` | `string`                                        | `undefined`            | Test identifier                        |

## Section Props API

| Prop          | Type                | Default     | Description            |
| ------------- | ------------------- | ----------- | ---------------------- |
| `title`       | `string`            | `undefined` | Section title          |
| `description` | `string`            | `undefined` | Section description    |
| `children`    | `ComponentChildren` | Required    | Section content        |
| `className`   | `string`            | `undefined` | Additional CSS classes |
| `data-testid` | `string`            | `undefined` | Test identifier        |

## Page Types

### home
- Designed for application home/landing pages
- Typically used without back navigation
- Supports custom backgrounds and hero sections

### component-demo
- Optimized for component demonstration pages
- Includes standard back navigation to component list
- Structured for showcasing component variations

### documentation
- Tailored for documentation and reference pages
- Supports detailed content organization
- Optimized for reading and reference

## Styling and Theming

### CSS Classes
The PageLayout component uses these main CSS classes:
- `min-h-screen` - Full viewport height
- `bg-gray-50 dark:bg-gray-900` - Background colors
- Container component classes for width management

### Dark Mode
```tsx
// Automatic dark mode support
<PageLayout title="Dark Mode Example">
  {/* Content automatically adapts to theme */}
</PageLayout>
```

### Custom Styling
```tsx
<PageLayout 
  className="bg-gradient-to-r from-purple-400 to-pink-400"
  title="Custom Styled Page"
>
  {/* Custom background */}
</PageLayout>
```

## Navigation Integration

### Router Integration
```tsx
import { route } from 'preact-router'
import { PageLayout } from '@nebula-ui/components'

// Automatic navigation with preact-router
<PageLayout 
  backUrl="/components"
  onBackClick={() => route('/components')}
>
  {/* Content */}
</PageLayout>
```

### Custom Navigation Handlers
```tsx
function CustomNavigation() {
  const handleBack = () => {
    // Custom navigation logic
    window.history.back()
  }

  return (
    <PageLayout 
      title="Custom Navigation"
      showBack={false} // Disable default back button
    >
      <button onClick={handleBack} className="mb-4">
        ← Custom Back Button
      </button>
      {/* Content */}
    </PageLayout>
  )
}
```

## Accessibility Features

### ARIA Support
- Semantic HTML structure with proper headings hierarchy
- Navigation landmarks for screen readers
- Keyboard navigation support

### Screen Reader Support
```tsx
<PageLayout 
  title="Accessible Page"
  description="This page follows accessibility guidelines"
  data-testid="main-page"
>
  <Section title="Content Section" data-testid="content-section">
    {/* Accessible content */}
  </Section>
</PageLayout>
```

### Keyboard Navigation
- Tab navigation through interactive elements
- Enter/Space activation for buttons
- Focus management for navigation

## Testing

### Test Setup
```tsx
import { render, screen } from '@testing-library/preact'
import { PageLayout, Section } from '@nebula-ui/components'

test('renders page layout with title', () => {
  render(
    <PageLayout title="Test Page" data-testid="page-layout">
      <div>Content</div>
    </PageLayout>
  )
  
  expect(screen.getByTestId('page-layout')).toBeInTheDocument()
  expect(screen.getByText('Test Page')).toBeInTheDocument()
})
```

### Navigation Testing
```tsx
import { fireEvent } from '@testing-library/preact'

test('back navigation works', () => {
  const mockRoute = jest.fn()
  
  render(
    <PageLayout 
      title="Test"
      showBack={true}
      backUrl="/test"
    >
      Content
    </PageLayout>
  )
  
  fireEvent.click(screen.getByRole('button', { name: /back/i }))
  // Test navigation behavior
})
```

## Best Practices

### Page Organization
```tsx
// ✅ Good: Well-organized page structure
<PageLayout title="User Profile" description="Manage your account">
  <Section title="Personal Information">
    {/* User form fields */}
  </Section>
  
  <Section title="Preferences">
    {/* Settings */}
  </Section>
  
  <Section title="Security">
    {/* Security settings */}
  </Section>
</PageLayout>

// ❌ Avoid: Unstructured content
<PageLayout>
  <div>Some content</div>
  <div>Other content</div>
  <div>More content</div>
</PageLayout>
```

### Navigation Setup
```tsx
// ✅ Good: Clear navigation
<PageLayout 
  title="Component Demo"
  backUrl="/components"
  backLabel="← All Components"
>
  {/* Demo content */}
</PageLayout>

// ❌ Avoid: Unclear navigation
<PageLayout title="Demo" backUrl="/back">
  {/* Content */}
</PageLayout>
```

### Content Structure
- Use meaningful titles and descriptions
- Organize content with Section components
- Provide clear navigation paths
- Follow consistent naming patterns

## Common Patterns

### Component Showcase
```tsx
<PageLayout 
  type="component-demo"
  title="Button Component"
  description="Interactive buttons with various styles and states"
>
  <Section title="Basic Usage">
    {/* Basic examples */}
  </Section>
  
  <Section title="Variants">
    {/* Style variations */}
  </Section>
  
  <Section title="Sizes">
    {/* Size options */}
  </Section>
</PageLayout>
```

### Documentation Page
```tsx
<PageLayout 
  type="documentation"
  title="API Reference"
  description="Complete component documentation"
>
  <Section title="Props" description="Available properties">
    {/* Props table */}
  </Section>
  
  <Section title="Examples" description="Usage examples">
    {/* Code examples */}
  </Section>
</PageLayout>
```

### Settings Page
```tsx
<PageLayout title="Settings" description="Configure your preferences">
  <Section title="Account">
    {/* Account settings */}
  </Section>
  
  <Section title="Notifications">
    {/* Notification settings */}
  </Section>
</PageLayout>
```
