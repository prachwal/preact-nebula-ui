import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Autocomplete } from './Autocomplete'
import type { AutocompleteOption } from './types'

// Mock Portal component
vi.mock('../Portal', () => ({
  Portal: ({ children }: { children: any }) => children
}))

const mockOptions: AutocompleteOption[] = [
  { value: '1', label: 'Option 1', description: 'First option' },
  { value: '2', label: 'Option 2', description: 'Second option' },
  { value: '3', label: 'Option 3', description: 'Third option' },
  { value: '4', label: 'Apple', description: 'Fruit option' },
  { value: '5', label: 'Banana', description: 'Another fruit' },
]

const groupedOptions = [
  {
    id: 'fruits',
    label: 'Fruits',
    options: [
      { value: 'apple', label: 'Apple', description: 'Red fruit' },
      { value: 'banana', label: 'Banana', description: 'Yellow fruit' }
    ]
  },
  {
    id: 'vegetables',
    label: 'Vegetables',
    options: [
      { value: 'carrot', label: 'Carrot', description: 'Orange vegetable' },
      { value: 'lettuce', label: 'Lettuce', description: 'Green vegetable' }
    ]
  }
]

describe('Autocomplete', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Basic Functionality', () => {
    it('renders input field with placeholder', () => {
      render(<Autocomplete options={mockOptions} placeholder="Search items..." />)
      
      const input = screen.getByRole('combobox')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('placeholder', 'Search items...')
    })

    it('shows dropdown when input is focused', async () => {
      render(<Autocomplete options={mockOptions} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
    })

    it('filters options based on input value', async () => {
      render(<Autocomplete options={mockOptions} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.change(input, { target: { value: 'Option 1' } })
      
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument()
      })
    })

    it('selects option when clicked', async () => {
      const onChange = vi.fn()
      render(<Autocomplete options={mockOptions} onChange={onChange} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
      
      fireEvent.click(screen.getByText('Option 1'))
      
      expect(onChange).toHaveBeenCalledWith(mockOptions[0])
    })
  })

  describe('Multiple Selection', () => {
    it('allows multiple selections', async () => {
      const onChange = vi.fn()
      render(<Autocomplete options={mockOptions} multiple onChange={onChange} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
      
      fireEvent.click(screen.getByText('Option 1'))
      expect(onChange).toHaveBeenCalledWith([mockOptions[0]])
      
      fireEvent.click(screen.getByText('Option 2'))
      expect(onChange).toHaveBeenCalledWith([mockOptions[0], mockOptions[1]])
    })

    it('displays selected options as tags', () => {
      const selectedOptions = [mockOptions[0], mockOptions[1]]
      render(<Autocomplete options={mockOptions} multiple value={selectedOptions} />)
      
      expect(screen.getByText('Option 1')).toBeInTheDocument()
      expect(screen.getByText('Option 2')).toBeInTheDocument()
    })

    it('removes tags when close button is clicked', () => {
      const onChange = vi.fn()
      const selectedOptions = [mockOptions[0], mockOptions[1]]
      render(<Autocomplete options={mockOptions} multiple value={selectedOptions} onChange={onChange} />)
      
      const removeButtons = screen.getAllByLabelText(/Remove/)
      fireEvent.click(removeButtons[0])
      
      expect(onChange).toHaveBeenCalledWith([mockOptions[1]])
    })

    it('respects maxSelections limit', async () => {
      const onChange = vi.fn()
      render(
        <Autocomplete 
          options={mockOptions} 
          multiple 
          maxSelections={2}
          value={[mockOptions[0], mockOptions[1]]}
          onChange={onChange} 
        />
      )
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
      
      fireEvent.click(screen.getByText('Option 3'))
      
      // Should not add third option due to max limit
      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Navigation', () => {
    it('navigates options with arrow keys', async () => {
      render(<Autocomplete options={mockOptions} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      
      await waitFor(() => {
        const firstOption = screen.getByRole('option', { name: /Option 1/ })
        expect(firstOption).toHaveClass('bg-blue-50')
      })
      
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      
      await waitFor(() => {
        const secondOption = screen.getByRole('option', { name: /Option 2/ })
        expect(secondOption).toHaveClass('bg-blue-50')
      })
    })

    it('selects highlighted option with Enter key', async () => {
      const onChange = vi.fn()
      render(<Autocomplete options={mockOptions} onChange={onChange} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      fireEvent.keyDown(input, { key: 'Enter' })
      
      await waitFor(() => {
        expect(onChange).toHaveBeenCalledWith(mockOptions[0])
      })
    })

    it('closes dropdown with Escape key', async () => {
      render(<Autocomplete options={mockOptions} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
      })
      
      fireEvent.keyDown(input, { key: 'Escape' })
      
      await waitFor(() => {
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
      })
    })

    it('removes last tag with Backspace in multiple mode', () => {
      const onChange = vi.fn()
      const selectedOptions = [mockOptions[0], mockOptions[1]]
      render(<Autocomplete options={mockOptions} multiple value={selectedOptions} onChange={onChange} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.keyDown(input, { key: 'Backspace' })
      
      expect(onChange).toHaveBeenCalledWith([mockOptions[0]])
    })
  })

  describe('Async Search', () => {
    it('calls onSearch with debounced input', async () => {
      const onSearch = vi.fn().mockResolvedValue([])
      render(<Autocomplete onSearch={onSearch} debounceMs={100} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.change(input, { target: { value: 'test' } })
      
      // Should not call immediately
      expect(onSearch).not.toHaveBeenCalled()
      
      // Should call after debounce
      await waitFor(() => {
        expect(onSearch).toHaveBeenCalledWith('test')
      }, { timeout: 200 })
    })

    it('shows loading state during search', async () => {
      const onSearch = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
      render(<Autocomplete onSearch={onSearch} debounceMs={10} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.change(input, { target: { value: 'test' } })
      
      await waitFor(() => {
        expect(screen.getByText('Loading...')).toBeInTheDocument()
      })
    })
  })

  describe('Create Option', () => {
    it('shows create option when allowCreate is true', async () => {
      const onCreate = vi.fn()
      render(<Autocomplete options={[]} allowCreate onCreate={onCreate} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.change(input, { target: { value: 'New Item' } })
      
      await waitFor(() => {
        expect(screen.getByText('Create "New Item"')).toBeInTheDocument()
      })
    })

    it('calls onCreate when create option is selected', async () => {
      const onCreate = vi.fn()
      render(<Autocomplete options={[]} allowCreate onCreate={onCreate} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.change(input, { target: { value: 'New Item' } })
      
      await waitFor(() => {
        expect(screen.getByText('Create "New Item"')).toBeInTheDocument()
      })
      
      fireEvent.click(screen.getByText('Create "New Item"'))
      expect(onCreate).toHaveBeenCalledWith('New Item')
    })
  })

  describe('Grouped Options', () => {
    it('renders grouped options correctly', async () => {
      render(<Autocomplete groupedOptions={groupedOptions} options={[]} minSearchLength={0} />)
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.mouseDown(input)
      await waitFor(() => {
        expect(screen.getByRole('listbox')).toBeInTheDocument()
        expect(screen.getByText('Apple')).toBeInTheDocument()
        expect(screen.getByText('Carrot')).toBeInTheDocument()
      })
    })
  })

  describe('Size Variants', () => {
    it('applies correct size classes', () => {
      const { rerender } = render(<Autocomplete options={mockOptions} size="sm" />)
      let input = screen.getByRole('combobox')
      expect(input).toHaveClass('h-8')
      
      rerender(<Autocomplete options={mockOptions} size="md" />)
      input = screen.getByRole('combobox')
      expect(input).toHaveClass('h-10')
      
      rerender(<Autocomplete options={mockOptions} size="lg" />)
      input = screen.getByRole('combobox')
      expect(input).toHaveClass('h-12')
    })
  })

  describe('States', () => {
    it('handles disabled state', () => {
      render(<Autocomplete options={mockOptions} disabled />)
      
      const input = screen.getByRole('combobox')
      expect(input).toBeDisabled()
    })

    it('handles readonly state', () => {
      render(<Autocomplete options={mockOptions} readOnly />)
      
      const input = screen.getByRole('combobox')
      expect(input).toHaveAttribute('readonly')
    })

    it('shows error state styling', () => {
      render(<Autocomplete options={mockOptions} error errorMessage="Please select an option" />)
      
      expect(screen.getByText('Please select an option')).toBeInTheDocument()
    })

    it('shows clear button when there is a selection', () => {
      render(<Autocomplete options={mockOptions} value={mockOptions[0]} />)
      
      const clearButton = screen.getByLabelText('Clear selection')
      expect(clearButton).toBeInTheDocument()
    })

    it('clears selection when clear button is clicked', () => {
      const onChange = vi.fn()
      render(<Autocomplete options={mockOptions} value={mockOptions[0]} onChange={onChange} />)
      
      const clearButton = screen.getByLabelText('Clear selection')
      fireEvent.click(clearButton)
      
      expect(onChange).toHaveBeenCalledWith(null)
    })
  })

  describe('Custom Rendering', () => {
    it('uses custom option renderer', async () => {
      const renderOption = vi.fn((option: AutocompleteOption) => (
        <div>Custom: {option.label}</div>
      ))
      
      render(<Autocomplete options={mockOptions} renderOption={renderOption} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(screen.getByText('Custom: Option 1')).toBeInTheDocument()
        expect(renderOption).toHaveBeenCalled()
      })
    })

    it('uses custom tag renderer', () => {
      const renderTag = vi.fn((option: AutocompleteOption, onRemove: () => void) => (
        <div>
          Tag: {option.label}
          <button onClick={onRemove}>X</button>
        </div>
      ))
      
      render(
        <Autocomplete 
          options={mockOptions} 
          multiple 
          value={[mockOptions[0]]} 
          renderTag={renderTag} 
        />
      )
      
      expect(screen.getByText('Tag: Option 1')).toBeInTheDocument()
      expect(renderTag).toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Autocomplete options={mockOptions} aria-label="Search options" />)
      
      const input = screen.getByRole('combobox')
      expect(input).toHaveAttribute('aria-label', 'Search options')
      expect(input).toHaveAttribute('aria-autocomplete', 'list')
      expect(input).toHaveAttribute('aria-expanded', 'false')
      expect(input).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('updates aria-expanded when dropdown opens/closes', async () => {
      render(<Autocomplete options={mockOptions} />)
      
      const input = screen.getByRole('combobox')
      expect(input).toHaveAttribute('aria-expanded', 'false')
      
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(input).toHaveAttribute('aria-expanded', 'true')
      })
    })

    it('sets aria-activedescendant for highlighted option', async () => {
      render(<Autocomplete options={mockOptions} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.keyDown(input, { key: 'ArrowDown' })
      
      await waitFor(() => {
        expect(input).toHaveAttribute('aria-activedescendant', 'option-0')
      })
    })

    it('sets aria-selected for selected options', async () => {
      render(<Autocomplete options={mockOptions} value={mockOptions[0]} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        const selectedOption = screen.getByRole('option', { name: /Option 1/ })
        expect(selectedOption).toHaveAttribute('aria-selected', 'true')
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles empty options array', async () => {
      render(<Autocomplete options={[]} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        expect(screen.getByText('No options found')).toBeInTheDocument()
      })
    })

    it('handles minimum search length', async () => {
      render(<Autocomplete options={mockOptions} minSearchLength={3} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      fireEvent.change(input, { target: { value: 'Op' } })
      
      await waitFor(() => {
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
      })
      
      fireEvent.change(input, { target: { value: 'Opt' } })
      
      await waitFor(() => {
        expect(screen.getByText('Option 1')).toBeInTheDocument()
      })
    })

    it('handles max display options', async () => {
      const manyOptions = Array.from({ length: 20 }, (_, i) => ({
        value: `${i}`,
        label: `Option ${i}`,
        description: `Description ${i}`
      }))
      
      render(<Autocomplete options={manyOptions} maxDisplayOptions={5} />)
      
      const input = screen.getByRole('combobox')
      fireEvent.mouseDown(input)
      
      await waitFor(() => {
        const options = screen.getAllByRole('option')
        expect(options).toHaveLength(5)
      })
    })
  })
})
