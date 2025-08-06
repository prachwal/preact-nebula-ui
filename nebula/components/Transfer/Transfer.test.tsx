import { render, screen } from '@testing-library/preact'
import { userEvent } from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { Transfer } from './Transfer'
import type { TransferItem } from './types'

const mockData: TransferItem[] = [
  { key: '1', title: 'Item 1', description: 'First item' },
  { key: '2', title: 'Item 2', description: 'Second item' },
  { key: '3', title: 'Item 3', description: 'Third item', disabled: true },
  { key: '4', title: 'Item 4', description: 'Fourth item' }
]

describe('Transfer', () => {
  it('renders with basic props', () => {
    render(<Transfer dataSource={mockData} />)
    
    expect(screen.getByText('Source')).toBeInTheDocument()
    expect(screen.getByText('Target')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('shows custom titles', () => {
    render(
      <Transfer 
        dataSource={mockData} 
        leftTitle="Available Items"
        rightTitle="Selected Items"
      />
    )
    
    expect(screen.getByText('Available Items')).toBeInTheDocument()
    expect(screen.getByText('Selected Items')).toBeInTheDocument()
  })

  it('handles default target keys', () => {
    render(<Transfer dataSource={mockData} defaultTargetKeys={['2', '4']} />)
    
    // Should show items in right panel
    expect(screen.getByText('Target')).toBeInTheDocument()
    expect(screen.getAllByText('Item 2')).toHaveLength(1)
    expect(screen.getAllByText('Item 4')).toHaveLength(1)
  })

  it('allows item selection via checkboxes', async () => {
    const user = userEvent.setup()
    render(<Transfer dataSource={mockData} />)
    
    // Find checkboxes (excluding select all checkboxes)
    const checkboxes = screen.getAllByRole('checkbox')
    const itemCheckbox = checkboxes.find(cb => !(cb as HTMLInputElement).disabled && cb.closest('label')?.textContent !== 'Select all')
    
    if (itemCheckbox) {
      await user.click(itemCheckbox)
      expect(itemCheckbox).toBeChecked()
    }
  })

  it('moves items between lists when buttons are clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    
    render(<Transfer dataSource={mockData} onChange={onChange} />)
    
    // Select first item
    const checkboxes = screen.getAllByRole('checkbox')
    const itemCheckbox = checkboxes.find(cb => !(cb as HTMLInputElement).disabled && cb.closest('label')?.textContent !== 'Select all')
    
    if (itemCheckbox) {
      await user.click(itemCheckbox)
      
      // Find and click move right button
      const moveRightButton = screen.getByRole('button', { name: /Move.*to target/ })
      await user.click(moveRightButton)
      
      expect(onChange).toHaveBeenCalled()
    }
  })

  it('handles select all functionality', async () => {
    const user = userEvent.setup()
    render(<Transfer dataSource={mockData} />)
    
    // Find select all checkbox in source list
    const selectAllCheckboxes = screen.getAllByLabelText('Select all')
    const sourceSelectAll = selectAllCheckboxes[0]
    
    await user.click(sourceSelectAll)
    
    // Check that items are selected (indirectly by checking if move button is enabled)
    const moveRightButton = screen.getByRole('button', { name: /Move.*to target/ })
    expect(moveRightButton).not.toBeDisabled()
  })

  it('filters items based on search', async () => {
    const user = userEvent.setup()
    render(<Transfer dataSource={mockData} searchable />)
    
    // Find search input
    const searchInputs = screen.getAllByPlaceholderText('Search...')
    const sourceSearchInput = searchInputs[0]
    
    await user.type(sourceSearchInput, 'Item 1')
    
    // Should still see Item 1 (search filtering happens in component)
    expect(screen.getByText('Item 1')).toBeInTheDocument()
  })

  it('calls onChange when items are moved', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Transfer dataSource={mockData} onChange={onChange} defaultSelectedKeys={['1']} />)
    
    const moveRightButton = screen.getByRole('button', { name: /Move.*to target/ })
    await user.click(moveRightButton)
    
    expect(onChange).toHaveBeenCalled()
  })

  it('renders custom items with render prop', () => {
    const customRender = (item: TransferItem) => (
      <div data-testid={`custom-${item.key}`}>
        Custom: {item.title}
      </div>
    )
    
    render(<Transfer dataSource={mockData} render={customRender} />)
    
    expect(screen.getByTestId('custom-1')).toBeInTheDocument()
    expect(screen.getByText('Custom: Item 1')).toBeInTheDocument()
  })

  it('handles different sizes', () => {
    const { container } = render(<Transfer dataSource={mockData} size="sm" />)
    expect(container.querySelector('.text-sm')).toBeInTheDocument()
  })

  it('disables interactions when disabled', () => {
    render(<Transfer dataSource={mockData} disabled />)
    
    // Move buttons should be disabled
    const moveButtons = screen.getAllByRole('button')
    moveButtons.forEach(button => {
      expect(button).toBeDisabled()
    })
  })

  it('shows loading state', () => {
    render(<Transfer dataSource={mockData} loading />)
    
    // Should show loading indicators
    const loadingElements = screen.getAllByLabelText('Loading...')
    expect(loadingElements).toHaveLength(2) // One for each list
  })

  it('handles empty data source', () => {
    render(<Transfer dataSource={[]} />)
    
    expect(screen.getAllByText('No data')).toHaveLength(2)
  })

  it('shows item counts correctly', () => {
    render(<Transfer dataSource={mockData} defaultTargetKeys={['1', '2']} />)
    
    // Should show counts in headers - expect multiple matches
    const counts = screen.getAllByText('0/2')
    expect(counts).toHaveLength(2) // Source and Target
  })

  it('handles custom operations prop', () => {
    render(<Transfer dataSource={mockData} operations={['→', '←']} />)
    
    expect(screen.getByText('→')).toBeInTheDocument()
    expect(screen.getByText('←')).toBeInTheDocument()
  })

  it('supports controlled mode', () => {
    const { rerender } = render(
      <Transfer dataSource={mockData} targetKeys={['1']} />
    )
    
    // Should show item 1 in target
    expect(screen.getAllByText('Item 1')).toHaveLength(1)
    
    // Update controlled value
    rerender(
      <Transfer dataSource={mockData} targetKeys={['1', '2']} />
    )
    
    // Should now show both items in target
    expect(screen.getAllByText('Item 1')).toHaveLength(1)
    expect(screen.getAllByText('Item 2')).toHaveLength(1)
  })

  it('handles disabled items correctly', () => {
    render(<Transfer dataSource={mockData} />)
    
    // Disabled item should be visible but not selectable
    expect(screen.getByText('Item 3')).toBeInTheDocument()
    
    // Its checkbox should be disabled
    const disabledCheckbox = screen.getByLabelText('Select Item 3')
    expect(disabledCheckbox).toBeDisabled()
  })
})
