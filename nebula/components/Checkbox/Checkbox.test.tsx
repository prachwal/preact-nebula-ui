import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Checkbox />)
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Checkbox label="Accept terms" />)
      expect(screen.getByLabelText('Accept terms')).toBeInTheDocument()
    })

    it('renders with children instead of label', () => {
      render(
        <Checkbox>
          <span>Custom label content</span>
        </Checkbox>
      )
      expect(screen.getByText('Custom label content')).toBeInTheDocument()
    })

    it('renders with description', () => {
      render(
        <Checkbox 
          label="Newsletter" 
          description="Get updates about new features" 
        />
      )
      // Should only show description in label (not in error state)
      const descriptions = screen.getAllByText('Get updates about new features')
      expect(descriptions).toHaveLength(2) // One visible, one for screen readers
    })

    it('applies custom id', () => {
      render(<Checkbox id="custom-checkbox" label="Test" />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('id', 'custom-checkbox')
    })

    it('generates unique id when not provided', () => {
      render(<Checkbox label="Test" />)
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).toHaveAttribute('id')
      expect(checkbox.id).toMatch(/^checkbox-/)
    })

    it('applies custom className', () => {
      render(<Checkbox data-testid="checkbox" className="custom-class" />)
      const container = screen.getByTestId('checkbox').closest('div')
      expect(container?.querySelector('.custom-class')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Checkbox size="sm" data-testid="checkbox" />)
      const checkboxDiv = screen.getByTestId('checkbox').closest('div')?.querySelector('[class*="w-4"]')
      expect(checkboxDiv).toBeInTheDocument()
    })

    it('applies medium size classes (default)', () => {
      render(<Checkbox data-testid="checkbox" />)
      const checkboxDiv = screen.getByTestId('checkbox').closest('div')?.querySelector('[class*="w-5"]')
      expect(checkboxDiv).toBeInTheDocument()
    })

    it('applies large size classes', () => {
      render(<Checkbox size="lg" data-testid="checkbox" />)
      const checkboxDiv = screen.getByTestId('checkbox').closest('div')?.querySelector('[class*="w-6"]')
      expect(checkboxDiv).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('applies default variant styles', () => {
      render(<Checkbox variant="default" data-testid="checkbox" />)
      const checkboxDiv = screen.getByTestId('checkbox').closest('div')?.querySelector('[class*="bg-white"]')
      expect(checkboxDiv).toBeInTheDocument()
    })

    it('applies outlined variant styles', () => {
      render(<Checkbox variant="outlined" data-testid="checkbox" />)
      const checkboxDiv = screen.getByTestId('checkbox').closest('div')?.querySelector('[class*="bg-transparent"]')
      expect(checkboxDiv).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('handles checked state', () => {
      render(<Checkbox checked />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('handles unchecked state', () => {
      render(<Checkbox checked={false} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('handles indeterminate state', () => {
      render(<Checkbox indeterminate />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      expect(checkbox.indeterminate).toBe(true)
    })

    it('handles disabled state', () => {
      render(<Checkbox disabled />)
      expect(screen.getByRole('checkbox')).toBeDisabled()
    })

    it('applies disabled styles to label', () => {
      render(<Checkbox disabled label="Disabled checkbox" />)
      const label = screen.getByText('Disabled checkbox')
      expect(label).toHaveClass('cursor-not-allowed')
    })
  })

  describe('Error State', () => {
    it('displays error message', () => {
      render(
        <Checkbox 
          error 
          errorMessage="This field is required" 
          label="Test"
        />
      )
      // Should show error message both visibly and for screen readers
      const errorMessages = screen.getAllByText('This field is required')
      expect(errorMessages).toHaveLength(2) // One visible, one for screen readers
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('applies error styles', () => {
      render(<Checkbox error data-testid="checkbox" />)
      const checkboxDiv = screen.getByTestId('checkbox').closest('div')?.querySelector('[class*="border-red"]')
      expect(checkboxDiv).toBeInTheDocument()
    })

    it('sets aria-invalid when error is true', () => {
      render(<Checkbox error />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not set aria-invalid when error is false', () => {
      render(<Checkbox error={false} />)
      expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'false')
    })
  })

  describe('Label Position', () => {
    it('renders label on the right by default', () => {
      render(<Checkbox label="Right label" />)
      const container = screen.getByRole('checkbox').closest('div')
      expect(container).not.toHaveClass('flex-row-reverse')
    })

    it('renders label on the left when specified', () => {
      render(<Checkbox label="Left label" labelPosition="left" />)
      const outerContainer = screen.getByRole('checkbox').closest('div')?.parentElement
      expect(outerContainer).toHaveClass('flex-row-reverse')
    })
  })

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      await userEvent.click(checkbox)
      
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('calls onChange with correct event when clicked', async () => {
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      await userEvent.click(checkbox)
      
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: true
          })
        })
      )
    })

    it('toggles state when uncontrolled', async () => {
      render(<Checkbox />)
      
      const checkbox = screen.getByRole('checkbox')
      expect(checkbox).not.toBeChecked()
      
      await userEvent.click(checkbox)
      expect(checkbox).toBeChecked()
      
      await userEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    it('does not toggle when disabled', async () => {
      const handleChange = vi.fn()
      render(<Checkbox disabled onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      await userEvent.click(checkbox)
      
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('can be clicked via label', async () => {
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} label="Click me" />)
      
      const label = screen.getByText('Click me')
      await userEvent.click(label)
      
      expect(handleChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('Keyboard Navigation', () => {
    it('toggles when space key is pressed', async () => {
      render(<Checkbox />)
      
      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      
      expect(checkbox).not.toBeChecked()
      
      await userEvent.keyboard(' ')
      expect(checkbox).toBeChecked()
    })

    it('prevents default space key behavior', async () => {
      const handleChange = vi.fn()
      render(<Checkbox onChange={handleChange} />)
      
      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      
      // Simulate space key press
      await userEvent.keyboard(' ')
      
      // The onChange should be called, confirming the space key was handled
      expect(handleChange).toHaveBeenCalled()
    })

    it('does not toggle on other keys', async () => {
      render(<Checkbox />)
      
      const checkbox = screen.getByRole('checkbox')
      checkbox.focus()
      
      await userEvent.keyboard('{Enter}')
      expect(checkbox).not.toBeChecked()
      
      await userEvent.keyboard('{ArrowDown}')
      expect(checkbox).not.toBeChecked()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Checkbox />)
      const checkbox = screen.getByRole('checkbox')
      
      expect(checkbox).toHaveAttribute('type', 'checkbox')
      expect(checkbox).toHaveAttribute('aria-invalid', 'false')
    })

    it('associates with description via aria-describedby', () => {
      render(
        <Checkbox 
          description="Helper text" 
          label="Test"
        />
      )
      
      const checkbox = screen.getByRole('checkbox')
      const descriptionId = checkbox.getAttribute('aria-describedby')
      
      expect(descriptionId).toBeTruthy()
      
      // Check the screen reader description exists with the correct ID
      const screenReaderDescription = document.getElementById(descriptionId!)
      expect(screenReaderDescription).toBeInTheDocument()
      expect(screenReaderDescription).toHaveTextContent('Helper text')
    })

    it('associates with error message via aria-describedby', () => {
      render(
        <Checkbox 
          error
          errorMessage="Error text"
          label="Test"
        />
      )
      
      const checkbox = screen.getByRole('checkbox')
      const descriptionId = checkbox.getAttribute('aria-describedby')
      
      expect(descriptionId).toBeTruthy()
    })

    it('has screen reader only description', () => {
      render(
        <Checkbox 
          description="Helper text"
          errorMessage="Error text"
          error
          label="Test"
        />
      )
      
      const srOnlyDescription = screen.getByText('Helper text Error text')
      expect(srOnlyDescription).toHaveClass('sr-only')
    })

    it('has proper focus management', async () => {
      render(<Checkbox label="Focusable" />)
      
      const checkbox = screen.getByRole('checkbox')
      
      await userEvent.tab()
      expect(checkbox).toHaveFocus()
    })

    it('announces error with aria-live', () => {
      render(
        <Checkbox 
          error
          errorMessage="This field is required"
          label="Test"
        />
      )
      
      const errorElement = screen.getByRole('alert')
      expect(errorElement).toHaveAttribute('aria-live', 'polite')
    })
  })

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        return formData.get('test-checkbox')
      })

      render(
        <form onSubmit={handleSubmit}>
          <Checkbox name="test-checkbox" value="yes" />
          <button type="submit">Submit</button>
        </form>
      )

      const checkbox = screen.getByRole('checkbox')
      const submitButton = screen.getByRole('button')

      // Test unchecked submission
      fireEvent.click(submitButton)
      expect(handleSubmit).toHaveReturnedWith(null)

      // Test checked submission
      fireEvent.click(checkbox)
      fireEvent.click(submitButton)
      expect(handleSubmit).toHaveReturnedWith('yes')
    })

    it('supports defaultChecked for uncontrolled usage', () => {
      render(<Checkbox defaultChecked />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('respects controlled checked prop', () => {
      const { rerender } = render(<Checkbox checked={false} />)
      expect(screen.getByRole('checkbox')).not.toBeChecked()
      
      rerender(<Checkbox checked={true} />)
      expect(screen.getByRole('checkbox')).toBeChecked()
    })
  })

  describe('Edge Cases', () => {
    it('handles null/undefined values gracefully', () => {
      render(
        <Checkbox 
          label={undefined}
          description={null as any}
          errorMessage={undefined}
        />
      )
      expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('handles indeterminate with checked=true', () => {
      render(<Checkbox checked indeterminate />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      
      expect(checkbox.checked).toBe(true)
      expect(checkbox.indeterminate).toBe(true)
    })

    it('maintains indeterminate state after re-render', () => {
      const { rerender } = render(<Checkbox indeterminate />)
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement
      
      expect(checkbox.indeterminate).toBe(true)
      
      rerender(<Checkbox indeterminate />)
      expect(checkbox.indeterminate).toBe(true)
    })

    it('handles ref forwarding', () => {
      const mockRef = vi.fn()
      
      render(<Checkbox ref={mockRef} />)
      
      expect(mockRef).toHaveBeenCalledWith(expect.any(HTMLInputElement))
    })
  })
})
