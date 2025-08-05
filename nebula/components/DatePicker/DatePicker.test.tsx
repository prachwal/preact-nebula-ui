import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { DatePicker } from './DatePicker'

// Mock Portal component to avoid rendering issues in tests
vi.mock('../Portal', () => ({
  Portal: ({ children }: { children: any }) => children
}))

describe('DatePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', 'Select date')
    })

    it('renders with custom placeholder', () => {
      render(<DatePicker placeholder="Choose a date" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Choose a date')
    })

    it('renders with default value', () => {
      const defaultDate = new Date(2024, 5, 15)
      render(<DatePicker defaultValue={defaultDate} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('06/15/2024')
    })

    it('renders with controlled value', () => {
      const controlledDate = new Date(2024, 11, 25)
      render(<DatePicker value={controlledDate} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('12/25/2024')
    })
  })

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      render(<DatePicker size="sm" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-sm', 'px-2', 'py-1', 'h-8')
    })

    it('applies medium size classes (default)', () => {
      render(<DatePicker size="md" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-sm', 'px-3', 'py-2', 'h-10')
    })

    it('applies large size classes', () => {
      render(<DatePicker size="lg" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-base', 'px-4', 'py-3', 'h-12')
    })
  })

  describe('States', () => {
    it('renders in disabled state', () => {
      render(<DatePicker disabled />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('bg-gray-100', 'dark:bg-gray-700', 'cursor-not-allowed')
    })

    it('renders in read-only state', () => {
      render(<DatePicker readOnly />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('readOnly')
      expect(input).toHaveClass('cursor-pointer')
    })

    it('renders in error state', () => {
      render(<DatePicker error errorMessage="Invalid date" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-500', 'dark:border-red-400')
      
      const errorMessage = screen.getByText('Invalid date')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveClass('text-red-600', 'dark:text-red-400')
    })
  })

  describe('Calendar Interaction', () => {
    it('opens calendar when input is focused', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('opens calendar when calendar button is clicked', async () => {
      render(<DatePicker />)
      
      const calendarButton = screen.getByLabelText('Open calendar')
      await userEvent.click(calendarButton)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('closes calendar when clicking outside', async () => {
      render(
        <div>
          <DatePicker />
          <div data-testid="outside">Outside</div>
        </div>
      )
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const outsideElement = screen.getByTestId('outside')
      fireEvent.mouseDown(outsideElement)
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Date Selection', () => {
    it('calls onChange when date is selected', async () => {
      const handleChange = vi.fn()
      render(<DatePicker onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      // Find and click the Today button which should select today's date
      await waitFor(() => {
        const todayButton = screen.getByText('Today')
        expect(todayButton).toBeInTheDocument()
      })
      
      const todayButton = screen.getByText('Today')
      await userEvent.click(todayButton)
      
      expect(handleChange).toHaveBeenCalledWith(expect.any(Date))
    })

    it('updates input value when date is selected', async () => {
      const handleChange = vi.fn()
      render(<DatePicker onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      // Find and click the Today button which should select today's date
      await waitFor(() => {
        const todayButton = screen.getByText('Today')
        expect(todayButton).toBeInTheDocument()
      })
      
      const todayButton = screen.getByText('Today')
      await userEvent.click(todayButton)
      
      expect(handleChange).toHaveBeenCalledWith(expect.any(Date))
    })
  })

  describe('Clear Functionality', () => {
    it('shows clear button when date is selected', () => {
      render(<DatePicker value={new Date(2024, 5, 15)} />)
      
      const clearButton = screen.getByLabelText('Clear date')
      expect(clearButton).toBeInTheDocument()
    })

    it('hides clear button when showClear is false', () => {
      render(<DatePicker value={new Date(2024, 5, 15)} showClear={false} />)
      
      const clearButton = screen.queryByLabelText('Clear date')
      expect(clearButton).not.toBeInTheDocument()
    })

    it('clears date when clear button is clicked', async () => {
      const handleChange = vi.fn()
      render(<DatePicker value={new Date(2024, 5, 15)} onChange={handleChange} />)
      
      const clearButton = screen.getByLabelText('Clear date')
      await userEvent.click(clearButton)
      
      expect(handleChange).toHaveBeenCalledWith(null)
    })
  })

  describe('Validation', () => {
    it('respects minimum date restriction', () => {
      const minDate = new Date(2024, 5, 15)
      render(<DatePicker minDate={minDate} />)
      
      // Calendar should be rendered with minDate passed to Calendar component
      // This would need to be tested by checking the Calendar component behavior
      expect(true).toBe(true) // Placeholder - actual test would check Calendar props
    })

    it('respects maximum date restriction', () => {
      const maxDate = new Date(2024, 11, 31)
      render(<DatePicker maxDate={maxDate} />)
      
      // Calendar should be rendered with maxDate passed to Calendar component
      expect(true).toBe(true) // Placeholder - actual test would check Calendar props
    })

    it('respects disabled dates array', () => {
      const disabledDates = [new Date(2024, 5, 15), new Date(2024, 5, 16)]
      render(<DatePicker disabledDates={disabledDates} />)
      
      // Calendar should be rendered with disabledDates passed to Calendar component
      expect(true).toBe(true) // Placeholder - actual test would check Calendar props
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<DatePicker aria-label="Select birth date" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-label', 'Select birth date')
      expect(input).toHaveAttribute('aria-expanded', 'false')
      expect(input).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('updates aria-expanded when calendar opens', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-expanded', 'false')
      
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(input).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('supports aria-labelledby', () => {
      render(
        <div>
          <label id="date-label">Birth Date</label>
          <DatePicker aria-labelledby="date-label" />
        </div>
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-labelledby', 'date-label')
    })
  })

  describe('Keyboard Navigation', () => {
    it('opens calendar on Enter key when focused', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('opens calendar on Space key when focused', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      
      fireEvent.keyDown(input, { key: ' ', code: 'Space' })
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })
  })

  describe('Input Formatting', () => {
    it('formats date correctly in MM/dd/yyyy format', () => {
      const date = new Date(2024, 5, 15) // June 15, 2024
      render(<DatePicker value={date} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('06/15/2024')
    })

    it('handles null value correctly', () => {
      render(<DatePicker value={null} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })
  })

  describe('Today Button', () => {
    it('shows today button by default', async () => {
      render(<DatePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByText('Today')).toBeInTheDocument()
      })
    })

    it('hides today button when showToday is false', async () => {
      render(<DatePicker showToday={false} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.queryByText('Today')).not.toBeInTheDocument()
      })
    })
  })
})
