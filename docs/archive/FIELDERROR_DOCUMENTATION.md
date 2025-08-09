# FieldError - Documentation

## Overview

The `FieldError` component is used to display validation error messages in forms. It is designed with accessibility in mind and provides proper ARIA attributes for assistive technologies.

## Features

- **Automatic hiding** - Does not render when there are no errors
- **Accessibility** - Full ARIA support with role="alert"
- **Responsiveness** - Adapts to different screen sizes
- **Customization** - Can be styled via className
- **TypeScript** - Full type support
- **Test-friendly** - Support for data-testid

## Basic Usage

```tsx
import { FieldError } from '@preact-nebula/ui'

function BasicFormExample() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    }
    
    setErrors(newErrors)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          aria-describedby={errors.email ? 'email-error' : undefined}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <FieldError id="email-error">
          {errors.email}
        </FieldError>
      </div>
      
      <button type="submit">Send</button>
    </form>
  )
}
```

## Advanced Examples

### Integration with Forms

```tsx
import { FieldError, Input, Button } from '@preact-nebula/ui'
import { useState } from 'preact/hooks'

interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({})
  
  const validateField = (name: keyof FormData, value: string): string | undefined => {
    switch (name) {
      case 'firstName':
        return value.length < 2 ? 'First name must be at least 2 characters' : undefined
      case 'lastName':
        return value.length < 2 ? 'Last name must be at least 2 characters' : undefined
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) return 'Email is required'
        return !emailRegex.test(value) ? 'Invalid email format' : undefined
      case 'password':
        if (!value) return 'Password is required'
        if (value.length < 8) return 'Password must be at least 8 characters'
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain a lowercase letter, an uppercase letter, and a digit'
        }
        return undefined
      case 'confirmPassword':
        if (!value) return 'Password confirmation is required'
        return value !== formData.password ? 'Passwords do not match' : undefined
      default:
        return undefined
    }
  }
  
  const handleInputChange = (name: keyof FormData) => (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }
  
  const handleBlur = (name: keyof FormData) => () => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, formData[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    
    const newTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {} as Record<keyof FormData, boolean>)
    
    const newErrors = Object.keys(formData).reduce((acc, key) => {
      const error = validateField(key as keyof FormData, formData[key as keyof FormData])
      return error ? { ...acc, [key]: error } : acc
    }, {} as FormErrors)
    
    setTouched(newTouched)
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-6">Registration</h2>
      
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
          First Name *
        </label>
        <Input
          id="firstName"
          value={formData.firstName}
          onChange={handleInputChange('firstName')}
          onBlur={handleBlur('firstName')}
          error={!!errors.firstName}
          aria-describedby={errors.firstName ? 'firstName-error' : undefined}
        />
        <FieldError id="firstName-error" data-testid="firstName-error">
          {errors.firstName}
        </FieldError>
      </div>
      
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium mb-1">
          Last Name *
        </label>
        <Input
          id="lastName"
          value={formData.lastName}
          onChange={handleInputChange('lastName')}
          onBlur={handleBlur('lastName')}
          error={!!errors.lastName}
          aria-describedby={errors.lastName ? 'lastName-error' : undefined}
        />
        <FieldError id="lastName-error" data-testid="lastName-error">
          {errors.lastName}
        </FieldError>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email *
        </label>
        <Input
          id="email"
          value={formData.email}
          onChange={handleInputChange('email')}
          onBlur={handleBlur('email')}
          error={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        <FieldError id="email-error" data-testid="email-error">
          {errors.email}
        </FieldError>
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password *
        </label>
        <Input.Password
          id="password"
          value={formData.password}
          onChange={handleInputChange('password')}
          onBlur={handleBlur('password')}
          error={!!errors.password}
          aria-describedby={errors.password ? 'password-error' : undefined}
        />
        <FieldError id="password-error" data-testid="password-error">
          {errors.password}
        </FieldError>
      </div>
      
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
          Confirm Password *
        </label>
        <Input.Password
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
        />
        <FieldError id="confirmPassword-error" data-testid="confirmPassword-error">
          {errors.confirmPassword}
        </FieldError>
      </div>
      
      <Button type="submit" size="lg" className="w-full mt-4">
        Register
      </Button>
    </form>
  )
}
```

## Accessibility

The `FieldError` component uses `role="alert"` and is announced by screen readers when errors appear. Always associate the error with the input using `aria-describedby`.

## Props

| Prop          | Type   | Description                            |
| ------------- | ------ | -------------------------------------- |
| `id`          | string | Unique identifier for ARIA and testing |
| `children`    | string | Error message to display               |
| `className`   | string | Custom class for styling               |
| `data-testid` | string | Test identifier for testing frameworks |

## Best Practices

- Always use `FieldError` below the input field
- Use `aria-describedby` to link the error to the input
- Hide the error when there is no message
- Use clear, concise error messages

## Accessibility Testing

- Test with screen readers (NVDA, VoiceOver)
- Validate keyboard navigation
- Ensure error is announced when it appears

## Example: Accessibility Test

```tsx
// ...test code for accessibility...
```

## Related Components

- `Input`
- `Input.Password`
- `Form`

## Changelog

- v1.0.0 - Initial release
- v1.1.0 - Added accessibility improvements
- v1.2.0 - Improved error hiding logic

## License

MIT
