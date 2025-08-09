# FieldError - Dokumentacja

## Przegląd

Komponent `FieldError` służy do wyświetlania komunikatów błędów walidacji w formularzach. Jest zaprojektowany z myślą o dostępności i zapewnia odpowiednie atrybuty ARIA dla technologii asystujących.

## Funkcje

- **Automatyczne ukrywanie** - Nie renderuje się gdy brak błędów
- **Dostępność** - Pełne wsparcie ARIA z role="alert"
- **Responsywność** - Adaptuje się do różnych rozmiarów ekranu
- **Customizacja** - Możliwość stylowania poprzez className
- **TypeScript** - Pełne wsparcie typów
- **Test-friendly** - Wsparcie dla data-testid

## Podstawowe użycie

```tsx
import { FieldError } from '@preact-nebula/ui'

function BasicFormExample() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    
    if (!email) {
      newErrors.email = 'Email jest wymagany'
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
      
      <button type="submit">Wyślij</button>
    </form>
  )
}
```

## Zaawansowane przykłady

### Integracja z formularzami

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
        return value.length < 2 ? 'Imię musi mieć co najmniej 2 znaki' : undefined
      case 'lastName':
        return value.length < 2 ? 'Nazwisko musi mieć co najmniej 2 znaki' : undefined
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!value) return 'Email jest wymagany'
        return !emailRegex.test(value) ? 'Nieprawidłowy format email' : undefined
      case 'password':
        if (!value) return 'Hasło jest wymagane'
        if (value.length < 8) return 'Hasło musi mieć co najmniej 8 znaków'
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Hasło musi zawierać małą literę, dużą literę i cyfrę'
        }
        return undefined
      case 'confirmPassword':
        if (!value) return 'Potwierdzenie hasła jest wymagane'
        return value !== formData.password ? 'Hasła nie są identyczne' : undefined
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
      console.log('Formularz wysłany:', formData)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-2xl font-bold mb-6">Rejestracja</h2>
      
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium mb-1">
          Imię *
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
          Nazwisko *
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
          type="email"
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
          Hasło *
        </label>
        <Input
          type="password"
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
          Potwierdź hasło *
        </label>
        <Input
          type="password"
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
      
      <Button 
        type="submit" 
        className="w-full"
        disabled={Object.keys(errors).some(key => errors[key as keyof FormErrors])}
      >
        Zarejestruj się
      </Button>
    </form>
  )
}
```

### FieldError z różnymi typami błędów

```tsx
import { FieldError, Alert } from '@preact-nebula/ui'

function ErrorTypesExample() {
  const [errors, setErrors] = useState({
    simple: 'Prosty komunikat błędu',
    multiple: ['Błąd walidacji 1', 'Błąd walidacji 2', 'Błąd walidacji 3'],
    formatted: null as string | null,
    server: null as string | null
  })
  
  return (
    <div className="space-y-6 max-w-lg">
      {/* Prosty błąd */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Pole z prostym błędem
        </label>
        <input 
          className="w-full px-3 py-2 border border-red-500 rounded-md"
          aria-describedby="simple-error"
        />
        <FieldError id="simple-error">
          {errors.simple}
        </FieldError>
      </div>
      
      {/* Błędy wielokrotne */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Pole z wieloma błędami
        </label>
        <input 
          className="w-full px-3 py-2 border border-red-500 rounded-md"
          aria-describedby="multiple-errors"
        />
        <div id="multiple-errors">
          {errors.multiple.map((error, index) => (
            <FieldError key={index} className="block">
              • {error}
            </FieldError>
          ))}
        </div>
      </div>
      
      {/* Sformatowany błąd */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Pole z sformatowanym błędem
        </label>
        <input 
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          aria-describedby="formatted-error"
        />
        <FieldError id="formatted-error">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Błąd z ikoną i <strong>formatowaniem</strong>
          </span>
        </FieldError>
      </div>
      
      {/* Błąd serwera */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Pole z błędem serwera
        </label>
        <input className="w-full px-3 py-2 border border-gray-300 rounded-md" />
        <FieldError>
          {errors.server || null}
        </FieldError>
        
        <Button
          onClick={() => setErrors(prev => ({ 
            ...prev, 
            server: 'Błąd serwera: Nie można połączyć się z API' 
          }))}
          size="sm"
          className="mt-2"
        >
          Symuluj błąd serwera
        </Button>
      </div>
    </div>
  )
}
```

### FieldError z custom styling

```tsx
import { FieldError } from '@preact-nebula/ui'
import { cn } from '@preact-nebula/ui/utils'

function CustomStyledFieldError({ 
  children, 
  severity = 'error',
  showIcon = true,
  className,
  ...props 
}: {
  children: preact.ComponentChildren
  severity?: 'error' | 'warning' | 'info'
  showIcon?: boolean
  className?: string
} & ComponentProps<typeof FieldError>) {
  const icons = {
    error: '❌',
    warning: '⚠️',
    info: 'ℹ️'
  }
  
  const colors = {
    error: 'text-red-600 bg-red-50 border-red-200',
    warning: 'text-amber-600 bg-amber-50 border-amber-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200'
  }
  
  return (
    <FieldError 
      className={cn(
        'mt-2 px-3 py-2 rounded-md border',
        colors[severity],
        className
      )}
      {...props}
    >
      <div className="flex items-start space-x-2">
        {showIcon && (
          <span className="flex-shrink-0 mt-0.5">
            {icons[severity]}
          </span>
        )}
        <div className="flex-1">{children}</div>
      </div>
    </FieldError>
  )
}

function CustomStyledExample() {
  return (
    <div className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-1">
          Błąd
        </label>
        <input className="w-full px-3 py-2 border border-red-500 rounded-md" />
        <CustomStyledFieldError severity="error">
          To pole jest wymagane
        </CustomStyledFieldError>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Ostrzeżenie
        </label>
        <input className="w-full px-3 py-2 border border-amber-500 rounded-md" />
        <CustomStyledFieldError severity="warning">
          Ta wartość może być nieprawidłowa
        </CustomStyledFieldError>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">
          Informacja
        </label>
        <input className="w-full px-3 py-2 border border-blue-500 rounded-md" />
        <CustomStyledFieldError severity="info" showIcon={false}>
          Dodatkowe informacje o tym polu
        </CustomStyledFieldError>
      </div>
    </div>
  )
}
```

### Integracja z bibliotekami walidacji

```tsx
import { FieldError } from '@preact-nebula/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  username: z.string()
    .min(3, 'Nazwa użytkownika musi mieć co najmniej 3 znaki')
    .max(20, 'Nazwa użytkownika nie może przekraczać 20 znaków'),
  email: z.string()
    .email('Nieprawidłowy format email'),
  age: z.number()
    .min(18, 'Musisz mieć co najmniej 18 lat')
    .max(100, 'Wiek nie może przekraczać 100 lat')
})

type FormData = z.infer<typeof schema>

function ReactHookFormExample() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema)
  })
  
  const onSubmit = (data: FormData) => {
    console.log('Dane formularza:', data)
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Nazwa użytkownika
        </label>
        <input
          {...register('username')}
          id="username"
          className={cn(
            "w-full px-3 py-2 border rounded-md",
            errors.username ? "border-red-500" : "border-gray-300"
          )}
          aria-describedby={errors.username ? 'username-error' : undefined}
        />
        <FieldError id="username-error">
          {errors.username?.message}
        </FieldError>
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className={cn(
            "w-full px-3 py-2 border rounded-md",
            errors.email ? "border-red-500" : "border-gray-300"
          )}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        <FieldError id="email-error">
          {errors.email?.message}
        </FieldError>
      </div>
      
      <div>
        <label htmlFor="age" className="block text-sm font-medium mb-1">
          Wiek
        </label>
        <input
          {...register('age', { valueAsNumber: true })}
          type="number"
          id="age"
          className={cn(
            "w-full px-3 py-2 border rounded-md",
            errors.age ? "border-red-500" : "border-gray-300"
          )}
          aria-describedby={errors.age ? 'age-error' : undefined}
        />
        <FieldError id="age-error">
          {errors.age?.message}
        </FieldError>
      </div>
      
      <Button type="submit" className="w-full">
        Wyślij
      </Button>
    </form>
  )
}
```

## Props API

### FieldErrorProps

| Prop          | Typ                 | Domyślna    | Opis                     |
| ------------- | ------------------- | ----------- | ------------------------ |
| `children`    | `ComponentChildren` | `undefined` | Treść komunikatu błędu   |
| `id`          | `string`            | `undefined` | ID dla powiązań ARIA     |
| `className`   | `string`            | `undefined` | Dodatkowe klasy CSS      |
| `data-testid` | `string`            | `undefined` | Identyfikator dla testów |

### Dodatkowe props

Komponent przyjmuje również wszystkie standardowe props elementu `div`.

## Dostępność

### ARIA Support

Komponent automatycznie zapewnia:
- `role="alert"` - Oznacza element jako alert
- `aria-live="polite"` - Komunikaty są ogłaszane przez czytniki ekranu
- Możliwość powiązania z polami poprzez `aria-describedby`

### Przykład z pełnym wsparciem dostępności

```tsx
function AccessibleFormExample() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  
  const validateEmail = (value: string) => {
    if (!value) return 'Email jest wymagany'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Nieprawidłowy format email'
    }
    return ''
  }
  
  const handleEmailChange = (e: Event) => {
    const target = e.target as HTMLInputElement
    const value = target.value
    setEmail(value)
    setEmailError(validateEmail(value))
  }
  
  return (
    <div className="max-w-md">
      <label htmlFor="email" className="block text-sm font-medium mb-1">
        Email *
        <span className="text-gray-500 text-xs ml-1">
          (wymagane)
        </span>
      </label>
      
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        aria-required="true"
        aria-invalid={!!emailError}
        aria-describedby={emailError ? 'email-error email-help' : 'email-help'}
        className={cn(
          "w-full px-3 py-2 border rounded-md",
          emailError ? "border-red-500" : "border-gray-300"
        )}
      />
      
      <div id="email-help" className="mt-1 text-sm text-gray-600">
        Wprowadź prawidłowy adres email
      </div>
      
      <FieldError id="email-error">
        {emailError}
      </FieldError>
    </div>
  )
}
```

## Najlepsze praktyki

### Komunikaty błędów

```tsx
// ✅ Dobrze - jasne komunikaty
<FieldError>Email jest wymagany</FieldError>
<FieldError>Hasło musi mieć co najmniej 8 znaków</FieldError>

// ❌ Źle - niejasne komunikaty
<FieldError>Błąd</FieldError>
<FieldError>Nieprawidłowa wartość</FieldError>
```

### Powiązania ARIA

```tsx
// ✅ Dobrze - poprawne powiązania
<input
  aria-describedby={error ? 'field-error field-help' : 'field-help'}
  aria-invalid={!!error}
/>
<div id="field-help">Tekst pomocniczy</div>
<FieldError id="field-error">{error}</FieldError>

// ❌ Źle - brak powiązań
<input />
<FieldError>{error}</FieldError>
```

### Walidacja i UX

```tsx
// ✅ Dobrze - walidacja po blur/submit
const handleBlur = () => {
  setError(validate(value))
}

// ❌ Źle - walidacja podczas pisania
const handleChange = (e) => {
  const value = e.target.value
  setValue(value)
  setError(validate(value)) // Irytujące dla użytkownika
}
```

### Performance

```tsx
// ✅ Dobrze - sprawdzanie czy error istnieje
{error && <FieldError>{error}</FieldError>}

// ✅ Także dobrze - komponent sam sprawdza
<FieldError>{error}</FieldError>

// ❌ Źle - niepotrzebne renderowanie
<FieldError>{error || ''}</FieldError>
```

## Testowanie

### Przykłady testów

```tsx
import { render, screen } from '@testing-library/preact'
import { FieldError } from '@preact-nebula/ui'

describe('FieldError', () => {
  it('should render error message', () => {
    render(<FieldError>Test error message</FieldError>)
    
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Test error message')).toBeInTheDocument()
  })
  
  it('should not render when no error', () => {
    const { container } = render(<FieldError>{null}</FieldError>)
    
    expect(container.firstChild).toBeNull()
  })
  
  it('should have correct ARIA attributes', () => {
    render(<FieldError id="test-error">Error message</FieldError>)
    
    const errorElement = screen.getByRole('alert')
    expect(errorElement).toHaveAttribute('aria-live', 'polite')
    expect(errorElement).toHaveAttribute('id', 'test-error')
  })
  
  it('should support custom test id', () => {
    render(<FieldError data-testid="custom-error">Error</FieldError>)
    
    expect(screen.getByTestId('custom-error')).toBeInTheDocument()
  })
})
```

## Stylowanie

### Custom CSS

```css
/* Różne style dla różnych typów błędów */
.field-error-severe {
  @apply bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded;
}

.field-error-warning {
  @apply bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded;
}

.field-error-info {
  @apply bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded;
}
```

Komponent `FieldError` jest fundamentalnym elementem dla tworzenia dostępnych i użytecznych formularzy, zapewniając jasne komunikaty błędów z pełnym wsparciem dla technologii asystujących.
