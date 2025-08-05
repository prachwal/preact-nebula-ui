import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { TimeWheel } from './TimeWheel'

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn()

describe('TimeWheel', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with list of values', () => {
      const values = ['00', '01', '02', '03']
      render(<TimeWheel values={values} selectedValue="01" />)
      
      const wheel = screen.getByRole('listbox')
      expect(wheel).toBeInTheDocument()
      
      values.forEach(value => {
        expect(screen.getByText(value)).toBeInTheDocument()
      })
    })

    it('applies small size classes', () => {
      const values = ['00', '01', '02']
      render(<TimeWheel values={values} selectedValue="01" size="sm" />)
      
      const container = screen.getByRole('listbox').parentElement
      expect(container).toHaveClass('h-24')
    })

    it('applies medium size classes (default)', () => {
      const values = ['00', '01', '02']
      render(<TimeWheel values={values} selectedValue="01" size="md" />)
      
      const container = screen.getByRole('listbox').parentElement
      expect(container).toHaveClass('h-32')
    })

    it('applies large size classes', () => {
      const values = ['00', '01', '02']
      render(<TimeWheel values={values} selectedValue="01" size="lg" />)
      
      const container = screen.getByRole('listbox').parentElement
      expect(container).toHaveClass('h-40')
    })
  })

  describe('Selection', () => {
    it('marks selected value as selected', () => {
      const values = ['00', '01', '02', '03']
      render(<TimeWheel values={values} selectedValue="02" />)
      
      const selectedOption = screen.getByRole('option', { name: '02' })
      expect(selectedOption).toHaveAttribute('aria-selected', 'true')
      expect(selectedOption).toHaveClass('bg-primary-500', 'text-white')
    })

    it('calls onChange when value is clicked', async () => {
      const handleChange = vi.fn()
      const values = ['00', '01', '02', '03']
      render(
        <TimeWheel 
          values={values} 
          selectedValue="01" 
          onChange={handleChange}
        />
      )
      
      const option = screen.getByRole('option', { name: '02' })
      await userEvent.click(option)
      
      expect(handleChange).toHaveBeenCalledWith('02')
    })

    it('does not call onChange when clicking disabled values', async () => {
      const handleChange = vi.fn()
      const values = ['00', '01', '02', '03']
      const disabledValues = ['02']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="01" 
          onChange={handleChange}
          disabledValues={disabledValues}
        />
      )
      
      const disabledOption = screen.getByRole('option', { name: '02' })
      await userEvent.click(disabledOption)
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Disabled Values', () => {
    it('marks disabled values as disabled', () => {
      const values = ['00', '01', '02', '03']
      const disabledValues = ['01', '03']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="00" 
          disabledValues={disabledValues}
        />
      )
      
      const disabledOption1 = screen.getByRole('option', { name: '01' })
      const disabledOption2 = screen.getByRole('option', { name: '03' })
      
      expect(disabledOption1).toHaveAttribute('aria-disabled', 'true')
      expect(disabledOption1).toHaveClass('text-gray-400', 'cursor-not-allowed')
      
      expect(disabledOption2).toHaveAttribute('aria-disabled', 'true')
      expect(disabledOption2).toHaveClass('text-gray-400', 'cursor-not-allowed')
    })

    it('renders enabled values normally', () => {
      const values = ['00', '01', '02', '03']
      const disabledValues = ['01']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="00" 
          disabledValues={disabledValues}
        />
      )
      
      const enabledOption = screen.getByRole('option', { name: '02' })
      expect(enabledOption).toHaveAttribute('aria-disabled', 'false')
      expect(enabledOption).toHaveClass('hover:bg-gray-100', 'cursor-pointer')
    })
  })

  describe('Keyboard Navigation', () => {
    it('handles ArrowUp key navigation', () => {
      const handleChange = vi.fn()
      const values = ['00', '01', '02', '03']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="02" 
          onChange={handleChange}
        />
      )
      
      const wheel = screen.getByRole('listbox')
      fireEvent.keyDown(wheel, { key: 'ArrowUp', code: 'ArrowUp' })
      
      expect(handleChange).toHaveBeenCalledWith('01')
    })

    it('handles ArrowDown key navigation', () => {
      const handleChange = vi.fn()
      const values = ['00', '01', '02', '03']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="01" 
          onChange={handleChange}
        />
      )
      
      const wheel = screen.getByRole('listbox')
      fireEvent.keyDown(wheel, { key: 'ArrowDown', code: 'ArrowDown' })
      
      expect(handleChange).toHaveBeenCalledWith('02')
    })

    it('wraps to beginning when navigating up from first item', () => {
      const handleChange = vi.fn()
      const values = ['00', '01', '02', '03']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="00" 
          onChange={handleChange}
        />
      )
      
      const wheel = screen.getByRole('listbox')
      fireEvent.keyDown(wheel, { key: 'ArrowUp', code: 'ArrowUp' })
      
      expect(handleChange).toHaveBeenCalledWith('03')
    })

    it('wraps to end when navigating down from last item', () => {
      const handleChange = vi.fn()
      const values = ['00', '01', '02', '03']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="03" 
          onChange={handleChange}
        />
      )
      
      const wheel = screen.getByRole('listbox')
      fireEvent.keyDown(wheel, { key: 'ArrowDown', code: 'ArrowDown' })
      
      expect(handleChange).toHaveBeenCalledWith('00')
    })

    it('skips disabled values when navigating', () => {
      const handleChange = vi.fn()
      const values = ['00', '01', '02', '03']
      const disabledValues = ['01']
      
      render(
        <TimeWheel 
          values={values} 
          selectedValue="00" 
          onChange={handleChange}
          disabledValues={disabledValues}
        />
      )
      
      const wheel = screen.getByRole('listbox')
      fireEvent.keyDown(wheel, { key: 'ArrowDown', code: 'ArrowDown' })
      
      // Should skip '01' and go to '02'
      expect(handleChange).toHaveBeenCalledWith('02')
    })
  })

  describe('Accessibility', () => {
    it('has correct ARIA roles and attributes', () => {
      const values = ['00', '01', '02']
      render(<TimeWheel values={values} selectedValue="01" />)
      
      const wheel = screen.getByRole('listbox')
      expect(wheel).toHaveAttribute('tabIndex', '0')
      
      values.forEach(value => {
        const option = screen.getByRole('option', { name: value })
        expect(option).toBeInTheDocument()
      })
    })

    it('supports aria-label', () => {
      const values = ['00', '01', '02']
      render(
        <TimeWheel 
          values={values} 
          selectedValue="01" 
          aria-label="Hours"
        />
      )
      
      const wheel = screen.getByRole('listbox')
      expect(wheel).toHaveAttribute('aria-label', 'Hours')
    })
  })

  describe('Scrolling Behavior', () => {
    it('scrolls selected option into view on mount', () => {
      const values = ['00', '01', '02', '03', '04', '05']
      render(<TimeWheel values={values} selectedValue="04" />)
      
      // Check that the selected value has the ref applied
      const selectedOption = screen.getByRole('option', { name: '04' })
      expect(selectedOption).toHaveAttribute('aria-selected', 'true')
    })

    it('scrolls to option when selection changes', () => {
      const values = ['00', '01', '02', '03']
      const { rerender } = render(
        <TimeWheel values={values} selectedValue="01" />
      )
      
      // Check initial selection
      expect(screen.getByRole('option', { name: '01' })).toHaveAttribute('aria-selected', 'true')

      rerender(<TimeWheel values={values} selectedValue="03" />)
      
      // Check new selection
      expect(screen.getByRole('option', { name: '03' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('option', { name: '01' })).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('Empty Values', () => {
    it('renders empty state when no values provided', () => {
      render(<TimeWheel values={[]} selectedValue="" />)
      
      const wheel = screen.getByRole('listbox')
      expect(wheel).toBeInTheDocument()
      expect(wheel).toBeEmptyDOMElement()
    })
  })

  describe('Value Formatting', () => {
    it('displays values as provided', () => {
      const values = ['1', '2', '3', '10', '15', '20']
      render(<TimeWheel values={values} selectedValue="10" />)
      
      values.forEach(value => {
        expect(screen.getByText(value)).toBeInTheDocument()
      })
    })

    it('handles zero-padded values', () => {
      const values = ['00', '01', '02', '09', '10', '11']
      render(<TimeWheel values={values} selectedValue="09" />)
      
      values.forEach(value => {
        expect(screen.getByText(value)).toBeInTheDocument()
      })
    })
  })
})
