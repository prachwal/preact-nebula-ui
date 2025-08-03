import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { FieldError } from './FieldError'

describe('FieldError', () => {
  it('renders error message correctly', () => {
    render(<FieldError data-testid="field-error">This is an error</FieldError>)
    
    const errorElement = screen.getByTestId('field-error')
    expect(errorElement).toBeInTheDocument()
    expect(errorElement).toHaveTextContent('This is an error')
  })

  describe('Rendering behavior', () => {
    it('does not render when children is null', () => {
      render(<FieldError data-testid="field-error">{null}</FieldError>)
      
      expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
    })

    it('does not render when children is undefined', () => {
      render(<FieldError data-testid="field-error">{undefined}</FieldError>)
      
      expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
    })

    it('does not render when children is empty string', () => {
      render(<FieldError data-testid="field-error">{""}</FieldError>)
      
      expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
    })

    it('does not render when children is false', () => {
      render(<FieldError data-testid="field-error">{false}</FieldError>)
      
      expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
    })

    it('renders when children is 0', () => {
      render(<FieldError data-testid="field-error">{0}</FieldError>)
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toBeInTheDocument()
      expect(errorElement).toHaveTextContent('0')
    })

    it('renders when children is whitespace', () => {
      render(<FieldError data-testid="field-error">{" "}</FieldError>)
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toBeInTheDocument()
      expect(errorElement.innerHTML).toBe(' ')
    })
  })

  describe('Styling', () => {
    it('applies correct default classes', () => {
      render(<FieldError data-testid="field-error">Error message</FieldError>)
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toHaveClass('mt-1', 'text-sm', 'text-red-600')
    })

    it('accepts custom className', () => {
      render(
        <FieldError className="custom-error-class" data-testid="field-error">
          Custom error
        </FieldError>
      )
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toHaveClass('custom-error-class')
      expect(errorElement).toHaveClass('mt-1', 'text-sm', 'text-red-600') // Still has defaults
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA role', () => {
      render(<FieldError data-testid="field-error">Accessible error</FieldError>)
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toHaveAttribute('role', 'alert')
    })

    it('has proper aria-live attribute', () => {
      render(<FieldError data-testid="field-error">Live error</FieldError>)
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toHaveAttribute('aria-live', 'polite')
    })

    it('can be associated with form controls via id', () => {
      render(<FieldError id="input-error" data-testid="field-error">Error for input</FieldError>)
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toHaveAttribute('id', 'input-error')
    })
  })

  describe('Content types', () => {
    it('renders text content', () => {
      render(<FieldError data-testid="field-error">Simple text error</FieldError>)
      
      expect(screen.getByText('Simple text error')).toBeInTheDocument()
    })

    it('renders JSX content', () => {
      render(
        <FieldError data-testid="field-error">
          <span>Complex</span> <strong>error message</strong>
        </FieldError>
      )
      
      expect(screen.getByText('Complex')).toBeInTheDocument()
      expect(screen.getByText('error message')).toBeInTheDocument()
    })

    it('renders multiple children', () => {
      render(
        <FieldError data-testid="field-error">
          Error: <span>Field is required</span>
        </FieldError>
      )
      
      expect(screen.getByText('Error:')).toBeInTheDocument()
      expect(screen.getByText('Field is required')).toBeInTheDocument()
    })

    it('renders numeric content', () => {
      render(<FieldError data-testid="field-error">{42}</FieldError>)
      
      expect(screen.getByText('42')).toBeInTheDocument()
    })
  })

  describe('Props forwarding', () => {
    it('forwards additional props to div element', () => {
      render(
        <FieldError 
          title="Error tooltip" 
          data-custom="custom-value"
          data-testid="field-error"
        >
          Error with props
        </FieldError>
      )
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toHaveAttribute('title', 'Error tooltip')
      expect(errorElement).toHaveAttribute('data-custom', 'custom-value')
    })

    it('overrides default attributes when provided', () => {
      render(
        <FieldError 
          role="status" 
          aria-live="assertive"
          data-testid="field-error"
        >
          Custom attributes error
        </FieldError>
      )
      
      const errorElement = screen.getByTestId('field-error')
      expect(errorElement).toHaveAttribute('role', 'status')
      expect(errorElement).toHaveAttribute('aria-live', 'assertive')
    })
  })

  describe('Display name', () => {
    it('has correct display name', () => {
      expect(FieldError.displayName).toBe('FieldError')
    })
  })

  describe('Integration scenarios', () => {
    it('works with form field association', () => {
      render(
        <div>
          <input aria-describedby="field-error-1" />
          <FieldError id="field-error-1" data-testid="field-error">
            Field validation error
          </FieldError>
        </div>
      )
      
      const input = screen.getByRole('textbox')
      const error = screen.getByTestId('field-error')
      
      expect(input).toHaveAttribute('aria-describedby', 'field-error-1')
      expect(error).toHaveAttribute('id', 'field-error-1')
    })

    it('can be conditionally rendered', () => {
      const { rerender } = render(
        <FieldError data-testid="field-error">
          {false && 'Hidden error'}
        </FieldError>
      )
      
      expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
      
      rerender(
        <FieldError data-testid="field-error">
          {true && 'Visible error'}
        </FieldError>
      )
      
      expect(screen.getByTestId('field-error')).toBeInTheDocument()
      expect(screen.getByText('Visible error')).toBeInTheDocument()
    })
  })
})
