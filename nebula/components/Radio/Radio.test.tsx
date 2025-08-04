import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { Radio, RadioGroup } from './index'

describe('Radio', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(<Radio value="test" />)
      expect(screen.getByRole('radio')).toBeInTheDocument()
    })

    it('renders with label', () => {
      render(<Radio value="test" label="Test option" />)
      expect(screen.getByLabelText('Test option')).toBeInTheDocument()
    })

    it('renders with children instead of label', () => {
      render(
        <Radio value="test">
          <span>Custom radio content</span>
        </Radio>
      )
      expect(screen.getByText('Custom radio content')).toBeInTheDocument()
    })

    it('renders with description', () => {
      render(
        <Radio 
          value="test" 
          label="Option" 
          description="This is a description" 
        />
      )
      const descriptions = screen.getAllByText('This is a description')
      expect(descriptions).toHaveLength(2) // One visible, one for screen readers
    })

    it('applies custom id', () => {
      render(<Radio value="test" id="custom-radio" label="Test" />)
      expect(screen.getByRole('radio')).toHaveAttribute('id', 'custom-radio')
    })

    it('generates unique id when not provided', () => {
      render(<Radio value="test" label="Test" />)
      const radio = screen.getByRole('radio')
      expect(radio).toHaveAttribute('id')
      expect(radio.id).toMatch(/^radio-/)
    })

    it('applies custom className', () => {
      render(<Radio value="test" data-testid="radio" className="custom-class" />)
      const container = screen.getByTestId('radio').closest('div')
      expect(container?.querySelector('.custom-class')).toBeInTheDocument()
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Radio value="test" size="sm" data-testid="radio" />)
      const radioDiv = screen.getByTestId('radio').closest('div')?.querySelector('[class*="w-4"]')
      expect(radioDiv).toBeInTheDocument()
    })

    it('applies medium size classes (default)', () => {
      render(<Radio value="test" data-testid="radio" />)
      const radioDiv = screen.getByTestId('radio').closest('div')?.querySelector('[class*="w-5"]')
      expect(radioDiv).toBeInTheDocument()
    })

    it('applies large size classes', () => {
      render(<Radio value="test" size="lg" data-testid="radio" />)
      const radioDiv = screen.getByTestId('radio').closest('div')?.querySelector('[class*="w-6"]')
      expect(radioDiv).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('applies default variant styles', () => {
      render(<Radio value="test" variant="default" data-testid="radio" />)
      const radioDiv = screen.getByTestId('radio').closest('div')?.querySelector('[class*="bg-white"]')
      expect(radioDiv).toBeInTheDocument()
    })

    it('applies outlined variant styles', () => {
      render(<Radio value="test" variant="outlined" data-testid="radio" />)
      const radioDiv = screen.getByTestId('radio').closest('div')?.querySelector('[class*="bg-transparent"]')
      expect(radioDiv).toBeInTheDocument()
    })
  })

  describe('States', () => {
    it('handles checked state', () => {
      render(<Radio value="test" checked />)
      expect(screen.getByRole('radio')).toBeChecked()
    })

    it('handles unchecked state', () => {
      render(<Radio value="test" checked={false} />)
      expect(screen.getByRole('radio')).not.toBeChecked()
    })

    it('handles disabled state', () => {
      render(<Radio value="test" disabled />)
      expect(screen.getByRole('radio')).toBeDisabled()
    })

    it('applies disabled styles to label', () => {
      render(<Radio value="test" disabled label="Disabled radio" />)
      const label = screen.getByText('Disabled radio')
      expect(label).toHaveClass('cursor-not-allowed')
    })
  })

  describe('Error State', () => {
    it('displays error message', () => {
      render(
        <Radio 
          value="test"
          error 
          errorMessage="This field is required" 
          label="Test"
        />
      )
      // Radio doesn't duplicate error messages like checkbox
      expect(screen.getByText('This field is required')).toBeInTheDocument()
    })

    it('applies error styles', () => {
      render(<Radio value="test" error data-testid="radio" />)
      const radioDiv = screen.getByTestId('radio').closest('div')?.querySelector('[class*="border-red"]')
      expect(radioDiv).toBeInTheDocument()
    })

    it('sets aria-invalid when error is true', () => {
      render(<Radio value="test" error />)
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'true')
    })

    it('does not set aria-invalid when error is false', () => {
      render(<Radio value="test" error={false} />)
      expect(screen.getByRole('radio')).toHaveAttribute('aria-invalid', 'false')
    })
  })

  describe('Label Position', () => {
    it('renders label on the right by default', () => {
      render(<Radio value="test" label="Right label" />)
      const container = screen.getByRole('radio').closest('div')
      expect(container).not.toHaveClass('flex-row-reverse')
    })

    it('renders label on the left when specified', () => {
      render(<Radio value="test" label="Left label" labelPosition="left" />)
      const outerContainer = screen.getByRole('radio').closest('div')?.parentElement
      expect(outerContainer).toHaveClass('flex-row-reverse')
    })
  })

  describe('Interactions', () => {
    it('calls onChange when clicked', async () => {
      const handleChange = vi.fn()
      render(<Radio value="test" onChange={handleChange} />)
      
      const radio = screen.getByRole('radio')
      await userEvent.click(radio)
      
      expect(handleChange).toHaveBeenCalledTimes(1)
    })

    it('calls onChange with correct event when clicked', async () => {
      const handleChange = vi.fn()
      render(<Radio value="test" onChange={handleChange} />)
      
      const radio = screen.getByRole('radio')
      await userEvent.click(radio)
      
      expect(handleChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({
            checked: true,
            value: 'test'
          })
        })
      )
    })

    it('does not trigger change when disabled', async () => {
      const handleChange = vi.fn()
      render(<Radio value="test" disabled onChange={handleChange} />)
      
      const radio = screen.getByRole('radio')
      await userEvent.click(radio)
      
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('can be clicked via label', async () => {
      const handleChange = vi.fn()
      render(<Radio value="test" onChange={handleChange} label="Click me" />)
      
      const label = screen.getByText('Click me')
      await userEvent.click(label)
      
      expect(handleChange).toHaveBeenCalledTimes(1)
    })
  })

  describe('Keyboard Navigation', () => {
    it('triggers click when space key is pressed', async () => {
      const handleChange = vi.fn()
      render(<Radio value="test" onChange={handleChange} />)
      
      const radio = screen.getByRole('radio')
      radio.focus()
      
      await userEvent.keyboard(' ')
      expect(handleChange).toHaveBeenCalled()
    })

    it('does not trigger on other keys', async () => {
      const handleChange = vi.fn()
      render(<Radio value="test" onChange={handleChange} />)
      
      const radio = screen.getByRole('radio')
      radio.focus()
      
      await userEvent.keyboard('{Enter}')
      expect(handleChange).not.toHaveBeenCalled()
      
      await userEvent.keyboard('{ArrowDown}')
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Radio value="test" />)
      const radio = screen.getByRole('radio')
      
      expect(radio).toHaveAttribute('type', 'radio')
      expect(radio).toHaveAttribute('value', 'test')
      expect(radio).toHaveAttribute('aria-invalid', 'false')
    })

    it('associates with description via aria-describedby', () => {
      render(
        <Radio 
          value="test"
          description="Helper text" 
          label="Test"
        />
      )
      
      const radio = screen.getByRole('radio')
      const descriptionId = radio.getAttribute('aria-describedby')
      
      expect(descriptionId).toBeTruthy()
      
      const screenReaderDescription = document.getElementById(descriptionId!)
      expect(screenReaderDescription).toBeInTheDocument()
      expect(screenReaderDescription).toHaveTextContent('Helper text')
    })

    it('has proper focus management', async () => {
      render(<Radio value="test" label="Focusable" />)
      
      const radio = screen.getByRole('radio')
      
      await userEvent.tab()
      expect(radio).toHaveFocus()
    })
  })

  describe('Form Integration', () => {
    it('works with form submission', () => {
      const handleSubmit = vi.fn((e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        return formData.get('test-radio')
      })

      render(
        <form onSubmit={handleSubmit}>
          <Radio name="test-radio" value="option1" />
          <Radio name="test-radio" value="option2" />
          <button type="submit">Submit</button>
        </form>
      )

      const firstRadio = screen.getAllByRole('radio')[0]
      const submitButton = screen.getByRole('button')

      // Test submission without selection
      fireEvent.click(submitButton)
      expect(handleSubmit).toHaveReturnedWith(null)

      // Test checked submission
      fireEvent.click(firstRadio)
      fireEvent.click(submitButton)
      expect(handleSubmit).toHaveReturnedWith('option1')
    })

    it('respects name attribute', () => {
      render(<Radio value="test" name="group1" />)
      expect(screen.getByRole('radio')).toHaveAttribute('name', 'group1')
    })
  })
})

describe('RadioGroup', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      expect(screen.getAllByRole('radio')).toHaveLength(2)
    })

    it('renders with label', () => {
      render(
        <RadioGroup name="test" label="Choose an option">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      expect(screen.getByText('Choose an option')).toBeInTheDocument()
    })

    it('renders with description', () => {
      render(
        <RadioGroup name="test" label="Options" description="Select one option">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      const descriptions = screen.getAllByText('Select one option')
      expect(descriptions).toHaveLength(2) // One visible, one for screen readers
    })

    it('applies custom id', () => {
      render(
        <RadioGroup name="test" id="custom-group">
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      )
      expect(document.getElementById('custom-group')).toBeInTheDocument()
    })
  })

  describe('Orientation', () => {
    it('applies vertical orientation by default', () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      const radioGroup = screen.getByRole('radiogroup')
      expect(radioGroup).toHaveClass('flex-col')
    })

    it('applies horizontal orientation when specified', () => {
      render(
        <RadioGroup name="test" orientation="horizontal">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      const radioGroup = screen.getByRole('radiogroup')
      expect(radioGroup).toHaveClass('flex-row')
    })
  })

  describe('Size inheritance', () => {
    it('passes size to all child radios', () => {
      render(
        <RadioGroup name="test" size="lg">
          <Radio value="option1" label="Option 1" data-testid="radio1" />
          <Radio value="option2" label="Option 2" data-testid="radio2" />
        </RadioGroup>
      )
      
      const radio1Div = screen.getByTestId('radio1').closest('div')?.querySelector('[class*="w-6"]')
      const radio2Div = screen.getByTestId('radio2').closest('div')?.querySelector('[class*="w-6"]')
      
      expect(radio1Div).toBeInTheDocument()
      expect(radio2Div).toBeInTheDocument()
    })
  })

  describe('Selection Management', () => {
    it('manages controlled selection', () => {
      const handleChange = vi.fn()
      render(
        <RadioGroup name="test" value="option2" onChange={handleChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      expect(screen.getByLabelText('Option 2')).toBeChecked()
      expect(screen.getByLabelText('Option 1')).not.toBeChecked()
    })

    it('manages uncontrolled selection with defaultValue', () => {
      render(
        <RadioGroup name="test" defaultValue="option1">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      expect(screen.getByLabelText('Option 1')).toBeChecked()
      expect(screen.getByLabelText('Option 2')).not.toBeChecked()
    })

    it('handles selection changes', async () => {
      const handleChange = vi.fn()
      render(
        <RadioGroup name="test" onChange={handleChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      await userEvent.click(screen.getByLabelText('Option 1'))
      
      expect(handleChange).toHaveBeenCalledWith('option1', expect.any(Object))
    })

    it('allows only one selection at a time', async () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      await userEvent.click(screen.getByLabelText('Option 1'))
      expect(screen.getByLabelText('Option 1')).toBeChecked()
      expect(screen.getByLabelText('Option 2')).not.toBeChecked()
      
      await userEvent.click(screen.getByLabelText('Option 2'))
      expect(screen.getByLabelText('Option 1')).not.toBeChecked()
      expect(screen.getByLabelText('Option 2')).toBeChecked()
    })
  })

  describe('Keyboard Navigation', () => {
    it('supports arrow key navigation', async () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      )

      const firstRadio = screen.getByLabelText('Option 1')
      firstRadio.focus()

      // Navigate down with arrow key
      await userEvent.keyboard('{ArrowDown}')
      expect(screen.getByLabelText('Option 2')).toBeChecked()

      // Navigate up with arrow key
      await userEvent.keyboard('{ArrowUp}')
      expect(screen.getByLabelText('Option 1')).toBeChecked()

      // Navigate to end with End key
      await userEvent.keyboard('{End}')
      expect(screen.getByLabelText('Option 3')).toBeChecked()

      // Navigate to start with Home key
      await userEvent.keyboard('{Home}')
      expect(screen.getByLabelText('Option 1')).toBeChecked()
    })

    it('wraps around when navigating past boundaries', async () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )

      const firstRadio = screen.getByLabelText('Option 1')
      firstRadio.focus()

      // Navigate up from first item (should wrap to last)
      await userEvent.keyboard('{ArrowUp}')
      expect(screen.getByLabelText('Option 2')).toBeChecked()

      // Navigate down from last item (should wrap to first)
      await userEvent.keyboard('{ArrowDown}')
      expect(screen.getByLabelText('Option 1')).toBeChecked()
    })

    it('skips disabled radios during navigation', async () => {
      render(
        <RadioGroup name="test">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" disabled />
          <Radio value="option3" label="Option 3" />
        </RadioGroup>
      )

      const firstRadio = screen.getByLabelText('Option 1')
      firstRadio.focus()

      // Navigate down - should skip disabled option
      await userEvent.keyboard('{ArrowDown}')
      expect(screen.getByLabelText('Option 3')).toBeChecked()
    })
  })

  describe('Error State', () => {
    it('displays error message', () => {
      render(
        <RadioGroup name="test" error errorMessage="Please select an option">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      expect(screen.getByRole('alert')).toHaveTextContent('Please select an option')
    })

    it('applies error styles to children', () => {
      render(
        <RadioGroup name="test" error>
          <Radio value="option1" label="Option 1" data-testid="radio1" />
        </RadioGroup>
      )
      
      const radioDiv = screen.getByTestId('radio1').closest('div')?.querySelector('[class*="border-red"]')
      expect(radioDiv).toBeInTheDocument()
    })
  })

  describe('Disabled State', () => {
    it('disables all child radios when group is disabled', () => {
      render(
        <RadioGroup name="test" disabled>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      expect(screen.getByLabelText('Option 1')).toBeDisabled()
      expect(screen.getByLabelText('Option 2')).toBeDisabled()
    })

    it('prevents keyboard navigation when disabled', async () => {
      const handleChange = vi.fn()
      render(
        <RadioGroup name="test" disabled onChange={handleChange}>
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )

      const firstRadio = screen.getByLabelText('Option 1')
      firstRadio.focus()

      await userEvent.keyboard('{ArrowDown}')
      // Should not trigger selection changes when disabled
      expect(handleChange).not.toHaveBeenCalled()
      expect(screen.getByLabelText('Option 2')).not.toBeChecked()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <RadioGroup name="test" label="Choose option">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      const fieldset = screen.getByRole('group')
      const radiogroup = screen.getByRole('radiogroup')
      
      expect(fieldset).toHaveAttribute('aria-invalid', 'false')
      expect(radiogroup).toBeInTheDocument()
    })

    it('associates with group description', () => {
      render(
        <RadioGroup name="test" label="Options" description="Select your preference">
          <Radio value="option1" label="Option 1" />
          <Radio value="option2" label="Option 2" />
        </RadioGroup>
      )
      
      const fieldset = screen.getByRole('group')
      const descriptionId = fieldset.getAttribute('aria-describedby')
      
      expect(descriptionId).toBeTruthy()
      
      const screenReaderDescription = document.getElementById(descriptionId!)
      expect(screenReaderDescription).toBeInTheDocument()
      expect(screenReaderDescription).toHaveTextContent('Select your preference')
    })

    it('sets aria-invalid when in error state', () => {
      render(
        <RadioGroup name="test" error>
          <Radio value="option1" label="Option 1" />
        </RadioGroup>
      )
      
      expect(screen.getByRole('group')).toHaveAttribute('aria-invalid', 'true')
    })
  })
})
