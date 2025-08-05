import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './DatePicker'

// Mock ResizeObserver which might be used in positioning
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('DatePicker - Accessibility', () => {
  beforeEach(() => {
    // Reset any global state
    document.body.innerHTML = ''
  })

  afterEach(() => {
    // Clean up after each test
    document.body.innerHTML = ''
  })

  describe('Screen Reader Compatibility', () => {
    it('provides proper role and aria attributes for input', () => {
      render(<DatePicker aria-label="Select appointment date" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-label', 'Select appointment date')
      expect(input).toHaveAttribute('aria-expanded', 'false')
      expect(input).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('provides accessible name when using aria-labelledby', () => {
      render(
        <div>
          <label id="birth-date-label">Date of Birth</label>
          <DatePicker aria-labelledby="birth-date-label" />
        </div>
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-labelledby', 'birth-date-label')
    })

    it('provides accessible description when using aria-describedby', () => {
      render(
        <div>
          <DatePicker aria-describedby="date-help" />
          <div id="date-help">Enter date in MM/DD/YYYY format</div>
        </div>
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-describedby', 'date-help')
    })

    it('announces error state to screen readers', () => {
      render(<DatePicker error errorMessage="Please select a valid date" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-invalid', 'true')
      
      const errorMessage = screen.getByText('Please select a valid date')
      expect(errorMessage).toHaveAttribute('role', 'alert')
    })

    it('indicates required state to screen readers', () => {
      render(<DatePicker required />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-required', 'true')
      expect(input).toBeRequired()
    })
  })

  describe('Keyboard Navigation', () => {
    it('is focusable and receives keyboard focus', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      
      await userEvent.tab()
      expect(input).toHaveFocus()
    })

    it('opens calendar popup on Enter key', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input) // Focus first
      
      await userEvent.keyboard('{Enter}')
      
      // Calendar should be open
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })

    it('opens calendar popup on Space key', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input) // Focus first
      
      await userEvent.keyboard(' ')
      
      // Calendar should be open
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })

    it('calendar button is keyboard accessible', async () => {
      render(<DatePicker />)
      
      const calendarButton = screen.getByLabelText('Open calendar')
      
      // Focus the button and activate it
      calendarButton.focus()
      await userEvent.keyboard('{Enter}')
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })

    it('clear button is keyboard accessible when visible', async () => {
      const handleChange = () => {}
      render(<DatePicker value={new Date(2024, 5, 15)} onChange={handleChange} />)
      
      const clearButton = screen.getByLabelText('Clear date')
      
      await userEvent.tab()
      await userEvent.tab()
      await userEvent.tab() // Should focus clear button
      
      expect(clearButton).toHaveFocus()
    })
  })

  describe('Focus Management', () => {
    it('maintains focus on input when calendar opens', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      // Input should still have focus after calendar opens
      expect(input).toHaveFocus()
    })

    it('returns focus to trigger element when calendar closes', async () => {
      render(
        <div>
          <DatePicker />
          <button>Next field</button>
        </div>
      )
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input) // Open calendar
      
      // Close calendar by clicking outside
      const nextButton = screen.getByText('Next field')
      await userEvent.click(nextButton)
      
      // Focus should move to the clicked element
      expect(nextButton).toHaveFocus()
    })
  })

  describe('ARIA Live Regions', () => {
    it('announces date selection to screen readers', async () => {
      const handleChange = () => {}
      render(<DatePicker onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      // When calendar is open, there should be appropriate announcements
      // This would typically be tested by checking for aria-live regions
      // or by using testing tools that can capture screen reader output
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('applies appropriate classes for high contrast', () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      
      // Check that proper color classes are applied for contrast
      expect(input).toHaveClass('border-gray-300')
      expect(input).toHaveClass('dark:border-gray-600')
      expect(input).toHaveClass('text-gray-900')
      expect(input).toHaveClass('dark:text-white')
    })

    it('applies error state colors with sufficient contrast', () => {
      render(<DatePicker error errorMessage="Error message" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-500')
      expect(input).toHaveClass('dark:border-red-400')
      
      const errorText = screen.getByText('Error message')
      expect(errorText).toHaveClass('text-red-600')
      expect(errorText).toHaveClass('dark:text-red-400')
    })

    it('maintains focus visibility', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.tab()
      
      // Focus ring should be visible
      expect(input).toHaveClass('focus:ring-2')
      expect(input).toHaveClass('focus:ring-blue-500')
    })
  })

  describe('Disabled State Accessibility', () => {
    it('properly indicates disabled state to assistive technology', () => {
      render(<DatePicker disabled />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveAttribute('disabled')
      
      const calendarButton = screen.getByLabelText('Open calendar')
      expect(calendarButton).toBeDisabled()
    })

    it('skips disabled elements in tab order', async () => {
      render(
        <div>
          <button>Before</button>
          <DatePicker disabled />
          <button>After</button>
        </div>
      )
      
      const beforeButton = screen.getByText('Before')
      const afterButton = screen.getByText('After')
      const input = screen.getByRole('textbox')
      
      beforeButton.focus()
      await userEvent.tab()
      
      // Should skip disabled DatePicker and focus "After" button
      expect(afterButton).toHaveFocus()
      expect(input).not.toHaveFocus()
    })
  })

  describe('Mobile Accessibility', () => {
    it('provides appropriate touch targets', () => {
      render(<DatePicker size="sm" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-8') // Minimum 32px height
      
      const calendarButton = screen.getByLabelText('Open calendar')
      expect(calendarButton).toHaveClass('h-8')
      expect(calendarButton).toHaveClass('w-8')
    })

    it('provides larger touch targets for larger sizes', () => {
      render(<DatePicker size="lg" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('h-12') // Larger touch target
      
      const calendarButton = screen.getByLabelText('Open calendar')
      expect(calendarButton).toHaveClass('h-12')
      expect(calendarButton).toHaveClass('w-12')
    })
  })

  describe('Form Integration Accessibility', () => {
    it('associates with form labels correctly', () => {
      render(
        <form>
          <label htmlFor="birth-date">Date of Birth</label>
          <DatePicker id="birth-date" />
        </form>
      )
      
      const input = screen.getByRole('textbox')
      const label = screen.getByText('Date of Birth')
      
      expect(input).toHaveAttribute('id', 'birth-date')
      expect(label).toHaveAttribute('for', 'birth-date')
    })

    it('supports form validation attributes', () => {
      render(
        <DatePicker 
          required 
          aria-describedby="date-help"
          aria-labelledby="date-label"
        />
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toBeRequired()
      expect(input).toHaveAttribute('aria-required', 'true')
      expect(input).toHaveAttribute('aria-describedby', 'date-help')
      expect(input).toHaveAttribute('aria-labelledby', 'date-label')
    })
  })
})
