import {render, screen, fireEvent, cleanup} from '@testing-library/preact'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {Switch} from './Switch'

describe('Switch Component', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Basic Functionality', () => {
    it('renders without crashing', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toBeInTheDocument()
    })

    it('renders with default props', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
      expect(switchElement).not.toHaveAttribute('aria-disabled')
    })

    it('renders with label', () => {
      render(<Switch label="Enable notifications" />)
      const label = screen.getByText('Enable notifications')
      expect(label).toBeInTheDocument()
    })

    it('renders with children instead of label', () => {
      render(<Switch>Custom content</Switch>)
      const content = screen.getByText('Custom content')
      expect(content).toBeInTheDocument()
    })

    it('renders with description', () => {
      render(<Switch label="Switch" description="This is a description" />)
      const description = screen.getByText('This is a description')
      expect(description).toBeInTheDocument()
    })
  })

  describe('Controlled Mode', () => {
    it('respects controlled checked prop', () => {
      render(<Switch checked={true} />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveAttribute('aria-checked', 'true')
    })

    it('calls onChange when clicked in controlled mode', () => {
      const handleChange = vi.fn()
      render(<Switch checked={false} onChange={handleChange} />)
      
      const switchElement = screen.getByRole('button')
      fireEvent.click(switchElement)
      
      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Event))
    })

    it('does not change state internally when controlled', () => {
      const handleChange = vi.fn()
      render(<Switch checked={false} onChange={handleChange} />)
      
      const switchElement = screen.getByRole('button')
      fireEvent.click(switchElement)
      
      // Should still be false as it's controlled
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
    })
  })

  describe('Uncontrolled Mode', () => {
    it('manages its own state when uncontrolled', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('button')
      
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
      
      fireEvent.click(switchElement)
      expect(switchElement).toHaveAttribute('aria-checked', 'true')
      
      fireEvent.click(switchElement)
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
    })

    it('calls onChange in uncontrolled mode', () => {
      const handleChange = vi.fn()
      render(<Switch onChange={handleChange} />)
      
      const switchElement = screen.getByRole('button')
      fireEvent.click(switchElement)
      
      expect(handleChange).toHaveBeenCalledWith(true, expect.any(Event))
    })
  })

  describe('Disabled State', () => {
    it('renders as disabled when disabled prop is true', () => {
      render(<Switch disabled />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveAttribute('aria-disabled', 'true')
    })

    it('does not respond to clicks when disabled', () => {
      const handleChange = vi.fn()
      render(<Switch disabled onChange={handleChange} />)
      
      const switchElement = screen.getByRole('button')
      fireEvent.click(switchElement)
      
      expect(handleChange).not.toHaveBeenCalled()
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
    })

    it('has disabled styling when disabled', () => {
      render(<Switch disabled />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('opacity-50', 'cursor-not-allowed')
    })

    it('makes label non-clickable when disabled', () => {
      const handleChange = vi.fn()
      render(<Switch disabled label="Disabled switch" onChange={handleChange} />)
      
      const label = screen.getByText('Disabled switch')
      fireEvent.click(label)
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      render(<Switch size="sm" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('h-4', 'w-7')
    })

    it('applies medium size classes (default)', () => {
      render(<Switch size="md" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('h-5', 'w-9')
    })

    it('applies large size classes', () => {
      render(<Switch size="lg" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('h-6', 'w-11')
    })
  })

  describe('Color Variants', () => {
    it('applies primary color when checked', () => {
      render(<Switch checked color="primary" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('bg-blue-600')
    })

    it('applies secondary color when checked', () => {
      render(<Switch checked color="secondary" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('bg-gray-600')
    })

    it('applies success color when checked', () => {
      render(<Switch checked color="success" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('bg-green-600')
    })

    it('applies warning color when checked', () => {
      render(<Switch checked color="warning" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('bg-yellow-600')
    })

    it('applies error color when checked', () => {
      render(<Switch checked color="error" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('bg-red-600')
    })
  })

  describe('Label Position', () => {
    it('positions label on the right by default', () => {
      render(<Switch label="Right label" />)
      const container = screen.getByText('Right label').closest('div')?.parentElement
      expect(container).toHaveClass('flex-row')
    })

    it('positions label on the left when specified', () => {
      render(<Switch label="Left label" labelPosition="left" />)
      const container = screen.getByText('Left label').closest('div')?.parentElement
      expect(container).toHaveClass('flex-row-reverse')
    })
  })

  describe('Icons', () => {
    it('renders checked icon when checked', () => {
      render(
        <Switch 
          checked 
          icons={{
            checked: <span data-testid="checked-icon">✓</span>,
            unchecked: <span data-testid="unchecked-icon">✗</span>
          }} 
        />
      )
      expect(screen.getByTestId('checked-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('unchecked-icon')).not.toBeInTheDocument()
    })

    it('renders unchecked icon when unchecked', () => {
      render(
        <Switch 
          checked={false}
          icons={{
            checked: <span data-testid="checked-icon">✓</span>,
            unchecked: <span data-testid="unchecked-icon">✗</span>
          }} 
        />
      )
      expect(screen.getByTestId('unchecked-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('checked-icon')).not.toBeInTheDocument()
    })
  })

  describe('Error States', () => {
    it('displays error message when error is true', () => {
      render(<Switch error errorMessage="This field is required" />)
      const errorMessage = screen.getByText('This field is required')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveClass('text-red-600')
    })

    it('applies error styling to switch when error is true', () => {
      render(<Switch error />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('ring-2', 'ring-red-500')
    })

    it('applies error styling to label when error is true', () => {
      render(<Switch error label="Error switch" />)
      const label = screen.getByText('Error switch')
      expect(label).toHaveClass('text-red-600')
    })

    it('prioritizes error message over description', () => {
      render(
        <Switch 
          error 
          description="Normal description" 
          errorMessage="Error message" 
        />
      )
      expect(screen.getByText('Error message')).toBeInTheDocument()
      expect(screen.queryByText('Normal description')).not.toBeInTheDocument()
    })
  })

  describe('Form Integration', () => {
    it('renders hidden checkbox input for form integration', () => {
      render(<Switch name="agreement" value="yes" />)
      const input = document.querySelector('input[type="checkbox"]')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('name', 'agreement')
      expect(input).toHaveAttribute('value', 'yes')
    })

    it('updates hidden input when switch state changes', () => {
      render(<Switch name="toggle" />)
      const input = document.querySelector('input[type="checkbox"]') as HTMLInputElement
      const switchElement = screen.getByRole('button')
      
      expect(input.checked).toBe(false)
      
      fireEvent.click(switchElement)
      expect(input.checked).toBe(true)
    })

    it('passes through additional props to input', () => {
      render(<Switch data-testid="custom-switch" />)
      const input = document.querySelector('input[type="checkbox"]')
      expect(input).toHaveAttribute('data-testid', 'custom-switch')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
      expect(switchElement).toHaveAttribute('tabIndex', '0')
    })

    it('associates description with switch using aria-describedby', () => {
      render(<Switch name="test" description="Test description" />)
      const input = document.querySelector('input[type="checkbox"]')
      expect(input).toHaveAttribute('aria-describedby', 'switch-test-description')
    })

    it('associates error message with switch using aria-describedby', () => {
      render(<Switch name="test" error errorMessage="Error message" />)
      const input = document.querySelector('input[type="checkbox"]')
      expect(input).toHaveAttribute('aria-describedby', 'switch-test-description')
    })

    it('hides input from screen readers with sr-only class', () => {
      render(<Switch />)
      const input = document.querySelector('input[type="checkbox"]')
      expect(input).toHaveClass('sr-only')
    })

    it('is keyboard accessible', () => {
      const handleChange = vi.fn()
      render(<Switch onChange={handleChange} />)
      
      const input = document.querySelector('input[type="checkbox"]') as HTMLInputElement
      input.focus()
      
      fireEvent.keyDown(input, { key: ' ', code: 'Space' })
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe('Click Handlers', () => {
    it('clicking the switch element toggles state', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('button')
      
      fireEvent.click(switchElement)
      expect(switchElement).toHaveAttribute('aria-checked', 'true')
    })

    it('clicking the label toggles state', () => {
      render(<Switch label="Click me" />)
      const label = screen.getByText('Click me')
      const switchElement = screen.getByRole('button')
      
      fireEvent.click(label)
      expect(switchElement).toHaveAttribute('aria-checked', 'true')
    })

    it('does not toggle when clicking label of disabled switch', () => {
      render(<Switch disabled label="Disabled" />)
      const label = screen.getByText('Disabled')
      const switchElement = screen.getByRole('button')
      
      fireEvent.click(label)
      expect(switchElement).toHaveAttribute('aria-checked', 'false')
    })
  })

  describe('Custom Styling', () => {
    it('applies custom className', () => {
      render(<Switch className="custom-class" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('custom-class')
    })

    it('merges custom className with default classes', () => {
      render(<Switch className="custom-class" />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toHaveClass('custom-class', 'relative', 'inline-flex')
    })
  })

  describe('Edge Cases', () => {
    it('handles missing onChange gracefully', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('button')
      
      expect(() => {
        fireEvent.click(switchElement)
      }).not.toThrow()
    })

    it('handles undefined name gracefully', () => {
      render(<Switch description="Test" />)
      const input = document.querySelector('input[type="checkbox"]')
      expect(input).toHaveAttribute('aria-describedby', 'switch-default-description')
    })

    it('renders without any content', () => {
      render(<Switch />)
      const switchElement = screen.getByRole('button')
      expect(switchElement).toBeInTheDocument()
    })

    it('handles rapid clicking', () => {
      const handleChange = vi.fn()
      render(<Switch onChange={handleChange} />)
      const switchElement = screen.getByRole('button')
      
      fireEvent.click(switchElement)
      fireEvent.click(switchElement)
      fireEvent.click(switchElement)
      
      expect(handleChange).toHaveBeenCalledTimes(3)
    })
  })
})
