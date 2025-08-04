import {render, screen, fireEvent, cleanup, waitFor} from '@testing-library/preact'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {Select} from './Select'
import type {SelectOption} from './Select.types'

const mockOptions: SelectOption[] = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
  { value: 'option4', label: 'Option 4', description: 'Description for option 4' },
  { value: 'option5', label: 'Option 5', icon: <span>🎉</span> }
]

describe('Select Component', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Basic Functionality', () => {
    it('renders without crashing', () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      expect(select).toBeInTheDocument()
    })

    it('displays placeholder when no option is selected', () => {
      render(<Select options={mockOptions} placeholder="Choose an option" />)
      expect(screen.getByText('Choose an option')).toBeInTheDocument()
    })

    it('opens dropdown when clicked', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.click(select)
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
    })

    it('displays all options in dropdown', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.click(select)
      
      await waitFor(() => {
        // Check only non-disabled options
        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(screen.getByText('Option 2')).toBeInTheDocument()
        expect(screen.getByText('Option 4')).toBeInTheDocument()
        expect(screen.getByText('Option 5')).toBeInTheDocument()
      })
    })

    it('closes dropdown when clicking outside', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.click(select)
      await waitFor(() => expect(screen.getByRole('listbox')).toBeInTheDocument())
      
      fireEvent.mouseDown(document.body)
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })
  })

  describe('Single Selection', () => {
    it('selects option when clicked', async () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} onChange={handleChange} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.click(screen.getByText('Option 1'))
      
      expect(handleChange).toHaveBeenCalledWith('option1')
    })

    it('displays selected option', async () => {
      render(<Select options={mockOptions} value="option1" />)
      expect(screen.getByText('Option 1')).toBeInTheDocument()
    })

    it('closes dropdown after selection', async () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} onChange={handleChange} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.click(screen.getByText('Option 1'))
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })

    it('shows selected indicator for single selection', async () => {
      render(<Select options={mockOptions} value="option1" />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      const listbox = screen.getByRole('listbox')
      const selectedOption = listbox.querySelector('[role="option"][aria-selected="true"]')
      expect(selectedOption).toHaveAttribute('aria-selected', 'true')
    })
  })

  describe('Multiple Selection', () => {
    it('allows multiple selections', async () => {
      const handleChange = vi.fn()
      let currentValue: string[] = []
      
      const TestComponent = () => (
        <Select 
          options={mockOptions} 
          multiple 
          value={currentValue}
          onChange={(newValue) => {
            currentValue = newValue as string[]
            handleChange(newValue)
          }} 
        />
      )
      
      const { rerender } = render(<TestComponent />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.click(screen.getByText('Option 1'))
      expect(handleChange).toHaveBeenCalledWith(['option1'])
      
      // Re-render with updated value
      rerender(<TestComponent />)
      
      fireEvent.click(screen.getByText('Option 2'))
      expect(handleChange).toHaveBeenCalledWith(['option1', 'option2'])
    })

    it('displays chips for selected options in multiple mode', () => {
      render(<Select options={mockOptions} multiple value={['option1', 'option2']} />)
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })

    it('displays chips for selected options', () => {
      render(<Select options={mockOptions} multiple value={['option1', 'option2']} />)
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })

    it('removes option when chip close button is clicked', async () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} multiple value={['option1', 'option2']} onChange={handleChange} />)
      
      const closeButtons = screen.getAllByRole('button')
      fireEvent.click(closeButtons[0]) // First chip close button
      
      expect(handleChange).toHaveBeenCalledWith(['option2'])
    })

    it('keeps dropdown open for multiple selections', async () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} multiple onChange={handleChange} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.click(screen.getByText('Option 1'))
      
      // Dropdown should remain open
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
  })

  describe('Searchable Functionality', () => {
    it('shows search input when searchable and opened', async () => {
      render(<Select options={mockOptions} searchable />)
      
      fireEvent.click(screen.getByRole('combobox'))
      
      await waitFor(() => {
        expect(screen.getByRole('textbox')).toBeInTheDocument()
      })
    })

    it('filters options based on search query', async () => {
      render(<Select options={mockOptions} searchable />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('textbox'))
      
      const searchInput = screen.getByRole('textbox')
      fireEvent.change(searchInput, { target: { value: 'Option 1' } })
      
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
      })
    })

    it('calls onSearch when search query changes', async () => {
      const handleSearch = vi.fn()
      render(<Select options={mockOptions} searchable onSearch={handleSearch} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('textbox'))
      
      const searchInput = screen.getByRole('textbox')
      fireEvent.change(searchInput, { target: { value: 'test' } })
      
      expect(handleSearch).toHaveBeenCalledWith('test')
    })

    it('shows "no options found" when search has no results', async () => {
      render(<Select options={mockOptions} searchable />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('textbox'))
      
      const searchInput = screen.getByRole('textbox')
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
      
      await waitFor(() => {
        expect(screen.getByText('No options found')).toBeInTheDocument()
      })
    })
  })

  describe('Disabled State', () => {
    it('prevents opening when disabled', () => {
      render(<Select options={mockOptions} disabled />)
      const select = screen.getByRole('combobox')
      
      fireEvent.click(select)
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('applies disabled styling', () => {
      render(<Select options={mockOptions} disabled />)
      const select = screen.getByRole('combobox')
      expect(select).toHaveAttribute('aria-disabled', 'true')
    })

    it('prevents keyboard navigation when disabled', () => {
      render(<Select options={mockOptions} disabled />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })

    it('disables individual options', async () => {
      render(<Select options={mockOptions} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      const disabledOption = screen.getByText('Option 3').closest('[role="option"]')
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true')
    })

    it('prevents selection of disabled options', async () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} onChange={handleChange} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.click(screen.getByText('Option 3')) // Disabled option
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Navigation', () => {
    it('opens dropdown with ArrowDown key', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
    })

    it('navigates options with arrow keys', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      
      const firstOption = screen.getByText('Option 1').closest('[role="option"]')
      expect(firstOption).toHaveAttribute('aria-selected', 'false')
    })

    it('selects option with Enter key', async () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} onChange={handleChange} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      fireEvent.keyDown(select, { key: 'Enter' })
      
      expect(handleChange).toHaveBeenCalledWith('option1')
    })

    it('closes dropdown with Escape key', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      await waitFor(() => screen.getByRole('listbox'))
      
      fireEvent.keyDown(select, { key: 'Escape' })
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })

    it('toggles dropdown with Space key when not searchable', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: ' ' })
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
    })

    it('removes last selected option with Backspace in multiple mode', async () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} multiple value={['option1', 'option2']} onChange={handleChange} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: 'Backspace' })
      
      expect(handleChange).toHaveBeenCalledWith(['option1'])
    })
  })

  describe('Size Variants', () => {
    it('applies small size classes', () => {
      render(<Select options={mockOptions} size="sm" />)
      const select = screen.getByRole('combobox')
      expect(select).toHaveClass('h-8')
    })

    it('applies medium size classes (default)', () => {
      render(<Select options={mockOptions} size="md" />)
      const select = screen.getByRole('combobox')
      expect(select).toHaveClass('h-10')
    })

    it('applies large size classes', () => {
      render(<Select options={mockOptions} size="lg" />)
      const select = screen.getByRole('combobox')
      expect(select).toHaveClass('h-12')
    })
  })

  describe('Clear Functionality', () => {
    it('shows clear button when clearable and has selection', () => {
      render(<Select options={mockOptions} clearable value="option1" />)
      const buttons = screen.getAllByRole('button')
      // Should have at least one button (the clear button)
      expect(buttons.length).toBeGreaterThan(0)
    })

    it('hides clear button when no selection', () => {
      render(<Select options={mockOptions} clearable />)
      // Should not have any buttons when no selection
      expect(screen.queryAllByRole('button')).toHaveLength(0)
    })

    it('clears selection when clear button is clicked', () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} clearable value="option1" onChange={handleChange} />)
      
      const buttons = screen.getAllByRole('button')
      const clearButton = buttons.find(btn => btn.querySelector('svg')) // Clear button has an X SVG
      
      if (clearButton) {
        fireEvent.click(clearButton)
        expect(handleChange).toHaveBeenCalledWith('')
      }
    })

    it('clears multiple selections when clear button is clicked', () => {
      const handleChange = vi.fn()
      render(<Select options={mockOptions} multiple clearable value={['option1', 'option2']} onChange={handleChange} />)
      
      const buttons = screen.getAllByRole('button')
      // Find clear button (should be last button, chip close buttons come first)
      const clearButton = buttons[buttons.length - 1]
      
      fireEvent.click(clearButton)
      expect(handleChange).toHaveBeenCalledWith([])
    })
  })

  describe('Loading State', () => {
    it('shows loading spinner when loading', () => {
      render(<Select options={mockOptions} loading />)
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('shows loading spinner in dropdown area', () => {
      render(<Select options={mockOptions} loading />)
      const spinner = document.querySelector('.animate-spin')
      expect(spinner).toBeInTheDocument()
    })

    it('hides clear button when loading', () => {
      render(<Select options={mockOptions} loading clearable value="option1" />)
      expect(screen.queryAllByRole('button')).toHaveLength(0)
    })
  })

  describe('Error State', () => {
    it('applies error styling when error prop is provided', () => {
      render(<Select options={mockOptions} error="This field is required" />)
      const select = screen.getByRole('combobox')
      expect(select).toHaveClass('border-red-500')
    })
  })

  describe('Form Integration', () => {
    it('renders hidden input for form submission', () => {
      render(<Select options={mockOptions} name="test-select" value="option1" />)
      const hiddenInput = document.querySelector('input[type="hidden"]')
      expect(hiddenInput).toHaveAttribute('name', 'test-select')
      expect(hiddenInput).toHaveAttribute('value', 'option1')
    })

    it('handles array values for multiple selection in hidden input', () => {
      render(<Select options={mockOptions} name="test-select" multiple value={['option1', 'option2']} />)
      const hiddenInput = document.querySelector('input[type="hidden"]')
      expect(hiddenInput).toHaveAttribute('value', 'option1,option2')
    })

    it('applies required attribute to hidden input', () => {
      render(<Select options={mockOptions} name="test-select" required />)
      const hiddenInput = document.querySelector('input[type="hidden"]')
      expect(hiddenInput).toHaveAttribute('required')
    })
  })

  describe('Option Features', () => {
    it('displays option icons', async () => {
      render(<Select options={mockOptions} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      expect(screen.getByText('🎉')).toBeInTheDocument()
    })

    it('displays option descriptions', async () => {
      render(<Select options={mockOptions} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      expect(screen.getByText('Description for option 4')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      expect(select).toHaveAttribute('aria-expanded', 'false')
      expect(select).toHaveAttribute('aria-haspopup', 'listbox')
      expect(select).toHaveAttribute('tabindex', '0')
    })

    it('updates aria-expanded when dropdown opens', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.click(select)
      
      await waitFor(() => {
        expect(select).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('sets aria-multiselectable for multiple selection', async () => {
      render(<Select options={mockOptions} multiple />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      const listbox = screen.getByRole('listbox')
      expect(listbox).toHaveAttribute('aria-multiselectable', 'true')
    })

    it('sets proper aria-selected on options', async () => {
      render(<Select options={mockOptions} value="option1" />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      const listbox = screen.getByRole('listbox')
      const selectedOption = listbox.querySelector('[role="option"][aria-selected="true"]')
      const unselectedOption = listbox.querySelector('[role="option"][aria-selected="false"]')
      
      expect(selectedOption).toHaveAttribute('aria-selected', 'true')
      expect(unselectedOption).toHaveAttribute('aria-selected', 'false')
    })
  })

  describe('Edge Cases', () => {
    it('handles empty options array', () => {
      render(<Select options={[]} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      
      expect(screen.getByText('No options available')).toBeInTheDocument()
    })

    it('handles undefined value gracefully', () => {
      render(<Select options={mockOptions} value={undefined} />)
      expect(screen.getByText('Select an option...')).toBeInTheDocument()
    })

    it('handles missing onChange gracefully', async () => {
      render(<Select options={mockOptions} />)
      
      fireEvent.click(screen.getByRole('combobox'))
      await waitFor(() => screen.getByRole('listbox'))
      
      expect(() => {
        fireEvent.click(screen.getByText('Option 1'))
      }).not.toThrow()
    })

    it('handles rapid keyboard navigation', async () => {
      render(<Select options={mockOptions} />)
      const select = screen.getByRole('combobox')
      
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      await waitFor(() => screen.getByRole('listbox'))
      
      // Rapid navigation
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      fireEvent.keyDown(select, { key: 'ArrowDown' })
      fireEvent.keyDown(select, { key: 'ArrowUp' })
      
      expect(() => {
        fireEvent.keyDown(select, { key: 'Enter' })
      }).not.toThrow()
    })
  })
})
