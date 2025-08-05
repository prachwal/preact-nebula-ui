import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { TimePicker } from './TimePicker'

// Mock Portal component to avoid rendering issues in tests
vi.mock('../Portal', () => ({
  Portal: ({ children }: { children: any }) => children
}))

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('TimePicker', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = ''
  })

  afterEach(() => {
    vi.restoreAllMocks()
    document.body.innerHTML = ''
  })

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<TimePicker />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', 'Select time')
    })

    it('renders with custom placeholder', () => {
      render(<TimePicker placeholder="Choose a time" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('placeholder', 'Choose a time')
    })

    it('renders with default value', () => {
      const defaultTime = { hours: 14, minutes: 30 }
      render(<TimePicker defaultValue={defaultTime} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('02:30 PM')
    })

    it('renders with controlled value', () => {
      const controlledTime = { hours: 9, minutes: 15 }
      render(<TimePicker value={controlledTime} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('09:15 AM')
    })

    it('renders 24h format correctly', () => {
      const time = { hours: 14, minutes: 30 }
      render(<TimePicker value={time} format="24h" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('14:30')
    })

    it('renders with seconds', () => {
      const time = { hours: 14, minutes: 30, seconds: 45 }
      render(<TimePicker value={time} showSeconds={true} format="24h" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('14:30:45')
    })
  })

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      render(<TimePicker size="sm" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-sm', 'px-2', 'py-1', 'h-8')
    })

    it('applies medium size classes (default)', () => {
      render(<TimePicker size="md" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-sm', 'px-3', 'py-2', 'h-10')
    })

    it('applies large size classes', () => {
      render(<TimePicker size="lg" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('text-base', 'px-4', 'py-3', 'h-12')
    })
  })

  describe('States', () => {
    it('renders in disabled state', () => {
      render(<TimePicker disabled />)
      
      const input = screen.getByRole('textbox')
      expect(input).toBeDisabled()
      expect(input).toHaveClass('bg-gray-100', 'dark:bg-gray-700', 'cursor-not-allowed')
    })

    it('renders in read-only state', () => {
      render(<TimePicker readOnly />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('readOnly')
      expect(input).toHaveClass('cursor-pointer')
    })

    it('renders in error state', () => {
      render(<TimePicker error errorMessage="Invalid time" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveClass('border-red-500', 'dark:border-red-400')
      
      const errorMessage = screen.getByText('Invalid time')
      expect(errorMessage).toBeInTheDocument()
      expect(errorMessage).toHaveClass('text-red-600', 'dark:text-red-400')
    })
  })

  describe('Time Picker Interaction', () => {
    it('opens time picker when input is focused', async () => {
      render(<TimePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('opens time picker when clock button is clicked', async () => {
      render(<TimePicker />)
      
      const clockButton = screen.getByLabelText('Open time picker')
      await userEvent.click(clockButton)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('closes time picker when clicking outside', async () => {
      render(
        <div>
          <TimePicker />
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

  describe('Time Selection', () => {
    it('calls onChange when Now button is clicked', async () => {
      const handleChange = vi.fn()
      render(<TimePicker onChange={handleChange} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        const nowButton = screen.getByText('Now')
        expect(nowButton).toBeInTheDocument()
      })
      
      const nowButton = screen.getByText('Now')
      await userEvent.click(nowButton)
      
      expect(handleChange).toHaveBeenCalledWith(expect.objectContaining({
        hours: expect.any(Number),
        minutes: expect.any(Number)
      }))
    })

    it('calls onChange when Done button is clicked', async () => {
      render(<TimePicker />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      const doneButton = screen.getByText('Done')
      await userEvent.click(doneButton)
      
      await waitFor(() => {
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
      })
    })
  })

  describe('Clear Functionality', () => {
    it('shows clear button when time is selected', () => {
      render(<TimePicker value={{ hours: 14, minutes: 30 }} />)
      
      const clearButton = screen.getByLabelText('Clear time')
      expect(clearButton).toBeInTheDocument()
    })

    it('hides clear button when showClear is false', () => {
      render(<TimePicker value={{ hours: 14, minutes: 30 }} showClear={false} />)
      
      const clearButton = screen.queryByLabelText('Clear time')
      expect(clearButton).not.toBeInTheDocument()
    })

    it('clears time when clear button is clicked', async () => {
      const handleChange = vi.fn()
      render(<TimePicker value={{ hours: 14, minutes: 30 }} onChange={handleChange} />)
      
      const clearButton = screen.getByLabelText('Clear time')
      await userEvent.click(clearButton)
      
      expect(handleChange).toHaveBeenCalledWith(null)
    })
  })

  describe('Format Support', () => {
    it('displays AM/PM toggle in 12h format', async () => {
      render(<TimePicker format="12h" value={{ hours: 14, minutes: 30 }} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByText('PM')).toBeInTheDocument()
      })
    })

    it('does not display AM/PM toggle in 24h format', async () => {
      render(<TimePicker format="24h" value={{ hours: 14, minutes: 30 }} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.queryByText('PM')).not.toBeInTheDocument()
        expect(screen.queryByText('AM')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA attributes', () => {
      render(<TimePicker aria-label="Select appointment time" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-label', 'Select appointment time')
      expect(input).toHaveAttribute('aria-expanded', 'false')
      expect(input).toHaveAttribute('aria-haspopup', 'dialog')
    })

    it('updates aria-expanded when picker opens', async () => {
      render(<TimePicker />)
      
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
          <label id="time-label">Appointment Time</label>
          <TimePicker aria-labelledby="time-label" />
        </div>
      )
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveAttribute('aria-labelledby', 'time-label')
    })
  })

  describe('Keyboard Navigation', () => {
    it('opens picker on Enter key when focused', async () => {
      render(<TimePicker />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })

    it('opens picker on Space key when focused', async () => {
      render(<TimePicker />)
      
      const input = screen.getByRole('textbox')
      input.focus()
      
      fireEvent.keyDown(input, { key: ' ', code: 'Space' })
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
    })
  })

  describe('Input Formatting', () => {
    it('handles null value correctly', () => {
      render(<TimePicker value={null} />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('')
    })

    it('formats 12h time correctly', () => {
      const time = { hours: 14, minutes: 30 }
      render(<TimePicker value={time} format="12h" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('02:30 PM')
    })

    it('formats 24h time correctly', () => {
      const time = { hours: 14, minutes: 30 }
      render(<TimePicker value={time} format="24h" />)
      
      const input = screen.getByRole('textbox')
      expect(input).toHaveValue('14:30')
    })
  })

  describe('Step Minutes', () => {
    it('generates correct minute values for step intervals', async () => {
      render(<TimePicker stepMinutes={15} />)
      
      const input = screen.getByRole('textbox')
      await userEvent.click(input)
      
      await waitFor(() => {
        expect(screen.getByRole('dialog')).toBeInTheDocument()
      })
      
      // Should show 15-minute intervals: 00, 15, 30, 45
      expect(screen.getByText('00')).toBeInTheDocument()
      expect(screen.getByText('15')).toBeInTheDocument()
      expect(screen.getByText('30')).toBeInTheDocument()
      expect(screen.getByText('45')).toBeInTheDocument()
    })
  })
})
