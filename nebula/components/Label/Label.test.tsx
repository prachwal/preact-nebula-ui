import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Label } from './Label'

describe('Label', () => {
  it('renders with default props', () => {
    render(<Label data-testid="label">Test Label</Label>)
    
    const label = screen.getByTestId('label')
    expect(label).toBeInTheDocument()
    expect(label).toHaveTextContent('Test Label')
  })

  describe('Required indicator', () => {
    it('does not show required indicator by default', () => {
      render(<Label>Test Label</Label>)
      
      expect(screen.queryByText('*')).not.toBeInTheDocument()
    })

    it('shows required indicator when required is true', () => {
      render(<Label required>Test Label</Label>)
      
      const asterisk = screen.getByText('*')
      expect(asterisk).toBeInTheDocument()
      expect(asterisk).toHaveClass('text-red-500')
      expect(asterisk).toHaveAttribute('aria-label', 'required')
      expect(asterisk).toHaveAttribute('role', 'presentation')
    })
  })

  describe('Sizes', () => {
    it('renders small size correctly', () => {
      render(<Label size="sm" data-testid="label">Small Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('text-sm')
    })

    it('renders medium size correctly (default)', () => {
      render(<Label size="md" data-testid="label">Medium Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('text-base')
    })

    it('renders large size correctly', () => {
      render(<Label size="lg" data-testid="label">Large Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('text-lg')
    })
  })

  describe('States', () => {
    it('renders enabled state correctly (default)', () => {
      render(<Label data-testid="label">Enabled Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('text-gray-900')
      expect(label).not.toHaveClass('cursor-not-allowed')
    })

    it('renders disabled state correctly', () => {
      render(<Label disabled data-testid="label">Disabled Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('text-gray-400', 'cursor-not-allowed')
    })
  })

  describe('Form Association', () => {
    it('associates with form control using htmlFor', () => {
      render(<Label htmlFor="input-id" data-testid="label">Associated Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveAttribute('for', 'input-id')
    })

    it('works without htmlFor attribute', () => {
      render(<Label data-testid="label">Standalone Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).not.toHaveAttribute('for')
    })
  })

  describe('Content', () => {
    it('renders text content', () => {
      render(<Label>Simple text content</Label>)
      
      expect(screen.getByText('Simple text content')).toBeInTheDocument()
    })

    it('renders JSX content', () => {
      render(
        <Label>
          <span>Complex</span> <strong>content</strong>
        </Label>
      )
      
      expect(screen.getByText('Complex')).toBeInTheDocument()
      expect(screen.getByText('content')).toBeInTheDocument()
    })

    it('renders content with required indicator', () => {
      render(<Label required>Label with required</Label>)
      
      expect(screen.getByText('Label with required')).toBeInTheDocument()
      expect(screen.getByText('*')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('renders as label element', () => {
      render(<Label>Accessible Label</Label>)
      
      const label = screen.getByText('Accessible Label')
      expect(label.tagName).toBe('LABEL')
    })

    it('maintains proper accessibility with required indicator', () => {
      render(<Label required htmlFor="test-input">Required Field</Label>)
      
      const label = screen.getByText('Required Field')
      const asterisk = screen.getByText('*')
      
      expect(label).toHaveAttribute('for', 'test-input')
      expect(asterisk).toHaveAttribute('aria-label', 'required')
      expect(asterisk).toHaveAttribute('role', 'presentation')
    })
  })

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(<Label className="custom-class" data-testid="label">Custom Label</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveClass('custom-class')
    })

    it('forwards additional props to label element', () => {
      render(<Label title="Custom title" data-testid="label">Label with title</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toHaveAttribute('title', 'Custom title')
    })

    it('applies multiple classes correctly', () => {
      render(
        <Label 
          size="lg" 
          disabled 
          className="custom-class" 
          data-testid="label"
        >
          Complex Label
        </Label>
      )
      
      const label = screen.getByTestId('label')
      expect(label).toHaveClass(
        'block',
        'font-medium', 
        'leading-6',
        'text-lg',
        'text-gray-400',
        'cursor-not-allowed',
        'custom-class'
      )
    })
  })

  describe('Edge Cases', () => {
    it('handles empty string children', () => {
      render(<Label data-testid="label">{""}</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toBeInTheDocument()
    })

    it('handles boolean children', () => {
      render(<Label data-testid="label">{false}</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toBeInTheDocument()
    })

    it('handles null children', () => {
      render(<Label data-testid="label">{null}</Label>)
      
      const label = screen.getByTestId('label')
      expect(label).toBeInTheDocument()
    })

    it('combines required and disabled states', () => {
      render(<Label required disabled data-testid="label">Required Disabled</Label>)
      
      const label = screen.getByTestId('label')
      const asterisk = screen.getByText('*')
      
      expect(label).toHaveClass('text-gray-400', 'cursor-not-allowed')
      expect(asterisk).toBeInTheDocument()
      expect(asterisk).toHaveClass('text-red-500')
    })
  })
})
