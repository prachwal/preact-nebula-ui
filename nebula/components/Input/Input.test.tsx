import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Input } from './Input'

// Mock icon component for testing
const MockIcon = () => <svg data-testid="mock-icon">icon</svg>

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input data-testid="input" />)
    
    const input = screen.getByTestId('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
    expect(input).not.toBeDisabled()
    expect(input).not.toHaveAttribute('required')
  })

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Input variant="default" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-gray-300')
    })

    it('renders error variant correctly', () => {
      render(<Input variant="error" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-red-500')
    })

    it('renders success variant correctly', () => {
      render(<Input variant="success" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-green-500')
    })

    it('shows error variant when error prop is provided', () => {
      render(<Input error="Error message" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-red-500')
    })

    it('shows error variant when isInvalid is true', () => {
      render(<Input isInvalid data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-red-500')
    })

    it('shows success variant when isValid is true', () => {
      render(<Input isValid data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('border-green-500')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Input size="sm" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('px-3', 'py-1.5', 'text-sm')
    })

    it('renders medium size correctly (default)', () => {
      render(<Input size="md" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('px-3', 'py-2', 'text-base')
    })

    it('renders large size correctly', () => {
      render(<Input size="lg" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('px-4', 'py-3', 'text-lg')
    })
  })

  describe('Input Types', () => {
    it('renders text type by default', () => {
      render(<Input data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'text')
    })

    it('renders email type correctly', () => {
      render(<Input type="email" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'email')
    })

    it('renders password type correctly', () => {
      render(<Input type="password" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'password')
    })

    it('renders number type correctly', () => {
      render(<Input type="number" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('type', 'number')
    })
  })

  describe('Icons', () => {
    it('renders left icon correctly', () => {
      render(<Input leftIcon={<MockIcon />} data-testid="input" />)
      
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('pl-10') // md size default
    })

    it('renders right icon correctly', () => {
      render(<Input rightIcon={<MockIcon />} data-testid="input" />)
      
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument()
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('pr-10') // md size default
    })

    it('adjusts padding for small size with icons', () => {
      render(
        <Input 
          size="sm" 
          leftIcon={<MockIcon />} 
          rightIcon={<MockIcon />} 
          data-testid="input" 
        />
      )
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('pl-10', 'pr-10')
    })

    it('adjusts padding for large size with icons', () => {
      render(
        <Input 
          size="lg" 
          leftIcon={<MockIcon />} 
          rightIcon={<MockIcon />} 
          data-testid="input" 
        />
      )
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('pl-12', 'pr-12')
    })
  })

  describe('States', () => {
    it('renders disabled state correctly', () => {
      render(<Input disabled data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('disabled:cursor-not-allowed')
    })

    it('renders required state correctly', () => {
      render(<Input required data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('required')
    })

    it('sets aria-invalid to true when error is present', () => {
      render(<Input error="Error message" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
    })

    it('sets aria-invalid to false when no error', () => {
      render(<Input data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-invalid', 'false')
    })
  })

  describe('Error and Helper Text', () => {
    it('displays error message', () => {
      render(<Input error="This is an error" data-testid="input" />)
      
      expect(screen.getByText('This is an error')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('displays helper text', () => {
      render(<Input helperText="This is helper text" data-testid="input" />)
      
      expect(screen.getByText('This is helper text')).toBeInTheDocument()
    })

    it('prioritizes error message over helper text', () => {
      render(
        <Input 
          error="Error message" 
          helperText="Helper text" 
          data-testid="input" 
        />
      )
      
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    })

    it('associates description with input via aria-describedby', () => {
      render(<Input id="test-input" error="Error message" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-describedby', 'test-input-description')
    })
  })

  describe('Event Handling', () => {
    it('calls onChange when input value changes', () => {
      const handleChange = vi.fn()
      render(<Input onChange={handleChange} data-testid="input" />)
      
      const input = screen.getByTestId('input')
      fireEvent.change(input, { target: { value: 'new value' } })
      
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('calls onFocus when input is focused', () => {
      const handleFocus = vi.fn()
      render(<Input onFocus={handleFocus} data-testid="input" />)
      
      const input = screen.getByTestId('input')
      input.focus()
      
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('calls onBlur when input loses focus', () => {
      const handleBlur = vi.fn()
      render(<Input onBlur={handleBlur} data-testid="input" />)
      
      const input = screen.getByTestId('input')
      input.focus()
      input.blur()
      
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('Form Integration', () => {
    it('accepts value prop for controlled component', () => {
      render(<Input value="controlled value" data-testid="input" />)
      
      const input = screen.getByTestId('input') as HTMLInputElement
      expect(input.value).toBe('controlled value')
    })

    it('accepts defaultValue prop for uncontrolled component', () => {
      render(<Input defaultValue="default value" data-testid="input" />)
      
      const input = screen.getByTestId('input') as HTMLInputElement
      expect(input.defaultValue).toBe('default value')
    })

    it('accepts placeholder prop', () => {
      render(<Input placeholder="Enter text..." data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('placeholder', 'Enter text...')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Input data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('role', 'textbox')
    })

    it('has proper ARIA attributes for error state', () => {
      render(<Input error="Error message" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('aria-invalid', 'true')
      
      const errorMessage = screen.getByRole('alert')
      expect(errorMessage).toHaveAttribute('aria-live', 'polite')
    })

    it('icons have aria-hidden attribute', () => {
      const { container } = render(
        <Input leftIcon={<MockIcon />} rightIcon={<MockIcon />} />
      )
      
      const iconContainers = container.querySelectorAll('[aria-hidden="true"]')
      expect(iconContainers).toHaveLength(2)
    })
  })

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Input className="custom-class" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveClass('custom-class')
    })

    it('forwards additional props to input element', () => {
      render(<Input name="test-name" data-testid="input" />)
      
      const input = screen.getByTestId('input')
      expect(input).toHaveAttribute('name', 'test-name')
    })
  })
})
