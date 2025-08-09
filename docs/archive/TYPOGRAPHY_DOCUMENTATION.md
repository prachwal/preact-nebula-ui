# Typography Components Documentation

## Overview
The **Typography** components (`Heading` and `Text`) provide a consistent and accessible approach to text styling in the Nebula UI library. These components offer semantic HTML structure, flexible styling options, and full theme support for creating well-structured, readable content.

## Components Included
- **Heading**: Semantic heading elements (h1-h6) with customizable visual styling
- **Text**: Flexible text component with multiple HTML element options

## Features
- **Semantic HTML**: Proper heading hierarchy and semantic text elements
- **Flexible Sizing**: Independent control of semantic level and visual size
- **Dark Mode Support**: Automatic theme-aware color adaptation
- **Typography Scale**: Consistent sizing scale across all text elements
- **Weight Options**: Multiple font weight variations
- **Color System**: Predefined color palette with semantic meanings
- **Layout Options**: Text alignment and truncation capabilities
- **Accessibility**: Screen reader friendly with proper ARIA support

## Heading Component

### Basic Usage

#### Semantic Headings
```tsx
import { Heading } from '@nebula-ui/components'

function HeadingExample() {
  return (
    <div className="space-y-4">
      <Heading level={1}>Main Page Title</Heading>
      <Heading level={2}>Section Heading</Heading>
      <Heading level={3}>Subsection Heading</Heading>
      <Heading level={4}>Minor Heading</Heading>
      <Heading level={5}>Small Heading</Heading>
      <Heading level={6}>Smallest Heading</Heading>
    </div>
  )
}
```

#### Custom Visual Sizes
```tsx
import { Heading } from '@nebula-ui/components'

function CustomSizeHeadings() {
  return (
    <div className="space-y-4">
      {/* Semantic h3 but visually looks like h1 */}
      <Heading level={3} size="4xl">
        Large Display Text
      </Heading>
      
      {/* Semantic h1 but smaller visual size */}
      <Heading level={1} size="xl">
        Compact Main Title
      </Heading>
      
      {/* Various sizes */}
      <Heading level={2} size="3xl">Extra Large</Heading>
      <Heading level={2} size="2xl">Large</Heading>
      <Heading level={2} size="xl">Medium</Heading>
      <Heading level={2} size="lg">Small</Heading>
    </div>
  )
}
```

### Advanced Heading Examples

#### Colors and Weights
```tsx
import { Heading } from '@nebula-ui/components'

function HeadingVariations() {
  return (
    <div className="space-y-6">
      {/* Different colors */}
      <Heading level={2} color="default">Default Color</Heading>
      <Heading level={2} color="muted">Muted Color</Heading>
      <Heading level={2} color="accent">Accent Color</Heading>
      <Heading level={2} color="success">Success Color</Heading>
      <Heading level={2} color="warning">Warning Color</Heading>
      <Heading level={2} color="error">Error Color</Heading>
      
      {/* Different weights */}
      <Heading level={3} weight="normal">Normal Weight</Heading>
      <Heading level={3} weight="medium">Medium Weight</Heading>
      <Heading level={3} weight="semibold">Semibold Weight</Heading>
      <Heading level={3} weight="bold">Bold Weight (default)</Heading>
    </div>
  )
}
```

#### Layout Options
```tsx
import { Heading } from '@nebula-ui/components'

function HeadingLayout() {
  return (
    <div className="space-y-4">
      {/* Centered heading */}
      <Heading level={2} centered>
        Centered Heading
      </Heading>
      
      {/* Truncated heading */}
      <div className="w-64">
        <Heading level={3} truncate>
          This is a very long heading that will be truncated
        </Heading>
      </div>
      
      {/* Custom styling */}
      <Heading 
        level={2} 
        className="bg-gray-100 p-4 rounded border-l-4 border-blue-500"
      >
        Custom Styled Heading
      </Heading>
    </div>
  )
}
```

## Text Component

### Basic Usage

#### Text Variations
```tsx
import { Text } from '@nebula-ui/components'

function TextExample() {
  return (
    <div className="space-y-4">
      <Text>Default paragraph text</Text>
      <Text size="lg">Large paragraph text</Text>
      <Text size="sm">Small paragraph text</Text>
      <Text color="muted">Muted text color</Text>
      <Text weight="bold">Bold text</Text>
    </div>
  )
}
```

#### Different HTML Elements
```tsx
import { Text } from '@nebula-ui/components'

function TextElements() {
  return (
    <div className="space-y-4">
      {/* Default paragraph */}
      <Text>This renders as a paragraph element</Text>
      
      {/* Span element */}
      <Text as="span" color="accent">This renders as a span</Text>
      
      {/* Div element */}
      <Text as="div" size="lg" weight="medium">
        This renders as a div element
      </Text>
      
      {/* Inline usage */}
      <p>
        This is regular text with{' '}
        <Text as="span" color="accent" weight="semibold">
          highlighted inline text
        </Text>
        {' '}in the middle.
      </p>
    </div>
  )
}
```

### Advanced Text Examples

#### Color System
```tsx
import { Text } from '@nebula-ui/components'

function TextColors() {
  return (
    <div className="space-y-2">
      <Text color="default">Default text color</Text>
      <Text color="muted">Muted text for secondary information</Text>
      <Text color="accent">Accent color for links and highlights</Text>
      <Text color="success">Success text for positive messages</Text>
      <Text color="warning">Warning text for caution messages</Text>
      <Text color="error">Error text for error messages</Text>
    </div>
  )
}
```

#### Sizes and Weights
```tsx
import { Text } from '@nebula-ui/components'

function TextSizesWeights() {
  return (
    <div className="space-y-4">
      {/* Different sizes */}
      <div className="space-y-2">
        <Text size="2xl">Extra Large Text</Text>
        <Text size="xl">Large Text</Text>
        <Text size="lg">Large Text</Text>
        <Text size="base">Base Text (default)</Text>
        <Text size="sm">Small Text</Text>
        <Text size="xs">Extra Small Text</Text>
      </div>
      
      {/* Different weights */}
      <div className="space-y-2">
        <Text weight="normal">Normal weight text</Text>
        <Text weight="medium">Medium weight text</Text>
        <Text weight="semibold">Semibold weight text</Text>
        <Text weight="bold">Bold weight text</Text>
      </div>
    </div>
  )
}
```

#### Layout and Formatting
```tsx
import { Text } from '@nebula-ui/components'

function TextFormatting() {
  return (
    <div className="space-y-4">
      {/* Centered text */}
      <Text centered size="lg">
        This text is centered
      </Text>
      
      {/* Truncated text */}
      <div className="w-64 border p-2">
        <Text truncate>
          This is a very long piece of text that will be truncated with ellipsis
        </Text>
      </div>
      
      {/* Custom styling */}
      <Text 
        as="div" 
        className="bg-yellow-100 p-3 rounded italic"
        color="warning"
      >
        Custom styled text with background
      </Text>
    </div>
  )
}
```

## Combined Usage Examples

### Article Layout
```tsx
import { Heading, Text } from '@nebula-ui/components'

function ArticleLayout() {
  return (
    <article className="max-w-2xl mx-auto space-y-6">
      <header className="space-y-4">
        <Heading level={1} size="4xl">
          Typography in Modern Web Design
        </Heading>
        <Text color="muted" size="lg">
          Understanding the principles of good typography for better user experience
        </Text>
        <Text size="sm" color="muted">
          Published on March 15, 2024 by John Doe
        </Text>
      </header>
      
      <main className="space-y-6">
        <Text size="lg">
          Typography is the foundation of good web design. It affects readability, 
          accessibility, and the overall user experience of your application.
        </Text>
        
        <section className="space-y-4">
          <Heading level={2} size="2xl">
            The Importance of Hierarchy
          </Heading>
          <Text>
            Visual hierarchy guides users through your content in a logical way. 
            Using consistent heading levels and text sizes creates a clear structure.
          </Text>
        </section>
        
        <section className="space-y-4">
          <Heading level={3} size="xl">
            Color and Contrast
          </Heading>
          <Text>
            Color choices in typography affect both aesthetics and accessibility. 
            Proper contrast ratios ensure your content is readable by all users.
          </Text>
          
          <Text color="accent" weight="medium">
            Pro tip: Always test your color combinations for accessibility compliance.
          </Text>
        </section>
      </main>
    </article>
  )
}
```

### Form Typography
```tsx
import { Heading, Text } from '@nebula-ui/components'

function FormTypography() {
  return (
    <form className="max-w-md space-y-6">
      <div className="space-y-2">
        <Heading level={2} size="2xl">
          Contact Information
        </Heading>
        <Text color="muted">
          Please fill out all required fields marked with *
        </Text>
      </div>
      
      <div className="space-y-4">
        <div>
          <Heading level={3} size="sm" weight="medium" as="label">
            Full Name *
          </Heading>
          <input 
            type="text" 
            className="w-full mt-1 p-2 border rounded"
            required 
          />
          <Text size="xs" color="error">
            This field is required
          </Text>
        </div>
        
        <div>
          <Heading level={3} size="sm" weight="medium" as="label">
            Email Address *
          </Heading>
          <input 
            type="email" 
            className="w-full mt-1 p-2 border rounded"
            required 
          />
          <Text size="xs" color="muted">
            We'll never share your email address
          </Text>
        </div>
      </div>
    </form>
  )
}
```

### Dashboard Cards
```tsx
import { Heading, Text } from '@nebula-ui/components'

function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-2">
          <Text size="sm" color="muted" weight="medium">
            TOTAL USERS
          </Text>
          <Heading level={3} size="3xl" color="accent">
            24,892
          </Heading>
          <Text size="sm" color="success">
            +12% from last month
          </Text>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-2">
          <Text size="sm" color="muted" weight="medium">
            REVENUE
          </Text>
          <Heading level={3} size="3xl" color="success">
            $45,678
          </Heading>
          <Text size="sm" color="warning">
            -3% from last month
          </Text>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-2">
          <Text size="sm" color="muted" weight="medium">
            ORDERS
          </Text>
          <Heading level={3} size="3xl" color="default">
            1,429
          </Heading>
          <Text size="sm" color="success">
            +8% from last month
          </Text>
        </div>
      </div>
    </div>
  )
}
```

## Props APIs

### Heading Props

| Prop          | Type                                                                    | Default             | Description                               |
| ------------- | ----------------------------------------------------------------------- | ------------------- | ----------------------------------------- |
| `level`       | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                                            | `1`                 | Semantic heading level (h1-h6)            |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'`       | Auto based on level | Visual size independent of semantic level |
| `weight`      | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                          | `'bold'`            | Font weight                               |
| `color`       | `'default' \| 'muted' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'`         | Text color                                |
| `centered`    | `boolean`                                                               | `false`             | Center align text                         |
| `truncate`    | `boolean`                                                               | `false`             | Truncate long text with ellipsis          |
| `children`    | `ComponentChildren`                                                     | Required            | Heading content                           |
| `className`   | `string`                                                                | `undefined`         | Additional CSS classes                    |
| `data-testid` | `string`                                                                | `undefined`         | Test identifier                           |

### Text Props

| Prop          | Type                                                                    | Default     | Description                      |
| ------------- | ----------------------------------------------------------------------- | ----------- | -------------------------------- |
| `size`        | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl'`                       | `'base'`    | Text size                        |
| `weight`      | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                          | `'normal'`  | Font weight                      |
| `color`       | `'default' \| 'muted' \| 'accent' \| 'success' \| 'warning' \| 'error'` | `'default'` | Text color                       |
| `centered`    | `boolean`                                                               | `false`     | Center align text                |
| `truncate`    | `boolean`                                                               | `false`     | Truncate long text with ellipsis |
| `as`          | `'p' \| 'span' \| 'div'`                                                | `'p'`       | HTML element to render           |
| `children`    | `ComponentChildren`                                                     | Required    | Text content                     |
| `className`   | `string`                                                                | `undefined` | Additional CSS classes           |
| `data-testid` | `string`                                                                | `undefined` | Test identifier                  |

## Default Size Mapping

The Heading component uses these default size mappings when no explicit size is provided:

| Level | Default Size | Equivalent |
| ----- | ------------ | ---------- |
| h1    | 4xl          | text-4xl   |
| h2    | 3xl          | text-3xl   |
| h3    | 2xl          | text-2xl   |
| h4    | xl           | text-xl    |
| h5    | lg           | text-lg    |
| h6    | md           | text-base  |

## Color System

Both components share the same color system:

| Color     | Light Theme | Dark Theme | Use Case                                |
| --------- | ----------- | ---------- | --------------------------------------- |
| `default` | gray-900    | white      | Primary text content                    |
| `muted`   | gray-600    | gray-400   | Secondary text, captions                |
| `accent`  | blue-600    | blue-400   | Links, highlights, interactive elements |
| `success` | green-600   | green-400  | Success messages, positive indicators   |
| `warning` | yellow-600  | yellow-400 | Warning messages, caution               |
| `error`   | red-600     | red-400    | Error messages, danger indicators       |

## Accessibility Features

### Semantic HTML Structure
- Proper heading hierarchy (h1-h6) for screen readers
- Semantic text elements (p, span, div)
- Maintains content structure independence from visual styling

### Screen Reader Support
```tsx
// Screen readers will correctly identify this as h2 regardless of visual size
<Heading level={2} size="sm">
  Section Title (appears small but semantically correct)
</Heading>
```

### Color Contrast
- All color combinations meet WCAG AA contrast requirements
- Dark mode support maintains accessibility standards
- Semantic color meanings (error, success, warning)

### Focus and Navigation
- Proper heading structure enables screen reader navigation
- Text elements maintain natural reading flow
- No focus traps or navigation issues

## Testing

### Basic Component Testing
```tsx
import { render, screen } from '@testing-library/preact'
import { Heading, Text } from '@nebula-ui/components'

describe('Typography Components', () => {
  test('renders heading with correct level', () => {
    render(<Heading level={2} data-testid="heading">Test Heading</Heading>)
    
    const heading = screen.getByTestId('heading')
    expect(heading.tagName).toBe('H2')
    expect(heading).toHaveTextContent('Test Heading')
  })
  
  test('renders text with custom element', () => {
    render(<Text as="span" data-testid="text">Test Text</Text>)
    
    const text = screen.getByTestId('text')
    expect(text.tagName).toBe('SPAN')
    expect(text).toHaveTextContent('Test Text')
  })
})
```

### Style Testing
```tsx
test('applies correct classes', () => {
  render(
    <Heading 
      level={1} 
      size="2xl" 
      color="accent" 
      weight="semibold"
      data-testid="heading"
    >
      Styled Heading
    </Heading>
  )
  
  const heading = screen.getByTestId('heading')
  expect(heading).toHaveClass('text-2xl', 'font-semibold', 'text-blue-600')
})
```

### Accessibility Testing
```tsx
import { axe, toHaveNoViolations } from 'jest-axe'

test('has no accessibility violations', async () => {
  const { container } = render(
    <div>
      <Heading level={1}>Main Title</Heading>
      <Heading level={2}>Section</Heading>
      <Text>Content paragraph</Text>
    </div>
  )
  
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## Best Practices

### Semantic Structure
```tsx
// ✅ Good: Proper heading hierarchy
<article>
  <Heading level={1}>Article Title</Heading>
  <Heading level={2}>Section Title</Heading>
  <Heading level={3}>Subsection Title</Heading>
  <Text>Content paragraph</Text>
</article>

// ❌ Avoid: Skipping heading levels
<article>
  <Heading level={1}>Article Title</Heading>
  <Heading level={4}>Section Title</Heading> {/* Skipped h2, h3 */}
</article>
```

### Visual Hierarchy
```tsx
// ✅ Good: Semantic level with appropriate visual size
<Heading level={3} size="xl">Important Subsection</Heading>
<Heading level={4} size="lg">Minor Subsection</Heading>

// ❌ Avoid: Wrong semantic level for visual needs
<Heading level={1} size="sm">Should be h3 or h4</Heading>
```

### Content Organization
```tsx
// ✅ Good: Clear content structure
<section>
  <Heading level={2}>Features</Heading>
  <Text color="muted" size="lg">
    Discover what makes our product special
  </Text>
  
  <div className="space-y-4">
    <div>
      <Heading level={3} size="lg">Fast Performance</Heading>
      <Text>Optimized for speed and efficiency</Text>
    </div>
  </div>
</section>
```

### Responsive Typography
```tsx
// ✅ Good: Responsive heading sizes
<Heading 
  level={1} 
  size="2xl"
  className="md:text-4xl lg:text-5xl"
>
  Responsive Title
</Heading>
```

### Color Usage
```tsx
// ✅ Good: Semantic color usage
<Text color="success">Operation completed successfully</Text>
<Text color="error">Please fix the errors below</Text>
<Text color="muted">Last updated 2 hours ago</Text>

// ❌ Avoid: Non-semantic color usage
<Text color="error">Click here to continue</Text> {/* Error color for normal action */}
```

## Common Patterns

### Page Headers
```tsx
function PageHeader({ title, description, meta }) {
  return (
    <header className="space-y-4 mb-8">
      <Heading level={1} size="4xl">{title}</Heading>
      {description && (
        <Text size="lg" color="muted" className="max-w-2xl">
          {description}
        </Text>
      )}
      {meta && (
        <Text size="sm" color="muted">{meta}</Text>
      )}
    </header>
  )
}
```

### Card Content
```tsx
function ContentCard({ title, subtitle, content }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="space-y-2 mb-4">
        <Heading level={3} size="lg">{title}</Heading>
        {subtitle && (
          <Text color="muted" size="sm">{subtitle}</Text>
        )}
      </div>
      <Text>{content}</Text>
    </div>
  )
}
```

### Status Messages
```tsx
function StatusMessage({ type, title, message }) {
  const colors = {
    success: 'success',
    error: 'error', 
    warning: 'warning',
    info: 'accent'
  }
  
  return (
    <div className="p-4 rounded border">
      <Heading level={4} size="sm" color={colors[type]} weight="semibold">
        {title}
      </Heading>
      <Text color={colors[type]} size="sm" className="mt-1">
        {message}
      </Text>
    </div>
  )
}
```
