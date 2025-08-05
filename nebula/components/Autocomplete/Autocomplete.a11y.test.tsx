import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Autocomplete } from './Autocomplete'
import type { AutocompleteOption } from './types'

// Mock Portal component
vi.mock('../Portal', () => ({
  Portal: ({ children }: { children: any }) => children
}))

const mockOptions: AutocompleteOption[] = [
  { value: '1', label: 'Option 1', description: 'First option' },
  { value: '2', label: 'Option 2', description: 'Second option' },
  { value: '3', label: 'Option 3', description: 'Third option' }
]

describe('Autocomplete Accessibility', () => {
  it('should have proper combobox role and attributes', () => {
    render(<Autocomplete options={mockOptions} aria-label="Search options" />)
    
    const input = screen.getByRole('combobox')
    
    expect(input).toHaveAttribute('aria-autocomplete', 'list')
    expect(input).toHaveAttribute('aria-expanded', 'false')
    expect(input).toHaveAttribute('aria-haspopup', 'listbox')
    expect(input).toHaveAttribute('aria-label', 'Search options')
  })

  it('should have proper listbox role when dropdown is open', async () => {
    render(<Autocomplete options={mockOptions} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()
    })
  })

  it('should have proper option roles and attributes', async () => {
    render(<Autocomplete options={mockOptions} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      const options = screen.getAllByRole('option')
      expect(options).toHaveLength(mockOptions.length)
      
      options.forEach((option, index) => {
        expect(option).toHaveAttribute('aria-selected', 'false')
        expect(option).toHaveAttribute('id', `option-${index}`)
      })
    })
  })

  it('should update aria-expanded when dropdown opens/closes', async () => {
    render(<Autocomplete options={mockOptions} />)
    
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('aria-expanded', 'false')
    
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'true')
    })
    
    fireEvent.keyDown(input, { key: 'Escape' })
    
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-expanded', 'false')
    })
  })

  it('should set aria-activedescendant for highlighted option', async () => {
    render(<Autocomplete options={mockOptions} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
    
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-activedescendant', 'option-0')
    })
    
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    
    await waitFor(() => {
      expect(input).toHaveAttribute('aria-activedescendant', 'option-1')
    })
  })

  it('should set aria-selected for selected option', async () => {
    render(<Autocomplete options={mockOptions} value={mockOptions[0]} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      const selectedOption = screen.getByRole('option', { name: /Option 1/ })
      expect(selectedOption).toHaveAttribute('aria-selected', 'true')
      
      const unselectedOptions = screen.getAllByRole('option').filter(option => 
        !option.textContent?.includes('Option 1')
      )
      unselectedOptions.forEach(option => {
        expect(option).toHaveAttribute('aria-selected', 'false')
      })
    })
  })

  it('should support aria-labelledby', () => {
    render(
      <div>
        <label id="autocomplete-label">Select an option</label>
        <Autocomplete options={mockOptions} aria-labelledby="autocomplete-label" />
      </div>
    )
    
    const input = screen.getByRole('combobox')
    expect(input).toHaveAttribute('aria-labelledby', 'autocomplete-label')
  })

  it('should have accessible remove buttons for tags', () => {
    render(
      <Autocomplete 
        options={mockOptions}
        multiple
        value={[mockOptions[0], mockOptions[1]]}
      />
    )
    
    const removeButtons = screen.getAllByLabelText(/Remove/)
    expect(removeButtons).toHaveLength(2)
    expect(removeButtons[0]).toHaveAttribute('aria-label', 'Remove Option 1')
    expect(removeButtons[1]).toHaveAttribute('aria-label', 'Remove Option 2')
  })

  it('should have accessible clear button', () => {
    render(<Autocomplete options={mockOptions} value={mockOptions[0]} />)
    
    const clearButton = screen.getByLabelText('Clear selection')
    expect(clearButton).toBeInTheDocument()
    expect(clearButton).toHaveAttribute('aria-label', 'Clear selection')
  })

  it('should support keyboard navigation', async () => {
    const onChange = vi.fn()
    render(<Autocomplete options={mockOptions} onChange={onChange} />)
    
    const input = screen.getByRole('combobox')
    
    // Open dropdown with Enter
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
    
    // After Enter, first option should be highlighted
    expect(input).toHaveAttribute('aria-activedescendant', 'option-0')
    
    // Navigate with arrows
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute('aria-activedescendant', 'option-1')
    
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(input).toHaveAttribute('aria-activedescendant', 'option-2')
    
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(input).toHaveAttribute('aria-activedescendant', 'option-1')
    
    // Select with Enter
    fireEvent.keyDown(input, { key: 'Enter' })
    expect(onChange).toHaveBeenCalledWith(mockOptions[1])
  })

  it('should support screen reader announcements for loading state', async () => {
    const onSearch = vi.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<Autocomplete onSearch={onSearch} debounceMs={10} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)
    fireEvent.change(input, { target: { value: 'test' } })
    
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  it('should announce no options state', async () => {
    render(<Autocomplete options={[]} />)
    
    const input = screen.getByRole('combobox')
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      expect(screen.getByText('No options found')).toBeInTheDocument()
    })
  })

  it('should handle focus management properly', async () => {
    render(<Autocomplete options={mockOptions} />)
    
    const input = screen.getByRole('combobox')
    
    // Focus should be on input
    input.focus()
    expect(document.activeElement).toBe(input)
    
    // Open dropdown
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
    
    // Focus should remain on input during keyboard navigation
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(document.activeElement).toBe(input)
    
    // Close with Escape should blur
    fireEvent.keyDown(input, { key: 'Escape' })
    
    await waitFor(() => {
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    })
  })

  it('should work with screen reader technologies', async () => {
    // Simulate screen reader behavior
    render(<Autocomplete options={mockOptions} aria-label="Search options" />)
    
    const input = screen.getByRole('combobox')
    
    // Screen reader would read: "Search options, combobox"
    expect(input).toHaveAttribute('role', 'combobox')
    expect(input).toHaveAttribute('aria-label', 'Search options')
    
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      const listbox = screen.getByRole('listbox')
      expect(listbox).toBeInTheDocument()
    })
    
    // Screen reader would announce: "List with 3 options"
    const options = screen.getAllByRole('option')
    expect(options).toHaveLength(3)
    
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    
    // Screen reader would announce: "Option 1, First option, 1 of 3"
    expect(input).toHaveAttribute('aria-activedescendant', 'option-0')
  })

  it('should support high contrast mode indicators', () => {
    render(<Autocomplete options={mockOptions} error />)
    
    const container = screen.getByRole('combobox').closest('div')
    expect(container).toHaveClass('border-red-500')
  })

  it('should be operable with assistive technology', async () => {
    const onChange = vi.fn()
    render(
      <Autocomplete 
        options={mockOptions}
        onChange={onChange}
        aria-label="Select an option"
      />
    )
    
    const input = screen.getByRole('combobox')
    
    // Simulate assistive technology opening dropdown
    fireEvent.mouseDown(input)
    
    await waitFor(() => {
      expect(screen.getByRole('listbox')).toBeInTheDocument()
    })
    
    // Simulate assistive technology selecting option
    const firstOption = screen.getByRole('option', { name: /Option 1/ })
    fireEvent.click(firstOption)
    
    expect(onChange).toHaveBeenCalledWith(mockOptions[0])
  })
})
