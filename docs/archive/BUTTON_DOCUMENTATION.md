# Button - Documentation

## Overview

The `Button` component is a fundamental interactive element that triggers actions when clicked. It supports multiple variants, sizes, states, and accessibility features, making it suitable for various use cases from simple clicks to complex form submissions.

## Features

- **Variants** - Multiple visual styles (primary, secondary, success, warning, error, outline, ghost, link)
- **Sizes** - Three size options (sm, md, lg)
- **States** - Loading, disabled, and active states
- **Icons** - Support for icons with proper spacing
- **Accessibility** - Full keyboard navigation and screen reader support
- **Custom styling** - Extensive customization options
- **Form integration** - Works seamlessly with forms

## Basic Usage

```tsx
import { Button } from '@preact-nebula/ui'

function BasicButtonExample() {
  return (
    <div className="space-x-4">
      <Button>Default Button</Button>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  )
}
```

## Variants

### Primary Actions
```tsx
function PrimaryButtons() {
  return (
    <div className="space-x-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="error">Error</Button>
    </div>
  )
}
```

### Outline and Ghost
```tsx
function OutlineButtons() {
  return (
    <div className="space-x-4">
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  )
}
```

## Sizes

```tsx
function ButtonSizes() {
  return (
    <div className="space-x-4 flex items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  )
}
```

## States

### Loading State
```tsx
function LoadingButtons() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-x-4">
      <Button loading={loading} onClick={handleClick}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
      <Button variant="primary" loading disabled>
        Processing
      </Button>
    </div>
  )
}
```

### Disabled State
```tsx
function DisabledButtons() {
  return (
    <div className="space-x-4">
      <Button disabled>Disabled</Button>
      <Button variant="primary" disabled>Primary Disabled</Button>
      <Button variant="outline" disabled>Outline Disabled</Button>
    </div>
  )
}
```

## With Icons

```tsx
import { PlusIcon, TrashIcon, EditIcon } from '@heroicons/react/24/outline'

function IconButtons() {
  return (
    <div className="space-x-4">
      <Button icon={<PlusIcon />}>Add Item</Button>
      <Button variant="error" icon={<TrashIcon />}>Delete</Button>
      <Button variant="outline" icon={<EditIcon />} iconPosition="right">
        Edit
      </Button>
    </div>
  )
}
```

## Form Integration

```tsx
function FormButtons() {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <input type="text" placeholder="Enter text..." className="w-full p-2 border rounded" />
        
        <div className="flex gap-4">
          <Button type="submit" variant="primary">
            Submit
          </Button>
          <Button type="reset" variant="outline">
            Reset
          </Button>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}
```

## Advanced Examples

### Button Groups
```tsx
function ButtonGroup() {
  const [selected, setSelected] = useState('left')

  return (
    <div className="inline-flex rounded-lg border border-gray-200 dark:border-gray-700">
      {['left', 'center', 'right'].map((position) => (
        <Button
          key={position}
          variant={selected === position ? 'primary' : 'ghost'}
          className="rounded-none border-0 first:rounded-l-lg last:rounded-r-lg"
          onClick={() => setSelected(position)}
        >
          {position.charAt(0).toUpperCase() + position.slice(1)}
        </Button>
      ))}
    </div>
  )
}
```

### Async Actions
```tsx
function AsyncButton() {
  const [status, setStatus] = useState('idle')

  const handleAsync = async () => {
    setStatus('loading')
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setStatus('success')
      setTimeout(() => setStatus('idle'), 1000)
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <Button
      onClick={handleAsync}
      loading={status === 'loading'}
      variant={status === 'success' ? 'success' : status === 'error' ? 'error' : 'primary'}
    >
      {status === 'loading' && 'Processing...'}
      {status === 'success' && 'Success!'}
      {status === 'error' && 'Try Again'}
      {status === 'idle' && 'Start Process'}
    </Button>
  )
}
```

## Props

| Prop           | Type                                                                                                           | Default     | Description                   |
| -------------- | -------------------------------------------------------------------------------------------------------------- | ----------- | ----------------------------- |
| `variant`      | `'default' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'outline' \| 'ghost' \| 'link'` | `'default'` | Visual style variant          |
| `size`         | `'sm' \| 'md' \| 'lg'`                                                                                         | `'md'`      | Button size                   |
| `loading`      | `boolean`                                                                                                      | `false`     | Shows loading spinner         |
| `disabled`     | `boolean`                                                                                                      | `false`     | Disables the button           |
| `icon`         | `ComponentChild`                                                                                               | -           | Icon to display               |
| `iconPosition` | `'left' \| 'right'`                                                                                            | `'left'`    | Icon position                 |
| `type`         | `'button' \| 'submit' \| 'reset'`                                                                              | `'button'`  | Button type for forms         |
| `fullWidth`    | `boolean`                                                                                                      | `false`     | Takes full width of container |
| `className`    | `string`                                                                                                       | -           | Additional CSS classes        |
| `onClick`      | `(event: MouseEvent) => void`                                                                                  | -           | Click handler                 |
| `children`     | `ComponentChildren`                                                                                            | -           | Button content                |

## Accessibility

- Fully keyboard accessible with Tab navigation
- Screen reader compatible with proper ARIA attributes
- Focus management and visual indicators
- Support for `aria-label` and `aria-describedby`
- Loading state announced to screen readers

## Best Practices

1. **Use semantic variants** - Choose variants that match the action's importance
2. **Provide feedback** - Use loading states for async actions
3. **Clear labels** - Button text should clearly describe the action
4. **Consistent sizing** - Use consistent button sizes within the same context
5. **Icon usage** - Use icons to enhance, not replace, clear text labels
6. **Form integration** - Set appropriate `type` attribute for form buttons

## Dark Mode

The Button component automatically adapts to dark mode with appropriate color schemes and contrast ratios for optimal visibility and accessibility.
