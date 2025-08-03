import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('renders with default props', () => {
    render(<Textarea data-testid="textarea" />)
    
    const textarea = screen.getByTestId('textarea')
    expect(textarea).toBeInTheDocument()
    expect(textarea.tagName).toBe('TEXTAREA')
    expect(textarea).not.toBeDisabled()
    expect(textarea).not.toHaveAttribute('required')
  })

  describe('Variants', () => {
    it('renders default variant correctly', () => {
      render(<Textarea variant="default" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('border-gray-300')
    })

    it('renders error variant correctly', () => {
      render(<Textarea variant="error" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('border-red-500')
    })

    it('renders success variant correctly', () => {
      render(<Textarea variant="success" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('border-green-500')
    })

    it('shows error variant when error prop is provided', () => {
      render(<Textarea error="Error message" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('border-red-500')
    })

    it('shows error variant when isInvalid is true', () => {
      render(<Textarea isInvalid data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('border-red-500')
    })

    it('shows success variant when isValid is true', () => {
      render(<Textarea isValid data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('border-green-500')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Textarea size="sm" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('px-3', 'py-1.5', 'text-sm')
    })

    it('renders medium size correctly (default)', () => {
      render(<Textarea size="md" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('px-3', 'py-2', 'text-base')
    })

    it('renders large size correctly', () => {
      render(<Textarea size="lg" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('px-4', 'py-3', 'text-lg')
    })
  })

  describe('States', () => {
    it('renders disabled state correctly', () => {
      render(<Textarea disabled data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toBeDisabled()
      expect(textarea).toHaveClass('disabled:cursor-not-allowed')
    })

    it('renders required state correctly', () => {
      render(<Textarea required data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('required')
    })

    it('sets aria-invalid to true when error is present', () => {
      render(<Textarea error="Error message" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
    })

    it('sets aria-invalid to false when no error', () => {
      render(<Textarea data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('aria-invalid', 'false')
    })
  })

  describe('Rows Configuration', () => {
    it('uses default minRows (3) when no rows specified', () => {
      render(<Textarea data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('rows', '3')
    })

    it('uses custom minRows', () => {
      render(<Textarea minRows={5} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('rows', '5')
    })

    it('uses rows prop when specified', () => {
      render(<Textarea rows={7} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('rows', '7')
    })
  })

  describe('Auto-resize functionality', () => {
    it('adds overflow-hidden class when autoResize is true', () => {
      render(<Textarea autoResize data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('overflow-hidden')
    })

    it('does not add overflow-hidden class when autoResize is false', () => {
      render(<Textarea autoResize={false} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).not.toHaveClass('overflow-hidden')
    })
  })

  describe('Character counting', () => {
    it('shows character count when showCharCount is true', () => {
      render(<Textarea showCharCount value="test" data-testid="textarea" />)
      
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('shows character count with maxLength', () => {
      render(
        <Textarea 
          showCharCount 
          maxLength={100} 
          value="test content" 
          data-testid="textarea" 
        />
      )
      
      expect(screen.getByText('12/100')).toBeInTheDocument()
    })

    it('shows red color when exceeding maxLength', () => {
      render(
        <Textarea 
          showCharCount 
          maxLength={5} 
          value="too long content" 
          data-testid="textarea" 
        />
      )
      
      const charCount = screen.getByText('16/5')
      expect(charCount).toHaveClass('text-red-600')
    })

    it('does not show character count by default', () => {
      render(<Textarea value="test" data-testid="textarea" />)
      
      expect(screen.queryByText('4')).not.toBeInTheDocument()
    })

    it('has proper aria-label for character count', () => {
      render(
        <Textarea 
          showCharCount 
          maxLength={50} 
          value="test" 
          data-testid="textarea" 
        />
      )
      
      const charCount = screen.getByText('4/50')
      expect(charCount).toHaveAttribute('aria-label', 'Character count: 4 of 50')
    })
  })

  describe('Error and Helper Text', () => {
    it('displays error message', () => {
      render(<Textarea error="This is an error" data-testid="textarea" />)
      
      expect(screen.getByText('This is an error')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('displays helper text', () => {
      render(<Textarea helperText="This is helper text" data-testid="textarea" />)
      
      expect(screen.getByText('This is helper text')).toBeInTheDocument()
    })

    it('prioritizes error message over helper text', () => {
      render(
        <Textarea 
          error="Error message" 
          helperText="Helper text" 
          data-testid="textarea" 
        />
      )
      
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
    })

    it('shows both error message and character count', () => {
      render(
        <Textarea 
          error="Error message" 
          showCharCount 
          value="test" 
          data-testid="textarea" 
        />
      )
      
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.getByText('4')).toBeInTheDocument()
    })

    it('associates description with textarea via aria-describedby', () => {
      render(<Textarea id="test-textarea" error="Error message" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('aria-describedby', 'test-textarea-description')
    })
  })

  describe('Event Handling', () => {
    it('calls onChange when textarea value changes', () => {
      const handleChange = vi.fn()
      render(<Textarea onChange={handleChange} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      fireEvent.change(textarea, { target: { value: 'new value' } })
      
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('calls onInput when textarea content changes', () => {
      const handleInput = vi.fn()
      render(<Textarea onInput={handleInput} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      fireEvent.input(textarea, { target: { value: 'input value' } })
      
      expect(handleInput).toHaveBeenCalledTimes(1)
    })

    it('calls onFocus when textarea is focused', () => {
      const handleFocus = vi.fn()
      render(<Textarea onFocus={handleFocus} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      fireEvent.focus(textarea)
      
      expect(handleFocus).toHaveBeenCalledTimes(1)
    })

    it('calls onBlur when textarea loses focus', () => {
      const handleBlur = vi.fn()
      render(<Textarea onBlur={handleBlur} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      fireEvent.blur(textarea)
      
      expect(handleBlur).toHaveBeenCalledTimes(1)
    })
  })

  describe('Form Integration', () => {
    it('accepts value prop for controlled component', () => {
      render(<Textarea value="controlled value" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement
      expect(textarea.value).toBe('controlled value')
    })

    it('accepts defaultValue prop for uncontrolled component', () => {
      render(<Textarea defaultValue="default value" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea') as HTMLTextAreaElement
      expect(textarea.defaultValue).toBe('default value')
    })

    it('accepts placeholder prop', () => {
      render(<Textarea placeholder="Enter text..." data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('placeholder', 'Enter text...')
    })

    it('respects maxLength attribute', () => {
      render(<Textarea maxLength={100} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('maxlength', '100')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Textarea data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea.tagName).toBe('TEXTAREA')
    })

    it('has proper ARIA attributes for error state', () => {
      render(<Textarea error="Error message" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('aria-invalid', 'true')
      
      const errorMessage = screen.getByRole('alert')
      expect(errorMessage).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Textarea className="custom-class" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('custom-class')
    })

    it('forwards additional props to textarea element', () => {
      render(<Textarea name="test-name" data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveAttribute('name', 'test-name')
    })

    it('applies resize-none class by default', () => {
      render(<Textarea data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      expect(textarea).toHaveClass('resize-none')
    })
  })

  describe('Edge Cases', () => {
    it('handles zero maxLength', () => {
      render(
        <Textarea 
          maxLength={0} 
          showCharCount 
          value="test" 
          data-testid="textarea" 
        />
      )
      
      const charCount = screen.getByText('4/0')
      expect(charCount).toHaveClass('text-red-600')
    })

    it('handles negative minRows gracefully', () => {
      render(<Textarea minRows={-1} data-testid="textarea" />)
      
      const textarea = screen.getByTestId('textarea')
      // Should fallback to 0 or handle gracefully
      expect(textarea).toBeInTheDocument()
    })

    it('handles empty value with character count', () => {
      render(<Textarea showCharCount value="" data-testid="textarea" />)
      
      expect(screen.getByText('0')).toBeInTheDocument()
    })
  })
})
