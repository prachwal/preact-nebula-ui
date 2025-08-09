# Label - Dokumentacja

## Przegląd

Komponent `Label` służy do tworzenia dostępnych etykiet dla kontrolek formularzy. Zapewnia odpowiednie stylowanie, wsparcie dla stanów wymagalności i niepełnosprawności, oraz pełną integrację z ekosystemem formularzy.

## Funkcje

- **Rozmiary** - Trzy warianty rozmiaru (sm, md, lg)
- **Stan wymagalności** - Automatyczne dodawanie gwiazdki (*)
- **Stan disabled** - Wizualne oznaczenie nieaktywnych pól
- **Dostępność** - Pełne wsparcie dla technologii asystujących
- **Dark mode** - Automatyczna adaptacja do ciemnego motywu
- **TypeScript** - Pełne wsparcie typów
- **Customizacja** - Możliwość stylowania poprzez className

## Podstawowe użycie

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

## Zaawansowane przykłady

### Różne rozmiary etykiet

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

### Kompleksowy formularz z etykietami

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
      <h2 className="text-2xl font-bold mb-6">Formularz rejestracyjny</h2>
      
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
            To pole jest wymagane
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
          Adres email
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
          Użyjemy tego adresu do kontaktu z Tobą
        </p>
      </div>
      
      {/* Pole opcjonalne */}
      <div>
        <Label htmlFor="bio" size="lg">
          Biografia
          <span className="ml-2 text-sm font-normal text-gray-500">
            (opcjonalne)
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
          Maksymalnie 500 znaków
        </p>
      </div>
      
      {/* Select z etykietą */}
      <div>
        <Label htmlFor="country" required>
          Kraj
        </Label>
        <Select
          id="country"
          value={formData.country}
          onChange={updateField('country')}
          aria-required="true"
        >
          <option value="">Wybierz kraj</option>
          <option value="PL">Polska</option>
          <option value="DE">Niemcy</option>
          <option value="UK">Wielka Brytania</option>
          <option value="US">Stany Zjednoczone</option>
        </Select>
      </div>
      
      {/* Checkbox z custom etykietą */}
      <div className="space-y-2">
        <Label>Preferencje komunikacji</Label>
        <div className="space-y-2">
          <Checkbox
            id="newsletter"
            checked={formData.newsletter}
            onChange={(checked) => updateField('newsletter')(checked)}
          >
            <Label htmlFor="newsletter" size="sm" className="ml-2 cursor-pointer">
              Chcę otrzymywać newsletter
            </Label>
          </Checkbox>
        </div>
      </div>
      
      {/* Radio buttons z grupową etykietą */}
      <fieldset className="space-y-3">
        <legend>
          <Label required size="md">
            Preferowany sposób kontaktu
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
              Telefon
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
          Zarejestruj się
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
            w PLN
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

### Labels z walidacją

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
          Nazwa użytkownika
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
          Hasło
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
          Potwierdź hasło
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
        Zarejestruj się
      </button>
    </form>
  )
}
```

### Labels w układach responsywnych

```tsx
import { Label, Input, Select, Textarea } from '@preact-nebula/ui'

function ResponsiveLabelsExample() {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Responsywny formularz</h2>
      
      {/* Layout na desktop: label obok inputa */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 lg:items-center">
          <Label htmlFor="company" className="lg:text-right" size="sm">
            Firma
          </Label>
          <div className="lg:col-span-3">
            <Input id="company" size="sm" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-4 lg:items-start">
          <Label htmlFor="address" className="lg:text-right lg:mt-2" size="sm">
            Adres
          </Label>
          <div className="lg:col-span-3">
            <Textarea id="address" rows={3} />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-start-1">
            <Label htmlFor="city" size="sm" required>
              Miasto
            </Label>
            <Input id="city" size="sm" />
          </div>
          
          <div>
            <Label htmlFor="postal" size="sm" required>
              Kod pocztowy
            </Label>
            <Input id="postal" size="sm" placeholder="00-000" />
          </div>
          
          <div className="md:col-span-2 lg:col-span-1">
            <Label htmlFor="country" size="sm" required>
              Kraj
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
              Dane kontaktowe
            </Label>
          </legend>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" size="sm">
                Telefon
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

| Prop          | Typ                    | Domyślna    | Opis                              |
| ------------- | ---------------------- | ----------- | --------------------------------- |
| `required`    | `boolean`              | `false`     | Czy pole jest wymagane (dodaje *) |
| `disabled`    | `boolean`              | `false`     | Czy etykieta jest nieaktywna      |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`      | Rozmiar etykiety                  |
| `htmlFor`     | `string`               | `undefined` | ID kontrolki do powiązania        |
| `className`   | `string`               | `undefined` | Dodatkowe klasy CSS               |
| `children`    | `ComponentChildren`    | -           | Zawartość etykiety                |
| `data-testid` | `string`               | `undefined` | Identyfikator dla testów          |

### Rozmiary

- **sm** - `text-sm` (14px) - dla kompaktowych formularzy
- **md** - `text-base` (16px) - standardowy rozmiar
- **lg** - `text-lg` (18px) - dla większych formularzy

### Dodatkowe props

Komponent przyjmuje wszystkie standardowe props elementu `label`.

## Dostępność

### Najlepsze praktyki

```tsx
// ✅ Dobrze - poprawne powiązanie
<Label htmlFor="username" required>
  Nazwa użytkownika
</Label>
<Input id="username" aria-required="true" />

// ✅ Dobrze - z opisem pomocniczym
<Label htmlFor="password">
  Hasło
</Label>
<Input 
  type="password"
  id="password"
  aria-describedby="password-help"
/>
<div id="password-help">
  Minimum 8 znaków, co najmniej jedna cyfra
</div>

// ✅ Dobrze - grupowanie radio buttons
<fieldset>
  <legend>
    <Label required>Preferowany kontakt</Label>
  </legend>
  <Radio name="contact" value="email">Email</Radio>
  <Radio name="contact" value="phone">Telefon</Radio>
</fieldset>

// ❌ Źle - brak powiązania
<Label>Username</Label>
<Input />
```

### ARIA Support

- Automatyczne powiązanie z kontrolkami poprzez `htmlFor`
- Wsparcie dla `aria-label` na gwiazdce wymagalności
- Kompatybilność z `aria-describedby` dla dodatkowych opisów
- Wsparcie dla `fieldset` i `legend` w grupach kontrolek

## Najlepsze praktyki

### Teksty etykiet

```tsx
// ✅ Dobrze - jasne i konkretne
<Label htmlFor="email" required>Email</Label>
<Label htmlFor="birthDate">Data urodzenia</Label>
<Label htmlFor="company">Nazwa firmy</Label>

// ❌ Źle - niejasne lub zbyt ogólne
<Label htmlFor="field1">Pole 1</Label>
<Label htmlFor="input">Input</Label>
<Label htmlFor="data">Dane</Label>
```

### Hierarchia i grupowanie

```tsx
// ✅ Dobrze - logiczne grupowanie
<fieldset>
  <legend>
    <Label className="text-lg font-semibold">
      Adres dostawy
    </Label>
  </legend>
  
  <div className="grid grid-cols-2 gap-4">
    <div>
      <Label htmlFor="street" required size="sm">Ulica</Label>
      <Input id="street" />
    </div>
    <div>
      <Label htmlFor="number" required size="sm">Numer</Label>
      <Input id="number" />
    </div>
  </div>
</fieldset>
```

### Spójność rozmiarów

```tsx
// ✅ Dobrze - spójne rozmiary
<div className="space-y-4">
  <div>
    <Label htmlFor="name" size="sm">Imię</Label>
    <Input id="name" size="sm" />
  </div>
  <div>
    <Label htmlFor="surname" size="sm">Nazwisko</Label>
    <Input id="surname" size="sm" />
  </div>
</div>

// ❌ Źle - niespójne rozmiary
<div className="space-y-4">
  <div>
    <Label htmlFor="name" size="lg">Imię</Label>
    <Input id="name" size="sm" />
  </div>
  <div>
    <Label htmlFor="surname" size="sm">Nazwisko</Label>
    <Input id="surname" size="lg" />
  </div>
</div>
```

## Integracja z innymi komponentami

### Z Input

```tsx
<div>
  <Label htmlFor="search" size="sm">
    Szukaj produktów
  </Label>
  <Input
    id="search"
    size="sm"
    placeholder="Wprowadź nazwę produktu..."
    leftIcon={<SearchIcon />}
  />
</div>
```

### Z Select

```tsx
<div>
  <Label htmlFor="category" required>
    Kategoria
  </Label>
  <Select id="category" aria-required="true">
    <option value="">Wybierz kategorię</option>
    <option value="electronics">Elektronika</option>
    <option value="clothing">Odzież</option>
  </Select>
</div>
```

### Z Textarea

```tsx
<div>
  <Label htmlFor="description" className="flex justify-between">
    <span>Opis</span>
    <span className="text-sm text-gray-500">Opcjonalne</span>
  </Label>
  <Textarea
    id="description"
    rows={4}
    placeholder="Opisz swoje doświadczenie..."
    maxLength={1000}
  />
</div>
```

## Testowanie

### Przykłady testów

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

Komponent `Label` jest podstawowym elementem dostępnych formularzy, zapewniając właściwe etykietowanie kontrolek i wsparcie dla wszystkich standardów dostępności.
