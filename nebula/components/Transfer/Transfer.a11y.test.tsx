import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Transfer } from './Transfer'
import type { TransferItem } from './types'

expect.extend(toHaveNoViolations)

const mockData: TransferItem[] = [
  { key: '1', title: 'Document 1', description: 'First document' },
  { key: '2', title: 'Document 2', description: 'Second document' },
  { key: '3', title: 'Document 3', description: 'Third document', disabled: true },
  { key: '4', title: 'Document 4', description: 'Fourth document' }
]

describe('Transfer Accessibility', () => {
  it('meets basic accessibility standards', async () => {
    const { container } = render(<Transfer dataSource={mockData} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('provides proper ARIA labels for lists', () => {
    render(
      <Transfer 
        dataSource={mockData} 
        aria-label="Document transfer"
        leftTitle="Available Documents"
        rightTitle="Selected Documents"
      />
    )
    
    expect(screen.getByLabelText('Document transfer')).toBeInTheDocument()
    expect(screen.getByText('Available Documents')).toBeInTheDocument()
    expect(screen.getByText('Selected Documents')).toBeInTheDocument()
  })

  it('provides accessible move buttons with descriptive labels', () => {
    render(<Transfer dataSource={mockData} />)
    
    const moveRightButton = screen.getByLabelText(/Move \d+ items to target/)
    const moveLeftButton = screen.getByLabelText(/Move \d+ items to source/)
    
    expect(moveRightButton).toBeInTheDocument()
    expect(moveLeftButton).toBeInTheDocument()
    
    expect(moveRightButton).toHaveAttribute('aria-label')
    expect(moveLeftButton).toHaveAttribute('aria-label')
  })

  it('maintains proper focus management', () => {
    render(<Transfer dataSource={mockData} />)
    
    // All interactive elements should be focusable
    const checkboxes = screen.getAllByRole('checkbox')
    const buttons = screen.getAllByRole('button')
    const textboxes = screen.getAllByRole('textbox')
    
    const allInteractive = [...checkboxes, ...buttons, ...textboxes]
    allInteractive.forEach(element => {
      expect(element).not.toHaveAttribute('tabindex', '-1')
    })
  })

  it('provides proper roles for list structure', () => {
    render(<Transfer dataSource={mockData} />)
    
    // Search inputs should have textbox role
    const searchInputs = screen.getAllByRole('textbox')
    expect(searchInputs).toHaveLength(2)
    
    // Checkboxes should have checkbox role
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toBeGreaterThan(0)
    
    // Buttons should have button role
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2) // Move buttons
  })

  it('indicates disabled state properly', () => {
    render(<Transfer dataSource={mockData} />)
    
    // Find checkbox for disabled item by aria-label
    const disabledCheckbox = screen.getByLabelText('Select Document 3')
    
    expect(disabledCheckbox).toBeDefined()
    expect(disabledCheckbox).toBeDisabled()
  })

  it('provides meaningful item counts for screen readers', () => {
    render(<Transfer dataSource={mockData} defaultTargetKeys={['1', '2']} />)
    
    // Should show selection counts - expect multiple matches
    const counts = screen.getAllByText('0/2')
    expect(counts).toHaveLength(2) // One for each list
  })

  it('supports high contrast mode', () => {
    const { container } = render(<Transfer dataSource={mockData} />)
    
    // Check for proper contrast classes
    const transferContainer = container.firstChild as HTMLElement
    expect(transferContainer).toHaveClass('inline-flex')
    
    // Lists should have proper borders for high contrast
    const lists = container.querySelectorAll('.border-gray-200')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('provides accessible search functionality', () => {
    render(<Transfer dataSource={mockData} searchable />)
    
    const searchInputs = screen.getAllByPlaceholderText('Search...')
    expect(searchInputs).toHaveLength(2)
    
    searchInputs.forEach(input => {
      expect(input).toHaveAttribute('type', 'text')
      expect(input).toHaveAttribute('placeholder', 'Search...')
    })
  })

  it('handles loading state accessibly', async () => {
    const { container } = render(<Transfer dataSource={mockData} loading />)
    
    // Should have loading indicators
    const loadingElements = screen.getAllByLabelText('Loading...')
    expect(loadingElements).toHaveLength(2)
    
    // Check accessibility of loading state
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('maintains accessibility in disabled state', async () => {
    const { container } = render(<Transfer dataSource={mockData} disabled />)
    
    // All interactive elements should be disabled
    const checkboxes = screen.getAllByRole('checkbox')
    const buttons = screen.getAllByRole('button')
    
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeDisabled()
    })
    
    buttons.forEach(button => {
      expect(button).toBeDisabled()
    })
    
    // Should still be accessible
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('provides proper select all checkbox labeling', () => {
    render(<Transfer dataSource={mockData} showSelectAll />)
    
    const selectAllCheckboxes = screen.getAllByLabelText('Select all')
    expect(selectAllCheckboxes).toHaveLength(2) // One for each list
    
    selectAllCheckboxes.forEach(checkbox => {
      expect(checkbox).toHaveAttribute('type', 'checkbox')
    })
  })

  it('supports custom aria attributes', async () => {
    const { container } = render(
      <Transfer 
        dataSource={mockData}
        aria-label="File transfer widget"
        aria-describedby="transfer-description"
      />
    )
    
    const transferElement = container.firstChild as HTMLElement
    expect(transferElement).toHaveAttribute('aria-label', 'File transfer widget')
    expect(transferElement).toHaveAttribute('aria-describedby', 'transfer-description')
    
    // Should maintain accessibility with custom attributes
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('provides accessible empty state', async () => {
    const { container } = render(<Transfer dataSource={[]} />)
    
    // Should show "No data" message in both lists
    const noDataMessages = screen.getAllByText('No data')
    expect(noDataMessages).toHaveLength(2)
    
    // Empty state should be accessible
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('maintains proper color contrast', () => {
    const { container } = render(<Transfer dataSource={mockData} />)
    
    // Check for proper color classes that meet WCAG standards
    const textElements = container.querySelectorAll('.text-gray-900, .dark\\:text-white')
    expect(textElements.length).toBeGreaterThan(0)
    
    // Secondary text should also have proper contrast
    const secondaryText = container.querySelectorAll('.text-gray-500, .dark\\:text-gray-400')
    expect(secondaryText.length).toBeGreaterThan(0)
  })

  it('supports keyboard navigation patterns', () => {
    render(<Transfer dataSource={mockData} />)
    
    // All interactive elements should be keyboard accessible
    const checkboxes = screen.getAllByRole('checkbox')
    const buttons = screen.getAllByRole('button')
    const textboxes = screen.getAllByRole('textbox')
    
    const allInteractive = [...checkboxes, ...buttons, ...textboxes]
    allInteractive.forEach(element => {
      // Should not have negative tabindex (unless intentionally not focusable)
      const tabIndex = element.getAttribute('tabindex')
      if (tabIndex !== null) {
        expect(parseInt(tabIndex)).toBeGreaterThanOrEqual(0)
      }
    })
  })
})
