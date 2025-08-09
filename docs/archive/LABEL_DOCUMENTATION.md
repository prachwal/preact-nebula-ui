# Label - Documentation

## Overview

The `Label` component is used to create accessible labels for form controls. It provides proper styling, support for required and disabled states, and full integration with form ecosystems.

## Features

- **Sizes** - Three size variants (sm, md, lg)
- **Required State** - Automatically adds an asterisk (*)
- **Disabled State** - Visual indication for inactive fields
- **Accessibility** - Full support for assistive technologies
- **Dark mode** - Automatic adaptation to dark theme
- **TypeScript** - Full type support
- **Customization** - Can be styled via className

## Basic Usage

```tsx
import { Label, Input } from '@preact-nebula/ui'

function BasicLabelExample() {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="firstName">Imię</Label>
        <Input id="firstName" />
      </div>
      
      <div>
        <Label htmlFor="email" required>Email</Label>
        <Input id="email" type="email" />
      </div>
      
      <div>
        <Label htmlFor="phone" disabled>Telefon (opcjonalny)</Label>
        <Input id="phone" disabled />
      </div>
    </div>
  )
}
```

## Advanced Examples

### Different label sizes

```tsx
import { Label, Input } from '@preact-nebula/ui'

function LabelSizesExample() {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="small" size="sm" required>
          Mała etykieta
        </Label>
        <Input id="small" size="sm" placeholder="Małe pole" />
      </div>
      
      <div>
        <Label htmlFor="medium" size="md">
          Średnia etykieta (domyślna)
        </Label>
        <Input id="medium" size="md" placeholder="Średnie pole" />
      </div>
      
      <div>
        <Label htmlFor="large" size="lg">
          Duża etykieta
        </Label>
        <Input id="large" size="lg" placeholder="Duże pole" />
      </div>
    </div>
  )
}
```

### Complex form with labels

```tsx
import { Label, Input, Textarea, Select, Checkbox, Radio } from '@preact-nebula/ui'
import { useState } from 'preact/hooks'

interface FormData {
  firstName: string
  lastName: string
  email: string
  bio: string
  country: string
  newsletter: boolean
  contactMethod: 'email' | 'phone'
}

function ComplexFormExample() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    country: '',
    newsletter: false,
    contactMethod: 'email'
  })
  
  const updateField = (field: keyof FormData) => (value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  
  return (
    <form className="max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold mb-6">Registration Form</h2>
      
      {/* Pola wymagane */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" required size="sm">
            Imię
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateField('firstName')(e.target.value)}
            size="sm"
            aria-required="true"
          />
          <p className="mt-1 text-xs text-gray-500">
            This field is required
          </p>
        </div>
        
        <div>
          <Label htmlFor="lastName" required size="sm">
            Nazwisko
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateField('lastName')(e.target.value)}
            size="sm"
            aria-required="true"
          />
        </div>
      </div>
      
      {/* Email z dodatkową pomocą */}
      <div>
        <Label htmlFor="email" required>
          Email address
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email')(e.target.value)}
          placeholder="jan.kowalski@example.com"
          aria-required="true"
          aria-describedby="email-help"
        />
        <p id="email-help" className="mt-1 text-sm text-gray-600">
          We will use this address to contact you
        </p>
      </div>
      
      {/* Pole opcjonalne */}
      <div>
        <Label htmlFor="bio" size="lg">
          Biography
          <span className="ml-2 text-sm font-normal text-gray-500">
            (optional)
          </span>
        </Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => updateField('bio')(e.target.value)}
          rows={4}
          placeholder="Opowiedz o sobie..."
          maxLength={500}
          aria-describedby="bio-help"
        />
        <p id="bio-help" className="mt-1 text-sm text-gray-500">
          Maximum 500 characters
        </p>
      </div>
      
      {/* Select z etykietą */}
      <div>
        <Label htmlFor="country" required>
          Country
        </Label>
        <Select
          id="country"
          value={formData.country}
          onChange={updateField('country')}
          aria-required="true"
        >
          <option value="">Select country</option>
          <option value="PL">Poland</option>
          <option value="DE">Germany</option>
          <option value="UK">United Kingdom</option>
          <option value="US">United States</option>
        </Select>
      </div>
      
      {/* Checkbox z custom etykietą */}
      <div className="space-y-2">
        <Label>Communication preferences</Label>
        <div className="space-y-2">
          <Checkbox
            id="newsletter"
            checked={formData.newsletter}
            onChange={(checked) => updateField('newsletter')(checked)}
          >
            <Label htmlFor="newsletter" size="sm" className="ml-2 cursor-pointer">
              I want to receive the newsletter
            </Label>
          </Checkbox>
        </div>
      </div>
      
      {/* Radio buttons z grupową etykietą */}
      <fieldset className="space-y-3">
        <legend>
          <Label required size="md">
            Preferred contact method
          </Label>
        </legend>
        <div className="space-y-2">
          <Radio
            id="contact-email"
            name="contactMethod"
            value="email"
            checked={formData.contactMethod === 'email'}
            onChange={() => updateField('contactMethod')('email')}
          >
            <Label htmlFor="contact-email" size="sm" className="ml-2 cursor-pointer">
              Email
            </Label>
          </Radio>
          
          <Radio
            id="contact-phone"
            name="contactMethod"
            value="phone"
            checked={formData.contactMethod === 'phone'}
            onChange={() => updateField('contactMethod')('phone')}
          >
            <Label htmlFor="contact-phone" size="sm" className="ml-2 cursor-pointer">
              Phone
            </Label>
          </Radio>
        </div>
      </fieldset>
      
      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </div>
    </form>
  )
}
```

### Custom styled labels

```tsx
import { Label, Input } from '@preact-nebula/ui'
import { cn } from '@preact-nebula/ui/utils'

function CustomLabelComponents() {
  return (
    <div className="space-y-6">
      {/* Label z ikoną */}
      <div>
        <Label htmlFor="search" className="flex items-center space-x-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          <span>Szukaj</span>
        </Label>
        <Input id="search" placeholder="Wprowadź frazę..." />
      </div>
      
      {/* Label z dodatkową informacją */}
      <div>
        <Label htmlFor="price" className="flex items-baseline justify-between">
          <span>
            Cena <span className="text-red-500">*</span>
          </span>
          <span className="text-sm text-gray-500 font-normal">
            in PLN
          </span>
        </Label>
        <Input 
          id="price" 
          type="number" 
          placeholder="0.00"
          className="text-right"
        />
      </div>
      
      {/* Label z tooltipem */}
      <div>
        <Label htmlFor="advanced" className="flex items-center space-x-2">
          <span>Ustawienia zaawansowane</span>
          <div 
            className="w-4 h-4 bg-gray-300 rounded-full flex items-center justify-center text-xs text-white cursor-help"
            title="Te ustawienia są dla zaawansowanych użytkowników"
          >
            ?
          </div>
        </Label>
        <Input id="advanced" placeholder="Wartość zaawansowana" />
      </div>
      
      {/* Label z licznikiem znaków */}
      <div>
        <Label htmlFor="description" className="flex justify-between items-center">
          <span>Opis produktu</span>
          <span className="text-sm text-gray-500">
            <span id="char-count">0</span>/200
          </span>
        </Label>
        <Textarea
          id="description"
          maxLength={200}
          onChange={(e) => {
            const charCount = document.getElementById('char-count')
            if (charCount) {
              charCount.textContent = e.target.value.length.toString()
            }
          }}
        />
      </div>
    </div>
  )
}
```

### Labels with validation

```tsx
import { Label, Input, FieldError } from '@preact-nebula/ui'
import { useState } from 'preact/hooks'

function ValidatedLabelsExample() {
  const [values, setValues] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  
  const validate = (field: string, value: string) => {
    switch (field) {
      case 'username':
        if (!value) return 'Nazwa użytkownika jest wymagana'
        if (value.length < 3) return 'Minimum 3 znaki'
        return ''
      case 'password':
        if (!value) return 'Hasło jest wymagane'
        if (value.length < 8) return 'Minimum 8 znaków'
        return ''
      case 'confirmPassword':
        if (!value) return 'Potwierdzenie hasła jest wymagane'
        if (value !== values.password) return 'Hasła nie są identyczne'
        return ''
      default:
        return ''
    }
  }
  
  const handleChange = (field: string) => (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    
    setValues(prev => ({ ...prev, [field]: value }))
    
    if (touched[field]) {
      const error = validate(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }
  
  const handleBlur = (field: string) => () => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validate(field, values[field as keyof typeof values])
    setErrors(prev => ({ ...prev, [field]: error }))
  }
  
  const isFieldInvalid = (field: string) => touched[field] && !!errors[field]
  
  return (
    <form className="max-w-md space-y-4">
      <div>
        <Label 
          htmlFor="username" 
          required 
          className={cn(
            isFieldInvalid('username') && "text-red-600"
          )}
        >
          Username
        </Label>
        <Input
          id="username"
          value={values.username}
          onChange={handleChange('username')}
          onBlur={handleBlur('username')}
          error={isFieldInvalid('username')}
          aria-invalid={isFieldInvalid('username')}
          aria-describedby={isFieldInvalid('username') ? 'username-error' : undefined}
        />
        <FieldError id="username-error">
          {errors.username}
        </FieldError>
      </div>
      
      <div>
        <Label 
          htmlFor="password" 
          required
          className={cn(
            isFieldInvalid('password') && "text-red-600"
          )}
        >
          Password
        </Label>
        <Input
          type="password"
          id="password"
          value={values.password}
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          error={isFieldInvalid('password')}
          aria-invalid={isFieldInvalid('password')}
          aria-describedby={isFieldInvalid('password') ? 'password-error' : undefined}
        />
        <FieldError id="password-error">
          {errors.password}
        </FieldError>
      </div>
      
      <div>
        <Label 
          htmlFor="confirmPassword" 
          required
          className={cn(
            isFieldInvalid('confirmPassword') && "text-red-600"
          )}
        >
          Confirm password
        </Label>
        <Input
          type="password"
          id="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange('confirmPassword')}
          onBlur={handleBlur('confirmPassword')}
          error={isFieldInvalid('confirmPassword')}
          aria-invalid={isFieldInvalid('confirmPassword')}
          aria-describedby={isFieldInvalid('confirmPassword') ? 'confirmPassword-error' : undefined}
        />
        <FieldError id="confirmPassword-error">
          {errors.confirmPassword}
        </FieldError>
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        disabled={Object.values(errors).some(error => !!error)}
      >
        Register
      </button>
    </form>
  )
}
```

### Labels in responsive layouts

```tsx
import { Label, Input, Select, Textarea } from '@preact-nebula/ui'

function ResponsiveLabelsExample() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Responsive form</h2>
      
      {/* Layout na desktop: label obok inputa */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 lg:items-center">
          <Label htmlFor="company" className="lg:text-right" size="sm">
            Company
          </Label>
          <div className="lg:col-span-3">
            <Input id="company" size="sm" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 lg:items-start">
          <Label htmlFor="address" className="lg:text-right lg:mt-2" size="sm">
            Address
          </Label>
          <div className="lg:col-span-3">
            <Textarea id="address" rows={3} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-start-1">
            <Label htmlFor="city" size="sm" required>
              City
            </Label>
            <Input id="city" size="sm" />
          </div>
          
          <div>
            <Label htmlFor="postal" size="sm" required>
              Postal code
            </Label>
            <Input id="postal" size="sm" placeholder="00-000" />
          </div>
          
          <div className="md:col-span-2 lg:col-span-1">
            <Label htmlFor="country" size="sm" required>
              Country
            </Label>
            <Select id="country" size="sm">
              <option>Wybierz kraj</option>
              <option value="PL">Polska</option>
              <option value="DE">Niemcy</option>
            </Select>
          </div>
        </div>
        
        {/* Sekcja kontaktowa */}
        <fieldset className="border rounded-lg p-4 space-y-4">
          <legend className="px-2">
            <Label className="text-lg font-semibold">
              Contact details
            </Label>
          </legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" size="sm">
                Phone
              </Label>
              <Input 
                type="tel" 
                id="phone" 
                size="sm" 
                placeholder="+48 123 456 789" 
              />
            </div>
            
            <div>
              <Label htmlFor="email-contact" size="sm" required>
                Email
              </Label>
              <Input 
                type="email" 
                id="email-contact" 
                size="sm"
                placeholder="jan@example.com"
              />
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  )
}
```

## Props API

### LabelProps

| Prop          | Type                | Default     | Description                    |
| ------------- | ------------------- | ----------- | ------------------------------ |
| `required`    | `boolean`           | `false`     | Is the field required (adds *) |
| `disabled`    | `boolean`           | `false`     | Is the label inactive          |
| `size`        | `'sm'               | 'md'        | 'lg'`                          | `'md'` | Label size |
| `htmlFor`     | `string`            | `undefined` | ID of the control to associate |
| `className`   | `string`            | `undefined` | Additional CSS classes         |
| `children`    | `ComponentChildren` | -           | Label content                  |
| `data-testid` | `string`            | `undefined` | Test identifier                |

### Sizes

- **sm** - `text-sm` (14px) - for compact forms
- **md** - `text-base` (16px) - standard size
- **lg** - `text-lg` (18px) - for larger forms

### Additional props

The component accepts all standard label element props.

## Accessibility

### Best practices

```tsx
// ✅ Good - correct association
<Label htmlFor="username" required>
  Username
</Label>
<Input id="username" aria-required="true" />

// ✅ Good - with helper description
<Label htmlFor="password">
  Password
</Label>
<Input 
  type="password"
  id="password"
  aria-describedby="password-help"
/>
<div id="password-help">
  Minimum 8 characters, at least one digit
</div>

// ✅ Good - grouping radio buttons
<fieldset>
  <legend>
    <Label required>Preferred contact</Label>
  </legend>
  <Radio name="contact" value="email">Email</Radio>
  <Radio name="contact" value="phone">Phone</Radio>
</fieldset>

// ❌ Bad - no association
<Label>Username</Label>
<Input />
```

### ARIA Support

- Automatic association with controls via `htmlFor`
- Support for `aria-label` on required asterisk
- Compatibility with `aria-describedby` for additional descriptions
- Support for `fieldset` and `legend` in control groups

## Best practices

### Label texts

```tsx
// ✅ Good - clear and specific
<Label htmlFor="email" required>Email</Label>
<Label htmlFor="birthDate">Date of birth</Label>
<Label htmlFor="company">Company name</Label>

// ❌ Bad - unclear or too generic
<Label htmlFor="field1">Field 1</Label>
<Label htmlFor="input">Input</Label>
<Label htmlFor="data">Data</Label>
```

### Hierarchy and grouping

```tsx
// ✅ Good - logical grouping
<fieldset>
  <legend>
    <Label className="text-lg font-semibold">
      Delivery address
    </Label>
  </legend>
  
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="street" required size="sm">Street</Label>
      <Input id="street" />
    </div>
    <div>
      <Label htmlFor="number" required size="sm">Number</Label>
      <Input id="number" />
    </div>
  </div>
</fieldset>

// ❌ Bad - illogical grouping
<fieldset>
  <legend>
    <Label className="text-lg font-semibold">
      Użytkownik
    </Label>
  </legend>
  
  <div>
    <Label htmlFor="username" required size="sm">Nazwa użytkownika</Label>
    <Input id="username" />
  </div>
  
  <div>
    <Label htmlFor="password" required size="sm">Hasło</Label>
    <Input type="password" id="password" />
  </div>
</fieldset>
```

### Consistent sizes

```tsx
// ✅ Good - consistent sizes
<div className="space-y-4">
  <div>
    <Label htmlFor="name" size="sm">First name</Label>
    <Input id="name" size="sm" />
  </div>
  <div>
    <Label htmlFor="surname" size="sm">Last name</Label>
    <Input id="surname" size="sm" />
  </div>
</div>

// ❌ Bad - inconsistent sizes
<div className="space-y-4">
  <div>
    <Label htmlFor="name" size="lg">First name</Label>
    <Input id="name" size="sm" />
  </div>
  <div>
    <Label htmlFor="surname" size="sm">Last name</Label>
    <Input id="surname" size="lg" />
  </div>
</div>
```

## Integration with other components

### With Input

```tsx
<div>
  <Label htmlFor="search" size="sm">
    Search products
  </Label>
  <Input
    id="search"
    size="sm"
    placeholder="Wprowadź nazwę produktu..."
    leftIcon={<SearchIcon />}
  />
</div>
```

### With Select

```tsx
<div>
  <Label htmlFor="category" required>
    Category
  </Label>
  <Select id="category" aria-required="true">
    <option value="">Select category</option>
    <option value="electronics">Electronics</option>
    <option value="clothing">Clothing</option>
  </Select>
</div>
```

### With Textarea

```tsx
<div>
  <Label htmlFor="description" className="flex justify-between">
    <span>Description</span>
    <span className="text-sm text-gray-500">Optional</span>
  </Label>
  <Textarea
    id="description"
    rows={4}
    placeholder="Describe your experience..."
    maxLength={1000}
  />
</div>
```

## Testing

### Test examples

```tsx
import { render, screen } from '@testing-library/preact'
import { Label } from '@preact-nebula/ui'

describe('Label', () => {
  it('should render label text', () => {
    render(<Label>Test Label</Label>)
    
    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })
  
  it('should show required asterisk', () => {
    render(<Label required>Required Field</Label>)
    
    expect(screen.getByText('*')).toBeInTheDocument()
    expect(screen.getByLabelText('required')).toBeInTheDocument()
  })
  
  it('should associate with form control', () => {
    render(
      <div>
        <Label htmlFor="test-input">Test Field</Label>
        <input id="test-input" />
      </div>
    )
    
    const label = screen.getByText('Test Field')
    expect(label).toHaveAttribute('for', 'test-input')
  })
  
  it('should apply disabled styling', () => {
    render(<Label disabled>Disabled Label</Label>)
    
    const label = screen.getByText('Disabled Label')
    expect(label).toHaveClass('text-gray-400')
  })
  
  it('should support different sizes', () => {
    render(<Label size="lg">Large Label</Label>)
    
    const label = screen.getByText('Large Label')
    expect(label).toHaveClass('text-lg')
  })
})
```

The `Label` component is a fundamental element of accessible forms, providing proper labeling for controls and support for all accessibility standards.
