import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Tags } from './Tags'
import type { TagItem } from './types'

const mockTags: TagItem[] = [
  { key: '1', label: 'JavaScript' },
  { key: '2', label: 'TypeScript' },
  { key: '3', label: 'React' },
  { key: '4', label: 'Vue' },
  { key: '5', label: 'Angular' }
]

describe('Tags', () => {
  it('renders correctly with default props', () => {
    render(<Tags data-testid="tags" />)
    
    expect(screen.getByTestId('tags')).toBeInTheDocument()
  })

  it('displays provided tags', () => {
    render(<Tags tags={mockTags} data-testid="tags" />)
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('handles tag removal when removable', () => {
    const onRemove = vi.fn()
    
    render(
      <Tags 
        tags={mockTags}
        removable
        onRemove={onRemove}
        data-testid="tags"
      />
    )
    
    const closeButtons = screen.getAllByLabelText(/remove/i)
    expect(closeButtons).toHaveLength(mockTags.length)
    
    fireEvent.click(closeButtons[0])
    expect(onRemove).toHaveBeenCalledWith('JavaScript', mockTags[0])
  })

  it('adds new tags when addable', async () => {
    const onAdd = vi.fn()
    
    render(
      <Tags 
        tags={mockTags}
        addable
        onAdd={onAdd}
        data-testid="tags"
      />
    )
    
    // Find and use the input for adding new tags
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'New Tag' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(onAdd).toHaveBeenCalledWith('New Tag', expect.objectContaining({
        key: expect.any(String),
        label: 'New Tag'
      }))
    })
  })

  it('applies different sizes correctly', () => {
    const testTag: TagItem = { key: '1', label: 'Test' }
    
    const { rerender } = render(
      <Tags tags={[testTag]} size="sm" data-testid="tags" />
    )
    
    const tag = screen.getByText('Test')
    expect(tag.parentElement).toHaveClass('text-xs')
    
    rerender(<Tags tags={[testTag]} size="md" data-testid="tags" />)
    expect(tag.parentElement).toHaveClass('text-sm')
    
    rerender(<Tags tags={[testTag]} size="lg" data-testid="tags" />)
    expect(tag.parentElement).toHaveClass('text-base')
  })

  it('applies different colors correctly', () => {
    const coloredTags: TagItem[] = [
      { key: '1', label: 'Primary', color: 'primary' },
      { key: '2', label: 'Success', color: 'success' },
      { key: '3', label: 'Warning', color: 'warning' },
      { key: '4', label: 'Error', color: 'error' }
    ]
    
    render(<Tags tags={coloredTags} data-testid="tags" />)
    
    expect(screen.getByText('Primary').parentElement).toHaveClass('bg-blue-100')
    expect(screen.getByText('Success').parentElement).toHaveClass('bg-green-100')
    expect(screen.getByText('Warning').parentElement).toHaveClass('bg-yellow-100')
    expect(screen.getByText('Error').parentElement).toHaveClass('bg-red-100')
  })

  it('limits number of displayed tags with maxTags', () => {
    render(
      <Tags 
        tags={mockTags}
        maxTags={3}
        data-testid="tags"
      />
    )
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    
    // Should show "+2 more" or similar indicator
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('prevents duplicate tags when allowDuplicates is false', async () => {
    const onAdd = vi.fn()
    const existingTags: TagItem[] = [{ key: '1', label: 'Existing' }]
    
    render(
      <Tags 
        tags={existingTags}
        addable
        onAdd={onAdd}
        allowDuplicates={false}
        data-testid="tags"
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Existing' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(onAdd).not.toHaveBeenCalled()
    })
  })

  it('validates tag input with validator function', async () => {
    const onAdd = vi.fn()
    const validator = vi.fn().mockReturnValue(false) // Invalid
    
    render(
      <Tags 
        tags={[]}
        addable
        onAdd={onAdd}
        validator={validator}
        data-testid="tags"
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'Invalid Tag' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(validator).toHaveBeenCalledWith('Invalid Tag')
      expect(onAdd).not.toHaveBeenCalled()
    })
  })

  it('transforms tag input with transformer function', async () => {
    const onAdd = vi.fn()
    const transformer = vi.fn().mockReturnValue('TRANSFORMED')
    
    render(
      <Tags 
        tags={[]}
        addable
        onAdd={onAdd}
        transformer={transformer}
        data-testid="tags"
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'input' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(transformer).toHaveBeenCalledWith('input')
      expect(onAdd).toHaveBeenCalledWith('TRANSFORMED', expect.objectContaining({
        label: 'TRANSFORMED'
      }))
    })
  })

  it('applies custom className', () => {
    const testTag: TagItem = { key: '1', label: 'Test' }
    
    render(
      <Tags 
        tags={[testTag]}
        className="custom-tags"
        data-testid="tags"
      />
    )
    
    expect(screen.getByTestId('tags')).toHaveClass('custom-tags')
  })

  it('handles empty tags array', () => {
    render(<Tags tags={[]} data-testid="tags" />)
    
    expect(screen.getByTestId('tags')).toBeInTheDocument()
  })

  it('handles controlled value', () => {
    const onChange = vi.fn()
    
    render(
      <Tags 
        tags={mockTags}
        value={['JavaScript', 'React']}
        onChange={onChange}
        data-testid="tags"
      />
    )
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
  })

  it('handles default value', () => {
    render(
      <Tags 
        tags={mockTags}
        defaultValue={['TypeScript']}
        data-testid="tags"
      />
    )
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('renders with sortable prop', () => {
    render(
      <Tags 
        tags={mockTags}
        sortable
        data-testid="tags"
      />
    )
    
    // Just check that component renders without error when sortable is true
    expect(screen.getByTestId('tags')).toBeInTheDocument()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('respects maxLength for tag input', async () => {
    const onAdd = vi.fn()
    
    render(
      <Tags 
        tags={[]}
        addable
        onAdd={onAdd}
        maxLength={5}
        data-testid="tags"
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'VeryLongTagName' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    // Should truncate or reject based on implementation
    expect(input).toHaveAttribute('maxlength', '5')
  })

  it('handles placeholder text', () => {
    render(
      <Tags 
        addable
        placeholder="Add a tag..."
        data-testid="tags"
      />
    )
    
    expect(screen.getByPlaceholderText('Add a tag...')).toBeInTheDocument()
  })

  it('supports editable tags', async () => {
    const onEdit = vi.fn()
    
    render(
      <Tags 
        tags={mockTags}
        editable
        onEdit={onEdit}
        data-testid="tags"
      />
    )
    
    const tag = screen.getByText('JavaScript')
    fireEvent.click(tag)
    
    // Should become editable
    const input = screen.getByDisplayValue('JavaScript')
    fireEvent.change(input, { target: { value: 'JS' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    await waitFor(() => {
      expect(onEdit).toHaveBeenCalledWith('JavaScript', 'JS')
    })
  })
})
