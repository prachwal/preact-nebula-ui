# Input - Documentation

## Overview

The `Input` component is a fundamental form element for text input. It supports various types, validation states, sizing options, and accessibility features. The component is designed to work seamlessly with form libraries and provides excellent user experience.

## Features

- **Input Types** - Text, password, email, number, search, and more
- **Sizes** - Three size variants (sm, md, lg)
- **States** - Error, success, disabled, and loading states
- **Icons** - Prefix and suffix icon support
- **Validation** - Built-in validation with error messaging
- **Accessibility** - Full screen reader and keyboard support
- **Dark Mode** - Automatic theme adaptation

## Basic Usage

```tsx
import { Input } from '@preact-nebula/ui'

function BasicInputExample() {
  const [value, setValue] = useState('')

  return (
    <div className="space-y-4">
      <Input
        placeholder="Enter your name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Enter your email"
      />
      <Input
        type="password"
        placeholder="Enter your password"
      />
    </div>
  )
}
```

## Sizes

```tsx
function InputSizes() {
  return (
    <div className="space-y-4">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input" />
      <Input size="lg" placeholder="Large input" />
    </div>
  )
}
```

## States

### Validation States
```tsx
function ValidationStates() {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Valid input"
        status="success"
        helperText="This looks good!"
      />
      <Input
        placeholder="Invalid input"
        status="error"
        helperText="Please check your input"
      />
      <Input
        placeholder="Normal input"
        helperText="Helper text for guidance"
      />
    </div>
  )
}
```

### Disabled and Loading
```tsx
function DisabledInput() {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Disabled input"
        disabled
        value="Cannot edit this"
      />
      <Input
        placeholder="Loading..."
        loading
      />
    </div>
  )
}
```

## With Icons

```tsx
import { MagnifyingGlassIcon, UserIcon, LockClosedIcon } from '@heroicons/react/24/outline'

function IconInputs() {
  return (
    <div className="space-y-4">
      <Input
        placeholder="Search..."
        prefixIcon={<MagnifyingGlassIcon />}
      />
      <Input
        placeholder="Username"
        prefixIcon={<UserIcon />}
      />
      <Input
        type="password"
        placeholder="Password"
        prefixIcon={<LockClosedIcon />}
        suffixIcon={<EyeIcon />}
      />
    </div>
  )
}
```

## Input Types

```tsx
function InputTypes() {
  return (
    <div className="space-y-4">
      <Input type="text" placeholder="Text input" />
      <Input type="email" placeholder="Email input" />
      <Input type="password" placeholder="Password input" />
      <Input type="number" placeholder="Number input" />
      <Input type="search" placeholder="Search input" />
      <Input type="tel" placeholder="Phone input" />
      <Input type="url" placeholder="URL input" />
    </div>
  )
}
```

## Form Integration

```tsx
function FormExample() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validation logic
    const newErrors = {}
    if (!formData.name) newErrors.name = 'Name is required'
    if (!formData.email) newErrors.email = 'Email is required'
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        value={formData.name}
        onChange={(e) => setFormData({...formData, name: e.target.value})}
        status={errors.name ? 'error' : ''}
        helperText={errors.name}
        required
      />
      
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
        status={errors.email ? 'error' : ''}
        helperText={errors.email}
        required
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={(e) => setFormData({...formData, password: e.target.value})}
        status={errors.password ? 'error' : ''}
        helperText={errors.password}
        required
      />
      
      <Button type="submit" variant="primary" fullWidth>
        Create Account
      </Button>
    </form>
  )
}
```

## Advanced Examples

### Search Input with Debounce
```tsx
function SearchInput() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return
    
    const debounce = setTimeout(async () => {
      setLoading(true)
      // Simulate search API call
      const searchResults = await mockSearch(query)
      setResults(searchResults)
      setLoading(false)
    }, 300)

    return () => clearTimeout(debounce)
  }, [query])

  return (
    <div className="relative">
      <Input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        prefixIcon={<MagnifyingGlassIcon />}
        loading={loading}
        className="w-full"
      />
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <div key={index} className="p-3 hover:bg-gray-50 cursor-pointer">
              {result.title}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

### Input with Character Counter
```tsx
function CharacterCounter() {
  const [value, setValue] = useState('')
  const maxLength = 100

  return (
    <div>
      <Input
        placeholder="Enter your message"
        value={value}
        onChange={(e) => setValue(e.target.value.slice(0, maxLength))}
        helperText={`${value.length}/${maxLength} characters`}
        status={value.length > maxLength * 0.9 ? 'warning' : ''}
      />
    </div>
  )
}
```

## Props

| Prop           | Type                                | Default  | Description                  |
| -------------- | ----------------------------------- | -------- | ---------------------------- |
| `type`         | `string`                            | `'text'` | HTML input type              |
| `size`         | `'sm' \| 'md' \| 'lg'`              | `'md'`   | Input size                   |
| `status`       | `'error' \| 'success' \| 'warning'` | -        | Validation status            |
| `disabled`     | `boolean`                           | `false`  | Disables the input           |
| `loading`      | `boolean`                           | `false`  | Shows loading indicator      |
| `placeholder`  | `string`                            | -        | Placeholder text             |
| `value`        | `string`                            | -        | Input value (controlled)     |
| `defaultValue` | `string`                            | -        | Initial value (uncontrolled) |
| `label`        | `string`                            | -        | Input label                  |
| `helperText`   | `string`                            | -        | Helper or error text         |
| `required`     | `boolean`                           | `false`  | Marks field as required      |
| `prefixIcon`   | `ComponentChild`                    | -        | Icon before input            |
| `suffixIcon`   | `ComponentChild`                    | -        | Icon after input             |
| `className`    | `string`                            | -        | Additional CSS classes       |
| `onChange`     | `(event: Event) => void`            | -        | Change handler               |
| `onFocus`      | `(event: Event) => void`            | -        | Focus handler                |
| `onBlur`       | `(event: Event) => void`            | -        | Blur handler                 |

## Accessibility

- Full keyboard navigation support
- Screen reader compatible with proper labels
- ARIA attributes for validation states
- Focus management and visual indicators
- Support for `aria-describedby` for helper text

## Best Practices

1. **Always provide labels** - Use the `label` prop or external labels
2. **Use appropriate types** - Choose the correct HTML input type
3. **Provide helpful text** - Use `helperText` for guidance and errors
4. **Validate appropriately** - Show validation feedback clearly
5. **Consider accessibility** - Ensure proper contrast and focus states
6. **Use placeholders wisely** - Placeholders should not replace labels

## Dark Mode

The Input component automatically adapts to dark mode with appropriate background colors, borders, and text colors for optimal readability and user experience.
